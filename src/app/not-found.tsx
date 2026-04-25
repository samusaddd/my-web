import { MotionSection } from "@/components/motion/motion-section";
import { Badge, ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <MotionSection
      className="pt-24 sm:pt-32"
      containerClassName="max-w-3xl"
      motionClassName="surface-elevated flex flex-col items-center gap-6 p-10 text-center md:p-14"
    >
      <Badge variant="accent">404</Badge>
      <h1 className="text-4xl sm:text-5xl">Page not found</h1>
      <p className="max-w-2xl text-base text-white/75">
        The page you were looking for does not exist or has moved. Use the primary navigation or
        return to the homepage.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact
        </ButtonLink>
      </div>
    </MotionSection>
  );
}
