const express = require('express');
const chatbotRoutes = require('./routes/chatbot');

const app = express();

app.use(express.json());
app.use('/api', chatbotRoutes);

module.exports = app;

