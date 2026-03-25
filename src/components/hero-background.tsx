"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

const particles = [
  { x: 13, y: 24, size: 8, delay: "0.4s" },
  { x: 22, y: 63, size: 10, delay: "1.2s" },
  { x: 35, y: 31, size: 6, delay: "1.8s" },
  { x: 48, y: 72, size: 9, delay: "0.8s" },
  { x: 62, y: 29, size: 10, delay: "1.5s" },
  { x: 77, y: 66, size: 7, delay: "0.2s" },
  { x: 86, y: 22, size: 12, delay: "1.1s" },
  { x: 90, y: 52, size: 8, delay: "1.9s" },
] as const;

const traces = [
  "M 6 62 C 16 46, 28 41, 42 44 S 67 52, 82 38 S 97 24, 102 30",
  "M 18 82 C 30 68, 46 64, 58 68 S 79 76, 95 62",
  "M 22 18 C 35 26, 48 31, 63 29 S 89 17, 104 21",
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
      <div className="hero-glow hero-glow-primary absolute left-[-12%] top-[-8%] h-[24rem] w-[24rem] rounded-full" />
      <div className="hero-glow hero-glow-secondary absolute right-[-6%] top-[12%] h-[26rem] w-[26rem] rounded-full" />
      <div className="hero-panel absolute right-[8%] top-[10%] hidden h-[72%] w-[44%] rounded-[2rem] border border-white/8 bg-white/[0.025] backdrop-blur-[2px] md:block" />

      <svg
        className="hero-traces absolute inset-y-[14%] right-[5%] hidden h-[72%] w-[62%] md:block"
        fill="none"
        viewBox="0 0 104 100"
      >
        {traces.map((trace, index) => (
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

      <div className="hero-halo hero-halo-lg absolute right-[18%] top-[19%] hidden h-[20rem] w-[20rem] rounded-full border border-white/10 md:block" />
      <div className="hero-halo hero-halo-sm absolute right-[26%] top-[32%] hidden h-[11rem] w-[11rem] rounded-full border border-sky-200/14 md:block" />

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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--hero-x,50%)_var(--hero-y,50%),rgba(125,211,252,0.16),transparent_22%),radial-gradient(circle_at_72%_18%,rgba(196,181,253,0.14),transparent_26%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),transparent_22%,transparent_74%,rgba(255,255,255,0.015))]" />
    </div>
  );
}
