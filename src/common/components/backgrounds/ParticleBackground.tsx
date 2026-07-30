import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useThemeStore } from "../../store/theme-store";
import ConstellationField from "./ConstellationField";

/** Reads the live `--th-accent` CSS variable (space-separated RGB) as a hex color. */
const readAccentColor = (): string => {
  if (typeof window === "undefined") return "#67e8f9";
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--th-accent")
    .trim();
  const parts = raw.split(/\s+/).map(Number);
  if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
    const [r, g, b] = parts;
    return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
  }
  return "#67e8f9";
};

/**
 * Full-bleed three.js constellation background. Lazy-loaded and mounted after
 * first paint (see BackgroundManager) so three.js never blocks initial render.
 * Re-reads the accent color whenever the theme changes.
 */
const ParticleBackground = () => {
  const theme = useThemeStore((s) => s.theme);
  const [color, setColor] = useState<string>(readAccentColor);

  useEffect(() => {
    // Theme swap updates the CSS var on the next frame; read it just after.
    const id = requestAnimationFrame(() => setColor(readAccentColor()));
    return () => cancelAnimationFrame(id);
  }, [theme]);

  return (
    <Canvas
      className="ans-h-full ans-w-full"
      camera={{ position: [0, 0, 12], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <ConstellationField color={color} />
    </Canvas>
  );
};

export default ParticleBackground;
