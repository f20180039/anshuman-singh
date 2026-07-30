import { useState } from "react";
import { motion } from "framer-motion";
import { FaDownload, FaArrowLeft, FaPrint } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  C_RESUME_SINGLE_COL_URL,
  C_RESUME_MULTI_COL_URL,
} from "../common/constants";
import BackgroundManager from "../common/components/backgrounds/BackgroundManager";

type ResumeLayout = "single" | "multi";

const RESUME_URLS: Record<ResumeLayout, string> = {
  single: C_RESUME_SINGLE_COL_URL,
  multi: C_RESUME_MULTI_COL_URL,
};

const LAYOUT_OPTIONS: { key: ResumeLayout; label: string }[] = [
  { key: "single", label: "Single Column" },
  { key: "multi", label: "Two Column" },
];

const ResumePreview = () => {
  const navigate = useNavigate();
  const [layout, setLayout] = useState<ResumeLayout>("single");
  const activeResume = RESUME_URLS[layout];

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

          <div className="ans-flex ans-gap-2">
            <motion.a
              href={activeResume}
              download
              className="ans-flex ans-items-center ans-gap-2 ans-bg-th-accent ans-text-White ans-px-4 ans-py-2 ans-rounded-lg ans-shadow-md ans-text-2 hover:ans-bg-th-accent/80"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload />
              <span>Download</span>
            </motion.a>

            <motion.button
              onClick={() => window.print()}
              className="ans-flex ans-items-center ans-gap-2 ans-bg-th-secondary ans-text-White ans-px-4 ans-py-2 ans-rounded-lg ans-shadow-md ans-text-2 hover:ans-bg-th-secondary/80"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPrint />
              <span>Print</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Layout toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="ans-flex ans-justify-center ans-mb-4"
        >
          <div
            role="tablist"
            aria-label="Resume layout"
            className="ans-inline-flex ans-gap-1 ans-bg-th-surface-alt ans-p-1 ans-rounded-lg ans-shadow-inner"
          >
            {LAYOUT_OPTIONS.map((option) => {
              const isActive = layout === option.key;
              return (
                <button
                  key={option.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setLayout(option.key)}
                  className={`ans-px-4 ans-py-2 ans-rounded-md ans-text-2 ans-transition-colors ${
                    isActive
                      ? "ans-bg-th-accent ans-text-White ans-shadow-md"
                      : "ans-text-th-secondary-fg hover:ans-text-th-fg"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          key={layout}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="ans-flex-1 ans-w-full ans-bg-White ans-rounded-lg ans-shadow-2xl ans-overflow-hidden"
        >
          <iframe
            src={activeResume}
            className="ans-w-full ans-h-full ans-min-h-[80vh]"
            title={`Resume Preview - ${layout === "single" ? "Single Column" : "Two Column"}`}
            style={{ border: "none" }}
          />
        </motion.div>
      </div>
    </BackgroundManager>
  );
};

export default ResumePreview;
