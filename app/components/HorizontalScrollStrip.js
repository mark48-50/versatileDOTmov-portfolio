"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export default function HorizontalScrollStrip({ children, label = "Project gallery" }) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track || window.innerWidth < 820 || reduceMotion) return setDistance(0);
      setDistance(Math.max(0, Math.ceil(track.scrollWidth - viewport.clientWidth)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 90, damping: 24, mass: 0.35 });
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 24 });
  const pinned = distance > 24 && !reduceMotion;

  return (
    <div ref={sectionRef} className={`hscroll-pin${pinned ? " is-pinned" : ""}`} style={pinned ? { "--scroll-distance": `${distance}px` } : undefined}>
      <div className="hscroll-sticky">
        <div className="hscroll-viewport" ref={viewportRef} role="region" aria-label={label} tabIndex={pinned ? undefined : 0}>
          <motion.div className="hscroll-track" ref={trackRef} style={pinned ? { x } : undefined}>{children}</motion.div>
        </div>
        <div className="hscroll-gallery-progress" aria-hidden="true"><motion.span style={{ scaleX: pinned ? scaleX : 1 }} /></div>
      </div>
    </div>
  );
}
