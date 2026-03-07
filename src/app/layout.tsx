import type { Metadata } from "next";
import { Inter, Fraunces, Space_Grotesk, Press_Start_2P, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DotMatrixCursor from "@/components/DotMatrixCursor";


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
  title: "Surya Sarkar — Portfolio",
  description:
    "Personal portfolio of Surya Sarkar — Data & AI Engineer at Google.",
  keywords: ["portfolio", "developer", "software engineer", "AI engineer", "data engineer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
