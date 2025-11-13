// src/PostPage.jsx
import { useParams, Link } from "react-router-dom";
import { getAllPosts } from "./utils/loadPosts.js";
import { marked } from "marked";
import PageBackground from "./PageBackground.jsx";
import blogLight from "./assets/backgrounds/blog-light.png";
import blogDark from "./assets/backgrounds/blog-dark.png";

export default function PostPage({ theme }) {
  const { slug } = useParams();
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <PageBackground theme={theme} lightImage={blogLight} darkImage={blogDark}>
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-semibold">Post not found.</h1>
        </div>
      </PageBackground>
    );
  }

  return (
    <PageBackground theme={theme} lightImage={blogLight} darkImage={blogDark}>
      <div className="min-h-screen flex flex-col">
        <header className="py-10 text-center">
          <h1 className="inline-block text-4xl font-extrabold text-latte-mauve dark:text-mocha-mauve border-4 border-latte-mauve dark:border-mocha-mauve rounded-2xl px-8 py-4 shadow-md">
            {post.title}
          </h1>
          <p className="text-sm text-latte-subtext1 dark:text-mocha-subtext1 mt-2">
            {post.date}
          </p>
        </header>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 prose dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
        </main>

        <div className="text-center mb-10">
          <Link
            to="/blog"
            className="text-latte-mauve dark:text-mocha-mauve font-semibold hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </PageBackground>
  );
}