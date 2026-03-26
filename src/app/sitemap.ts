import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

const staticRoutes = [
  { pathname: "/", changeFrequency: "weekly", priority: 1 },
  { pathname: "/about", changeFrequency: "monthly", priority: 0.9 },
  { pathname: "/book", changeFrequency: "monthly", priority: 0.8 },
  { pathname: "/projects", changeFrequency: "monthly", priority: 0.9 },
  { pathname: "/resume", changeFrequency: "monthly", priority: 0.85 },
  { pathname: "/blog", changeFrequency: "monthly", priority: 0.8 },
  { pathname: "/contact", changeFrequency: "monthly", priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route.pathname),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.lastModified),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
