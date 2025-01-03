const express = require('express');
const chatbotRoutes = require('./routes/chatbot');
const budgetingRoutes = require('./routes/budgeting');

const app = express();

app.use(express.json());

// API routes
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/budgeting', budgetingRoutes);

module.exports = app;
