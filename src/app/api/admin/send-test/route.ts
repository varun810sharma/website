/**
 * POST /api/admin/send-test
 *
 * Sends a single test newsletter to one address (typically the admin's own
 * inbox) so you can preview the rendered email before blasting the list.
 * Renders identically to the production send — same shell, same tail
 * sections — so what you see is what subscribers will see.
 *
 * Request body (JSON):
 *   to            — Recipient email address (required)
 *   subject       — Email subject line (required)
 *   bodyHtml      — Inline-styled HTML for the email body (required)
 *   postUrl       — Absolute URL of the related blog post, or "" (optional)
 *   musicPicks    — Optional MusicPick[] for the "What I'm listening to" tail
 *   podcastPick   — Optional PodcastPick for the "Podcast pick" tail
 *
 * Response (JSON):
 *   { ok: true, id: string } on success
 *   { ok: false, error: string } on failure
 *
 * Gated by HTTP Basic Auth (same ADMIN_PASSWORD as /api/admin/subscribers).
 *
 * Notes:
 * - Goes through Resend's single-send endpoint, not the batch endpoint.
 * - Does NOT touch the subscribers table. The unsubscribe URL is a clearly
 *   marked placeholder so you can't accidentally unsubscribe yourself from a
 *   test email.
 */
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getEnv } from "@/lib/db";
import {
    sendEmail,
    buildNewsletterEmailHtml,
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

/**
 * Lightweight email-shape check. Not authoritative (Resend will reject bad
 * addresses anyway), just enough to fail-fast obvious typos.
 */
function looksLikeEmail(s: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: NextRequest) {
    const denied = requireAdmin(req);
    if (denied) return denied;

    let body: {
        to?: string;
        subject?: string;
        bodyHtml?: string;
        postUrl?: string;
        musicPicks?: unknown;
        podcastPick?: unknown;
    };
    try {
        body = (await req.json()) as typeof body;
    } catch {
        return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
    }

    const to = body.to?.trim() ?? "";
    const subject = body.subject?.trim() ?? "";
    const bodyHtml = body.bodyHtml?.trim() ?? "";
    const postUrl = body.postUrl?.trim() ?? "";
    const musicPicks = sanitizeMusicPicks(body.musicPicks);
    const podcastPick = sanitizePodcastPick(body.podcastPick);

    if (!to || !looksLikeEmail(to)) {
        return NextResponse.json(
            { ok: false, error: "`to` must be a valid email address" },
            { status: 400 }
        );
    }
    if (!subject || !bodyHtml) {
        return NextResponse.json(
            { ok: false, error: "`subject` and `bodyHtml` are required" },
            { status: 400 }
        );
    }

    const env = getEnv();
    const siteUrl = (env.SITE_URL ?? "https://varunsharma.online").replace(/\/$/, "");

    // Placeholder unsubscribe URL. Real test recipients (you) should never
    // click "unsubscribe" from a test email anyway, but if they did this
    // would land them on the existing unsubscribe page and fail gracefully
    // because the token won't match a real subscriber.
    const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?token=test-not-real`;

    // Resolve album/show artwork via Spotify oEmbed.  Failures fall through
    // as undefined so the renderer skips the image gracefully.
    const arts = await Promise.all(musicPicks.map((p) => fetchSpotifyArtwork(p.spotifyUrl)));
    const enrichedMusic: MusicPick[] = musicPicks.map((p, i) => ({ ...p, imageUrl: arts[i] }));
    const enrichedPodcast: PodcastPick | undefined = podcastPick
        ? { ...podcastPick, imageUrl: await fetchSpotifyArtwork(podcastPick.spotifyUrl) }
        : undefined;

    const html = buildNewsletterEmailHtml({
        title: subject,
        bodyHtml,
        postUrl,
        unsubscribeUrl,
        musicPicks: enrichedMusic,
        podcastPick: enrichedPodcast,
    });

    // Subject prefix makes test sends visually obvious in the inbox.
    const testSubject = `[TEST] ${subject}`;

    const result = await sendEmail({
        to,
        subject: testSubject,
        html,
        listUnsubscribeUrl: unsubscribeUrl,
    });

    if (!result.ok) {
        return NextResponse.json(
            { ok: false, error: result.error ?? "Send failed" },
            { status: 500 }
        );
    }
    return NextResponse.json(
        { ok: true, id: result.id, to },
        { headers: { "Cache-Control": "no-store" } }
    );
}
