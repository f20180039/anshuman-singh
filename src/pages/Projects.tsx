import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import SnapgramImage from "../assets/snapgram.png";

const projects = [
  {
    title: "Snapgram (Instagram Clone)",
    image: SnapgramImage,
    github: "https://github.com/f20180039/snapgram",
    liveDemo: "https://stalkergram.netlify.app",
  },
  {
    title: "In Progress",
    image: "",
    github: "#",
    liveDemo: "#",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="ans-py-12 ans-text-center ans-bg-White dark:ans-bg-Gray-900 ans-text-Gray-900 dark:ans-text-White"
    >
      <p className="ans-text-lg ans-font-medium ans-text-Gray-700 dark:ans-text-Gray-300">
        Browse My Recent
      </p>
      <h1 className="ans-text-3xl ans-font-bold ans-text-Blue-600 dark:ans-text-Blue-400">
        Projects
      </h1>
      <div className="ans-flex ans-flex-wrap ans-justify-center ans-gap-8 ans-mt-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="ans-bg-Gray-100 dark:ans-bg-Gray-800 ans-rounded-lg ans-shadow-md ans-p-6 ans-w-80"
          >
            <img
              src={project.image}
              alt={project.title}
              className="ans-rounded ans-mb-4 ans-w-full ans-h-48 ans-object-cover"
            />
            <h2 className="ans-text-xl ans-font-semibold ans-mb-2 ans-text-Gray-900 dark:ans-text-Gray-200">
              {project.title}
            </h2>
            <div className="ans-flex ans-gap-4 ans-justify-center">
              {project.github !== "#" ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ans-flex ans-items-center ans-gap-2 ans-bg-Blue-500 dark:ans-bg-Blue-600 ans-text-White ans-px-4 ans-py-2 ans-rounded hover:ans-bg-Blue-600 dark:hover:ans-bg-Blue-500"
                >
                  <FaGithub />
                  GitHub
                </a>
              ) : (
                <span className="ans-bg-Gray-400 dark:ans-bg-Gray-600 ans-text-White ans-px-4 ans-py-2 ans-rounded">
                  In Progress
                </span>
              )}
              {project.liveDemo !== "#" ? (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ans-flex ans-items-center ans-gap-2 ans-bg-Success-500 dark:ans-bg-Success-600 ans-text-White ans-px-4 ans-py-2 ans-rounded hover:ans-bg-Success-600 dark:hover:ans-bg-Success-500"
                >
                  <FaExternalLinkAlt />
                  Live Demo
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
