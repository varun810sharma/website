import Link from "next/link";

export default function NotFound() {
    return (
        <div style={{ paddingTop: "var(--s8)", paddingBottom: "var(--s8)", maxWidth: "var(--measure)" }}>
            <p className="caps-signal" style={{ marginBottom: "var(--s3)" }}>
                404
            </p>
            <h1 style={{ fontSize: "var(--text-h1)", marginBottom: "var(--s4)" }}>
                This page does not exist.
            </h1>
            <p style={{ color: "var(--ink-soft)", marginBottom: "var(--s5)" }}>
                The link may be old, or the piece may have moved. The writing is all
                still here.
            </p>
            <p
                style={{
                    fontFamily: "var(--font-hanken), sans-serif",
                    fontSize: "var(--text-ui)",
                    display: "flex",
                    gap: "var(--s4)",
                }}
            >
                <Link href="/blog">All articles</Link>
                <Link href="/">Home</Link>
            </p>
        </div>
    );
}
