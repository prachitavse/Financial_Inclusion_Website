const express = require('express');
const { sendMessageToChatbot } = require('../controllers/chatbotController');

const router = express.Router();

router.post('/chat', sendMessageToChatbot);

module.exports = router;

