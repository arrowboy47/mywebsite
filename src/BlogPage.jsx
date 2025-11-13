import SideMenu from "./SideMenu.jsx";
import PageBackground from "./PageBackground.jsx";
import blogLight from "./assets/backgrounds/blog-light.png";
import blogDark from "./assets/backgrounds/blog-dark.png";
import { Linkedin, Github, Mail } from "lucide-react";

export default function BlogPage({ theme, setTheme }) {
  const posts = [
    {
      title: "Exploring Data with R",
      date: "November 2, 2025",
      description:
        "A quick look into how I used R to visualize public datasets and uncover surprising insights.",
      link: "#",
    },
    {
      title: "Building My Personal Website",
      date: "October 28, 2025",
      description:
        "The story behind how I designed, built, and themed this site using React and TailwindCSS.",
      link: "#",
    },
    {
      title: "Docker for Data Projects",
      date: "October 5, 2025",
      description:
        "How containerization helps me keep my data analysis environments clean and reproducible.",
      link: "#",
    },
  ];

  return (
    <PageBackground theme={theme} lightImage={blogLight} darkImage={blogDark}>
      <div className="min-h-screen flex flex-col text-latte-text dark:text-mocha-text">
        {/* Sidebar Drawer */}
        <SideMenu setTheme={setTheme} />

        {/* Header */}
        <header className="py-10 text-center">
          <h1 className="inline-block text-5xl font-extrabold text-latte-mauve dark:text-mocha-mauve px-8 py-4 border-4 border-latte-mauve dark:border-mocha-mauve rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            Blog
          </h1>
        </header>

        {/* Main Content */}
        <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          {posts.map((post, idx) => (
            <article
              key={idx}
              className="border border-latte-surface2 dark:border-mocha-surface2 rounded-2xl p-6 bg-latte-surface0 dark:bg-mocha-surface0 shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold text-latte-mauve dark:text-mocha-mauve mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-latte-subtext1 dark:text-mocha-subtext1 mb-3">
                {post.date}
              </p>
              <p className="text-latte-subtext1 dark:text-mocha-subtext1 mb-4">
                {post.description}
              </p>
              <a
                href={post.link}
                className="text-latte-mauve dark:text-mocha-mauve hover:underline font-medium"
              >
                Read More →
              </a>
            </article>
          ))}
        </main>

        {/* Footer */}
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