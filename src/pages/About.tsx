import React from "react";

// 📌 Reusable Section Title Component
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="ans-text-4 ans-font-inter-1 ans-text-Blue-500 dark:ans-text-Blue-300">
    {children}
  </h3>
);

// 📌 Reusable Skill Tag Component
const SkillTag = ({ skill }: { skill: string }) => (
  <li className="ans-bg-Gray-200 dark:ans-bg-Gray-800 ans-text-Gray-900 dark:ans-text-White ans-px-4 ans-py-2 ans-rounded">
    {skill}
  </li>
);

// 📌 About Me Section
const AboutMe = () => (
  <div>
    <h2 className="ans-text-5 ans-font-inter-3 ans-text-Blue-600 dark:ans-text-Blue-400 ans-mb-6">
      About Me
    </h2>
    <p className="ans-text-3 ans-text-Gray-700 dark:ans-text-Gray-300 ans-leading-relaxed">
      I&apos;m a passionate <strong>Frontend Engineer</strong> with a strong
      background in
      <strong>
        {" "}
        React, TypeScript, AI integrations, and performance optimization
      </strong>
      . I specialize in building scalable, high-performance applications,
      particularly in the healthtech domain.
    </p>
  </div>
);

// 📌 Education Section
const Education = () => (
  <div className="ans-mt-8">
    <SectionTitle>Education</SectionTitle>
    <p className="ans-text-3 ans-text-Gray-700 dark:ans-text-Gray-300 ans-mt-2">
      🎓 B.E, Electronics and Instrumentation Engineering
      <span className="ans-text-Gray-500 dark:ans-text-Gray-400">
        {" "}
        Birla Institute of Technology and Science, Pilani (2022)
      </span>
    </p>
  </div>
);

// 📌 Interests Section
const Interests = () => (
  <div className="ans-mt-8">
    <SectionTitle>Interests</SectionTitle>
    <ul className="ans-list-disc ans-list-inside ans-text-Gray-700 dark:ans-text-Gray-300 ans-mt-2">
      <li>Badminton 🏸</li>
      <li>Sketching ✏️</li>
      <li>Football ⚽</li>
      <li>Reading Novels 📖</li>
    </ul>
  </div>
);

// 📌 Skills Section
const Skills = () => {
  const skills = [
    "React.js",
    "TypeScript",
    "Tailwind CSS",
    "Zustand",
    "AI Integrations",
  ];

  return (
    <div className="ans-mt-8">
      <SectionTitle>Technical Skills</SectionTitle>
      <ul className="ans-flex ans-flex-wrap ans-gap-4 ans-mt-2">
        {skills.map((skill) => (
          <SkillTag key={skill} skill={skill} />
        ))}
      </ul>
    </div>
  );
};

// 📌 Main About Component
const About = () => {
  return (
    <section className="ans-container ans-mx-auto ans-px-6 ans-py-xxlarge ans-bg-White dark:ans-bg-Gray-900 ans-text-Gray-900 dark:ans-text-White">
      <AboutMe />
      <Education />
      <Interests />
      <Skills />
    </section>
  );
};

export default About;
