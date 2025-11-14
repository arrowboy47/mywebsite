import SideMenu from "./SideMenu.jsx";
import PageBackground from "./PageBackground.jsx";
import projectsLight from "./assets/backgrounds/blog-light.png";
import projectsDark from "./assets/backgrounds/blog-dark.png";
import { Github, ExternalLink } from "lucide-react";
import campSearch from "./assets/photos/project/CS.png";

export default function ProjectsPage({ theme, setTheme }) {
  const projects = [
    {
      title: "CampSearch (WIP)",
      description:
        "A web app that helps users find and compare national park campgrounds with weather and map integrations.",
      image: campSearch,
      tech: ["Python", "Flask", "Postgresql", "OpenWeather API"],
      github: "https://github.com/arrowboy47/campSearch",
      demo: "#",
    },
  ];

  return (
    <PageBackground
      theme={theme}
      lightImage={projectsLight}
      darkImage={projectsDark}
    >
      <div className="min-h-screen flex flex-col text-latte-text dark:text-mocha-text">
        {/* Sidebar Drawer */}
        <SideMenu setTheme={setTheme} />

        {/* Header */}
        <header className="py-10 text-center">
          <h1 className="inline-block text-5xl font-extrabold text-latte-mauve dark:text-mocha-mauve px-8 py-4 border-4 border-latte-mauve dark:border-mocha-mauve rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            Projects
          </h1>
        </header>

        {/* Main Content */}
        <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-center md:items-start gap-8 
                 border border-latte-surface2 dark:border-mocha-surface2 
                 rounded-2xl bg-latte-surface0 dark:bg-mocha-surface0 
                 shadow-md p-6"
            >
              {/* === Project Image === */}
              <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-sm">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* === Project Info === */}
              <div className="w-full md:w-1/2 text-left space-y-3">
                {/* Title */}
                <h2 className="text-4xl font-bold text-latte-mauve dark:text-mocha-mauve">
                  {project.title}
                </h2>

                {/* Skills */}
                <p className="text-lg font-large text-latte-subtext1 dark:text-mocha-subtext1">
                  <b>Skills: </b> {project.tech.join(", ")}
                </p>

                {/* Description */}
                <p className="text-lg text-latte-text dark:text-mocha-text leading-relaxed">
                  {project.description}
                </p>

                {/* Link to GitHub */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-latte-mauve dark:text-mocha-mauve font-semibold hover:underline"
                >
                  <ExternalLink className="w-5 h-5" />
                  Project Repository
                </a>
              </div>
            </div>
          ))}
        </main>
        {/* Footer */}
        <footer className="border-t border-latte-surface2 dark:border-mocha-surface2 bg-latte-surface0 dark:bg-mocha-surface0 py-4 px-6 flex items-center justify-between text-sm text-latte-subtext1 dark:text-mocha-subtext1">
          <p>© {new Date().getFullYear()} Aiden Kelly. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a
              href="https://github.com/arrowboy47"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-latte-mauve dark:hover:text-mocha-mauve transition"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </footer>
      </div>
    </PageBackground>
  );
}
