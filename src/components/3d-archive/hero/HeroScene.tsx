import { memo, Suspense, lazy } from "react";
import Canvas3DWrapper from "../../../common/components/3d/Canvas3DWrapper";
import Scene3D from "../../../common/components/3d/Scene3D";
import { usePrefersReducedMotion, useResponsive3D } from "../shared/hooks";
import FloatingGeometry from "./FloatingGeometry";
import ParticleField from "./ParticleField";

// Fallback component (CSS-only version)
const StaticHeroFallback = lazy(() => import("./StaticHeroFallback"));

interface HeroSceneProps {
  className?: string;
}

/**
 * Main Hero 3D Scene
 * - Floating geometric object with mouse parallax
 * - Ambient particle field
 * - Respects reduced motion preferences
 * - Mobile-optimized
 */
const HeroScene = memo(({ className = "" }: HeroSceneProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { isMobile, particleCount } = useResponsive3D();

  // Show static fallback if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <Suspense fallback={null}>
        <StaticHeroFallback />
      </Suspense>
    );
  }

  return (
    <div
      className={`ans-absolute ans-inset-0 ans-pointer-events-none ${className}`}
      style={{ opacity: 0.8 }}
    >
      <Canvas3DWrapper
        camera={{ position: [0, 0, 8], fov: 50 }}
        className="ans-w-full ans-h-full"
      >
        <Scene3D
          autoRotate={false}
          enableZoom={false}
          enablePan={false}
          environment="night"
        >
          {/* Ambient lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />

          {/* Main floating object */}
          <FloatingGeometry
            mouseParallaxEnabled={!isMobile}
            autoRotateSpeed={0.2}
          />

          {/* Particle field */}
          <ParticleField
            count={particleCount}
            radius={12}
            color="#2E90FA"
            size={0.02}
            speed={0.0003}
          />

          {/* Additional subtle rim light */}
          <pointLight
            position={[-5, 3, -5]}
            intensity={0.5}
            color="#6172F3"
          />
        </Scene3D>
      </Canvas3DWrapper>
    </div>
  );
});

HeroScene.displayName = "HeroScene";

export default HeroScene;
