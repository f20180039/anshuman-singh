import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaCertificate } from "react-icons/fa";
import BackgroundManager from "../common/components/backgrounds/BackgroundManager";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  verifyUrl: string;
  description: string;
}

const certificates: Certificate[] = [
  {
    title: "GenAI for Professionals",
    issuer: "Hack2Skill",
    date: "2025",
    verifyUrl: "https://certificate.hack2skill.com/verify/2026H2S05GCGENAIAPACC1-P01309",
    description: "Certification in Generative AI, covering AI-assisted development, prompt engineering, and modern AI workflows."
  },
];

const Certificates = () => {
  return (
    <BackgroundManager showGrid showGradient gradientIntensity="medium">
      <section className="ans-w-full ans-min-h-screen ans-py-xxlarge ans-px-6 sm:ans-px-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="ans-max-w-6xl ans-mx-auto"
        >
          {/* Header */}
          <div className="ans-text-center ans-mb-xlarge">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="ans-inline-flex ans-items-center ans-justify-center ans-w-16 ans-h-16 ans-bg-th-accent/10 ans-rounded-full ans-mb-4"
            >
              <FaCertificate className="ans-text-7 ans-text-th-accent" />
            </motion.div>
            <h1 className="ans-text-6 ans-font-inter-1 ans-text-th-accent retro-glow ans-mb-3">
              Certificates & Achievements
            </h1>
            <p className="ans-text-3 ans-text-th-muted-fg ans-max-w-2xl ans-mx-auto">
              Professional certifications and learning achievements
            </p>
          </div>

          {/* Certificates Grid */}
          <div className="ans-grid ans-grid-cols-1 md:ans-grid-cols-2 ans-gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="ans-bg-th-card ans-rounded-2xl ans-p-6 ans-shadow-lg ans-border ans-border-th-border hover:ans-border-th-accent/50 ans-transition-all ans-duration-300"
              >
                {/* Certificate Header */}
                <div className="ans-flex ans-items-start ans-justify-between ans-mb-4">
                  <div className="ans-flex-1">
                    <h3 className="ans-text-4 ans-font-inter-1 ans-text-th-fg ans-mb-2">
                      {cert.title}
                    </h3>
                    <p className="ans-text-2 ans-text-th-accent ans-font-semibold">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="ans-bg-th-accent/10 ans-rounded-lg ans-px-3 ans-py-1">
                    <span className="ans-text-2 ans-text-th-accent ans-font-inter-1">
                      {cert.date}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="ans-text-2 ans-text-th-secondary-fg ans-mb-4 ans-leading-relaxed">
                  {cert.description}
                </p>

                {/* Verify Button */}
                <motion.a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ans-inline-flex ans-items-center ans-gap-2 ans-bg-th-accent ans-text-White ans-px-4 ans-py-2 ans-rounded-lg ans-text-2 ans-font-semibold hover:ans-bg-th-accent/90 ans-transition-colors"
                >
                  <span>Verify Certificate</span>
                  <FaExternalLinkAlt className="ans-text-xs" />
                </motion.a>
              </motion.div>
            ))}
          </div>

          {/* Additional Achievements Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="ans-mt-xlarge"
          >
            <h2 className="ans-text-5 ans-font-inter-1 ans-text-th-accent ans-mb-6 ans-text-center">
              Academic Achievements
            </h2>
            <div className="ans-bg-th-card ans-rounded-2xl ans-p-8 ans-shadow-lg ans-border ans-border-th-border">
              <ul className="ans-space-y-3">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="ans-flex ans-items-start ans-gap-3 ans-text-2 ans-text-th-secondary-fg"
                >
                  <span className="ans-text-th-accent ans-mt-1">•</span>
                  <span>Secured an <strong className="ans-text-th-fg">AIR of 8358</strong> in IIT-JEE Mains 2018 from among 1.2 million candidates.</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="ans-flex ans-items-start ans-gap-3 ans-text-2 ans-text-th-secondary-fg"
                >
                  <span className="ans-text-th-accent ans-mt-1">•</span>
                  <span>Selected for Kishore Vaigyanik Protsahan Yojana Scholarship (KVPY) 2018 with an <strong className="ans-text-th-fg">AIR of 900</strong>.</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="ans-flex ans-items-start ans-gap-3 ans-text-2 ans-text-th-secondary-fg"
                >
                  <span className="ans-text-th-accent ans-mt-1">•</span>
                  <span><strong className="ans-text-th-fg">National Top 1%</strong> in National Standard Examinations in Physics, Chemistry, and Astronomy 2017-18.</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="ans-flex ans-items-start ans-gap-3 ans-text-2 ans-text-th-secondary-fg"
                >
                  <span className="ans-text-th-accent ans-mt-1">•</span>
                  <span>Selected as one of the top 1000 candidates in UP Science Talent Search Examination and received an <strong className="ans-text-th-fg">INR 48,000</strong> scholarship.</span>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </BackgroundManager>
  );
};

export default Certificates;
