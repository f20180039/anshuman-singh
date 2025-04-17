import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./common/components/Header";
import Footer from "./common/components/Footer";
import { EAPP_ROUTES, PROJECT_ROUTES } from "./common/constants";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Experience = lazy(() => import("./pages/Experience"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const GuessNumber = lazy(() => import("./modules/Guess-Number/GuessNumber"));
const PigGame = lazy(() => import("./modules/Pig-Game/PigGame"));

const App = () => {
  return (
    <Router basename="/my-portfolio">
      <div className="ans-flex ans-flex-col ans-min-h-screen ans-bg-White dark:ans-bg-Gray-900 ans-text-Gray-900 dark:ans-text-White">
        <Header />
        <main className="ans-flex-1 ans-p-4 ans-bg-Gray-200 dark:ans-bg-Gray-800">
          <Suspense fallback={<div>Loading</div>}>
            <Routes>
              <Route path={EAPP_ROUTES.home} element={<Home />} />
              <Route path={EAPP_ROUTES.about} element={<About />} />
              <Route path={EAPP_ROUTES.experience} element={<Experience />} />
              <Route path={EAPP_ROUTES.projects} element={<Projects />} />
              <Route path={EAPP_ROUTES.contact} element={<Contact />} />
              <Route
                path={PROJECT_ROUTES.guessGame}
                element={<GuessNumber />}
              />
              <Route path={PROJECT_ROUTES.pigGame} element={<PigGame />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
