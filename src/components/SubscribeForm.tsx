"use client";

import { useState } from "react";

interface Props {
    /** Where on the site this form is embedded — saved to the `source` column. */
    source?: string;
    /** Optional heading shown above the form. Hidden if falsy. */
    heading?: string;
    /** Optional body copy shown below the heading. Hidden if falsy. */
    description?: string;
}

type Status = "idle" | "submitting" | "done";

export default function SubscribeForm({
    source = "footer",
    heading = "Subscribe to the newsletter",
    description = "Occasional notes on products, markets, and what I'm working on. No spam.",
}: Props) {
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState(""); // honeypot
    const [status, setStatus] = useState<Status>("idle");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (status === "submitting") return;
        setStatus("submitting");

        try {
            await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, source, website }),
            });
        } catch {
            // Swallow — we always show the same generic success to avoid
            // revealing errors. Real errors are logged server-side.
        }
        setStatus("done");
    }

    if (status === "done") {
        return (
            <div
                style={{
                    maxWidth: "420px",
                    margin: "0 auto 1.5rem",
                    textAlign: "center",
                    fontSize: "0.9rem",
                    color: "var(--muted)",
                }}
            >
                Thanks — check your inbox for a confirmation link.
            </div>
        );
    }

    return (
        <div
            style={{
                maxWidth: "420px",
                margin: "0 auto 1.5rem",
                textAlign: "center",
            }}
        >
            {heading && (
                <div
                    style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "var(--foreground, #1a1a1a)",
                        marginBottom: "0.25rem",
                    }}
                >
                    {heading}
                </div>
            )}
            {description && (
                <div
                    style={{
                        fontSize: "0.85rem",
                        color: "var(--muted)",
                        marginBottom: "0.75rem",
                        lineHeight: 1.5,
                    }}
                >
                    {description}
                </div>
            )}

            <form
                onSubmit={onSubmit}
                style={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                {/* Honeypot: hidden from real users, bots fill it. */}
                <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    style={{
                        position: "absolute",
                        left: "-9999px",
                        width: "1px",
                        height: "1px",
                        opacity: 0,
                    }}
                    aria-hidden="true"
                />

                <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "submitting"}
                    style={{
                        flex: "1 1 220px",
                        padding: "0.55rem 0.75rem",
                        borderRadius: "6px",
                        border: "1px solid var(--card-border)",
                        background: "var(--background, #ffffff)",
                        color: "var(--foreground, #1a1a1a)",
                        fontSize: "0.9rem",
                        minWidth: 0,
                    }}
                />
                <button
                    type="submit"
                    disabled={status === "submitting"}
                    style={{
                        padding: "0.55rem 1rem",
                        borderRadius: "6px",
                        border: "1px solid var(--card-border)",
                        background: "var(--foreground, #1a1a1a)",
                        color: "var(--background, #ffffff)",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        cursor: status === "submitting" ? "wait" : "pointer",
                    }}
                >
                    {status === "submitting" ? "…" : "Subscribe"}
                </button>
            </form>
        </div>
    );
}
