import { memo } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import type { Scene3DProps } from "./types";

const Scene3D = ({
  children,
  autoRotate = true,
  autoRotateSpeed = 0.5,
  enableZoom = true,
  enablePan = true,
  minDistance = 3,
  maxDistance = 20,
  environment = "night",
}: Scene3DProps) => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#ffffff"
      />

      {/* Environment */}
      <Environment preset={environment} />

      {/* Child components (3D objects) */}
      {children}

      {/* Controls */}
      <OrbitControls
        enableZoom={enableZoom}
        enablePan={enablePan}
        minDistance={minDistance}
        maxDistance={maxDistance}
        autoRotate={autoRotate}
        autoRotateSpeed={autoRotateSpeed}
      />
    </>
  );
};

Scene3D.displayName = "Scene3D";

export default memo(Scene3D);
