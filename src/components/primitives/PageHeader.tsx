import { memo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { DURATION, EASING } from "@/lib/constants";

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  align?: "center";
}

export const PAGE_TITLE_CLASSES =
  "text-5xl md:text-7xl 3xl:text-8xl 4xl:text-9xl 5xl:text-[12rem] font-bold tracking-tight leading-[1.15] pb-2 mb-8";

export const PAGE_SUBTITLE_CLASSES =
  "text-xl md:text-2xl 3xl:text-3xl 4xl:text-4xl text-muted-foreground max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl mx-auto font-light";

const PageHeader = memo(function PageHeader({ title, subtitle, meta }: PageHeaderProps) {
  return (
    <section className="pt-24 pb-12 px-6">
      <div className="container mx-auto text-center">
        <motion.h1
          className={PAGE_TITLE_CLASSES}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.reveal, ease: EASING.smooth }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className={PAGE_SUBTITLE_CLASSES}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, delay: 0.2, ease: EASING.smooth }}
          >
            {subtitle}
          </motion.p>
        )}
        {meta && (
          <motion.p
            className="text-sm 3xl:text-base text-muted-foreground/70 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATION.reveal, delay: 0.35, ease: EASING.smooth }}
          >
            {meta}
          </motion.p>
        )}
      </div>
    </section>
  );
});

export default PageHeader;
