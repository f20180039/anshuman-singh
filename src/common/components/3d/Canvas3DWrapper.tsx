import { memo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ErrorBoundary3D } from "./ErrorBoundary3D";
import type { Canvas3DWrapperProps } from "./types";

const Canvas3DWrapper = ({
  children,
  camera = { position: [0, 2, 8], fov: 60 },
  className = "ans-w-full ans-h-full",
  fallback,
}: Canvas3DWrapperProps) => {
  return (
    <ErrorBoundary3D>
      <Canvas
        camera={camera}
        className={className}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={fallback || null}>
          {children}
        </Suspense>
      </Canvas>
    </ErrorBoundary3D>
  );
};

Canvas3DWrapper.displayName = "Canvas3DWrapper";

export default memo(Canvas3DWrapper);
