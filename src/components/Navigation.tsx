"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchModal from "./SearchModal";


const navLinks = [
    // { href: "/experience", label: "Experience" },
    // { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
];

export default function Navigation() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    // Keyboard shortcut (Cmd+K / Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setSearchOpen((prev) => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <nav
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                    background: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid rgba(209, 213, 219, 0.5)",
                }}
            >
                <div
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        padding: "0.75rem 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            color: "var(--foreground)",
                            textDecoration: "none",
                        }}
                    >
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#f3f4f6" }}>
                            <img src="/avatar.jpg" alt="Varun" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        </div>
                        <span style={{ fontFamily: "var(--font-pixel)", fontSize: "0.7rem" }}>Varun</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2rem",
                        }}
                        className="nav-desktop"
                    >
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    style={{
                                        fontSize: "0.625rem",
                                        fontFamily: "var(--font-pixel)",
                                        fontWeight: 400,
                                        textTransform: "uppercase",
                                        color: isActive ? "var(--accent-blue)" : "var(--foreground)",
                                        textDecoration: "none",
                                        position: "relative",
                                        padding: "0.5rem 0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <motion.span
                                        whileHover={{ y: -2 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        style={{ position: "relative", zIndex: 1 }}
                                    >
                                        {link.label}
                                    </motion.span>

                                    {/* Animated Underline */}
                                    {isActive ? (
                                        <motion.div
                                            layoutId="nav-underline"
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                height: "2px",
                                                background: "var(--accent-blue)",
                                                zIndex: 0,
                                            }}
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    ) : (
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            whileHover={{ scaleX: 1 }}
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                height: "2px",
                                                background: "var(--accent-blue)",
                                                originX: 0,
                                                opacity: 0.6,
                                                zIndex: 0,
                                            }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}


                        {/* Search Button */}
                        <button
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.4rem 0.8rem",
                                border: "1px solid var(--card-border)",
                                borderRadius: "8px",
                                background: "var(--card-bg)",
                                color: "var(--muted)",
                                fontSize: "0.6rem",
                                fontFamily: "var(--font-pixel)",
                                textTransform: "uppercase",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                            onClick={() => setSearchOpen(true)}
                            aria-label="Search"
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            Search
                            <span
                                style={{
                                    fontSize: "0.7rem",
                                    padding: "0.1rem 0.4rem",
                                    background: "#f3f4f6",
                                    borderRadius: "4px",
                                    border: "1px solid #e5e7eb",
                                    fontFamily: "var(--font-mono)",
                                }}
                            >
                                ⌘K
                            </span>
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="nav-mobile-btn"
                        style={{
                            display: "none",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "0.5rem",
                            color: "var(--foreground)",
                        }}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            {mobileOpen ? (
                                <>
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </>
                            ) : (
                                <>
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </>
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div
                        className="nav-mobile-menu"
                        style={{
                            padding: "1rem 1.5rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            borderTop: "1px solid var(--card-border)",
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    fontSize: "0.8rem",
                                    fontFamily: "var(--font-pixel)",
                                    textTransform: "uppercase",
                                    fontWeight: 400,
                                    color:
                                        pathname === link.href
                                            ? "var(--accent-blue)"
                                            : "var(--foreground)",
                                    textDecoration: "none",
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {/* Mobile Search Button */}
                        <button
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.5rem 0",
                                background: "none",
                                border: "none",
                                color: "var(--foreground)",
                                fontSize: "0.8rem",
                                fontFamily: "var(--font-pixel)",
                                textTransform: "uppercase",
                                fontWeight: 400,
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                setSearchOpen(true);
                                setMobileOpen(false); // Close mobile menu when search is opened
                            }}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            Search
                        </button>
                    </div>
                )}


                <style jsx>{`
        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile-btn {
            display: block !important;
          }
        }
      `}</style>
            </nav>

            {/* Global Search Modal - Outside nav to escape stacking context */}
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}
