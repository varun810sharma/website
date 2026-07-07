import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
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
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post || !post.published) {
        notFound();
    }

    const htmlContent = getBlogContent(slug);

    return (
        <PageTransition>
            <div style={{ paddingTop: "3rem", paddingBottom: "4rem", maxWidth: "720px", margin: "0 auto" }}>
                {/* Back link */}
                <Link
                    href="/blog"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        fontSize: "0.85rem",
                        color: "var(--muted)",
                        marginBottom: "2rem",
                        textDecoration: "none",
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <polyline points="15,18 9,12 15,6" />
                    </svg>
                    Back to Blog
                </Link>

                {/* Post Header */}
                <div style={{ marginBottom: "3rem" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            marginBottom: "0.75rem",
                            fontSize: "0.85rem",
                            color: "var(--muted)",
                        }}
                    >
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                    </div>
                    <h1
                        style={{
                            fontSize: "clamp(2rem, 5vw, 3rem)",
                            fontWeight: 900,
                            lineHeight: 1.1,
                            marginBottom: "1.5rem",
                            letterSpacing: "-0.02em"
                        }}
                    >
                        {post.title}
                    </h1>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {post.tags.map(tag => (
                            <span key={tag} className="tech-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hero image */}
                {post.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={post.image}
                        alt={post.title}
                        style={{
                            width: "100%",
                            aspectRatio: "1200 / 630",
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "1px solid var(--border)",
                            marginBottom: "3rem",
                        }}
                    />
                )}

                {/* Post Body (Rendered HTML) */}
                <article
                    className="blog-prose"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </div>
        </PageTransition>
    );
}
