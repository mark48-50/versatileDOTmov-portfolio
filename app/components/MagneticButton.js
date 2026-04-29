"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Low stiffness + high damping = heavy, premium magnetic pull
const SPRING = { stiffness: 80, damping: 20, mass: 1.2 };
const PULL_STRENGTH = 0.42;
const PULL_RADIUS = 100;

// Framer-motion-aware next/link wrapper
const MotionLink = motion.create(Link);

export default function MagneticButton({ children, href, className, ...rest }) {
  const ref = useRef(null);
  const x = useRef(0);
  const y = useRef(0);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < PULL_RADIUS) {
      el.style.transform = `translate(${dx * PULL_STRENGTH}px, ${dy * PULL_STRENGTH}px)`;
    } else {
      el.style.transform = "";
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  // Use next/link (MotionLink) for href links, motion.button for buttons
  const Tag = href ? MotionLink : motion.button;

  return (
    <Tag
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      whileHover={{
        boxShadow: "0 16px 40px rgba(242, 138, 75, 0.42)",
        scale: 1.04,
      }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
