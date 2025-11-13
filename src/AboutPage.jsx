import SideMenu from "./SideMenu.jsx";

import {
  SiPython,
  SiR,
  SiPostgresql,
  SiLinux,
  SiJavascript,
  SiHtml5,
  SiDocker,
  SiMongodb,
  SiReact,
  SiGit,
  SiTailwindcss,
} from "react-icons/si";
import { Link } from "react-router-dom";
import { ArrowLeft, Linkedin, Github, Mail } from "lucide-react";

import PageBackground from "./PageBackground.jsx";
import aboutLight from "./assets/backgrounds/about-light.png";
import aboutDark from "./assets/backgrounds/about-dark.png";

export default function AboutPage({ theme, setTheme }) {
  return (
    <PageBackground theme={theme} lightImage={aboutLight} darkImage={aboutDark}>
      <div className="min-h-screen flex flex-col text-latte-text dark:text-mocha-text">
        {/* Hamburger + Sidebar */}
        <SideMenu setTheme={setTheme} />

        {/* Header */}
        <header className="relative py-10 z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="inline-block text-5xl font-extrabold text-latte-mauve dark:text-mocha-mauve px-8 py-4 border-4 border-latte-mauve dark:border-mocha-mauve rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              About Me
            </h1>
          </div>
        </header>
        {/* === Main content === */}
        <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          {/* === Blurb === */}
          <section className="border border-latte-surface2 dark:border-mocha-surface2 rounded-2xl p-6 bg-latte-surface0 dark:bg-mocha-surface0 shadow-md text-center">
            <h2 className="text-2xl font-semibold text-latte-mauve dark:text-mocha-mauve mb-3">
              Hey, I’m Aiden Kelly 👋
            </h2>
            <p className="text-latte-subtext1 dark:text-mocha-subtext1 leading-relaxed">
              I’m a statistics graduate from Cal Poly San Luis Obispo with a
              passion for data visualization, creative tech projects, and
              tinkering with all kinds of hardware. I love finding the
              intersection between art, analytics, and design — whether that’s
              through modding consoles, building dashboards, or coding tools
              that make life easier.
            </p>
          </section>

          {/* === Skills === */}
          <section className="border border-latte-surface2 dark:border-mocha-surface2 rounded-2xl p-6 bg-latte-surface0 dark:bg-mocha-surface0 shadow-md text-center">
            <h2 className="text-2xl font-semibold text-latte-mauve dark:text-mocha-mauve mb-3">
              Skills
            </h2>

            <div className="flex flex-wrap justify-center gap-6 text-latte-text dark:text-mocha-text">
              {/* Python */}
              <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
                <SiPython className="w-10 h-10 text-[#3572A5]" />
                <span className="text-sm mt-2">Python</span>
              </div>

              {/* R */}
              <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
                <SiR className="w-10 h-10 text-[#276DC3]" />
                <span className="text-sm mt-2">R</span>
              </div>

              {/* Postgres */}
              <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
                <SiPostgresql className="w-10 h-10 text-[#336791]" />
                <span className="text-sm mt-2">Postgres</span>
              </div>

              {/* MongoDB */}
              <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
                <SiMongodb className="w-10 h-10 text-[#4DB33D]" />
                <span className="text-sm mt-2">MongoDB</span>
              </div>

              {/* JavaScript */}
              <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
                <SiJavascript className="w-10 h-10 text-[#F7DF1E]" />
                <span className="text-sm mt-2">JavaScript</span>
              </div>

              {/* HTML */}
              <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
                <SiHtml5 className="w-10 h-10 text-[#E34F26]" />
                <span className="text-sm mt-2">HTML</span>
              </div>

              {/* React */}
              <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
                <SiReact className="w-10 h-10 text-[#61DBFB]" />
                <span className="text-sm mt-2">React</span>
              </div>

              {/* Tailwind */}
              <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
                <SiTailwindcss className="w-10 h-10 text-[#38BDF8]" />
                <span className="text-sm mt-2">Tailwind</span>
              </div>

              {/* Docker */}
              <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
                <SiDocker className="w-10 h-10 text-[#2496ED]" />
                <span className="text-sm mt-2">Docker</span>
              </div>

              {/* Linux */}
              <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
                <SiLinux className="w-10 h-10 text-[#EF4444]" />
                <span className="text-sm mt-2">Linux</span>
              </div>

              {/* Git */}
              <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
                <SiGit className="w-10 h-10 text-[#F05033]" />
                <span className="text-sm mt-2">Git</span>
              </div>
            </div>
          </section>

          {/* === Interests === */}
          <section className="border border-latte-surface2 dark:border-mocha-surface2 rounded-2xl p-6 bg-latte-surface0 dark:bg-mocha-surface0 shadow-md text-center">
            <h2 className="text-2xl font-semibold text-latte-mauve dark:text-mocha-mauve mb-3">
              Interests
            </h2>
            <p className="text-latte-subtext1 dark:text-mocha-subtext1 leading-relaxed">
              Outside of work, I enjoy experimenting with modded hardware like
              custom iPods and Nintendo Switch consoles, exploring music
              recommendations through Last.fm, and photographing small details
              that often go unnoticed. I also love playing story-driven games,
              reading sci-fi novels, and collecting odd tech from thrift stores.
            </p>
          </section>

          {/* === Contact Me === */}
          <section className="border border-latte-surface2 dark:border-mocha-surface2 rounded-2xl p-6 bg-latte-surface0 dark:bg-mocha-surface0 shadow-md text-center">
            <h2 className="text-2xl font-semibold text-latte-mauve dark:text-mocha-mauve mb-3">
              Contact Me
            </h2>
            <p className="text-latte-subtext1 dark:text-mocha-subtext1 mb-4">
              I’d love to connect! Whether it’s about stats, work, or you just
              find something interesting and wanna chat about it, feel free to
              reach out.
            </p>
            <div className="flex justify-center gap-6 text-latte-mauve dark:text-mocha-mauve">
              <a
                href="https://www.linkedin.com/in/aidenkelly47/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-latte-blue dark:hover:text-mocha-blue transition"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/arrowboy47"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-latte-blue dark:hover:text-mocha-blue transition"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="mailto:aidenquinkelly@gmail.com"
                className="hover:text-latte-blue dark:hover:text-mocha-blue transition"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </section>
        </main>

        {/* === Footer === */}
        <footer className="border-t border-latte-surface2 dark:border-mocha-surface2 bg-latte-surface0 dark:bg-mocha-surface0 py-4 px-6 flex items-center justify-between text-sm text-latte-subtext1 dark:text-mocha-subtext1">
          <p>© {new Date().getFullYear()} Aiden Kelly. All Rights Reserved.</p>
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
