"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

export default function ScrambleText({ text, className, delay = 0 }) {
  const [displayed, setDisplayed] = useState(() => text.replace(/\S/g, "█"));
  const frame = useRef(null);

  useEffect(() => {
    let start = null;
    const duration = 1600; // ms to fully reveal

    const tick = (ts) => {
      if (!start) start = ts + delay;
      const elapsed = Math.max(0, ts - start);
      const progress = Math.min(elapsed / duration, 1);
      const lockedCount = Math.floor(progress * text.length);

      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < lockedCount) return char;
            if (elapsed <= 0) return "█";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (progress < 1) frame.current = requestAnimationFrame(tick);
      else setDisplayed(text);
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [text, delay]);

  return <span className={className}>{displayed}</span>;
}
