import { Link } from "react-router-dom";
import LegalPage, {
  LegalList,
  LegalSection,
} from "../common/components/LegalPage";
import {
  C_LOCATION_LINE,
  C_MY_MAIL,
  C_SITE_URL,
  EAPP_ROUTES,
} from "../common/constants";
import { openCookiePreferences } from "../common/analytics/consent";

const MailLink = () => (
  <a
    href={`mailto:${C_MY_MAIL}`}
    className="ans-text-th-accent ans-underline-offset-4 hover:ans-underline ans-break-all"
  >
    {C_MY_MAIL}
  </a>
);

const Privacy = () => (
  <LegalPage
    title="Privacy Policy"
    intro="This is a personal portfolio site. It collects as little as possible, and nothing at all until you either accept analytics or send me something. This page describes exactly what happens, in plain terms."
  >
    <LegalSection title="Who is responsible">
      <p>
        This site is operated by Anshuman Singh, an individual based in{" "}
        {C_LOCATION_LINE}. For any privacy question or request, email{" "}
        <MailLink />.
      </p>
    </LegalSection>

    <LegalSection title="What is collected, and when">
      <LegalList
        items={[
          <>
            <strong className="ans-text-th-fg">Nothing by default.</strong> On a
            first visit, no analytics run and no tracking cookies are set. The
            cookie banner defaults to denied until you actively choose otherwise.
          </>,
          <>
            <strong className="ans-text-th-fg">Analytics (only if you accept).</strong>{" "}
            If you accept in the cookie banner, Google Analytics 4 loads and
            records pages viewed, approximate location derived from IP (country
            or city level — the full IP is not stored by Google Analytics 4),
            device and browser type, and referring site. It is used to see which
            pages are worth keeping. It is never used for advertising, and no
            ad-personalisation signals are enabled.
          </>,
          <>
            <strong className="ans-text-th-fg">Contact form.</strong> The name,
            email address and message you type are submitted so I can reply.
            Nothing else is attached.
          </>,
          <>
            <strong className="ans-text-th-fg">AI chat assistant.</strong> The
            questions you type into the chat widget are sent to my backend and on
            to Google&apos;s Gemini API to generate an answer. Please don&apos;t
            put confidential information into it.
          </>,
          <>
            <strong className="ans-text-th-fg">Server logs.</strong> This site is
            hosted on GitHub Pages. GitHub records standard request logs,
            including IP addresses, as part of serving the site. That happens
            regardless of your cookie choice and is governed by GitHub&apos;s own
            privacy statement.
          </>,
        ]}
      />
    </LegalSection>

    <LegalSection title="Cookies and local storage">
      <p>
        Two things are stored in your browser without consent because the site
        cannot work sensibly without them, and neither is used for tracking:
      </p>
      <LegalList
        items={[
          <>
            <code className="ans-text-th-accent">theme</code> — remembers which
            colour theme you picked.
          </>,
          <>
            <code className="ans-text-th-accent">cookie-consent</code> —
            remembers your answer to the cookie banner, so it isn&apos;t shown
            again on every page.
          </>,
        ]}
      />
      <p>
        If, and only if, you accept analytics, Google Analytics sets its own
        cookies (<code className="ans-text-th-accent">_ga</code> and{" "}
        <code className="ans-text-th-accent">_ga_*</code>) to tell repeat visits
        apart. They expire after up to two years.
      </p>
      <p>
        You can change your mind at any time:{" "}
        <button
          type="button"
          onClick={openCookiePreferences}
          className="ans-text-th-accent ans-underline ans-underline-offset-4 hover:ans-text-th-accent-hover"
        >
          reopen cookie preferences
        </button>
        . Declining removes the analytics cookies this site set and stops any
        further collection.
      </p>
    </LegalSection>

    <LegalSection title="Who else processes your data">
      <LegalList
        items={[
          <>
            <strong className="ans-text-th-fg">GitHub Pages</strong> — hosting
            and request logs.
          </>,
          <>
            <strong className="ans-text-th-fg">Google Analytics</strong> — usage
            analytics, only after consent.
          </>,
          <>
            <strong className="ans-text-th-fg">Web3Forms</strong> — delivers
            contact form submissions to my inbox.
          </>,
          <>
            <strong className="ans-text-th-fg">Render and Google Gemini</strong>{" "}
            — run the AI chat assistant and generate its answers.
          </>,
          <>
            <strong className="ans-text-th-fg">Google Fonts</strong> — serves the
            display typeface, which means your browser requests a file from
            Google when the page loads.
          </>,
        ]}
      />
      <p>
        Nothing is sold, and nothing is shared with anyone beyond the providers
        above.
      </p>
    </LegalSection>

    <LegalSection title="How long it is kept">
      <p>
        Contact form emails stay in my mailbox until they are no longer relevant,
        and are deleted on request. Analytics data is retained for 14 months in
        Google Analytics, then deleted automatically. Chat messages are not
        stored beyond the length of your conversation.
      </p>
    </LegalSection>

    <LegalSection title="Your rights">
      <p>
        You can ask what I hold about you, ask for it to be corrected or deleted,
        withdraw analytics consent, or object to processing. Email{" "}
        <MailLink /> and I&apos;ll action it — realistically within a few days,
        and in any case within 30 days. If you are in the EU or UK you may also
        complain to your data protection authority; in India, to the Data
        Protection Board.
      </p>
    </LegalSection>

    <LegalSection title="Children">
      <p>
        This site is aimed at recruiters and fellow engineers. It is not directed
        at children under 16 and I do not knowingly collect their data.
      </p>
    </LegalSection>

    <LegalSection title="Changes to this policy">
      <p>
        If this policy changes materially, the date at the top of the page
        changes with it. The current version always lives at{" "}
        <a
          href={`${C_SITE_URL}${EAPP_ROUTES.privacy}`}
          className="ans-text-th-accent ans-underline-offset-4 hover:ans-underline ans-break-all"
        >
          {C_SITE_URL}
          {EAPP_ROUTES.privacy}
        </a>
        . See also the{" "}
        <Link
          to={EAPP_ROUTES.terms}
          className="ans-text-th-accent ans-underline-offset-4 hover:ans-underline"
        >
          Terms of Use
        </Link>
        .
      </p>
    </LegalSection>
  </LegalPage>
);

export default Privacy;
