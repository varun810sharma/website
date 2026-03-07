"use client";

import PageTransition from "@/components/PageTransition";
import PixelButton from "@/components/PixelButton";
import { motion } from "framer-motion";
import { useState } from "react";

const socialLinks = [
  {
    href: "/resume.pdf",
    label: "Resume",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10,9 9,9 8,9" />
      </svg>
    ),
  },
  {
    href: "https://github.com/suryasarkar2",
    label: "GitHub",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/_the_sun_rises",
    label: "Instagram",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/surya-sarkar/",
    label: "LinkedIn",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "mailto:suryasarkar2@gmail.com",
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
              marginBottom: "1.5rem",
              color: "var(--foreground)",
            }}
            variants={itemVariants}
          >
            Hi I&apos;m{" "}
            <span style={{ color: "var(--accent-blue)" }}>Surya</span>
          </motion.h1>

          <motion.div variants={itemVariants}>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "var(--foreground)",
                marginBottom: "1.25rem",
              }}
            >
              Hi there! I'm a
              <strong> Data & AI Engineer</strong> currently working at <strong>Google</strong>, where I focus on building Agentic AI systems and
              scalable data solutions for Google&apos;s Consumer Hardware products.
            </p>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "var(--foreground)",
                marginBottom: "2rem",
              }}
            >
              I have previously worked at <strong>Mercedes-Benz R&D</strong>, where I built scalable data platforms, GenAI applications and traditional ML solutions for 15M+ production vehicles.
              Prior to that, I was at <strong>Infosys</strong>, where I worked with Microsoft on Azure data solutions.
              I'm passionate about <strong>Agentic AI</strong> engineering, with a strong background in Python, SQL, Azure, GCP and big data technologies like Apache Spark.
              I thrive on designing scalable products, automating processes, and tackling complex problems with creativity.
            </p>
          </motion.div>

          {/* Social buttons */}
          <motion.div
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

        {/* Right: Avatar placeholder */}
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
                alt="Surya Sarkar"
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
