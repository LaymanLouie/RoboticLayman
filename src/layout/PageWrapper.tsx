import { memo, ReactNode, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { useLayout } from "@/contexts/LayoutContext";
import { DURATION, EASING } from "@/lib/constants";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

const PageWrapper = memo(function PageWrapper({ children, className = "" }: PageWrapperProps) {
  const { refreshScrollState } = useLayout();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      refreshScrollState();
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [refreshScrollState]);

  return (
    <motion.div
      className={`flex-1 flex flex-col relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION.fast, ease: EASING.smooth }}
    >
      <div className="fixed inset-0 pointer-events-none will-change-transform" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[1200px] bg-primary/10 rounded-full blur-[200px]" />
        <div className="absolute top-[10%] left-[8%] w-[40vw] max-w-[700px] h-[40vw] max-h-[700px] bg-accent/8 rounded-full blur-[180px]" />
        <div className="hidden 3xl:block absolute bottom-[8%] right-[6%] w-[35vw] max-w-[800px] h-[35vw] max-h-[800px] bg-primary/8 rounded-full blur-[200px]" />
      </div>

      {children}
    </motion.div>
  );
});

export default PageWrapper;
