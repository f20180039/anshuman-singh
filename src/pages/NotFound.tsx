import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { EAPP_ROUTES, NAV_LINKS } from "../common/constants";
import BackgroundManager from "../common/components/backgrounds/BackgroundManager";

const SUGGESTIONS = [
  {
    label: "Projects",
    path: EAPP_ROUTES.projects,
    blurb: "Live demos and source for what I've built",
  },
  {
    label: "Experience",
    path: EAPP_ROUTES.experience,
    blurb: "Where I've worked and what I shipped",
  },
  {
    label: "Resume",
    path: EAPP_ROUTES.resumePreview,
    blurb: "Read it in the browser or download the PDF",
  },
  {
    label: "Contact",
    path: EAPP_ROUTES.contact,
    blurb: "Send me a message directly",
  },
];

/**
 * Catch-all route. Reached either by an in-app link to a dead path or via the
 * public/404.html GitHub Pages shim, which bounces unknown deep links back
 * through index.html so the router can render this instead of a bare host page.
 */
const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <BackgroundManager showGrid showGradient gradientIntensity="medium">
      <section className="ans-mx-auto ans-flex ans-min-h-[70vh] ans-w-full ans-max-w-3xl ans-flex-col ans-items-center ans-justify-center ans-px-4 ans-py-12 ans-text-center ans-text-th-fg">
        <motion.p
          className="ans-font-mario ans-text-7 ans-text-th-accent retro-glow sm:ans-text-9"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          404
        </motion.p>

        <motion.h1
          className="ans-mt-6 ans-text-5 ans-font-inter-3 ans-text-th-fg sm:ans-text-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          This page took a wrong turn
        </motion.h1>

        <motion.p
          className="ans-mt-4 ans-max-w-xl ans-text-3 ans-leading-relaxed ans-text-th-secondary-fg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
        >
          There's nothing at{" "}
          <code className="ans-rounded ans-bg-th-surface-alt ans-px-2 ans-py-1 ans-text-2 ans-text-th-accent ans-break-all">
            {pathname}
          </code>
          . It may have moved, or the link may be mistyped.
        </motion.p>

        <motion.div
          className="ans-mt-8 ans-flex ans-w-full ans-flex-col ans-gap-3 sm:ans-w-auto sm:ans-flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.4 }}
        >
          <Link
            to={EAPP_ROUTES.home}
            className="ans-flex ans-min-h-[44px] ans-items-center ans-justify-center ans-rounded-lg ans-bg-th-accent ans-px-6 ans-py-3 ans-text-3 ans-text-White ans-shadow-md ans-transition-transform hover:ans-scale-105"
          >
            Back to homepage
          </Link>
          <Link
            to={EAPP_ROUTES.projects}
            className="ans-flex ans-min-h-[44px] ans-items-center ans-justify-center ans-gap-2 ans-rounded-lg ans-border ans-border-th-accent/40 ans-px-6 ans-py-3 ans-text-3 ans-text-th-accent ans-transition-colors hover:ans-bg-th-accent/10"
          >
            See my work <FaArrowRight aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.div
          className="ans-mt-12 ans-w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.34, duration: 0.4 }}
        >
          <p className="ans-mb-4 ans-text-2 ans-uppercase ans-tracking-1 ans-text-th-muted-fg">
            Or try one of these
          </p>
          <ul className="ans-grid ans-grid-cols-1 ans-gap-3 sm:ans-grid-cols-2">
            {SUGGESTIONS.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="ans-flex ans-h-full ans-flex-col ans-items-start ans-gap-1 ans-rounded-lg ans-bg-th-surface ans-p-4 ans-text-left ans-shadow-sm ans-transition-all hover:ans-shadow-md hover:ans-ring-1 hover:ans-ring-th-accent/40"
                >
                  <span className="ans-text-3 ans-font-inter-1 ans-text-th-accent">
                    {item.label}
                  </span>
                  <span className="ans-text-th-muted-fg">{item.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <nav aria-label="All pages" className="ans-mt-10">
          <ul className="ans-flex ans-flex-wrap ans-justify-center ans-gap-x-5 ans-gap-y-2">
            {NAV_LINKS.map(({ name, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="ans-text-th-muted-fg ans-underline-offset-4 hover:ans-text-th-accent hover:ans-underline"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </BackgroundManager>
  );
};

export default NotFound;
