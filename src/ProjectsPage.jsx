import SideMenu from "./SideMenu.jsx";
import PageBackground from "./PageBackground.jsx";
import projectsLight from "./assets/backgrounds/blog-light.png";
import projectsDark from "./assets/backgrounds/blog-dark.png";
import { Github, ExternalLink } from "lucide-react";
import CSpic from "./assets/photos/project/CS.png";
import KoboPic from "./assets/photos/project/kobodashboard.png";
import ServerPic from "./assets/photos/project/serverirl.PNG";
import HomarrPic from "./assets/photos/project/HomarrDB.png";
import JaduPic from "./assets/photos/project/jadu-agent.jpg";
import JobAgentPic from "./assets/photos/project/job-agent.jpeg";
import CoffeePic from "./assets/photos/project/coffee-site.png";

export default function ProjectsPage({ theme, setTheme }) {
  const projects = [
    {
      title: "Homelab — thebigbox",
      description:
        "My self-hosted everything-server: a Dell OptiPlex 9010 MT running Ubuntu 24.04 with ~30 Docker containers, reachable from anywhere over a self-hosted WireGuard VPN. Media: Jellyfin for movies/TV, Kima for streaming my music library to my phone through a reverse proxy, Audiobookshelf for audiobooks, Kavita for ebooks and manga, Bookshelf for reading tracking, and qBittorrent for downloads. Photos and files: Immich as my Google Photos replacement (with ML search and face recognition) and Nextcloud for file sync. Infrastructure: Pi-hole handling DNS ad-blocking for the whole network, Nginx Proxy Manager for routing and TLS, CouchDB powering live sync of my Obsidian vault across devices, and Homarr + Dashdot as dashboards. It also hosts the data layer for my AI projects — a Postgres personal data warehouse with a Dash dashboard, and Honcho, the memory backend for my personal AI agent. The whole box is watched by a monitoring daemon I built that auto-restarts failed services.",
      image: ServerPic,
      tech: ["Ubuntu 24.04", "Docker", "WireGuard", "Jellyfin", "Immich", "Nextcloud", "Pi-hole", "Postgres"],
      github: null,
      demo: "#",
    },
    {
      title: "Jadu — Personal AI Agent",
      description:
        "My always-on personal AI agent — the evolution of the OpenClaw design I blogged about in April. Jadu runs on the open-source Hermes agent runtime on a Mac Mini M4 and I talk to it over Telegram from anywhere. It runs local-first inference (a 31B model via Ollama on the M4's Neural Engine, with a smaller fallback model served by llama.cpp), so day-to-day usage costs nothing. It has a curated library of 50+ skills — including custom ones I wrote for nightly planning, syncing my personal data warehouse, and keeping my infrastructure documentation up to date — plus scheduled cron routines that run unattended: a nightly planner nudge, a 3am data sync, daily Obsidian housekeeping, and weekly memory cleanup. For long-term memory it uses Honcho, a user-modeling layer running on my homelab that builds a deepening model of me across conversations. It reads and writes my Obsidian vault, manages my calendar and email through Google Workspace, and hands bigger coding jobs off to a Claude Code build pipeline.",
      image: JaduPic,
      tech: ["Python", "Hermes Agent", "Ollama", "Telegram", "Honcho", "Obsidian"],
      github: null,
      demo: "#",
    },
    {
      title: "Job Applying Agent (Current Project)",
      description:
        "An AI agent that deletes the boring 80% of job hunting. I send a search from Telegram ('senior data roles, remote US'), and it scans postings across 20+ applicant tracking systems (Greenhouse, Lever, Ashby, Workday and more), scores each posting against my resume using a structured evaluation framework, and keeps the best matches. For each one it generates a tailored resume and cover letter as Google Docs and logs everything — scores, links, status — to a Google Sheet tracker. I review the drafts, edit what I want, and apply manually through the logged URLs; the agent never submits anything on my behalf. The interesting part is the feedback loop: on each new run it diffs my hand-edits against its original drafts and distills the patterns into guidance for the next generation round, so the drafts keep getting closer to my voice.",
      image: JobAgentPic,
      tech: ["Claude Code", "Node.js", "Google Docs/Sheets API", "Telegram"],
      github: "https://github.com/arrowboy47/career-ops",
      demo: "#",
    },
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
      image: CoffeePic,
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
