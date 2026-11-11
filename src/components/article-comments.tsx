"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import styles from "./article-community.module.css";

const api = "https://samir-seddiqi-comments.samusadd.chatgpt.site";
type Comment = { id: string; name: string; body: string; createdAt: string };
type CommentPage = { comments: Comment[]; total: number; next: string | null };
const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function ArticleComments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [next, setNext] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [posting, setPosting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [tokens, setTokens] = useState<Record<string, string>>({});
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const generation = useRef(0);
  const submission = useRef<{ fingerprint: string; id: string; deleteToken: string } | null>(null);

  const load = useCallback(
    async (cursor?: string, signal?: AbortSignal) => {
      const current = generation.current;
      setLoading(true);
      setLoadError("");
      try {
        const query = new URLSearchParams({ slug, ...(cursor ? { before: cursor } : {}) });
        const response = await fetch(`${api}/v1/comments?${query}`, {
          signal,
          credentials: "omit",
        });
        if (!response.ok) throw new Error("Comments could not be loaded. Please try again.");
        const page: CommentPage = await response.json();
        if (current !== generation.current) return;
        setComments((existing) =>
          cursor
            ? [
                ...existing,
                ...page.comments.filter((item) => !existing.some((other) => other.id === item.id)),
              ]
            : page.comments,
        );
        setTotal(page.total);
        setNext(page.next);
      } catch (error) {
        if (signal?.aborted || current !== generation.current) return;
        setLoadError(
          error instanceof Error
            ? error.message
            : "Comments could not be loaded. Please try again.",
        );
      } finally {
        if (!signal?.aborted && current === generation.current) setLoading(false);
      }
    },
    [slug],
  );

  useEffect(() => {
    generation.current += 1;
    const controller = new AbortController();
    setComments([]);
    setTotal(0);
    setNext(null);
    setLoading(true);
    setLoadError("");
    setPosting(false);
    setDeleting(null);
    submission.current = null;
    setStatus("");
    setBody("");
    setName("");
    setConfirmDelete(null);
    try {
      const saved = JSON.parse(localStorage.getItem(`samir-comment-tokens:${slug}`) || "{}");
      const valid: Record<string, string> = {};
      if (saved && typeof saved === "object" && !Array.isArray(saved)) {
        for (const [id, token] of Object.entries(saved)) {
          if (
            /^[a-f0-9-]{36}$/.test(id) &&
            typeof token === "string" &&
            /^[a-f0-9]{64}$/.test(token)
          )
            valid[id] = token;
        }
      }
      setTokens(valid);
    } catch {
      setTokens({});
    }
    const section = document.getElementById("comments");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          void load(undefined, controller.signal);
        }
      },
      { rootMargin: "500px" },
    );
    if (section) observer.observe(section);
    else void load(undefined, controller.signal);
    return () => {
      controller.abort();
      observer.disconnect();
      generation.current += 1;
    };
  }, [slug, load]);

  function saveTokens(value: Record<string, string>) {
    setTokens(value);
    try {
      localStorage.setItem(`samir-comment-tokens:${slug}`, JSON.stringify(value));
    } catch {}
  }

  async function post(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (posting) return;
    const current = generation.current;
    const website = new FormData(event.currentTarget).get("website");
    setPosting(true);
    setStatus("");
    try {
      const fingerprint = JSON.stringify([slug, name.trim(), body.trim()]);
      if (submission.current?.fingerprint !== fingerprint) {
        const bytes = crypto.getRandomValues(new Uint8Array(32));
        submission.current = {
          fingerprint,
          id: crypto.randomUUID(),
          deleteToken: Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(""),
        };
      }
      const response = await fetch(`${api}/v1/comments`, {
        method: "POST",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          name: name.trim(),
          body: body.trim(),
          website,
          id: submission.current.id,
          deleteToken: submission.current.deleteToken,
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error ||
            "Your comment could not be posted. Your words are still here; please try again.",
        );
      if (current !== generation.current) return;
      saveTokens({ ...tokens, [result.comment.id]: result.deleteToken });
      setBody("");
      submission.current = null;
      setStatus("Your comment is published. Thank you for adding your voice.");
      await load();
    } catch (error) {
      if (current === generation.current)
        setStatus(
          error instanceof Error
            ? error.message
            : "Your comment could not be posted. Please try again.",
        );
    } finally {
      if (current === generation.current) setPosting(false);
    }
  }

  async function remove(id: string) {
    if (deleting) return;
    const current = generation.current;
    setDeleting(id);
    try {
      const response = await fetch(`${api}/v1/comments/${id}`, {
        method: "DELETE",
        credentials: "omit",
        headers: { Authorization: `Bearer ${tokens[id]}` },
      });
      if (!response.ok) throw new Error("Your comment could not be deleted. Please try again.");
      if (current !== generation.current) return;
      setComments((current) => current.filter((item) => item.id !== id));
      setTotal((value) => Math.max(0, value - 1));
      const updated = { ...tokens };
      delete updated[id];
      saveTokens(updated);
      setStatus("Your comment has been deleted.");
      setConfirmDelete(null);
    } catch (error) {
      if (current === generation.current)
        setStatus(error instanceof Error ? error.message : "Please try again.");
    } finally {
      if (current === generation.current) setDeleting(null);
    }
  }

  return (
    <section id="comments" className={styles.comments} aria-labelledby="comments-title">
      <div className={styles.sectionTop}>
        <div>
          <p className={styles.eyebrow}>The conversation continues</p>
          <h2 id="comments-title">Leave a thought.</h2>
        </div>
        {!loading && !loadError ? (
          <span className={styles.count}>
            {total} {total === 1 ? "comment" : "comments"}
          </span>
        ) : null}
      </div>
      <p className={styles.intro}>What stayed with you? You’re welcome to leave a few words.</p>
      <form ref={form} onSubmit={post} className={styles.form}>
        <label htmlFor="comment-name">Your name</label>
        <input
          id="comment-name"
          name="name"
          autoComplete="nickname"
          required
          minLength={2}
          maxLength={60}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="How you’d like to be known"
        />
        <label htmlFor="comment-body">Your comment</label>
        <textarea
          id="comment-body"
          name="comment"
          required
          minLength={3}
          maxLength={2000}
          rows={5}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="A reflection, a question, a different perspective…"
          aria-describedby="comment-notice"
        />
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="comment-website">Leave this field empty</label>
          <input id="comment-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <div className={styles.formBottom}>
          <p id="comment-notice">
            Your name and comment will be public. Be thoughtful with one another. No account or
            email needed.
          </p>
          <button
            className={styles.primary}
            disabled={posting || !name.trim() || !body.trim()}
            type="submit"
          >
            {posting ? "Posting…" : "Post comment"} <span aria-hidden="true">↗</span>
          </button>
        </div>
        <p className={styles.status} role="status">
          {status}
        </p>
      </form>
      <noscript>
        <p>
          Enable JavaScript to read and post comments. You can still read and share the complete
          essay.
        </p>
      </noscript>
      <div aria-busy={loading} className={styles.commentList}>
        {loading && !comments.length ? (
          <p className={styles.quiet}>Loading the conversation…</p>
        ) : null}
        {loadError ? (
          <div role="status">
            <p>{loadError}</p>
            <button className={styles.textButton} type="button" onClick={() => void load()}>
              Try again ↗
            </button>
          </div>
        ) : null}
        {!loading && !loadError && !total ? (
          <p className={styles.empty}>
            A little room for the first voice.<span>Be the first to leave a comment.</span>
          </p>
        ) : null}
        {comments.map((comment) => (
          <article
            className={styles.comment}
            key={comment.id}
            aria-label={`Comment by ${comment.name}`}
          >
            <div className={styles.avatar} aria-hidden="true">
              {Array.from(comment.name)[0]?.toLocaleUpperCase()}
            </div>
            <div className={styles.commentContent}>
              <header>
                <h3>{comment.name}</h3>
                <time dateTime={comment.createdAt}>
                  {dateFormat.format(new Date(comment.createdAt))}
                </time>
              </header>
              <p className={styles.commentBody}>{comment.body}</p>
              {tokens[comment.id] ? (
                <div className={styles.deleteControls}>
                  {confirmDelete === comment.id ? (
                    <>
                      <span>Delete your comment?</span>
                      <button
                        type="button"
                        disabled={deleting === comment.id}
                        onClick={() => void remove(comment.id)}
                      >
                        {deleting === comment.id ? "Deleting…" : "Yes, delete"}
                      </button>
                      <button type="button" onClick={() => setConfirmDelete(null)}>
                        Keep it
                      </button>
                    </>
                  ) : (
                    <button type="button" onClick={() => setConfirmDelete(comment.id)}>
                      Delete my comment
                    </button>
                  )}
                </div>
              ) : null}
            </div>
          </article>
        ))}
        {next ? (
          <button
            className={styles.textButton}
            type="button"
            disabled={loading}
            onClick={() => void load(next)}
          >
            {loading ? "Loading…" : "More comments"} <span aria-hidden="true">↓</span>
          </button>
        ) : null}
      </div>
    </section>
  );
}
