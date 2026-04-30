"use client";

/**
 * /admin/subscribers
 *
 * Password-gated list view of newsletter subscribers, with status filter
 * and CSV export. Auth is HTTP Basic — the password is held only in
 * component state, so a hard refresh requires re-entry.
 */
import { useState, useEffect, useCallback } from "react";

interface Subscriber {
    id: number;
    email: string;
    status: "pending" | "active" | "unsubscribed";
    source: string | null;
    subscribed_at: number;
    confirmed_at: number | null;
    unsubscribed_at: number | null;
}

type StatusFilter = "all" | "pending" | "active" | "unsubscribed";

function authHeader(password: string): string {
    // Basic auth wants "username:password" base64-encoded. Username is unused.
    return "Basic " + btoa(":" + password);
}

export default function AdminSubscribersPage() {
    const [password, setPassword] = useState("");
    const [authed, setAuthed] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

    const load = useCallback(
        async (pw: string, filter: StatusFilter) => {
            setLoading(true);
            setError(null);
            try {
                const url =
                    "/api/admin/subscribers" +
                    (filter !== "all" ? `?status=${filter}` : "");
                const res = await fetch(url, {
                    headers: { Authorization: authHeader(pw) },
                });
                if (res.status === 401) {
                    setAuthed(null);
                    setError("Wrong password.");
                    return;
                }
                if (!res.ok) {
                    setError(`Failed: ${res.status}`);
                    return;
                }
                const data = (await res.json()) as { subscribers: Subscriber[] };
                setSubscribers(data.subscribers);
                setAuthed(pw);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(false);
            }
        },
        []
    );

    function onLogin(e: React.FormEvent) {
        e.preventDefault();
        load(password, statusFilter);
    }

    // Refetch whenever the filter changes (only after the user is authed).
    useEffect(() => {
        if (authed) load(authed, statusFilter);
    }, [statusFilter, authed, load]);

    async function exportCsv() {
        if (!authed) return;
        const url =
            "/api/admin/subscribers?format=csv" +
            (statusFilter !== "all" ? `&status=${statusFilter}` : "");
        try {
            const res = await fetch(url, {
                headers: { Authorization: authHeader(authed) },
            });
            if (!res.ok) {
                setError(`Export failed: ${res.status}`);
                return;
            }
            const blob = await res.blob();
            const a = document.createElement("a");
            const objectUrl = URL.createObjectURL(blob);
            a.href = objectUrl;
            a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        }
    }

    if (!authed) {
        return (
            <div
                style={{
                    maxWidth: "320px",
                    margin: "5rem auto",
                    padding: "0 1rem",
                    textAlign: "center",
                }}
            >
                <h1
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        marginBottom: "1.25rem",
                        color: "var(--foreground, #1a1a1a)",
                    }}
                >
                    Admin
                </h1>
                <form onSubmit={onLogin}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        disabled={loading || !password}
                        style={{
                            width: "100%",
                            padding: "0.55rem 1rem",
                            borderRadius: "6px",
                            border: "1px solid var(--card-border, #d1d5db)",
                            background: "var(--foreground, #1a1a1a)",
                            color: "var(--background, #fff)",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            cursor: loading ? "wait" : "pointer",
                        }}
                    >
                        {loading ? "…" : "Sign in"}
                    </button>
                </form>
                {error && (
                    <p
                        style={{
                            color: "#c0392b",
                            marginTop: "0.85rem",
                            fontSize: "0.85rem",
                        }}
                    >
                        {error}
                    </p>
                )}
            </div>
        );
    }

    const counts = countByStatus(subscribers);

    return (
        <div
            style={{
                maxWidth: "1100px",
                margin: "2rem auto",
                padding: "0 1rem",
                color: "var(--foreground, #1a1a1a)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.25rem",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                }}
            >
                <div>
                    <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
                        Subscribers
                    </h1>
                    <p
                        style={{
                            margin: "0.25rem 0 0",
                            fontSize: "0.85rem",
                            color: "var(--muted, #666)",
                        }}
                    >
                        {subscribers.length} shown · {counts.active} active ·{" "}
                        {counts.pending} pending · {counts.unsubscribed} unsubscribed
                    </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                        style={{
                            padding: "0.4rem 0.6rem",
                            borderRadius: "6px",
                            border: "1px solid var(--card-border, #d1d5db)",
                            background: "var(--background, #fff)",
                            color: "var(--foreground, #1a1a1a)",
                            fontSize: "0.9rem",
                        }}
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="unsubscribed">Unsubscribed</option>
                    </select>
                    <button
                        onClick={exportCsv}
                        style={{
                            padding: "0.4rem 0.85rem",
                            borderRadius: "6px",
                            border: "1px solid var(--card-border, #d1d5db)",
                            background: "var(--background, #fff)",
                            color: "var(--foreground, #1a1a1a)",
                            fontSize: "0.9rem",
                            cursor: "pointer",
                        }}
                    >
                        Export CSV
                    </button>
                </div>
            </div>

            {error && (
                <p
                    style={{
                        color: "#c0392b",
                        marginBottom: "1rem",
                        fontSize: "0.9rem",
                    }}
                >
                    {error}
                </p>
            )}

            <div style={{ overflowX: "auto" }}>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "0.9rem",
                    }}
                >
                    <thead>
                        <tr style={{ borderBottom: "1px solid var(--card-border, #e5e7eb)" }}>
                            <Th>Email</Th>
                            <Th>Status</Th>
                            <Th>Source</Th>
                            <Th>Subscribed</Th>
                            <Th>Confirmed</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers.map((s) => (
                            <tr
                                key={s.id}
                                style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
                            >
                                <Td>{s.email}</Td>
                                <Td>
                                    <StatusBadge status={s.status} />
                                </Td>
                                <Td>{s.source ?? "—"}</Td>
                                <Td>{fmtDate(s.subscribed_at)}</Td>
                                <Td>{s.confirmed_at ? fmtDate(s.confirmed_at) : "—"}</Td>
                            </tr>
                        ))}
                        {subscribers.length === 0 && !loading && (
                            <tr>
                                <td
                                    colSpan={5}
                                    style={{
                                        padding: "2rem 0",
                                        textAlign: "center",
                                        color: "var(--muted, #666)",
                                    }}
                                >
                                    No subscribers in this view.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {loading && (
                <p style={{ color: "var(--muted, #666)", marginTop: "0.75rem" }}>
                    Loading…
                </p>
            )}
        </div>
    );
}

