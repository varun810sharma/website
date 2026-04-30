/// <reference types="@cloudflare/workers-types" />
/**
 * D1 database access for Next.js route handlers running on Cloudflare Workers.
 *
 * Cloudflare bindings (like our D1 database, bound as `DB`) aren't available
 * via `process.env` — they live on the Worker's `env` object. OpenNext exposes
 * them through `getCloudflareContext()`.
 */
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Module augmentation: tell TypeScript what's on our Worker's env object.
// OpenNext's getCloudflareContext() returns { env: CloudflareEnv }, so by
// extending CloudflareEnv globally we avoid unsafe casts throughout the code.
declare global {
    interface CloudflareEnv {
        DB: D1Database;
        RESEND_API_KEY: string;
        ADMIN_PASSWORD: string;
        SITE_URL: string;
    }
}

// Kept as an alias for any external code that imported CloudflareBindings.
export type CloudflareBindings = CloudflareEnv;

/**
 * Get the D1 database handle. Throws if the binding is missing
 * (usually means wrangler.jsonc wasn't updated, or you're running outside
 * the Workers runtime).
 */
export function getDB(): D1Database {
    const { env } = getCloudflareContext();
    if (!env?.DB) {
        throw new Error(
            "D1 binding `DB` is not available. Check wrangler.jsonc and make sure you ran the migration."
        );
    }
    return env.DB;
}

/**
 * Get all bindings + secrets in one shot, for code that needs more than just DB.
 */
export function getEnv(): CloudflareEnv {
    const { env } = getCloudflareContext();
    return env;
}

// --- Subscriber model ---

export type SubscriberStatus = "pending" | "active" | "unsubscribed";

export interface SubscriberRow {
    id: number;
    email: string;
    status: SubscriberStatus;
    token: string;
    source: string | null;
    subscribed_at: number;
    confirmed_at: number | null;
    unsubscribed_at: number | null;
}

export async function findSubscriberByEmail(email: string): Promise<SubscriberRow | null> {
    const db = getDB();
    const row = await db
        .prepare("SELECT * FROM subscribers WHERE email = ?")
        .bind(email)
        .first<SubscriberRow>();
    return row ?? null;
}

export async function findSubscriberByToken(token: string): Promise<SubscriberRow | null> {
    const db = getDB();
    const row = await db
        .prepare("SELECT * FROM subscribers WHERE token = ?")
        .bind(token)
        .first<SubscriberRow>();
    return row ?? null;
}

export async function insertPendingSubscriber(
    email: string,
    token: string,
    source: string
): Promise<void> {
    const db = getDB();
    const now = Math.floor(Date.now() / 1000);
    await db
        .prepare(
            `INSERT INTO subscribers (email, status, token, source, subscribed_at)
             VALUES (?, 'pending', ?, ?, ?)`
        )
        .bind(email, token, source, now)
        .run();
}

/**
 * Someone who previously unsubscribed (or whose pending signup expired) tries
 * to sign up again. Rotate the token, flip back to pending, update timestamps.
 */
export async function resetSubscriberForReSignup(
    email: string,
    token: string,
    source: string
): Promise<void> {
    const db = getDB();
    const now = Math.floor(Date.now() / 1000);
    await db
        .prepare(
            `UPDATE subscribers
             SET status = 'pending',
                 token = ?,
                 source = ?,
                 subscribed_at = ?,
                 confirmed_at = NULL,
                 unsubscribed_at = NULL
             WHERE email = ?`
        )
        .bind(token, source, now, email)
        .run();
}

export async function markSubscriberActive(id: number): Promise<void> {
    const db = getDB();
    const now = Math.floor(Date.now() / 1000);
    await db
        .prepare(
            `UPDATE subscribers SET status = 'active', confirmed_at = ? WHERE id = ?`
        )
        .bind(now, id)
        .run();
}

export async function markSubscriberUnsubscribed(id: number): Promise<void> {
    const db = getDB();
    const now = Math.floor(Date.now() / 1000);
    await db
        .prepare(
            `UPDATE subscribers SET status = 'unsubscribed', unsubscribed_at = ? WHERE id = ?`
        )
        .bind(now, id)
        .run();
}

/**
 * List subscribers for the admin view, newest first. Optionally filter by
 * status. We never return the `token` to the admin page — it's a sensitive
 * confirm/unsubscribe credential and there's no admin UX that needs it.
 */
export interface AdminSubscriberRow {
    id: number;
    email: string;
    status: SubscriberStatus;
    source: string | null;
    subscribed_at: number;
    confirmed_at: number | null;
    unsubscribed_at: number | null;
}

export async function listSubscribers(
    status?: SubscriberStatus
): Promise<AdminSubscriberRow[]> {
    const db = getDB();
    const cols = "id, email, status, source, subscribed_at, confirmed_at, unsubscribed_at";
    if (status) {
        const result = await db
            .prepare(
                `SELECT ${cols} FROM subscribers WHERE status = ? ORDER BY subscribed_at DESC`
            )
            .bind(status)
            .all<AdminSubscriberRow>();
        return result.results ?? [];
    }
    const result = await db
        .prepare(`SELECT ${cols} FROM subscribers ORDER BY subscribed_at DESC`)
        .all<AdminSubscriberRow>();
    return result.results ?? [];
}
