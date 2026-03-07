"use client";

import PageTransition from "@/components/PageTransition";
import Link from "next/link";

export default function BlogPostPage() {
    return (
        <PageTransition>
            <div style={{ paddingTop: "3rem", paddingBottom: "4rem", maxWidth: "720px" }}>
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
                <div style={{ marginBottom: "2rem" }}>
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
                        <span>Apr 2025</span>
                        <span>·</span>
                        <span>7 min read</span>
                    </div>
                    <h1
                        style={{
                            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                            fontWeight: 800,
                            lineHeight: 1.2,
                            marginBottom: "1rem",
                        }}
                    >
                        Mastering SQL Optimization for Performance and Cost-Efficiency
                    </h1>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                        <span className="tech-tag">SQL</span>
                        <span className="tech-tag">Data Engineering</span>
                        <span className="tech-tag">Cloud Costs</span>
                    </div>
                </div>

                {/* Post Body */}
                <div
                    style={{
                        fontSize: "1rem",
                        lineHeight: 1.8,
                        color: "var(--foreground)",
                    }}
                >
                    <p style={{ marginBottom: "1.5rem" }}>
                        In the era of cloud data warehouses like BigQuery, Snowflake, and Redshift, it is dangerously easy to write terribly inefficient SQL. Because the infrastructure scales so seamlessly, poorly written queries often hide behind massive compute power—until the monthly cloud invoice arrives. Let&apos;s talk about mastering SQL optimization to save both time and money.
                    </p>
                    <h2
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            marginBottom: "0.75rem",
                            marginTop: "2rem",
                            color: "var(--foreground)",
                        }}
                    >
                        Stop using SELECT *
                    </h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                        This is SQL 101, but it remains the most common error I see in production pipelines. Modern analytical databases are <strong>columnar</strong>. By requesting <code>SELECT *</code>, you force the engine to scan the entire dataset across disk storage, even if your downstream logic only needs two columns. Always specify exactly the columns you need.
                    </p>
                    <h2
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            marginBottom: "0.75rem",
                            marginTop: "2rem",
                            color: "var(--foreground)",
                        }}
                    >
                        Partitioning and Clustering
                    </h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                        If you are building pipelines that query time-series or sequential data, <strong>partitioning</strong> is not optional. Partitioning divides large tables into smaller, manageable chunks based on a specific column (usually a date). When a query filters by that date, the engine simply ignores all other partitions, radically dropping the bytes billed.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        Similarly, understanding and utilizing <strong>Execution Plans</strong> (using <code>EXPLAIN</code>) is the best way to determine if your joins are broadcasting efficiently or if you are accidentally forcing a full nested-loop iteration over billions of rows. Optimize your pipelines today, your CFO will thank you tomorrow!
                    </p>
                </div>
            </div>
        </PageTransition>
    );
}
