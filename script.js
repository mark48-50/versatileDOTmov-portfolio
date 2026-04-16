const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll(".reveal");
const hoverVideos = document.querySelectorAll("video[data-video]");

const cursorFx = document.createElement("div");
cursorFx.className = "cursor-fx";
document.body.appendChild(cursorFx);

const contactForm = document.querySelector("form[data-contact-form]");
const formStatus = contactForm?.querySelector(".form-status");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

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

let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
let currentX = cursorX;
let currentY = cursorY;

window.addEventListener("mousemove", (event) => {
  cursorX = event.clientX;
  cursorY = event.clientY;
  cursorFx.classList.add("active");
});

window.addEventListener("mouseleave", () => {
  cursorFx.classList.remove("active");
});

function animateCursor() {
  currentX += (cursorX - currentX) * 0.18;
  currentY += (cursorY - currentY) * 0.18;
  cursorFx.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateCursor);
}

animateCursor();

hoverVideos.forEach((video) => {
  const videoThumb = video.closest(".video-thumb");
  const playButton = videoThumb?.querySelector("[data-video-play]");
  const muteButton = videoThumb?.querySelector("[data-video-mute]");

  const syncButtons = () => {
    if (playButton) playButton.textContent = video.paused ? "Play" : "Pause";
    if (muteButton) muteButton.textContent = video.muted ? "Unmute" : "Mute";
  };

  const stopToPoster = () => {
    video.pause();
    video.currentTime = 0;
    syncButtons();
  };

  video.controls = false; // Hide native controls; we use our own 2-button overlay.
  syncButtons();

  video.addEventListener("play", syncButtons);
  video.addEventListener("pause", syncButtons);
  video.addEventListener("volumechange", syncButtons);
  video.addEventListener("ended", stopToPoster);

  playButton?.addEventListener("click", (event) => {
    event.preventDefault();
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      stopToPoster();
    }
    syncButtons();
  });

  muteButton?.addEventListener("click", (event) => {
    event.preventDefault();
    video.muted = !video.muted;
    syncButtons();
  });
});

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    formStatus.classList.remove("ok", "err");
    formStatus.textContent = "Sending...";

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json().catch(() => ({}))
        : {};

      if (!response.ok || !data.ok) {
        formStatus.classList.add("err");
        if (data?.error) {
          formStatus.textContent = data.error;
        } else if (!contentType.includes("application/json")) {
          formStatus.textContent = "Server not running. Start it with npm run dev, then open http://localhost:3000.";
        } else {
          formStatus.textContent = "Something went wrong. Please try again.";
        }
        return;
      }

      formStatus.classList.add("ok");
      formStatus.textContent = "Sent. I will reply soon.";
      contactForm.reset();
    } catch {
      formStatus.classList.add("err");
      formStatus.textContent = "Network error. Please try again.";
    }
  });
}

// 3D tilt effect for key cards (desktop only).
const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
const isFinePointer = window.matchMedia?.("(pointer: fine)")?.matches;

if (!prefersReducedMotion && isFinePointer) {
  const tiltTargets = document.querySelectorAll(
    ".card, .service-card, .result-card, .price-card, .testimonials blockquote"
  );

  tiltTargets.forEach((el) => {
    el.style.transform = "perspective(900px) translateY(0) rotateX(0deg) rotateY(0deg)";

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const px = Math.max(0, Math.min(1, x / rect.width));
      const py = Math.max(0, Math.min(1, y / rect.height));

      const max = 7; // degrees
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
      el.style.transform = "perspective(900px) translateY(0) rotateX(0deg) rotateY(0deg)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
  });
}
