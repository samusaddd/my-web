"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

const particles = [
  { x: 12, y: 20, size: 6, delay: "0.4s" },
  { x: 25, y: 60, size: 8, delay: "1.2s" },
  { x: 38, y: 27, size: 5, delay: "1.8s" },
  { x: 49, y: 74, size: 7, delay: "0.8s" },
  { x: 63, y: 24, size: 8, delay: "1.5s" },
  { x: 72, y: 44, size: 6, delay: "0.2s" },
  { x: 84, y: 18, size: 10, delay: "1.1s" },
  { x: 88, y: 68, size: 7, delay: "1.9s" },
  { x: 94, y: 36, size: 5, delay: "0.7s" },
] as const;

const ribbons = [
  "M -6 78 C 16 56, 34 58, 52 44 S 86 18, 126 26",
  "M -2 94 C 12 82, 28 76, 46 78 S 78 88, 124 64",
  "M 22 8 C 40 18, 60 20, 78 16 S 104 8, 126 14",
  "M 6 42 C 18 34, 32 32, 48 34 S 82 44, 118 32",
] as const;

const columns = [
  { left: "56%", top: "12%", height: "72%" },
  { left: "72%", top: "18%", height: "58%" },
  { left: "86%", top: "9%", height: "66%" },
] as const;

export function HeroBackground({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    const host = element?.parentElement;

    if (!element || !host || reducedMotion) {
      return;
    }

    let frame = 0;
    let active = true;

    const state = {
      currentX: 50,
      currentY: 50,
      targetX: 50,
      targetY: 50,
      currentShiftX: 0,
      currentShiftY: 0,
      targetShiftX: 0,
      targetShiftY: 0,
    };

    const tick = () => {
      state.currentX += (state.targetX - state.currentX) * 0.08;
      state.currentY += (state.targetY - state.currentY) * 0.08;
      state.currentShiftX += (state.targetShiftX - state.currentShiftX) * 0.08;
      state.currentShiftY += (state.targetShiftY - state.currentShiftY) * 0.08;

      element.style.setProperty("--hero-x", `${state.currentX}%`);
      element.style.setProperty("--hero-y", `${state.currentY}%`);
      element.style.setProperty("--hero-shift-x", `${state.currentShiftX}px`);
      element.style.setProperty("--hero-shift-y", `${state.currentShiftY}px`);

      if (active) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;

      state.targetX = Math.max(0, Math.min(100, x));
      state.targetY = Math.max(0, Math.min(100, y));
      state.targetShiftX = ((x - 50) / 50) * 14;
      state.targetShiftY = ((y - 50) / 50) * 10;
    };

    const reset = () => {
      state.targetX = 50;
      state.targetY = 50;
      state.targetShiftX = 0;
      state.targetShiftY = 0;
    };

    host.addEventListener("pointermove", handlePointerMove);
    host.addEventListener("pointerleave", reset);

    frame = window.requestAnimationFrame(tick);

    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", handlePointerMove);
      host.removeEventListener("pointerleave", reset);
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className={cn("hero-field pointer-events-none absolute inset-0 overflow-hidden", className)}
      ref={ref}
    >
      <div className="hero-mesh absolute inset-0" />
      <div className="hero-grid-fade absolute inset-0" />
      <div className="hero-glow hero-glow-primary absolute left-[-18%] top-[12%] h-[28rem] w-[28rem] rounded-full" />
      <div className="hero-glow hero-glow-secondary absolute right-[-12%] top-[-10%] h-[28rem] w-[28rem] rounded-full" />
      <div className="hero-glow hero-glow-tertiary absolute left-[30%] top-[48%] h-[20rem] w-[32rem] rounded-full" />
      <div className="hero-sweep absolute left-[38%] top-[8%] hidden h-[82%] w-[48%] rounded-full md:block" />
      <div className="hero-wave hero-wave-top absolute left-[44%] top-[14%] hidden h-[18rem] w-[30rem] rounded-full md:block" />
      <div className="hero-wave hero-wave-bottom absolute left-[26%] top-[50%] hidden h-[16rem] w-[32rem] rounded-full md:block" />

      <svg
        className="hero-traces absolute inset-0 hidden h-full w-full md:block"
        fill="none"
        viewBox="0 0 120 100"
      >
        {ribbons.map((trace, index) => (
          <path
            className="hero-trace"
            d={trace}
            key={trace}
            pathLength="1"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.05"
            style={{ animationDelay: `${index * -2.4}s` }}
          />
        ))}
      </svg>

      {columns.map((column) => (
        <span
          className="hero-column absolute hidden w-px md:block"
          key={`${column.left}-${column.top}`}
          style={{ left: column.left, top: column.top, height: column.height }}
        />
      ))}

      {particles.map((particle) => (
        <span
          className="hero-particle absolute rounded-full border border-white/15 bg-white/80"
          key={`${particle.x}-${particle.y}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: particle.delay,
          }}
        />
      ))}

      <div className="hero-focus-light absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),transparent_22%,transparent_74%,rgba(255,255,255,0.015))]" />
    </div>
  );
}
