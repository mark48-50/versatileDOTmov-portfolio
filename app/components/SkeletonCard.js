/**
 * SkeletonCard — mirrors the exact visual footprint of <VideoCard>.
 *
 * Structure matched:
 *   motion.article.card          → article.card  (border, border-radius, padding)
 *     div.video-thumb            → same (border-radius 12px, margin-bottom 1rem)
 *       video (16/9 aspect)      → skeleton block with aspect-ratio 16/9
 *
 * Used by <VideoSection> while the real cards are hydrating.
 */
export default function SkeletonCard() {
  return (
    <article
      className="card"
      aria-hidden="true"
      aria-label="Loading video…"
      style={{ pointerEvents: "none" }}
    >
      {/* Mirrors .video-thumb — the dominant visual area */}
      <div
        className="video-thumb"
        style={{ marginBottom: 0, overflow: "hidden" }}
      >
        <div
          className="skeleton"
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: "11px",
          }}
        />
      </div>
    </article>
  );
}
