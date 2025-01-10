const express = require('express');
const router = express.Router();
const { getBudgetPredictions } = require('../controllers/budgetingController');

// POST route to get predictions
router.post('/predict', getBudgetPredictions);

module.exports = router;
