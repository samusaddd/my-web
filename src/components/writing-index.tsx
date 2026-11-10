"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { coverSources, formatDate, type WritingEntry } from "@/lib/editorial";
import styles from "@/app/blog/blog.module.css";

const filters = ["All writing", "Philosophy", "Society", "Letters"];
export function WritingIndex({ entries }: { entries: WritingEntry[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All writing");
  const [order, setOrder] = useState("newest");
  const shown = useMemo(
    () =>
      entries
        .filter((post) => {
          const theme = [post.category || "", ...post.tags].join(" ").toLowerCase();
          const categoryMatch =
            filter === "All writing" ||
            theme.includes(filter === "Letters" ? "letter" : filter.toLowerCase());
          const text = [post.title, post.summary, ...post.tags].join(" ").toLowerCase();
          return categoryMatch && text.includes(query.trim().toLowerCase());
        })
        .sort((a, b) =>
          order === "oldest"
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime(),
        ),
    [entries, query, filter, order],
  );
  const reset = () => {
    setQuery("");
    setFilter("All writing");
  };
  return (
    <section className={styles.archiveSection} aria-labelledby="archive-title">
      <div className={styles.archiveHeading}>
        <div>
          <p className={styles.eyebrow}>A continuing conversation</p>
          <h2 id="archive-title">
            All the pages<span>.</span>
          </h2>
        </div>
        <p>
          Questions worth asking.
          <br />
          Words worth staying with.
        </p>
      </div>
      <div className={styles.toolbar}>
        <div className={styles.searchField}>
          <label className="sr-only" htmlFor="writing-search">
            Search writing
          </label>
          <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none">
            <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="m15 15 5 5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <input
            id="writing-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, themes, questions…"
            autoComplete="off"
          />
        </div>
        <div className={styles.sortField}>
          <label htmlFor="writing-sort">Order</label>
          <select id="writing-sort" value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>
      <div className={styles.filterBar}>
        <div className={styles.filters} role="group" aria-label="Filter writing">
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p aria-live="polite" aria-atomic="true" className={styles.resultCount}>
          {shown.length} {shown.length === 1 ? "piece" : "pieces"}
          {query || filter !== "All writing" ? (
            <button onClick={reset} type="button">
              Reset ↗
            </button>
          ) : null}
        </p>
      </div>
      <noscript>
        <p className={styles.noScript}>
          All writing is listed below. Search and filters are available with JavaScript.
        </p>
      </noscript>
      {shown.length ? (
        <div className={styles.archiveGrid} id="writing-results">
          {shown.map((post, index) => (
            <article className={styles.archiveCard} key={post.slug} data-writing-slug={post.slug}>
              {post.coverImage ? (
                <figure>
                  <Link
                    href={"/blog/" + post.slug}
                    aria-label={"Read " + post.title}
                    tabIndex={-1}
                    className={styles.cardPhoto}
                  >
                    <img
                      alt={post.coverAlt || ""}
                      src={post.coverImageSmall || post.coverImage}
                      srcSet={coverSources(post)}
                      sizes="(max-width: 599px) calc(100vw - 40px), (max-width: 1099px) 48vw, 32vw"
                      width={post.coverWidth || 2400}
                      height={post.coverHeight || 1350}
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                  {post.coverCredit ? (
                    <figcaption className={styles.photoCredit}>
                      Photograph:{" "}
                      {post.coverSourceUrl ? (
                        <a href={post.coverSourceUrl} target="_blank" rel="noreferrer">
                          {post.coverCredit} ↗
                        </a>
                      ) : (
                        post.coverCredit
                      )}
                    </figcaption>
                  ) : null}
                </figure>
              ) : (
                <div className={styles.typeCover} aria-hidden="true">
                  <span>{String(entries.indexOf(post) + 1).padStart(2, "0")}</span>
                  <em>From the notebook</em>
                </div>
              )}
              <div className={styles.cardMeta}>
                <p>{post.category || "Essay"}</p>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>
                <Link href={"/blog/" + post.slug}>{post.title}</Link>
              </h3>
              <p className={styles.cardSummary}>{post.summary}</p>
              <div className={styles.cardBottom}>
                <p>
                  <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.minutes} min
                </p>
                <Link aria-label={"Read " + post.title} href={"/blog/" + post.slug}>
                  ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyArchive}>
          <p className={styles.eyebrow}>No matching pages</p>
          <h3>A little too specific?</h3>
          <p>Try another word, or return to all writing.</p>
          <button type="button" onClick={reset}>
            Show all writing <span aria-hidden="true">↗</span>
          </button>
        </div>
      )}
    </section>
  );
}
