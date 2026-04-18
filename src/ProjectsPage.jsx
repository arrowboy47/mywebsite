import SideMenu from "./SideMenu.jsx";
import PageBackground from "./PageBackground.jsx";
import projectsLight from "./assets/backgrounds/blog-light.png";
import projectsDark from "./assets/backgrounds/blog-dark.png";
import { Github, ExternalLink } from "lucide-react";
import CSpic from "./assets/photos/project/CS.png";
import KoboPic from "./assets/photos/project/kobodashboard.png";
import ServerPic from "./assets/photos/project/serverirl.PNG";
import HomarrPic from "./assets/photos/project/HomarrDB.png";

export default function ProjectsPage({ theme, setTheme }) {
  const projects = [
    {
      title: "CampSearch (WIP)",
      description:
        "A web app that helps users find and compare national park campgrounds with weather and map integrations.",
      image: CSpic,
      tech: ["Python", "Flask", "Postgresql", "OpenWeather API"],
      github: "https://github.com/arrowboy47/campSearch",
      demo: "#",
    },
    {
      title: "Coffee Ordering Site",
      description:
        "A birthday gift for my girlfriend — a personal coffee ordering site where she picks drinks from a menu I built, hits order, and it sends me an email with what she wants. Includes an ingredients list and cost-per-drink so she can see how much she's saving vs. going out.",
      image: null,
      tech: ["HTML/CSS/JS", "EmailJS", "Docker"],
      github: "https://github.com/arrowboy47/coffee_orders",
      demo: "#",
    },
    {
      title: "Kobo Dashboard",
      description:
        "A customized E-ink dashboard running on a Kobo Sage e-reader. Displays Google Calendar events, sunrise/sunset times, moon phase, 2026 goals, and rotating images — all served from a self-hosted Docker container.",
      image: KoboPic,
      tech: ["Docker", "HTML/CSS", "Google Calendar API", "RackNerd VPS"],
      github: "https://github.com/arrowboy47/kobo-dashboard",
      demo: "http://104.168.7.21:3333/today.png",
    },
    {
      title: "Homelab — thebigbox",
      description:
        "A self-hosted media and services server built on a Dell OptiPlex 9010 MT running Ubuntu 24.04. Runs Jellyfin, Radarr, Sonarr, Nextcloud, PhotoPrism, and more — all containerized with Docker and accessible remotely via WireGuard VPN.",
      image: ServerPic,
      tech: ["Ubuntu 24.04", "Docker", "WireGuard", "Jellyfin", "Portainer"],
      github: null,
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
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center bg-latte-surface1 dark:bg-mocha-surface1 text-latte-subtext0 dark:text-mocha-subtext0 text-sm italic rounded-xl">
                    Screenshot coming soon
                  </div>
                )}
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
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-latte-mauve dark:text-mocha-mauve font-semibold hover:underline"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Project Repository
                  </a>
                )}
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
