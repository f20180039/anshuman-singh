import React from "react";
import { useInView, getYearsOfExperience } from "../common/utils";

const skillCategories = [
  {
    label: "Core",
    color: "ans-border-th-accent",
    skills: ["JavaScript (ES6+)", "TypeScript", "React.js", "HTML5", "CSS3"],
  },
  {
    label: "Ecosystem",
    color: "ans-border-th-success",
    skills: ["Tailwind CSS", "Zustand", "REST APIs", "Vite", "Webpack"],
  },
  {
    label: "Specialties",
    color: "ans-border-Purple-500",
    skills: ["AI Integrations", "Performance Optimization", "Responsive Design", "Web Accessibility"],
  },
];

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="ans-text-4 ans-font-inter-1 ans-text-th-accent">
    {children}
  </h3>
);

const AnimatedSection = ({
  children,
  className = "",
  delay = "",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}) => {
  const { ref, isInView } = useInView();
  return (
    <div
      ref={ref}
      className={`ans-opacity-0 ${isInView ? `ans-animate-fade-in-up ${delay}` : ""} ${className}`}
    >
      {children}
    </div>
  );
};

const AboutMe = () => (
  <AnimatedSection>
    <h2 className="ans-text-5 ans-font-inter-3 ans-text-th-accent ans-mb-6 retro-glow">
      About Me
    </h2>
    <p className="ans-text-3 ans-text-th-secondary-fg ans-leading-relaxed">
      I&apos;m a passionate <strong className="ans-text-th-fg">Frontend Engineer</strong> with{" "}
      <strong className="ans-text-th-accent">{getYearsOfExperience()}+ years</strong> of
      experience building scalable, high-performance applications. I specialize in{" "}
      <strong className="ans-text-th-fg">React, TypeScript, AI integrations, and performance optimization</strong>,
      particularly in the healthtech domain.
    </p>

    {/* Stats Row */}
    <div className="ans-flex ans-flex-wrap ans-gap-3 sm:ans-gap-6 ans-mt-6">
      {[
        { value: `${getYearsOfExperience()}+`, label: "Years Experience" },
        { value: "React", label: "Primary Stack" },
        { value: "Healthtech", label: "Domain Expertise" },
      ].map((stat) => (
        <div
          key={stat.label}
          className="ans-bg-th-surface-alt ans-px-5 ans-py-3 ans-rounded-lg ans-text-center"
        >
          <div className="ans-text-4 ans-font-inter-3 ans-text-th-accent">
            {stat.value}
          </div>
          <div className="ans-text-th-muted-fg">{stat.label}</div>
        </div>
      ))}
    </div>
  </AnimatedSection>
);

const Education = () => (
  <AnimatedSection className="ans-mt-8" delay="stagger-1">
    <SectionTitle>Education</SectionTitle>
    <div className="ans-mt-3 ans-bg-th-surface ans-rounded-lg ans-p-4 ans-border-l-4 ans-border-th-accent">
      <p className="ans-text-3 ans-text-th-fg ans-font-inter-1">
        B.E, Electronics and Instrumentation Engineering
      </p>
      <p className="ans-text-th-muted-fg ans-mt-1">
        Birla Institute of Technology and Science, Pilani (2022)
      </p>
    </div>
  </AnimatedSection>
);

const Interests = () => (
  <AnimatedSection className="ans-mt-8" delay="stagger-2">
    <SectionTitle>Interests</SectionTitle>
    <div className="ans-flex ans-flex-wrap ans-gap-3 ans-mt-3">
      {[
        { name: "Badminton", icon: "🏸" },
        { name: "Sketching", icon: "✏️" },
        { name: "Football", icon: "⚽" },
        { name: "Reading", icon: "📖" },
      ].map((interest) => (
        <span
          key={interest.name}
          className="ans-bg-th-surface-alt ans-px-4 ans-py-2 ans-rounded-full ans-text-th-secondary-fg hover:ans-scale-105 ans-transition-transform ans-duration-200 ans-cursor-default"
        >
          {interest.icon} {interest.name}
        </span>
      ))}
    </div>
  </AnimatedSection>
);

const Skills = () => (
  <AnimatedSection className="ans-mt-8" delay="stagger-3">
    <SectionTitle>Technical Skills</SectionTitle>
    <div className="ans-flex ans-flex-col ans-gap-6 ans-mt-3">
      {skillCategories.map((category) => (
        <div key={category.label}>
          <p className="ans-text-th-muted-fg ans-mb-2 ans-font-inter-1">
            {category.label}
          </p>
          <div className="ans-flex ans-flex-wrap ans-gap-3">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className={`ans-bg-th-surface-alt ans-text-th-fg ans-px-4 ans-py-2 ans-rounded-lg ans-border-l-4 ${category.color} hover:ans-scale-105 ans-transition-transform ans-duration-200 ans-cursor-default`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </AnimatedSection>
);

const About = () => {
  return (
    <section className="ans-container ans-mx-auto ans-px-6 ans-py-xxlarge ans-bg-th-bg ans-text-th-fg ans-max-w-4xl">
      <AboutMe />
      <Education />
      <Interests />
      <Skills />
    </section>
  );
};

export default About;
