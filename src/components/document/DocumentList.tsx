import { memo, type ReactNode } from "react";

const DocumentList = memo(function DocumentList({ children }: { children: ReactNode }) {
  return <ul className="list-disc list-outside pl-5 space-y-1.5 text-muted-foreground">{children}</ul>;
});

export default DocumentList;
