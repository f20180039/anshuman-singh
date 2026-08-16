import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCookieBite } from "react-icons/fa";
import { EAPP_ROUTES } from "../constants";
import { isAnalyticsConfigured } from "../analytics/analytics";
import {
  ConsentStatus,
  OPEN_PREFERENCES_EVENT,
  getConsent,
  setConsent,
} from "../analytics/consent";

/**
 * Consent banner for analytics cookies.
 *
 * Only rendered when there is actually something to consent to — with no GA
 * measurement ID configured, nothing loads and no cookies are set, so a banner
 * would be asking permission for something that never happens.
 *
 * Accept and Decline are given equal visual weight on purpose: a decline button
 * styled as an afterthought is the pattern regulators object to.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isAnalyticsConfigured()) return;

    // Let the page paint before sliding the banner in — it should not compete
    // with the hero for the first impression.
    const timer = window.setTimeout(() => {
      if (getConsent() === null) setVisible(true);
    }, 900);

    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, reopen);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(OPEN_PREFERENCES_EVENT, reopen);
    };
  }, []);

  const decide = useCallback((status: ConsentStatus) => {
    setConsent(status);
    setVisible(false);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-body"
          // Transform only, no opacity fade: a consent prompt must never be
          // left half-visible if the opacity animation is interrupted, and
          // sliding a bottom sheet up reads the same without one.
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="ans-fixed ans-inset-x-0 ans-bottom-0 ans-z-[60] ans-px-3 ans-pb-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:ans-px-4 sm:ans-pb-4"
        >
          <div className="ans-mx-auto ans-flex ans-w-full ans-max-w-3xl ans-flex-col ans-gap-4 ans-rounded-xl ans-border ans-border-th-accent/25 ans-bg-th-surface/95 ans-p-4 ans-shadow-2xl ans-backdrop-blur-md sm:ans-flex-row sm:ans-items-center sm:ans-p-5">
            <div className="ans-flex ans-flex-1 ans-items-start ans-gap-3">
              <FaCookieBite
                aria-hidden="true"
                className="ans-mt-1 ans-shrink-0 ans-text-4 ans-text-th-accent"
              />
              <div>
                <p
                  id="cookie-banner-title"
                  className="ans-text-2 ans-font-inter-2 ans-text-th-fg"
                >
                  Analytics cookies?
                </p>
                <p
                  id="cookie-banner-body"
                  className="ans-mt-1 ans-text-1 ans-leading-relaxed ans-text-th-muted-fg"
                >
                  I&apos;d like to use Google Analytics to see which pages are
                  worth keeping. Nothing loads until you say yes, and none of it
                  is used for advertising. Details in the{" "}
                  <Link
                    to={EAPP_ROUTES.privacy}
                    className="ans-text-th-accent ans-underline ans-underline-offset-2"
                  >
                    privacy policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="ans-flex ans-shrink-0 ans-gap-3">
              <button
                type="button"
                onClick={() => decide("denied")}
                className="ans-min-h-[44px] ans-flex-1 ans-rounded-lg ans-border ans-border-th-border ans-px-5 ans-text-2 ans-font-inter-1 ans-text-th-secondary-fg ans-transition-colors hover:ans-bg-th-muted sm:ans-flex-none"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => decide("granted")}
                className="ans-min-h-[44px] ans-flex-1 ans-rounded-lg ans-bg-th-accent ans-px-5 ans-text-2 ans-font-inter-2 ans-text-White ans-shadow-md ans-transition-colors hover:ans-bg-th-accent-hover sm:ans-flex-none"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
