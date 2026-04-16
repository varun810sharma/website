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
        slug: "six-consumer-trends-india",
        title: "Six Consumer Trends I Noticed in India That I Can't Stop Thinking About",
        date: "Apr 2026",
        readTime: "10 min read",
        summary: "A consumer class that wants the real thing, and is increasingly able to afford it. Six observations on protein, wellness, grooming, pet care, coffee, and fitness — and why I'm bullish on India.",
        tags: ["Consumer Trends", "India", "D2C", "Market Analysis"],
    },
    {
    slug: "take-risks-to-write-a-better-brand-story",
    title: "Take Risks to Write a Better Brand Story",
    date: "Mar 2024",
    readTime: "5 min read",
    summary: "A brand is the end result of the choices it makes — not its tagline or banner. On why the best brands, from Nike to early-stage startups, take calculated risks to build stories that actually resonate.",
    tags: ["Branding", "Marketing", "Entrepreneurship"],
},
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
