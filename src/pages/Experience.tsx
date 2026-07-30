import { useInView } from "../common/utils";
import BackgroundManager from "../common/components/backgrounds/BackgroundManager";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  isCurrent: boolean;
  bullets: string[];
  techStack: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Frontend Engineer",
    company: "HealthPlix Technologies",
    period: "July 2022 - Present",
    isCurrent: true,
    bullets: [
      "Architected AI Clinical Documentation and IPD/OPD Billing as standalone, end-to-end modules on a Backend-for-Frontend (BFF) layer, exposing versioned, contract-driven endpoints so external hospital systems can embed each module without adopting the full HealthPlix EMR.",
      "Delivered the AI Summarization and Dictation module by integrating OpenAI workflows over Server-Sent Events (SSE), with live parsing and conversational input for real-time clinical note generation.",
      "Implemented Sentry error tracking for proactive monitoring and reduced bug resolution time by 30%.",
      "Optimized VisitPad performance by reducing re-renderings by 25%, improving UI responsiveness during patient consultations.",
      "Built and maintained an in-house reusable UI library with Shadcn UI and Tailwind CSS, improving frontend consistency and cross-team developer velocity.",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Zustand", "BFF Architecture", "OpenAI APIs", "SSE", "Sentry", "Vite"],
  },
  {
    title: "Data Science Intern",
    company: "Aramex India Pvt Ltd",
    period: "Aug 2021 - Jan 2022",
    isCurrent: false,
    bullets: [
      "Developed a model to improve address extraction accuracy from 90% to 99%, reducing delivery failures and operational costs.",
      "Performed data analysis and feature engineering on 100K+ delivery records for reliable and scalable model results.",
    ],
    techStack: ["Python", "Machine Learning", "Data Analysis", "NLP"],
  },
];

const TimelineCard = ({ experience, index }: { experience: ExperienceItem; index: number }) => {
  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className="ans-relative ans-pl-8 ans-pb-10 last:ans-pb-0">
      {/* Timeline line */}
      {index < experiences.length - 1 && (
        <div className="ans-absolute ans-left-[11px] ans-top-6 ans-bottom-0 ans-w-0.5 ans-bg-th-border" />
      )}

      {/* Timeline dot */}
      <div
        className={`ans-absolute ans-left-0 ans-top-1 ans-w-6 ans-h-6 ans-rounded-full ans-border-4 ans-flex ans-items-center ans-justify-center ${
          experience.isCurrent
            ? "ans-bg-th-accent ans-border-th-accent-subtle ans-shadow-md"
            : "ans-bg-th-muted-fg ans-border-th-muted"
        }`}
      />

      {/* Card */}
      <div
        className={`ans-bg-th-surface ans-rounded-lg ans-p-6 ans-shadow-sm hover:ans-shadow-md ans-transition-all ans-duration-300 ans-opacity-0 ${
          isInView ? "ans-animate-fade-in-left" : ""
        }`}
      >
        <div className="ans-flex ans-flex-wrap ans-items-center ans-gap-3 ans-mb-2">
          <h3 className="ans-text-4 ans-font-inter-1 ans-text-th-fg">
            {experience.title} - {experience.company}
          </h3>
          {experience.isCurrent && (
            <span className="ans-bg-th-accent-subtle ans-text-th-accent ans-px-3 ans-py-1 ans-rounded-full ans-text-xs ans-font-inter-1">
              CURRENT
            </span>
          )}
        </div>
        <p className="ans-text-th-muted-fg ans-text-3 ans-mb-4">
          {experience.period}
        </p>
        <ul className="ans-space-y-2 ans-mb-4">
          {experience.bullets.map((bullet, i) => (
            <li
              key={i}
              className="ans-flex ans-gap-2 ans-text-th-secondary-fg"
            >
              <span className="ans-text-th-accent ans-mt-1 ans-shrink-0">&#9656;</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Tech stack tags */}
        <div className="ans-flex ans-flex-wrap ans-gap-2">
          {experience.techStack.map((tech) => (
            <span
              key={tech}
              className="ans-bg-th-accent-subtle ans-text-th-accent ans-px-3 ans-py-1 ans-rounded ans-text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const { ref: titleRef, isInView: titleVisible } = useInView();

  return (
    <BackgroundManager showGrid showGradient gradientIntensity="medium">
      <section className="ans-container ans-mx-auto ans-px-6 ans-py-xxlarge ans-text-th-fg ans-max-w-3xl">
        <h2
          ref={titleRef}
          className={`ans-text-5 ans-font-inter-2 ans-text-th-accent ans-mb-10 retro-glow ans-opacity-0 ${
            titleVisible ? "ans-animate-fade-in-up" : ""
          }`}
        >
          Work Experience
        </h2>

        <div>
          {experiences.map((exp, index) => (
            <TimelineCard key={exp.company} experience={exp} index={index} />
          ))}
        </div>
      </section>
    </BackgroundManager>
  );
};

export default Experience;
