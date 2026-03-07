"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Centralized search index for the static content
const searchData = [
    { id: "home", type: "Page", title: "Home", href: "/" },
    { id: "exp", type: "Page", title: "Experience & Education", href: "/experience" },
    { id: "proj", type: "Page", title: "Projects", href: "/projects" },
    { id: "blog", type: "Page", title: "Blog", href: "/blog" },

    // Experience
    { id: "exp1", type: "Experience", title: "Google - Data & AI Engineer II", href: "/experience" },
    { id: "exp2", type: "Experience", title: "Mercedes-Benz R&D - Data/ML Engineer", href: "/experience" },
    { id: "exp3", type: "Experience", title: "Infosys - Digital Specialist Engineer", href: "/experience" },

    // Projects (from GitHub)
    { id: "proj1", type: "Project", title: "VehicleDetector", href: "/projects" },
    { id: "proj2", type: "Project", title: "twitter-sentiment-analysis", href: "/projects" },
    { id: "proj3", type: "Project", title: "MaintainMe", href: "/projects" },
    { id: "proj4", type: "Project", title: "cryptodash", href: "/projects" },
    { id: "proj5", type: "Project", title: "LLM-Study", href: "/projects" },
    { id: "proj6", type: "Project", title: "wallPexel_flutter_app", href: "/projects" },

    // Blog Posts
    { id: "blog1", type: "Blog", title: "Building MaintainMe: A Privacy-First, AI-Powered Calorie Tracker", href: "/blog/building-maintainme-privacy-first-calorie-tracker" },
    { id: "blog2", type: "Blog", title: "Understanding Agentic AI and Google's Agent Development Kit (ADK)", href: "/blog/understanding-agentic-ai-and-google-adk" },
    { id: "blog3", type: "Blog", title: "Building Scalable Data Models: Insights from Google London", href: "/blog/building-scalable-data-models-insights" },
    { id: "blog4", type: "Blog", title: "Mastering SQL Optimization for Performance and Cost-Efficiency", href: "/blog/mastering-sql-optimization-performance-cost" },
];

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setQuery("");
        }
    }, [isOpen]);

    // Handle Esc key to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // Filter results
    const results = searchData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (href: string) => {
        router.push(href);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            backdropFilter: "blur(12px)",
                            zIndex: 100,
                        }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        style={{
                            position: "fixed",
                            top: "15%",
                            left: "50%",
                            marginLeft: "-300px", // Half of width to center
                            width: "600px",
                            maxWidth: "90vw", // For mobile
                            backgroundColor: "var(--card-bg)",
                            borderRadius: "12px",
                            border: "1px solid var(--card-border)",
                            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                            overflow: "hidden",
                            zIndex: 101,
                            display: "flex",
                            flexDirection: "column",
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        {/* Search Input */}
                        <div style={{ display: "flex", alignItems: "center", padding: "1rem", borderBottom: "1px solid var(--card-border)" }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" style={{ marginRight: "0.75rem" }}>
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search projects, blogs, experience..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                style={{
                                    flex: 1,
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    fontSize: "1.05rem",
                                    color: "var(--foreground)",
                                }}
                            />
                            <button
                                onClick={onClose}
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    fontSize: "0.8rem",
                                    color: "var(--muted)",
                                    cursor: "pointer",
                                    padding: "0.2rem 0.5rem",
                                    borderRadius: "4px",
                                }}
                            >
                                ESC
                            </button>
                        </div>

                        {/* Search Results */}
                        <div style={{ maxHeight: "350px", overflowY: "auto", padding: "0.5rem" }}>
                            {results.length > 0 ? (
                                results.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleSelect(item.href)}
                                        style={{
                                            padding: "0.75rem 1rem",
                                            display: "flex",
                                            flexDirection: "column",
                                            cursor: "pointer",
                                            borderRadius: "8px",
                                            transition: "background 0.1s",
                                            marginBottom: "0.25rem",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--button-hover)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                    >
                                        <div style={{ fontSize: "0.55rem", fontFamily: "var(--font-pixel)", color: "var(--muted)", marginBottom: "0.4rem", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                            {item.type}
                                        </div>
                                        <div style={{ color: "var(--foreground)", fontSize: "0.95rem", fontWeight: 500 }}>
                                            {item.title}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ padding: "2rem", textAlign: "center", color: "var(--muted)" }}>
                                    No results found for &quot;{query}&quot;
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
