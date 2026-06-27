import { ReactNode } from "react";

export type GeometryType = "box" | "sphere" | "torus" | "cone" | "cylinder";

export interface RotatingShapeProps {
  position: [number, number, number];
  geometry: GeometryType;
  color: string;
  speed?: number;
  scale?: number;
}

export interface TechSphereProps {
  position?: [number, number, number];
  color?: string;
  distort?: number;
  speed?: number;
}

export interface ParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  opacity?: number;
  speed?: number;
  radius?: number;
}

export interface GridFloorProps {
  size?: number;
  divisions?: number;
  color?: string;
  opacity?: number;
  height?: number;
}

export interface Scene3DProps {
  children?: ReactNode;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableZoom?: boolean;
  enablePan?: boolean;
  minDistance?: number;
  maxDistance?: number;
  environment?: "night" | "sunset" | "dawn" | "warehouse";
}

export interface Canvas3DWrapperProps {
  children: ReactNode;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
  className?: string;
  fallback?: ReactNode;
}

export interface Loading3DProps {
  message?: string;
  subMessage?: string;
}
