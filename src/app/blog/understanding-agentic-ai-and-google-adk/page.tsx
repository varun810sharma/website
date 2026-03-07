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
                        <span>Aug 2025</span>
                        <span>·</span>
                        <span>5 min read</span>
                    </div>
                    <h1
                        style={{
                            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                            fontWeight: 800,
                            lineHeight: 1.2,
                            marginBottom: "1rem",
                        }}
                    >
                        Understanding Agentic AI and Google&apos;s Agent Development Kit (ADK)
                    </h1>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                        <span className="tech-tag">Agentic AI</span>
                        <span className="tech-tag">LLM</span>
                        <span className="tech-tag">Google ADK</span>
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
                        The software engineering landscape is undergoing a monumental shift with the rise of <strong>Agentic AI</strong>. But what exactly does that term mean, and how does it differ from the conversational chatbots we&apos;ve used for the last few years? Today, I want to talk about how Agentic systems are moving from novel concepts to robust, production-ready engineering blocks.
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
                        What is Agentic AI?
                    </h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                        Unlike a simple prompt-and-response system, Agentic AI refers to systems that are capable of <strong>autonomous reasoning and action</strong>. You don&apos;t just ask a question; you provide an objective. The AI then formulates a step-by-step plan, delegates tasks to various sub-agents or tools, interprets the results, and adjusts its approach if it hits a roadblock. Let&apos;s think of it as the difference between a textbook (an LLM) and an intern (an Agent).
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        However, building these systems from scratch requires intense orchestration—managing context windows, handling tool-calling failures, routing queries, and ensuring deterministic fallbacks.
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
                        Enter Google ADK
                    </h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                        This is where the <strong>Google Agent Development Kit (ADK)</strong> comes into play. The ADK is an incredible framework designed to radically simplify how engineers connect their Large Language Models to real-world APIs, vector databases, and enterprise data sources. It provides native abstractions for defining distinct tools (like reading a file, searching a database, or invoking a web hook) alongside specialized agents that know precisely when and how to use them.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        The ADK acts as the orchestration layer, taking the heavy lifting out of complex prompt-chaining and state management, allowing us to focus on the business logic instead. If you haven&apos;t started exploring agent orchestration yet, I highly recommend checking out the frameworks emerging in this space!
                    </p>
                </div>
            </div>
        </PageTransition>
    );
}
