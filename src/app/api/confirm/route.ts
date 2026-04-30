/**
 * GET /api/confirm?token=...
 *
 * Landing point for the link inside the confirmation email.
 * On valid token: flip to active, redirect to /newsletter/confirmed.
 * On bad/expired token: redirect to /newsletter/confirmed?error=invalid.
 */
import { NextRequest, NextResponse } from "next/server";
import { findSubscriberByToken, markSubscriberActive, getEnv } from "@/lib/db";

function siteUrlFrom(req: NextRequest): string {
    const env = getEnv();
    return env?.SITE_URL ?? new URL(req.url).origin;
}

export async function GET(req: NextRequest) {
    const token = new URL(req.url).searchParams.get("token");
    const base = siteUrlFrom(req);

    if (!token) {
        return NextResponse.redirect(`${base}/newsletter/confirmed?error=invalid`);
    }

    const row = await findSubscriberByToken(token);

    // Valid token, pending → activate.
    if (row && row.status === "pending") {
        await markSubscriberActive(row.id);
        return NextResponse.redirect(`${base}/newsletter/confirmed`);
    }

    // Already active → idempotent success (user clicked the link twice).
    if (row && row.status === "active") {
        return NextResponse.redirect(`${base}/newsletter/confirmed`);
    }

    // Unsubscribed, or token doesn't match anything → invalid.
    return NextResponse.redirect(`${base}/newsletter/confirmed?error=invalid`);
}
