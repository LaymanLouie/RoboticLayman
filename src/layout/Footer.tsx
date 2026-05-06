import { memo, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { FOOTER_LEGAL_LINKS, DURATION, EASING } from "@/lib/constants";
import { visibleFooterRoutes, CURRENT_ROLE } from "@/config/accessConfig";

const FOOTER_NAV_LINKS = visibleFooterRoutes(CURRENT_ROLE);
import { BrandName } from "@/components/primitives/GradientText";

const REVEAL_FALLBACK_MS = 400;

const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();
  const { pathname } = useLocation();
  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef, { margin: "-50px" });

  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false);
    const fallback = setTimeout(() => setRevealed(true), REVEAL_FALLBACK_MS);
    return () => clearTimeout(fallback);
  }, [pathname]);

  useEffect(() => {
    if (inView) setRevealed(true);
  }, [inView]);

  return (
    <motion.footer
      ref={footerRef}
      className="py-8 px-6 mt-auto"
      initial={{ opacity: 0 }}
      animate={revealed ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: DURATION.reveal, ease: EASING.smooth }}
    >
      <div className="w-full max-w-[95vw] mx-auto px-4">
        <motion.div
          className="flex flex-wrap items-center justify-center lg:justify-between gap-x-1 gap-y-2 pb-6 border-b border-border/20"
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: DURATION.reveal, delay: 0.1, ease: EASING.smooth }}
        >
          <nav className="flex flex-wrap items-center justify-center gap-1">
            {FOOTER_NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 rounded-lg text-base font-medium text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {FOOTER_LEGAL_LINKS.length > 0 && (
            <nav className="flex flex-wrap items-center justify-center gap-1">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-2 rounded-lg text-base font-medium text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center lg:justify-between gap-x-4 gap-y-2 pt-6"
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: DURATION.reveal, delay: 0.2, ease: EASING.smooth }}
        >
          <p className="text-sm text-muted-foreground/60">
            Copyright © {currentYear} <BrandName />. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground/60 flex items-center gap-1">
            Made with
            <Heart className="w-3 h-3 text-primary" aria-hidden="true" />
            by The Layman Legion
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
});

export default Footer;
