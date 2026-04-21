"use client";

import { useRef } from "react";

export default function VideoCard({ poster, src, title, desc, tags }) {
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
        </div>
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <ul>
        {tags.map((tag, i) => (
          <li key={i}>{tag}</li>
        ))}
      </ul>
    </article>
  );
}
