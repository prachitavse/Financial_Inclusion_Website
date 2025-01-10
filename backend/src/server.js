const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chatbotRoutes = require('./routes/chatbot');
const budgetingRoutes = require('./routes/budgeting');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Ensure the server can handle JSON requests

app.use(chatbotRoutes);
app.use(budgetingRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Server Initialization
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});