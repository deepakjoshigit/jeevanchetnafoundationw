
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Work from './pages/Work';
import Documents from './pages/Documents';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Gallery from './pages/Gallery';
import ImpactStories from './pages/ImpactStories';
import IDGenerator from './pages/IDGenerator';
import Appointment from './pages/Appointment';
import JoiningLetter from './pages/JoiningLetter';
import QRPopup from './components/QRPopup';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/work" element={<Work />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/impact-stories" element={<ImpactStories />} />
            <Route path="/impact-stories/:id" element={<ImpactStories />} />
            <Route path="/id-generator" element={<IDGenerator />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/joining-letter" element={<JoiningLetter />} />
          </Routes>
        </main>
        <Footer />
        <QRPopup />
      </div>
    </Router>
  );
};

export default App;
