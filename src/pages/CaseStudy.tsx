import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import BackgroundManager from "../common/components/backgrounds/BackgroundManager";
import { EAPP_ROUTES } from "../common/constants";
import {
  getProjectBySlug,
  type Project,
  type ProjectImage,
} from "../data/projects";
import PrivateCodeBadge from "../features/projects/PrivateCodeBadge";
import ProjectLinks from "../features/projects/ProjectLinks";
import StatusBadge from "../features/projects/StatusBadge";
import NotFound from "./NotFound";

const BACK_LINK_CLASSES =
  "ans-inline-flex ans-items-center ans-gap-2 ans-rounded ans-text-2 ans-text-th-accent ans-underline-offset-4 hover:ans-underline focus-visible:ans-outline focus-visible:ans-outline-2 focus-visible:ans-outline-offset-4 focus-visible:ans-outline-th-accent";

function BackToProjects() {
  return (
    <Link to={EAPP_ROUTES.projects} className={BACK_LINK_CLASSES}>
      <FaArrowLeft aria-hidden="true" />
      All projects
    </Link>
  );
}

/** One titled block; the caller decides whether there is anything to show. */
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="ans-flex ans-flex-col ans-gap-3">
      <h2 className="ans-text-4 ans-font-inter-2 ans-text-th-accent">
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="ans-flex ans-list-disc ans-flex-col ans-gap-2 ans-pl-5 ans-text-2 ans-leading-relaxed ans-text-th-secondary-fg marker:ans-text-th-accent">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/**
 * Never wider than the file itself: the card images are encoded at 640 px
 * (the store tile at 440), and stretching them across the 768 px column only
 * blurs them. `width`/`height` give the browser the aspect ratio up front, so
 * the box is reserved before the bytes arrive.
 */
function Hero({ image }: { image: ProjectImage }) {
  return (
    <div
      className="ans-mx-auto ans-w-full ans-overflow-hidden ans-rounded-lg ans-bg-th-surface ans-shadow-md"
      style={{ maxWidth: image.width }}
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="ans-block ans-h-auto ans-w-full"
        decoding="async"
      />
    </div>
  );
}

/**
 * A horizontal strip at a fixed height; each image keeps its own aspect ratio
 * (`w-auto` + intrinsic `width`/`height`), so a portrait phone screenshot sits
 * tall and narrow beside a landscape console capture instead of being cropped
 * or squeezed into a common box.
 */
function Gallery({ images }: { images: ProjectImage[] }) {
  return (
    <ul
      aria-label="Screenshots"
      className="ans-flex ans-list-none ans-gap-4 ans-overflow-x-auto ans-pb-2"
    >
      {images.map((image) => (
        <li key={image.src} className="ans-shrink-0">
          <figure className="ans-m-0 ans-overflow-hidden ans-rounded-lg ans-bg-th-surface ans-shadow-md">
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="ans-block ans-h-56 ans-w-auto ans-max-w-none sm:ans-h-72"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </li>
      ))}
    </ul>
  );
}

/**
 * A credit of the form "<text> (<https://source>)" renders its source as a
 * link that may break anywhere: the Commons URL is ~80 unbroken characters,
 * and with `overflow-x: hidden` on the body an unwrappable tail would simply
 * be clipped on a phone, hiding the source the licence requires us to show.
 * A credit without a trailing URL renders as plain text.
 */
function ArtworkCredit({ credit }: { credit: string }) {
  const match = /^(.*)\((https?:\/\/\S+)\)\s*$/.exec(credit);
  if (!match) return <span>{credit}</span>;
  const [, text, url] = match;
  return (
    <span>
      {text}(
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="ans-break-all ans-underline hover:ans-text-th-fg"
      >
        {url}
      </a>
      )
    </span>
  );
}

/**
 * The page body, independent of routing so it can be rendered for any
 * project. Sections whose lists are empty are omitted rather than rendered as
 * empty headings; `image`, `gallery`, `credit` and `artworkCredit` are all
 * optional and simply absent until the data supplies them.
 */
export function CaseStudyArticle({ project }: { project: Project }) {
  const study = project.caseStudy;
  if (!study) return null;

  return (
    <article className="ans-mx-auto ans-flex ans-w-full ans-max-w-3xl ans-flex-col ans-gap-8 ans-px-4 ans-py-10 ans-text-th-fg sm:ans-px-6 sm:ans-py-14">
      <BackToProjects />

      <motion.div
        className="ans-flex ans-flex-col ans-gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="ans-text-5 ans-font-inter-3 ans-text-th-accent retro-glow sm:ans-text-6">
          {project.title}
        </h1>
        <p className="ans-text-3 ans-leading-relaxed ans-text-th-secondary-fg">
          {project.tagline}
        </p>
        {(project.status || project.repo.visibility === "private") && (
          <div className="ans-flex ans-flex-wrap ans-items-center ans-gap-2">
            {project.status && <StatusBadge status={project.status} />}
            {project.repo.visibility === "private" && <PrivateCodeBadge />}
          </div>
        )}
      </motion.div>

      {project.image && <Hero image={project.image} />}
      {study.gallery.length > 0 && <Gallery images={study.gallery} />}

      <Section title="The problem">
        <p className="ans-text-2 ans-leading-relaxed ans-text-th-secondary-fg">
          {study.problem}
        </p>
      </Section>

      {study.built.length > 0 && (
        <Section title="What I built">
          <BulletList items={study.built} />
        </Section>
      )}

      {(study.stack.length > 0 || study.decisions.length > 0) && (
        <Section title="How it's built">
          {study.stack.length > 0 && (
            <ul
              aria-label="Stack"
              className="ans-flex ans-list-none ans-flex-wrap ans-gap-2"
            >
              {study.stack.map((item) => (
                <li
                  key={item}
                  className="ans-rounded-full ans-bg-th-accent-subtle ans-px-3 ans-py-1 ans-text-xs ans-font-inter-1 ans-text-th-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
          {study.decisions.length > 0 && <BulletList items={study.decisions} />}
        </Section>
      )}

      {study.numbers.length > 0 && (
        <Section title="By the numbers">
          <BulletList items={study.numbers} />
        </Section>
      )}

      <ProjectLinks project={project} className="ans-justify-start" />

      {(study.credit || study.artworkCredit) && (
        <div className="ans-flex ans-flex-col ans-gap-1 ans-text-1 ans-text-th-muted-fg">
          {study.credit && <p>{study.credit}</p>}
          {study.artworkCredit && (
            <p>
              Artwork: <ArtworkCredit credit={study.artworkCredit} />
            </p>
          )}
        </div>
      )}

      <BackToProjects />
    </article>
  );
}

/**
 * `/projects/:slug`. A slug with no case study (older projects included)
 * renders the 404 page in place, so the URL and the page can never disagree.
 */
export default function CaseStudy() {
  const { slug = "" } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <NotFound />;

  return (
    <BackgroundManager showGrid showGradient gradientIntensity="low">
      <CaseStudyArticle project={project} />
    </BackgroundManager>
  );
}
