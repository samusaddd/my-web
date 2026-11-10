"use client";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { readingFonts, type ReadingFontId } from "@/lib/reading-fonts";
import styles from "./article-reader.module.css";

export function ArticleReader({
  url,
  sample,
  hasContents,
}: {
  url: string;
  sample: string;
  hasContents: boolean;
}) {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(1);
  const [status, setStatus] = useState("");
  const [fontId, setFontId] = useState<ReadingFontId>("original");
  const [ready, setReady] = useState(false);
  const frame = useRef(0);
  const preferences = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const previousOverflow = useRef("");
  const preferencesOpen = useRef(false);
  const selectedFont = readingFonts.find((font) => font.id === fontId) || readingFonts[0];
  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem("samir-reading-scale"));
      if (saved >= 0.9 && saved <= 1.3) setScale(saved);
      const savedFont = readingFonts.find(
        (font) => font.id === localStorage.getItem("samir-reading-font"),
      );
      if (savedFont) setFontId(savedFont.id);
    } catch {}
    setReady(true);
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
    if (!ready) return;
    const prose = document.getElementById("essay-content");
    prose?.style.setProperty("--reader-scale", String(scale));
    prose?.style.setProperty("--reader-typeface-scale", String(selectedFont.size));
    if (fontId === "original") prose?.style.removeProperty("--reader-font-family");
    else prose?.style.setProperty("--reader-font-family", selectedFont.family);
    if (prose) prose.dataset.readerFont = fontId;
    try {
      localStorage.setItem("samir-reading-scale", String(scale));
      localStorage.setItem("samir-reading-font", fontId);
    } catch {}
  }, [scale, url, fontId, ready, selectedFont]);
  useEffect(
    () => () => {
      if (preferencesOpen.current) document.body.style.overflow = previousOverflow.current;
    },
    [],
  );
  useEffect(() => {
    if (preferences.current?.open) preferences.current.close();
  }, [url]);
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(""), 3500);
    return () => clearTimeout(timer);
  }, [status]);
  function changeSize(delta: number) {
    setScale((current) => Math.max(0.9, Math.min(1.3, Math.round((current + delta) * 10) / 10)));
  }
  function openPreferences() {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    previousOverflow.current = document.body.style.overflow;
    preferences.current?.showModal();
    preferencesOpen.current = true;
    document.body.style.overflow = "hidden";
    preferences.current?.querySelector<HTMLInputElement>("input:checked")?.focus();
  }
  function restorePreferences() {
    document.body.style.overflow = previousOverflow.current;
    preferencesOpen.current = false;
    opener.current?.focus({ preventScroll: true });
  }
  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab" || event.ctrlKey || event.altKey || event.metaKey) return;
    const controls = preferences.current?.querySelectorAll<HTMLElement>(
      "button:not([disabled]), input:checked",
    );
    if (!controls?.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
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
    <>
      <div className={styles.preferenceEntry} hidden={!ready}>
        <span>Reading room</span>
        <button
          type="button"
          onClick={openPreferences}
          aria-haspopup="dialog"
          aria-controls="reading-preferences"
        >
          Choose your typeface <span aria-hidden="true">↗</span>
        </button>
      </div>
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
        {hasContents ? (
          <button
            type="button"
            onClick={contents}
            aria-label="Open essay contents"
            title="Essay contents"
          >
            ≡
          </button>
        ) : null}
        <button
          type="button"
          onClick={openPreferences}
          aria-label="Choose reading font"
          aria-haspopup="dialog"
          aria-controls="reading-preferences"
          title="Choose reading font"
        >
          Aa
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
        <button className={styles.copy} type="button" onClick={copy} aria-label="Copy link">
          <span className={styles.copyLabel}>Copy link</span> <span aria-hidden="true">↗</span>
        </button>
        <p className={styles.status} role="status" aria-live="polite">
          {status}
        </p>
      </div>
      <dialog
        ref={preferences}
        id="reading-preferences"
        className={styles.preferences}
        aria-labelledby="reading-preferences-title"
        onClose={restorePreferences}
        onKeyDown={containFocus}
      >
        <div className={styles.preferencesInner}>
          <div className={styles.preferencesTop}>
            <span>The reading room / Make yourself at home</span>
            <button
              type="button"
              onClick={() => preferences.current?.close()}
              aria-label="Close reading preferences"
            >
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <h2 id="reading-preferences-title">
            A different <em>kind of voice.</em>
          </h2>
          <p className={styles.preferencesIntro}>
            Choose a typeface. Your reading preferences follow you from essay to essay.
          </p>
          <fieldset className={styles.fontChoices}>
            <legend className="sr-only">Reading typeface</legend>
            {readingFonts.map((font) => (
              <label className={styles.fontChoice} key={font.id} data-selected={font.id === fontId}>
                <input
                  type="radio"
                  name="reading-typeface"
                  value={font.id}
                  checked={font.id === fontId}
                  onChange={() => setFontId(font.id)}
                />
                <span className={styles.fontCharacter}>{font.character}</span>
                <span
                  className={styles.fontSpecimen}
                  style={{ fontFamily: font.family }}
                  aria-hidden="true"
                >
                  The art of being.
                </span>
                <span className={styles.fontName}>{font.name}</span>
              </label>
            ))}
          </fieldset>
          <div
            className={styles.preview}
            style={{
              fontFamily: selectedFont.family,
              fontSize: `${1.5 * selectedFont.size * scale}rem`,
            }}
            aria-label="Typeface preview"
          >
            {sample}
          </div>
          <div className={styles.preferencesBottom}>
            <div className={styles.sizeChoices}>
              <span>Text size</span>
              <button
                type="button"
                onClick={() => changeSize(-0.1)}
                disabled={scale <= 0.9}
                aria-label="Smaller preview text"
              >
                A−
              </button>
              <output aria-label="Text size">{Math.round(scale * 100)}%</output>
              <button
                type="button"
                onClick={() => changeSize(0.1)}
                disabled={scale >= 1.3}
                aria-label="Larger preview text"
              >
                A+
              </button>
            </div>
            <button
              type="button"
              className={styles.reset}
              onClick={() => {
                setFontId("original");
                setScale(1);
              }}
            >
              Reset preferences <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
