import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectTracker from "./ProjectTracker.jsx";
import { Sun, Moon, Monitor, Menu, X, Linkedin, Github, Mail } from "lucide-react";

import profilePic from "./assets/Aiden.png";

// for carousel
import photo1 from "./assets/photos/1.jpg";
import photo3 from "./assets/photos/3.jpg";
import photo4 from "./assets/photos/4.jpg";
import photo5 from "./assets/photos/5.jpg";
import photo6 from "./assets/photos/6.jpg";
import photo7 from "./assets/photos/7.jpg";
import photo9 from "./assets/photos/9.jpg";
import photo10 from "./assets/photos/10.jpg";
import photo11 from "./assets/photos/11.jpg";
import MusicPlayer from "./MusicPlayer.jsx";

// for theme switch
import PageBackground from "./PageBackground.jsx";
import homeLight from "./assets/backgrounds/home-light.png";
import homeDark from "./assets/backgrounds/home-dark.png";

// resume
import resume from "./assets/Aiden_Kelly_Resume_Sept_24.pdf";


export default function HomePage({ theme, setTheme }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const photoReel = [
    { src: photo1, alt: "Graduation" },
    { src: photo3, alt: "Modded Ipod" },
    { src: photo4, alt: "Mega Garlic" },
    { src: photo5, alt: "My Cat" },
    { src: photo6, alt: "Moma flic" },
    { src: photo7, alt: "CustomTeapot" },
    { src: photo9, alt: "Modded Switch" },
    { src: photo10, alt: "3Mil y/o Stalactite" },
    { src: photo11, alt: "Camp Trip" },
  ];

  // prevent body scrolling when sidebar is open on mobile
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <PageBackground theme={theme} lightImage={homeLight} darkImage={homeDark}>
      <div className="min-h-screen flex flex-col">
        {/* === Header === */}
        <header className="py-10 relative">
          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute left-2 top-1 md:hidden z-20 p-2 border border-latte-surface2 dark:border-mocha-surface2 rounded-lg bg-latte-surface0 dark:bg-mocha-surface0 shadow hover:bg-latte-surface1 dark:hover:bg-mocha-surface1"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <div className="max-w-2xl mx-auto text-center">
            <h1 className="inline-block text-5xl font-extrabold text-latte-mauve dark:text-mocha-mauve px-8 py-4 border-4 border-latte-mauve dark:border-mocha-mauve rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              Aiden&apos;s Website
            </h1>
          </div>
        </header>

        {/* === Main Content === */}
        <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* === Left column: Blurb + Carousel + Current Project === */}
            <div className="flex-1 flex flex-col space-y-10">
              {/* === Brief blurb === */}
              <div className="border border-latte-surface2 dark:border-mocha-surface2 rounded-2xl p-4 bg-latte-surface0 dark:bg-mocha-surface0 shadow-md">
                <h1 className="text-3xl font-semibold text-latte-mauve dark:text-mocha-mauve mb-4">
                  Hey, I’m Aiden Kelly!
                </h1>

                <img
                  src={profilePic}
                  alt="Aiden Kelly portrait"
                  className="float-left w-32 h-32 object-cover rounded-full border border-latte-overlay1 dark:border-mocha-overlay1 shadow-sm mr-4 mb-2"
                />

                <p className="text-latte-subtext1 dark:text-mocha-subtext1">
                  Welcome to my portfolio + personal site! I always wanted a way
                  to highlight elements about myself that I'd like to showcase
                  to the world, but most platforms like social media don't give
                  me full creativity to do what I'd like. So the best option for
                  me was to make a little website! <br /> <br />
                  I recently graduated from my undergraduate degree in
                  statistics from Cal Poly San Luis Obispo. <br /> <br />
                  I am currently in a gap year, I'm using this time to look for
                  jobs, explore projects, and learn things that I didn't have
                  the time to do in school.
                  <br /> <br />
                  I have shared a lot of the things I am working on or just
                  simply want to share that I think are cool and will hopefully
                  help people understand a little bit more about me.
                  <br /> <br />
                  Feel free to look around!
                </p>
                <div className="clear-both" />
              </div>

              {/* === Carousel + Current Project === */}
              <div className="flex justify-between gap-6 h-[15rem]">
                {/* === Photo carousel === */}
                <div className="w-1/2 relative border border-latte-surface2 dark:border-mocha-surface2 rounded-xl bg-latte-surface0 dark:bg-mocha-surface0 shadow-md overflow-hidden flex flex-col">
                  <div className="absolute top-0 left-0 w-full bg-latte-surface1/80 dark:bg-mocha-surface1/40 backdrop-blur-sm text-center text-xs text-latte-text dark:text-mocha-text py-1">
                    {photoReel[currentIndex].alt}
                  </div>
                  <img
                    src={photoReel[currentIndex].src}
                    alt={photoReel[currentIndex].alt}
                    className="w-full h-full object-cover"
                  />
                  {/* Arrows */}
                  <button
                    onClick={() =>
                      setCurrentIndex((prev) =>
                        prev === 0 ? photoReel.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-1 top-1/2 -translate-y-1/2 bg-latte-surface1 dark:bg-mocha-surface1 hover:bg-latte-surface2 dark:hover:bg-mocha-surface2 rounded-full p-1"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() =>
                      setCurrentIndex((prev) =>
                        prev === photoReel.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-latte-surface1 dark:bg-mocha-surface1 hover:bg-latte-surface2 dark:hover:bg-mocha-surface2 rounded-full p-1"
                  >
                    ›
                  </button>
                </div>

                {/* === Project Tracker === */}
                <div className="w-1/2 h-full">
                  <ProjectTracker />
                </div>
              </div>
            </div>

            {/* === Right column: Sidebar (Navigation + Music + Theme Switch) === */}
            <aside
              className={`fixed top-0 right-0 h-full w-64 
  bg-latte-surface0 dark:bg-mocha-surface0 
  border-l border-latte-surface2 dark:border-mocha-surface2 
  shadow-lg transform transition-transform duration-300 z-10
  ${menuOpen ? "translate-x-0" : "translate-x-full"} 
  md:translate-x-0 md:static md:h-auto 
  md:bg-transparent md:dark:bg-transparent md:shadow-none md:border-none`}
            >
              <div className="flex flex-col gap-6 p-4">
                {/* === Navigation box === */}
                <div className="border border-latte-surface2 dark:border-mocha-surface2 rounded-xl bg-latte-surface0 dark:bg-mocha-surface0 shadow-md p-4">
                  <nav className="flex flex-col gap-2 w-full">
                    <h2 className="text-xl font-semibold text-latte-mauve dark:text-mocha-mauve text-center">
                      Navigation
                    </h2>

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
                      href={resume}
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
                <div className="flex flex-col justify-evenly items-center border border-latte-surface3 dark:border-mocha-surface2 rounded-xl bg-latte-surface0 dark:bg-mocha-surface0 shadow-md">
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
          </div>
        </main>
        {/* === Footer === */}
        <footer className="border-t border-latte-surface2 dark:border-mocha-surface2 bg-latte-surface0 dark:bg-mocha-surface0 py-4 px-6 flex items-center justify-between text-sm text-latte-subtext1 dark:text-mocha-subtext1">
          <p>© {new Date().getFullYear()}. Aiden Kelly. All Rights Reserved.</p>

          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/aidenkelly47/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-latte-mauve dark:hover:text-mocha-mauve transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/arrowboy47"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-latte-mauve dark:hover:text-mocha-mauve transition"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:aidenquinkelly@gmail.com"
              className="hover:text-latte-mauve dark:hover:text-mocha-mauve transition"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </footer>
      </div>
    </PageBackground>
  );
}
