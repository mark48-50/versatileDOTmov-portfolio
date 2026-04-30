"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoCard from "./VideoCard";
import SkeletonCard from "./SkeletonCard";
import StaggeredGrid from "./StaggeredGrid";

const fadeOut = { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } };
const fadeIn  = { opacity: 0 };
const visible = { opacity: 1, transition: { duration: 0.4,  ease: "easeOut" } };

/**
 * VideoSection — skeleton → real cards swap.
 *
 * Mobile Safari fix: removed requestAnimationFrame wrapper.
 * rAF can be throttled or skipped by the browser before first paint on
 * mobile, leaving `mounted` permanently false. A plain useEffect with no
 * delay is guaranteed to fire after every hydration on every browser.
 *
 * AnimatePresence is only rendered after isMounted === true so that
 * Framer Motion never tries to animate during SSR or on the initial
 * hydration pass — preventing the "AnimatePresence not updating" mobile bug.
 */
export default function VideoSection({ videos, gridClass }) {
  const [isMounted, setIsMounted] = useState(false);

  // Plain, unconditional — fires after hydration on every browser/device
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ── Phase 1: before hydration — plain skeleton, no Framer Motion at all ──
  // This is what the server renders AND what the first client paint shows.
  // Framer Motion is completely absent to avoid any hydration mismatch.
  if (!isMounted) {
    return (
      <div
        className={gridClass}
        aria-busy="true"
        aria-label="Loading video gallery"
      >
        {videos.map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // ── Phase 2: after hydration — AnimatePresence handles the crossfade ──
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key="loaded"
        initial={fadeIn}
        animate={visible}
      >
        <StaggeredGrid className={gridClass}>
          {videos.map((v, i) => (
            <VideoCard key={i} {...v} />
          ))}
        </StaggeredGrid>
      </motion.div>
    </AnimatePresence>
  );
}
