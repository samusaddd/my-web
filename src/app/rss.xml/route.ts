import { getAllPostsWithContent } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function stripMdx(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/[#>*_~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getExcerpt(summary: string, content: string) {
  if (summary.trim().length > 0) return summary.trim();
  const plain = stripMdx(content);
  return plain.slice(0, 220).trim();
}

export async function GET() {
  const posts = getAllPostsWithContent();
  const siteUrl = siteConfig.url;
  const blogUrl = absoluteUrl("/blog");
  const feedUrl = absoluteUrl("/rss.xml");
  const lastBuildDate = posts[0]?.lastModified ?? new Date().toISOString();

  const itemsXml = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
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

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
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
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
