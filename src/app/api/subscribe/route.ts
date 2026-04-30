/**
 * POST /api/subscribe
 *
 * Accepts { email, source? }. Always returns 200 with the same generic "check
 * your inbox" message, regardless of whether the address was new, already
 * pending, or already active — this prevents email enumeration.
 *
 * Re-subscribes (previously unsubscribed) rotate the token and flip back to
 * pending so the person can confirm again.
 */
import { NextRequest, NextResponse } from "next/server";
import {
    findSubscriberByEmail,
    insertPendingSubscriber,
    resetSubscriberForReSignup,
    getEnv,
} from "@/lib/db";
import { generateToken, normalizeEmail } from "@/lib/tokens";
import { sendEmail } from "@/lib/resend";
import { confirmationEmail } from "@/lib/email-templates";

// Generic response used for the happy path + "already subscribed" + invalid email.
// The UI treats this as success — we never leak whether the address exists.
const GENERIC_OK = {
    ok: true,
    message: "Check your inbox for a confirmation link.",
};

export async function POST(req: NextRequest) {
    let body: { email?: unknown; source?: unknown; website?: unknown };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
    }

    // Simple honeypot — the form has a hidden `website` input that real users
    // never fill. If a bot posts it, silently accept and do nothing.
    if (typeof body.website === "string" && body.website.length > 0) {
        return NextResponse.json(GENERIC_OK);
    }

    const email = typeof body.email === "string" ? normalizeEmail(body.email) : null;
    if (!email) {
        // Return generic OK anyway — no enumeration, and the UI stays simple.
        return NextResponse.json(GENERIC_OK);
    }

    const source = typeof body.source === "string" ? body.source.slice(0, 64) : "unknown";

    const existing = await findSubscriberByEmail(email);
    const token = generateToken();

    if (!existing) {
        await insertPendingSubscriber(email, token, source);
    } else if (existing.status === "unsubscribed" || existing.status === "pending") {
        // Let them confirm again with a fresh token.
        await resetSubscriberForReSignup(email, token, source);
    } else {
        // Already active. Don't send another confirmation — just return OK.
        return NextResponse.json(GENERIC_OK);
    }

    const { siteUrl } = (() => {
        const env = getEnv();
        return { siteUrl: env?.SITE_URL ?? new URL(req.url).origin };
    })();

    const { subject, html, text } = confirmationEmail({ siteUrl, token });

    const sendResult = await sendEmail({
        to: email,
        subject,
        html,
        text,
        idempotencyKey: `confirm:${token}`,
        // One-click unsubscribe — works even on the pre-confirm email because
        // our /api/unsubscribe handler is idempotent across all statuses.
        listUnsubscribeUrl: `${siteUrl}/api/unsubscribe?token=${token}`,
    });

    if (!sendResult.ok) {
        // Log server-side; still return generic OK to the user so the form
        // doesn't reveal internal errors.
        console.error("Confirmation email failed:", sendResult.error);
    }

    return NextResponse.json(GENERIC_OK);
}
