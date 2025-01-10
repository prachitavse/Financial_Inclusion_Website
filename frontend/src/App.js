
import React, { useEffect, useState } from 'react';
import closebutton from './assets/cross-icon.jpg';
import Navbar from './components/Navbar';
import HeroSection from './components/HomePage';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import LearningPage from './components/LearningPage';
import QuizPage from './components/QuizPage';
import BudgetingPage from './components/BudgetingPage';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import SignUp from './components/Signup';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

function AppContent() {
  const { t } = useTranslation();
  const [showLanguageOverlay, setShowLanguageOverlay] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve the stored username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const toggleLanguageOverlay = () => {
    setShowLanguageOverlay(!showLanguageOverlay);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLanguageOverlay(false);
  };

  const location = useLocation();
  if (location.pathname === '/login' || location.pathname === '/signup') {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <>
      {/* Navbar with username */}
      <Navbar username={username} setUsername={setUsername} />

      {/* Language Overlay */}
      {showLanguageOverlay && (
        <div className="language-overlay">
          <button className="close-overlay" onClick={toggleLanguageOverlay}>
            <img src={closebutton} alt='Close'/>
          </button>
            <button className="langbutton" onClick={() => changeLanguage('en')}>English</button>
            <button className="langbutton" onClick={() => changeLanguage('hi')}>Hindi</button>
            <button className="langbutton" onClick={() => changeLanguage('mr')}>Marathi</button>
            <button className="langbutton" onClick={() => changeLanguage('pa')}>Punjabi</button>
        </div>
      )}

      {/* Button to open language overlay */}
      <div className="languageToggleContainer">
        <button className="language-button" onClick={toggleLanguageOverlay}>
          {t('language')}
        </button>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/budgeting" element={<BudgetingPage />} />
        <Route path="/profile" element={<UserProfile username={username} />} />
        <Route path="/login" element={<Login setUser={setUsername} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      {/* Footer */}
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Footer />}

      {/* Chatbot */}
      <Chatbot />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;