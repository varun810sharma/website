import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog-posts";
import fs from "fs";
import path from "path";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    let htmlContent = "";
    try {
        const filePath = path.join(process.cwd(), "src/content/blogs", `${slug}.html`);
        htmlContent = fs.readFileSync(filePath, "utf8");
    } catch (error) {
        console.error(`Error reading blog content for ${slug}:`, error);
        // Fallback or error message
        htmlContent = "<p>Content not found.</p>";
    }

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

                {/* Post Body (Rendered HTML) */}
                <article
                    className="blog-prose"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </div>
        </PageTransition>
    );
}
