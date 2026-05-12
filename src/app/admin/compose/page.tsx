"use client";

/**
 * /admin/compose
 *
 * Newsletter composer. Pick a blog post to auto-fill the email, tweak the
 * subject and body, preview the result, then send to all active subscribers.
 *
 * Auth is HTTP Basic — password held in component state, same flow as
 * /admin/subscribers.
 */
import { useState } from "react";
import { blogPosts } from "@/data/blog-posts";
import Link from "next/link";
import type { MusicPick, PodcastPick } from "@/lib/resend";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SendResult = {
    sent: number;
    failed: number;
    errors: Array<{ to: string; error: string }>;
    message?: string;
};

const EMPTY_MUSIC_PICK: MusicPick = { track: "", artist: "", spotifyUrl: "", why: "" };
const EMPTY_PODCAST_PICK: PodcastPick = { show: "", episode: "", spotifyUrl: "", why: "" };

function isMusicPickComplete(p: MusicPick): boolean {
    return Boolean(p.track.trim() && p.artist.trim() && p.spotifyUrl.trim() && p.why.trim());
}

function isPodcastPickComplete(p: PodcastPick): boolean {
    return Boolean(p.show.trim() && p.episode.trim() && p.spotifyUrl.trim() && p.why.trim());
}

/** Shared input styling used by the music + podcast rec rows. */
const inputStyle: React.CSSProperties = {
    padding: "0.5rem 0.65rem",
    borderRadius: "5px",
    border: "1px solid var(--card-border, #d1d5db)",
    background: "var(--background, #fff)",
    color: "var(--foreground, #1a1a1a)",
    fontSize: "0.875rem",
    fontFamily: "inherit",
    boxSizing: "border-box",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function authHeader(password: string): string {
    return "Basic " + btoa(":" + password);
}

/** Build the teaser HTML for a blog post (used as the default email body). */
function buildTeaserHtml(post: (typeof blogPosts)[number]): string {
    return [
        `<h2 style="margin:0 0 16px;font-size:22px;font-weight:800;line-height:1.25;color:#18181b;letter-spacing:-0.01em;">${esc(post.title)}</h2>`,
        `<p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#3f3f46;">${esc(post.summary)}</p>`,
        `<p style="margin:0;font-size:13px;color:#a1a1aa;">${esc(post.date)} · ${esc(post.readTime)}</p>`,
    ].join("\n");
}

function esc(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/**
 * Preview row used inside the email preview pane for music + podcast recs.
 * Mirrors the rendered email layout: 64x64 art square on the left (a neutral
 * placeholder here, since real artwork is fetched server-side at send time)
 * and a dark pill "Listen on Spotify" button matching the post CTA.
 */
function PreviewPickRow({
    primary,
    secondary,
    why,
}: {
    primary: string;
    secondary: string;
    why: string;
}) {
    return (
        <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "20px" }}>
            <div
                style={{
                    width: "64px",
                    height: "64px",
                    flexShrink: 0,
                    borderRadius: "6px",
                    border: "1px solid #e4e4e7",
                    background: "linear-gradient(135deg, #f4f4f5 0%, #e4e4e7 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    color: "#a1a1aa",
                }}
            >
                ♪
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 700, color: "#18181b", lineHeight: 1.35 }}>
                    {primary}
                    <span style={{ fontWeight: 400, color: "#71717a" }}> · {secondary}</span>
                </p>
                <p style={{ margin: "0 0 10px", fontSize: "13px", color: "#3f3f46", lineHeight: 1.6 }}>
                    {why}
                </p>
                <span
                    style={{
                        display: "inline-block",
                        padding: "9px 18px",
                        background: "#1a1a1a",
                        color: "#fff",
                        borderRadius: "5px",
                        fontSize: "12px",
                        fontWeight: 600,
                    }}
                >
                    Listen on Spotify →
                </span>
            </div>
        </div>
    );
}

