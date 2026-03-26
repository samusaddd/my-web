import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const rootDir = process.cwd();
const postsDirectory = path.join(rootDir, "src", "content", "posts");
const publicDirectory = path.join(rootDir, "public");
const outputFile = path.join(publicDirectory, "rss.xml");

const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const fallbackUrl =
  process.env.NODE_ENV === "production" ? "https://samirseddiqi.it" : "http://localhost:3000";
const siteUrl = (envUrl ? envUrl.replace(/\/+$/, "") : fallbackUrl);

const siteConfig = {
  name: "Samir Seddiqi",
  description:
    "Personal site of Samir Seddiqi in Trento. Founder of VitaAvanza, writer of Can You Hear Me?, and builder of calm systems for people and institutions.",
  email: "ceo@vitaavanza.it",
};

function absoluteUrl(pathname = "/") {
  if (pathname === "/") return siteUrl;
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteUrl}${normalized}`;
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function stripMdx(value) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/[#>*_~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getExcerpt(summary, content) {
  if (summary.trim().length > 0) return summary.trim();
  const plain = stripMdx(content);
  return plain.slice(0, 220).trim();
}

function getPosts() {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const stats = fs.statSync(fullPath);
      const { data, content } = matter(fileContents);

      const title = typeof data.title === "string" && data.title.length > 0 ? data.title : slug;
      const date = typeof data.date === "string" ? data.date : stats.mtime.toISOString();
      const summary = typeof data.summary === "string" ? data.summary : "";
      const tags = Array.isArray(data.tags)
        ? data.tags.filter((tag) => typeof tag === "string")
        : [];
      const lastModified = stats.mtime.toISOString();

      return { slug, title, date, summary, tags, lastModified, content };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function buildRss(posts) {
  const blogUrl = absoluteUrl("/blog/");
  const feedUrl = absoluteUrl("/rss.xml");
  const lastBuildDate = posts[0]?.lastModified ?? new Date().toISOString();

  const itemsXml = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}/`);
      const published = new Date(post.date).toUTCString();
      const excerpt = getExcerpt(post.summary, post.content);
      const tags =
        post.tags.length > 0
          ? post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("")
          : "";

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${escapeXml(url)}</link>
          <guid>${escapeXml(url)}</guid>
          <pubDate>${published}</pubDate>
          <description>${escapeXml(excerpt)}</description>
          <author>${escapeXml(siteConfig.email)} (${escapeXml(siteConfig.name)})</author>
          <source url="${escapeXml(blogUrl)}">${escapeXml(siteConfig.name)}</source>
          ${tags}
        </item>
      `;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-US</language>
    <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />
    ${itemsXml}
  </channel>
</rss>
`;
}

const posts = getPosts();
const rss = buildRss(posts);

fs.mkdirSync(publicDirectory, { recursive: true });
fs.writeFileSync(outputFile, rss, "utf8");
