import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

/**
 * Custom hook for parallax scroll effects
 * @param distance - Distance to move element (in pixels)
 * @returns MotionValue for y transform
 */
export function useParallax(distance = 100): MotionValue<number> {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, distance]);
  return y;
}

/**
 * Hook for parallax with element-specific scroll progress
 * @param distance - Distance to move element
 * @returns Object with ref and y MotionValue
 */
export function useParallaxRef(distance = 100) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return { ref, y };
}
