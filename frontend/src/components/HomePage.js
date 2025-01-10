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