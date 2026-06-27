import { useState, useEffect } from "react";

interface Responsive3DConfig {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  particleCount: number;
  enableShadows: boolean;
  enableAntialiasing: boolean;
  pixelRatio: number;
}

/**
 * Hook to provide responsive 3D configuration
 * Automatically adjusts quality based on device
 */
export const useResponsive3D = (): Responsive3DConfig => {
  const [config, setConfig] = useState<Responsive3DConfig>(() => {
    const width = window.innerWidth;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    return {
      isMobile,
      isTablet,
      isDesktop,
      particleCount: isMobile ? 50 : isTablet ? 100 : 150,
      enableShadows: isDesktop,
      enableAntialiasing: !isMobile,
      pixelRatio: isMobile ? 1 : Math.min(window.devicePixelRatio, 2),
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      setConfig({
        isMobile,
        isTablet,
        isDesktop,
        particleCount: isMobile ? 50 : isTablet ? 100 : 150,
        enableShadows: isDesktop,
        enableAntialiasing: !isMobile,
        pixelRatio: isMobile ? 1 : Math.min(window.devicePixelRatio, 2),
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return config;
};
