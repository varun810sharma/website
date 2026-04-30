/**
 * Minimal Resend HTTP client. We hit the API directly via `fetch` to avoid
 * SDK version coupling with Next 16 / Workers runtime.
 *
 * Docs: https://resend.com/docs/api-reference/emails/send-email
 */
import { getEnv } from "./db";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const RESEND_BATCH_ENDPOINT = "https://api.resend.com/emails/batch";

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

// ---------------------------------------------------------------------------
// Newsletter batch send
// ---------------------------------------------------------------------------

export interface BatchItem {
    /** Recipient email address. */
    to: string;
    subject: string;
    html: string;
    /** Plain-text fallback for deliverability. */
    text?: string;
    /** Per-recipient one-click unsubscribe URL. */
    unsubscribeUrl: string;
}

export interface BatchSendResult {
    sent: number;
    failed: number;
    errors: Array<{ to: string; error: string }>;
}

/**
 * Send newsletters via the Resend batch endpoint (up to 100 per request).
 * Automatically chunks larger lists into sequential batches.
 */
export async function sendNewsletterBatch(items: BatchItem[]): Promise<BatchSendResult> {
    const env = getEnv();
    if (!env?.RESEND_API_KEY) {
        return {
            sent: 0,
            failed: items.length,
            errors: [{ to: "*", error: "RESEND_API_KEY is not configured" }],
        };
    }

    const CHUNK_SIZE = 100;
    let sent = 0;
    let failed = 0;
    const errors: Array<{ to: string; error: string }> = [];

    for (let i = 0; i < items.length; i += CHUNK_SIZE) {
        const chunk = items.slice(i, i + CHUNK_SIZE);
        const payload = chunk.map((item) => ({
            from: FROM_ADDRESS,
            to: [item.to],
            subject: item.subject,
            html: item.html,
            text: item.text,
            reply_to: REPLY_TO_ADDRESS,
            headers: {
                "List-Unsubscribe": `<${item.unsubscribeUrl}>`,
                "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            },
        }));

        try {
            const res = await fetch(RESEND_BATCH_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${env.RESEND_API_KEY}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errText = await res.text();
                for (const item of chunk) {
                    errors.push({ to: item.to, error: `Resend ${res.status}: ${errText}` });
                }
                failed += chunk.length;
            } else {
                sent += chunk.length;
            }
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            for (const item of chunk) {
                errors.push({ to: item.to, error: msg });
            }
            failed += chunk.length;
        }
    }

    return { sent, failed, errors };
}

// ---------------------------------------------------------------------------
// Newsletter email template
// ---------------------------------------------------------------------------

/**
 * Wraps the admin-authored `bodyHtml` in a clean, responsive email shell.
 * The shell provides the from-header, optional "Read full post" CTA, and an
 * unsubscribe footer.  `bodyHtml` should be inline-styled for email clients.
 */
export function buildNewsletterEmailHtml(opts: {
    title: string;
    bodyHtml: string;
    /** Absolute URL of the post on the site. Pass empty string to omit CTA. */
    postUrl: string;
    /** Per-recipient one-click unsubscribe URL. */
    unsubscribeUrl: string;
}): string {
    const ctaBlock = opts.postUrl
        ? `<tr>
            <td style="padding:0 32px 32px;">
              <a href="${opts.postUrl}" style="display:inline-block;padding:12px 24px;background:#1a1a1a;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;font-size:14px;letter-spacing:0.01em;">Read the full post →</a>
            </td>
          </tr>`
        : "";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${escHtml(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;border:1px solid #e4e4e7;overflow:hidden;">

          <!-- Brand header -->
          <tr>
            <td style="padding:24px 32px 20px;border-bottom:1px solid #f0f0f0;">
              <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;">Varun Sharma</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 32px 24px;font-size:15px;line-height:1.7;color:#18181b;">
              ${opts.bodyHtml}
            </td>
          </tr>

          <!-- CTA -->
          ${ctaBlock}

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #f0f0f0;background:#fafafa;">
              <p style="margin:0;font-size:12px;color:#a1a1aa;line-height:1.6;">
                You're receiving this because you subscribed at
                <a href="https://varunsharma.online" style="color:#71717a;text-decoration:none;">varunsharma.online</a>.
                &nbsp;·&nbsp;
                <a href="${opts.unsubscribeUrl}" style="color:#71717a;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
