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
                        <span>Jul 2025</span>
                        <span>·</span>
                        <span>6 min read</span>
                    </div>
                    <h1
                        style={{
                            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                            fontWeight: 800,
                            lineHeight: 1.2,
                            marginBottom: "1rem",
                        }}
                    >
                        Building Scalable Data Models: Insights from Google London
                    </h1>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                        <span className="tech-tag">Data Modeling</span>
                        <span className="tech-tag">Architecture</span>
                        <span className="tech-tag">Engineering</span>
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
                        Last month, I had the incredible opportunity to visit the <strong>Google London office</strong>. Beyond the amazing food and views, the trip provided profound insights into how world-class engineering teams approach one of the hardest problems in our industry: Data Modeling at scale.
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
                        The Reality of Scale
                    </h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                        When you are dealing with petabytes of data flowing in per second, the naive approaches to database schemas evaporate. &quot;Just add an index&quot; is no longer a valid architecture strategy. Instead, the focus shifts entirely to <i>how the data is structured at rest</i>.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        One of the key takeaways was the absolute necessity of rigorous <strong>Data Validation</strong> early in the pipeline. If bad data makes it into a core entity table at Google scale, cleaning it up isn&apos;t just a headache; it&apos;s a computational nightmare.
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
                        Translating Business Requirements
                    </h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                        Another crucial lesson was learning how to act as a bridge. As Data Engineers, our jobs aren&apos;t just writing pipelines. The hardest part is successfully translating fuzzy, ambiguous business requirements into robust, concrete metrics and dimensions.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        If the marketing team wants &quot;User Engagement Score,&quot; the data model must define precisely what constitutes an interaction, what the decay rate is, and how historical metrics remain consistent if the formula schema changes later. Designing future-proof schemas requires anticipating these shifts before the first table is ever created.
                    </p>
                </div>
            </div>
        </PageTransition>
    );
}
