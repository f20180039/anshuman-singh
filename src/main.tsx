import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Ensure default mode is light
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "light");
}

const isDarkMode = localStorage.getItem("theme") === "dark";
if (isDarkMode) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
