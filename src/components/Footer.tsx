import SubscribeForm from "./SubscribeForm";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="site-footer">
            <div className="wrap site-footer__inner">
                <SubscribeForm source="footer" />
                <div className="site-footer__line">
                    <span>© {year} Varun Sharma</span>
                    <nav className="site-footer__links" aria-label="Footer">
                        <a
                            href="https://www.linkedin.com/in/varun810sharma/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </a>
                        <a href="mailto:varun_sharma@live.com">Email</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
