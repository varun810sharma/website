import Link from "next/link";

export const metadata = {
    title: "Unsubscribed | Varun Sharma",
};

interface Props {
    searchParams: Promise<{ error?: string }>;
}

export default async function UnsubscribedPage({ searchParams }: Props) {
    const { error } = await searchParams;
    const isError = error === "invalid";

    return (
        <div
            style={{
                maxWidth: "560px",
                margin: "0 auto",
                padding: "6rem 1.5rem 4rem",
                textAlign: "center",
            }}
        >
            <h1
                style={{
                    fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                    fontWeight: 800,
                    lineHeight: 1.2,
                    marginBottom: "1rem",
                }}
            >
                {isError ? "That link didn\u2019t work." : "You\u2019re unsubscribed."}
            </h1>
            <p style={{ color: "var(--muted)", lineHeight: 1.6, marginBottom: "2rem" }}>
                {isError
                    ? "The unsubscribe link may have expired or been mistyped. If you're still receiving email and want it to stop, reply to any message I've sent and I'll remove you manually."
                    : "You won\u2019t receive any more email from me. No hard feelings \u2014 thanks for giving it a shot."}
            </p>

            <Link
                href="/"
                style={{
                    fontSize: "0.9rem",
                    color: "var(--foreground, #1a1a1a)",
                    textDecoration: "underline",
                }}
            >
                ← Back to the site
            </Link>
        </div>
    );
}
