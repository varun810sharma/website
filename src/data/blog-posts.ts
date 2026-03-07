export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    readTime: string;
    summary: string;
    tags: string[];
}

export const blogPosts: BlogPost[] = [
    {
        slug: "building-maintainme-privacy-first-calorie-tracker",
        title: "Building MaintainMe: A Privacy-First, AI-Powered Calorie Tracker",
        date: "Jan 2026",
        readTime: "4 min read",
        summary:
            "The launch of MaintainMe, an open-source, privacy-first calorie tracker PWA. Built to help people manage their weight without paywalls or ads, it uses Gemini AI to track meals via text or photos.",
        tags: ["Open Source", "PWA", "Gemini AI"],
    },
    {
        slug: "understanding-agentic-ai-and-google-adk",
        title: "Understanding Agentic AI and Google's Agent Development Kit (ADK)",
        date: "Aug 2025",
        readTime: "5 min read",
        summary:
            "Defining Agentic AI—systems capable of autonomous reasoning and action. An introduction to the Google Agent Development Kit (ADK) as a tool to simplify connecting LLMs to APIs and data sources for effective AI agent orchestration.",
        tags: ["Agentic AI", "LLM", "Google ADK"],
    },
    {
        slug: "building-scalable-data-models-insights",
        title: "Building Scalable Data Models: Insights from Google London",
        date: "Jul 2025",
        readTime: "6 min read",
        summary:
            "Reflecting on a visit to the Google London office, discussing the realities of data modeling at scale, translating fuzzy business requirements into metrics, and designing future-proof schemas.",
        tags: ["Data Modeling", "Architecture", "Engineering"],
    },
    {
        slug: "mastering-sql-optimization-performance-cost",
        title: "Mastering SQL Optimization for Performance and Cost-Efficiency",
        date: "Apr 2025",
        readTime: "7 min read",
        summary:
            "A technical guide for data engineers on optimizing SQL queries to manage cloud costs and improve performance, covering smart data retrieval, indexing, execution plans, and partitioning.",
        tags: ["SQL", "Data Engineering", "Cloud Costs"],
    },
];
