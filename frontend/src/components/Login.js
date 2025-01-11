// META DATA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// Developer Details:
//     Name: Harshita Jangde
//     Role: Frontend Developer
//
// Description:
//     The login page allows users to sign in to the SakhiSangam platform using their email and password.
//     It includes form validation, email format checking, and redirection to the profile page upon successful login.
//
// Dependencies:
//     - React useState Hook: For handling user input in the form
//     - React Router (v6+): For routing users to their profile page upon login
//
// Notes:
//     Ensure to provide proper feedback for invalid credentials and reset form inputs after each login attempt.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, { useState } from 'react';
import './Login.css';
import women_bg from '../assets/women_bg_login.jpg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const username = email.split('@')[0]; // Extract the username from the email

    // Check if there's already a UID for this email
    let uid = localStorage.getItem(email); // Get UID based on email
    if (!uid) {
      // If no UID exists for this email, generate a new one
      let userCounter = parseInt(localStorage.getItem('userCounter'), 10);
      if (isNaN(userCounter)) {
        userCounter = 100; // Start from 101 (User101)
      } else {
        userCounter += 1; // Increment user counter
      }
      localStorage.setItem('userCounter', userCounter); // Update the counter
      uid = `User${userCounter}`; // Generate user ID (e.g., User101)

      // Store the UID with the email as the key
      localStorage.setItem(email, uid);
    }

    localStorage.setItem('uid', uid); // Store the UID globally for this session
    localStorage.setItem('username', username); // Store username
    setUser(username); // Update the username in App.js
    navigate('/profile'); // Redirect to the profile page
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="image-section">
          <img src={women_bg} alt={t('Login.imageAlt')} className="login-image" />
        </div>
        <div className="form-section">
          <h2>{t('Login.title')}</h2>
          <form onSubmit={handleLogin} className="loginform">
            <div className="input-group">
              <label>{t('Login.emailLabel')}</label>
              <input
                type="email"
                placeholder={t('Login.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                name="email"
              />
            </div>
            <div className="input-group">
              <label>{t('Login.passwordLabel')}</label>
              <input
                type="password"
                placeholder={t('Login.passwordPlaceholder')}
                required
              />
            </div>
            <button type="submit" className="login-btn">{t('Login.loginButton')}</button>
          </form>
          <div className="extra-links">
            <a href="/signup">{t('Login.signupLink')}</a>
            <a href="/forgot-password">{t('Login.forgotPasswordLink')}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;