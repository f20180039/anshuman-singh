import { motion } from "framer-motion";
import { memo } from "react";
import { useThemeStore } from "../../store/theme-store";
import { THEME_GRADIENTS } from "../../constants/theme-gradients";

interface GradientOverlayProps {
  intensity?: "low" | "medium" | "high";
}

/**
 * Animated gradient overlay that adapts to current theme
 * Provides depth and visual interest to backgrounds
 */
const GradientOverlay = memo(({ intensity = "low" }: GradientOverlayProps) => {
  const { theme } = useThemeStore();

  const opacityMap = {
    low: 0.08,
    medium: 0.15,
    high: 0.25,
  };

  const gradient =
    THEME_GRADIENTS[theme as keyof typeof THEME_GRADIENTS] ||
    THEME_GRADIENTS.light;

  return (
    <>
      {/* Radial gradient overlay */}
      <motion.div
        className="ans-absolute ans-inset-0 -ans-z-10 ans-pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${gradient.split("linear-gradient(135deg, ")[1]?.split(",")[0]} 0%, transparent 50%),
                       radial-gradient(circle at 70% 80%, ${gradient.split(", ")[1]?.split(" ")[0]} 0%, transparent 50%)`,
          opacity: opacityMap[intensity],
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: opacityMap[intensity] }}
        transition={{ duration: 0.6 }}
        aria-hidden="true"
      />
      {/* Subtle noise texture */}
      <div
        className="ans-absolute ans-inset-0 -ans-z-10 ans-pointer-events-none ans-opacity-[0.02]"
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
