import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/posts";
import { navLinks, siteConfig } from "@/lib/site";

function toAbsoluteUrl(pathname: string) {
  return pathname === "/" ? siteConfig.url : `${siteConfig.url}${pathname}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = navLinks.map((link) => ({
    url: toAbsoluteUrl(link.href),
    lastModified: new Date(),
    changeFrequency: link.href === "/" ? "weekly" : "monthly",
    priority: link.href === "/" ? 1 : 0.7,
  }));

  const posts = getAllPosts().map((post) => ({
    url: toAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...posts];
}
