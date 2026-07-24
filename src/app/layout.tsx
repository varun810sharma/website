import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Type system: Hanken Grotesk carries display, titles, and UI
// (the Messina Sans role); Newsreader carries the reading body
// (the Messina Modern role). Both variable, self-hosted, and
// subset at build time via next/font.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Resolves all relative OG/Twitter image paths to absolute HTTPS URLs, which
  // social platforms require. Lets pages reference images like "/og/default.png".
  metadataBase: new URL("https://varunsharma.online"),
  title: "Varun Sharma | Builder, Operator & Endurance Athlete",
  description: "Builder. Operator. Endurance Athlete. Product Manager at the intersection of technology, consumer goods, and go-to-market.",
  keywords: ["portfolio", "product manager", "PMI", "consumer goods", "go-to-market", "INSEAD", "eCommerce"],
  openGraph: {
    title: "Varun Sharma | Builder, Operator & Endurance Athlete",
    description: "Builder. Operator. Endurance Athlete. Product Manager at the intersection of technology, consumer goods, and go-to-market.",
    url: "https://varunsharma.online/",
    siteName: "Varun Sharma",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: "Varun Sharma - Builder, Operator & Endurance Athlete",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Varun Sharma | Builder, Operator & Endurance Athlete",
    description: "Builder. Operator. Endurance Athlete. Product Manager at the intersection of technology, consumer goods, and go-to-market.",
    images: ["/og/default.png"],
  },
  authors: [{ name: "Varun Sharma" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${newsreader.variable} ${hanken.variable}`}
      >
        <Navigation />
        <main id="main-content" className="wrap" style={{ minHeight: "calc(100vh - 140px)" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
