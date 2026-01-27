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
  lastModified: string;
};

export type Post = PostMeta & {
  content: string;
};

const postsDirectory = path.join(process.cwd(), "src/content/posts");

function getPostFilePath(slug: string) {
  return path.join(postsDirectory, `${slug}.mdx`);
}

function sortByDateDesc<T extends { date: string }>(a: T, b: T) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function parseDate(value: unknown) {
  if (typeof value !== "string") return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function readPostFile(slug: string) {
  const fullPath = getPostFilePath(slug);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const stats = fs.statSync(fullPath);
  return { fileContents, stats };
}

function normalizeFrontmatter(
  slug: string,
  data: Record<string, unknown>,
  fallbackDate: Date,
): PostMeta {
  const title = typeof data.title === "string" && data.title.length > 0 ? data.title : slug;
  const parsedDate = parseDate(data.date);
  const date = parsedDate ? (data.date as string) : fallbackDate.toISOString();
  const summary = typeof data.summary === "string" ? data.summary : "";
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((tag): tag is string => typeof tag === "string")
    : [];
  const lastModified = (parsedDate ?? fallbackDate).toISOString();

  return { slug, title, date, summary, tags, lastModified };
}

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const file = readPostFile(slug);
  if (!file) return null;

  const { data, content } = matter(file.fileContents);
  const meta = normalizeFrontmatter(slug, data, file.stats.mtime);

  return {
    ...meta,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return getAllPostsWithContent()
    .map(({ content: _content, ...meta }) => meta)
    .sort(sortByDateDesc);
}

export function getAllPostsWithContent(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => Boolean(post));

  return posts.sort(sortByDateDesc);
}
