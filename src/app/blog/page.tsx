import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import { thumbSrc } from "@/lib/images";

export const metadata: Metadata = {
    title: "Articles | Varun Sharma",
    description:
        "Essays on consumer goods, product, and go-to-market by Varun Sharma.",
    alternates: { canonical: "https://varunsharma.online/blog" },
};

export default function BlogPage() {
    const posts = blogPosts.filter((post) => post.published);

    return (
        <div style={{ paddingTop: "var(--s7)", paddingBottom: "var(--s7)" }}>
            <header style={{ marginBottom: "var(--s6)", maxWidth: "40rem" }}>
                <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", marginBottom: "var(--s3)" }}>
                    Articles
                </h1>
                <p style={{ color: "var(--ink-soft)", margin: 0 }}>
                    Long form thinking on brands, markets, product, and strategy.
                </p>
            </header>

            <hr className="rule rule--signal" />

            <div className="section">
                <div>
                    <span className="section-label">All articles</span>
                </div>

                <ul className="toc">
                    {posts.map((post) => (
                        <li key={post.slug} className="toc__item">
                            <Link href={`/blog/${post.slug}`} className="toc__link">
                                <span className="caps-signal toc__date">{post.date}</span>
                                <div style={{ minWidth: 0 }}>
                                    <h2 className="toc__title">{post.title}</h2>
                                    <p className="toc__dek">{post.summary}</p>
                                    <div className="toc__tags">
                                        <span className="meta-line">{post.readTime}</span>
                                        {post.tags.map((tag) => (
                                            <span key={tag} className="tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {thumbSrc(post.image) ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        className="toc__thumb"
                                        src={thumbSrc(post.image)}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                        width={360}
                                        height={189}
                                    />
                                ) : (
                                    <span />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
