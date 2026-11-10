import type { Post, PostMeta } from "./posts";

export type WritingEntry = Omit<PostMeta, "soundtrack"> & { minutes: number };

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
export function readingMinutes(content: string) {
  return Math.max(1, Math.ceil(countWords(content) / 220));
}

export function countWords(content: string) {
  return (
    content.replace(/<[^>]*>/g, " ").match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu)?.length || 0
  );
}
export function coverSources(post: PostMeta) {
  if (!post.coverImage || (!post.coverImageSmall && !post.coverImageMedium)) return undefined;
  return [
    post.coverImageSmall && post.coverImageSmall + " 800w",
    post.coverImageMedium && post.coverImageMedium + " 1600w",
    post.coverImage + " " + (post.coverWidth || 2400) + "w",
  ]
    .filter(Boolean)
    .join(", ");
}
export function writingEntry(post: Post): WritingEntry {
  const { content, soundtrack: _soundtrack, ...meta } = post;
  return { ...meta, minutes: readingMinutes(content) };
}
