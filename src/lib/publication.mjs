/**
 * Keep a scheduled essay out of every published surface until its release time.
 * @param {{draft?: unknown, publishAt?: unknown}} data
 * @param {number} [now]
 */
export function isPostPublished(data, now = Date.now()) {
  if (data.draft === true) return false;
  if (data.publishAt === undefined) return true;
  const release = typeof data.publishAt === "string" ? Date.parse(data.publishAt) : NaN;
  return Number.isFinite(release) && release <= now;
}
