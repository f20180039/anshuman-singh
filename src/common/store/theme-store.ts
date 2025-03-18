import { create } from "zustand";

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: localStorage.getItem("theme") === "dark",
  toggleTheme: () =>
    set((state) => {
      const newTheme = !state.isDarkMode;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newTheme);
      return { isDarkMode: newTheme };
    }),
}));
