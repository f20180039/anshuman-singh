import { FaLinkedin, FaGithub } from "react-icons/fa";
import Profile from "../assets/profile-pic-2.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="ans-flex ans-flex-col ans-w-full md:ans-flex-row ans-items-center ans-justify-center ans-text-center md:ans-text-left ans-py-20 ans-bg-Gray-50 ans-px-6 md:ans-px-20">
      <div className="ans-flex ans-flex-col ans-items-center md:ans-items-start ans-w-full md:ans-w-1/2 ans-gap-4">
        <img
          src={Profile}
          alt="Anshuman Singh"
          className="ans-w-48 ans-h-48 ans-rounded-full ans-shadow-lg ans-object-cover"
        />
        <h1 className="ans-text-4xl ans-font-bold ans-text-Blue-600">
          Anshuman Singh
        </h1>
        <p className="ans-text-lg ans-text-Gray-500">
          Frontend Engineer at HealthPlix Technologies
        </p>

        {/* Social Links */}
        <div className="ans-flex ans-gap-4 ans-mt-4">
          <a
            href="https://linkedin.com/in/anshuman-singh-4546b5275"
            target="_blank"
            rel="noopener noreferrer"
            className="ans-text-Blue-600 ans-text-3xl hover:ans-text-Blue-800"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/f20180039"
            target="_blank"
            rel="noopener noreferrer"
            className="ans-text-Gray-800 ans-text-3xl hover:ans-text-Gray-900"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Right: Bio & Actions */}
      <div className="ans-flex ans-flex-col ans-w-full md:ans-w-1/2 ans-max-w-2xl">
        <p className="ans-text-lg ans-text-Gray-700 ans-leading-relaxed">
          Experienced frontend engineer skilled in{" "}
          <strong>
            React, TypeScript, AI integrations, and performance optimization
          </strong>
          . Developed AI-powered medical documentation tools, enhanced
          electronic medical records (EMR), and improved{" "}
          <strong>healthcare efficiency</strong> through seamless UI/UX.
        </p>

        {/* Buttons */}
        <div className="ans-flex ans-flex-col sm:ans-flex-row ans-gap-4">
          <a
            href="/assets/AnshumanSingh-FE-Resume.pdf"
            download
            className="ans-bg-Blue-500 ans-text-White ans-px-6 ans-py-2 ans-rounded ans-shadow-md hover:ans-bg-Blue-600 ans-text-lg ans-text-center"
          >
            Download Resume
          </a>
          <Link
            to="/projects"
            className="ans-bg-Success-500 ans-text-White ans-px-6 ans-py-2 ans-rounded ans-shadow-md hover:ans-bg-Success-600 ans-text-lg ans-text-center"
          >
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
