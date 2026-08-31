"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import VideoCard from "./VideoCard";

const entryTransition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: entryTransition },
};

/**
 * VideoSection — scroll-triggered stagger grid of VideoCards.
 * Skeleton loading removed — framer-motion handles all entry animations.
 */
export default function VideoSection({ videos, gridClass }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={gridClass}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {videos.map((v, i) => (
        <motion.div key={i} variants={cardVariant}>
          <VideoCard {...v} />
        </motion.div>
      ))}
    </motion.div>
  );
}
