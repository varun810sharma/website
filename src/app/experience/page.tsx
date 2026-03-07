"use client";

import PageTransition from "@/components/PageTransition";
import EmployeeBadge from "@/components/EmployeeBadge";
import UniversityID from "@/components/UniversityID";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
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

const workExperiences = [
    {
        company: "Google",
        cardType: "Employee ID Card",
        employeeId: "GOOG-2024",
        name: "Surya Sarkar",
        title: "Data & AI Engineer II",
        department: "Platforms & Devices - D&S",
        location: "Hyderabad, TS",
        startDate: "Sep 2024",
        endDate: "Present",
        achievements: [
            "Optimizing supply chains for Pixel devices.",
            "Built LLM-based SQL Optimizer using Google ADK, reducing runtime by 45% and cut BigQuery slot-cost by 30%.",
            "Architected data warehouse in BigQuery and Google internal engine (10+ TB/day) for reporting, forecasting and analytics, reduced query latency by 38% via clustering and partitioning with no storage growth.",
        ],
        accessTags: ["Agentic AI", "Data Engineering", "Scalable Systems"],
        headerColor: "#1e3a8a",
        companyIcon: "🔍",
        companyLogoUrl: "/google.png",
        avatarUrl: "/avatar.jpg",
        borderColor: "#2563eb",
    },
    {
        company: "Mercedes-Benz R&D",
        cardType: "Employee ID Card",
        employeeId: "MBRDI-2023",
        name: "Surya Sarkar",
        title: "Data/ML Engineer",
        department: "Data Engineering",
        location: "Bengaluru, KA",
        startDate: "Mar 2023",
        endDate: "Aug 2024",
        achievements: [
            "Managed data pipelines for batch & real-time analytics across 15M+ globally distributed vehicles",
            "Built GenAI solutions for automated claim summarization and ML models for ECU failure analysis",
            "Reduced infrastructure costs by >50% via PySpark optimization handling 6x data size increase",
        ],
        accessTags: ["DATA PIPELINES", "GENAI", "PYSPARK"],
        headerColor: "#1e293b",
        companyIcon: "🚗",
        companyLogoUrl: "/mercedes.png",
        avatarUrl: "/avatar.jpg",
        borderColor: "#475569",
    },
    {
        company: "Infosys",
        cardType: "Employee ID Card",
        employeeId: "INFY-2021",
        name: "Surya Sarkar",
        title: "Digital Specialist Engineer",
        department: "Modern Analytics & Insights in Microsoft",
        location: "Bengaluru, KA",
        startDate: "Jan 2021",
        endDate: "Mar 2023",
        achievements: [
            "Led migration of on-premises data to Azure Cloud for the Microsoft account",
            "Developed automated data onboarding frameworks for Xbox and Azure Cloud",
            "Saved client $2-3M quarterly by eliminating Azure Analysis Server necessity",
        ],
        accessTags: ["AZURE", "DATA WAREHOUSE", "ETL"],
        headerColor: "#0284c7",
        companyIcon: "☁️",
        companyLogoUrl: "/infosys.png",
        avatarUrl: "/avatar.jpg",
        borderColor: "#0369a1",
    },
];

const education = [
    {
        university: "Georgia Institute of Technology",
        name: "Surya Sarkar",
        studentId: "GTECH-2026-XXXX",
        role: "Student",
        logoEmoji: "🐝",
        accentColor: "#b3a369", // Mustard yellow
        issuedDate: "08/01/2026",
        degree: "M.S. in Computer Science",
        headerStyle: "inline" as const,
        coursework: [
            "Specialization: Computing Systems / Artificial Intelligence"
        ],
        avatarUrl: "/avatar.jpg",
        universityLogoUrl: "/gtech.png",
    },
    {
        university: "B.P. Poddar Institute",
        name: "Surya Sarkar",
        studentId: "BPP-2016-XXXX",
        role: "Student",
        logoEmoji: "🎓",
        accentColor: "#0f4fa3", // Blue color
        issuedDate: "08/01/2016",
        degree: "B.Tech. in Computer Science",
        headerStyle: "bar" as const,
        coursework: [
            "Grade: 8.12 / 10.0",
            "Affiliated with MAKAUT, AICTE-approved & NBA accredited",
            "Active core community member in technical & cultural festivals",
        ],
        avatarUrl: "/avatar.jpg",
        universityLogoUrl: "/bpp.png",
    },
];

export default function ExperiencePage() {
    return (
        <PageTransition>
            <div style={{ paddingTop: "3rem", paddingBottom: "10rem" }}>
                {/* Header */}
                <div style={{ marginBottom: "2.5rem" }}>
                    <div className="section-label">Experience</div>
                    <h1
                        style={{
                            fontSize: "clamp(2rem, 4vw, 2.8rem)",
                            fontWeight: 800,
                            lineHeight: 1.2,
                        }}
                    >
                        Work that shaped how I build.
                    </h1>
                </div>

                {/* Work Experience Grid */}
                <motion.div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                        gap: "1.5rem",
                        marginBottom: "4rem",
                    }}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {workExperiences.map((exp) => (
                        <EmployeeBadge key={exp.employeeId} {...exp} />
                    ))}
                </motion.div>

                {/* Academic Section */}
                <div style={{ marginBottom: "2.5rem" }}>
                    <div className="section-label">Academic</div>
                    <h2
                        style={{
                            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                            fontWeight: 800,
                            lineHeight: 1.2,
                        }}
                    >
                        Where I learned to learn.
                    </h2>
                </div>

                {/* University Cards Grid */}
                <motion.div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                        gap: "1.5rem",
                        alignItems: "start",
                    }}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {education.map((uni) => (
                        <UniversityID key={uni.studentId} {...uni} />
                    ))}
                </motion.div>
            </div>
        </PageTransition>
    );
}
