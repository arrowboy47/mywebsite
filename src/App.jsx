import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import AboutPage from "./AboutPage.jsx";
import BlogPage from "./BlogPage.jsx";
import ProjectsPage from "./ProjectsPage.jsx";
import PostPage from "./PostPage.jsx";

export default function App() {
  const [theme, setTheme] = useState("system");

  // Apply theme globally
  useEffect(() => {
    const applyTheme = () => {
      if (theme === "system") {
        const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
        document.documentElement.classList.toggle("dark", darkQuery.matches);

        const handleChange = (e) =>
          document.documentElement.classList.toggle("dark", e.matches);
        darkQuery.addEventListener("change", handleChange);

        return () => darkQuery.removeEventListener("change", handleChange);
      } else {
        document.documentElement.classList.toggle("dark", theme === "dark");
      }
    };

    applyTheme();
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={<HomePage theme={theme} setTheme={setTheme} />} />
      <Route path="/about" element={<AboutPage theme={theme} setTheme={setTheme} />} />
      <Route path="/blog" element={<BlogPage theme={theme} setTheme={setTheme} />} />
      <Route path="/blog/:slug" element={<PostPage theme={theme} />} />
      <Route path="/projects" element={<ProjectsPage theme={theme} setTheme={setTheme} />} />
    </Routes>
  );
}