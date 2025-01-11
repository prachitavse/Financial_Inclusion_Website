// META DATA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// Developer Details:
//     Name: Harshita Jangde
//     Role: Frontend Developer
//
// Description:
//     This page displays a list of learning modules available on the SakhiSangam platform, specifically tailored for rural women.
//     The user can browse through courses, see progress, and enroll in new ones. 
//     It also includes course details and recommendations based on completed courses.
//
// Dependencies:
//     - React useState Hook: For managing dynamic course and progress data
//     - React Router (v6+): For navigating between course details and other learning resources
//
// Notes:
//     Make sure to dynamically update the progress bars and course status based on user interaction and data from the backend.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import { useTranslation } from 'react-i18next';
import './LearningPage.css';

const LearningPage = () => {
  const { t } = useTranslation();

  return (
    <div className="learning-page">
      <div className="learning-content">
        <select className="learning-select">
          <option value="">{t('LearningPage.selectOption')}</option>
          <option value="budgeting">{t('LearningPage.options.budgeting')}</option>
          <option value="savings">{t('LearningPage.options.savings')}</option>
          <option value="investment">{t('LearningPage.options.investment')}</option>
        </select>
        
        <div className="learning-options">
          <div className="learning-item">
            <span className="learning-tag">{t('LearningPage.tags.savings')}</span>
            <div className="learning-item-content">
              <h2>{t('LearningPage.lessons.savingsGuide')}</h2>
              <button className="play-button">{t('LearningPage.lessons.startLesson')}</button>
            </div>
            <p>{t('LearningPage.lessons.savingsDesc')}</p>
          </div>
          <div className="learning-item">
            <span className="learning-tag">{t('LearningPage.tags.financialPlanning')}</span>
            <div className="learning-item-content">
              <h2>{t('LearningPage.lessons.financialPlanning')}</h2>
              <button className="play-button">{t('LearningPage.lessons.startLesson')}</button>
            </div>
          </div>
          <div className="learning-item">
            <span className="learning-tag">{t('LearningPage.tags.loan')}</span>
            <div className="learning-item-content">
              <h2>{t('LearningPage.lessons.loanManagement')}</h2>
              <button className="play-button">{t('LearningPage.lessons.startLesson')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;