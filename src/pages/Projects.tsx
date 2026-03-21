import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import SnapgramImage from "../assets/snapgram.png";
import GuessGame from "../assets/GuessGame.png";
import { PROJECT_ROUTES } from "../common/constants";
import { useNavigate } from "react-router-dom";
import { useInView } from "../common/utils";

const projects = [
  {
    title: "Snapgram",
    description: "A full-featured Instagram clone with social features, image sharing, and real-time interactions.",
    image: SnapgramImage,
    github: "https://github.com/f20180039/snapgram",
    liveDemo: "https://stalkergram.netlify.app",
  },
  {
    title: "Guess Game",
    description: "An interactive number guessing game with score tracking and adaptive difficulty.",
    image: GuessGame,
    github: "",
    liveDemo: PROJECT_ROUTES.guessGame,
    isInternal: true,
  },
  {
    title: "Pig Game",
    description: "A multiplayer dice game supporting 2-6 players with strategic score banking mechanics.",
    image: "",
    github: "",
    liveDemo: PROJECT_ROUTES.pigGame,
    isInternal: true,
  },
  {
    title: "Coming Soon",
    description: "Next project is in the works. Stay tuned!",
    image: "",
    github: "#",
    liveDemo: "#",
  },
];

const ProjectCard = ({
  project,
  index,
  onLiveDemo,
}: {
  project: (typeof projects)[0];
  index: number;
  onLiveDemo: () => void;
}) => {
  const { ref, isInView } = useInView();
  const isComingSoon = project.title === "Coming Soon";

  return (
    <div
      ref={ref}
      className={`ans-flex ans-flex-col ans-gap-medium ans-bg-th-surface ans-rounded-lg ans-shadow-md ans-p-6 ans-w-80 hover:ans-shadow-xl hover:ans-scale-[1.03] ans-transition-all ans-duration-300 ans-opacity-0 stagger-${Math.min(index + 1, 5)} ${
        isInView ? "ans-animate-fade-in-up" : ""
      }`}
    >
      {project.image ? (
        <div className="ans-overflow-hidden ans-rounded">
          <img
            src={project.image}
            alt={project.title}
            className="ans-w-full ans-h-48 ans-object-scale-down hover:ans-scale-110 ans-transition-transform ans-duration-500"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="ans-h-48 ans-w-full ans-bg-th-muted ans-flex ans-items-center ans-justify-center ans-rounded">
          {isComingSoon ? (
            <span className="ans-text-th-accent ans-animate-pulse ans-font-inter-1">
              Coming Soon
            </span>
          ) : (
            <span className="ans-text-th-muted-fg">No Image</span>
          )}
        </div>
      )}
      <h2 className="ans-text-3 ans-font-inter-0 ans-text-th-fg">
        {project.title}
      </h2>
      <p className="ans-text-th-muted-fg ans-text-xs ans-leading-relaxed">
        {project.description}
      </p>
      <div className="ans-flex ans-gap-4 ans-justify-center ans-mt-auto">
        {!project.isInternal &&
          (project.github && project.github !== "#" ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ans-flex ans-items-center ans-gap-2 ans-bg-th-accent ans-text-White ans-px-4 ans-py-2 ans-rounded-lg hover:ans-bg-th-accent-hover hover:ans-scale-105 active:ans-scale-95 ans-transition-all ans-duration-200"
            >
              <FaGithub />
              GitHub
            </a>
          ) : isComingSoon ? (
            <span className="ans-bg-th-muted ans-text-th-muted-fg ans-px-4 ans-py-2 ans-rounded-lg ans-cursor-not-allowed">
              In Progress
            </span>
          ) : null)}
        {project.liveDemo !== "#" && (
          <button
            onClick={onLiveDemo}
            className="ans-flex ans-items-center ans-gap-2 ans-bg-th-success ans-text-White ans-px-4 ans-py-2 ans-rounded-lg hover:ans-opacity-90 hover:ans-scale-105 active:ans-scale-95 ans-transition-all ans-duration-200"
          >
            <FaExternalLinkAlt />
            Live Demo
          </button>
        )}
      </div>
    </div>
  );
};

export default function Projects() {
  const navigate = useNavigate();
  const { ref: titleRef, isInView: titleVisible } = useInView();

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
      className="ans-flex ans-flex-col ans-gap-xlarge ans-py-xlarge ans-text-center ans-bg-th-bg ans-text-th-fg"
    >
      <p
        ref={titleRef}
        className={`ans-text-3 ans-font-inter-2 ans-text-th-secondary-fg ans-opacity-0 ${
          titleVisible ? "ans-animate-fade-in-up" : ""
        }`}
      >
        Browse My Recent Projects
      </p>
      <div className="ans-flex ans-flex-wrap ans-justify-center ans-gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            onLiveDemo={() => handleLiveDemoClick(project)}
          />
        ))}
      </div>
    </section>
  );
}
