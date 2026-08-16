import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import Header from "./common/components/Header";
import Footer from "./common/components/Footer";
import RouteFallback from "./common/components/RouteFallback";
import ScrollToTop from "./common/components/ScrollToTop";
import SkipLink from "./common/components/SkipLink";
import CookieBanner from "./common/components/CookieBanner";
import StickyMobileCta from "./common/components/StickyMobileCta";
import Seo from "./common/seo/Seo";
import AnalyticsTracker from "./common/analytics/AnalyticsTracker";
import { EAPP_ROUTES, PROJECT_ROUTES } from "./common/constants";
// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Experience = lazy(() => import("./pages/Experience"));
const Projects = lazy(() => import("./pages/Projects"));
const Certificates = lazy(() => import("./pages/Certificates"));
const Contact = lazy(() => import("./pages/Contact"));
const ResumePreview = lazy(() => import("./pages/ResumePreview"));
const Test3D = lazy(() => import("./pages/Test3D"));
const Jobs = lazy(() => import("./pages/Jobs"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const GuessNumber = lazy(() => import("./modules/Guess-Number/GuessNumber"));
const PigGame = lazy(() => import("./modules/Pig-Game/PigGame"));

// Lazy-loaded AI Chat (non-critical, loaded on demand)
const AIChatButton = lazy(() => import("./features/ai-chat/AIChatButton"));
const AIChatWindow = lazy(() => import("./features/ai-chat/AIChatWindow"));

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Router basename="/anshuman-singh">
      {/* Cross-cutting, render-nothing concerns. Inside the router because each
          one reacts to the current location. */}
      <Seo />
      <AnalyticsTracker />
      <ScrollToTop />

      <div className="ans-relative ans-flex ans-flex-col ans-min-h-screen ans-bg-th-bg ans-text-th-fg ans-overflow-x-hidden ans-max-w-full">
        <SkipLink />

        <Header />
        <main
          id="main-content"
          tabIndex={-1}
          className="ans-relative ans-flex-1 ans-p-4 ans-z-0 focus:ans-outline-none"
        >
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path={EAPP_ROUTES.home} element={<Home />} />
              <Route path={EAPP_ROUTES.about} element={<About />} />
              <Route path={EAPP_ROUTES.experience} element={<Experience />} />
              <Route path={EAPP_ROUTES.projects} element={<Projects />} />
              <Route path={EAPP_ROUTES.certificates} element={<Certificates />} />
              <Route path={EAPP_ROUTES.contact} element={<Contact />} />
              <Route path={EAPP_ROUTES.resumePreview} element={<ResumePreview />} />
              <Route path={EAPP_ROUTES.test3d} element={<Test3D />} />
              <Route path={EAPP_ROUTES.jobs} element={<Jobs />} />
              <Route path={EAPP_ROUTES.thankYou} element={<ThankYou />} />
              <Route path={EAPP_ROUTES.privacy} element={<Privacy />} />
              <Route path={EAPP_ROUTES.terms} element={<Terms />} />
              <Route
                path={PROJECT_ROUTES.guessGame}
                element={<GuessNumber />}
              />
              <Route path={PROJECT_ROUTES.pigGame} element={<PigGame />} />
              {/* Catch-all. Deep links land here via public/404.html's shim. */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />

        <StickyMobileCta />
        <CookieBanner />

        {/* AI Chat - lazy-loaded for better initial page performance */}
        <Suspense fallback={null}>
          <AIChatButton onClick={() => setIsChatOpen(true)} isOpen={isChatOpen} />
          <AIChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
