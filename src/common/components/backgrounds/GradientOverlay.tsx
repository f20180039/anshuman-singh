import { motion } from "framer-motion";
import { memo } from "react";
interface GradientOverlayProps {
  intensity?: "low" | "medium" | "high";
}

const GradientOverlay = memo(({ intensity = "low" }: GradientOverlayProps) => {
  const opacityMap = {
    low: 0.45,
    medium: 0.62,
    high: 0.78,
  };

  return (
    <>
      <motion.div
        className="aurora-field ans-absolute ans-inset-0 ans-z-0 ans-pointer-events-none"
        style={{ opacity: opacityMap[intensity] }}
        initial={{ opacity: 0 }}
        animate={{ opacity: opacityMap[intensity] }}
        transition={{ duration: 0.6 }}
        aria-hidden="true"
      />
      <div
        className="vignette-field ans-absolute ans-inset-0 ans-z-0 ans-pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="ans-absolute ans-inset-0 ans-z-0 ans-pointer-events-none ans-opacity-[0.055] ans-mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
    </>
  );
});

GradientOverlay.displayName = "GradientOverlay";

export default GradientOverlay;
