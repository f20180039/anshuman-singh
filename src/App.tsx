import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import { EAPP_ROUTES } from "./constants";

const App = () => {
  return (
    <Router>
      <div className="ans-flex ans-flex-col ans-min-h-screen">
        <Header />
        <main className="ans-flex-1 ans-p-4">
          <Routes>
            <Route path={EAPP_ROUTES.home} element={<Home />} />
            <Route path={EAPP_ROUTES.about} element={<About />} />
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
