import { Link } from "react-router-dom";
import LegalPage, {
  LegalList,
  LegalSection,
} from "../common/components/LegalPage";
import {
  C_GITHUB_URL,
  C_LOCATION_LINE,
  C_MY_MAIL,
  EAPP_ROUTES,
} from "../common/constants";

const Terms = () => (
  <LegalPage
    title="Terms of Use"
    intro="The short version: this is my personal portfolio. Read it, share it, take inspiration from the code — just don't pass my work off as yours, and don't treat anything here as a professional guarantee."
  >
    <LegalSection title="Agreement">
      <p>
        By using this site you accept these terms. If you don&apos;t, please stop
        using it. The site is operated by Anshuman Singh, an individual based in{" "}
        {C_LOCATION_LINE}.
      </p>
    </LegalSection>

    <LegalSection title="What this site is">
      <p>
        A portfolio: a record of my professional experience, projects and
        credentials, plus a way to contact me. It is not a commercial service, it
        makes no offer of employment or engagement, and nothing on it forms a
        contract.
      </p>
    </LegalSection>

    <LegalSection title="Intellectual property">
      <LegalList
        items={[
          <>
            The written content, résumé, project descriptions, design and images
            on this site are mine and remain my copyright.
          </>,
          <>
            The source code for this site is published on{" "}
            <a
              href={C_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ans-text-th-accent ans-underline-offset-4 hover:ans-underline"
            >
              GitHub
            </a>{" "}
            under the MIT licence. Use it under those terms — reusing the code is
            fine, presenting my résumé, biography or identity as your own is not.
          </>,
          <>
            Third-party names, logos and trademarks (HealthPlix, React, GitHub
            and others) belong to their respective owners and appear here only to
            describe real work and tools.
          </>,
        ]}
      />
    </LegalSection>

    <LegalSection title="Acceptable use">
      <p>You agree not to:</p>
      <LegalList
        items={[
          "Scrape, mirror or republish the site in bulk, or use it to train models without asking first.",
          "Use the contact form or AI chat to send spam, recruiting blasts, malware, or unlawful, abusive or misleading content.",
          "Attempt to probe, overload or interfere with the site or the backend that powers the chat assistant.",
          "Misrepresent your identity when contacting me.",
        ]}
      />
      <p>
        I may block access if any of the above happens. The contact form and chat
        assistant are rate limited.
      </p>
    </LegalSection>

    <LegalSection title="The AI chat assistant">
      <p>
        The chat widget generates answers about my background using a large
        language model. It can be wrong, out of date, or incomplete, and it does
        not speak for me or for my employer. Treat my résumé and a direct
        conversation as authoritative; treat the chatbot as a convenience. Do not
        submit confidential or personal information through it.
      </p>
    </LegalSection>

    <LegalSection title="Accuracy and availability">
      <p>
        I try to keep everything here current, but the site is provided
        &ldquo;as is&rdquo;, without warranties of any kind. There is no
        guarantee it will be available, uninterrupted or error free — it is
        hosted on free infrastructure and the chat backend sleeps when idle.
      </p>
    </LegalSection>

    <LegalSection title="External links">
      <p>
        Links to GitHub, LinkedIn, live project demos, my employer and others are
        provided for convenience. I don&apos;t control those sites and am not
        responsible for their content or their privacy practices.
      </p>
    </LegalSection>

    <LegalSection title="Limitation of liability">
      <p>
        To the extent permitted by law, I am not liable for any loss or damage
        arising from your use of, or inability to use, this site or anything you
        rely on from it.
      </p>
    </LegalSection>

    <LegalSection title="Governing law">
      <p>
        These terms are governed by the laws of India, and the courts of
        Bengaluru, Karnataka have exclusive jurisdiction over any dispute.
      </p>
    </LegalSection>

    <LegalSection title="Contact">
      <p>
        Questions about these terms: email{" "}
        <a
          href={`mailto:${C_MY_MAIL}`}
          className="ans-text-th-accent ans-underline-offset-4 hover:ans-underline ans-break-all"
        >
          {C_MY_MAIL}
        </a>
        . For how your data is handled, see the{" "}
        <Link
          to={EAPP_ROUTES.privacy}
          className="ans-text-th-accent ans-underline-offset-4 hover:ans-underline"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </LegalSection>
  </LegalPage>
);

export default Terms;
