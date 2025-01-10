
import React from 'react';
import './Login.css';
import women_bg from '../assets/women_bg_login.jpg';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const { t } = useTranslation();

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="image-section">
          <img
            src={women_bg}
            alt={t('SignUp.imageAlt')}
            className="login-image"
          />
        </div>
        <div className="form-section">
          <h2>{t('SignUp.title')}</h2>
          <form className="loginform">
            <div className="input-group">
              <label>{t('SignUp.emailLabel')}</label>
              <input
                type="email"
                placeholder={t('SignUp.emailPlaceholder')}
                required
              />
            </div>
            <div className="input-group">
              <label>{t('SignUp.passwordLabel')}</label>
              <input
                type="password"
                placeholder={t('SignUp.passwordPlaceholder')}
                required
              />
            </div>
            <div className="input-group">
              <label>{t('SignUp.confirmPasswordLabel')}</label>
              <input
                type="password"
                placeholder={t('SignUp.confirmPasswordPlaceholder')}
                required
              />
            </div>
            <button type="submit" className="login-btn">
              {t('SignUp.signUpButton')}
            </button>
          </form>
          <div className="extra-links">
            <a href="/login">{t('SignUp.backToLoginLink')}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;