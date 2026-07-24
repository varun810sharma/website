"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { blogPosts } from "@/data/blog-posts";

interface SearchEntry {
    id: string;
    type: string;
    title: string;
    href: string;
    haystack: string;
}

// Static pages plus every published article. Built once at module load.
const searchIndex: SearchEntry[] = [
    { id: "home", type: "Page", title: "Home", href: "/", haystack: "home varun sharma about" },
    { id: "blog", type: "Page", title: "Articles", href: "/blog", haystack: "articles blog writing essays" },
    { id: "newsletter", type: "Page", title: "Newsletter", href: "/newsletter", haystack: "newsletter subscribe email" },
    ...blogPosts
        .filter((post) => post.published)
        .map((post) => ({
            id: post.slug,
            type: "Article",
            title: post.title,
            href: `/blog/${post.slug}`,
            haystack: `${post.title} ${post.summary} ${post.tags.join(" ")}`.toLowerCase(),
        })),
];

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Wrapper only. Mounting the panel fresh on each open is what resets its
 * state, so the panel needs no reset effects.
 */
export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    if (!isOpen) return null;
    return <SearchPanel onClose={onClose} />;
}

function SearchPanel({ onClose }: { onClose: () => void }) {
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return searchIndex.filter((entry) => entry.type === "Article");
        return searchIndex.filter(
            (entry) =>
                entry.title.toLowerCase().includes(q) || entry.haystack.includes(q)
        );
    }, [query]);

    // Focus the field on mount and lock background scroll while open.
    useEffect(() => {
        inputRef.current?.focus();
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    // Keyboard: Esc closes, arrows move, Enter opens.
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
                return;
            }
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((i) => Math.min(i + 1, results.length - 1));
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((i) => Math.max(i - 1, 0));
            }
            if (e.key === "Enter" && results[activeIndex]) {
                router.push(results[activeIndex].href);
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose, results, activeIndex, router]);

    function go(href: string) {
        router.push(href);
        onClose();
    }

    return (
        <>
            <div className="search-overlay" onClick={onClose} />
            <div
                className="search-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Search"
            >
                <div className="search-panel__input-row">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--meta)"
                        strokeWidth="2"
                        aria-hidden="true"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        ref={inputRef}
                        className="search-panel__input"
                        type="text"
                        placeholder="Search articles"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setActiveIndex(0);
                        }}
                        autoComplete="off"
                    />
                    <button
                        onClick={onClose}
                        className="kbd"
                        style={{ cursor: "pointer" }}
                        aria-label="Close search"
                    >
                        esc
                    </button>
                </div>

                {results.length > 0 ? (
                    <ul className="search-panel__results">
                        {results.map((entry, i) => (
                            <li
                                key={entry.id}
                                className={
                                    i === activeIndex
                                        ? "search-panel__result search-panel__result--active"
                                        : "search-panel__result"
                                }
                            >
                                <a
                                    href={entry.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        go(entry.href);
                                    }}
                                    onMouseEnter={() => setActiveIndex(i)}
                                >
                                    <span className="search-panel__type">{entry.type}</span>
                                    <span>{entry.title}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="search-panel__empty">No results for “{query}”.</p>
                )}
            </div>
        </>
    );
}
