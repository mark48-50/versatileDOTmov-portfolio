"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const glowHover = {
  boxShadow:
    "0 0 0 2px rgba(125, 215, 255, 0.9), 0 0 32px rgba(125, 215, 255, 0.5), 0 0 64px rgba(242, 138, 75, 0.25)",
};
const glowTransition = { duration: 0.35, ease: "linear" };

export default function VideoCard({ poster, src, title, desc, autoPlay = false }) {
  const videoRef = useRef(null);
  const playRef = useRef(null);
  const muteRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const syncButtons = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playRef.current)
      playRef.current.textContent = video.paused ? "Play" : "Pause";
    if (muteRef.current)
      muteRef.current.textContent = video.muted ? "Unmute" : "Mute";
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
    syncButtons();
  };

  const handleVideoPause = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setIsPlaying(false);
    syncButtons();
  };

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setIsPlaying(false);
    syncButtons();
  };

  const handlePlay = (e) => {
    e.preventDefault();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause(); // triggers handleVideoPause which resets + hides overlay
    }
  };

  const handleMute = (e) => {
    e.preventDefault();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    syncButtons();
  };

  if (autoPlay) {
    return (
      <motion.article
        className="card"
        whileHover={glowHover}
        transition={glowTransition}
      >
        <div className="video-thumb">
          <video autoPlay loop muted playsInline preload="metadata">
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      className="card"
      whileHover={glowHover}
      transition={glowTransition}
    >
      <div className="video-thumb" style={{ position: "relative" }}>
        <video
          ref={videoRef}
          preload="metadata"
          playsInline
          poster={poster}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          onVolumeChange={syncButtons}
          onEnded={handleVideoEnded}
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Poster overlay — shown when video is not playing */}
        {poster && !isPlaying && (
          <div
            onClick={handlePlay}
            role="button"
            tabIndex={0}
            aria-label="Play video"
            onKeyDown={(e) => e.key === "Enter" && handlePlay(e)}
            style={{
              position: "absolute",
              inset: 0,
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            <img
              src={poster}
              alt="Video thumbnail"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Centred play button */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.25)",
              }}
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                style={{ filter: "drop-shadow(0 2px 16px rgba(0,0,0,0.7))" }}
              >
                <circle cx="30" cy="30" r="30" fill="rgba(0,0,0,0.5)" />
                <polygon points="24,18 46,30 24,42" fill="white" />
              </svg>
            </div>
          </div>
        )}

        <div
          className="video-controls"
          aria-label="Video controls"
          style={{ position: "relative", zIndex: 3 }}
        >
          <button
            ref={playRef}
            className="video-btn"
            type="button"
            onClick={handlePlay}
            aria-label="Play or pause"
          >
            Play
          </button>
          <button
            ref={muteRef}
            className="video-btn"
            type="button"
            onClick={handleMute}
            aria-label="Mute or unmute"
          >
            Mute
          </button>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="video-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem",
            }}
            aria-label="View full size"
            title="View full size"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
