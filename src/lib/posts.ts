import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
};

export type PostMeta = PostFrontmatter & {
  slug: string;
};

export type Post = PostMeta & {
  content: string;
};

const postsDirectory = path.join(process.cwd(), "src/content/posts");

function readPostFile(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, "utf8");
}

function normalizeFrontmatter(slug: string, data: Record<string, unknown>): PostMeta {
  const title = typeof data.title === "string" && data.title.length > 0 ? data.title : slug;
  const date = typeof data.date === "string" ? data.date : "1970-01-01";
  const summary = typeof data.summary === "string" ? data.summary : "";
  const tags = Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === "string") : [];

  return { slug, title, date, summary, tags };
}

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const fileContents = readPostFile(slug);
  if (!fileContents) return null;

  const { data, content } = matter(fileContents);
  const meta = normalizeFrontmatter(slug, data);

  return {
    ...meta,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      const { content: _content, ...meta } = post;
      return meta;
    })
    .filter((post): post is PostMeta => Boolean(post));

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
