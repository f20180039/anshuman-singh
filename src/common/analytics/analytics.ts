/**
 * Google Analytics 4, gated on consent.
 *
 * gtag.js is not requested at all until the visitor accepts, so a visitor who
 * declines or ignores the banner never has a Google script on the page. Consent
 * Mode v2 signals are still set before `config` in case GA is loaded later, and
 * ad signals stay denied permanently — this site does not advertise.
 *
 * Every entry point is a no-op when VITE_GA_MEASUREMENT_ID is unset, so local
 * development and forks never send data anywhere.
 */
import { getConsent, subscribeToConsent } from "./consent";

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as
  | string
  | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

let scriptLoaded = false;
let initialised = false;

export function isAnalyticsConfigured(): boolean {
  return Boolean(MEASUREMENT_ID);
}

/**
 * gtag.js identifies commands by checking that the pushed value stringifies to
 * "[object Arguments]" — pushing a plain array is silently ignored. This
 * rebuilds a genuine Arguments object from the rest parameters.
 */
function toArguments(args: unknown[]): IArguments {
  // eslint-disable-next-line prefer-rest-params
  const collect = function () { return arguments; } as (
    ...values: unknown[]
  ) => IArguments;

  return collect(...args);
}

function gtag(...args: unknown[]) {
  window.dataLayer.push(toArguments(args));
}

function loadGaScript() {
  if (scriptLoaded || !MEASUREMENT_ID) return;
  scriptLoaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, {
    // The SPA sends its own page_view on every route change, including the
    // first, so the automatic one would double-count the landing page.
    send_page_view: false,
    anonymize_ip: true,
  });
}

/**
 * Deletes the cookies GA set, for the current host and for the registrable
 * parent domain (GA writes to `.github.io`-style parents), so that withdrawing
 * consent actually removes them instead of just stopping new hits.
 */
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((entry) => entry.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name))
    .filter((name) => name === "_gid" || name.startsWith("_ga"));

  const hostParts = window.location.hostname.split(".");
  const domains = [
    "",
    window.location.hostname,
    ...hostParts.map((_, index) => `.${hostParts.slice(index).join(".")}`),
  ];

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${
        domain ? `; domain=${domain}` : ""
      }`;
    }
  }
}

function applyConsent(status: "granted" | "denied") {
  if (!MEASUREMENT_ID) return;

  gtag("consent", "update", {
    analytics_storage: status,
    // Never granted: no advertising products are used on this site.
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  if (status === "granted") {
    loadGaScript();
  } else {
    clearAnalyticsCookies();
  }
}

/**
 * Sets Consent Mode defaults and wires up the consent subscription. Safe to
 * call once at app start, before the visitor has decided anything.
 */
export function initAnalytics(): void {
  if (initialised || !MEASUREMENT_ID) return;
  initialised = true;

  window.dataLayer = window.dataLayer || [];

  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });

  subscribeToConsent((status) => {
    if (status) applyConsent(status);
  });

  const existing = getConsent();
  if (existing) applyConsent(existing);
}

/** Records a virtual page view. Silently ignored unless GA is live. */
export function trackPageView(path: string, title: string): void {
  if (!MEASUREMENT_ID || !scriptLoaded || getConsent() !== "granted") return;

  gtag("event", "page_view", {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}

/** Records a custom event. Silently ignored unless GA is live. */
export function trackEvent(
  name: string,
  params: Record<string, unknown> = {}
): void {
  if (!MEASUREMENT_ID || !scriptLoaded || getConsent() !== "granted") return;

  gtag("event", name, params);
}
