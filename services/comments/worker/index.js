// @ts-check
const origins = new Set(["https://samirseddiqi.it", "https://www.samirseddiqi.it"]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const idPattern = /^[a-f0-9-]{36}$/;
const tokenPattern = /^[a-f0-9]{64}$/;
const encoder = new TextEncoder();
const publicColumns = "id, name, body, created_at AS createdAt";
/** @typedef {{id: string, name: string, body: string, createdAt: string}} PublicComment */

/** @param {string} value */
async function digest(value) {
  return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value))), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/** @param {Request} request */
async function readBody(request) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new ApiError(415, "Please send a text comment using the form.");
  if (Number(request.headers.get("content-length")) > 10000) throw new ApiError(413, "Your comment is too long.");
  const reader = request.body?.getReader();
  if (!reader) throw new ApiError(400, "Your comment is empty.");
  let length = 0;
  const chunks = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 10000) { await reader.cancel(); throw new ApiError(413, "Your comment is too long."); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try { return JSON.parse(new TextDecoder().decode(bytes)); }
  catch { throw new ApiError(400, "Your comment could not be read. Please try again."); }
}

class ApiError extends Error {
  /** @param {number} status @param {string} message */
  constructor(status, message) { super(message); this.status = status; }
}

/** @param {Request} request @param {Env} env */
async function handle(request, env) {
  const url = new URL(request.url);
  const origin = request.headers.get("Origin") || "";
  const developmentOrigin = env.ALLOW_LOCALHOST === "true" && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
  const allowedOrigin = origins.has(origin) || developmentOrigin;
  const headers = new Headers({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "Vary": "Origin" });
  if (allowedOrigin) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    headers.set("Access-Control-Max-Age", "600");
  }
  /** @param {unknown} data @param {number} [status] */
  const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers });
  try {
    if (request.method === "OPTIONS") return new Response(null, { status: allowedOrigin ? 204 : 403, headers });
    if (url.pathname === "/health" && request.method === "GET") {
      await env.DB.prepare("SELECT 1 FROM comments LIMIT 1").first();
      return json({ ok: true });
    }
    const isAdmin = async () => {
      const supplied = request.headers.get("Authorization")?.replace(/^Bearer /, "") || "";
      if (!env.ADMIN_TOKEN || !supplied) return false;
      const a = await crypto.subtle.digest("SHA-256", encoder.encode(supplied));
      const b = await crypto.subtle.digest("SHA-256", encoder.encode(env.ADMIN_TOKEN));
      return crypto.subtle.timingSafeEqual(a, b);
    };
    if (url.pathname === "/v1/moderation" && request.method === "GET") {
      if (!(await isAdmin())) throw new ApiError(401, "Authentication required.");
      const rows = await env.DB.prepare(`SELECT ${publicColumns}, slug FROM comments ORDER BY created_at DESC, id DESC LIMIT 100`).all();
      return json({ comments: rows.results });
    }
    const moderation = url.pathname.match(/^\/v1\/moderation\/([a-f0-9-]{36})$/);
    if (moderation && request.method === "DELETE") {
      if (!(await isAdmin())) throw new ApiError(401, "Authentication required.");
      await env.DB.prepare("DELETE FROM comments WHERE id = ?").bind(moderation[1]).run();
      return json({ deleted: true });
    }
    if (request.method !== "GET" && !allowedOrigin) throw new ApiError(403, "Please post comments from the article page.");
    if (url.pathname === "/v1/comments" && request.method === "GET") {
      const slug = url.searchParams.get("slug") || "";
      const before = url.searchParams.get("before");
      if (!slugPattern.test(slug) || slug.length > 180 || (before && !idPattern.test(before))) throw new ApiError(400, "Invalid article or comment page.");
      const cursor = before ? await env.DB.prepare("SELECT created_at FROM comments WHERE id = ? AND slug = ?").bind(before, slug).first() : null;
      if (before && !cursor) throw new ApiError(400, "This comment page has changed. Please refresh the conversation.");
      const query = cursor ? env.DB.prepare(`SELECT ${publicColumns} FROM comments WHERE slug = ? AND (created_at < ? OR (created_at = ? AND id < ?)) ORDER BY created_at DESC, id DESC LIMIT 21`).bind(slug, cursor.created_at, cursor.created_at, before)
        : env.DB.prepare(`SELECT ${publicColumns} FROM comments WHERE slug = ? ORDER BY created_at DESC, id DESC LIMIT 21`).bind(slug);
      /** @type {D1Result<PublicComment>} */
      const rows = await query.all();
      /** @type {number | null} */
      const total = await env.DB.prepare("SELECT COUNT(*) AS total FROM comments WHERE slug = ?").bind(slug).first("total");
      const page = rows.results.slice(0, 20);
      return json({ comments: page, total: total || 0, next: rows.results.length > 20 ? page[page.length - 1].id : null });
    }
    if (url.pathname === "/v1/comments" && request.method === "POST") {
      const input = await readBody(request);
      if (!input || typeof input !== "object" || Array.isArray(input)) throw new ApiError(400, "Please complete the comment form.");
      if (input.website) throw new ApiError(400, "Your comment could not be posted.");
      const slug = typeof input.slug === "string" ? input.slug : "";
      const name = typeof input.name === "string" ? input.name.trim().normalize("NFC") : "";
      const body = typeof input.body === "string" ? input.body.trim().normalize("NFC").replace(/\r\n?/g, "\n") : "";
      const id = typeof input.id === "string" ? input.id : "";
      const deleteToken = typeof input.deleteToken === "string" ? input.deleteToken : "";
      if (!slugPattern.test(slug) || slug.length > 180 || !idPattern.test(id) || !tokenPattern.test(deleteToken)) throw new ApiError(400, "Please refresh the article and try again.");
      if (name.length < 2 || name.length > 60 || /[\u0000-\u001f\u007f<>]/.test(name)) throw new ApiError(400, "Please use a name between 2 and 60 characters, without markup.");
      if (body.length < 3 || body.length > 2000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(body)) throw new ApiError(400, "Please write a comment between 3 and 2,000 characters.");
      if ((body.match(/https?:\/\//gi) || []).length > 2) throw new ApiError(400, "Please include no more than two links in a comment.");
      if (!env.IP_HASH_SALT) throw new ApiError(503, "Comments are temporarily unavailable. Please try again shortly.");
      const tokenHash = await digest(deleteToken);
      const existing = await env.DB.prepare(`SELECT ${publicColumns} FROM comments WHERE id = ? AND delete_hash = ?`).bind(id, tokenHash).first();
      if (existing) return json({ comment: existing, deleteToken }, 200);
      const now = Math.floor(Date.now() / 1000);
      const hour = Math.floor(now / 3600) * 3600;
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const key = await digest(`${env.IP_HASH_SALT}:${Math.floor(now / 86400)}:${ip}`);
      const createdAt = new Date().toISOString();
      const results = await env.DB.batch([
        env.DB.prepare("INSERT OR IGNORE INTO comments (id, slug, name, body, created_at, delete_hash) SELECT ?, ?, ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM comment_rate_limits WHERE key = ? AND (last_post > ? OR (window_start = ? AND posts >= 12)))").bind(id, slug, name, body, createdAt, tokenHash, key, now - 45, hour),
        env.DB.prepare("INSERT INTO comment_rate_limits (key, last_post, window_start, posts) SELECT ?, ?, ?, 1 WHERE changes() = 1 ON CONFLICT(key) DO UPDATE SET last_post = excluded.last_post, window_start = excluded.window_start, posts = CASE WHEN comment_rate_limits.window_start = excluded.window_start THEN comment_rate_limits.posts + 1 ELSE 1 END").bind(key, now, hour),
        env.DB.prepare("DELETE FROM comment_rate_limits WHERE key IN (SELECT key FROM comment_rate_limits WHERE last_post < ? LIMIT 100)").bind(now - 86400),
      ]);
      if (!results[0].meta.changes) {
        const retry = await env.DB.prepare(`SELECT ${publicColumns} FROM comments WHERE id = ? AND delete_hash = ?`).bind(id, tokenHash).first();
        if (retry) return json({ comment: retry, deleteToken });
        headers.set("Retry-After", "45");
        throw new ApiError(429, "Please pause for a moment before posting again. You can post once every 45 seconds, up to 12 times an hour.");
      }
      return json({ comment: { id, name, body, createdAt }, deleteToken }, 201);
    }
    const ownComment = url.pathname.match(/^\/v1\/comments\/([a-f0-9-]{36})$/);
    if (ownComment && request.method === "DELETE") {
      const token = request.headers.get("Authorization")?.replace(/^Bearer /, "") || "";
      if (!tokenPattern.test(token)) throw new ApiError(401, "You can only delete your own comments from the browser you used to post them.");
      const result = await env.DB.prepare("DELETE FROM comments WHERE id = ? AND delete_hash = ?").bind(ownComment[1], await digest(token)).run();
      if (!result.meta.changes) throw new ApiError(403, "This comment could not be deleted from this browser.");
      return json({ deleted: true });
    }
    return json({ error: "Not found." }, 404);
  } catch (error) {
    if (error instanceof ApiError) return json({ error: error.message }, error.status);
    console.error(JSON.stringify({ event: "comments_request_failed", path: url.pathname, method: request.method }));
    return json({ error: "Comments are temporarily unavailable. Your words have not been cleared; please try again." }, 503);
  }
}

export default { fetch: handle };
