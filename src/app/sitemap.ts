import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";

const SITE_URL = "https://varunsharma.online";

export default function sitemap(): MetadataRoute.Sitemap {
    const pages: MetadataRoute.Sitemap = [
        { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
        { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.9 },
        { url: `${SITE_URL}/newsletter`, changeFrequency: "yearly", priority: 0.5 },
    ];

    const articles: MetadataRoute.Sitemap = blogPosts
        .filter((post) => post.published)
        .map((post) => ({
            url: `${SITE_URL}/blog/${post.slug}`,
            changeFrequency: "yearly" as const,
            priority: 0.8,
        }));

    return [...pages, ...articles];
}
