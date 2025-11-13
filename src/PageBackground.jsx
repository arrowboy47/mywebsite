import { useEffect, useState } from "react";

/**
 * A reusable wrapper that automatically switches background images
 * based on light/dark/system theme settings.
 *
 * Props:
 * - theme: string ("light", "dark", or "system")
 * - lightImage: string (URL or imported asset)
 * - darkImage: string (URL or imported asset)
 * - children: React elements to render inside
 */
export default function PageBackground({ theme, lightImage, darkImage, children }) {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateMode = () => {
      if (theme === "system") {
        setIsDarkMode(darkQuery.matches);
      } else {
        setIsDarkMode(theme === "dark");
      }
    };

    updateMode();

    const handleChange = (e) => {
      if (theme === "system") setIsDarkMode(e.matches);
    };

    darkQuery.addEventListener("change", handleChange);
    return () => darkQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const backgroundImage = isDarkMode ? darkImage : lightImage;

  return (
    <div
      className="min-h-screen flex flex-col text-latte-text dark:text-mocha-text transition-[background-image] duration-500"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Page content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
