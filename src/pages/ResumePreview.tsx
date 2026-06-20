import { motion } from "framer-motion";
import { FaDownload, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Resume from "../assets/AnshumanSingh-FE-Resume.pdf";
import BackgroundManager from "../common/components/backgrounds/BackgroundManager";

const ResumePreview = () => {
  const navigate = useNavigate();

  return (
    <BackgroundManager showGrid showGradient gradientIntensity="low">
      <div className="ans-flex ans-flex-col ans-w-full ans-min-h-[90vh] ans-py-6 ans-px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="ans-flex ans-flex-col sm:ans-flex-row ans-items-center ans-justify-between ans-mb-6 ans-gap-4"
        >
          <motion.button
            onClick={() => navigate(-1)}
            className="ans-flex ans-items-center ans-gap-2 ans-bg-th-secondary ans-text-White ans-px-4 ans-py-2 ans-rounded-lg ans-shadow-md ans-text-2 hover:ans-bg-th-secondary/80"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft />
            <span>Back</span>
          </motion.button>

          <motion.h1
            className="ans-text-4 ans-font-inter-1 ans-text-th-accent retro-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Resume Preview
          </motion.h1>

          <motion.a
            href={Resume}
            download
            className="ans-flex ans-items-center ans-gap-2 ans-bg-th-accent ans-text-White ans-px-4 ans-py-2 ans-rounded-lg ans-shadow-md ans-text-2 hover:ans-bg-th-accent/80"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload />
            <span>Download PDF</span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="ans-flex-1 ans-w-full ans-bg-White ans-rounded-lg ans-shadow-2xl ans-overflow-hidden"
        >
          <iframe
            src={Resume}
            className="ans-w-full ans-h-full ans-min-h-[80vh]"
            title="Resume Preview"
            style={{ border: "none" }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="ans-text-center ans-text-2 ans-text-th-muted-fg ans-mt-4"
        >
          Having trouble viewing?
          <a
            href={Resume}
            download
            className="ans-text-th-accent hover:ans-underline ans-ml-1"
          >
            Download the PDF instead
          </a>
        </motion.p>
      </div>
    </BackgroundManager>
  );
};

export default ResumePreview;
