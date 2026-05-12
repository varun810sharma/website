/**
 * POST /api/admin/send
 *
 * Sends a newsletter to all active subscribers. Each recipient gets a
 * personalised email with their own unsubscribe token embedded in the
 * List-Unsubscribe header and the footer link.
 *
 * Request body (JSON):
 *   subject   — Email subject line (required)
 *   bodyHtml  — Inline-styled HTML for the email body (required)
 *   postUrl   — Absolute URL of the related blog post, or "" (optional)
 *
 * Response (JSON):
 *   { sent: number, failed: number, errors: [{to, error}] }
 *
 * Gated by HTTP Basic Auth (same ADMIN_PASSWORD as /api/admin/subscribers).
 */
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { listActiveSubscribersForSend, getEnv } from "@/lib/db";
import {
    sendNewsletterBatch,
    buildNewsletterEmailHtml,
    type BatchItem,
    type MusicPick,
    type PodcastPick,
} from "@/lib/resend";
import { fetchSpotifyArtwork } from "@/lib/spotify";

/** Strip stray whitespace from every string field on an object. */
function trimAllStrings<T extends Record<string, unknown>>(o: T): T {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(o)) {
        out[k] = typeof v === "string" ? v.trim() : v;
    }
    return out as T;
}

/** Coerce arbitrary input into a MusicPick[] of length up to 3. Bad input is dropped. */
function sanitizeMusicPicks(input: unknown): MusicPick[] {
    if (!Array.isArray(input)) return [];
    return input
        .slice(0, 3)
        .filter((row): row is Record<string, unknown> => row !== null && typeof row === "object")
        .map((row) =>
            trimAllStrings({
                track: typeof row.track === "string" ? row.track : "",
                artist: typeof row.artist === "string" ? row.artist : "",
                spotifyUrl: typeof row.spotifyUrl === "string" ? row.spotifyUrl : "",
                why: typeof row.why === "string" ? row.why : "",
            })
        );
}

function sanitizePodcastPick(input: unknown): PodcastPick | undefined {
    if (!input || typeof input !== "object") return undefined;
    const row = input as Record<string, unknown>;
    return trimAllStrings({
        show: typeof row.show === "string" ? row.show : "",
        episode: typeof row.episode === "string" ? row.episode : "",
        spotifyUrl: typeof row.spotifyUrl === "string" ? row.spotifyUrl : "",
        why: typeof row.why === "string" ? row.why : "",
    });
}

export async function POST(req: NextRequest) {
    const denied = requireAdmin(req);
    if (denied) return denied;

    // Parse + validate body.
    let body: {
        subject?: string;
        bodyHtml?: string;
        postUrl?: string;
        musicPicks?: unknown;
        podcastPick?: unknown;
    };
    try {
        body = (await req.json()) as typeof body;
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const subject = body.subject?.trim() ?? "";
    const bodyHtml = body.bodyHtml?.trim() ?? "";
    const postUrl = body.postUrl?.trim() ?? "";
    const musicPicks = sanitizeMusicPicks(body.musicPicks);
    const podcastPick = sanitizePodcastPick(body.podcastPick);

    if (!subject || !bodyHtml) {
        return NextResponse.json(
            { error: "`subject` and `bodyHtml` are required" },
            { status: 400 }
        );
    }

    // Fetch active subscribers (includes token for per-recipient unsub URLs).
    const subscribers = await listActiveSubscribersForSend();
    if (subscribers.length === 0) {
        return NextResponse.json({
            sent: 0,
            failed: 0,
            errors: [],
            message: "No active subscribers — nothing to send.",
        });
    }

    const env = getEnv();
    const siteUrl = (env.SITE_URL ?? "https://varunsharma.online").replace(/\/$/, "");

    // Resolve Spotify artwork once before the per-recipient loop.  Each lookup
    // returns undefined on failure so the renderer falls back gracefully.
    const enrichedMusic = await enrichMusicArtwork(musicPicks);
    const enrichedPodcast = await enrichPodcastArtwork(podcastPick);

    // Build per-recipient email items.
    const items: BatchItem[] = subscribers.map((sub) => {
        const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?token=${sub.token}`;
        const html = buildNewsletterEmailHtml({
            title: subject,
            bodyHtml,
            postUrl,
            unsubscribeUrl,
            musicPicks: enrichedMusic,
            podcastPick: enrichedPodcast,
        });
        // Plain-text fallback: strip HTML tags from bodyHtml + serialize tail sections.
        const text = [
            subject,
            "",
            stripTags(bodyHtml),
            "",
            ...(postUrl ? [`Read more: ${postUrl}`, ""] : []),
            ...musicPicksToText(musicPicks),
            ...podcastPickToText(podcastPick),
            `To unsubscribe: ${unsubscribeUrl}`,
        ].join("\n");

        return { to: sub.email, subject, html, text, unsubscribeUrl };
    });

    const result = await sendNewsletterBatch(items);
    return NextResponse.json(result, {
        headers: { "Cache-Control": "no-store" },
    });
}

/** Naïve HTML tag stripper for the plain-text fallback. */
function stripTags(html: string): string {
    return html
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n\n")
        .replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

/**
 * Resolve album artwork for each music pick in parallel.  Picks that don't
 * have a valid Spotify URL or whose lookup fails simply come back without
 * `imageUrl` and the renderer falls back to the no-image layout.
 */
async function enrichMusicArtwork(picks: MusicPick[]): Promise<MusicPick[]> {
    const arts = await Promise.all(picks.map((p) => fetchSpotifyArtwork(p.spotifyUrl)));
    return picks.map((p, i) => ({ ...p, imageUrl: arts[i] }));
}

async function enrichPodcastArtwork(
    pick: PodcastPick | undefined
): Promise<PodcastPick | undefined> {
    if (!pick) return undefined;
    const imageUrl = await fetchSpotifyArtwork(pick.spotifyUrl);
    return { ...pick, imageUrl };
}

/** Serialize music picks for the plain-text fallback. Skips incomplete rows. */
function musicPicksToText(picks: MusicPick[]): string[] {
    const valid = picks.filter(
        (p) => p.track && p.artist && p.spotifyUrl && p.why
    );
    if (valid.length === 0) return [];
    const lines: string[] = ["What I'm listening to", ""];
    for (const p of valid) {
        lines.push(`${p.track} · ${p.artist}`);
        lines.push(p.why);
        lines.push(`Listen: ${p.spotifyUrl}`);
        lines.push("");
    }
    return lines;
}

/** Serialize podcast pick for the plain-text fallback. */
function podcastPickToText(pick: PodcastPick | undefined): string[] {
    if (!pick || !pick.show || !pick.episode || !pick.spotifyUrl || !pick.why) {
        return [];
    }
    return [
        "Podcast pick",
        "",
        `${pick.episode} · ${pick.show}`,
        pick.why,
        `Listen: ${pick.spotifyUrl}`,
        "",
    ];
}
