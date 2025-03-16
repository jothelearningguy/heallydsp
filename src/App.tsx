import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';

const NavigationBar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="nav">
      <div className="container nav-content">
        <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
          <div className="nav-logo-icon">
            <div className="nav-logo-bubble bubble">
              <span className="text-2xl text-white font-bold">H</span>
            </div>
            <span className="nav-logo-text bg-gradient-text">HeallyDSP</span>
          </div>
        </Link>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'nav-link-active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link 
            to="/register" 
            className="btn btn-primary nav-cta"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
        <button 
          className={`nav-menu-button ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="nav-menu-icon"></span>
        </button>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="app">
        <NavigationBar />
        <main className="main">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <div className="footer-content text-center">
              <div className="footer-logo mx-auto">
                <div className="footer-logo-icon">
                  <div className="footer-logo-bubble bubble">
                    <span className="text-2xl text-white font-bold">H</span>
                  </div>
                  <span className="footer-logo-text bg-gradient-text">HeallyDSP</span>
                </div>
              </div>
              <p className="text-gray-600 mt-4">Made with ❤️</p>
              <p className="text-primary font-bold mt-2">APP COMING SOON!</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
