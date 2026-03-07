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
                        <span>Jan 2026</span>
                        <span>·</span>
                        <span>4 min read</span>
                    </div>
                    <h1
                        style={{
                            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                            fontWeight: 800,
                            lineHeight: 1.2,
                            marginBottom: "1rem",
                        }}
                    >
                        Building MaintainMe: A Privacy-First, AI-Powered Calorie Tracker
                    </h1>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                        <span className="tech-tag">Open Source</span>
                        <span className="tech-tag">PWA</span>
                        <span className="tech-tag">Gemini AI</span>
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
                        I&apos;m excited to share the launch of my latest open-source project, <strong>MaintainMe</strong>. As someone who recently joined Google, I realized how easy it is to gain the infamous <i>&quot;Googler 15&quot;</i> with all the free food around! I wanted a simple way to track my calories, but I was constantly frustrated by existing apps that are riddled with paywalls, ads, and privacy-invasive tracking.
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
                        The Motivation
                    </h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                        The health and fitness app ecosystem is broken. Users are forced to pay monthly subscriptions just to log their meals or scan a barcode. Worse, their personal health data is often sold to third-party brokers. MaintainMe was born out of a desire for a <strong>free, open-source, and entirely private</strong> alternative.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        I built MaintainMe as a Progressive Web App (PWA) so that anyone can use it across iOS, Android, and web without dealing with confusing app store policies or downloads.
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
                        Powered by Google Gemini AI
                    </h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                        To make logging meals frictionless, I integrated the incredible power of the <strong>Gemini AI model</strong>. Instead of manually searching through thousands of food databases and estimating portion sizes, you can simply type what you ate (e.g., &quot;A bowl of oatmeal with a sliced banana and a spoonful of peanut butter&quot;) or take a quick photo of your plate. Gemini automatically detects the items, estimates the calories, and breaks down the macronutrients instantly.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        This has completely transformed how I track my nutrition. The AI handles the hard part, and I stay mindful of my goals. Let me know what you think of the project on GitHub!
                    </p>
                </div>
            </div>
        </PageTransition>
    );
}
