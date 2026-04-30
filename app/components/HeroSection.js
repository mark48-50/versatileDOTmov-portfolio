"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const spring = { type: "spring", stiffness: 480, damping: 26, mass: 0.8 };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: spring },
};

/* ── Skeleton blocks matching HeroSection's text shapes ── */
function HeroSkeleton() {
  return (
    <section
      className="hero container"
      aria-busy="true"
      aria-label="Loading hero content"
    >
      {/* eyebrow pill */}
      <div
        className="skeleton"
        style={{ width: 210, height: 26, borderRadius: 999, marginBottom: "1.5rem" }}
      />

      {/* h1 — two lines matching max-width 14ch, clamp font size ~56px */}
      <div
        className="skeleton"
        style={{ width: "min(520px, 82vw)", height: 58, marginBottom: "0.6rem" }}
      />
      <div
        className="skeleton"
        style={{ width: "min(380px, 65vw)", height: 58, marginBottom: "1.4rem" }}
      />

      {/* hero-copy — 3 lines */}
      <div className="skeleton" style={{ width: "min(540px, 90vw)", height: 20, marginBottom: "0.5rem" }} />
      <div className="skeleton" style={{ width: "min(490px, 84vw)", height: 20, marginBottom: "0.5rem" }} />
      <div className="skeleton" style={{ width: "min(320px, 60vw)", height: 20, marginBottom: "1.9rem" }} />

      {/* CTA buttons */}
      <div style={{ display: "flex", gap: "0.8rem", marginBottom: "2.2rem" }}>
        <div className="skeleton" style={{ width: 160, height: 48, borderRadius: 999 }} />
        <div className="skeleton" style={{ width: 150, height: 48, borderRadius: 999 }} />
      </div>

      {/* stats grid — 3 cells */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(110px, 1fr))",
          gap: "0.9rem",
          maxWidth: 620,
          marginBottom: "0.9rem",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton" style={{ height: 74, borderRadius: 14 }} />
        ))}
      </div>

      {/* note line */}
      <div className="skeleton" style={{ width: 260, height: 14, borderRadius: 999 }} />
    </section>
  );
}

/* ── Real HeroSection content ── */
function HeroContent() {
  return (
    <motion.section
      className="hero container"
      variants={container}
      initial="hidden"
      animate="show"
      aria-label="Hero — versatileDOTmov motion graphics and video editing portfolio"
    >
      <motion.p className="eyebrow" variants={item}>
        SaaS Ad Video Editor Portfolio
      </motion.p>

      <motion.h1 variants={item}>
        versatileDOTmov — Motion Graphics &amp; Video Editor for SaaS Brands
      </motion.h1>

      <motion.p className="hero-copy" variants={item}>
        Motion graphics artist &amp; video editor crafting high-converting SaaS
        ad creatives in After Effects, Premiere Pro &amp; DaVinci Resolve. Clean
        motion, sharp hooks, and messaging that converts.
      </motion.p>

      <motion.div className="hero-actions" variants={item}>
        <MagneticButton
          className="btn"
          href="#work"
          aria-label="View versatileDOTmov recent ad edit portfolio"
        >
          Watch My Work
        </MagneticButton>
        <MagneticButton
          className="btn btn-ghost"
          href="#services"
          aria-label="View video editing services offered by versatileDOTmov"
        >
          View Services
        </MagneticButton>
      </motion.div>

      <motion.ul className="stats" variants={item} aria-label="Portfolio stats">
        <li><strong>50+</strong><span>Ads Edited</span></li>
        <li><strong>38%</strong><span>Avg CTR Lift*</span></li>
        <li><strong>48 hrs</strong><span>Turnaround</span></li>
      </motion.ul>

      <motion.p className="note" variants={item}>
        *Based on client-reported campaign comparisons.
      </motion.p>
    </motion.section>
  );
}

/* ── Exported component — orchestrates the skeleton → content swap ── */
export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  // Plain useEffect — guaranteed to fire after hydration on every browser.
  // No requestAnimationFrame: rAF can be throttled by mobile Safari before
  // first paint, permanently blocking the swap.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Phase 1 — server render + first client paint: plain skeleton, no FM
  if (!isMounted) {
    return <HeroSkeleton />;
  }

  // Phase 2 — after hydration: animated content with crossfade
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key="hero-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.35, ease: "easeOut" } }}
      >
        <HeroContent />
      </motion.div>
    </AnimatePresence>
  );
}
