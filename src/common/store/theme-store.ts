import { create } from "zustand";

export type Theme = "dark" | "light" | "matrix" | "cyberpunk";

export const THEMES: { id: Theme; label: string; color: string }[] = [
  { id: "dark", label: "Dark", color: "#07111f" },
  { id: "light", label: "Light", color: "#f8fbff" },
  { id: "matrix", label: "Matrix", color: "#a3e635" },
  { id: "cyberpunk", label: "Cyberpunk", color: "#f72585" },
];

export function isTheme(value: string | null): value is Theme {
  return THEMES.some((theme) => theme.id === value);
}

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

function applyTheme(theme: Theme) {
  const html = document.documentElement;

  // Batch DOM updates in a single animation frame for better performance
  requestAnimationFrame(() => {
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
  });
}

export const useThemeStore = create<ThemeState>((set) => {
  const savedTheme = localStorage.getItem("theme") as Theme | null;
  const initialTheme = isTheme(savedTheme) ? savedTheme : "dark";

  applyTheme(initialTheme);

  return {
    theme: initialTheme,
    setTheme: (theme: Theme) => {
      applyTheme(theme);
      set({ theme });
    },
  };
});
