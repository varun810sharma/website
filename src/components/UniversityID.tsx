"use client";

import { motion } from "framer-motion";

interface UniversityIDProps {
    university: string;
    name: string;
    studentId: string;
    role: string;
    logoEmoji: string;
    accentColor: string;
    issuedDate: string;
    degree: string;
    coursework: string[];
    headerStyle?: "bar" | "inline";
    avatarUrl?: string;
    universityLogoUrl?: string;
}

export default function UniversityID({
    university,
    name,
    studentId,
    role,
    logoEmoji,
    accentColor,
    issuedDate,
    degree,
    coursework,
    headerStyle = "inline",
    avatarUrl,
    universityLogoUrl,
}: UniversityIDProps) {
    // Generate a barcode pattern
    const barcodeWidths = [3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 3];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
        >
            {/* The card itself */}
            <div className="uni-card">
                {/* Header — two styles like in reference */}
                {headerStyle === "bar" ? (
                    // UIUC-style: full colored header bar
                    <div
                        style={{
                            background: accentColor,
                            padding: "0.6rem 1.25rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <span
                            style={{
                                width: "12px",
                                height: "12px",
                                background: "#ea580c",
                                display: "inline-block",
                                borderRadius: "2px",
                            }}
                        />
                        <span
                            style={{
                                color: "white",
                                fontSize: "0.85rem",
                                fontWeight: 700,
                            }}
                        >
                            {university}
                        </span>
                    </div>
                ) : (
                    // Stanford-style: inline name with accent color
                    <div
                        style={{
                            padding: "1.25rem 1.25rem 0 1.25rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <span
                            style={{
                                width: "14px",
                                height: "14px",
                                background: accentColor,
                                display: "inline-block",
                                borderRadius: "2px",
                                flexShrink: 0,
                            }}
                        />
                        <span
                            style={{
                                fontFamily: "var(--font-fraunces), Georgia, serif",
                                fontSize: "1rem",
                                fontWeight: 700,
                                color: accentColor,
                            }}
                        >
                            {university}
                        </span>
                    </div>
                )}

                {/* Card Body */}
                <div style={{ padding: "1rem 1.25rem 1.25rem 1.25rem" }}>
                    {/* Name + ID + Logo row */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: "0.75rem",
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    fontSize: "0.95rem",
                                    fontWeight: 700,
                                    color: "var(--foreground)",
                                    marginBottom: "0.15rem",
                                }}
                            >
                                {name}
                            </div>
                            <div
                                style={{
                                    fontSize: "1.4rem",
                                    fontWeight: 800,
                                    color: accentColor,
                                    fontFamily: "var(--font-geist-mono), monospace",
                                    marginBottom: "0.15rem",
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                {studentId}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.85rem",
                                    color: "var(--muted)",
                                }}
                            >
                                {role}
                            </div>
                        </div>
                        {universityLogoUrl ? (
                            <img src={universityLogoUrl} alt={university} style={{ width: "45px", height: "45px", objectFit: "contain" }} />
                        ) : (
                            <span style={{ fontSize: "2.8rem", lineHeight: 1 }}>{logoEmoji}</span>
                        )}
                    </div>

                    {/* Avatar + Barcode row */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            marginBottom: "0.75rem",
                        }}
                    >
                        {/* Avatar */}
                        <div
                            style={{
                                width: "64px",
                                height: "64px",
                                background: "#f3f4f6",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.8rem",
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

                        {/* Barcode */}
                        <div className="barcode" style={{ height: "24px", gap: "1.5px" }}>
                            {barcodeWidths.map((w, i) => (
                                <span
                                    key={i}
                                    style={{
                                        width: `${w}px`,
                                        background: accentColor,
                                        height: "100%",
                                        opacity: 1,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Issued + Degree row */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "0.78rem",
                            color: "var(--muted)",
                        }}
                    >
                        <div>
                            Issued <strong style={{ color: "var(--foreground)" }}>{issuedDate}</strong>
                        </div>
                        <div>{degree}</div>
                    </div>
                </div>
            </div>

            {/* Coursework section — below the card like in reference */}
            <div style={{ padding: "1.25rem 0.5rem 0 0.5rem" }}>
                <h3
                    style={{
                        fontFamily: "var(--font-pixel), monospace",
                        fontSize: "0.55rem",
                        fontWeight: 400,
                        textTransform: "uppercase",
                        color: accentColor,
                        marginBottom: "1rem",
                        letterSpacing: "0.05em",
                    }}
                >
                    Coursework &amp; Teaching
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {coursework.map((item, i) => (
                        <li
                            key={i}
                            style={{
                                fontSize: "0.85rem",
                                color: "var(--foreground)",
                                marginBottom: "0.4rem",
                                display: "flex",
                                gap: "0.5rem",
                                lineHeight: 1.5,
                            }}
                        >
                            <span
                                style={{
                                    color: accentColor,
                                    flexShrink: 0,
                                    fontSize: "0.6rem",
                                    marginTop: "0.35rem",
                                }}
                            >
                                ■
                            </span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}
