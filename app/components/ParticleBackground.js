"use client";

import { useEffect, useRef } from "react";

// ─── Mobile breakpoint ────────────────────────────────────────────────────────
const MOBILE_BREAKPOINT = 768; // px — treat as mobile below this width

// ─── Desktop config ───────────────────────────────────────────────────────────
const DESKTOP = {
  count:          110,
  maxDist:        130,
  speed:          0.22,
  dotRadius:      1.2,
  glowAlpha:      0.07,
  lineAlpha:      0.25,
  lineWidthGlow:  2.8,
  lineWidthCrisp: 0.55,
};

// ─── Mobile config — sparse, clean, uncluttered ───────────────────────────────
const MOBILE = {
  count:          28,
  maxDist:        70,   // short range → almost no lines drawn
  speed:          0.16,
  dotRadius:      1.0,
  glowAlpha:      0.04, // barely visible glow
  lineAlpha:      0.08, // very faint lines
  lineWidthGlow:  1.6,
  lineWidthCrisp: 0.4,
};

// ─── Shared config ────────────────────────────────────────────────────────────
const SCROLL_PARALLAX = 0.12;
const CURSOR_RADIUS   = 100;
const CURSOR_REPEL    = 45;
const CURSOR_STRENGTH = 0.06;

// ─── Theme-aware palettes ─────────────────────────────────────────────────────
const DARK_COLORS = [
  { r: 125, g: 215, b: 255 }, // ice blue  #7dd7ff
  { r: 242, g: 138, b:  75 }, // orange    #f28a4b
  { r: 210, g: 220, b: 255 }, // soft white-blue
];

const LIGHT_COLORS = [
  { r:  11, g:  16, b:  32 }, // dark navy  #0b1020
  { r:  36, g:  26, b:  46 }, // indigo     #241a2e
  { r: 160, g:  80, b:  15 }, // deep orange
];

function getThemeColors() {
  if (typeof window === "undefined") return DARK_COLORS;
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light") return LIGHT_COLORS;
  if (attr === "dark")  return DARK_COLORS;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? LIGHT_COLORS : DARK_COLORS;
}

function isMobile() {
  return typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;
}

function getCfg() { return isMobile() ? MOBILE : DESKTOP; }

function rand(min, max) { return Math.random() * (max - min) + min; }

function makeParticle(W, H, colors, cfg) {
  const c = colors[Math.floor(Math.random() * colors.length)];
  return {
    x: Math.random() * W,  y: Math.random() * H,
    ox: 0, oy: 0,
    vx: rand(-cfg.speed, cfg.speed),
    vy: rand(-cfg.speed, cfg.speed),
    r:  cfg.dotRadius * (0.7 + Math.random() * 0.6),
    cr: c.r, cg: c.g, cb: c.b,
    alpha: 0.20 + Math.random() * 0.38,
  };
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const stateRef  = useRef({
    mouse: { x: -9999, y: -9999 },
    scrollY: 0,
    particles: [],
    colors: DARK_COLORS,
    cfg: DESKTOP,
    dpr: 1,
    W: 0, H: 0,
    rafId: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const S = stateRef.current;

    // ── Init / resize — full DPR-aware setup ─────────────────────────────────
    const init = () => {
      // Logical (CSS) dimensions
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;

      // Device pixel ratio for sharp rendering on Retina / high-DPI screens
      const dpr = window.devicePixelRatio || 1;
      S.dpr = dpr;

      // Physical pixel dimensions
      canvas.width  = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);

      // Keep CSS size at logical dimensions so it doesn't overflow
      canvas.style.width  = cssW + "px";
      canvas.style.height = cssH + "px";

      // Scale context so all draw calls use logical (CSS) coordinates
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Store logical dimensions for all draw math
      S.W = cssW;
      S.H = cssH;

      // Pick responsive config
      S.cfg    = getCfg();
      S.colors = getThemeColors();
      S.particles = Array.from(
        { length: S.cfg.count },
        () => makeParticle(S.W, S.H, S.colors, S.cfg)
      );
    };
    init();

    // ── Theme repainting ──────────────────────────────────────────────────────
    const repaint = () => {
      S.colors = getThemeColors();
      for (const p of S.particles) {
        const c = S.colors[Math.floor(Math.random() * S.colors.length)];
        p.cr = c.r; p.cg = c.g; p.cb = c.b;
      }
    };

    const observer = new MutationObserver((ms) => {
      for (const m of ms) { if (m.attributeName === "data-theme") { repaint(); break; } }
    });
    observer.observe(document.documentElement, { attributes: true });

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
      const { W, H, particles, mouse, scrollY, cfg } = S;

      // clearRect in logical px (context is already scaled by DPR via setTransform)
      ctx.clearRect(0, 0, W, H);

      const scrollOff = scrollY * SCROLL_PARALLAX;

      // ── Update + draw dots ────────────────────────────────────────────────
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Toroidal wrap
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Cursor repulsion (desktop only — no mouse on touch)
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

        ctx.beginPath();
        ctx.arc(fx, fy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${p.alpha})`;
        ctx.fill();
      }

      // ── Connection lines ──────────────────────────────────────────────────
      for (let i = 0; i < particles.length; i++) {
        const a  = particles[i];
        const ax = a.x + a.ox;
        const ay = a.y + a.oy - scrollOff;

        for (let j = i + 1; j < particles.length; j++) {
          const b  = particles[j];
          const bx = b.x + b.ox;
          const by = b.y + b.oy - scrollOff;
          const d  = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);

          if (d < cfg.maxDist) {
            const t  = 1 - d / cfg.maxDist;
            const mr = (a.cr + b.cr) >> 1;
            const mg = (a.cg + b.cg) >> 1;
            const mb = (a.cb + b.cb) >> 1;

            // Glow pass
            ctx.beginPath();
            ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(${mr},${mg},${mb},${+(t * cfg.glowAlpha).toFixed(3)})`;
            ctx.lineWidth = cfg.lineWidthGlow;
            ctx.stroke();

            // Crisp pass
            ctx.beginPath();
            ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(${mr},${mg},${mb},${+(t * cfg.lineAlpha).toFixed(3)})`;
            ctx.lineWidth = cfg.lineWidthCrisp;
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
        zIndex:        -1,
        pointerEvents: "none",
        display:       "block",
        // width/height set dynamically in JS (DPR-aware)
      }}
    />
  );
}
