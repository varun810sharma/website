/**
 * GET /api/unsubscribe?token=...
 *
 * Handles the one-click unsubscribe link that we'll include in the footer of
 * every newsletter issue. One click, no "are you sure?" — this is both a
 * CAN-SPAM expectation and what Gmail's one-click-unsubscribe scanner expects.
 */
import { NextRequest, NextResponse } from "next/server";
import { findSubscriberByToken, markSubscriberUnsubscribed, getEnv } from "@/lib/db";

function siteUrlFrom(req: NextRequest): string {
    const env = getEnv();
    return env?.SITE_URL ?? new URL(req.url).origin;
}

export async function GET(req: NextRequest) {
    const token = new URL(req.url).searchParams.get("token");
    const base = siteUrlFrom(req);

    if (!token) {
        return NextResponse.redirect(`${base}/newsletter/unsubscribed?error=invalid`);
    }

    const row = await findSubscriberByToken(token);

    if (row && row.status !== "unsubscribed") {
        await markSubscriberUnsubscribed(row.id);
    }

    // Always land on the confirmation page — we don't reveal whether the
    // token matched anything.
    return NextResponse.redirect(`${base}/newsletter/unsubscribed`);
}

/**
 * POST handler: Gmail's List-Unsubscribe-Post one-click mechanism sends a POST.
 * Same behaviour as GET.
 */
export async function POST(req: NextRequest) {
    return GET(req);
}
