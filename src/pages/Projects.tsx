import { FaGithub, FaExternalLinkAlt, FaImage } from "react-icons/fa";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
} from "react-icons/si";
// WebP outputs from `npm run gen:images`; the PNG sources stay in the repo but
// are deliberately not imported, so they never reach the bundle.
import SnapgramImage from "../assets/snapgram.webp";
import ExplodingProductionImage from "../assets/exploding-production.webp";
import GuessGame from "../assets/GuessGame.webp";
import { PROJECT_ROUTES } from "../common/constants";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import BackgroundManager from "../common/components/backgrounds/BackgroundManager";

/**
 * `alt` describes what the screenshot actually shows rather than repeating the
 * title, which is already the adjacent heading — a screen reader hearing the
 * name twice learns nothing the second time.
 */
const projects = [
  {
    title: "Portfolio Website",
    description:
      "Personal frontend portfolio with AI chat assistant, automated resume sync, and modern animations.",
    image: "",
    alt: "",
    github: "https://github.com/f20180039/anshuman-singh",
    liveDemo: "https://f20180039.github.io/anshuman-singh/",
    tech: [SiReact, SiTypescript, SiTailwindcss],
  },
  {
    title: "Exploding Production Game",
    description:
      "Codex-assisted browser game with polished gameplay flow, production routing, and frontend-first interaction design.",
    image: ExplodingProductionImage,
    alt: "Screenshot of the Exploding Production browser game showing its gameplay board and score panel",
    github: "",
    liveDemo: "https://exploding-production.onrender.com",
    tech: [SiReact, SiJavascript],
  },
  {
    title: "Multiplayer Game Hub",
    description:
      "Multiplayer browser game platform using real-time game-room flows and WebSocket-style state synchronization.",
    image: "",
    alt: "",
    github: "",
    liveDemo: "https://multiplayer-frontend-x0cb.onrender.com",
    tech: [SiReact, SiJavascript],
  },
  {
    title: "Snapgram",
    description:
      "Full-stack Instagram clone with authentication, posts, likes, comments, and real-time updates.",
    image: SnapgramImage,
    alt: "Snapgram login screen beside a collage of user posts from the feed",
    github: "https://github.com/f20180039/snapgram",
    liveDemo: "https://stalkergram.netlify.app",
    tech: [SiReact, SiTypescript, SiTailwindcss],
  },
  {
    title: "Guess Game",
    description:
      "An interactive number guessing game with score tracking and adaptive difficulty.",
    image: GuessGame,
    alt: "Guess Game interface with a number input, score counter and remaining attempts",
    github: "",
    liveDemo: PROJECT_ROUTES.guessGame,
    isInternal: true,
    tech: [SiJavascript],
  },
  // {
  //   title: "Pig Game",
  //   description:
  //     "A multiplayer dice game supporting 2-6 players with strategic score banking mechanics.",
  //   image: "",
  //   github: "",
  //   liveDemo: PROJECT_ROUTES.pigGame,
  //   isInternal: true,
  //   tech: [SiJavascript],
  // },
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
  const isComingSoon = project.title === "Coming Soon";
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05 }}
      className="ans-flex ans-flex-col ans-gap-medium ans-bg-th-surface ans-rounded-lg ans-shadow-md ans-p-6 ans-w-full sm:ans-w-80 ans-transition-all ans-duration-300 ans-relative ans-overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className="ans-absolute ans-inset-0 ans-bg-gradient-to-br ans-from-th-accent/10 ans-to-transparent ans-pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {project.image ? (
        <div className="ans-relative ans-h-48 ans-w-full ans-overflow-hidden ans-rounded">
          {/* Placeholder holds the slot until the screenshot decodes, so cards
              never reflow as thumbnails stream in on a slow connection. */}
          {!imageLoaded && (
            <div
              aria-hidden="true"
              className="ans-absolute ans-inset-0 ans-animate-pulse ans-rounded ans-bg-th-muted"
            />
          )}
          <motion.img
            src={project.image}
            alt={project.alt}
            width={640}
            height={384}
            className={`ans-relative ans-h-48 ans-w-full ans-object-scale-down ans-transition-opacity ans-duration-300 ${
              imageLoaded ? "ans-opacity-100" : "ans-opacity-0"
            }`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      ) : (
        <div className="ans-flex ans-h-48 ans-w-full ans-items-center ans-justify-center ans-rounded ans-bg-th-muted">
          {isComingSoon ? (
            <span className="ans-text-th-accent ans-animate-pulse ans-font-inter-1">
              Coming Soon
            </span>
          ) : (
            <FaImage
              aria-hidden="true"
              className="ans-text-10 ans-text-th-muted-fg"
            />
          )}
        </div>
      )}
      <h2 className="ans-text-3 ans-font-inter-0 ans-text-th-fg">
        {project.title}
      </h2>
      <p className="ans-text-th-muted-fg ans-text-xs ans-leading-relaxed">
        {project.description}
      </p>

      {/* Tech Stack Icons */}
      {project.tech.length > 0 && (
        <div className="ans-flex ans-gap-3 ans-items-center">
          {project.tech.map((Icon, i) => (
            <motion.div
              key={i}
              className="ans-text-th-accent ans-text-4"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon />
            </motion.div>
          ))}
        </div>
      )}
      <div className="ans-flex ans-gap-4 ans-justify-center ans-mt-auto">
        {!project.isInternal &&
          (project.github && project.github !== "#" ? (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ans-flex ans-items-center ans-gap-2 ans-bg-th-accent ans-text-White ans-px-4 ans-py-2 ans-rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub />
              GitHub
            </motion.a>
          ) : isComingSoon ? (
            <span className="ans-bg-th-muted ans-text-th-muted-fg ans-px-4 ans-py-2 ans-rounded-lg ans-cursor-not-allowed">
              In Progress
            </span>
          ) : null)}
        {project.liveDemo !== "#" && (
          <motion.button
            onClick={onLiveDemo}
            className="ans-flex ans-items-center ans-gap-2 ans-bg-th-success ans-text-White ans-px-4 ans-py-2 ans-rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaExternalLinkAlt />
            Live Demo
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

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
    <BackgroundManager showGrid showGradient gradientIntensity="medium">
      <section
        id="projects"
        className="ans-flex ans-flex-col ans-gap-xlarge ans-py-xlarge ans-text-center ans-text-th-fg"
      >
        <motion.p
          className="ans-text-3 ans-font-inter-2 ans-text-th-secondary-fg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Browse My Recent Projects
        </motion.p>
        <div className="ans-flex ans-flex-wrap ans-justify-center ans-gap-4 sm:ans-gap-8 ans-px-4">
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
    </BackgroundManager>
  );
}
