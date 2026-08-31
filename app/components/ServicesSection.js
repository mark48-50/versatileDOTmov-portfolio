"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50, rotateX: 8 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const SERVICES = [
  {
    number: "01",
    title: "Ad Creative Editing",
    desc: "Short-form ad edits built for Meta, YouTube, TikTok, and LinkedIn performance campaigns.",
  },
  {
    number: "02",
    title: "Product Demo Cutdowns",
    desc: "Transform long demos and webinars into concise conversion-focused video ads.",
  },
  {
    number: "03",
    title: "Retention + Hooks",
    desc: "Hook testing, subtitle dynamics, and scene pacing to improve watch time and click-through.",
  },
];

/**
 * 3D tilt handler — attaches per-card mouse tracking for perspective tilt.
 */
function useTilt() {
  const onMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = Math.max(0, Math.min(1, x / rect.width));
    const py = Math.max(0, Math.min(1, y / rect.height));
    const max = 7;
    const ry = (px - 0.5) * (max * 2);
    const rx = (0.5 - py) * (max * 2);

    el.classList.add("is-tilting");
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    el.style.transform = `perspective(900px) translateY(-4px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
  };

  const onLeave = (e) => {
    const el = e.currentTarget;
    el.classList.remove("is-tilting");
    el.style.transform = "perspective(900px) translateY(0) rotateX(0deg) rotateY(0deg)";
  };

  return { onMouseMove: onMove, onMouseLeave: onLeave };
}

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const tilt = useTilt();

  return (
    <section id="services" className="container" aria-labelledby="services-heading">
      <div className="section-head">
        <p className="eyebrow">What I Offer</p>
        <h2 id="services-heading">Video Editing Services</h2>
      </div>
      <motion.div
        ref={ref}
        className="service-grid"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {SERVICES.map((s) => (
          <motion.article
            key={s.number}
            className="service-card"
            variants={cardVariant}
            {...tilt}
          >
            <div className="service-card__number">{s.number}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
