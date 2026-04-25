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
  aside,
  containerClassName = "max-w-6xl",
}: PageHeroProps) {
  const hasSideContent = Boolean(aside || metrics?.length);

  return (
    <MotionSection
      className="pt-16 sm:pt-24"
      containerClassName={containerClassName}
      motionClassName={
        hasSideContent
          ? "grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch"
          : "mx-auto flex max-w-4xl flex-col gap-6 text-center"
      }
    >
      <div className={hasSideContent ? "surface-elevated relative overflow-hidden p-8 md:p-10" : "space-y-6"}>
        <div
          aria-hidden="true"
          className={
            hasSideContent
              ? "pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.42),transparent)]"
              : "hidden"
          }
        />
        <div className={hasSideContent ? "relative space-y-6" : "space-y-6"}>
          <Badge className={hasSideContent ? undefined : "mx-auto"} variant="accent">
            {badge}
          </Badge>
          <div className="space-y-4">
            {eyebrow ? (
              <p
                className={
                  hasSideContent
                    ? "text-xs font-semibold uppercase text-cyan-100/60"
                    : "mx-auto max-w-2xl text-xs font-semibold uppercase text-cyan-100/60"
                }
              >
                {eyebrow}
              </p>
            ) : null}
            <h1 className={hasSideContent ? "max-w-4xl" : undefined}>{title}</h1>
            <p
              className={
                hasSideContent
                  ? "max-w-2xl text-base text-white/75 sm:text-lg"
                  : "mx-auto max-w-3xl text-base text-white/75 sm:text-lg"
              }
            >
              {description}
            </p>
            {secondaryDescription ? (
              <p
                className={
                  hasSideContent
                    ? "max-w-2xl text-base text-white/68"
                    : "mx-auto max-w-3xl text-base text-white/68"
                }
              >
                {secondaryDescription}
              </p>
            ) : null}
          </div>
          {actions?.length ? (
            <div className={hasSideContent ? "flex flex-wrap gap-3" : "flex flex-wrap justify-center gap-3"}>
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
      </div>

      {hasSideContent ? (
        <div className="grid gap-4">
          {aside}
          {metrics?.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {metrics.map((metric) => (
                <div
                  className="rounded-3xl border border-white/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                  key={`${metric.label}-${metric.value}`}
                >
                  <p className="text-2xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-2 text-xs uppercase text-white/45">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </MotionSection>
  );
}
