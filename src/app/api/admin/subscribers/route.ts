/**
 * GET /api/admin/subscribers
 *
 * Returns the subscriber list. Defaults to JSON; pass `?format=csv` for a
 * downloadable CSV. Optional `?status=pending|active|unsubscribed` filters.
 *
 * Gated by HTTP Basic Auth — any username + ADMIN_PASSWORD.
 */
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { listSubscribers, type AdminSubscriberRow, type SubscriberStatus } from "@/lib/db";

export async function GET(req: NextRequest) {
    const denied = requireAdmin(req);
    if (denied) return denied;

    const url = new URL(req.url);
    const format = url.searchParams.get("format") ?? "json";
    const statusParam = url.searchParams.get("status");
    const status = isValidStatus(statusParam) ? statusParam : undefined;

    const subscribers = await listSubscribers(status);

    if (format === "csv") {
        const csv = toCsv(subscribers);
        const filename = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
        return new NextResponse(csv, {
            status: 200,
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": `attachment; filename="${filename}"`,
                // Avoid intermediaries caching the list.
                "Cache-Control": "no-store",
            },
        });
    }

    return NextResponse.json(
        { subscribers },
        { headers: { "Cache-Control": "no-store" } }
    );
}

function isValidStatus(s: string | null): s is SubscriberStatus {
    return s === "pending" || s === "active" || s === "unsubscribed";
}

function toCsv(rows: AdminSubscriberRow[]): string {
    const header = [
        "email",
        "status",
        "source",
        "subscribed_at",
        "confirmed_at",
        "unsubscribed_at",
    ];
    const lines = [header.join(",")];
    for (const r of rows) {
        lines.push(
            [
                csvEscape(r.email),
                csvEscape(r.status),
                csvEscape(r.source ?? ""),
                isoOrEmpty(r.subscribed_at),
                isoOrEmpty(r.confirmed_at),
                isoOrEmpty(r.unsubscribed_at),
            ].join(",")
        );
    }
    return lines.join("\n");
}

function csvEscape(s: string): string {
    if (/[",\n\r]/.test(s)) {
        return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
}

function isoOrEmpty(ts: number | null | undefined): string {
    if (ts === null || ts === undefined) return "";
    return new Date(ts * 1000).toISOString();
}
