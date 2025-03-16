const About = () => {
  return (
    <section className="ans-container ans-mx-auto ans-px-6 ans-py-16 ans-bg-White dark:ans-bg-Gray-900 ans-text-Gray-900 dark:ans-text-White">
      <h2 className="ans-text-5 ans-font-bold ans-text-Blue-600 dark:ans-text-Blue-400 ans-mb-6">
        About Me
      </h2>

      <p className="ans-text-3 ans-text-Gray-700 dark:ans-text-Gray-300 ans-leading-relaxed">
        I'm a passionate <strong>Frontend Engineer</strong> with a strong
        background in
        <strong>
          {" "}
          React, TypeScript, AI integrations, and performance optimization
        </strong>
        . I specialize in building scalable, high-performance applications,
        particularly in the healthtech domain.
      </p>

      <div className="ans-mt-8">
        <h3 className="ans-text-4 ans-font-semibold ans-text-Blue-500 dark:ans-text-Blue-300">
          Education
        </h3>
        <p className="ans-text-3 ans-text-Gray-700 dark:ans-text-Gray-300 ans-mt-2">
          🎓 B.E, Electronics and Instrumentation Engineering
          <span className="ans-text-Gray-500 dark:ans-text-Gray-400">
            Birla Institute of Technology and Science, Pilani (2022)
          </span>
        </p>
      </div>

      <div className="ans-mt-8">
        <h3 className="ans-text-4 ans-font-semibold ans-text-Blue-500 dark:ans-text-Blue-300">
          Interests
        </h3>
        <ul className="ans-list-disc ans-list-inside ans-text-Gray-700 dark:ans-text-Gray-300 ans-mt-2">
          <li>Badminton 🏸</li>
          <li>Sketching ✏️</li>
          <li>Football ⚽</li>
          <li>Reading Novels 📖</li>
        </ul>
      </div>

      <div className="ans-mt-8">
        <h3 className="ans-text-4 ans-font-semibold ans-text-Blue-500 dark:ans-text-Blue-300">
          Technical Skills
        </h3>
        <ul className="ans-flex ans-flex-wrap ans-gap-4 ans-mt-2">
          <li className="ans-bg-Gray-200 dark:ans-bg-Gray-800 ans-text-Gray-900 dark:ans-text-White ans-px-4 ans-py-2 ans-rounded">
            React.js
          </li>
          <li className="ans-bg-Gray-200 dark:ans-bg-Gray-800 ans-text-Gray-900 dark:ans-text-White ans-px-4 ans-py-2 ans-rounded">
            TypeScript
          </li>
          <li className="ans-bg-Gray-200 dark:ans-bg-Gray-800 ans-text-Gray-900 dark:ans-text-White ans-px-4 ans-py-2 ans-rounded">
            Tailwind CSS
          </li>
          <li className="ans-bg-Gray-200 dark:ans-bg-Gray-800 ans-text-Gray-900 dark:ans-text-White ans-px-4 ans-py-2 ans-rounded">
            Zustand
          </li>
          <li className="ans-bg-Gray-200 dark:ans-bg-Gray-800 ans-text-Gray-900 dark:ans-text-White ans-px-4 ans-py-2 ans-rounded">
            Next.js
          </li>
          <li className="ans-bg-Gray-200 dark:ans-bg-Gray-800 ans-text-Gray-900 dark:ans-text-White ans-px-4 ans-py-2 ans-rounded">
            AI Integrations
          </li>
        </ul>
      </div>
    </section>
  );
};

export default About;
