import type { Metadata } from "next";
import { Inter, Fraunces, Space_Grotesk, Press_Start_2P, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DotMatrixCursor from "@/components/DotMatrixCursor";
// src/app/layout.tsx

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const pixelFont = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
        url: "https://YOUR-DOMAIN.com/avatar.jpg",
        width: 1200,
        height: 630,
        alt: "Varun Sharma - Builder, Operator & Endurance Athlete",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="author" content="Varun Sharma"></meta>
      <body
        className={`${inter.variable} ${fraunces.variable} ${spaceGrotesk.variable} ${pixelFont.variable} ${geistMono.variable} antialiased`}
      >
        <DotMatrixCursor />
        <Navigation />
        <main
          id="main-content"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem",
            minHeight: "calc(100vh - 140px)",
          }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
