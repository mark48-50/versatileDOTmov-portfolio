import VideoCard from "./VideoCard";

export default function VideoSection({ videos, gridClass, sectionLabel }) {
  return (
    <div className={gridClass}>
      {videos.map((v, i) => (
        <div key={`${v.src}-${i}`}>
          <VideoCard {...v} label={`${sectionLabel} ${String(i + 1).padStart(2, "0")}`} />
        </div>
      ))}
    </div>
  );
}
