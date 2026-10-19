import { Section } from "@/components/ui";
type MotionSectionProps = React.ComponentProps<typeof Section> & {
  motionClassName?: string; distance?: number; staggerChildren?: number;
  delayChildren?: number; inViewMargin?: string;
};
export function MotionSection({
  children, motionClassName, distance: _distance, staggerChildren: _stagger,
  delayChildren: _delay, inViewMargin: _margin, ...props
}: MotionSectionProps) {
  return <Section {...props}><div className={motionClassName}>{children}</div></Section>;
}