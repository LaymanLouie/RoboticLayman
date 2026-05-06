import { memo } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Bell } from "lucide-react";
import { DURATION, EASING } from "@/lib/constants";
import GradientText from "@/components/primitives/GradientText";
import PageTitle from "@/components/primitives/PageTitle";
import ScrollRevealSection from "@/components/primitives/ScrollRevealSection";
import PageWrapper from "@/layout/PageWrapper";
import usePageTitle from "@/hooks/usePageTitle";

const Merch = memo(function Merch() {
  usePageTitle("Merch");

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col">
        <section className="pt-24 pb-12 px-6">
          <div className="container mx-auto text-center">
            <motion.h1
              className="text-5xl md:text-7xl 3xl:text-8xl 4xl:text-9xl 5xl:text-[12rem] font-bold tracking-tight leading-[1.15] pb-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.reveal, ease: EASING.smooth }}
            >
              <PageTitle rest="Merch" />
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl 3xl:text-3xl 4xl:text-4xl text-muted-foreground max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl mx-auto font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.reveal, delay: 0.2, ease: EASING.smooth }}
            >
              Rep the Layman in style
            </motion.p>
          </div>
        </section>

        <section className="flex-1 flex items-center justify-center px-6 pb-24">
          <div className="max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl mx-auto text-center">
            <ScrollRevealSection>
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <ShoppingBag className="w-12 h-12 text-primary" />
              </div>
            </ScrollRevealSection>

            <ScrollRevealSection delay={0.1}>
              <h2 className="text-3xl md:text-4xl 3xl:text-5xl 4xl:text-6xl font-bold mb-4">Coming Soon</h2>
            </ScrollRevealSection>

            <ScrollRevealSection delay={0.2}>
              <p className="text-lg 3xl:text-xl 4xl:text-2xl text-muted-foreground mb-8">
                We're cooking up something special. Clothes, accessories, and more, all designed by the Layman Legion.
              </p>
            </ScrollRevealSection>

            <ScrollRevealSection delay={0.3}>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-muted/20 to-transparent border border-border/20 backdrop-blur-sm">
                <Bell className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Follow on socials for updates!</span>
              </div>
            </ScrollRevealSection>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
});

export default Merch;
