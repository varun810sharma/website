"use client";

import PageTransition from "@/components/PageTransition";
import PixelButton from "@/components/PixelButton";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";

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
            <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--foreground)", fontFamily: 'var(--font-space), monospace', marginBottom: "1.25rem" }}>
              I&apos;ve spent my career building companies, breaking categories, and picking up hard lessons at every scale.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--foreground)", fontFamily: 'var(--font-space), monospace', marginBottom: "1.25rem" }}>
              Right now I&apos;m at{" "}
              <a href="https://www.pmi.com/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
                <strong>Philip Morris International</strong>
              </a>
              , at the intersection of technology, consumer goods, and go-to-market strategy. Before that, I co-founded{" "}
              <a href="https://www.laumiere.com/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
                <strong>Laumière Gourmet Fruits</strong>
              </a>
              {" "}in California, scaling a D2C brand from zero to $5M in revenue and owning sales, marketing, partnerships, and GTM end to end. Earlier, at{" "}
              <a href="https://www.pwc.com/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
                <strong>PwC</strong>
              </a>
              , I ran large-scale digital transformation programmes across the GCC, a fast education in how large organisations actually make decisions. It all started at{" "}
              <a href="https://www.redbull.com/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
                <strong>Red Bull</strong>
              </a>
              , my first real taste of consumer goods, endurance culture, and what it means to build a brand people actually believe in.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--foreground)", fontFamily: 'var(--font-space), monospace', marginBottom: "1.25rem" }}>
              An <strong>MBA from INSEAD</strong> and a <strong>Computer Engineering degree from BITS Pilani</strong>{" "}sit somewhere in all of this, experiences that quietly rewired how I think. I&apos;m still working out in what ways.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--foreground)", fontFamily: 'var(--font-space), monospace', marginBottom: "1.25rem" }}>
              Outside of work, I&apos;m an endurance athlete who was a DJ for over a decade. The disciplines look nothing alike, but the instinct is the same: find something that demands everything, and keep showing up.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--foreground)", fontFamily: 'var(--font-space), monospace', marginBottom: "2rem" }}>
              I plan to write more here. Articles on global and regional brands, commercial strategy, and what building across geographies and industries actually looks like up close. And probably a few things that don&apos;t fit neatly into any category, which is usually where the most interesting thinking happens. Follow along or get in touch.
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

      {/* Recent Writing */}
      <motion.div
        style={{ paddingBottom: "4rem" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div>
            <div className="section-label">Recent Writing</div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--foreground)" }}>
              From the blog
            </h2>
          </div>
          <Link
            href="/blog"
            style={{
              fontSize: "0.85rem",
              fontFamily: "var(--font-pixel), monospace",
              color: "var(--accent-blue)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            View all →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
            maxWidth: "960px",
          }}
        >
          {blogPosts.filter((post) => post.published).slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="blog-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Meta */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.6rem",
                    fontSize: "0.78rem",
                    color: "var(--muted)",
                  }}
                >
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                    color: "var(--foreground)",
                    lineHeight: 1.35,
                  }}
                >
                  {post.title}
                </h3>

                {/* Summary */}
                <p
                  style={{
                    fontSize: "0.85rem",
                    lineHeight: 1.55,
                    color: "var(--muted)",
                    marginBottom: "0.75rem",
                    flex: 1,
                  }}
                >
                  {post.summary}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {post.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </PageTransition>
  );
}
