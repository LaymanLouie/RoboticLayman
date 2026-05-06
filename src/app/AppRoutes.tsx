import { memo, useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { KNOWN_ROUTES } from "@/lib/constants";
import { isPathAccessible, CURRENT_ROLE } from "@/config/accessConfig";
import Home from "@/pages/Home";
import Quotes from "@/pages/Quotes";
import Commands from "@/pages/Commands";
import Content from "@/pages/Content";
import Streams from "@/pages/Streams";
import Music from "@/pages/Music";
import Laypeople from "@/pages/Laypeople";
import Merch from "@/pages/Merch";
import Team from "@/pages/Team";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfUse from "@/pages/TermsOfUse";
import SalesAndRefunds from "@/pages/SalesAndRefunds";
import NotFound from "@/pages/NotFound";
import Navigation from "@/layout/Navigation";
import Footer from "@/layout/Footer";
import ScrollToTopButton from "@/layout/ScrollToTopButton";
import PageWrapper from "@/layout/PageWrapper";

const AppRoutes = memo(function AppRoutes() {
  const location = useLocation();
  const { pathname } = location;
  const isNotFoundPage = !KNOWN_ROUTES.includes(pathname);
  const guard = (path: string, element: JSX.Element) => (isPathAccessible(path, CURRENT_ROLE) ? element : <NotFound />);

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isNotFoundPage ? "" : "pt-16"}`}>
      <Navigation />
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <Routes location={location} key={pathname}>
            <Route path="/" element={<PageWrapper>{guard("/", <Home />)}</PageWrapper>} />
            <Route path="/quotes" element={<PageWrapper>{guard("/quotes", <Quotes />)}</PageWrapper>} />
            <Route path="/commands" element={<PageWrapper>{guard("/commands", <Commands />)}</PageWrapper>} />
            <Route path="/content" element={<PageWrapper>{guard("/content", <Content />)}</PageWrapper>} />
            <Route path="/streams" element={<PageWrapper>{guard("/streams", <Streams />)}</PageWrapper>} />
            <Route path="/music" element={<PageWrapper>{guard("/music", <Music />)}</PageWrapper>} />
            <Route path="/laypeople" element={<PageWrapper>{guard("/laypeople", <Laypeople />)}</PageWrapper>} />
            <Route path="/merch" element={<PageWrapper>{guard("/merch", <Merch />)}</PageWrapper>} />
            <Route path="/team" element={<PageWrapper>{guard("/team", <Team />)}</PageWrapper>} />
            <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
            <Route path="/terms-of-use" element={<PageWrapper><TermsOfUse /></PageWrapper>} />
            <Route path="/sales-and-refunds" element={<PageWrapper><SalesAndRefunds /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      {!isNotFoundPage && <ScrollToTopButton />}
    </div>
  );
});

export default AppRoutes;
