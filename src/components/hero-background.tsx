import Image from "next/image";

import homeStyles from "@/app/home.module.css";
import { cn } from "@/lib/cn";

export function HeroBackground({ className }: { className?: string }) {
  return (
    <figure aria-label="Editorial portrait of Samir Seddiqi" className={cn(homeStyles.portraitFigure, className)}>
      <div className={homeStyles.portraitFrame}>
        <Image
          alt="Samir Seddiqi standing in front of historic architecture"
          className={homeStyles.portraitImage}
          fill
          priority
          sizes="(max-width: 767px) 100vw, 47vw"
          src="/samir-hero-editorial.jpg"
          unoptimized
        />
        <div className={homeStyles.portraitGrade} aria-hidden="true" />
        <div className={homeStyles.portraitGrain} aria-hidden="true" />
      </div>
      <figcaption className={homeStyles.portraitNote}>
        Better systems.
        <span>Brighter lives.</span>
      </figcaption>
    </figure>
  );
}
