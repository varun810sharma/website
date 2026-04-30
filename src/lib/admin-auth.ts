/**
 * HTTP Basic Auth gate for admin routes.
 *
 * Compares the password in the Authorization header against ADMIN_PASSWORD.
 * The username is ignored — anyone who knows the password is admin. This is
 * deliberately simple: a one-person admin panel doesn't need user accounts.
 *
 * Returns null when authenticated (caller proceeds), or a 401 NextResponse
 * when not. The 401 carries `WWW-Authenticate: Basic` so a direct browser
 * visit gets the native credential prompt.
 */
import { NextResponse } from "next/server";
import { getEnv } from "./db";

export function requireAdmin(req: Request): NextResponse | null {
    const env = getEnv();
    const expected = env?.ADMIN_PASSWORD;
    if (!expected) {
        // Misconfigured — fail closed rather than letting anyone in.
        return new NextResponse("Admin not configured", { status: 500 });
    }

    const header = req.headers.get("authorization") ?? "";
    const [scheme, encoded] = header.split(" ");
    if (scheme !== "Basic" || !encoded) {
        return unauthorized();
    }

    let decoded: string;
    try {
        decoded = atob(encoded);
    } catch {
        return unauthorized();
    }

    // Basic auth payload is "username:password" — we want everything after the
    // first colon, since the password itself may contain colons.
    const idx = decoded.indexOf(":");
    const password = idx >= 0 ? decoded.slice(idx + 1) : decoded;

    if (!constantTimeEqual(password, expected)) {
        return unauthorized();
    }

    return null;
}

function unauthorized(): NextResponse {
    return new NextResponse("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="admin"' },
    });
}

/**
 * Length-checked, constant-time string compare. Prevents the password length
 * from leaking via timing, and avoids early-exit on first mismatch.
 */
function constantTimeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let mismatch = 0;
    for (let i = 0; i < a.length; i++) {
        mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return mismatch === 0;
}
