"use client";

import { useEffect, useRef } from "react";

// ─── Tuning ───────────────────────────────────────────────────────────────────
const PARTICLE_COUNT  = 110;
const MAX_DIST        = 130;   // px — max connection distance
const SPEED           = 0.22;  // base drift speed
const DOT_RADIUS      = 1.2;   // tiny dot radius (px)
const SCROLL_PARALLAX = 0.12;
const CURSOR_RADIUS   = 120;   // px — cursor influence zone
const CURSOR_REPEL    = 55;
const CURSOR_STRENGTH = 0.06;

// ─── Theme-aware palettes ─────────────────────────────────────────────────────
// Dark: light-coloured dots pop against the deep navy background
const DARK_COLORS = [
  { r: 125, g: 215, b: 255 }, // --accent-2  ice blue  #7dd7ff
  { r: 242, g: 138, b:  75 }, // --accent    orange    #f28a4b
  { r: 210, g: 220, b: 255 }, // soft white-blue
];

// Light: deeper, more saturated tones that show up against #f3f6ff
const LIGHT_COLORS = [
  { r:  11, g:  16, b:  32 }, // --text dark navy   #0b1020
  { r:  36, g:  26, b:  46 }, // --surface-2 indigo #241a2e
  { r: 180, g:  90, b:  20 }, // darker orange
];

function getThemeColors() {
  if (typeof window === "undefined") return DARK_COLORS;
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light") return LIGHT_COLORS;
  if (attr === "dark")  return DARK_COLORS;
  // Fall back to OS preference
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? LIGHT_COLORS
    : DARK_COLORS;
}

function rand(min, max) { return Math.random() * (max - min) + min; }

function makeParticle(W, H, colors) {
  const c = colors[Math.floor(Math.random() * colors.length)];
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    ox: 0, oy: 0,
    vx: rand(-SPEED, SPEED),
    vy: rand(-SPEED, SPEED),
    r:  DOT_RADIUS * (0.7 + Math.random() * 0.6),
    cr: c.r, cg: c.g, cb: c.b,
    alpha: 0.22 + Math.random() * 0.4,
  };
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const stateRef  = useRef({
    mouse:     { x: -9999, y: -9999 },
    scrollY:   0,
    particles: [],
    colors:    DARK_COLORS,
    W: 0, H: 0,
    rafId: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const S = stateRef.current;

    // ── Init ──────────────────────────────────────────────────────────────────
    const init = () => {
      S.W = canvas.width  = window.innerWidth;
      S.H = canvas.height = window.innerHeight;
      S.colors = getThemeColors();
      S.particles = Array.from(
        { length: PARTICLE_COUNT },
        () => makeParticle(S.W, S.H, S.colors)
      );
    };
    init();

    // ── Recolour existing particles when theme changes ────────────────────────
    const repaint = () => {
      S.colors = getThemeColors();
      for (const p of S.particles) {
        const c = S.colors[Math.floor(Math.random() * S.colors.length)];
        p.cr = c.r; p.cg = c.g; p.cb = c.b;
      }
    };

    // MutationObserver watches data-theme attribute on <html>
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "data-theme") { repaint(); break; }
      }
    });
    observer.observe(document.documentElement, { attributes: true });

    // Also listen for OS preference flips (rare, but correct)
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    mq.addEventListener("change", repaint);

    // ── Event listeners ───────────────────────────────────────────────────────
    const onResize    = () => init();
    const onScroll    = () => { S.scrollY = window.scrollY; };
    const onMouseMove = (e) => { S.mouse.x = e.clientX; S.mouse.y = e.clientY; };
    const onMouseOut  = () => { S.mouse.x = -9999; S.mouse.y = -9999; };

    window.addEventListener("resize",    onResize,    { passive: true });
    window.addEventListener("scroll",    onScroll,    { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseout",  onMouseOut,  { passive: true });

    // ── Render loop ───────────────────────────────────────────────────────────
    const draw = () => {
      const { W, H, particles, mouse, scrollY } = S;
      ctx.clearRect(0, 0, W, H);

      const scrollOff = scrollY * SCROLL_PARALLAX;

      for (const p of particles) {
        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Toroidal wrap
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Cursor repulsion
        const dx   = p.x - mouse.x;
        const dy   = (p.y - scrollOff) - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CURSOR_RADIUS && dist > 0) {
          const force = 1 - dist / CURSOR_RADIUS;
          p.ox += ((dx / dist) * CURSOR_REPEL * force - p.ox) * CURSOR_STRENGTH;
          p.oy += ((dy / dist) * CURSOR_REPEL * force - p.oy) * CURSOR_STRENGTH;
        } else {
          p.ox *= 0.92;
          p.oy *= 0.92;
        }

        const fx = p.x + p.ox;
        const fy = p.y + p.oy - scrollOff;

        // Draw dot
        ctx.beginPath();
        ctx.arc(fx, fy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${p.alpha})`;
        ctx.fill();
      }

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        const a  = particles[i];
        const ax = a.x + a.ox;
        const ay = a.y + a.oy - scrollOff;

        for (let j = i + 1; j < particles.length; j++) {
          const b  = particles[j];
          const bx = b.x + b.ox;
          const by = b.y + b.oy - scrollOff;
          const d  = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);

          if (d < MAX_DIST) {
            const t  = 1 - d / MAX_DIST;
            const mr = (a.cr + b.cr) >> 1;
            const mg = (a.cg + b.cg) >> 1;
            const mb = (a.cb + b.cb) >> 1;

            // Glow pass
            ctx.beginPath();
            ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(${mr},${mg},${mb},${+(t * 0.07).toFixed(3)})`;
            ctx.lineWidth = 2.8;
            ctx.stroke();

            // Crisp pass
            ctx.beginPath();
            ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(${mr},${mg},${mb},${+(t * 0.25).toFixed(3)})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      S.rafId = requestAnimationFrame(draw);
    };

    draw();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(S.rafId);
      observer.disconnect();
      mq.removeEventListener("change", repaint);
      window.removeEventListener("resize",    onResize);
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout",  onMouseOut);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:          0,
        width:         "100%",
        height:        "100%",
        zIndex:        -1,
        pointerEvents: "none",
        display:       "block",
      }}
    />
  );
}
