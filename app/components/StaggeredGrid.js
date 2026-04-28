"use client";

import { useRef, Children, useState } from "react";
import { motion, useInView } from "framer-motion";

// Entry — slow cinematic fade-up matching section reveal pace
const entryTransition = { duration: 1.1, ease: "easeInOut" };

// Hover spring — deliberate, heavy feel
const hoverSpring = { type: "spring", stiffness: 90, damping: 20, mass: 1.1 };

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: entryTransition,
  },
};

/**
 * Scroll-triggered stagger grid with hover scale + sibling-dim effect.
 *
 * - Cards spring in one-by-one as the grid enters the viewport.
 * - Hovering a card scales it up 5% instantly (spring).
 * - All other cards dim to 45% opacity to force focus on the active card.
 */
export default function StaggeredGrid({ className, children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const items = Children.toArray(children);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {items.map((child, i) => (
        // Outer — handles scroll-entry animation via variants
        <motion.div key={i} variants={cardVariant}>
          {/* Inner — handles hover scale + sibling dim independently */}
          <motion.div
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            animate={{
              scale: hoveredIndex === i ? 1.05 : 1,
              opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.45 : 1,
              zIndex: hoveredIndex === i ? 2 : 1,
            }}
            transition={hoverSpring}
            style={{ position: "relative" }}
          >
            {child}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
