"use client";

import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function BlogPage() {
    return (
        <PageTransition>
            <div style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
                {/* Header */}
                <div style={{ marginBottom: "2.5rem" }}>
                    <div className="section-label">Blog</div>
                    <h1
                        style={{
                            fontSize: "clamp(2rem, 4vw, 2.8rem)",
                            fontWeight: 800,
                            lineHeight: 1.2,
                        }}
                    >
                        Thoughts, learnings, and stories.
                    </h1>
                </div>

                {/* Blog Posts */}
                <motion.div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.25rem",
                        maxWidth: "800px",
                    }}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {blogPosts.slice(0, 1).map((post) => (
                        <motion.div
                            key={post.slug}
                            variants={itemVariants}
                        >
                            <Link
                                href={`/blog/${post.slug}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <div className="blog-card">
                                    {/* Meta */}
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.75rem",
                                            marginBottom: "0.75rem",
                                            fontSize: "0.8rem",
                                            color: "var(--muted)",
                                        }}
                                    >
                                        <span>{post.date}</span>
                                        <span>·</span>
                                        <span>{post.readTime}</span>
                                    </div>

                                    {/* Title */}
                                    <h2
                                        style={{
                                            fontSize: "1.25rem",
                                            fontWeight: 700,
                                            marginBottom: "0.5rem",
                                            color: "var(--foreground)",
                                        }}
                                    >
                                        {post.title}
                                    </h2>

                                    {/* Summary */}
                                    <p
                                        style={{
                                            fontSize: "0.9rem",
                                            lineHeight: 1.6,
                                            color: "var(--muted)",
                                            marginBottom: "0.75rem",
                                        }}
                                    >
                                        {post.summary}
                                    </p>

                                    {/* Tags */}
                                    <div style={{ display: "flex", gap: "0.4rem" }}>
                                        {post.tags.map((tag) => (
                                            <span key={tag} className="tech-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </PageTransition>
    );
}
