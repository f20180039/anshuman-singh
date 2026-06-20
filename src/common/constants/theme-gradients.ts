export const THEME_GRADIENTS = {
  dark: "linear-gradient(135deg, #050b16 0%, #10223a 52%, #5eead4 100%)",
  light: "linear-gradient(135deg, #f8fbff 0%, #dbeafe 48%, #fde68a 100%)",
  matrix: "linear-gradient(135deg, #031307 0%, #166534 48%, #a3e635 100%)",
  cyberpunk: "linear-gradient(135deg, #1b0635 0%, #7e22ce 48%, #f72585 100%)",
} as const;

export type ThemeGradient = keyof typeof THEME_GRADIENTS;
