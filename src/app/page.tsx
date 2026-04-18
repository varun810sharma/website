"use client";

import PageTransition from "@/components/PageTransition";
import PixelButton from "@/components/PixelButton";
import { motion } from "framer-motion";
import { useState } from "react";

const socialLinks = [
  
  {
    href: "https://www.linkedin.com/in/varun810sharma/",
    label: "LinkedIn",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "mailto:varun_sharma@live.com",
    label: "Email",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

export default function Home() {
  const [avatarError, setAvatarError] = useState(false);
  return (
    <PageTransition>
      <div
        className="hero-grid"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "calc(100vh - 200px)",
          gap: "3rem",
          paddingTop: "4rem",
          paddingBottom: "4rem",
          flexWrap: "wrap",
        }}
      >
        {/* Left: Text content */}
        <motion.div
          style={{ flex: "1 1 500px", maxWidth: "700px" }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
         <motion.h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: "0.5rem",
              color: "var(--foreground)",
            }}
            variants={itemVariants}
          >
            Varun <span style={{ color: "var(--accent-blue)" }}>Sharma</span>
          </motion.h1>

          <motion.p
            style={{
              fontSize: "1.1rem",
              fontWeight: 500,
              color: "var(--muted)",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-space), monospace",
            }}
            variants={itemVariants}
          >
            Builder. Operator. Endurance Athlete.
          </motion.p>

          <motion.div variants={itemVariants}>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "var(--foreground)",
                fontFamily: 'var(--font-space), monospace',
                marginBottom: "2rem",
              }}
            >
              I&apos;m a <strong>Product Manager</strong> at{" "}
              <a href="https://www.pmi.com/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
                <strong>Philip Morris International</strong>
              </a>
              , working at the intersection of technology, consumer goods, and go-to-market strategy.
              Before that, I co-founded{" "}
              <a href="https://www.laumiere.com/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
                <strong>Laumière Gourmet Fruits</strong>
              </a>
              , scaling a D2C brand from zero to $5M+ in revenue and owning sales, marketing, partnerships, and GTM end to end.
              Earlier, at{" "}
              <a href="https://www.pwc.com/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
                <strong>PwC</strong>
              </a>
              , I ran large-scale digital transformation programmes across the UAE and KSA — a fast education in how large organisations actually make decisions.
              My career started at{" "}
              <a href="https://www.redbull.com/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
                <strong>Red Bull</strong>
              </a>{" "}
              as a Student Brand Manager, where I got my first real taste of consumer goods, endurance sports, and marketing — a combination that has defined everything since.
              I hold an <strong>MBA from INSEAD</strong> and a degree in <strong>Computer Engineering from BITS Pilani Dubai</strong>.
            </p>
          </motion.div>
          
          {/* Social buttons */}
          <motion.div
            className="hero-buttons"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
            variants={itemVariants}
          >
            {socialLinks.map((link) => (
              <PixelButton
                key={link.label}
                href={link.href}
                label={link.label}
                icon={link.icon}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Avatar */}
        <motion.div
          style={{
            flex: "0 0 auto",
            display: "flex",
            justifyContent: "center",
          }}
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            y: [0, -10, 0]
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.4 },
            scale: { duration: 0.8, delay: 0.4 },
            rotate: { duration: 0.8, delay: 0.4 },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <div
            style={{
              width: "320px",
              height: "320px",
              background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "8rem",
              border: "2px solid #d1d5db",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
            }}
          >
            {!avatarError ? (
              <img
                src="/avatar.jpg"
                alt="Varun Sharma"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={() => setAvatarError(true)}
              />
            ) : (
              "👤"
            )}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
