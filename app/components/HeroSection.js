"use client";

import { motion } from "framer-motion";
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

export default function HeroSection() {
  return (
    <motion.section
      className="hero container"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.p className="eyebrow" variants={item}>
        SaaS Ad Video Editor Portfolio
      </motion.p>
      <motion.h1 variants={item}>
        I turn product screens into scroll-stopping ad creatives.
      </motion.h1>
      <motion.p className="hero-copy" variants={item}>
        Motion graphics artist &amp; video editor crafting high-converting SaaS
        ad creatives in After Effects, Premiere Pro &amp; DaVinci Resolve. Clean
        motion, sharp hooks, and messaging that converts.
      </motion.p>
      <motion.div className="hero-actions" variants={item}>
        <MagneticButton className="btn" href="#work">
          Watch My Work
        </MagneticButton>
        <MagneticButton className="btn btn-ghost" href="#services">
          View Services
        </MagneticButton>
      </motion.div>
      <motion.ul className="stats" variants={item}>
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
