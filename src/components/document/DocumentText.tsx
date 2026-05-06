import { memo, type ReactNode } from "react";

interface DocumentTextProps {
  children: ReactNode;
  emphasis?: boolean;
  highlight?: boolean;
}

const DocumentText = memo(function DocumentText({ children, emphasis, highlight }: DocumentTextProps) {
  return (
    <p className={highlight ? "text-primary font-medium" : emphasis ? "text-foreground/90 font-medium" : ""}>
      {children}
    </p>
  );
});

export default DocumentText;
