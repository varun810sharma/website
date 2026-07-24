"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import SearchModal from "./SearchModal";

const navLinks = [
    { href: "/blog", label: "Articles" },
    { href: "/newsletter", label: "Newsletter" },
];

export default function Navigation() {
    const pathname = usePathname();
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
            <header className="masthead">
                <div className="wrap masthead__inner">
                    <Link href="/" className="masthead__wordmark">
                        Varun Sharma
                    </Link>

                    <nav className="masthead__nav" aria-label="Site">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="masthead__link"
                                aria-current={
                                    pathname === link.href || pathname?.startsWith(`${link.href}/`)
                                        ? "page"
                                        : undefined
                                }
                            >
                                {link.label}
                            </Link>
                        ))}

                        <button
                            className="masthead__search"
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
                                aria-hidden="true"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <span className="kbd">⌘K</span>
                        </button>
                    </nav>
                </div>
            </header>

            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}
