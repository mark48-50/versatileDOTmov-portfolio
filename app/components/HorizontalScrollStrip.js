"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * HorizontalScrollStrip — a pinned container that scrolls its children
 * horizontally while the user scrolls vertically.
 *
 * Usage:
 *   <HorizontalScrollStrip>
 *     <div className="hscroll-card">...</div>
 *     <div className="hscroll-card">...</div>
 *   </HorizontalScrollStrip>
 *
 * The section becomes "sticky" and the track translates from 0 to
 * -(trackWidth - viewportWidth) as the user scrolls through the
 * section's scroll range.
 */
export default function HorizontalScrollStrip({ children, cardCount = 4 }) {
  const containerRef = useRef(null);

  // scrollYProgress goes from 0..1 as the container scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Translate the track from 0% to -(100% - one card's width) of the total track width
  // We approximate: each card is ~38vw, so with N cards the total overflow is roughly (N-2.5) * 38vw
  // But we'll use a percentage-based approach with `x` transform
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(cardCount - 2) * 38}%`]);

  return (
    <div
      ref={containerRef}
      className="hscroll-pin"
      style={{ height: `${cardCount * 60}vh` }}
    >
      <div
        style={{
          position: "sticky",
          top: 80,
          overflow: "hidden",
          height: "calc(100vh - 100px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <motion.div className="hscroll-track" style={{ x }}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
