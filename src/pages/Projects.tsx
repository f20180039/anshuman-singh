import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import SnapgramImage from "../assets/snapgram.png";
import GuessGame from "../assets/GuessGame.png";
import { PROJECT_ROUTES } from "../common/constants";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    title: "Snapgram (Instagram Clone)",
    image: SnapgramImage,
    github: "https://github.com/f20180039/snapgram",
    liveDemo: "https://stalkergram.netlify.app",
  },
  {
    title: "Guess Game",
    image: GuessGame,
    github: "",
    liveDemo: PROJECT_ROUTES.guessGame,
    isInternal: true,
  },
  {
    title: "Pig Game",
    image: "",
    github: "",
    liveDemo: PROJECT_ROUTES.pigGame,
    isInternal: true,
  },
  {
    title: "In Progress",
    image: "",
    github: "#",
    liveDemo: "#",
  },
];

export default function Projects() {
  const navigate = useNavigate();

  const handleLiveDemoClick = (project: {
    liveDemo: string;
    isInternal?: boolean;
  }) => {
    if (project.isInternal) {
      navigate(project.liveDemo);
    } else {
      window.open(project.liveDemo, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      id="projects"
      className="ans-flex ans-flex-col ans-gap-xlarge ans-py-xlarge ans-text-center ans-bg-White dark:ans-bg-Gray-900 ans-text-Gray-900 dark:ans-text-White"
    >
      <p className="ans-text-lg ans-font-medium ans-text-Gray-700 dark:ans-text-Gray-300">
        Browse My Recent Projects
      </p>
      <div className="ans-flex ans-flex-wrap ans-justify-center ans-gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="ans-flex ans-flex-col ans-gap-medium ans-bg-Gray-100 dark:ans-bg-Gray-800 ans-rounded-lg ans-shadow-md ans-p-6 ans-w-80"
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="ans-rounded ans-w-full ans-h-48 ans-object-scale-down"
                loading="lazy"
              />
            ) : (
              <div className="ans-h-48 ans-w-full ans-bg-Gray-300 dark:ans-bg-Gray-700 ans-flex ans-items-center ans-justify-center ans-rounded">
                <span className="ans-text-Gray-600 dark:ans-text-Gray-400">
                  No Image
                </span>
              </div>
            )}
            <h2 className="ans-text-xl ans-font-semibold ans-text-Gray-900 dark:ans-text-Gray-200">
              {project.title}
            </h2>
            <div className="ans-flex ans-gap-4 ans-justify-center">
              {!project.isInternal &&
                (project.github ? (
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
                ))}
              {project.liveDemo !== "#" && (
                <button
                  onClick={() => handleLiveDemoClick(project)}
                  className="ans-flex ans-items-center ans-gap-2 ans-bg-Success-500 dark:ans-bg-Success-600 ans-text-White ans-px-4 ans-py-2 ans-rounded hover:ans-bg-Success-600 dark:hover:ans-bg-Success-500"
                >
                  <FaExternalLinkAlt />
                  Live Demo
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
