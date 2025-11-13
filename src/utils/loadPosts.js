import { Buffer } from "buffer";
window.Buffer = Buffer;
import matter from "gray-matter";

const modules = import.meta.glob("/src/posts/*.md", { eager: true, as: "raw" });

export function getAllPosts() {
  const posts = [];

  for (const path in modules) {
    const fileContent = modules[path];
    const { data, content } = matter(fileContent);
    const slug = path.split("/").pop().replace(".md", "");
    posts.push({ slug, ...data, content });
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}
