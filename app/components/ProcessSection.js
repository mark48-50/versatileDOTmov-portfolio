"use client";

import { useRef, Children, useState } from "react";
import { motion, useInView } from "framer-motion";

const entryTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const stepVariant = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: entryTransition },
};

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    desc: "We discuss your brand, audience, and campaign goals.",
  },
  {
    number: "02",
    title: "Script & Storyboard",
    desc: "I map out the hook, pacing, and visual language.",
  },
  {
    number: "03",
    title: "Edit & Animate",
    desc: "Motion graphics, cuts, and sound design come together.",
  },
  {
    number: "04",
    title: "Deliver & Iterate",
    desc: "You receive export-ready files with revision rounds.",
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section id="process" className="container" aria-labelledby="process-heading">
      <div className="section-head">
        <p className="eyebrow">How I Work</p>
        <h2 id="process-heading">Process</h2>
      </div>
      <motion.div
        ref={ref}
        className="process-grid"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {STEPS.map((step) => (
          <motion.div key={step.number} className="process-step" variants={stepVariant}>
            <div className="process-step__number">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
