"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Low stiffness + high damping = heavy, premium magnetic pull
const SPRING = { stiffness: 80, damping: 20, mass: 1.2 };
const PULL_STRENGTH = 0.42;
const PULL_RADIUS = 100;

export default function MagneticButton({ children, href, className, ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xS = useSpring(x, SPRING);
  const yS = useSpring(y, SPRING);

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
      x.set(dx * PULL_STRENGTH);
      y.set(dy * PULL_STRENGTH);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref}
      href={href}
      className={className}
      style={{ x: xS, y: yS }}
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
