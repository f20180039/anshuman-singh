import { ReactNode } from "react";
import BackgroundManager from "./backgrounds/BackgroundManager";

/**
 * Date the legal copy last changed. Intentionally a hand-maintained constant
 * rather than a build timestamp — an "effective date" that silently moves on
 * every deploy tells the reader nothing.
 */
export const LEGAL_LAST_UPDATED = "16 August 2026";

export const LegalSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="ans-mt-8">
    <h2 className="ans-text-4 ans-font-inter-2 ans-text-th-accent">{title}</h2>
    <div className="ans-mt-3 ans-flex ans-flex-col ans-gap-3 ans-text-2 ans-leading-relaxed ans-text-th-secondary-fg">
      {children}
    </div>
  </section>
);

export const LegalList = ({ items }: { items: ReactNode[] }) => (
  <ul className="ans-flex ans-list-disc ans-flex-col ans-gap-2 ans-pl-5 marker:ans-text-th-accent">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

const LegalPage = ({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) => (
  <BackgroundManager showGrid showGradient gradientIntensity="low">
    <article className="ans-mx-auto ans-w-full ans-max-w-3xl ans-px-4 ans-py-10 ans-text-th-fg sm:ans-px-6 sm:ans-py-14">
      <h1 className="ans-text-5 ans-font-inter-3 ans-text-th-accent retro-glow sm:ans-text-6">
        {title}
      </h1>
      <p className="ans-mt-2 ans-text-1 ans-text-th-muted-fg">
        Last updated {LEGAL_LAST_UPDATED}
      </p>
      <p className="ans-mt-6 ans-text-3 ans-leading-relaxed ans-text-th-secondary-fg">
        {intro}
      </p>
      {children}
    </article>
  </BackgroundManager>
);

export default LegalPage;
