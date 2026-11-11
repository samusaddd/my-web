import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { isPostPublished } from "./publication.mjs";

export type PostSoundtrack = {
  spotifyId: string;
  title: string;
  artist: string;
  label?: string;
  note?: string;
};

export type PostFrontmatter = {
  title: string;
  date: string;
  publishAt?: string;
  summary: string;
  tags: string[];
  seoTitle?: string;
  description?: string;
  category?: string;
  language?: string;
  tone?: "oxblood" | "charcoal";
  coverImage?: string;
  coverFirst?: boolean;
  coverImageSmall?: string;
  coverImageMedium?: string;
  coverAlt?: string;
  coverWidth?: number;
  coverHeight?: number;
  coverCredit?: string;
  coverCaption?: string;
  coverSourceUrl?: string;
  socialImage?: string;
  socialImageWidth?: number;
  socialImageHeight?: number;
  soundtrack?: PostSoundtrack;
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

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function optionalDimension(value: unknown) {
  return typeof value === "number" && Number.isInteger(value) && value > 0 ? value : undefined;
}

function optionalSoundtrack(value: unknown): PostSoundtrack | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const fields = value as Record<string, unknown>;
  const spotifyId = optionalString(fields.spotifyId);
  const title = optionalString(fields.title);
  const artist = optionalString(fields.artist);
  if (!spotifyId || !/^[A-Za-z0-9]{22}$/.test(spotifyId) || !title || !artist) return undefined;
  return {
    spotifyId,
    title,
    artist,
    label: optionalString(fields.label),
    note: optionalString(fields.note),
  };
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
  const seoTitle = optionalString(data.seoTitle);
  const description = optionalString(data.description);
  const category = optionalString(data.category);
  const language = optionalString(data.language);
  const tone = data.tone === "oxblood" || data.tone === "charcoal" ? data.tone : undefined;
  const coverImage = optionalString(data.coverImage);
  const coverFirst = data.coverFirst === true;
  const coverImageSmall = optionalString(data.coverImageSmall);
  const coverImageMedium = optionalString(data.coverImageMedium);
  const coverAlt = typeof data.coverAlt === "string" ? data.coverAlt : undefined;
  const coverWidth = optionalDimension(data.coverWidth);
  const coverHeight = optionalDimension(data.coverHeight);
  const coverCredit = optionalString(data.coverCredit);
  const coverCaption = optionalString(data.coverCaption);
  const coverSourceUrl = optionalString(data.coverSourceUrl);
  const socialImage = optionalString(data.socialImage);
  const socialImageWidth = optionalDimension(data.socialImageWidth);
  const socialImageHeight = optionalDimension(data.socialImageHeight);
  const soundtrack = optionalSoundtrack(data.soundtrack);

  return {
    slug,
    title,
    date,
    publishAt: optionalString(data.publishAt),
    summary,
    tags,
    lastModified,
    seoTitle,
    description,
    category,
    language,
    tone,
    coverImage,
    coverFirst,
    coverImageSmall,
    coverImageMedium,
    coverAlt,
    coverWidth,
    coverHeight,
    coverCredit,
    coverCaption,
    coverSourceUrl,
    socialImage,
    socialImageWidth,
    socialImageHeight,
    soundtrack,
  };
}

function getPostFileSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostSlugs() {
  return getPostFileSlugs().filter((slug) => Boolean(getPostBySlug(slug)));
}

export function getScheduledRelease(slug: string): string | null {
  const file = readPostFile(slug);
  if (!file) return null;
  const { data } = matter(file.fileContents);
  if (data.draft === true || typeof data.publishAt !== "string") return null;
  const release = Date.parse(data.publishAt);
  return Number.isFinite(release) && release > Date.now() ? data.publishAt : null;
}

export function getScheduledPostSlugs() {
  return getPostFileSlugs().filter((slug) => Boolean(getScheduledRelease(slug)));
}

export function getPostBySlug(slug: string): Post | null {
  const file = readPostFile(slug);
  if (!file) return null;

  const { data, content } = matter(file.fileContents);
  if (!isPostPublished(data)) return null;
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
