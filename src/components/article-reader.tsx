"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./article-reader.module.css";

export function ArticleReader({ url }: { url: string }) {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(1);
  const [status, setStatus] = useState("");
  const frame = useRef(0);
  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem("samir-reading-scale"));
      if (saved >= 0.9 && saved <= 1.3) setScale(saved);
    } catch {}
    const prose = document.getElementById("essay-content");
    if (!prose) return;
    const headings = Array.from(prose.querySelectorAll<HTMLElement>("h2[id],h3[id]"));
    const player = prose.querySelector("iframe");
    const update = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = prose.getBoundingClientRect();
        const playerRect = player?.getBoundingClientRect();
        const playerVisible = playerRect && playerRect.top < innerHeight && playerRect.bottom > 0;
        setActive(
          rect.top < innerHeight * 0.7 && rect.bottom > innerHeight * 0.2 && !playerVisible,
        );
        const range = Math.max(1, rect.height - innerHeight * 0.6);
        setProgress(Math.max(0, Math.min(100, ((-rect.top + innerHeight * 0.2) / range) * 100)));
        const current =
          headings.filter((h) => h.getBoundingClientRect().top <= 170).at(-1) || headings[0];
        document.querySelectorAll<HTMLAnchorElement>("a[data-essay-section]").forEach((link) => {
          if (link.dataset.essaySection === current?.id)
            link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(prose);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame.current);
      observer.disconnect();
    };
  }, [url]);
  useEffect(() => {
    const prose = document.getElementById("essay-content");
    prose?.style.setProperty("--reader-scale", String(scale));
    try {
      localStorage.setItem("samir-reading-scale", String(scale));
    } catch {}
  }, [scale, url]);
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(""), 3500);
    return () => clearTimeout(timer);
  }, [status]);
  function changeSize(delta: number) {
    setScale((current) => Math.max(0.9, Math.min(1.3, Math.round((current + delta) * 10) / 10)));
  }
  function contents() {
    const disclosure = document.querySelector<HTMLDetailsElement>("details[data-reader-contents]");
    if (disclosure && getComputedStyle(disclosure).display !== "none") {
      disclosure.open = true;
      disclosure.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      disclosure.querySelector<HTMLElement>("summary")?.focus({ preventScroll: true });
    } else
      document
        .querySelector<HTMLElement>('a[data-essay-section][aria-current="location"]')
        ?.focus();
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Article link copied.");
    } catch {
      setStatus("Copy is unavailable. You can copy this page’s address.");
    }
  }
  return (
    <div
      className={"reader-dock " + styles.dock}
      data-visible={active}
      aria-label="Reading tools"
      hidden={!active}
    >
      <div className={styles.progressLine} aria-hidden="true">
        <span style={{ width: progress + "%" }} />
      </div>
      <div
        className={styles.percentage}
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <span>Reading</span> {Math.round(progress)}%
      </div>
      <button
        type="button"
        onClick={contents}
        aria-label="Open essay contents"
        title="Essay contents"
      >
        ≡
      </button>
      <button
        type="button"
        onClick={() => changeSize(-0.1)}
        disabled={scale <= 0.9}
        aria-label="Decrease text size"
        title="Decrease text size"
      >
        A−
      </button>
      <button
        type="button"
        onClick={() => changeSize(0.1)}
        disabled={scale >= 1.3}
        aria-label="Increase text size"
        title="Increase text size"
      >
        A+
      </button>
      <button className={styles.copy} type="button" onClick={copy}>
        Copy link <span aria-hidden="true">↗</span>
      </button>
      <p className={styles.status} role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
