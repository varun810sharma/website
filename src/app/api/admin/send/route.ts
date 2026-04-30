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
} from "@/lib/resend";

export async function POST(req: NextRequest) {
    const denied = requireAdmin(req);
    if (denied) return denied;

    // Parse + validate body.
    let body: { subject?: string; bodyHtml?: string; postUrl?: string };
    try {
        body = (await req.json()) as typeof body;
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const subject = body.subject?.trim() ?? "";
    const bodyHtml = body.bodyHtml?.trim() ?? "";
    const postUrl = body.postUrl?.trim() ?? "";

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

    // Build per-recipient email items.
    const items: BatchItem[] = subscribers.map((sub) => {
        const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?token=${sub.token}`;
        const html = buildNewsletterEmailHtml({
            title: subject,
            bodyHtml,
            postUrl,
            unsubscribeUrl,
        });
        // Plain-text fallback: strip HTML tags from bodyHtml.
        const text = [
            subject,
            "",
            stripTags(bodyHtml),
            "",
            ...(postUrl ? [`Read more: ${postUrl}`, ""] : []),
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
