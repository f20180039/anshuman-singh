import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { trackEvent } from "../../common/analytics/analytics";
import { EAPP_ROUTES } from "../../common/constants";
import {
  FEATURED_SLUGS,
  caseStudyPath,
  getProjectBySlug,
  type Project,
} from "../../data/projects";
import ImagePlaceholder from "./ImagePlaceholder";
import StatusBadge from "./StatusBadge";

// Resolved once at module load: the featured list is static data, and a slug
// without a case study would be a data bug, not a runtime state to handle.
const FEATURED: Project[] = FEATURED_SLUGS.map(getProjectBySlug).filter(
  (project): project is Project => project !== undefined,
);

/** Compact card: image or placeholder, title, one-liner, status badge. */
function FeaturedCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.08, ease: "easeOut" }}
      className="ans-flex"
    >
      <Link
        to={caseStudyPath(project.slug)}
        onClick={() =>
          trackEvent("featured_project_click", { slug: project.slug })
        }
        className="ans-flex ans-w-full ans-flex-col ans-gap-3 ans-rounded-lg ans-bg-th-surface ans-p-4 ans-text-left ans-shadow-md ans-transition-transform ans-duration-300 hover:-ans-translate-y-1 hover:ans-shadow-lg focus-visible:ans-outline focus-visible:ans-outline-2 focus-visible:ans-outline-offset-4 focus-visible:ans-outline-th-accent"
      >
        {project.image ? (
          // Decorative inside the link (alt=""): the title and tagline beside
          // it name the link, so the link's accessible name leads with the
          // title instead of the image description. The case-study page
          // carries the descriptive alt. `object-contain` on the card's own
          // surface colour shows the whole graphic — the before/after
          // captions and tile edges would otherwise be cropped to the slot.
          <img
            src={project.image.src}
            alt=""
            width={project.image.width}
            height={project.image.height}
            loading="lazy"
            decoding="async"
            className="ans-h-36 ans-w-full ans-rounded ans-bg-th-surface ans-object-contain"
          />
        ) : (
          <ImagePlaceholder className="ans-h-36" />
        )}
        <div className="ans-flex ans-flex-1 ans-flex-col ans-gap-2">
          <h3 className="ans-text-3 ans-font-inter-2 ans-text-th-fg">
            {project.title}
          </h3>
          <p className="ans-text-1 ans-leading-relaxed ans-text-th-muted-fg">
            {project.tagline}
          </p>
          {project.status && (
            <div className="ans-mt-auto ans-pt-1">
              <StatusBadge status={project.status} />
            </div>
          )}
        </div>
      </Link>
    </motion.li>
  );
}

/**
 * Home's "Featured work" section: the three flagship case studies from
 * `FEATURED_SLUGS`, in that order, plus a link to the full grid.
 */
export default function FeaturedWork() {
  return (
    <section
      aria-labelledby="featured-work-heading"
      className="ans-mx-auto ans-flex ans-w-full ans-max-w-6xl ans-flex-col ans-gap-5 ans-px-4 ans-pb-10 ans-pt-4 ans-text-th-fg sm:ans-px-6 sm:ans-pb-16"
    >
      <div className="ans-flex ans-flex-wrap ans-items-baseline ans-justify-between ans-gap-x-6 ans-gap-y-2">
        <h2
          id="featured-work-heading"
          className="ans-text-4 ans-font-inter-2 ans-text-th-accent sm:ans-text-5"
        >
          Featured work
        </h2>
        <Link
          to={EAPP_ROUTES.projects}
          className="ans-inline-flex ans-items-center ans-gap-2 ans-text-2 ans-text-th-secondary-fg ans-underline-offset-4 hover:ans-text-th-accent hover:ans-underline"
        >
          See all projects
          <FaArrowRight aria-hidden="true" />
        </Link>
      </div>
      <ul className="ans-grid ans-list-none ans-grid-cols-1 ans-gap-4 ans-p-0 sm:ans-grid-cols-2 lg:ans-grid-cols-3">
        {FEATURED.map((project, index) => (
          <FeaturedCard key={project.slug} project={project} index={index} />
        ))}
      </ul>
    </section>
  );
}
