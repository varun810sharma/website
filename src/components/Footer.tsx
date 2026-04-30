import SubscribeForm from "./SubscribeForm";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer
            style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "2rem 1.5rem",
                textAlign: "center",
                fontSize: "0.85rem",
                color: "var(--muted)",
                borderTop: "1px solid var(--card-border)",
            }}
        >
            <SubscribeForm source="footer" />
            <div>
                © {year} Varun Sharma
            </div>
        </footer>
    );
}