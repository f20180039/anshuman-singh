import { useRef, type SyntheticEvent } from "react";
import type { ProjectVideo } from "../../data/projects";

/**
 * Narrated demo clips, one under another at the column's width, so a phone
 * never scrolls sideways. Each clip:
 * - downloads nothing until played (`preload="none"`) and shows a poster
 *   frame of itself meanwhile;
 * - starts muted, and is unmuted the first time a visitor presses play, so
 *   the narration is heard without anything ever playing sound on its own;
 *   after that the player's own mute button is respected;
 * - plays inline on iOS instead of jumping to full screen;
 * - carries a visible caption that also names it for screen readers.
 */
function DemoVideo({ video }: { video: ProjectVideo }) {
  const unmutedOnce = useRef(false);

  // React does not reflect `muted` as an attribute, so it is also set here on
  // mount; the attribute is what keeps the very first frame silent.
  const setInitialMute = (element: HTMLVideoElement | null) => {
    if (element && !unmutedOnce.current) {
      element.muted = true;
      element.defaultMuted = true;
    }
  };

  const handlePlay = (event: SyntheticEvent<HTMLVideoElement>) => {
    if (unmutedOnce.current) return;
    unmutedOnce.current = true;
    event.currentTarget.muted = false;
  };

  return (
    <figure className="ans-flex ans-flex-col ans-gap-2">
      <div className="ans-overflow-hidden ans-rounded-lg ans-bg-th-surface ans-shadow-md">
        <video
          ref={setInitialMute}
          src={video.src}
          poster={video.poster}
          width={video.width}
          height={video.height}
          controls
          preload="none"
          playsInline
          muted
          onPlay={handlePlay}
          aria-label={video.caption}
          className="ans-block ans-h-auto ans-w-full"
        />
      </div>
      <figcaption className="ans-text-1 ans-leading-relaxed ans-text-th-muted-fg">
        {video.caption}
      </figcaption>
    </figure>
  );
}

export default function VideoGallery({ videos }: { videos: ProjectVideo[] }) {
  if (videos.length === 0) return null;
  return (
    <ul
      role="list"
      aria-label="Demo videos"
      className="ans-flex ans-list-none ans-flex-col ans-gap-6"
    >
      {videos.map((video) => (
        <li key={video.src} className="ans-min-w-0">
          <DemoVideo video={video} />
        </li>
      ))}
    </ul>
  );
}
