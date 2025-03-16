
const projects = [
  {
    title: "Project One",
    image: "./assets/project-1.png",
    github: "https://github.com/f20180039",
    liveDemo: "https://github.com/f20180039",
  },
  {
    title: "Project Two",
    image: "./assets/project-2.png",
    github: "https://github.com/f20180039",
    liveDemo: "https://github.com/f20180039",
  },
  {
    title: "Project Three",
    image: "./assets/project-3.png",
    github: "https://github.com/f20180039",
    liveDemo: "https://github.com/f20180039",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="ans-py-12 ans-text-center">
      <p className="ans-text-lg ans-font-medium">Browse My Recent</p>
      <h1 className="ans-text-3xl ans-font-bold">Projects</h1>
      <div className="ans-flex ans-flex-wrap ans-justify-center ans-gap-8 ans-mt-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="ans-bg-gray-800 ans-rounded-lg ans-shadow-md ans-p-6 ans-w-80"
          >
            <img
              src={project.image}
              alt={project.title}
              className="ans-rounded ans-mb-4 ans-w-full ans-h-48 ans-object-cover"
            />
            <h2 className="ans-text-xl ans-font-semibold ans-mb-2">
              {project.title}
            </h2>
            <div className="ans-flex ans-gap-4 ans-justify-center">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="ans-bg-Blue-500 ans-text-white ans-px-4 ans-py-2 ans-rounded"
              >
                GitHub
              </a>
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="ans-bg-Success-500 ans-text-White ans-px-4 ans-py-2 ans-rounded"
              >
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// const Projects = () => (
//   <div className="ans-p-8">
//     <h1 className="ans-text-3xl ans-font-bold">Projects</h1>
//     <ul className="ans-mt-4 ans-space-y-2">
//       <li>
//         Project 1 -{" "}
//         <a href="#" className="ans-text-blue-500">
//           View
//         </a>
//       </li>
//       <li>
//         Project 2 -{" "}
//         <a href="#" className="ans-text-blue-500">
//           View
//         </a>
//       </li>
//     </ul>
//   </div>
// );