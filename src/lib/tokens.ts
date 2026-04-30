/**
 * Tiny utilities for tokens + email validation.
 * Web Crypto is available in the Workers runtime, no Node imports needed.
 */

/**
 * Generate a URL-safe opaque token. Used for both confirmation and
 * unsubscribe links. 128 bits of entropy from crypto.randomUUID() is plenty —
 * we just strip hyphens for slightly shorter URLs.
 */
export function generateToken(): string {
    return crypto.randomUUID().replace(/-/g, "");
}

/**
 * Conservative email validator. Not RFC-perfect, but catches every form
 * that Resend will actually deliver to. We also lowercase + trim.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(raw: string): string | null {
    const email = raw.trim().toLowerCase();
    if (email.length === 0 || email.length > 254) return null;
    if (!EMAIL_RE.test(email)) return null;
    return email;
}
