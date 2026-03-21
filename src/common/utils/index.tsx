import { useEffect, useRef, useState } from "react";

export function getYearsOfExperience(): string {
  const start = new Date(2022, 6, 4); // July 4, 2022
  const now = new Date();
  const years =
    (now.getTime() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  const rounded = Math.round(years * 2) / 2; // round to nearest 0.5
  return `${rounded}`;
}

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}
