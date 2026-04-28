"use client";

import { useRef } from "react";

export default function VideoCard({ poster, src, title, desc, autoPlay = false }) {
  const videoRef = useRef(null);
  const playRef = useRef(null);
  const muteRef = useRef(null);

  const syncButtons = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playRef.current)
      playRef.current.textContent = video.paused ? "Play" : "Pause";
    if (muteRef.current)
      muteRef.current.textContent = video.muted ? "Unmute" : "Mute";
  };

  const stopToPoster = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    syncButtons();
  };

  const handlePlay = (e) => {
    e.preventDefault();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      stopToPoster();
    }
    syncButtons();
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
      <article className="card">
        <div className="video-thumb">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </article>
    );
  }

  return (
    <article className="card">
      <div className="video-thumb">
        <video
          ref={videoRef}
          preload="metadata"
          playsInline
          poster={poster}
          onPlay={syncButtons}
          onPause={syncButtons}
          onVolumeChange={syncButtons}
          onEnded={stopToPoster}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-controls" aria-label="Video controls">
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
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.5rem" }}
            aria-label="View full size"
            title="View full size"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </a>
        </div>
      </div>

    </article>
  );
}
