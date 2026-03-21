import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Apply saved theme on initial load (before React renders)
const savedTheme = localStorage.getItem("theme") || "light";
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "light");
}

const html = document.documentElement;
if (savedTheme === "dark") {
  html.classList.add("dark");
} else if (savedTheme !== "light") {
  html.setAttribute("data-theme", savedTheme);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
