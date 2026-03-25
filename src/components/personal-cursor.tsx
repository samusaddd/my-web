"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "framer-motion";

import { useCanHover } from "@/components/motion/use-can-hover";
import { cn } from "@/lib/cn";

type CursorMode = "default" | "interactive" | "text";

const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  "summary",
  "label[for]",
  "[role='button']",
  "[data-cursor='interactive']",
  "input[type='button']",
  "input[type='submit']",
  "input[type='reset']",
].join(", ");

const TEXT_SELECTOR = [
  "textarea",
  "select",
  "[contenteditable='true']",
  "input:not([type='checkbox']):not([type='radio']):not([type='range']):not([type='button']):not([type='submit']):not([type='reset'])",
].join(", ");

function resolveMode(target: EventTarget | null): CursorMode {
  if (!(target instanceof Element)) {
    return "default";
  }

  if (target.closest(TEXT_SELECTOR)) {
    return "text";
  }

  if (target.closest(INTERACTIVE_SELECTOR)) {
    return "interactive";
  }

  return "default";
}

export function PersonalCursor() {
  const canHover = useCanHover();
  const reducedMotion = useReducedMotion() ?? false;
  const enabled = canHover && !reducedMotion;

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const modeRef = useRef<CursorMode>("default");
  const visibleRef = useRef(false);
  const frameRef = useRef(0);
  const stateRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    if (!enabled) {
      root.classList.remove("has-custom-cursor");
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) {
      return;
    }

    root.classList.add("has-custom-cursor");

    let active = true;
    const state = stateRef.current;
    state.x = window.innerWidth / 2;
    state.y = window.innerHeight / 2;
    state.targetX = state.x;
    state.targetY = state.y;

    const setCursorMode = (nextMode: CursorMode) => {
      if (modeRef.current === nextMode) {
        return;
      }

      modeRef.current = nextMode;
      setMode(nextMode);
    };

    const setCursorVisible = (nextVisible: boolean) => {
      if (visibleRef.current === nextVisible) {
        return;
      }

      visibleRef.current = nextVisible;
      setVisible(nextVisible);
    };

    const tick = () => {
      state.x += (state.targetX - state.x) * 0.18;
      state.y += (state.targetY - state.y) * 0.18;
      cursor.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;

      if (active) {
        frameRef.current = window.requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }

      state.targetX = event.clientX;
      state.targetY = event.clientY;
      setCursorVisible(true);
      setCursorMode(resolveMode(event.target));
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }

      setPressed(true);
      setCursorMode(resolveMode(event.target));
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }

      setPressed(false);
      setCursorMode(resolveMode(event.target));
    };

    const handleMouseOver = (event: MouseEvent) => {
      setCursorMode(resolveMode(event.target));
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        setCursorVisible(false);
        setPressed(false);
      }
    };

    const handleWindowBlur = () => {
      setCursorVisible(false);
      setPressed(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setCursorVisible(false);
        setPressed(false);
      }
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      active = false;
      root.classList.remove("has-custom-cursor");
      window.cancelAnimationFrame(frameRef.current);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "custom-cursor",
        visible && "is-visible",
        mode === "interactive" && "is-interactive",
        mode === "text" && "is-text",
        pressed && "is-down",
      )}
      ref={cursorRef}
    >
      <span className="custom-cursor-glow" />
      <span className="custom-cursor-ring" />
      <span className="custom-cursor-core" />
      <span className="custom-cursor-satellite" />
    </div>
  );
}
