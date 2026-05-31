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
  const [errorText, setErrorText] = useState("");

  const syncButtons = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playRef.current)
      playRef.current.textContent = video.paused ? "Play" : "Pause";
    if (muteRef.current)
      muteRef.current.textContent = video.muted ? "Unmute" : "Mute";
  };

  const handleVideoPlay = () => {
    setErrorText("");
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

  const mediaErrorToText = (code) => {
    switch (code) {
      case 1:
        return "Playback was aborted.";
      case 2:
        return "Network error while loading the video.";
      case 3:
        return "The video could not be decoded (codec/encoding issue).";
      case 4:
        return "Video format not supported or the file URL is invalid.";
      default:
        return "Video playback failed.";
    }
  };

  const handleVideoError = () => {
    const video = videoRef.current;
    const err = video?.error; // MediaError — prototype getters, NOT own props

    const msg = err?.code ? mediaErrorToText(err.code) : "Video failed to load.";
    setErrorText(msg);

    // MediaError's `code` and `message` are prototype getters, so spreading
    // `err` or passing it directly to console.error always shows `{}`.
    // Manually extract them into a plain object so they appear in the console.
    // Also capture networkState / readyState — these pinpoint 404s vs codec
    // failures vs autoplay policy blocks instantly.
    const errorDetail = {
      src,
      // MediaError fields (must be read explicitly — not own enumerable props)
      code: err?.code ?? null,
      message: err?.message ?? null,
      // MediaError code → human label mapping
      codeLabel: err?.code ? mediaErrorToText(err.code) : "unknown",
      // HTMLMediaElement diagnostics
      networkState: video?.networkState ?? null, // 0=EMPTY 1=IDLE 2=LOADING 3=NO_SOURCE
      readyState: video?.readyState ?? null,      // 0=HAVE_NOTHING … 4=HAVE_ENOUGH_DATA
      currentSrc: video?.currentSrc || null,
    };

    // Don't fail silently in dev; this is the fastest way to discover
    // the real cause (404/403, bad MIME type, codec, blocked by policy, etc).
    // eslint-disable-next-line no-console
    console.log("[VideoCard] video error", errorDetail);
  };

  const handlePlay = (e) => {
    e.preventDefault();
    setErrorText("");
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      const p = video.play();
      // play() returns a Promise and will reject on autoplay-policy or unsupported sources.
      // We surface this instead of swallowing it so the failure mode isn't "nothing happens".
      if (p && typeof p.catch === "function") {
        p.catch((err) => {
          const name = err?.name || "Error";
          const message = err?.message || "Playback failed.";
          setErrorText(`${name}: ${message}`);
          // eslint-disable-next-line no-console
          console.error("[VideoCard] play() rejected", { src, err });
        });
      }
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
      <div
        className={`video-thumb${isPlaying ? " is-playing" : ""}${
          errorText ? " has-error" : ""
        }`}
        style={{ position: "relative" }}
      >
        <video
          ref={videoRef}
          preload="metadata"
          playsInline
          poster={poster}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          onVolumeChange={syncButtons}
          onEnded={handleVideoEnded}
          onError={handleVideoError}
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Poster overlay — shown when video is not playing */}
        {poster && !isPlaying && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Play video"
            style={{
              position: "absolute",
              inset: 0,
              cursor: "pointer",
              zIndex: 2,
              padding: 0,
              border: "none",
              background: "transparent",
              display: "block",
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

            {errorText && (
              <div
                role="status"
                aria-live="polite"
                style={{
                  position: "absolute",
                  left: 12,
                  right: 12,
                  bottom: 12,
                  padding: "0.6rem 0.75rem",
                  borderRadius: 12,
                  background: "rgba(0,0,0,0.65)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "white",
                  fontSize: "0.9rem",
                }}
              >
                {errorText}
              </div>
            )}
          </button>
        )}

        <div
          className="video-controls"
          aria-label="Video controls"
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
