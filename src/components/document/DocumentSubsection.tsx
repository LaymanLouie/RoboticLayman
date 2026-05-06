import { memo, type ReactNode } from "react";

interface DocumentSubsectionProps {
  title: string;
  children: ReactNode;
}

const DocumentSubsection = memo(function DocumentSubsection({ title, children }: DocumentSubsectionProps) {
  return (
    <div className="mt-5">
      <h3 className="text-base sm:text-lg font-semibold text-foreground/90 mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
});

export default DocumentSubsection;
