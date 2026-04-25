import type { ReactNode } from "react";

import { MotionSection } from "@/components/motion/motion-section";
import { Badge, ButtonLink } from "@/components/ui";

type HeroAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  download?: boolean;
};

type HeroMetric = {
  label: string;
  value: string;
};

type PageHeroProps = {
  badge: string;
  title: string;
  eyebrow?: string;
  description: string;
  secondaryDescription?: string;
  actions?: readonly HeroAction[];
  metrics?: readonly HeroMetric[];
  aside?: ReactNode;
  containerClassName?: string;
};

export function PageHero({
  badge,
  title,
  eyebrow,
  description,
  secondaryDescription,
  actions,
  metrics,
  containerClassName = "max-w-7xl",
}: PageHeroProps) {
  return (
    <MotionSection
      className="pt-14 sm:pt-20"
      containerClassName={containerClassName}
      motionClassName="relative border-y border-white/10 py-10 md:py-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.34),transparent_58%)]"
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(10rem,0.34fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-6">
          <Badge variant="accent">
            {badge}
          </Badge>
          {eyebrow ? <p className="max-w-xs text-xs font-semibold uppercase text-cyan-100/60">{eyebrow}</p> : null}
          {actions?.length ? (
            <div className="hidden flex-col gap-3 lg:flex">
              {actions.map((action) => (
                <ButtonLink
                  download={action.download}
                  href={action.href}
                  key={`${action.href}-${action.label}`}
                  size="lg"
                  variant={action.variant}
                >
                  {action.label}
                </ButtonLink>
              ))}
            </div>
          ) : null}
        </div>

        <div className="space-y-7">
          <div className="space-y-5">
            <h1 className="max-w-5xl text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">{title}</h1>
            <p className="max-w-3xl text-base text-white/75 sm:text-xl">{description}</p>
            {secondaryDescription ? <p className="max-w-3xl text-base text-white/66">{secondaryDescription}</p> : null}
          </div>

          {actions?.length ? (
            <div className="flex flex-wrap gap-3 lg:hidden">
              {actions.map((action) => (
                <ButtonLink
                  download={action.download}
                  href={action.href}
                  key={`${action.href}-${action.label}`}
                  size="lg"
                  variant={action.variant}
                >
                  {action.label}
                </ButtonLink>
              ))}
            </div>
          ) : null}

          {metrics?.length ? (
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {metrics.map((metric) => (
                <div className="bg-zinc-950/72 p-5" key={`${metric.label}-${metric.value}`}>
                  <p className="text-2xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-2 text-xs uppercase text-white/45">{metric.label}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </MotionSection>
  );
}
