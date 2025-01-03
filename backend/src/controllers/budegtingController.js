const axios = require('axios');

const FLASK_API_URL = 'http://localhost:5000';

exports.getBudgetPredictions = async (req, res) => {
  try {
    const { inputs } = req.body;

    // Validate inputs
    if (!inputs || !Array.isArray(inputs) || inputs.length !== 9) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid input. Expected an array of 9 numerical values.',
      });
    }

    // Send the data to Flask API
    const response = await axios.post(`${FLASK_API_URL}/predict`, { inputs });

    // Return the predictions from Flask
    res.status(200).json({
      status: 'success',
      predictions: response.data.predictions,
    });
  } catch (error) {
    console.error('Error calling Flask API:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get predictions from the ML model.',
    });
  }
};
