import * as React from "react";

import { cn } from "@/lib/cn";

type BadgeVariant = "neutral" | "accent";

const badgeVariantClasses: Record<BadgeVariant, string> = {
  neutral: "border-ink/12 bg-ivory text-ink/68",
  accent: "border-accent/18 bg-accent/[0.06] text-accent",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]",
        badgeVariantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
