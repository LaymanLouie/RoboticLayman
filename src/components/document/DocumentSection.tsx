import { memo, type ReactNode } from "react";
import ScrollRevealSection from "@/components/primitives/ScrollRevealSection";

interface DocumentSectionProps {
  title?: string;
  delay?: number;
  children: ReactNode;
}

const DocumentSection = memo(function DocumentSection({ title, delay = 0, children }: DocumentSectionProps) {
  return (
    <ScrollRevealSection delay={delay}>
      <section>
        {title && <h2 className="text-xl sm:text-2xl 3xl:text-3xl 4xl:text-4xl font-semibold text-foreground mb-4 3xl:mb-6">{title}</h2>}
        <div className="space-y-3">{children}</div>
      </section>
    </ScrollRevealSection>
  );
});

export default DocumentSection;
