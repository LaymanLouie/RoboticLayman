import { memo, type ReactNode } from "react";
import GradientText from "@/components/primitives/GradientText";
import ScrollRevealSection from "@/components/primitives/ScrollRevealSection";

interface SectionHeadingProps {
  title: ReactNode;
  subtitle?: ReactNode;
  gradient?: "layman" | "louie";
  subtitleClassName?: string;
  titleMarginClassName?: string;
  subtitleMarginClassName?: string;
}

export const SECTION_TITLE_CLASSES =
  "text-3xl sm:text-4xl lg:text-6xl 3xl:text-7xl 4xl:text-8xl font-bold tracking-tight text-center";

export const SECTION_SUBTITLE_CLASSES =
  "text-lg sm:text-xl 3xl:text-2xl 4xl:text-3xl text-muted-foreground text-center font-light";

const SectionHeading = memo(function SectionHeading({
  title,
  subtitle,
  gradient = "layman",
  subtitleClassName = "",
  titleMarginClassName = "mb-4 sm:mb-6",
  subtitleMarginClassName = "mb-10 sm:mb-12 lg:mb-16",
}: SectionHeadingProps) {
  return (
    <>
      <ScrollRevealSection>
        <h2 className={`${SECTION_TITLE_CLASSES} ${titleMarginClassName}`}>
          <GradientText gradient={gradient}>{title}</GradientText>
        </h2>
      </ScrollRevealSection>
      {subtitle && (
        <ScrollRevealSection delay={0.1}>
          <p className={`${SECTION_SUBTITLE_CLASSES} ${subtitleMarginClassName} ${subtitleClassName}`}>{subtitle}</p>
        </ScrollRevealSection>
      )}
    </>
  );
});

export default SectionHeading;
