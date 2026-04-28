"use client";

import { useScroll, useTransform, motion } from "framer-motion";

/**
 * Parallax background blobs that drift at different speeds as the user scrolls.
 * Shape-1 (orange, left) moves up faster; Shape-2 (blue, right) moves slower
 * for a layered depth effect.
 */
export default function ParallaxBackground() {
  const { scrollY } = useScroll();

  // Map 0–2000px of scroll to vertical offsets
  const y1 = useTransform(scrollY, [0, 2000], [0, -320]); // faster — feels closer
  const y2 = useTransform(scrollY, [0, 2000], [0, -140]); // slower  — feels farther
  const scale1 = useTransform(scrollY, [0, 1000], [1, 1.18]);
  const scale2 = useTransform(scrollY, [0, 1000], [1, 1.1]);

  return (
    <>
      <motion.div
        className="bg-shape bg-shape-1"
        aria-hidden="true"
        style={{ y: y1, scale: scale1 }}
      />
      <motion.div
        className="bg-shape bg-shape-2"
        aria-hidden="true"
        style={{ y: y2, scale: scale2 }}
      />
    </>
  );
}
