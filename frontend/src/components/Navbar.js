import React from 'react';
import './Navbar.css';
import logoimage from '../assets/ss_logo.jpg';
import Userimg from "../assets/userprofile.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Navbar({ username, setUsername }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('username'); // Clear username from localStorage
    setUsername(''); // Reset the username in the parent component state
    navigate('/'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logoimage} alt={t('Navbar.logoAlt')} />
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'navbar-link active-link' : 'navbar-link'}
          >
            {t('Navbar.home')}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/learning" 
            className={({ isActive }) => isActive ? 'navbar-link active-link' : 'navbar-link'}
          >
            {t('Navbar.learning')}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/quiz" 
            className={({ isActive }) => isActive ? 'navbar-link active-link' : 'navbar-link'}
          >
            {t('Navbar.quizzesGames')}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/budgeting" 
            className={({ isActive }) => isActive ? 'navbar-link active-link' : 'navbar-link'}
          >
            {t('Navbar.budgeting')}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/find-your-mentor" 
            className={({ isActive }) => isActive ? 'navbar-link active-link' : 'navbar-link'}
          >
            {t('Navbar.findYourMentor')}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => isActive ? 'navbar-link active-link' : 'navbar-link'}
          >
            {t('Navbar.profile')}
          </NavLink>
        </li>
      </ul>
      {username ? (
        <div className="navbar-user">
          <img src={Userimg} alt={t('Navbar.profileAlt')} className="navbar-profile-img" />
          <button onClick={handleLogout} className="logout-button">{t('Navbar.logout')}</button>
        </div>
      ) : (
        <NavLink to="/login">
          <button className="login-button">{t('Navbar.loginSignUp')}</button>
        </NavLink>
      )}
    </nav>
  );
}

export default Navbar;