function countByStatus(rows: Subscriber[]): {
    active: number;
    pending: number;
    unsubscribed: number;
} {
    const out = { active: 0, pending: 0, unsubscribed: 0 };
    for (const r of rows) out[r.status]++;
    return out;
}

function fmtDate(ts: number): string {
    return new Date(ts * 1000).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function Th({ children }: { children: React.ReactNode }) {
    return (
        <th
            style={{
                textAlign: "left",
                padding: "0.6rem 0.5rem",
                fontWeight: 600,
                fontSize: "0.75rem",
                color: "var(--muted, #666)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
            }}
        >
            {children}
        </th>
    );
}

function Td({ children }: { children: React.ReactNode }) {
    return <td style={{ padding: "0.65rem 0.5rem" }}>{children}</td>;
}

function StatusBadge({
    status,
}: {
    status: "pending" | "active" | "unsubscribed";
}) {
    const colors: Record<
        Subscriber["status"],
        { bg: string; fg: string }
    > = {
        pending: { bg: "#fef3c7", fg: "#92400e" },
        active: { bg: "#d1fae5", fg: "#065f46" },
        unsubscribed: { bg: "#f3f4f6", fg: "#374151" },
    };
    const c = colors[status];
    return (
        <span
            style={{
                display: "inline-block",
                padding: "0.15rem 0.55rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                background: c.bg,
                color: c.fg,
            }}
        >
            {status}
        </span>
    );
}
