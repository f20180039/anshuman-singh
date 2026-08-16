/**
 * Cookie-consent state, kept deliberately separate from the analytics vendor so
 * swapping GA for something else does not touch consent logic.
 *
 * Default is denied. Nothing is loaded, and no analytics cookie is written,
 * until the visitor actively accepts.
 */

export type ConsentStatus = "granted" | "denied";

const STORAGE_KEY = "cookie-consent";

/**
 * Bump when the set of things consent covers changes (a new vendor, a new
 * category). Stored decisions from an older version are treated as unanswered,
 * so the banner asks again rather than assuming the old answer still applies.
 */
const CONSENT_VERSION = 1;

export const OPEN_PREFERENCES_EVENT = "cookie-preferences:open";

interface StoredConsent {
  status: ConsentStatus;
  version: number;
  decidedAt: string;
}

type Listener = (status: ConsentStatus | null) => void;
const listeners = new Set<Listener>();

/** Returns the stored decision, or null if the visitor has not answered yet. */
export function getConsent(): ConsentStatus | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed.status === "granted" || parsed.status === "denied"
      ? parsed.status
      : null;
  } catch {
    // Private mode, disabled storage, or corrupt JSON: treat as undecided.
    return null;
  }
}

export function setConsent(status: ConsentStatus): void {
  const record: StoredConsent = {
    status,
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable — honour the choice for this page view regardless.
  }
  listeners.forEach((listener) => listener(status));
}

export function subscribeToConsent(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Lets any page (e.g. the privacy policy) reopen the banner. */
export function openCookiePreferences(): void {
  window.dispatchEvent(new CustomEvent(OPEN_PREFERENCES_EVENT));
}
