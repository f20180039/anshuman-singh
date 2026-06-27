import { memo } from "react";
import type { Loading3DProps } from "./types";

const Loading3D = ({
  message = "Loading 3D Scene...",
  subMessage = "Initializing WebGL Renderer",
}: Loading3DProps) => {
  return (
    <div className="ans-flex ans-items-center ans-justify-center ans-h-full">
      <div className="ans-text-center">
        <div className="ans-text-4xl ans-font-bold ans-text-cyan-400 ans-animate-pulse">
          {message}
        </div>
        <div className="ans-text-lg ans-text-gray-400 ans-mt-4">
          {subMessage}
        </div>
      </div>
    </div>
  );
};

Loading3D.displayName = "Loading3D";

export default memo(Loading3D);
