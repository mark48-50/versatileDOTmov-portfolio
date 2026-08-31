"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const RESULTS = [
  {
    prefix: "+",
    value: 42,
    suffix: "%",
    label: "Click-through increase after ad creative refresh for a B2B SaaS onboarding campaign.",
  },
  {
    prefix: "-",
    value: 27,
    suffix: "%",
    label: "Cost per lead reduction across 6 ad variants in a 4-week iteration cycle.",
  },
  {
    prefix: "",
    value: 3.1,
    suffix: "×",
    label: "Higher average watch duration using stronger first 3-second hook formats.",
    decimals: 1,
  },
];

/**
 * AnimatedCounter — counts from 0 to `value` when the parent triggers.
 */
function AnimatedCounter({ prefix, value, suffix, decimals = 0, trigger }) {
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (!trigger) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        setDisplay(`${prefix}${decimals > 0 ? v.toFixed(decimals) : Math.round(v)}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [trigger, value, prefix, suffix, decimals]);

  return <div className="result-card__value">{display}</div>;
}

/**
 * 3D tilt handler for result cards.
 */
function useTilt() {
  const onMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = Math.max(0, Math.min(1, x / rect.width));
    const py = Math.max(0, Math.min(1, y / rect.height));
    const max = 6;
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

export default function ResultsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const tilt = useTilt();

  return (
    <section id="results" className="container" aria-labelledby="results-heading">
      <div className="section-head">
        <p className="eyebrow">Impact</p>
        <h2 id="results-heading">Results Snapshot</h2>
      </div>
      <motion.div
        ref={ref}
        className="result-grid"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {RESULTS.map((r, i) => (
          <motion.article
            key={i}
            className="result-card"
            variants={cardVariant}
            {...tilt}
          >
            <AnimatedCounter
              prefix={r.prefix}
              value={r.value}
              suffix={r.suffix}
              decimals={r.decimals}
              trigger={inView}
            />
            <p>{r.label}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
