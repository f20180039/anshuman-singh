import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaCheck, FaGithub, FaLinkedin } from "react-icons/fa";
import {
  C_GITHUB_URL,
  C_LINKEDIN_URL,
  C_MY_MAIL,
  EAPP_ROUTES,
} from "../common/constants";
import BackgroundManager from "../common/components/backgrounds/BackgroundManager";
import { trackEvent } from "../common/analytics/analytics";

/**
 * Post-submission page for the contact form.
 *
 * Reached only via the form's redirect, which passes `?sent=1`. Landing here
 * directly (a shared link, a bookmark, a refresh weeks later) would otherwise
 * claim a message was delivered when none was, so those visits are bounced
 * back to the contact form.
 */
const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const submitted = searchParams.get("sent") === "1";

  useEffect(() => {
    if (!submitted) {
      navigate(EAPP_ROUTES.contact, { replace: true });
      return;
    }
    trackEvent("contact_form_success");
  }, [submitted, navigate]);

  if (!submitted) return null;

  return (
    <BackgroundManager showGrid showGradient gradientIntensity="medium">
      <section className="ans-mx-auto ans-flex ans-min-h-[70vh] ans-w-full ans-max-w-2xl ans-flex-col ans-items-center ans-justify-center ans-px-4 ans-py-12 ans-text-center ans-text-th-fg">
        <motion.div
          className="ans-grid ans-h-[5rem] ans-w-[5rem] ans-place-items-center ans-rounded-full ans-bg-th-success/15 ans-text-6 ans-text-th-success"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <FaCheck aria-hidden="true" />
        </motion.div>

        <motion.h1
          className="ans-mt-6 ans-text-5 ans-font-inter-3 ans-text-th-accent retro-glow sm:ans-text-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.4 }}
        >
          Message sent
        </motion.h1>

        <motion.p
          className="ans-mt-4 ans-text-3 ans-leading-relaxed ans-text-th-secondary-fg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Thanks for reaching out — it landed in my inbox. I usually reply within
          one business day. If it's urgent, email me directly at{" "}
          <a
            href={`mailto:${C_MY_MAIL}`}
            className="ans-text-th-accent ans-underline-offset-4 hover:ans-underline ans-break-all"
          >
            {C_MY_MAIL}
          </a>
          .
        </motion.p>

        <motion.div
          className="ans-mt-8 ans-flex ans-w-full ans-flex-col ans-gap-3 sm:ans-w-auto sm:ans-flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.4 }}
        >
          <Link
            to={EAPP_ROUTES.projects}
            className="ans-flex ans-min-h-[44px] ans-items-center ans-justify-center ans-rounded-lg ans-bg-th-accent ans-px-6 ans-py-3 ans-text-3 ans-text-White ans-shadow-md ans-transition-transform hover:ans-scale-105"
          >
            Browse my projects
          </Link>
          <Link
            to={EAPP_ROUTES.resumePreview}
            className="ans-flex ans-min-h-[44px] ans-items-center ans-justify-center ans-rounded-lg ans-border ans-border-th-accent/40 ans-px-6 ans-py-3 ans-text-3 ans-text-th-accent ans-transition-colors hover:ans-bg-th-accent/10"
          >
            View my resume
          </Link>
        </motion.div>

        <motion.div
          className="ans-mt-10 ans-flex ans-items-center ans-gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.36, duration: 0.4 }}
        >
          <a
            href={C_LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with me on LinkedIn"
            className="ans-text-5 ans-text-th-muted-fg ans-transition-colors hover:ans-text-th-accent"
          >
            <FaLinkedin />
          </a>
          <a
            href={C_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="See my code on GitHub"
            className="ans-text-5 ans-text-th-muted-fg ans-transition-colors hover:ans-text-th-fg"
          >
            <FaGithub />
          </a>
        </motion.div>
      </section>
    </BackgroundManager>
  );
};

export default ThankYou;
