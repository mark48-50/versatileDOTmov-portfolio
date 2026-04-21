"use client";

import { useEffect, useState, useRef } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);
  const btnRef = useRef(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const auto = prefersDark ? "dark" : "light";
      setTheme(auto);
    }
  }, []);

  const applyTheme = (t) => {
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
  };

  const toggle = () => {
    if (animatingRef.current) return;

    const next = theme === "dark" ? "light" : "dark";
    const btn = btnRef.current;

    // Fallback: no button ref or no View Transitions API support
    if (!btn || !document.startViewTransition) {
      applyTheme(next);
      return;
    }

    animatingRef.current = true;

    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Max radius needed to cover the entire viewport from the button
    const maxRadius = Math.ceil(
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
    );

    // Start the view transition — captures old state, applies changes, then we animate
    const transition = document.startViewTransition(() => {
      applyTheme(next);
    });

    transition.ready.then(() => {
      const goingDark = next === "dark";

      // Light → Dark: the NEW dark page expands outward from the button
      // Dark → Light: the OLD dark page contracts inward toward the button
      document.documentElement.animate(
        {
          clipPath: goingDark
            ? [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxRadius}px at ${x}px ${y}px)`,
              ]
            : [
                `circle(${maxRadius}px at ${x}px ${y}px)`,
                `circle(0px at ${x}px ${y}px)`,
              ],
        },
        {
          duration: 650,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          fill: "forwards",
          pseudoElement: goingDark
            ? "::view-transition-new(root)"
            : "::view-transition-old(root)",
        }
      );
    });

    transition.finished.then(() => {
      animatingRef.current = false;
    });
  };

  // Prevent flash — render empty button on server
  if (!theme)
    return <button className="theme-toggle" aria-label="Toggle theme" />;

  const isDark = theme === "dark";

  return (
    <button
      ref={btnRef}
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        /* Sun icon — shown in dark mode to indicate "switch to light" */
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* Moon icon — shown in light mode to indicate "switch to dark" */
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
