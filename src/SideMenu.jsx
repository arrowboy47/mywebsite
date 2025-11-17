import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Monitor,
  Menu,
  X,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import MusicPlayer from "./MusicPlayer.jsx";

export default function SideMenu({ setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <>
      {/* === Hamburger Menu Button (top-left corner, visible on all screens) === */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-4 left-4 z-50 p-2 border border-latte-surface2 dark:border-mocha-surface2 rounded-lg bg-latte-surface0 dark:bg-mocha-surface0 shadow hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition"
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* === Sidebar Drawer === */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 overflow-y-auto 
  bg-latte-surface0 dark:bg-mocha-surface0 
  border-l border-latte-surface2 dark:border-mocha-surface2 
  shadow-lg transform transition-transform duration-300 z-40
  ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col gap-6 p-4">
          {/* === Navigation box === */}
          <div className="border border-latte-surface2 dark:border-mocha-surface2 rounded-xl bg-latte-surface0 dark:bg-mocha-surface0 shadow-md p-4">
            <nav className="flex flex-col gap-2 w-full">
              <h2 className="text-xl font-semibold text-latte-mauve dark:text-mocha-mauve text-center">
                Navigation
              </h2>

              <Link
                to="/"
                className="w-full py-2 text-center border border-latte-surface2 dark:border-mocha-surface2 rounded-xl
                bg-latte-surface0 dark:bg-mocha-surface0
                hover:bg-latte-surface1 dark:hover:bg-mocha-surface1
                text-latte-text dark:text-mocha-text transition"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="w-full py-2 text-center border border-latte-surface2 dark:border-mocha-surface2 rounded-xl
                bg-latte-surface0 dark:bg-mocha-surface0
                hover:bg-latte-surface1 dark:hover:bg-mocha-surface1
                text-latte-text dark:text-mocha-text transition"
              >
                About Me
              </Link>

              <Link
                to="/blog"
                className="w-full py-2 text-center border border-latte-surface2 dark:border-mocha-surface2 rounded-xl
                bg-latte-surface0 dark:bg-mocha-surface0
                hover:bg-latte-surface1 dark:hover:bg-mocha-surface1
                text-latte-text dark:text-mocha-text transition"
              >
                Blog
              </Link>

              <Link
                to="/projects"
                className="w-full py-2 text-center border border-latte-surface2 dark:border-mocha-surface2 rounded-xl
                bg-latte-surface0 dark:bg-mocha-surface0
                hover:bg-latte-surface1 dark:hover:bg-mocha-surface1
                text-latte-text dark:text-mocha-text transition"
              >
                Projects
              </Link>

              {/* External links */}
              <a
                href="https://www.last.fm/user/SoyMilk123456"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 text-center border border-latte-surface2 dark:border-mocha-surface2 rounded-xl
                bg-latte-surface0 dark:bg-mocha-surface0
                hover:bg-latte-surface1 dark:hover:bg-mocha-surface1
                text-latte-text dark:text-mocha-text transition"
              >
                Last.fm
              </a>

              <a
                href="./src/assets/Aiden_Kelly_Resume_Sept_24.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 text-center border border-latte-surface2 dark:border-mocha-surface2 rounded-xl
                bg-latte-surface0 dark:bg-mocha-surface0
                hover:bg-latte-surface1 dark:hover:bg-mocha-surface1
                text-latte-text dark:text-mocha-text transition"
              >
                Resume
              </a>
            </nav>
          </div>

          {/* === Music player box === */}
          <div className="border border-latte-surface2 dark:border-mocha-surface2 rounded-xl bg-latte-surface0 dark:bg-mocha-surface0 shadow-md p-3">
            <MusicPlayer />
          </div>

          {/* === Theme toggle === */}
          <div className="flex flex-col justify-evenly items-center border border-latte-surface2 dark:border-mocha-surface2 rounded-xl bg-latte-surface0 dark:bg-mocha-surface0 shadow-md p-3">
            <h2 className="text-xl font-semibold text-latte-mauve dark:text-mocha-mauve text-center">
              Theme Switch
            </h2>
            <button
              onClick={() => setTheme("light")}
              className="flex items-center gap-2 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 rounded-lg px-2 py-1 transition"
            >
              <Sun className="w-5 h-5 text-latte-yellow dark:text-mocha-yellow" />
              <span className="text-sm text-latte-text dark:text-mocha-text">
                Light
              </span>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className="flex items-center gap-2 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 rounded-lg px-2 py-1 transition"
            >
              <Moon className="w-5 h-5 text-latte-blue dark:text-mocha-blue" />
              <span className="text-sm text-latte-text dark:text-mocha-text">
                Dark
              </span>
            </button>
            <button
              onClick={() => setTheme("system")}
              className="flex items-center gap-2 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 rounded-lg px-2 py-1 transition"
            >
              <Monitor className="w-5 h-5 text-latte-mauve dark:text-mocha-mauve" />
              <span className="text-sm text-latte-text dark:text-mocha-text">
                System
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* === Optional dim background overlay === */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
        />
      )}
    </>
  );
}
