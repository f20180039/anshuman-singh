import { motion } from "framer-motion";
import BackgroundManager from "../common/components/backgrounds/BackgroundManager";
import { PROJECTS, type Project } from "../data/projects";
import ProjectCard from "../features/projects/ProjectCard";

const recentWork = PROJECTS.filter((project) => project.caseStudy);
const earlierProjects = PROJECTS.filter((project) => !project.caseStudy);

function ProjectSection({
  heading,
  projects,
  indexOffset,
}: {
  heading: string;
  projects: Project[];
  /** Keeps the entrance stagger continuous across sections. */
  indexOffset: number;
}) {
  return (
    <section className="ans-flex ans-flex-col ans-gap-large">
      <h2 className="ans-text-4 ans-font-inter-1 ans-text-th-accent">
        {heading}
      </h2>
      <div className="ans-flex ans-flex-wrap ans-justify-center ans-gap-4 sm:ans-gap-8 ans-px-4">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={indexOffset + index}
          />
        ))}
      </div>
    </section>
  );
}

export default function Projects() {
  return (
    <BackgroundManager showGrid showGradient gradientIntensity="medium">
      <section
        id="projects"
        className="ans-flex ans-flex-col ans-gap-xlarge ans-py-xlarge ans-text-center ans-text-th-fg"
      >
        <motion.p
          className="ans-text-3 ans-font-inter-2 ans-text-th-secondary-fg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Browse My Recent Projects
        </motion.p>
        <ProjectSection
          heading="Recent work"
          projects={recentWork}
          indexOffset={0}
        />
        <ProjectSection
          heading="Earlier projects"
          projects={earlierProjects}
          indexOffset={recentWork.length}
        />
      </section>
    </BackgroundManager>
  );
}
