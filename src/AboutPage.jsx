import SideMenu from "./SideMenu.jsx";
import campingPic from "./assets/photos/camping.png";
import musicPic from "./assets/photos/music.png";
import linuxPic from "./assets/photos/linux.png";

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
            <p className="text-left text-latte-subtext1 dark:text-mocha-subtext1 leading-relaxed">
              I am a data scientist who, as I mentioned before, a recent statistics graduate from Cal Poly SLO with a passion for stats, cool tech projects, and nature. I am really looking forward to starting my career in the analytics world.
              I think that stats are so important for great decision making. Numbers keep people accountable and can ground decisions in reality rather than feelings, which can lead to poor or even harmful choices. That’s why I make it a point to stay informed and use data thoughtfully in my everyday life. In order to generate good incites for a specific problem, you need to have a good understanding of the topic. That’s one of the reasons I love statistics, it allows me to explore so many different disciplines, giving me the chance to dive into new fields and continuously expand my knowledge.
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
              <img
                src={campingPic}
                alt="Camping trip"
                className="float-right ml-4 mb-2 w-48 h-auto rounded-xl shadow-md border border-latte-surface2 dark:border-mocha-surface2"
              />
              One way I love to explore new fields is through my hobbies. I love being out in nature and going camping, it's such a great way to reset. 
              <br />
              Along a similar line of resetting, I am always listening to music.
              <img
                src={musicPic}
                alt="Music setup"
                className="float-left mr-4 mb-2 w-48 h-auto rounded-xl shadow-md border border-latte-surface2 dark:border-mocha-surface2"
              />
              I got into music kinda late in life, but I cannot live without it
              now. I love listening to jazz, electronic, rap, alt rock, prog
              rock, and pop (check my Last.fm).
              <br />
              I also have really been obsessed with opensource software. I have been using linux for my operating system for over 5 years now, it has been such a great experience. 
              <img
                src={linuxPic}
                alt="Linux desktop"
                className="float-right ml-4 mb-2 w-48 h-auto rounded-xl shadow-md border border-latte-surface2 dark:border-mocha-surface2"
              />
              I have learned so much about computers and had the chance showoff my creativity through customizations. My love for it has led me down the road of self hosting! I recently set up a homeserver with all my media on it and looking to expand what I can do with it.
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
