/**
 * Minimal Resend HTTP client. We hit the API directly via `fetch` to avoid
 * SDK version coupling with Next 16 / Workers runtime.
 *
 * Docs: https://resend.com/docs/api-reference/emails/send-email
 */
import { getEnv } from "./db";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/**
 * The from-address used for all transactional + newsletter email.
 * Must match (or be on) your Resend-verified domain.
 */
export const FROM_ADDRESS = "Varun Sharma <hi@varunsharma.online>";

/**
 * The reply-to address shown to recipients. If someone replies to a newsletter,
 * this is where it goes. Set to whichever inbox you actually read.
 */
export const REPLY_TO_ADDRESS = "hi@varunsharma.online";

export interface SendEmailInput {
    to: string;
    subject: string;
    html: string;
    text?: string; // plain-text fallback (recommended for deliverability)
    /** Optional: overrides default FROM_ADDRESS. */
    from?: string;
    /** Optional: Resend idempotency key to prevent double-sends on retry. */
    idempotencyKey?: string;
    /**
     * Optional: absolute URL for one-click unsubscribe. When set we attach
     * RFC 8058 `List-Unsubscribe` + `List-Unsubscribe-Post` headers so Gmail
     * and Outlook show a native "unsubscribe" link and don't penalize the
     * message as bulk-unattributed mail.
     */
    listUnsubscribeUrl?: string;
}

export interface SendEmailResult {
    ok: boolean;
    id?: string;
    error?: string;
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
    const env = getEnv();
    if (!env?.RESEND_API_KEY) {
        return { ok: false, error: "RESEND_API_KEY is not configured" };
    }

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
    };
    if (input.idempotencyKey) {
        headers["Idempotency-Key"] = input.idempotencyKey;
    }

    // Custom headers forwarded by Resend to the recipient's MTA. These are
    // distinct from the HTTP request headers above (auth + idempotency).
    const customHeaders: Record<string, string> = {};
    if (input.listUnsubscribeUrl) {
        customHeaders["List-Unsubscribe"] = `<${input.listUnsubscribeUrl}>`;
        customHeaders["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click";
    }

    const body: Record<string, unknown> = {
        from: input.from ?? FROM_ADDRESS,
        to: [input.to],
        subject: input.subject,
        html: input.html,
        text: input.text,
        reply_to: REPLY_TO_ADDRESS,
    };
    if (Object.keys(customHeaders).length > 0) {
        body.headers = customHeaders;
    }

    try {
        const res = await fetch(RESEND_ENDPOINT, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            const errText = await res.text();
            return { ok: false, error: `Resend ${res.status}: ${errText}` };
        }
        const json = (await res.json()) as { id?: string };
        return { ok: true, id: json.id };
    } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
}
