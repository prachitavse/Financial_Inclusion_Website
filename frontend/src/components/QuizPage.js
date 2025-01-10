
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