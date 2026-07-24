import type { Metadata } from "next";
import NewsletterClient from "@/components/NewsletterClient";

export const metadata: Metadata = {
  title: "Newsletter | Varun Sharma",
  description:
    "On companies, products, and strategy. A portfolio of the ideas that built how I think. Plus whatever doesn't fit a category.",
};

export default function NewsletterPage() {
  return <NewsletterClient />;
}
