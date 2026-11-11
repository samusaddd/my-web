"use client";

import { useEffect, useState } from "react";
import styles from "./article-community.module.css";

export function ArticleShare({ title, url }: { title: string; url: string }) {
  const [nativeShare, setNativeShare] = useState(false);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("");
  const [copyFallback, setCopyFallback] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const message = encodeURIComponent(`${title}\n${url}`);
  useEffect(() => {
    setNativeShare(typeof navigator.share === "function");
    setReady(true);
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copied. Ready to pass on.");
      setCopyFallback(false);
    } catch {
      setCopyFallback(true);
      setStatus("Select and copy the link below.");
    }
  }

  async function share() {
    try {
      await navigator.share({ title, url });
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setStatus("Choose a sharing option below, or copy the link.");
      }
    }
  }

  return (
    <section id="share-essay" className={styles.share} aria-labelledby="share-title">
      <div className={styles.sectionTop}>
        <div>
          <p className={styles.eyebrow}>Words travel</p>
          <h2 id="share-title">Share this essay.</h2>
        </div>
        {nativeShare ? (
          <button className={styles.primary} type="button" onClick={share}>
            Share <span aria-hidden="true">↗</span>
          </button>
        ) : null}
      </div>
      <div className={styles.shareLinks} aria-label="Sharing options">
        {ready ? (
          <button type="button" onClick={copyLink}>
            Copy link <span aria-hidden="true">↗</span>
          </button>
        ) : null}
        <a href={`https://wa.me/?text=${message}`} target="_blank" rel="noreferrer">
          WhatsApp ↗
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn ↗
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          Facebook ↗
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noreferrer"
        >
          X ↗
        </a>
        <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${message}`}>Email ↗</a>
      </div>
      <p className={styles.status} role="status">
        {status}
      </p>
      {copyFallback ? (
        <input
          className={styles.copyUrl}
          aria-label="Article link"
          readOnly
          value={url}
          onFocus={(event) => event.currentTarget.select()}
        />
      ) : null}
    </section>
  );
}
