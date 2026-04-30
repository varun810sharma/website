import Link from "next/link";

export const metadata = {
    title: "Subscription confirmed | Varun Sharma",
};

interface Props {
    searchParams: Promise<{ error?: string }>;
}

export default async function ConfirmedPage({ searchParams }: Props) {
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
            {isError ? (
                <>
                    <h1
                        style={{
                            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                            fontWeight: 800,
                            lineHeight: 1.2,
                            marginBottom: "1rem",
                        }}
                    >
                        That link didn&rsquo;t work.
                    </h1>
                    <p style={{ color: "var(--muted)", lineHeight: 1.6, marginBottom: "2rem" }}>
                        The confirmation link may have expired, been used already, or been mistyped.
                        You can sign up again below.
                    </p>
                </>
            ) : (
                <>
                    <h1
                        style={{
                            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                            fontWeight: 800,
                            lineHeight: 1.2,
                            marginBottom: "1rem",
                        }}
                    >
                        You&rsquo;re in.
                    </h1>
                    <p style={{ color: "var(--muted)", lineHeight: 1.6, marginBottom: "2rem" }}>
                        Thanks for confirming. I&rsquo;ll send you a note when I publish something new.
                        You can unsubscribe any time from the footer of any email.
                    </p>
                </>
            )}

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
