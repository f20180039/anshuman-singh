import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaDownload, FaEnvelope } from "react-icons/fa";
import { C_RESUME_SINGLE_COL_URL, EAPP_ROUTES } from "../constants";
import { isAnalyticsConfigured, trackEvent } from "../analytics/analytics";
import { getConsent, subscribeToConsent } from "../analytics/consent";

/** Roughly one viewport of scrolling — past the hero and its own CTA. */
const REVEAL_AFTER_PX = 320;

/**
 * Pages where a "get in touch" bar would be noise: the visitor is already
 * looking at the contact form, has just submitted it, or is reading legal copy.
 */
const HIDDEN_ON: string[] = [
  EAPP_ROUTES.contact,
  EAPP_ROUTES.thankYou,
  EAPP_ROUTES.privacy,
  EAPP_ROUTES.terms,
  EAPP_ROUTES.resumePreview,
];

/**
 * Mobile-only action bar pinned to the bottom of the viewport.
 *
 * Deliberately does not appear until the hero's own CTA has scrolled away, so
 * the two never compete, and it sits below the cookie banner in the stack so a
 * pending consent decision is never covered.
 */
export default function StickyMobileCta() {
  const { pathname } = useLocation();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  // Both bars dock to the bottom of a phone screen. Holding this one back until
  // the cookie question is answered avoids stacking two overlays on top of each
  // other and keeps a required decision unobstructed.
  const [consentPending, setConsentPending] = useState(
    () => isAnalyticsConfigured() && getConsent() === null
  );

  useEffect(() => {
    const onScroll = () =>
      setScrolledPastHero(window.scrollY > REVEAL_AFTER_PX);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const unsubscribe = subscribeToConsent(() => setConsentPending(false));

    return () => {
      window.removeEventListener("scroll", onScroll);
      unsubscribe();
    };
  }, []);

  const visible =
    scrolledPastHero && !consentPending && !HIDDEN_ON.includes(pathname);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="ans-fixed ans-inset-x-0 ans-bottom-0 ans-z-[40] ans-border-t ans-border-th-accent/20 ans-bg-th-surface/95 ans-px-3 ans-pb-[calc(env(safe-area-inset-bottom)+0.6rem)] ans-pt-2.5 ans-shadow-[0_-8px_24px_rgba(0,0,0,0.28)] ans-backdrop-blur-md sm:ans-hidden"
        >
          {/* Right padding clears the floating chat button. */}
          <div className="ans-flex ans-items-center ans-gap-2.5 ans-pr-[4.5rem]">
            <Link
              to={EAPP_ROUTES.contact}
              onClick={() => trackEvent("sticky_cta_click", { action: "contact" })}
              className="ans-flex ans-min-h-[48px] ans-flex-1 ans-items-center ans-justify-center ans-gap-2 ans-rounded-lg ans-bg-th-accent ans-px-4 ans-text-2 ans-font-inter-2 ans-text-White ans-shadow-md"
            >
              <FaEnvelope aria-hidden="true" />
              Get in touch
            </Link>
            <a
              href={C_RESUME_SINGLE_COL_URL}
              download
              onClick={() => trackEvent("sticky_cta_click", { action: "resume" })}
              className="ans-flex ans-min-h-[48px] ans-items-center ans-justify-center ans-gap-2 ans-rounded-lg ans-border ans-border-th-accent/45 ans-px-4 ans-text-2 ans-font-inter-1 ans-text-th-accent"
              aria-label="Download my resume as a PDF"
            >
              <FaDownload aria-hidden="true" />
              Resume
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
