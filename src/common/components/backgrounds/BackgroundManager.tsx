import { memo, ReactNode } from "react";
import GridPattern from "./GridPattern";
import GradientOverlay from "./GradientOverlay";
import DecorativeElements from "./DecorativeElements";

interface BackgroundManagerProps {
  children: ReactNode;
  showGrid?: boolean;
  showGradient?: boolean;
  showDecorative?: boolean;
  gradientIntensity?: "low" | "medium" | "high";
}

/**
 * Manages background effects for pages
 * Coordinates grid patterns, gradients, and decorative elements
 */
const BackgroundManager = memo(({
  children,
  showGrid = true,
  showGradient = true,
  showDecorative = true,
  gradientIntensity = "low",
}: BackgroundManagerProps) => {
  return (
    <div className="ans-relative ans-w-full ans-min-h-full">
      {showGrid && <GridPattern />}
      {showGradient && <GradientOverlay intensity={gradientIntensity} />}
      {showDecorative && <DecorativeElements />}
      {children}
    </div>
  );
});

BackgroundManager.displayName = "BackgroundManager";

export default BackgroundManager;
