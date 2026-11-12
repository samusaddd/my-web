import { createDecipheriv, createHash } from "node:crypto";

export const sha256 = (bytes) =>
  createHash("sha256").update(bytes).digest("hex");

export function releaseIsDue(releaseAt, now = Date.now()) {
  const at = Date.parse(releaseAt);
  if (!Number.isFinite(at)) throw new Error("Invalid publication timestamp");
  return now >= at;
}

export function decodeRelease(bundle, key, config) {
  if (!/^[a-f0-9]{64}$/.test(key || ""))
    throw new Error("Release key unavailable");
  if (sha256(bundle) !== config.bundleSha256)
    throw new Error("Release bundle changed");
  const envelope = JSON.parse(bundle.toString("utf8"));
  const decipher = createDecipheriv(
    "aes-256-gcm",
    Buffer.from(key, "hex"),
    Buffer.from(envelope.iv, "base64"),
  );
  decipher.setAuthTag(Buffer.from(envelope.tag, "base64"));
  const payload = JSON.parse(
    Buffer.concat([
      decipher.update(Buffer.from(envelope.data, "base64")),
      decipher.final(),
    ]).toString("utf8"),
  );
  if (payload.releaseAt !== config.releaseAt || payload.slug !== config.slug)
    throw new Error("Release identity mismatch");
  const names = Object.keys(payload.files).sort();
  if (
    JSON.stringify(names) !== JSON.stringify(Object.keys(config.files).sort())
  )
    throw new Error("Release file list mismatch");
  const files = new Map();
  for (const name of names) {
    const allowed =
      name === `src/content/posts/${config.slug}.mdx` ||
      /^public\/images\/articles\/protecting-my-peace-[a-z0-9-]+\.(webp|jpg)$/.test(
        name,
      ) ||
      name === `docs/assets/${config.slug}.md`;
    if (!allowed || name.includes("..") || name.includes("\\"))
      throw new Error("Unsafe release path");
    const bytes = Buffer.from(payload.files[name], "base64");
    if (sha256(bytes) !== config.files[name])
      throw new Error("Release file integrity failed");
    files.set(name, bytes);
  }
  const post = files
    .get(`src/content/posts/${config.slug}.mdx`)
    ?.toString("utf8");
  if (
    !post ||
    !post.includes(`publishAt: "${config.releaseAt}"`) ||
    !post.includes(`date: "${config.releaseAt}"`)
  )
    throw new Error("Publication date mismatch");
  const body = post
    .split(/^---\s*$/m)
    .slice(2)
    .join("---")
    .trim()
    .replace("<EssaySoundtrack />\n\n", "");
  if (sha256(body) !== config.manuscriptSha256)
    throw new Error("Approved manuscript changed");
  if (!post.includes('"spotifyId": "4iCkPQ18CbkZfCKKBUCEgq"'))
    throw new Error("Soundtrack mismatch");
  return files;
}
