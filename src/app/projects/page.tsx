"use client";

import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

const projects = [
    {
        title: "MaintainMe",
        description:
            "A TypeScript-based repository focusing on modern development practices.",
        techStack: ["TypeScript", "Web"],
        github: "https://github.com/suryasarkar2/MaintainMe",
        live: "",
        emoji: "🛠️",
    },
    {
        title: "LLM-Study",
        description:
            "Collection of studies and experiments working with Large Language Models.",
        techStack: ["LLM", "AI", "HTML"],
        github: "https://github.com/suryasarkar2/LLM-Study",
        live: "",
        emoji: "🤖",
    },
    {
        title: "wallPexel_flutter_app",
        description:
            "A mobile application built with Flutter for browsing and discovering wallpapers.",
        techStack: ["Dart", "Flutter", "Mobile App"],
        github: "https://github.com/suryasarkar2/wallPexel_flutter_app",
        live: "",
        emoji: "📱",
    },
    {
        title: "VehicleDetector",
        description:
            "Basic Version of Vehicle Detector that uses centroid estimation to detect a vehicle.",
        techStack: ["Python", "Computer Vision", "OpenCV"],
        github: "https://github.com/suryasarkar2/VehicleDetector",
        live: "",
        emoji: "🚗",
    },
    {
        title: "twitter-sentiment-analysis",
        description:
            "This is a live sentiment analysis of tweets using python.",
        techStack: ["Python", "NLP", "Data Analysis"],
        github: "https://github.com/suryasarkar2/twitter-sentiment-analysis",
        live: "",
        emoji: "🐦",
    },
    {
        title: "cryptodash",
        description:
            "A dashboard application exploring cryptocurrency data and visualizations.",
        techStack: ["JavaScript", "Web"],
        github: "https://github.com/suryasarkar2/cryptodash",
        live: "",
        emoji: "📈",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function ProjectsPage() {
    return (
        <PageTransition>
            <div style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
                {/* Header */}
                <div style={{ marginBottom: "2.5rem" }}>
                    <div className="section-label">Projects</div>
                    <h1
                        style={{
                            fontSize: "clamp(2rem, 4vw, 2.8rem)",
                            fontWeight: 800,
                            lineHeight: 1.2,
                        }}
                    >
                        Things I built to learn faster.
                    </h1>
                </div>

                {/* Projects Grid */}
                <motion.div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                        gap: "1.5rem",
                    }}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.title}
                            className="project-card"
                            variants={itemVariants}
                        >
                            {/* Emoji + Title */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    marginBottom: "0.75rem",
                                }}
                            >
                                <span style={{ fontSize: "1.8rem" }}>{project.emoji}</span>
                                <h3
                                    style={{
                                        fontSize: "1.1rem",
                                        fontWeight: 700,
                                        margin: 0,
                                        color: "var(--foreground)",
                                    }}
                                >
                                    {project.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p
                                style={{
                                    fontSize: "0.88rem",
                                    lineHeight: 1.6,
                                    color: "var(--muted)",
                                    marginBottom: "1rem",
                                }}
                            >
                                {project.description}
                            </p>

                            {/* Tech Tags */}
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "0.4rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                {project.techStack.map((tech) => (
                                    <span key={tech} className="tech-tag">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: "1rem",
                                    fontSize: "0.85rem",
                                }}
                            >
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.3rem",
                                        }}
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        Code
                                    </a>
                                )}
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.3rem",
                                        }}
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                            <polyline points="15,3 21,3 21,9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                        Demo
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </PageTransition>
    );
}
