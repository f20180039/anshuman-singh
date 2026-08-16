import { FormEvent, ReactNode, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaExclamationCircle,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  C_LINKEDIN_URL,
  C_LOCATION,
  C_LOCATION_LINE,
  C_MY_MAIL,
  C_MY_PHONE_NUMBER,
  EAPP_ROUTES,
} from "../common/constants";
import { useInView } from "../common/utils";
import BackgroundManager from "../common/components/backgrounds/BackgroundManager";
import Spinner from "../common/components/Spinner";
import { trackEvent } from "../common/analytics/analytics";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const MESSAGE_MAX = 2000;

const REASONS = [
  "A full-time role",
  "Freelance or contract work",
  "A technical question",
  "Something else",
];

type FieldName = "name" | "email" | "reason" | "message";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "error" | "mailto";

interface FormValues {
  name: string;
  email: string;
  reason: string;
  message: string;
}

const EMPTY: FormValues = {
  name: "",
  email: "",
  reason: REASONS[0],
  message: "",
};

/**
 * Deliberately permissive. The only thing worth catching client-side is an
 * obvious typo; anything stricter starts rejecting valid addresses, and the
 * real check is whether the reply bounces.
 */
function isPlausibleEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

function validate(values: FormValues): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) {
    errors.name = "Please tell me your name.";
  } else if (values.name.trim().length < 2) {
    errors.name = "That looks too short — please enter your full name.";
  }

  if (!values.email.trim()) {
    errors.email = "I need an email address to reply to.";
  } else if (!isPlausibleEmail(values.email)) {
    errors.email = "That doesn't look like a valid email address.";
  }

  const message = values.message.trim();
  if (!message) {
    errors.message = "Please write a message.";
  } else if (message.length < 10) {
    errors.message =
      "A little more detail would help — at least 10 characters.";
  } else if (message.length > MESSAGE_MAX) {
    errors.message = `Please keep it under ${MESSAGE_MAX} characters.`;
  }

  return errors;
}

const fieldClasses = (hasError: boolean) =>
  `ans-w-full ans-rounded-lg ans-border ans-bg-th-surface ans-px-4 ans-py-3 ans-text-2 ans-text-th-fg ans-transition-colors placeholder:ans-text-th-muted-fg/70 focus:ans-outline-none focus:ans-ring-2 ${
    hasError
      ? "ans-border-th-error focus:ans-ring-th-error/40"
      : "ans-border-th-border focus:ans-border-th-accent focus:ans-ring-th-accent/40"
  }`;

const FieldError = ({ id, children }: { id: string; children: ReactNode }) => (
  <p
    id={id}
    role="alert"
    className="ans-mt-1.5 ans-flex ans-items-center ans-gap-1.5 ans-text-1 ans-text-th-error"
  >
    <FaExclamationCircle aria-hidden="true" className="ans-shrink-0" />
    {children}
  </p>
);

interface ContactItemProps {
  icon: ReactNode;
  label: string;
  link?: string;
  displayText: string;
  isExternal?: boolean;
  iconBg: string;
  delay: string;
}

const ContactItem = ({
  icon,
  label,
  link,
  displayText,
  isExternal = false,
  iconBg,
  delay,
}: ContactItemProps) => {
  const { ref, isInView } = useInView();

  const body = link ? (
    <a
      href={link}
      className="ans-text-th-accent ans-underline-offset-4 hover:ans-underline ans-break-words"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {displayText}
    </a>
  ) : (
    <span className="ans-text-th-fg">{displayText}</span>
  );

  return (
    <div
      ref={ref}
      className={`ans-flex ans-items-center ans-gap-4 ans-rounded-lg ans-bg-th-surface ans-p-4 ans-shadow-sm ans-transition-all ans-duration-300 hover:ans-shadow-md ans-opacity-0 ${delay} ${
        isInView ? "ans-animate-fade-in-up" : ""
      }`}
    >
      <div
        className={`ans-grid ans-h-12 ans-w-12 ans-shrink-0 ans-place-items-center ans-rounded-full ${iconBg} ans-text-4`}
      >
        {icon}
      </div>
      <div className="ans-min-w-0 ans-text-left">
        <p className="ans-text-0 ans-uppercase ans-tracking-1 ans-text-th-muted-fg">
          {label}
        </p>
        {body}
      </div>
    </div>
  );
};

