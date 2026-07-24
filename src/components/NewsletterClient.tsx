"use client";

import { useState, useRef } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function NewsletterClient() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "newsletter-page",
          website: honeypotRef.current?.value ?? "",
        }),
      });

      const data = await res.json() as { ok: boolean; error?: string };

      if (data.ok) {
        setStatus("success");
        setEmail("");
      } else {
        throw new Error(data.error ?? "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    }
  }

  return (
    <div
      style={{
        paddingTop: "var(--s7)",
        paddingBottom: "var(--s8)",
        maxWidth: "var(--measure)",
      }}
    >
      <p className="section-label" style={{ marginBottom: "var(--s3)" }}>
        Newsletter by Varun Sharma
      </p>

      <h1
        style={{
          fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
          fontWeight: 600,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          color: "var(--signal)",
          marginBottom: "var(--s4)",
        }}
      >
        What Shaped How I Think.
      </h1>

      <p
        style={{
          fontSize: "var(--text-body)",
          lineHeight: 1.6,
          color: "var(--ink-soft)",
          marginBottom: "var(--s6)",
          maxWidth: "34rem",
        }}
      >
        On companies, products, and strategy. A portfolio of the ideas that
        built how I think. Plus whatever doesn&apos;t fit a category.
      </p>

      {status === "success" ? (
        <div
          style={{
            borderTop: "2px solid var(--signal)",
            background: "var(--surface)",
            padding: "var(--s4) var(--s5)",
            maxWidth: "30rem",
          }}
        >
          <p
            style={{
              fontWeight: 600,
              marginBottom: "var(--s1)",
            }}
          >
            Check your inbox.
          </p>
          <p
            style={{
              fontFamily: "var(--font-hanken), sans-serif",
              fontSize: "var(--text-ui)",
              color: "var(--meta)",
              margin: 0,
            }}
          >
            A confirmation link is on its way. Click it to lock in your spot.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: "30rem" }}>
          {/* Honeypot */}
          <input
            ref={honeypotRef}
            type="text"
            name="website"
            tabIndex={-1}
            aria-hidden="true"
            style={{
              position: "absolute",
              opacity: 0,
              height: 0,
              width: 0,
              pointerEvents: "none",
            }}
          />

          <div className="subscribe__row">
            <input
              className="input"
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
            />
            <button
              className="btn"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "…" : "Subscribe"}
            </button>
          </div>

          {status === "error" && (
            <p
              style={{
                marginTop: "var(--s3)",
                fontFamily: "var(--font-hanken), sans-serif",
                fontSize: "var(--text-label)",
                color: "var(--signal)",
              }}
            >
              {errorMsg}
            </p>
          )}

          <p className="subscribe__note" style={{ marginTop: "var(--s3)" }}>
            No spam. Unsubscribe any time.
          </p>
        </form>
      )}
    </div>
  );
}
