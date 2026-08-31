"use client";

import { useEffect } from "react";

/**
 * ClientInteractions — simplified.
 * Handles: mobile menu toggle + custom cursor.
 * Scroll reveal & 3D tilt are now per-component via framer-motion.
 */
export default function ClientInteractions() {
  useEffect(() => {
    // --- Mobile menu toggle ---
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navAnchors = document.querySelectorAll(".nav-links a");

    const handleMenuClick = () => {
      if (!navLinks) return;
      const isOpen = navLinks.classList.toggle("open");
      menuToggle?.setAttribute("aria-expanded", String(isOpen));
    };

    const handleAnchorClick = () => {
      navLinks?.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    };

    menuToggle?.addEventListener("click", handleMenuClick);
    navAnchors.forEach((a) => a.addEventListener("click", handleAnchorClick));

    // --- Custom cursor ---
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    let cursorFx = null;
    let rafId;

    if (!prefersReducedMotion) {
      cursorFx = document.createElement("div");
      cursorFx.className = "cursor-fx";
      document.body.appendChild(cursorFx);

      let cursorX = window.innerWidth / 2;
      let cursorY = window.innerHeight / 2;
      let currentX = cursorX;
      let currentY = cursorY;

      const onMouseMove = (event) => {
        cursorX = event.clientX;
        cursorY = event.clientY;
        cursorFx.classList.add("active");
      };

      const onMouseLeave = () => {
        cursorFx.classList.remove("active");
      };

      function animateCursor() {
        currentX += (cursorX - currentX) * 0.18;
        currentY += (cursorY - currentY) * 0.18;
        cursorFx.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
        rafId = requestAnimationFrame(animateCursor);
      }

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseleave", onMouseLeave);
      animateCursor();

      // Store for cleanup
      cursorFx._onMouseMove = onMouseMove;
      cursorFx._onMouseLeave = onMouseLeave;
    }

    // --- Cleanup ---
    return () => {
      menuToggle?.removeEventListener("click", handleMenuClick);
      navAnchors.forEach((a) =>
        a.removeEventListener("click", handleAnchorClick)
      );
      if (cursorFx) {
        window.removeEventListener("mousemove", cursorFx._onMouseMove);
        window.removeEventListener("mouseleave", cursorFx._onMouseLeave);
        cancelAnimationFrame(rafId);
        cursorFx.remove();
      }
    };
  }, []);

  return null;
}
