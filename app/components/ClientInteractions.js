"use client";

import { useEffect } from "react";

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

    // --- Reveal on scroll ---
    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    revealItems.forEach((item) => observer.observe(item));

    // --- Custom cursor ---
    const cursorFx = document.createElement("div");
    cursorFx.className = "cursor-fx";
    document.body.appendChild(cursorFx);

    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let currentX = cursorX;
    let currentY = cursorY;
    let rafId;

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

    // --- 3D tilt effect ---
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    const isFinePointer = window.matchMedia?.("(pointer: fine)")?.matches;
    const tiltCleanups = [];

    if (!prefersReducedMotion && isFinePointer) {
      const tiltTargets = document.querySelectorAll(
        ".card, .service-card, .result-card, .price-card, .testimonials blockquote"
      );

      tiltTargets.forEach((el) => {
        el.style.transform =
          "perspective(900px) translateY(0) rotateX(0deg) rotateY(0deg)";

        const onMove = (event) => {
          const rect = el.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const px = Math.max(0, Math.min(1, x / rect.width));
          const py = Math.max(0, Math.min(1, y / rect.height));
          const max = 7;
          const ry = (px - 0.5) * (max * 2);
          const rx = (0.5 - py) * (max * 2);

          el.classList.add("is-tilting");
          el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
          el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
          el.style.transform = `perspective(900px) translateY(-4px) rotateX(${rx.toFixed(
            2
          )}deg) rotateY(${ry.toFixed(2)}deg)`;
        };

        const onLeave = () => {
          el.classList.remove("is-tilting");
          el.style.transform =
            "perspective(900px) translateY(0) rotateX(0deg) rotateY(0deg)";
        };

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        tiltCleanups.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    // --- Cleanup ---
    return () => {
      menuToggle?.removeEventListener("click", handleMenuClick);
      navAnchors.forEach((a) =>
        a.removeEventListener("click", handleAnchorClick)
      );
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
      cursorFx.remove();
      tiltCleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
