"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "./MagneticButton";

const spring = { type: "spring", stiffness: 480, damping: 26, mass: 0.8 };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: spring },
};

/* ── Letter-by-letter reveal for the headline ── */
const HEADLINE = "Professional video editing + motion design that makes content perform.";

const letterContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } },
};

const letterVariant = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Tool badges ── */
const TOOLS = [
  "After Effects",
  "Premiere Pro",
  "DaVinci Resolve",
];

const badgeContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } },
};

const badgeVariant = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      className="hero container"
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      aria-label="Hero — versatileDOTmov motion graphics and video editing portfolio"
    >
      {/* ── Marquee background ── */}
      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee__track">
          {/* Duplicate text for seamless loop */}
          <span>versatileDOTmov&nbsp;·&nbsp;</span>
          <span>versatileDOTmov&nbsp;·&nbsp;</span>
          <span>versatileDOTmov&nbsp;·&nbsp;</span>
          <span>versatileDOTmov&nbsp;·&nbsp;</span>
          <span>versatileDOTmov&nbsp;·&nbsp;</span>
          <span>versatileDOTmov&nbsp;·&nbsp;</span>
          <span>versatileDOTmov&nbsp;·&nbsp;</span>
          <span>versatileDOTmov&nbsp;·&nbsp;</span>
        </div>
      </div>

      {/* ── Eyebrow ── */}
      <motion.p className="eyebrow" variants={item}>
        Harish Sontakke · Video Editor · Motion Graphics Artist
      </motion.p>

      {/* ── Letter-by-letter headline ── */}
      <motion.h1
        variants={letterContainer}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="hero-title"
        style={{ display: "flex", flexWrap: "wrap", perspective: "600px" }}
      >
        {HEADLINE.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariant}
            style={{
              display: "inline-block",
              transformOrigin: "bottom center",
            }}
          >
            {char === " " ? "\u00a0" : char}
          </motion.span>
        ))}
      </motion.h1>

      {/* ── Subtitle ── */}
      <motion.p className="hero-copy" variants={item}>
        Motion graphics artist &amp; video editor crafting high-converting SaaS
        ad creatives in After Effects, Premiere Pro &amp; DaVinci Resolve. Clean
        motion, sharp hooks, and messaging that converts.
      </motion.p>

      {/* ── CTAs ── */}
      <motion.div className="hero-actions" variants={item}>
        <MagneticButton
          className="btn"
          href="#contact"
          aria-label="View versatileDOTmov recent ad edit portfolio"
        >
          Send Inquiry
        </MagneticButton>
        <MagneticButton
          className="btn btn-ghost"
          href="#services"
          aria-label="View video editing services offered by versatileDOTmov"
        >
          View Services
        </MagneticButton>
      </motion.div>

      {/* ── Stats ── */}
      <motion.ul className="stats" variants={item} aria-label="Portfolio stats">
        <li><strong>50+</strong><span>Ads Edited</span></li>
        <li><strong>38%</strong><span>Avg CTR Lift*</span></li>
        <li><strong>48 hrs</strong><span>Turnaround</span></li>
      </motion.ul>

      <motion.p className="note" variants={item}>
        *Based on client-reported campaign comparisons.
      </motion.p>

      {/* ── Tool Badges ── */}
      <motion.div
        className="tool-badges"
        variants={badgeContainer}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {TOOLS.map((tool) => (
          <motion.span key={tool} className="tool-badge" variants={badgeVariant}>
            <span className="tool-badge__dot" aria-hidden="true" />
            {tool}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
}