function AdminNav({ password }: { password: string }) {
    return (
        <div
            style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1.75rem",
                fontSize: "0.875rem",
            }}
        >
            <Link
                href={`/admin/subscribers`}
                style={{ color: "var(--muted, #666)", textDecoration: "none" }}
            >
                Subscribers
            </Link>
            <span style={{ color: "var(--muted, #666)" }}>·</span>
            <span style={{ fontWeight: 600, color: "var(--foreground, #1a1a1a)" }}>
                Compose
            </span>
            {password && (
                <>
                    <span style={{ color: "var(--muted, #666)", marginLeft: "auto" }}>
                        Signed in
                    </span>
                </>
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AdminComposePage() {
    // Auth state
    const [passwordInput, setPasswordInput] = useState("");
    const [authed, setAuthed] = useState<string | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);
    const [authLoading, setAuthLoading] = useState(false);

    // Compose state
    const [selectedSlug, setSelectedSlug] = useState<string>("");
    const [subject, setSubject] = useState("");
    const [bodyHtml, setBodyHtml] = useState("");
    const [postUrl, setPostUrl] = useState("");
    const [tab, setTab] = useState<"edit" | "preview">("edit");

    // Tail recommendations (music + podcast)
    const [includeRecs, setIncludeRecs] = useState(false);
    const [musicPicks, setMusicPicks] = useState<MusicPick[]>([
        { ...EMPTY_MUSIC_PICK },
        { ...EMPTY_MUSIC_PICK },
        { ...EMPTY_MUSIC_PICK },
    ]);
    const [podcastPick, setPodcastPick] = useState<PodcastPick>({ ...EMPTY_PODCAST_PICK });

    // Send state
    const [sending, setSending] = useState(false);
    const [sendResult, setSendResult] = useState<SendResult | null>(null);
    const [sendError, setSendError] = useState<string | null>(null);
    const [confirming, setConfirming] = useState(false);

    // Test-send state — separate from the production send so a failed test
    // doesn't bury the (more important) batch-send result UI.
    const [testEmail, setTestEmail] = useState("varun_sharma@live.com");
    const [testSending, setTestSending] = useState(false);
    const [testStatus, setTestStatus] = useState<
        | { kind: "ok"; to: string }
        | { kind: "error"; message: string }
        | null
    >(null);

    // -------------------------------------------------------------------------
    // Auth
    // -------------------------------------------------------------------------

    async function onLogin(e: React.FormEvent) {
        e.preventDefault();
        setAuthLoading(true);
        setAuthError(null);
        try {
            // Probe the subscribers API to validate the password without a
            // dedicated /api/admin/ping endpoint.
            const res = await fetch("/api/admin/subscribers?status=active", {
                headers: { Authorization: authHeader(passwordInput) },
            });
            if (res.status === 401) {
                setAuthError("Wrong password.");
                return;
            }
            if (!res.ok) {
                setAuthError(`Unexpected error: ${res.status}`);
                return;
            }
            setAuthed(passwordInput);
        } catch (err) {
            setAuthError(err instanceof Error ? err.message : String(err));
        } finally {
            setAuthLoading(false);
        }
    }

    // -------------------------------------------------------------------------
    // Blog post picker
    // -------------------------------------------------------------------------

    function onSelectPost(slug: string) {
        setSelectedSlug(slug);
        setSendResult(null);
        setSendError(null);

        if (!slug) {
            setSubject("");
            setBodyHtml("");
            setPostUrl("");
            return;
        }

        const post = blogPosts.find((p) => p.slug === slug);
        if (!post) return;

        setSubject(`New post: ${post.title}`);
        setBodyHtml(buildTeaserHtml(post));
        setPostUrl(`https://varunsharma.online/blog/${slug}`);
    }

    // -------------------------------------------------------------------------
    // Send
    // -------------------------------------------------------------------------

    async function doSendTest() {
        if (!authed) return;
        setTestSending(true);
        setTestStatus(null);

        try {
            const payloadMusicPicks = includeRecs
                ? musicPicks.filter(isMusicPickComplete)
                : [];
            const payloadPodcastPick =
                includeRecs && isPodcastPickComplete(podcastPick) ? podcastPick : undefined;

            const res = await fetch("/api/admin/send-test", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader(authed),
                },
                body: JSON.stringify({
                    to: testEmail,
                    subject,
                    bodyHtml,
                    postUrl,
                    musicPicks: payloadMusicPicks,
                    podcastPick: payloadPodcastPick,
                }),
            });

            if (res.status === 401) {
                setTestStatus({ kind: "error", message: "Session expired — reload and sign in again." });
                setAuthed(null);
                return;
            }

            const data = (await res.json()) as { ok?: boolean; error?: string; to?: string };
            if (!res.ok || !data.ok) {
                setTestStatus({
                    kind: "error",
                    message: data.error ?? `Server error: ${res.status}`,
                });
                return;
            }
            setTestStatus({ kind: "ok", to: data.to ?? testEmail });
        } catch (err) {
            setTestStatus({
                kind: "error",
                message: err instanceof Error ? err.message : String(err),
            });
        } finally {
            setTestSending(false);
        }
    }

    async function doSend() {
        if (!authed) return;
        setConfirming(false);
        setSending(true);
        setSendResult(null);
        setSendError(null);

        try {
            const payloadMusicPicks = includeRecs
                ? musicPicks.filter(isMusicPickComplete)
                : [];
            const payloadPodcastPick =
                includeRecs && isPodcastPickComplete(podcastPick) ? podcastPick : undefined;

            const res = await fetch("/api/admin/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader(authed),
                },
                body: JSON.stringify({
                    subject,
                    bodyHtml,
                    postUrl,
                    musicPicks: payloadMusicPicks,
                    podcastPick: payloadPodcastPick,
                }),
            });

            if (res.status === 401) {
                setSendError("Session expired — reload and sign in again.");
                setAuthed(null);
                return;
            }

            const data = (await res.json()) as SendResult & { error?: string };
            if (!res.ok) {
                setSendError(data.error ?? `Server error: ${res.status}`);
                return;
            }

            setSendResult(data);
        } catch (err) {
            setSendError(err instanceof Error ? err.message : String(err));
        } finally {
            setSending(false);
        }
    }

    // -------------------------------------------------------------------------
    // Render: login screen
    // -------------------------------------------------------------------------

    if (!authed) {
        return (
            <div
                style={{
                    maxWidth: "320px",
                    margin: "5rem auto",
                    padding: "0 1rem",
                    textAlign: "center",
                    color: "var(--foreground, #1a1a1a)",
                }}
            >
                <h1 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.25rem" }}>
                    Admin
                </h1>
                <form onSubmit={onLogin}>
                    <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Password"
                        autoFocus
                        autoComplete="current-password"
                        style={{
                            width: "100%",
                            padding: "0.55rem 0.75rem",
                            marginBottom: "0.75rem",
                            borderRadius: "6px",
                            border: "1px solid var(--card-border, #d1d5db)",
                            background: "var(--background, #fff)",
                            color: "var(--foreground, #1a1a1a)",
                            fontSize: "0.95rem",
                            boxSizing: "border-box",
                        }}
                    />
                    <button
                        type="submit"
                        disabled={authLoading || !passwordInput}
                        style={{
                            width: "100%",
                            padding: "0.55rem 1rem",
                            borderRadius: "6px",
                            border: "none",
                            background: "var(--foreground, #1a1a1a)",
                            color: "var(--background, #fff)",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            cursor: authLoading ? "wait" : "pointer",
                        }}
                    >
                        {authLoading ? "…" : "Sign in"}
                    </button>
                </form>
                {authError && (
                    <p style={{ color: "#c0392b", marginTop: "0.85rem", fontSize: "0.85rem" }}>
                        {authError}
                    </p>
                )}
            </div>
        );
    }

    // -------------------------------------------------------------------------
    // Render: compose UI
    // -------------------------------------------------------------------------

    const canSend = subject.trim().length > 0 && bodyHtml.trim().length > 0 && !sending;

    return (
        <div
            style={{
                maxWidth: "860px",
                margin: "2rem auto",
                padding: "0 1rem",
                color: "var(--foreground, #1a1a1a)",
            }}
        >
            <AdminNav password={authed} />

            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                Compose newsletter
            </h1>
            <p style={{ margin: "0 0 1.75rem", fontSize: "0.875rem", color: "var(--muted, #666)" }}>
                Select a post to auto-fill, edit freely, then send to all active subscribers.
            </p>

            {/* Blog post picker */}
            <div style={{ marginBottom: "1.25rem" }}>
                <label
                    htmlFor="post-picker"
                    style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem", color: "var(--muted, #666)", textTransform: "uppercase", letterSpacing: "0.04em" }}
                >
                    Auto-fill from post
                </label>
                <select
                    id="post-picker"
                    value={selectedSlug}
                    onChange={(e) => onSelectPost(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "0.55rem 0.75rem",
                        borderRadius: "6px",
                        border: "1px solid var(--card-border, #d1d5db)",
                        background: "var(--background, #fff)",
                        color: "var(--foreground, #1a1a1a)",
                        fontSize: "0.9rem",
                    }}
                >
                    <option value="">— Custom (start from scratch) —</option>
                    {blogPosts.map((p) => (
                        <option key={p.slug} value={p.slug}>
                            {p.title} ({p.date})
                        </option>
                    ))}
                </select>
            </div>

            {/* Subject */}
            <div style={{ marginBottom: "1.25rem" }}>
                <label
                    htmlFor="subject"
                    style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem", color: "var(--muted, #666)", textTransform: "uppercase", letterSpacing: "0.04em" }}
                >
                    Subject
                </label>
                <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Email subject line"
                    style={{
                        width: "100%",
                        padding: "0.55rem 0.75rem",
                        borderRadius: "6px",
                        border: "1px solid var(--card-border, #d1d5db)",
                        background: "var(--background, #fff)",
                        color: "var(--foreground, #1a1a1a)",
                        fontSize: "0.9rem",
                        boxSizing: "border-box",
                    }}
                />
            </div>

            {/* Post URL */}
            <div style={{ marginBottom: "1.25rem" }}>
                <label
                    htmlFor="post-url"
                    style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem", color: "var(--muted, #666)", textTransform: "uppercase", letterSpacing: "0.04em" }}
                >
                    Post URL <span style={{ fontWeight: 400, textTransform: "none" }}>(optional — shows "Read full post" button)</span>
                </label>
                <input
                    id="post-url"
                    type="url"
                    value={postUrl}
                    onChange={(e) => setPostUrl(e.target.value)}
                    placeholder="https://varunsharma.online/blog/…"
                    style={{
                        width: "100%",
                        padding: "0.55rem 0.75rem",
                        borderRadius: "6px",
                        border: "1px solid var(--card-border, #d1d5db)",
                        background: "var(--background, #fff)",
                        color: "var(--foreground, #1a1a1a)",
                        fontSize: "0.9rem",
                        boxSizing: "border-box",
                    }}
                />
            </div>

            {/* Body — edit / preview tabs */}
            <div style={{ marginBottom: "1.5rem" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "0.4rem",
                    }}
                >
                    <label
                        style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted, #666)", textTransform: "uppercase", letterSpacing: "0.04em" }}
                    >
                        Email body (HTML)
                    </label>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        {(["edit", "preview"] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                style={{
                                    padding: "0.25rem 0.7rem",
                                    borderRadius: "5px",
                                    border: "1px solid var(--card-border, #d1d5db)",
                                    background: tab === t ? "var(--foreground, #1a1a1a)" : "var(--background, #fff)",
                                    color: tab === t ? "var(--background, #fff)" : "var(--foreground, #1a1a1a)",
                                    fontSize: "0.8rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    textTransform: "capitalize",
                                }}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {tab === "edit" ? (
                    <textarea
                        value={bodyHtml}
                        onChange={(e) => setBodyHtml(e.target.value)}
                        placeholder="<p>Your email content here...</p>"
                        rows={14}
                        style={{
                            width: "100%",
                            padding: "0.75rem",
                            borderRadius: "6px",
                            border: "1px solid var(--card-border, #d1d5db)",
                            background: "var(--background, #fff)",
                            color: "var(--foreground, #1a1a1a)",
                            fontSize: "0.85rem",
                            fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace",
                            lineHeight: "1.55",
                            resize: "vertical",
                            boxSizing: "border-box",
                        }}
                    />
                ) : (
                    <div
                        style={{
                            border: "1px solid var(--card-border, #d1d5db)",
                            borderRadius: "6px",
                            overflow: "hidden",
                            minHeight: "320px",
                            background: "#f4f4f5",
                        }}
                    >
                        {/* Simplified preview — email shell mirrored from buildNewsletterEmailHtml */}
                        <div
                            style={{
                                maxWidth: "520px",
                                margin: "24px auto",
                                background: "#fff",
                                borderRadius: "6px",
                                border: "1px solid #e4e4e7",
                                fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif",
                                overflow: "hidden",
                            }}
                        >
                            {/* Header */}
                            <div style={{ padding: "20px 28px 16px", borderBottom: "1px solid #f0f0f0" }}>
                                <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#71717a" }}>
                                    Varun Sharma
                                </p>
                            </div>
                            {/* Body */}
                            <div
                                style={{ padding: "28px 28px 20px", fontSize: "15px", lineHeight: "1.7", color: "#18181b" }}
                                dangerouslySetInnerHTML={{ __html: bodyHtml || "<p style='color:#a1a1aa;'>Nothing to preview yet.</p>" }}
                            />
                            {/* CTA */}
                            {postUrl && (
                                <div style={{ padding: "0 28px 28px" }}>
                                    <span
                                        style={{
                                            display: "inline-block",
                                            padding: "10px 20px",
                                            background: "#1a1a1a",
                                            color: "#fff",
                                            borderRadius: "5px",
                                            fontSize: "13px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Read the full post →
                                    </span>
                                </div>
                            )}
                            {/* Music + podcast recs (preview) */}
                            {includeRecs && musicPicks.some(isMusicPickComplete) && (
                                <div style={{ padding: "20px 28px 4px", borderTop: "1px solid #f0f0f0" }}>
                                    <p style={{ margin: "0 0 14px", fontSize: "16px", fontWeight: 700, color: "#18181b", letterSpacing: "-0.01em" }}>
                                        What I&apos;m listening to
                                    </p>
                                    {musicPicks.filter(isMusicPickComplete).map((p, i) => (
                                        <PreviewPickRow
                                            key={i}
                                            primary={p.track}
                                            secondary={p.artist}
                                            why={p.why}
                                        />
                                    ))}
                                </div>
                            )}
                            {includeRecs && isPodcastPickComplete(podcastPick) && (
                                <div style={{ padding: "8px 28px 24px" }}>
                                    <p style={{ margin: "0 0 14px", fontSize: "16px", fontWeight: 700, color: "#18181b", letterSpacing: "-0.01em" }}>
                                        Podcast pick
                                    </p>
                                    <PreviewPickRow
                                        primary={podcastPick.episode}
                                        secondary={podcastPick.show}
                                        why={podcastPick.why}
                                    />
                                </div>
                            )}
                            {includeRecs &&
                                (musicPicks.some(isMusicPickComplete) || isPodcastPickComplete(podcastPick)) && (
                                    <p style={{ margin: "0 28px 16px", fontSize: "10px", color: "#a1a1aa", fontStyle: "italic" }}>
                                        Album & podcast art added automatically when sent.
                                    </p>
                                )}
                            {/* Footer */}
                            <div style={{ padding: "16px 28px", borderTop: "1px solid #f0f0f0", background: "#fafafa" }}>
                                <p style={{ margin: 0, fontSize: "11px", color: "#a1a1aa" }}>
                                    varunsharma.online · <u>Unsubscribe</u>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Music + podcast recs editor */}
            <div
                style={{
                    marginBottom: "1.5rem",
                    padding: "1.1rem 1.25rem 1.25rem",
                    border: "1px solid var(--card-border, #d1d5db)",
                    borderRadius: "8px",
                    background: "var(--background, #fff)",
                }}
            >
                <label
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.55rem",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "var(--foreground, #1a1a1a)",
                    }}
                >
                    <input
                        type="checkbox"
                        checked={includeRecs}
                        onChange={(e) => setIncludeRecs(e.target.checked)}
                        style={{ width: "16px", height: "16px", accentColor: "#1a1a1a", cursor: "pointer" }}
                    />
                    Include &ldquo;What I&apos;m listening to&rdquo; + &ldquo;Podcast pick&rdquo;
                </label>
                <p
                    style={{
                        margin: "0.4rem 0 0 1.7rem",
                        fontSize: "0.8rem",
                        color: "var(--muted, #666)",
                    }}
                >
                    Optional tail sections after the post. Rows missing any field are skipped silently.
                </p>

                {includeRecs && (
                    <div style={{ marginTop: "1.1rem" }}>
                        {/* Music picks */}
                        <p
                            style={{
                                margin: "0 0 0.6rem",
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                color: "var(--muted, #666)",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            What I&apos;m listening to · 3 tracks
                        </p>
                        {musicPicks.map((pick, idx) => (
                            <div
                                key={idx}
                                style={{
                                    marginBottom: "0.85rem",
                                    padding: "0.7rem 0.85rem",
                                    border: "1px solid var(--card-border, #e5e7eb)",
                                    borderRadius: "6px",
                                    background: "var(--background, #fafafa)",
                                }}
                            >
                                <p
                                    style={{
                                        margin: "0 0 0.5rem",
                                        fontSize: "0.7rem",
                                        fontWeight: 700,
                                        color: "var(--muted, #888)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    Track {idx + 1}
                                </p>
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: "0.5rem",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    <input
                                        type="text"
                                        value={pick.track}
                                        placeholder="Track name"
                                        onChange={(e) => {
                                            const next = [...musicPicks];
                                            next[idx] = { ...pick, track: e.target.value };
                                            setMusicPicks(next);
                                        }}
                                        style={inputStyle}
                                    />
                                    <input
                                        type="text"
                                        value={pick.artist}
                                        placeholder="Artist"
                                        onChange={(e) => {
                                            const next = [...musicPicks];
                                            next[idx] = { ...pick, artist: e.target.value };
                                            setMusicPicks(next);
                                        }}
                                        style={inputStyle}
                                    />
                                </div>
                                <input
                                    type="url"
                                    value={pick.spotifyUrl}
                                    placeholder="https://open.spotify.com/track/..."
                                    onChange={(e) => {
                                        const next = [...musicPicks];
                                        next[idx] = { ...pick, spotifyUrl: e.target.value };
                                        setMusicPicks(next);
                                    }}
                                    style={{ ...inputStyle, width: "100%", marginBottom: "0.5rem" }}
                                />
                                <textarea
                                    value={pick.why}
                                    placeholder="Why I like it (one or two sentences)"
                                    rows={2}
                                    onChange={(e) => {
                                        const next = [...musicPicks];
                                        next[idx] = { ...pick, why: e.target.value };
                                        setMusicPicks(next);
                                    }}
                                    style={{ ...inputStyle, width: "100%", resize: "vertical" }}
                                />
                            </div>
                        ))}

                        {/* Podcast pick */}
                        <p
                            style={{
                                margin: "1.1rem 0 0.6rem",
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                color: "var(--muted, #666)",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            Podcast pick · 1 episode
                        </p>
                        <div
                            style={{
                                padding: "0.7rem 0.85rem",
                                border: "1px solid var(--card-border, #e5e7eb)",
                                borderRadius: "6px",
                                background: "var(--background, #fafafa)",
                            }}
                        >
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "0.5rem",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                <input
                                    type="text"
                                    value={podcastPick.show}
                                    placeholder="Show name"
                                    onChange={(e) =>
                                        setPodcastPick({ ...podcastPick, show: e.target.value })
                                    }
                                    style={inputStyle}
                                />
                                <input
                                    type="text"
                                    value={podcastPick.episode}
                                    placeholder="Episode title"
                                    onChange={(e) =>
                                        setPodcastPick({ ...podcastPick, episode: e.target.value })
                                    }
                                    style={inputStyle}
                                />
                            </div>
                            <input
                                type="url"
                                value={podcastPick.spotifyUrl}
                                placeholder="https://open.spotify.com/episode/..."
                                onChange={(e) =>
                                    setPodcastPick({ ...podcastPick, spotifyUrl: e.target.value })
                                }
                                style={{ ...inputStyle, width: "100%", marginBottom: "0.5rem" }}
                            />
                            <textarea
                                value={podcastPick.why}
                                placeholder="Why this episode (one or two sentences)"
                                rows={2}
                                onChange={(e) =>
                                    setPodcastPick({ ...podcastPick, why: e.target.value })
                                }
                                style={{ ...inputStyle, width: "100%", resize: "vertical" }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Test-send area */}
            <div
                style={{
                    marginBottom: "1rem",
                    padding: "0.85rem 1rem",
                    border: "1px dashed var(--card-border, #d1d5db)",
                    borderRadius: "6px",
                    background: "var(--background, #fafafa)",
                }}
            >
                <p
                    style={{
                        margin: "0 0 0.5rem",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "var(--muted, #666)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                    }}
                >
                    Send a test
                </p>
                <div
                    style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <input
                        type="email"
                        value={testEmail}
                        onChange={(e) => {
                            setTestEmail(e.target.value);
                            setTestStatus(null);
                        }}
                        placeholder="you@example.com"
                        style={{
                            ...inputStyle,
                            flex: "1 1 240px",
                            minWidth: 0,
                        }}
                    />
                    <button
                        onClick={doSendTest}
                        disabled={
                            !canSend ||
                            testSending ||
                            !testEmail.trim()
                        }
                        style={{
                            padding: "0.5rem 1.1rem",
                            borderRadius: "5px",
                            border: "1px solid var(--card-border, #d1d5db)",
                            background: "var(--background, #fff)",
                            color: "var(--foreground, #1a1a1a)",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            cursor: canSend && !testSending && testEmail.trim() ? "pointer" : "not-allowed",
                            opacity: canSend && !testSending && testEmail.trim() ? 1 : 0.55,
                        }}
                    >
                        {testSending ? "Sending test…" : "Send test"}
                    </button>
                </div>
                <p
                    style={{
                        margin: "0.5rem 0 0",
                        fontSize: "0.75rem",
                        color: "var(--muted, #888)",
                    }}
                >
                    Subject is prefixed with <code style={{ fontFamily: "ui-monospace, monospace" }}>[TEST]</code>. Doesn&apos;t touch the subscriber list.
                </p>
                {testStatus?.kind === "ok" && (
                    <p
                        style={{
                            margin: "0.55rem 0 0",
                            fontSize: "0.8rem",
                            color: "#166534",
                            fontWeight: 600,
                        }}
                    >
                        ✓ Test sent to {testStatus.to}. Check your inbox.
                    </p>
                )}
                {testStatus?.kind === "error" && (
                    <p
                        style={{
                            margin: "0.55rem 0 0",
                            fontSize: "0.8rem",
                            color: "#991b1b",
                            fontWeight: 600,
                        }}
                    >
                        Test failed: {testStatus.message}
                    </p>
                )}
            </div>

            {/* Send area */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    flexWrap: "wrap",
                }}
            >
                {!confirming ? (
                    <button
                        onClick={() => setConfirming(true)}
                        disabled={!canSend}
                        style={{
                            padding: "0.6rem 1.4rem",
                            borderRadius: "6px",
                            border: "none",
                            background: canSend ? "var(--foreground, #1a1a1a)" : "var(--card-border, #d1d5db)",
                            color: canSend ? "var(--background, #fff)" : "var(--muted, #888)",
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            cursor: canSend ? "pointer" : "not-allowed",
                        }}
                    >
                        {sending ? "Sending…" : "Send to all active subscribers →"}
                    </button>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            padding: "0.65rem 1rem",
                            borderRadius: "6px",
                            border: "1px solid var(--card-border, #d1d5db)",
                            background: "var(--background, #fff)",
                            flexWrap: "wrap",
                        }}
                    >
                        <span style={{ fontSize: "0.9rem" }}>
                            Are you sure? This sends to every active subscriber.
                        </span>
                        <button
                            onClick={doSend}
                            style={{
                                padding: "0.4rem 1rem",
                                borderRadius: "5px",
                                border: "none",
                                background: "#c0392b",
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "0.875rem",
                                cursor: "pointer",
                            }}
                        >
                            Yes, send it
                        </button>
                        <button
                            onClick={() => setConfirming(false)}
                            style={{
                                padding: "0.4rem 0.9rem",
                                borderRadius: "5px",
                                border: "1px solid var(--card-border, #d1d5db)",
                                background: "transparent",
                                color: "var(--foreground, #1a1a1a)",
                                fontSize: "0.875rem",
                                cursor: "pointer",
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {/* Result */}
            {sendError && (
                <div
                    style={{
                        marginTop: "1rem",
                        padding: "0.75rem 1rem",
                        borderRadius: "6px",
                        background: "#fef2f2",
                        border: "1px solid #fecaca",
                        color: "#991b1b",
                        fontSize: "0.875rem",
                    }}
                >
                    {sendError}
                </div>
            )}

            {sendResult && (
                <div
                    style={{
                        marginTop: "1rem",
                        padding: "0.75rem 1rem",
                        borderRadius: "6px",
                        background: sendResult.failed === 0 ? "#f0fdf4" : "#fffbeb",
                        border: `1px solid ${sendResult.failed === 0 ? "#bbf7d0" : "#fde68a"}`,
                        color: sendResult.failed === 0 ? "#166534" : "#92400e",
                        fontSize: "0.875rem",
                    }}
                >
                    {sendResult.message ? (
                        <p style={{ margin: 0 }}>{sendResult.message}</p>
                    ) : (
                        <>
                            <p style={{ margin: "0 0 4px", fontWeight: 700 }}>
                                ✓ {sendResult.sent} sent
                                {sendResult.failed > 0 && ` · ${sendResult.failed} failed`}
                            </p>
                            {sendResult.errors.length > 0 && (
                                <ul style={{ margin: "6px 0 0", paddingLeft: "1.2rem", fontSize: "0.8rem" }}>
                                    {sendResult.errors.slice(0, 5).map((e, i) => (
                                        <li key={i}>
                                            {e.to}: {e.error}
                                        </li>
                                    ))}
                                    {sendResult.errors.length > 5 && (
                                        <li>…and {sendResult.errors.length - 5} more</li>
                                    )}
                                </ul>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
