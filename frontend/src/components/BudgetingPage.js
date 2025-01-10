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

    const inputs = Object.values(formData).map((value) =>
      isNaN(value) ? value : Number(value)
    );

    try {
      const response = await axios.post(
        "http://localhost:3001/api/budgeting/predict",
        { inputs, uid }
      );

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
      setError(t("BudgetingPage.fetch_error"));
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
              <p>{t("BudgetingPage.travel")}: {analysis.travel}</p>
              <p>{t("BudgetingPage.commute")}: {analysis.commute}</p>
              <p>{t("BudgetingPage.personal")}: {analysis.personal}</p>
              <p>{t("BudgetingPage.education")}: {analysis.education}</p>
              <p>{t("BudgetingPage.seasonal")}: {analysis.seasonal}</p>
              <p>{t("BudgetingPage.total_expenses")}: Rs {analysis.totalExpenses}</p>
              <p>{t("BudgetingPage.savings")}: Rs {analysis.savings}</p>
              <p>{t("BudgetingPage.investment_suggestions")}: {analysis.investmentSuggestions.join(", ")}</p>
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
