"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const glowHover = {
  boxShadow:
    "0 0 0 2px rgba(125, 215, 255, 0.9), 0 0 32px rgba(125, 215, 255, 0.5), 0 0 64px rgba(242, 138, 75, 0.25)",
};
const glowTransition = { duration: 0.35, ease: "linear" };

export default function VideoCard({
  poster,
  src,
  label,
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    }, { threshold: 0.1 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handleVideoPlay = () => {
    setErrorText("");
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    const video = videoRef.current;
    if (!video) return;
    setIsPlaying(false);
  };

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setIsPlaying(false);
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

    setIsPlaying(false);
    console.error("[VideoCard] video error", { src, code: err?.code, message: err?.message });
  };

  const handlePlay = (e) => {
    e.preventDefault();
    setErrorText("");
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.catch((err) => {
          if (err?.name === "AbortError") return;
          const name = err?.name || "Error";
          const message = err?.message || "Playback failed.";
          setErrorText(`${name}: ${message}`);
          // eslint-disable-next-line no-console
          console.error("[VideoCard] play() rejected", { src, err });
        });
      }
    } else {
      video.pause();
    }
  };

  const handleMute = (e) => {
    e.preventDefault();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

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
          muted
          preload="none"
          playsInline
          poster={poster}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
          onEnded={handleVideoEnded}
          onError={handleVideoError}
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Poster stays visible until the visitor starts this video. */}
        {poster && !isPlaying && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play ${label}`}
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
              alt={`${label} thumbnail`}
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

          </button>
        )}

        {errorText && <p className="video-error" role="status">{errorText}</p>}

        <div
          className="video-controls"
          aria-label="Video controls"
        >
          <button
            className="video-btn"
            type="button"
            onClick={handlePlay}
            aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            className="video-btn"
            type="button"
            onClick={handleMute}
            aria-label={isMuted ? `Unmute ${label}` : `Mute ${label}`}
          >
            {isMuted ? "Unmute" : "Mute"}
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
            aria-label={`View ${label} full size`}
            title={`View ${label} full size`}
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
