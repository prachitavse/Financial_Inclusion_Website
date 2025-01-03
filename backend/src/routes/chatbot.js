const express = require('express');
const { sendMessageToChatbot } = require('../controllers/chatbotController');

const router = express.Router();

router.post('/api/chat', sendMessageToChatbot);

module.exports = router;

