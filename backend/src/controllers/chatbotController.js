const axios = require('axios');

exports.sendMessageToChatbot = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
      message,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error communicating with Rasa:', error.message);
    res.status(500).send('Internal Server Error');
  }
};
exports.handleChat = async (req, res) => {
  try {
    const message = req.body.message;
    // Process the message, interact with the chatbot, and send the response
    const chatbotResponse = await someChatbotAPI(message); // Replace with your actual chatbot API call
    res.json({ response: chatbotResponse });
  } catch (error) {
    console.error('Error processing chat request:', error);
    res.status(500).send('Internal server error');
  }
};
