"use client";

import { useScroll, useTransform, motion } from "framer-motion";

/**
 * ScrollProgressBar — thin accent gradient bar at the top of the viewport.
 * Width driven by page scroll progress via framer-motion.
 * Hidden when prefers-reduced-motion is active (via CSS).
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <motion.div className="scroll-progress__bar" style={{ scaleX }} />
    </div>
  );
}
