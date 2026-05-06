import { memo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { DURATION, EASING } from "@/lib/constants";
import GradientText from "@/components/primitives/GradientText";
import PageWrapper from "@/layout/PageWrapper";

interface DocumentPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

const DocumentPageLayout = memo(function DocumentPageLayout({
  title,
  lastUpdated,
  children,
}: DocumentPageLayoutProps) {
  return (
    <PageWrapper>
      <section className="pt-24 pb-12 px-6">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl 3xl:text-8xl 4xl:text-9xl 5xl:text-[12rem] font-bold tracking-tight leading-[1.15] pb-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, ease: EASING.smooth }}
          >
            <GradientText gradient="louie">{title}</GradientText>
          </motion.h1>
          <motion.p
            className="text-sm 3xl:text-base text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATION.reveal, delay: 0.2 }}
          >
            Last updated: {lastUpdated}
          </motion.p>
        </div>
      </section>
      <section className="pb-24 px-6">
        <div className="max-w-3xl 3xl:max-w-5xl 4xl:max-w-6xl 5xl:max-w-7xl mx-auto space-y-10 3xl:space-y-14 text-muted-foreground 3xl:text-lg 4xl:text-xl leading-relaxed">{children}</div>
      </section>
    </PageWrapper>
  );
});

export default DocumentPageLayout;
