const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chatbotRoutes = require('./routes/chatbot'); // Correct path to the chatbot.js file

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Ensure the server can handle JSON requests

// Use the chatbot routes
app.use(chatbotRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

