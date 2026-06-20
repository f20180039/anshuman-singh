import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { isTheme } from "./common/store/theme-store";

// Apply saved theme on initial load (before React renders)
const savedTheme = localStorage.getItem("theme");
const initialTheme = isTheme(savedTheme) ? savedTheme : "dark";
localStorage.setItem("theme", initialTheme);

const html = document.documentElement;
if (initialTheme === "dark") {
  html.classList.add("dark");
} else if (initialTheme !== "light") {
  html.setAttribute("data-theme", initialTheme);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
