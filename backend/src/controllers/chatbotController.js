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
