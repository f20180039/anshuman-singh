import { create } from "zustand";

export type Theme = "light" | "dark" | "ocean" | "forest" | "sunset";

export const THEMES: { id: Theme; label: string; color: string }[] = [
  { id: "light", label: "Light", color: "#ffffff" },
  { id: "dark", label: "Dark", color: "#101828" },
  { id: "ocean", label: "Ocean", color: "#0ea5e9" },
  { id: "forest", label: "Forest", color: "#4ade80" },
  { id: "sunset", label: "Sunset", color: "#fb923c" },
];

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

function applyTheme(theme: Theme) {
  const html = document.documentElement;

  // Remove old theme classes/attributes
  html.classList.remove("dark");
  html.removeAttribute("data-theme");

  // Apply new theme
  if (theme === "dark") {
    html.classList.add("dark");
  } else if (theme !== "light") {
    html.setAttribute("data-theme", theme);
  }

  localStorage.setItem("theme", theme);
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem("theme") as Theme) || "light",
  setTheme: (theme: Theme) => {
    applyTheme(theme);
    set({ theme });
  },
}));
