const axios = require("axios");

const sendMessage = async (req, res) => {
    const { message } = req.body;
    try {
        const rasaResponse = await axios.post("http://localhost:5005/webhooks/rest/webhook", {
            sender: "user",
            message: message,
        });
        res.status(200).json(rasaResponse.data);
    } catch (error) {
        console.error("Error communicating with Rasa:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { sendMessage };
