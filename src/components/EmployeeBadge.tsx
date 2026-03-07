"use client";

import { motion } from "framer-motion";

interface EmployeeBadgeProps {
    company: string;
    cardType: string;
    employeeId: string;
    name: string;
    title: string;
    department: string;
    location: string;
    startDate: string;
    endDate: string;
    achievements: string[];
    accessTags: string[];
    headerColor: string;
    companyIcon: string;
    companyLogoUrl?: string;
    avatarUrl?: string;
    borderColor?: string;
}

export default function EmployeeBadge({
    company,
    cardType,
    employeeId,
    name,
    title,
    department,
    location,
    startDate,
    endDate,
    achievements,
    accessTags,
    headerColor,
    companyIcon,
    companyLogoUrl,
    avatarUrl,
    borderColor,
}: EmployeeBadgeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            style={{ height: "100%" }}
        >
            <div
                className="badge-card"
                style={{
                    "--badge-accent-color": borderColor || headerColor,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                } as React.CSSProperties}
            >
                {/* Header */}
                <div
                    className="badge-header"
                    style={{
                        background: headerColor,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {companyLogoUrl ? (
                            <div style={{ width: "1.5rem", height: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.2px", padding: "2px", flexShrink: 0 }}>
                                <img src={companyLogoUrl} alt={company} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                            </div>
                        ) : (
                            <span style={{ fontSize: "1.3rem" }}>{companyIcon}</span>
                        )}
                        <div>
                            <div style={{ fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                {company}
                            </div>
                            <div style={{ fontSize: "0.75rem", opacity: 0.85 }}>{cardType}</div>
                        </div>
                    </div>
                    <div style={{ fontSize: "0.7rem", opacity: 0.8 }}>ID: {employeeId}</div>
                </div>

                {/* Body */}
                <div style={{ padding: "1.25rem", flex: 1 }}>
                    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                        {/* Avatar placeholder or Custom Photo */}
                        <div
                            style={{
                                width: "72px",
                                height: "72px",
                                background: "#f3f4f6",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "2rem",
                                flexShrink: 0,
                                border: "1px solid #e5e7eb",
                                overflow: "hidden",
                            }}
                        >
                            {avatarUrl ? (
                                <img src={avatarUrl} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            ) : (
                                "👤"
                            )}
                        </div>
                        <div>
                            <h3
                                style={{
                                    fontSize: "1.05rem",
                                    fontWeight: 700,
                                    margin: "0 0 0.25rem 0",
                                }}
                            >
                                {name}
                            </h3>
                            <div
                                style={{
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    color: "var(--foreground)",
                                    marginBottom: "0.1rem",
                                }}
                            >
                                {title}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.8rem",
                                    color: "var(--muted)",
                                    marginBottom: "0.75rem",
                                }}
                            >
                                {department}
                            </div>
                            <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                                <div>
                                    <strong>Location:</strong> {location}
                                </div>
                                <div>
                                    <strong>Tenure:</strong> {startDate} - {endDate}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Separator */}
                    <div
                        style={{
                            borderTop: "1px solid var(--card-border)",
                            margin: "1rem 0",
                        }}
                    />

                    {/* Access Level */}
                    <div style={{ marginBottom: "1rem" }}>
                        <div
                            style={{
                                fontSize: "0.55rem",
                                fontFamily: "var(--font-pixel)",
                                fontWeight: 400,
                                letterSpacing: "0.05em",
                                textTransform: "uppercase",
                                color: "var(--muted)",
                                marginBottom: "0.5rem",
                            }}
                        >
                            Skills
                        </div>
                        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                            {accessTags.map((tag) => (
                                <span key={tag} className="access-tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Separator */}
                    <div
                        style={{
                            borderTop: "1px solid var(--card-border)",
                            margin: "1rem 0",
                        }}
                    />

                    {/* Key Achievements */}
                    <div>
                        <div
                            style={{
                                fontSize: "0.55rem",
                                fontFamily: "var(--font-pixel)",
                                fontWeight: 400,
                                letterSpacing: "0.05em",
                                textTransform: "uppercase",
                                color: "var(--muted)",
                                marginBottom: "0.5rem",
                            }}
                        >
                            Key Achievements
                        </div>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {achievements.map((achievement, i) => (
                                <li
                                    key={i}
                                    style={{
                                        fontSize: "0.82rem",
                                        color: "var(--foreground)",
                                        marginBottom: "0.4rem",
                                        display: "flex",
                                        gap: "0.5rem",
                                        lineHeight: 1.4,
                                    }}
                                >
                                    <span style={{ color: "var(--muted)", flexShrink: 0 }}>•</span>
                                    {achievement}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
