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
    <div className="ans-relative ans-isolate ans-min-h-full ans-w-full ans-overflow-hidden">
      <div className="ans-absolute ans-inset-0 ans-z-0 ans-pointer-events-none">
        {showGradient && <GradientOverlay intensity={gradientIntensity} />}
        {showGrid && <GridPattern />}
        {showDecorative && <DecorativeElements />}
      </div>
      <div className="ans-relative ans-z-10">{children}</div>
    </div>
  );
});

BackgroundManager.displayName = "BackgroundManager";

export default BackgroundManager;
