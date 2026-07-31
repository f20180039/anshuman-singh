import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import Header from "./common/components/Header";
import Footer from "./common/components/Footer";
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
const GuessNumber = lazy(() => import("./modules/Guess-Number/GuessNumber"));
const PigGame = lazy(() => import("./modules/Pig-Game/PigGame"));

// Lazy-loaded AI Chat (non-critical, loaded on demand)
const AIChatButton = lazy(() => import("./features/ai-chat/AIChatButton"));
const AIChatWindow = lazy(() => import("./features/ai-chat/AIChatWindow"));

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Router basename="/anshuman-singh">
      <div className="ans-relative ans-flex ans-flex-col ans-min-h-screen ans-bg-th-bg ans-text-th-fg ans-overflow-x-hidden ans-max-w-full">
        <Header />
        <main className="ans-relative ans-flex-1 ans-p-4 ans-z-0">
          <Suspense
            fallback={
              <div className="ans-flex ans-items-center ans-justify-center ans-min-h-[60vh]">
                <p className="ans-text-3 ans-text-th-accent ans-animate-pixel-blink retro-glow">
                  LOADING...
                </p>
              </div>
            }
          >
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
              <Route
                path={PROJECT_ROUTES.guessGame}
                element={<GuessNumber />}
              />
              <Route path={PROJECT_ROUTES.pigGame} element={<PigGame />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />

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
