// META DATA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// Developer Details:
//     Name: Harshita Jangde
//     Role: Frontend Developer
//
// Description:
//     The homepage for the SakhiSangam platform, which serves as an introductory page for users.
//     It includes a welcoming message, user-specific recommendations, and navigation to other sections of the platform such as Learning and Quiz.
//     It uses dynamic content based on the logged-in user.
//
// Dependencies:
//     - React useState Hook: For dynamic content rendering based on user data
//     - React Router (v6+): For navigating to different sections like learning, quizzes, and profile
//
// Notes:
//     The homepage needs to dynamically adjust based on whether the user is logged in or not.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import { useTranslation } from 'react-i18next';
import './HomePage.css';
import homeImage1 from '../assets/women_bg1.png';

function HeroSection() {
  const { t } = useTranslation();

  return (
    <div className="home-section">
      <div className="home-text">
        <h1>
          {t('HomeSection.title')}
        </h1>
        <p dangerouslySetInnerHTML={{ __html: t('HomeSection.description') }}></p>
        <ul>
          <li><b>{t('HomeSection.features.learn')}</b></li>
          <li><b>{t('HomeSection.features.plan')}</b></li>
          <li><b>{t('HomeSection.features.support')}</b></li>
          <li><b>{t('HomeSection.features.accessible')}</b></li>
        </ul>
      </div>
      <div className="home-images">
        <img src={homeImage1} alt="Woman with laptop" />
      </div>
    </div>
  );
}

export default HeroSection;