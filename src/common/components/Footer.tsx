import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  C_GITHUB_URL,
  C_LINKEDIN_URL,
  C_LOCATION,
  C_LOCATION_LINE,
  C_MY_MAIL,
  LEGAL_LINKS,
  NAV_LINKS,
} from "../constants";
import { isAnalyticsConfigured } from "../analytics/analytics";
import { openCookiePreferences } from "../analytics/consent";

export default function Footer() {
  return (
    <footer
      // Bottom padding clears the sticky mobile CTA bar so the last row of
      // links is never trapped underneath it.
      className="ans-relative ans-z-0 ans-mt-auto ans-border-t ans-border-th-border/30 ans-bg-th-header ans-px-4 ans-pb-24 ans-pt-10 ans-text-White sm:ans-pb-8"
    >
      <div className="ans-mx-auto ans-grid ans-w-full ans-max-w-5xl ans-gap-8 sm:ans-grid-cols-2 lg:ans-grid-cols-3">
        <div>
          <p className="ans-text-3 ans-font-inter-3 ans-text-th-accent retro-glow">
            Anshuman Singh
          </p>
          <p className="ans-mt-2 ans-max-w-xs ans-text-1 ans-leading-relaxed ans-text-th-muted-fg">
            Frontend engineer building React and TypeScript products in
            healthtech.
          </p>
          <div className="ans-mt-4 ans-flex ans-gap-5">
            <a
              href={C_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="ans-inline-block ans-text-5 ans-text-th-muted-fg ans-transition-all ans-duration-200 hover:ans-scale-110 hover:ans-text-White"
            >
              <FaGithub />
            </a>
            <a
              href={C_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="ans-inline-block ans-text-5 ans-text-th-muted-fg ans-transition-all ans-duration-200 hover:ans-scale-110 hover:ans-text-th-accent"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="ans-text-0 ans-uppercase ans-tracking-1 ans-text-th-muted-fg">
            Explore
          </p>
          <ul className="ans-mt-3 ans-grid ans-grid-cols-2 ans-gap-x-4 ans-gap-y-2">
            {NAV_LINKS.map(({ name, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="ans-text-1 ans-text-th-muted-fg ans-transition-colors ans-duration-200 hover:ans-text-th-accent"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:ans-col-span-2 lg:ans-col-span-1">
          <p className="ans-text-0 ans-uppercase ans-tracking-1 ans-text-th-muted-fg">
            Contact
          </p>
          <address className="ans-mt-3 ans-flex ans-flex-col ans-gap-2 ans-not-italic">
            <a
              href={`mailto:${C_MY_MAIL}`}
              className="ans-flex ans-items-center ans-gap-2 ans-text-1 ans-text-th-muted-fg ans-transition-colors hover:ans-text-th-accent ans-break-all"
            >
              <MdEmail aria-hidden="true" className="ans-shrink-0" />
              {C_MY_MAIL}
            </a>
            <span className="ans-flex ans-items-start ans-gap-2 ans-text-1 ans-text-th-muted-fg">
              <FaMapMarkerAlt
                aria-hidden="true"
                className="ans-mt-1 ans-shrink-0"
              />
              <span>
                {C_LOCATION_LINE}
                <br />
                <span className="ans-text-0 ans-text-th-muted-fg/80">
                  {C_LOCATION.timezone}
                </span>
              </span>
            </span>
          </address>
        </div>
      </div>

      <div className="ans-mx-auto ans-mt-10 ans-flex ans-w-full ans-max-w-5xl ans-flex-col ans-items-center ans-gap-3 ans-border-t ans-border-th-border/20 ans-pt-6 sm:ans-flex-row sm:ans-justify-between">
        <p className="ans-text-1 ans-text-th-muted-fg">
          &copy; {new Date().getFullYear()} Anshuman Singh. All rights reserved.
        </p>
        <ul className="ans-flex ans-flex-wrap ans-items-center ans-justify-center ans-gap-x-5 ans-gap-y-2">
          {LEGAL_LINKS.map(({ name, path }) => (
            <li key={path}>
              <Link
                to={path}
                className="ans-text-1 ans-text-th-muted-fg ans-transition-colors hover:ans-text-th-accent"
              >
                {name}
              </Link>
            </li>
          ))}
          {isAnalyticsConfigured() && (
            <li>
              <button
                type="button"
                onClick={openCookiePreferences}
                className="ans-text-1 ans-text-th-muted-fg ans-transition-colors hover:ans-text-th-accent"
              >
                Cookie preferences
              </button>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
}
