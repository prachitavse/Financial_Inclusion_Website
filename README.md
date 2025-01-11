# Financial_Inclusion_Website - SakhiSangam
**SakhiSangam** is an AI-powered platform designed to empower rural women by enhancing their financial literacy and providing personalized financial tools. The app focuses on offering multi-language support, including Hindi, Marathi, Punjabi, and English, making financial education accessible to women from diverse linguistic backgrounds. SakhiSangam helps users track their income, expenses, and savings, offering personalized budgeting insights and investment suggestions like Mutual Funds and Fixed Deposits. The platform also provides engaging learning materials, quizzes, and mentorship to foster financial independence and confidence.

The primary problem SakhiSangam addresses is the lack of financial education and resources in rural areas, particularly for women. Many face language barriers and limited access to traditional financial services. By offering a comprehensive, easy-to-use solution with AI-based learning, expense management, and mentorship, the platform empowers women to manage their finances effectively, make informed investment decisions, and access financial guidance. Ultimately, SakhiSangam aims to increase financial independence and improve the overall economic well-being of rural women.

---

# Table of Contents

1. [SakhiSangam: AI-Powered Financial Empowerment Platform](#sakhisangam-ai-powered-financial-empowerment-platform)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [How it works](#how-it-works)
5. [How to Use the Project](#how-to-use-the-project)
    1. [Prerequisites](#prerequisites)
    2. [Setup Instructions](#setup-instructions)
    3. [How to Run](#how-to-run)
6. [Project Structure](#project-structure)
7. [Future Enhancements](#future-enhancements)

---

# Features

1. **User Authentication:** Users can log in to access their personalized budgeting data.
2. **Multi-language Support:** The app supports multiple languages, including Hindi, Marathi, Punjabi, and English.
3. **Expense Tracking:** Users can input their monthly income, savings, and various expenses (travel, commute, personal, education, seasonal, loans).
4. **Budget Analysis:** The app analyzes the user's expenses and gives recommendations on whether each expense is within the budget.
5. **Investment Suggestions:** Based on the user's savings, the app suggests investment options like Mutual Funds and Fixed Deposits.
6. **Learning:** Users can access a variety of learning materials to help them better understand budgeting, saving, and investing.
7. **Quiz:** Users can take quizzes to test their knowledge on budgeting, savings, and financial planning.
8. **User Profile:** Users can create and manage their profile, including viewing their past budgeting history, quiz results, and personal information.

---

# Tech Stack

- **Frontend:**
  - React.js for dynamic and responsive web pages.
  - Redux for state management.
  - Axios for API communication.
- **Backend:**
  - Node.js with Express.js for fast, asynchronous development.
  - RESTful APIs for efficient communication.
  - JSON Web Tokens (JWT) for secure authentication.
- **AI and NLP:**
  - Dialogflow for chatbot functionalities.
  - TensorFlow or PyTorch for AI-based education personalization.
  - Rasa for advanced conversational AI.
- **Database (Future Work) :**
  - PostgreSQL for structured user profiles and transactions.
  - SQLite for offline storage.
- **Additional Tools (Future Work) :**
  - Google Text-to-Speech for voice-assisted lessons.
  - Stripe for secure payments.
  - Docker for containerized deployment.
  - GitHub Actions for CI/CD.

---

# How it works

1. **Login and Authentication:** Users can log in using their email, and a unique user ID (UID) is created and stored in LocalStorage.
2. **Personalized Experience:** Based on user preferences and history, the platform suggests personalized courses, quizzes, and products.
3. **Course Progress:** Users can track their progress on various courses using circular progress bars.
4. **Interactive Quizzes:** Engaging quizzes allow users to test their knowledge and earn rewards.
Mentorship: Users can connect with mentors for personalized financial guidance.

---

# How to use the Project

## Prerequisites

1. **Development Tools:**
   - Node.js (v14+ recommended) and npm.
   - Python 3.x with pip for machine learning and chatbot components.
   - Git for version control.
   - Docker (optional for containerized deployment).

2. **Other Tools and Libraries:**
   - Rasa framework for chatbot capabilities.
   - Virtual environment tools like `venv` or `conda` for Python dependencies.
   - A modern browser (e.g., Chrome, Edge) for testing the web app.

## Setup - Instructions
Clone the repository:
```bash
    git clone https://github.com/your-repo/sakhisangam.git
    cd sakhisangam
    npm install
```

## How to run

1. Start the Frontend
    ```bash
       cd Frontend
       npm start
    ```
2. Start the Backend
    ```bash
       cd Backend
       npm start
    ```
3. Start the Machine Learning API
    ```bash
       cd Backend/ml/api
       python app.py
    ```
4. Start the Chatbot API Server
    ```bash
       cd Backend/chatbot
       rasa run --enable-api
    ```
5. Start the Chatbot Action Server
    ```bash
       rasa run actions
    ```
---

# Project Structure

```bash
Financial_Inclusion_Website/
├── backend/
│   ├── node_modules/            # Dependencies for backend
│   ├── src/                     # Backend source code
│   ├── chatbot/                 # Rasa chatbot directory
│   │   ├── .rasa/               # Rasa configuration files
│   │   ├── actions/             # Custom action definitions
│   │   ├── custom_components/   # Custom Rasa components
│   │   ├── data/                # NLU training data and stories
│   │   ├── models/              # Pre-trained Rasa models
│   │   ├── tests/               # Test cases for chatbot
│   │   ├── config.yml           # Rasa configuration
│   │   ├── credentials.yml      # External service credentials
│   │   ├── domain.yml           # Chatbot domain (intents, entities, slots, responses)
│   │   ├── endpoints.yml        # Custom action endpoints
│   ├── package.json             # Backend dependencies and scripts
│   ├── package-lock.json        # Backend dependency lock file
│
├── frontend/
│   ├── node_modules/            # Dependencies for frontend
│   ├── public/                  # Static files (e.g., images, favicon)
│   ├── src/                     # Frontend source code
│   │   ├── assets/              # Static assets like icons, fonts, etc.
│   │   ├── components/          # Reusable React components
│   │   ├── i18n/                # Multi-language support configuration
│   │   ├── services/            # API calls or utility functions
│   │   ├── App.css              # Global CSS styles
│   │   ├── App.js               # Main React component
│   │   ├── App.test.js          # Tests for main component
│   │   ├── index.css            # Styles for the root component
│   │   ├── index.js             # React app entry point
│   |
|   ├── package.json         # Frontend dependencies and scripts
|
|── ml/                      # Machine learning backend
|   ├── api/                 # API for serving ML models
|   │   ├── app.py           # Main API entry point
|   │   ├── mappings.py      # Route and endpoint mappings
|   │   ├── utils.py         # Utility functions
|   │   ├── requirements.txt # Python dependencies
|   ├── models/              # Pretrained or custom ML models
|   ├── training/            # Scripts for training models
|
|── rasa_env/                # Rasa chatbot environment
|
|── package.json             # Root package details
|── README.md                # Project documentation
```

---

# Future Enhancements

1. Enhanced NLP Capabilities:
    - Support for more local languages and dialects.

2. Expanded Financial Tools:
    - Integrating micro-loan facilities and expense trackers
    
    - AI-based investment recommendations.

3. Mobile Application:
    - Launching Android and iOS apps for better accessibility.

4. Offline Mode:
    - Allowing users in low-connectivity areas to access lessons and features offline.

5. AI Mentor Matching:
    - Leveraging AI to improve mentor-mentee connections based on user preferences and goals.

