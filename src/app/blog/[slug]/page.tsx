import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog-posts";
import { getBlogContent } from "@/lib/blog-content";

interface Props {
    params: Promise<{ slug: string }>;
}

// Canonical site origin. metadataBase (set in the root layout) makes relative
// image paths absolute automatically, but og:url must be an explicit absolute
// URL so we build it from this constant.
const SITE_URL = "https://varunsharma.online";
const DEFAULT_OG_IMAGE = "/og/default.png";
const DEFAULT_DESCRIPTION =
    "Essays on consumer goods, product, and go-to-market by Varun Sharma.";

// Build a clean, ~160-char social description: prefer the post summary, fall
// back to the first meaningful paragraph of the article body, then to a
// site-level default. Never returns an empty string, so previews never break.
function buildDescription(summary: string | undefined, html: string): string {
    const fromSummary = (summary ?? "").trim();
    let text = fromSummary;

    if (!text) {
        const firstPara = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? "";
        text = firstPara
            .replace(/<[^>]+>/g, "") // strip inline tags
            .replace(/&amp;/g, "&")
            .replace(/&(?:nbsp|#160);/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    if (!text) return DEFAULT_DESCRIPTION;
    if (text.length <= 160) return text;

    // Truncate on a word boundary at ~160 chars.
    const clipped = text.slice(0, 160);
    const lastSpace = clipped.lastIndexOf(" ");
    return `${clipped.slice(0, lastSpace > 0 ? lastSpace : 160).trim()}…`;
}

// Convert the display date ("Jul 2026") to a full ISO 8601 date for structured
// data. Posts only carry month precision, so we anchor to the first of the
// month: Google expects a complete date and silently ignores partial ones.
// Falls back to the raw string if the month is unrecognized.
function isoDate(display: string): string {
    const months: Record<string, string> = {
        Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
        Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
    };
    const match = display.match(/^([A-Za-z]{3})\s+(\d{4})$/);
    if (!match || !months[match[1]]) return display;
    return `${match[2]}-${months[match[1]]}-01`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post || !post.published) {
        return { title: "Post not found" };
    }

    const url = `${SITE_URL}/blog/${post.slug}`;
    const description = buildDescription(post.summary, getBlogContent(slug));
    // Per-post image when present, otherwise the site-wide fallback. Both are
    // resolved to absolute HTTPS URLs via metadataBase.
    const image = post.image ?? DEFAULT_OG_IMAGE;

    return {
        title: post.title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            url,
            siteName: "Varun Sharma",
            title: post.title,
            description,
            images: [{ url: image, width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description,
            images: [image],
        },
    };
}

export async function generateStaticParams() {
    return blogPosts.filter((post) => post.published).map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const published = blogPosts.filter((p) => p.published);
    const index = published.findIndex((p) => p.slug === slug);
    const post = index >= 0 ? published[index] : undefined;

    if (!post) {
        notFound();
    }

    const htmlContent = getBlogContent(slug);
    // Posts are ordered newest first in blog-posts.ts.
    const newer = index > 0 ? published[index - 1] : undefined;
    const older = index < published.length - 1 ? published[index + 1] : undefined;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: buildDescription(post.summary, htmlContent),
        datePublished: isoDate(post.date),
        url: `${SITE_URL}/blog/${post.slug}`,
        image: `${SITE_URL}${post.image ?? DEFAULT_OG_IMAGE}`,
        author: {
            "@type": "Person",
            name: "Varun Sharma",
            url: SITE_URL,
        },
        publisher: {
            "@type": "Person",
            name: "Varun Sharma",
            url: SITE_URL,
        },
        keywords: post.tags.join(", "),
        mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    };

    return (
        <article style={{ paddingTop: "var(--s7)", paddingBottom: "var(--s7)" }}>
            <script
                type="application/ld+json"
                // Escape "<" so a title or summary containing "</script>" can
                // never terminate the block early.
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                }}
            />

            {/* Header: title and dek, centered column */}
            <header className="article-header">
                <h1 className="article-header__title">{post.title}</h1>
                <p className="article-header__dek">{post.summary}</p>
            </header>

            <hr className="rule rule--signal" />

            {/* Meta column + body */}
            <div className="article-layout">
                <aside className="article-aside">
                    <span className="caps-signal">{post.date}</span>
                    <span className="meta-line">{post.readTime}</span>
                    {post.tags.map((tag) => (
                        <span key={tag} className="tag">
                            {tag}
                        </span>
                    ))}
                </aside>

                <div
                    className="blog-prose"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </div>

            {/* Previous / next */}
            {(newer || older) && (
                <nav
                    className="article-nav"
                    aria-label="More articles"
                    style={{ maxWidth: "46rem", margin: "var(--s7) auto 0" }}
                >
                    <div>
                        {newer && (
                            <Link href={`/blog/${newer.slug}`} className="article-nav__link">
                                <span className="caps-signal article-nav__label">Newer</span>
                                <span className="article-nav__title">{newer.title}</span>
                            </Link>
                        )}
                    </div>
                    <div style={{ textAlign: "right" }}>
                        {older && (
                            <Link
                                href={`/blog/${older.slug}`}
                                className="article-nav__link"
                            >
                                <span className="caps-signal article-nav__label">Older</span>
                                <span className="article-nav__title">{older.title}</span>
                            </Link>
                        )}
                    </div>
                </nav>
            )}
        </article>
    );
}
