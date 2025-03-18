import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./common/components/Header";
import Home from "./pages/Home";
import Footer from "./common/components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import { EAPP_ROUTES } from "./common/constants";
import Experience from "./pages/Experience";

const App = () => {
  return (
    <Router>
      <div className="ans-flex ans-flex-col ans-min-h-screen ans-bg-White dark:ans-bg-Gray-900 ans-text-Gray-900 dark:ans-text-White">
        <Header />
        <main className="ans-flex-1 ans-p-4 ans-bg-Gray-200 dark:ans-bg-Gray-800">
          <Routes>
            <Route path={EAPP_ROUTES.home} element={<Home />} />
            <Route path={EAPP_ROUTES.about} element={<About />} />
            <Route path={EAPP_ROUTES.experience} element={<Experience />} />
            <Route path={EAPP_ROUTES.projects} element={<Projects />} />
            <Route path={EAPP_ROUTES.contact} element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
