"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

type Point = {
  angle: number;
  orbit: number;
  stretch: number;
  speed: number;
  phase: number;
  size: number;
  mix: number;
  jitter: number;
};

const TAU = Math.PI * 2;

function mixColor(from: readonly number[], to: readonly number[], amount: number) {
  return [
    Math.round(from[0] + (to[0] - from[0]) * amount),
    Math.round(from[1] + (to[1] - from[1]) * amount),
    Math.round(from[2] + (to[2] - from[2]) * amount),
  ] as const;
}

export function HeroBackground({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion() ?? false;
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const canvas = canvasRef.current;
    const host = field?.parentElement;

    if (!field || !canvas || !host) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let frame = 0;
    let active = true;
    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let desktop = false;

    const cyan = [34, 211, 238] as const;
    const violet = [168, 85, 247] as const;

    const pointer = {
      currentX: 50,
      currentY: 50,
      targetX: 50,
      targetY: 50,
      currentShiftX: 0,
      currentShiftY: 0,
      targetShiftX: 0,
      targetShiftY: 0,
    };

    const setFieldVars = () => {
      field.style.setProperty("--hero-x", `${pointer.currentX}%`);
      field.style.setProperty("--hero-y", `${pointer.currentY}%`);
      field.style.setProperty("--hero-shift-x", `${pointer.currentShiftX}px`);
      field.style.setProperty("--hero-shift-y", `${pointer.currentShiftY}px`);
    };

    const createPoints = () => {
      const minDimension = Math.min(width, height);
      const count = width >= 1280 ? 96 : width >= 900 ? 74 : 48;
      const maxOrbit = minDimension * (desktop ? 0.34 : 0.25);

      points = Array.from({ length: count }, () => ({
        angle: Math.random() * TAU,
        orbit: minDimension * 0.06 + Math.random() * maxOrbit,
        stretch: 0.45 + Math.random() * 0.55,
        speed: 0.00018 + Math.random() * 0.00038,
        phase: Math.random() * TAU,
        size: 1.1 + Math.random() * 2.2,
        mix: Math.random(),
        jitter: 8 + Math.random() * 18,
      }));
    };

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      desktop = width >= 960;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.8);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      createPoints();
      setFieldVars();
      draw(performance.now());
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      const centerX =
        width * (desktop ? 0.74 : 0.5) + pointer.currentShiftX * (desktop ? 0.85 : 0.42);
      const centerY =
        height * (desktop ? 0.44 : 0.5) + pointer.currentShiftY * (desktop ? 0.52 : 0.34);

      const rendered = points.map((point) => {
        const angle = point.angle + time * point.speed;
        const orbit = point.orbit + Math.sin(time * 0.00085 + point.phase) * point.jitter;
        const x =
          centerX +
          Math.cos(angle) * orbit +
          Math.cos(time * 0.00045 + point.phase) * 18 +
          pointer.currentShiftX * 0.08;
        const y =
          centerY +
          Math.sin(angle + point.phase * 0.32) * orbit * point.stretch +
          Math.sin(time * 0.00055 + point.phase) * 12 +
          pointer.currentShiftY * 0.06;

        return { ...point, x, y };
      });

      context.save();
      context.globalCompositeOperation = "lighter";

      context.lineWidth = 1;
      context.strokeStyle = "rgba(255,255,255,0.06)";
      for (let index = 0; index < 3; index += 1) {
        context.beginPath();
        context.ellipse(
          centerX,
          centerY,
          Math.min(width, height) * (0.16 + index * 0.09),
          Math.min(width, height) * (0.09 + index * 0.05),
          -0.36,
          0,
          TAU,
        );
        context.stroke();
      }

      for (let outer = 0; outer < rendered.length; outer += 1) {
        for (let inner = outer + 1; inner < rendered.length; inner += 1) {
          const dx = rendered[outer].x - rendered[inner].x;
          const dy = rendered[outer].y - rendered[inner].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const threshold = desktop ? 118 : 86;

          if (distance > threshold) {
            continue;
          }

          const alpha = (1 - distance / threshold) * 0.18;
          const mix = (rendered[outer].mix + rendered[inner].mix) / 2;
          const [r, g, b] = mixColor(cyan, violet, mix);

          context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          context.beginPath();
          context.moveTo(rendered[outer].x, rendered[outer].y);
          context.lineTo(rendered[inner].x, rendered[inner].y);
          context.stroke();
        }
      }

      rendered.forEach((point) => {
        const [r, g, b] = mixColor(cyan, violet, point.mix);
        context.fillStyle = `rgba(${r}, ${g}, ${b}, 0.82)`;
        context.beginPath();
        context.arc(point.x, point.y, point.size, 0, TAU);
        context.fill();

        context.fillStyle = "rgba(255,255,255,0.7)";
        context.beginPath();
        context.arc(point.x, point.y, point.size * 0.32, 0, TAU);
        context.fill();
      });

      context.restore();
    };

    const tick = () => {
      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.08;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.08;
      pointer.currentShiftX += (pointer.targetShiftX - pointer.currentShiftX) * 0.08;
      pointer.currentShiftY += (pointer.targetShiftY - pointer.currentShiftY) * 0.08;

      setFieldVars();
      draw(performance.now());

      if (active && !reducedMotion) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;

      pointer.targetX = Math.max(0, Math.min(100, x));
      pointer.targetY = Math.max(0, Math.min(100, y));
      pointer.targetShiftX = ((x - 50) / 50) * (desktop ? 34 : 18);
      pointer.targetShiftY = ((y - 50) / 50) * (desktop ? 22 : 14);

      if (reducedMotion) {
        pointer.currentX = pointer.targetX;
        pointer.currentY = pointer.targetY;
        pointer.currentShiftX = pointer.targetShiftX;
        pointer.currentShiftY = pointer.targetShiftY;
        setFieldVars();
        draw(performance.now());
      }
    };

    const resetPointer = () => {
      pointer.targetX = 50;
      pointer.targetY = 50;
      pointer.targetShiftX = 0;
      pointer.targetShiftY = 0;

      if (reducedMotion) {
        pointer.currentX = 50;
        pointer.currentY = 50;
        pointer.currentShiftX = 0;
        pointer.currentShiftY = 0;
        setFieldVars();
        draw(performance.now());
      }
    };

    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", handlePointerMove);
    host.addEventListener("pointerleave", resetPointer);

    resize();

    if (reducedMotion) {
      draw(performance.now());
    } else {
      frame = window.requestAnimationFrame(tick);
    }

    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", handlePointerMove);
      host.removeEventListener("pointerleave", resetPointer);
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className={cn("hero-field pointer-events-none absolute inset-0 overflow-hidden", className)}
      ref={fieldRef}
    >
      <canvas className="hero-canvas absolute inset-0 h-full w-full" ref={canvasRef} />
      <div className="hero-aurora hero-aurora-cyan absolute left-[-16%] top-[-8%] h-[32rem] w-[32rem] rounded-full" />
      <div className="hero-aurora hero-aurora-violet absolute right-[-12%] top-[4%] h-[30rem] w-[30rem] rounded-full" />
      <div className="hero-spotlight absolute inset-0" />
      <div className="hero-vignette absolute inset-0" />
    </div>
  );
}
