import { memo, ReactNode, Suspense, lazy, useEffect, useState } from "react";
import GridPattern from "./GridPattern";
import GradientOverlay from "./GradientOverlay";
import DecorativeElements from "./DecorativeElements";

// three.js constellation lives in its own lazy chunk — only fetched when a page
// actually mounts an animated background, and only after first paint.
const ParticleBackground = lazy(() => import("./ParticleBackground"));

interface BackgroundManagerProps {
  children: ReactNode;
  showGrid?: boolean;
  showGradient?: boolean;
  showDecorative?: boolean;
  /** Render the animated three.js constellation behind the page. */
  showParticles?: boolean;
  gradientIntensity?: "low" | "medium" | "high";
}

/** True unless the user asked for reduced motion. */
const useAllowMotion = (): boolean => {
  const [allow, setAllow] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllow(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return allow;
};

/**
 * Defers a truthy value until the browser is idle after first paint, with a
 * hard timeout fallback so a busy main thread can't starve the mount.
 */
const useDeferredMount = (enabled: boolean, maxDelay = 1200): boolean => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: maxDelay });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(id);
  }, [enabled, maxDelay]);
  return ready;
};

/**
 * Manages background effects for pages
 * Coordinates grid patterns, gradients, decorative elements, and the optional
 * animated three.js constellation.
 */
const BackgroundManager = memo(({
  children,
  showGrid = true,
  showGradient = true,
  showDecorative = true,
  showParticles = true,
  gradientIntensity = "low",
}: BackgroundManagerProps) => {
  const allowMotion = useAllowMotion();
  const particlesEnabled = showParticles && allowMotion;
  const mountParticles = useDeferredMount(particlesEnabled);

  return (
    <div className="ans-relative ans-isolate ans-min-h-full ans-w-full ans-overflow-hidden">
      <div className="ans-absolute ans-inset-0 ans-z-0 ans-pointer-events-none">
        {showGradient && <GradientOverlay intensity={gradientIntensity} />}
        {particlesEnabled && mountParticles && (
          <div className="ans-absolute ans-inset-0 ans-opacity-70">
            <Suspense fallback={null}>
              <ParticleBackground />
            </Suspense>
          </div>
        )}
        {showGrid && <GridPattern />}
        {showDecorative && <DecorativeElements />}
      </div>
      <div className="ans-relative ans-z-10">{children}</div>
    </div>
  );
});

BackgroundManager.displayName = "BackgroundManager";

export default BackgroundManager;
