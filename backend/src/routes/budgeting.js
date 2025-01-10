const express = require('express');
const router = express.Router();
const { getBudgetPredictions } = require('../controllers/budegtingController');

// POST route to get predictions
router.post('/budgeting/predict', getBudgetPredictions);

module.exports = router;