export default function Contact() {
  const navigate = useNavigate();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const errorBannerRef = useRef<HTMLDivElement>(null);

  const remaining = MESSAGE_MAX - values.message.length;
  const isSubmitting = status === "submitting";

  const visibleErrors = useMemo(() => {
    const current = validate(values);
    return Object.fromEntries(
      Object.entries(current).filter(([field]) => touched[field as FieldName]),
    ) as Errors;
  }, [values, touched]);

  const shownErrors = { ...visibleErrors, ...errors };

  const update = (field: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const blur = (field: FieldName) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  /**
   * Used when no form endpoint is configured (local dev, or a fork). Opening a
   * prefilled draft is honest about what happened; pretending the message was
   * delivered would not be.
   */
  const fallbackToMailto = () => {
    const subject = encodeURIComponent(`Portfolio enquiry — ${values.reason}`);
    const body = encodeURIComponent(
      `${values.message}\n\n—\n${values.name}\n${values.email}`,
    );
    window.location.href = `mailto:${C_MY_MAIL}?subject=${subject}&body=${body}`;
    setStatus("mailto");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setTouched({ name: true, email: true, reason: true, message: true });
      trackEvent("contact_form_invalid", {
        fields: Object.keys(found).join(","),
      });
      // Move focus to the first offending control so keyboard and screen
      // reader users are not left guessing what failed.
      const firstField = (["name", "email", "message"] as FieldName[]).find(
        (field) => found[field],
      );
      document.getElementById(`contact-${firstField}`)?.focus();
      return;
    }

    setSubmitError(null);
    setStatus("submitting");
    trackEvent("contact_form_submit", { reason: values.reason });

    if (!WEB3FORMS_KEY) {
      fallbackToMailto();
      return;
    }

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          subject: `Portfolio enquiry (${values.reason}) — ${values.name.trim()}`,
          from_name: "Portfolio contact form",
          botcheck: "",
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message || `Request failed (${response.status})`,
        );
      }

      navigate(`${EAPP_ROUTES.thankYou}?sent=1`);
    } catch (error) {
      setStatus("error");
      setSubmitError(
        error instanceof TypeError
          ? "Couldn't reach the server — check your connection and try again."
          : "Something went wrong sending your message. Please try again, or email me directly.",
      );
      trackEvent("contact_form_error");
      // Defer until the banner has rendered.
      window.setTimeout(() => errorBannerRef.current?.focus(), 0);
    }
  };

  return (
    <BackgroundManager showGrid showGradient gradientIntensity="medium">
      <section
        id="contact"
        className="ans-mx-auto ans-w-full ans-max-w-5xl ans-px-4 ans-py-10 ans-text-th-fg sm:ans-py-14"
      >
        <div className="ans-text-center">
          <p className="ans-text-2 ans-font-inter-1 ans-text-th-muted-fg">
            Get in Touch
          </p>
          <h1 className="ans-mt-2 ans-text-5 ans-font-inter-3 ans-text-th-accent retro-glow sm:ans-text-6">
            Let&apos;s Connect
          </h1>
          <p className="ans-mx-auto ans-mt-4 ans-max-w-xl ans-text-2 ans-leading-relaxed ans-text-th-secondary-fg">
            Open to software engineering roles and interesting freelance work.
            Send a message below and I&apos;ll usually reply within a business
            day.
          </p>
        </div>

        <div className="ans-mt-10 ans-grid ans-gap-8 lg:ans-grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:ans-gap-10">
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-busy={isSubmitting}
            className="ans-flex ans-flex-col ans-gap-5 ans-rounded-xl ans-bg-th-surface/60 ans-p-5 ans-shadow-sm sm:ans-p-6"
          >
            {submitError && (
              <div
                ref={errorBannerRef}
                tabIndex={-1}
                role="alert"
                className="ans-flex ans-items-start ans-gap-3 ans-rounded-lg ans-border ans-border-th-error/40 ans-bg-th-error/10 ans-p-4 ans-text-2 ans-text-th-fg focus:ans-outline-none"
              >
                <FaExclamationCircle
                  aria-hidden="true"
                  className="ans-mt-0.5 ans-shrink-0 ans-text-th-error"
                />
                <div>
                  <p className="ans-font-inter-2">Message not sent</p>
                  <p className="ans-mt-1 ans-text-1 ans-text-th-secondary-fg">
                    {submitError}{" "}
                    <a
                      href={`mailto:${C_MY_MAIL}`}
                      className="ans-text-th-accent ans-underline ans-underline-offset-2"
                    >
                      {C_MY_MAIL}
                    </a>
                  </p>
                </div>
              </div>
            )}

            {status === "mailto" && (
              <div
                role="status"
                className="ans-rounded-lg ans-border ans-border-th-warning/40 ans-bg-th-warning/10 ans-p-4 ans-text-1 ans-text-th-secondary-fg"
              >
                This form has no delivery endpoint configured, so your email app
                should have opened with the message ready to send. If nothing
                happened, email{" "}
                <a
                  href={`mailto:${C_MY_MAIL}`}
                  className="ans-text-th-accent ans-underline ans-underline-offset-2"
                >
                  {C_MY_MAIL}
                </a>{" "}
                directly.
              </div>
            )}

            <div>
              <label
                htmlFor="contact-name"
                className="ans-mb-1.5 ans-block ans-text-1 ans-font-inter-1 ans-text-th-secondary-fg"
              >
                Your name <span className="ans-text-th-error">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={values.name}
                onChange={(event) => update("name", event.target.value)}
                onBlur={() => blur("name")}
                disabled={isSubmitting}
                aria-invalid={Boolean(shownErrors.name)}
                aria-describedby={
                  shownErrors.name ? "contact-name-error" : undefined
                }
                className={fieldClasses(Boolean(shownErrors.name))}
                placeholder="Priya Sharma"
              />
              {shownErrors.name && (
                <FieldError id="contact-name-error">
                  {shownErrors.name}
                </FieldError>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="ans-mb-1.5 ans-block ans-text-1 ans-font-inter-1 ans-text-th-secondary-fg"
              >
                Email <span className="ans-text-th-error">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={(event) => update("email", event.target.value)}
                onBlur={() => blur("email")}
                disabled={isSubmitting}
                aria-invalid={Boolean(shownErrors.email)}
                aria-describedby={
                  shownErrors.email ? "contact-email-error" : undefined
                }
                className={fieldClasses(Boolean(shownErrors.email))}
                placeholder="you@company.com"
              />
              {shownErrors.email && (
                <FieldError id="contact-email-error">
                  {shownErrors.email}
                </FieldError>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-reason"
                className="ans-mb-1.5 ans-block ans-text-1 ans-font-inter-1 ans-text-th-secondary-fg"
              >
                What&apos;s this about?
              </label>
              <select
                id="contact-reason"
                name="reason"
                value={values.reason}
                onChange={(event) => update("reason", event.target.value)}
                disabled={isSubmitting}
                className={fieldClasses(false)}
              >
                {REASONS.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="ans-mb-1.5 ans-flex ans-items-baseline ans-justify-between ans-gap-3">
                <label
                  htmlFor="contact-message"
                  className="ans-text-1 ans-font-inter-1 ans-text-th-secondary-fg"
                >
                  Message <span className="ans-text-th-error">*</span>
                </label>
                <span
                  className={`ans-text-0 ${
                    remaining < 0 ? "ans-text-th-error" : "ans-text-th-muted-fg"
                  }`}
                  aria-live="polite"
                >
                  {remaining.toLocaleString()} left
                </span>
              </div>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                required
                value={values.message}
                onChange={(event) => update("message", event.target.value)}
                onBlur={() => blur("message")}
                disabled={isSubmitting}
                aria-invalid={Boolean(shownErrors.message)}
                aria-describedby={
                  shownErrors.message ? "contact-message-error" : undefined
                }
                className={`${fieldClasses(Boolean(shownErrors.message))} ans-resize-y`}
                placeholder="A little about the role or project, and what you're looking for."
              />
              {shownErrors.message && (
                <FieldError id="contact-message-error">
                  {shownErrors.message}
                </FieldError>
              )}
            </div>

            {/* Honeypot: hidden from people, tempting to bots. */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="ans-hidden"
            />

            <div className="ans-flex ans-flex-col ans-gap-3 sm:ans-flex-row sm:ans-items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="ans-flex ans-min-h-[48px] ans-items-center ans-justify-center ans-gap-2.5 ans-rounded-lg ans-bg-th-accent ans-px-6 ans-py-3 ans-text-3 ans-font-inter-2 ans-text-White ans-shadow-md ans-transition-all hover:ans-bg-th-accent-hover disabled:ans-cursor-not-allowed disabled:ans-opacity-70"
              >
                {isSubmitting && <Spinner />}
                {isSubmitting ? "Sending…" : "Send message"}
              </button>
              <p className="ans-text-0 ans-text-th-muted-fg">
                Your details are used only to reply. See the{" "}
                <Link
                  to={EAPP_ROUTES.privacy}
                  className="ans-text-th-accent ans-underline ans-underline-offset-2"
                >
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </form>

          <div className="ans-flex ans-flex-col ans-gap-3">
            <h2 className="ans-text-3 ans-font-inter-2 ans-text-th-fg">
              Or reach me directly
            </h2>
            <ContactItem
              icon={<MdEmail className="ans-text-th-error" />}
              label="Email"
              link={`mailto:${C_MY_MAIL}`}
              displayText={C_MY_MAIL}
              iconBg="ans-bg-th-error/10"
              delay="stagger-1"
            />
            <ContactItem
              icon={<FaPhoneAlt className="ans-text-th-success" />}
              label="Phone"
              link={`tel:${C_MY_PHONE_NUMBER.replace(/\s/g, "")}`}
              displayText={C_MY_PHONE_NUMBER}
              iconBg="ans-bg-th-success/10"
              delay="stagger-2"
            />
            <ContactItem
              icon={<FaLinkedin className="ans-text-th-accent" />}
              label="LinkedIn"
              link={C_LINKEDIN_URL}
              displayText="anshuman-singh-bits"
              isExternal
              iconBg="ans-bg-th-accent/10"
              delay="stagger-3"
            />
            <address className="ans-not-italic">
              <ContactItem
                icon={<FaMapMarkerAlt className="ans-text-th-warning" />}
                label="Based in"
                displayText={C_LOCATION_LINE}
                iconBg="ans-bg-th-warning/10"
                delay="stagger-4"
              />
            </address>
            <p className="ans-px-1 ans-text-0 ans-text-th-muted-fg">
              Working hours roughly 10:00–19:00 {C_LOCATION.timezone}. Happy to
              take calls outside that for other time zones.
            </p>
          </div>
        </div>
      </section>
    </BackgroundManager>
  );
}
