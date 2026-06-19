export const THEME_GRADIENTS = {
  light: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  dark: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
  ocean: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
  forest: "linear-gradient(135deg, #059669 0%, #047857 100%)",
  sunset: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
} as const;

export type ThemeGradient = keyof typeof THEME_GRADIENTS;
