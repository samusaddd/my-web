"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

const nodes = [
  { x: 17, y: 28, size: 12, delay: "0.0s" },
  { x: 34, y: 18, size: 8, delay: "0.8s" },
  { x: 53, y: 24, size: 10, delay: "1.2s" },
  { x: 70, y: 14, size: 14, delay: "1.7s" },
  { x: 83, y: 31, size: 10, delay: "0.5s" },
  { x: 24, y: 48, size: 10, delay: "1.0s" },
  { x: 47, y: 46, size: 16, delay: "0.3s" },
  { x: 63, y: 54, size: 10, delay: "1.4s" },
  { x: 80, y: 50, size: 8, delay: "1.9s" },
  { x: 18, y: 71, size: 10, delay: "0.7s" },
  { x: 38, y: 79, size: 8, delay: "1.6s" },
  { x: 56, y: 72, size: 12, delay: "0.4s" },
  { x: 74, y: 78, size: 14, delay: "1.1s" },
  { x: 88, y: 67, size: 9, delay: "1.8s" },
] as const;

const traces = [
  "M 17 28 C 24 23, 28 19, 34 18 S 47 21, 53 24 S 64 18, 70 14 S 79 23, 83 31",
  "M 24 48 C 30 46, 39 45, 47 46 S 57 50, 63 54 S 74 52, 80 50",
  "M 18 71 C 25 77, 32 80, 38 79 S 50 74, 56 72 S 69 76, 74 78 S 85 72, 88 67",
  "M 34 18 C 32 31, 28 39, 24 48 S 20 62, 18 71",
  "M 70 14 C 68 25, 66 40, 63 54 S 59 66, 56 72",
] as const;

const labels = [
  { x: 16, y: 12, text: "Systems" },
  { x: 71, y: 22, text: "Writing" },
  { x: 66, y: 84, text: "Governance" },
] as const;

export function Engine({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion() ?? false;
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || reducedMotion) {
      return;
    }

    let frame = 0;
    let active = true;

    const state = {
      currentX: 50,
      currentY: 50,
      targetX: 50,
      targetY: 50,
    };

    const tick = () => {
      state.currentX += (state.targetX - state.currentX) * 0.08;
      state.currentY += (state.targetY - state.currentY) * 0.08;

      shell.style.setProperty("--engine-x", `${state.currentX}%`);
      shell.style.setProperty("--engine-y", `${state.currentY}%`);

      if (active) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const updateFromEvent = (event: PointerEvent) => {
      const bounds = shell.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;

      state.targetX = Math.max(0, Math.min(100, x));
      state.targetY = Math.max(0, Math.min(100, y));
    };

    const resetTarget = () => {
      state.targetX = 50;
      state.targetY = 50;
    };

    shell.addEventListener("pointermove", updateFromEvent);
    shell.addEventListener("pointerleave", resetTarget);

    frame = window.requestAnimationFrame(tick);

    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
      shell.removeEventListener("pointermove", updateFromEvent);
      shell.removeEventListener("pointerleave", resetTarget);
    };
  }, [reducedMotion]);

  return (
    <div
      className={cn(
        "engine-shell relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(6,10,18,0.86)]",
        className,
      )}
      ref={shellRef}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--engine-x,50%)_var(--engine-y,50%),rgba(125,211,252,0.18),transparent_28%),radial-gradient(circle_at_70%_18%,rgba(167,139,250,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:2.75rem_2.75rem] [mask-image:radial-gradient(circle_at_center,black_38%,transparent_82%)]"
      />

      <div
        aria-hidden="true"
        className="engine-beam pointer-events-none absolute left-[12%] top-[10%] h-[78%] w-[42%] rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.18),transparent_62%)] blur-3xl"
      />

      <div className="relative aspect-[1.08/1] w-full">
        <svg
          aria-hidden="true"
          className="absolute inset-[10%] h-[80%] w-[80%] text-white/25"
          fill="none"
          viewBox="0 0 100 100"
        >
          {traces.map((trace) => (
            <path
              className="engine-trace"
              d={trace}
              key={trace}
              pathLength="1"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="0.85"
            />
          ))}
        </svg>

        <div
          aria-hidden="true"
          className="engine-orbit absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-200/20"
        />
        <div
          aria-hidden="true"
          className="engine-orbit engine-orbit-reverse absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-200/15"
        />

        {nodes.map((node) => (
          <span
            aria-hidden="true"
            className="engine-node absolute rounded-full border border-white/30 bg-white/80 shadow-[0_0_0_6px_rgba(255,255,255,0.04),0_0_32px_rgba(125,211,252,0.22)]"
            key={`${node.x}-${node.y}`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: `${node.size}px`,
              height: `${node.size}px`,
              animationDelay: node.delay,
            }}
          />
        ))}

        {labels.map((label) => (
          <span
            className="absolute rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-white/55 backdrop-blur"
            key={label.text}
            style={{ left: `${label.x}%`, top: `${label.y}%` }}
          >
            {label.text}
          </span>
        ))}

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-black/35 px-4 py-3 backdrop-blur">
          <div className="space-y-1">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/45">
              Active engine
            </p>
            <p className="text-sm text-white/80">Mapping clear next steps through complexity.</p>
          </div>
          <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-emerald-100">
            Stable
          </div>
        </div>
      </div>
    </div>
  );
}
