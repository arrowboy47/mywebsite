import SideMenu from "./SideMenu.jsx";
import corkTexture from "./assets/cork.png";
import PageBackground from "./PageBackground.jsx";
import blogLight from "./assets/backgrounds/blog-light.png";
import blogDark from "./assets/backgrounds/blog-dark.png";
import { Linkedin, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllPosts } from "./utils/loadPosts.js";
import { marked } from "marked";

export default function BlogPage({ theme, setTheme }) {
  const posts = getAllPosts();
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
        <main
          className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
          style={{
            backgroundImage: `url(${corkTexture})`,
            backgroundBlendMode: "multiply",
            backgroundSize: "350px 350px",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            border: "15px solid #5C3E2B", // thin brown frame
            borderRadius: "3rem",
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.25), inset 0 0 15px rgba(0,0,0,0.25)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            {posts.map((post, idx) => {
              // Rand pin color 
              const pinColors = ["#E06C75", "#1E90FF", "#EBA937", "#9966CC", "#4b0082", "#FFFFFF", "#a4c639", "#bf94e4"]; // D. H. A. R. I. W. A. L.
              const pinColor = pinColors[idx % pinColors.length]; // cycle through colors

              // Slight random rotation for variety
              const rotation = `${Math.random() * 6 - 3}deg`;

              return (
                <article
                  key={idx}
                  className="sticky-note relative p-6 shadow-lg transition-transform duration-500 hover:rotate-0 hover:scale-105 cursor-pointer"
                  style={{
                    backgroundColor:
                      idx % 3 === 0
                        ? "#F9E2AF" // yellow
                        : idx % 3 === 1
                        ? "#E8A2AF" // pink
                        : "#A6E3A1", // green
                    rotate: rotation,
                    borderRadius: "0.5rem",
                    transformOrigin: "top center",
                    animation: `sway-${idx % 5} 6s ease-in-out infinite`,
                  }}
                >
                  {/* 📍 Pin */}
                  <div
                    className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full shadow-md"
                    style={{
                      width: "14px",
                      height: "14px",
                      backgroundColor: pinColor,
                      boxShadow: "0 3px 3px rgba(0,0,0,0.4)", // pin drop shadow
                      border: "1px solid rgba(0,0,0,0.2)",
                    }}
                  ></div>

                  {/* 📝 Note content */}
                  <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
                  <p className="text-xs mb-2">{post.date}</p>
                  <p className="text-sm mb-4">{post.description}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="font-medium hover:underline"
                    style={{ color: "#8839EF" }}
                  >
                    Read More →
                  </Link>
                </article>
              );
            })}
          </div>
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
