import { useState, useEffect } from "react";

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Hook for smooth mouse parallax effect
 * Returns normalized rotation values for 3D objects
 */
export const useMouseParallax = (
  sensitivity: number = 0.05,
  enabled: boolean = true
): MousePosition => {
  const [rotation, setRotation] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) {
      setRotation({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -0.5 to 0.5 range, then apply sensitivity
      const x = (e.clientY / window.innerHeight - 0.5) * sensitivity;
      const y = (e.clientX / window.innerWidth - 0.5) * sensitivity;

      setRotation({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [sensitivity, enabled]);

  return rotation;
};
