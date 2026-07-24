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
            <p className="subscribe__note" style={{ maxWidth: "26rem" }}>
                Thanks. Check your inbox for a confirmation link.
            </p>
        );
    }

    return (
        <div style={{ maxWidth: "26rem" }}>
            {heading && <h2 className="subscribe__heading">{heading}</h2>}
            {description && <p className="subscribe__note">{description}</p>}

            <form onSubmit={onSubmit} className="subscribe__row">
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
                    className="input"
                    type="email"
                    required
                    placeholder="you@example.com"
                    aria-label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "submitting"}
                />
                <button className="btn" type="submit" disabled={status === "submitting"}>
                    {status === "submitting" ? "…" : "Subscribe"}
                </button>
            </form>
        </div>
    );
}
