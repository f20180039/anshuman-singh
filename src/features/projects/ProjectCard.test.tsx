import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { SiReact } from "react-icons/si";
import { PROJECTS, type Project } from "../../data/projects";
import ProjectCard from "./ProjectCard";

function project(slug: string): Project {
  const found = PROJECTS.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`missing project ${slug}`);
  return found;
}

function renderCard(target: Project) {
  return render(
    <MemoryRouter>
      <ProjectCard project={target} index={0} />
    </MemoryRouter>,
  );
}

describe("ProjectCard", () => {
  it("case-study card links to its page, named by the title first", () => {
    renderCard(project("shaanti"));

    // The link's name leads with the title: the screenshot inside it is
    // decorative (alt=""), so a screen reader is not read the whole image
    // description before learning which project the link opens.
    const caseStudyLink = screen.getByRole("link", { name: /^Shaanti/ });
    expect(caseStudyLink).toHaveAttribute("href", "/projects/shaanti");
    const img = caseStudyLink.querySelector("img");
    expect(img).toHaveAttribute("alt", "");
    expect(img).toHaveAttribute("width");
    expect(img).toHaveAttribute("height");
    // The tech icons are SVGs with an img role of their own; the screenshot
    // itself must not be one.
    expect(
      within(caseStudyLink)
        .queryAllByRole("img")
        .filter((el) => el.tagName === "IMG"),
    ).toHaveLength(0);

    expect(screen.queryByRole("link", { name: /GitHub/ })).toBeNull();
    expect(screen.getByText("Private code")).toBeInTheDocument();
    expect(screen.getByText("Play Store release pending")).toBeInTheDocument();
  });

  it("public card shows GitHub link with safe rel in a centred row", () => {
    renderCard(project("signal-desk"));

    const github = screen.getByRole("link", { name: /GitHub/ });
    expect(github).toHaveAttribute(
      "href",
      "https://github.com/f20180039/moveinsync-hackathon-research",
    );
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.queryByText("Private code")).toBeNull();
    // Cards keep the default centred row; the case-study page asks for start.
    expect(github.parentElement?.className).toMatch(/ans-justify-center/);
  });

  it("older project keeps its behaviour", () => {
    const { unmount } = renderCard(project("snapgram"));

    const liveDemo = screen.getByRole("link", { name: /Live demo/ });
    expect(liveDemo).toHaveAttribute("href", "https://stalkergram.netlify.app");
    expect(liveDemo).toHaveAttribute("target", "_blank");
    expect(liveDemo).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/f20180039/snapgram",
    );
    // Older projects have no case study and no status: nothing links to a
    // case-study page and no badge is shown.
    expect(screen.queryByRole("link", { name: /Snapgram/ })).toBeNull();
    expect(screen.queryByText("Private code")).toBeNull();
    unmount();

    render(
      <MemoryRouter initialEntries={["/projects"]}>
        <Routes>
          <Route
            path="/projects"
            element={<ProjectCard project={project("guess-game")} index={0} />}
          />
          <Route path="/guess-game" element={<p>Guess Game page</p>} />
        </Routes>
      </MemoryRouter>,
    );

    const inApp = screen.getByRole("link", { name: /Live demo/ });
    expect(inApp).toHaveAttribute("href", "/guess-game");
    expect(inApp).not.toHaveAttribute("target");
    fireEvent.click(inApp);
    expect(screen.getByText("Guess Game page")).toBeInTheDocument();
  });

  it("card without image renders placeholder", () => {
    // A constructed fixture rather than a real entry: later tasks give every
    // recent project an image, so no PROJECTS entry is a stable example.
    const fixture: Project = {
      slug: "fixture",
      title: "Fixture Project",
      tagline: "A project with no screenshot",
      description: "Exists only to exercise the image placeholder.",
      tech: [SiReact],
      repo: { visibility: "unlinked" },
      links: [],
    };
    const { container } = renderCard(fixture);

    expect(container.querySelector("img")).toBeNull();
    expect(
      screen.getByRole("img", { name: "No screenshot available" }),
    ).toBeInTheDocument();
  });

  it("card with image renders it with its alt text", () => {
    const { container } = renderCard(project("snapgram"));

    const img = container.querySelector("img");
    expect(img).toHaveAttribute(
      "alt",
      "Snapgram login screen beside a collage of user posts from the feed",
    );
    expect(
      screen.queryByRole("img", { name: "No screenshot available" }),
    ).toBeNull();
  });

  it("case-study secondary links sit outside the main link", () => {
    renderCard(project("toodler"));

    const caseStudyLink = screen.getByRole("link", { name: /Toodler/ });
    expect(within(caseStudyLink).queryAllByRole("link")).toHaveLength(0);

    const live = screen.getByRole("link", { name: /Live prototype/ });
    expect(live).toHaveAttribute(
      "href",
      "https://toddle-admissions-prototype.onrender.com",
    );
    expect(caseStudyLink).not.toContainElement(live);
    expect(
      screen.getByText("Live prototype", { selector: "span" }),
    ).toBeInTheDocument();
  });
});
