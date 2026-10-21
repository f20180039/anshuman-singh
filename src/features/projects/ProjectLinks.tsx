import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import type { Project } from "../../data/projects";

const BUTTON_CLASSES =
  "ans-flex ans-items-center ans-gap-2 ans-px-4 ans-py-2 ans-rounded-lg ans-text-White";

/**
 * The outbound row shared by cards and case-study pages: GitHub (public repos
 * only), every external link in a new tab with a safe rel, and the in-app
 * demo for projects that live inside this site. Renders nothing when there is
 * nothing to link, so callers need no guard.
 */
export default function ProjectLinks({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const hasLinks =
    project.repo.visibility === "public" ||
    project.links.length > 0 ||
    project.internalPath !== undefined;
  if (!hasLinks) return null;

  return (
    <div
      className={`ans-flex ans-flex-wrap ans-gap-4 ans-justify-center ${className}`}
    >
      {project.repo.visibility === "public" && (
        <motion.a
          href={project.repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${BUTTON_CLASSES} ans-bg-th-accent`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub aria-hidden="true" />
          GitHub
        </motion.a>
      )}
      {project.links.map((link) => (
        <motion.a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${BUTTON_CLASSES} ans-bg-th-success`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaExternalLinkAlt aria-hidden="true" />
          {link.label}
        </motion.a>
      ))}
      {project.internalPath && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to={project.internalPath}
            className={`${BUTTON_CLASSES} ans-bg-th-success`}
          >
            <FaExternalLinkAlt aria-hidden="true" />
            Live demo
          </Link>
        </motion.div>
      )}
    </div>
  );
}
