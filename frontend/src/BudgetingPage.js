import React, { useState } from "react";
import axios from "axios";
import "./BudgetingPage.css";

const BudgetingPage = () => {
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
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setResults(null); // Clear previous results

    // Prepare data
    const inputs = Object.values(formData).map((value) =>
      isNaN(value) ? value : Number(value)
    );

    try {
      const response = await axios.post("http://localhost:3001/api/budgeting/predict", { inputs });
      setResults(response.data.predictions);
    } catch (err) {
      setError("Failed to fetch predictions. Please try again.");
    }
  };

  return (
    <div className="budgeting-page">
      <h1>Budgeting Service</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key, index) => (
          <div className="form-group" key={index}>
            <label>{key.replace(/([A-Z])/g, " $1")}</label>
            <input
              type={key === "goals" ? "text" : "number"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>

      {error && <p className="error">{error}</p>}

      {results && (
        <div className="results">
          <h2>Results:</h2>
          <h3>Suggestions:</h3>
          <ul>
            {results.list1.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h3>Travel Advice:</h3>
          <p>{results.travelOption}</p>
        </div>
      )}
    </div>
  );
};

export default BudgetingPage;
