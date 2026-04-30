"use client";

/**
 * VideoSection — Client wrapper that shows skeleton cards while hydrating,
 * then crossfades to the real StaggeredGrid of VideoCards.
 *
 * Why useState(false) + useEffect?
 *   In Next.js App Router, SSR renders the initial HTML. useState(false) means
 *   both the server render AND the first client render produce skeletons →
 *   zero hydration mismatch. useEffect fires only on the client after mount,
 *   flipping to the real cards with an AnimatePresence crossfade.
 *
 * Props:
 *   videos      — array of { src, poster, title?, desc?, tags? }
 *   gridClass   — CSS class for the grid (e.g. "work-grid" or "work-grid pop-grid")
 *   count       — number of skeleton cards to pre-render (should equal videos.length)
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoCard from "./VideoCard";
import SkeletonCard from "./SkeletonCard";
import StaggeredGrid from "./StaggeredGrid";

const fadeOut = { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } };
const fadeIn  = { opacity: 0 };
const visible = { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } };

export default function VideoSection({ videos, gridClass }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Tiny delay so the skeleton is visible for at least one frame — prevents
    // an invisible flash on very fast devices / cached pages.
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {!mounted ? (
        /* ── Skeleton phase ── */
        <motion.div
          key="skeleton"
          className={gridClass}
          initial={{ opacity: 1 }}
          exit={fadeOut}
          aria-busy="true"
          aria-label="Loading video gallery"
        >
          {videos.map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </motion.div>
      ) : (
        /* ── Loaded phase ── */
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
      )}
    </AnimatePresence>
  );
}
