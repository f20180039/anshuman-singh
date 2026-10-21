import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaImage, FaLock } from "react-icons/fa";
import { caseStudyPath, type Project } from "../../data/projects";
import StatusBadge from "./StatusBadge";

const BUTTON_CLASSES =
  "ans-flex ans-items-center ans-gap-2 ans-px-4 ans-py-2 ans-rounded-lg ans-text-White";

/**
 * Image slot. Without a screenshot it shows a labelled placeholder (not an
 * `<img>`), so the test and assistive tech can tell "no image yet" from a
 * broken one.
 */
function CardImage({ image }: { image: Project["image"] }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!image) {
    return (
      <div
        role="img"
        aria-label="No screenshot available"
        className="ans-flex ans-h-48 ans-w-full ans-items-center ans-justify-center ans-rounded ans-bg-th-muted"
      >
        <FaImage
          aria-hidden="true"
          className="ans-text-10 ans-text-th-muted-fg"
        />
      </div>
    );
  }

  return (
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
        src={image.src}
        alt={image.alt}
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
  );
}

/** Title, description and tech icons — the part a case-study card turns into one link. */
function CardBody({ project }: { project: Project }) {
  return (
    <>
      <CardImage image={project.image} />
      <h3 className="ans-text-3 ans-font-inter-0 ans-text-th-fg">
        {project.title}
      </h3>
      <p className="ans-text-th-muted-fg ans-text-xs ans-leading-relaxed">
        {project.description}
      </p>
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
    </>
  );
}

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
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

  const hasCaseStudy = project.caseStudy !== undefined;

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

      {/* The whole body is one link for case studies; secondary links below
          stay outside it so no interactive element nests inside another. */}
      {hasCaseStudy ? (
        <Link
          to={caseStudyPath(project.slug)}
          className="ans-flex ans-flex-col ans-gap-medium ans-rounded focus-visible:ans-outline focus-visible:ans-outline-2 focus-visible:ans-outline-offset-4 focus-visible:ans-outline-th-accent"
        >
          <CardBody project={project} />
        </Link>
      ) : (
        <CardBody project={project} />
      )}

      {(project.status || project.repo.visibility === "private") && (
        <div className="ans-flex ans-flex-wrap ans-items-center ans-justify-center ans-gap-2">
          {project.status && <StatusBadge status={project.status} />}
          {project.repo.visibility === "private" && (
            <span className="ans-inline-flex ans-items-center ans-gap-1 ans-rounded-full ans-bg-th-muted ans-px-3 ans-py-1 ans-text-xs ans-font-inter-1 ans-text-th-muted-fg">
              <FaLock aria-hidden="true" />
              Private code
            </span>
          )}
        </div>
      )}

      {(project.repo.visibility === "public" ||
        project.links.length > 0 ||
        project.internalPath) && (
        <div className="ans-flex ans-flex-wrap ans-gap-4 ans-justify-center ans-mt-auto">
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
      )}
    </motion.div>
  );
}
