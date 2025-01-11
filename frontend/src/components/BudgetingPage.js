// META DATA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Developer Details:
//     Name: Harshita Jangde 
//     Role: Fronted Developer
//     Name: Prachi Tavse
//     Role: Backend Developer
//     Description: 
//         This React component handles the budgeting page where users can input their financial data such as income, savings, expenses, and goals.
//         It also calculates certain financial ratios, such as savings rate, loan ratio, and goal timeline, based on user inputs.
//         The data is then sent to the backend for prediction and analysis, and the results are displayed to the user. 
//         The page also features form validation and handles error messages related to missing or incorrect inputs. 

//     Dependencies:
//         - React (for component structure and state management)
//         - axios (for making HTTP requests to the backend for financial predictions)
//         - i18next (for multi-language support)
//         - CSS (for styling the budgeting page)
//     - Key Features:
//         - User input fields for financial data (income, savings, expenses, etc.)
//         - Data validation to ensure inputs are valid
//         - HTTP request to send input data to the backend for predictions
//         - Dynamic rendering of analysis results based on backend response
//         - Display error messages in case of validation failures or backend errors
//         - Local storage support for saving user data and analysis results

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "./BudgetingPage.css";

const BudgetingPage = () => {
  const { t } = useTranslation();
  const uid = localStorage.getItem("uid");
  const [formData, setFormData] = useState({
    monthlyIncome: "",
    monthlySavings: "",
    travelExpense: "",
    commuteExpense: "",
    personalExpense: "",
    educationExpense: "",
    seasonalExpense: "",
    loans: "",
    goals: "",
  });
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!uid) {
      alert(t("BudgetingPage.login_required"));
      navigate("/login");
      return;
    }

    const savedData = localStorage.getItem(uid);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData.input || {});
      setAnalysis(parsedData.output || null);
    }
  }, [uid, navigate, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setAnalysis(null);

    // Prepare and validate inputs
    const inputs = Object.values(formData).map((value) =>
      isNaN(value) ? value : Number(value)
    );
    const [
      monthlyIncome,
      monthlySavings,
      travelExpense,
      commuteExpense,
      personalExpense,
      educationExpense,
      seasonalExpense,
      loans,
      goals,
    ] = inputs;

    // Check for required fields
    if (
      monthlyIncome <= 0 ||
      monthlySavings <= 0 ||
      travelExpense < 0 ||
      commuteExpense < 0 ||
      personalExpense < 0 ||
      educationExpense < 0 ||
      seasonalExpense < 0 ||
      loans < 0 ||
      goals <= 0
    ) {
      setError(t("BudgetingPage.validation_error"));
      return;
    }

    // Add calculated fields
    const savingsRate = monthlySavings / monthlyIncome;
    const loanRatio = loans / monthlyIncome;
    const timelineToGoal =
      monthlySavings > 0 ? (goals - monthlySavings) / monthlySavings : 0;
    const expenseSum =
      travelExpense +
      commuteExpense +
      personalExpense +
      educationExpense +
      seasonalExpense;
    const expenseAnomalies = expenseSum > 0.4 * monthlyIncome ? 1 : 0;

    const finalInputs = [
      monthlyIncome,
      monthlySavings,
      travelExpense,
      commuteExpense,
      personalExpense,
      educationExpense,
      seasonalExpense,
      loans,
      goals,
      savingsRate,
      loanRatio,
      timelineToGoal,
      expenseAnomalies,
    ];

    try {
      console.log("Sending inputs:", finalInputs); // Log inputs
      const response = await axios.post(
        "http://localhost:3001/api/budgeting/predict",
        { inputs: finalInputs, uid }
      );
      console.log("Response received:", response.data); // Log response
      const output = response.data.predictions;
      localStorage.setItem(
        uid,
        JSON.stringify({
          input: formData,
          output,
        })
      );
      setAnalysis(output);
    } catch (err) {
      console.error("Error fetching predictions:", err);
      setError(err.response?.data?.message || t("BudgetingPage.fetch_error"));
    }
  };

  return (
    <div className="budgeting-page">
      <div className="budgeting-header">
        <h1>{t("BudgetingPage.budgeting_service")}</h1>
      </div>

      <div className="content-wrapper">
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key, index) => (
            <div className="form-group" key={index}>
              <label>{t(`BudgetingPage.${key}`)}</label>
              <input
                type={key === "goals" ? "text" : "number"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={t(`BudgetingPage.enter_${key}`)}
              />
            </div>
          ))}
          <button type="submit" className="submit-button">
            {t("BudgetingPage.submit")}
          </button>
        </form>

        <aside>
          <h2>{t("BudgetingPage.analysis_of_your_budget")}</h2>
          {error && <p className="error">{error}</p>}
          {analysis ? (
            <>
              <p>
                {t("BudgetingPage.investment_suggestions")}:{" "}
                {analysis.investmentSuggestions}
              </p>
              <p>
                {t("BudgetingPage.policy_suggestions")}:{" "}
                {Array.isArray(analysis.policySuggestions)
                  ? analysis.policySuggestions.join(", ")
                  : analysis.policySuggestions}
              </p>
              <p>{t("BudgetingPage.goal_timeline")}: {analysis.goalTimeline}</p>
              <p>{t("BudgetingPage.cluster_info")}: {analysis.clusterInfo}</p>
              <p>{t("BudgetingPage.anomaly_status")}: {analysis.anomalyStatus}</p>
            </>
          ) : (
            <p>{t("BudgetingPage.please_fill_form_first")}</p>
          )}
        </aside>
      </div>
    </div>
  );
};

export default BudgetingPage;
