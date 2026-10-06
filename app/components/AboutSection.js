"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AboutSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="about-strip" aria-labelledby="about-heading">
      <motion.div className="container about-layout" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <div><p className="eyebrow">About</p><h2 id="about-heading">Editing built around rhythm, clarity, and conversion.</h2></div>
        <div className="about-copy"><p>versatileDOTmov is the portfolio of Harish Sontakke, focused on SaaS ad creatives, product demos, and performance-led social videos with polished motion graphics and tight editorial pacing.</p><div className="about-tools" aria-label="Editing tools"><span>Adobe After Effects</span><span>Adobe Premiere Pro</span><span>DaVinci Resolve</span></div></div>
      </motion.div>
    </section>
  );
}
