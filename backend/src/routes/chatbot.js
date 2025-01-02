const express = require("express");
const { sendMessage } = require("../controllers/chatbotController");
const router = express.Router();

router.post("/chat", sendMessage);

module.exports = router;
