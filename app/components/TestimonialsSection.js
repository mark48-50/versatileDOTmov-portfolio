"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "Our paid team finally had creative that matched our product quality. Performance lifted in week one.",
    author: "— Growth Lead, B2B SaaS",
  },
  {
    quote: "Fast turnaround, clear creative logic, and edits that actually improve CAC. Exactly what we needed.",
    author: "— Marketing Director, Fintech",
  },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 120 : -120, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -120 : 120, opacity: 0, scale: 0.96 }),
};

const transition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (!inView) return;
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [inView]);

  return (
    <section className="container" aria-labelledby="testimonials-heading" ref={ref}>
      <div className="section-head">
        <p className="eyebrow">Client Feedback</p>
        <h2 id="testimonials-heading">What Teams Say</h2>
      </div>
      <div className="testimonials-slider">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            className="testimonial-card"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            <p className="testimonial-card__quote">
              {TESTIMONIALS[current].quote}
            </p>
            <cite style={{ fontStyle: "normal", color: "var(--muted)", fontSize: "0.9rem" }}>
              {TESTIMONIALS[current].author}
            </cite>
          </motion.div>
        </AnimatePresence>
        <div className="testimonial-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot${i === current ? " active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
