import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import MascotWidget from './components/MascotWidget';
import GlobalAmbientBackground from './components/GlobalAmbientBackground';
import SocialFloat from './components/SocialFloat';
import Chatbot from './components/Chatbot';
import { ToastProvider } from './components/ui/Toast';
import { useReducedMotion } from './hooks/useReducedMotion';

// Pages
import Home from './pages/Home';
import Leadership from './pages/Leadership';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Clients from './pages/Clients';
import Solutions from './pages/Solutions';
import Technology from './pages/Technology';
import Investors from './pages/Investors';
import Collaborations from './pages/Collaborations';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function AppContent() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

    // Handle smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        const href = target.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({
              behavior: prefersReducedMotion ? 'auto' : 'smooth',
              block: 'start',
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [prefersReducedMotion]);

  // Preload critical images
  useEffect(() => {
    const images = [
      '/logo.png',
      '/logo-bg.png',
      '/mascot.png',
    ];

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <>
      {/* Global Ambient Background — fixed behind all content */}
      <GlobalAmbientBackground />

      <div className="min-h-screen relative" style={{ backgroundColor: 'transparent' }}>
        {/* Scroll Progress Bar */}
        <ScrollProgress />

        {/* Scroll to top on route change */}
        <ScrollToTop />

        {/* Navigation */}
        <Navbar />

        {/* Mascot Widget - Fixed position */}
        <MascotWidget />

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/partnerships" element={<Collaborations />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Back to Top Button */}
        <BackToTop />

        {/* Social Media Float Button */}
        <SocialFloat />

        {/* AI Chatbot */}
        <Chatbot />
      </div>

      {/* Skip to main content link for accessibility */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-navy-900 focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>
    </>
  );
}

function App() {
  return (
    <Router>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </Router>
  );
}

export default App;
