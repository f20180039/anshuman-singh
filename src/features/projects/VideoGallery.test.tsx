import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import type { ProjectVideo } from "../../data/projects";
import VideoGallery from "./VideoGallery";

const VIDEOS: ProjectVideo[] = [
  {
    src: "/clips/one.mp4",
    poster: "/clips/one.webp",
    caption: "First clip: the public site",
    width: 1280,
    height: 720,
  },
  {
    src: "/clips/two.mp4",
    poster: "/clips/two.webp",
    caption: "Second clip: the moderator",
    width: 1280,
    height: 720,
  },
];

function videoElements(container: HTMLElement): HTMLVideoElement[] {
  return Array.from(container.querySelectorAll("video"));
}

describe("VideoGallery", () => {
  it("renders nothing without videos", () => {
    const { container } = render(<VideoGallery videos={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders each clip with controls, no preload, inline play, a poster and a caption", () => {
    const { container } = render(<VideoGallery videos={VIDEOS} />);

    const list = screen.getByRole("list", { name: "Demo videos" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);

    const videos = videoElements(container);
    expect(videos).toHaveLength(2);
    videos.forEach((video, index) => {
      const expected = VIDEOS[index];
      expect(video).toHaveAttribute("src", expected.src);
      expect(video).toHaveAttribute("poster", expected.poster);
      expect(video).toHaveAttribute("controls");
      expect(video).toHaveAttribute("preload", "none");
      expect(video).toHaveAttribute("playsinline");
      expect(video).not.toHaveAttribute("autoplay");
      expect(video).toHaveAttribute("aria-label", expected.caption);
      expect(video).toHaveAttribute("width", "1280");
      expect(video).toHaveAttribute("height", "720");
      expect(screen.getByText(expected.caption).tagName).toBe("FIGCAPTION");
    });
  });

  it("starts muted and unmutes on the first play only", () => {
    const { container } = render(<VideoGallery videos={VIDEOS} />);
    const [first, second] = videoElements(container);

    expect(first.muted).toBe(true);
    expect(second.muted).toBe(true);

    fireEvent.play(first);
    expect(first.muted).toBe(false);
    // Playing one clip leaves the others alone.
    expect(second.muted).toBe(true);

    // A visitor who mutes it again stays muted on the next play.
    first.muted = true;
    fireEvent.play(first);
    expect(first.muted).toBe(true);
  });
});
