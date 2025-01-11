// META DATA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// Developer Details:
//     Name: Harshita Jangde
//     Role: Frontend Developer
//
// Description:
//     This page handles the quizzes and games section for the SakhiSangam platform, where users can participate in interactive quizzes and educational games.
//     It dynamically fetches quizzes and displays them in a user-friendly format with timers, options, and feedback.
//
// Dependencies:
//     - React useState Hook: For managing quiz data and tracking user selections
//     - React Router (v6+): For routing to other sections like results and feedback
//
// Notes:
//     Ensure that the quizzes are displayed in random order and maintain accessibility for users with visual impairments.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the translation hook
import './LearningPage.css';

const QuizPage = () => {
  const { t } = useTranslation(); // Hook to access translations
  return (
    <div className="learning-page">
      <div className="learning-content">
        {/* Dropdown for selecting option */}
        <select className="learning-select">
          <option value="">{t('QuizPage.selectOption')}</option>
          <option value="budgeting">{t('QuizPage.options.budgeting')}</option>
          <option value="savings">{t('QuizPage.options.savings')}</option>
          <option value="investment">{t('QuizPage.options.investment')}</option>
        </select>

        {/* Quiz Options */}
        <div className="learning-options">
          <div className="learning-item">
            <span className="learning-tag">Q-1</span>
            <div className="learning-item-content">
              <h2>{t('QuizPage.lessons.basicBudgetingQuiz')}</h2>
              <button className="play-button">{t('QuizPage.playButton')}</button>
            </div>
          </div>

          <div className="learning-item">
            <span className="learning-tag">Q-2</span>
            <div className="learning-item-content">
              <h2>{t('QuizPage.lessons.savingsStrategiesQuiz')}</h2>
              <button className="play-button">{t('QuizPage.playButton')}</button>
            </div>
          </div>

          <div className="learning-item">
            <span className="learning-tag">Q-3</span>
            <div className="learning-item-content">
              <h2>{t('QuizPage.lessons.investmentQuiz')}</h2>
              <button className="play-button">{t('QuizPage.playButton')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;