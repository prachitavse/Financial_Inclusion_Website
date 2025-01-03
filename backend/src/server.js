const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = require('./src/app');

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Ensure the server can handle JSON requests

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

