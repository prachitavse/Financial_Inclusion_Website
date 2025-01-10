import React, { useState } from 'react';
import './Chatbot.css';
import chatbotLogo from '../assets/chatbot-sign.jpg';
import closeButton from '../assets/cross-icon.jpg';
import { sendMessageToChatbot } from '../services/chatbotService';

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [showLanguageOverlay, setShowLanguageOverlay] = useState(false);

  const toggleChat = () => setOpen(!open);

  const toggleLanguageOverlay = () => setShowLanguageOverlay(!showLanguageOverlay);

  const handleInputChange = (e) => setUserMessage(e.target.value);

  const handleSendMessage = async () => {
    if (userMessage.trim() === '') return;

    const userMessageObj = { text: userMessage, sender: 'User' };
    setMessages((prevMessages) => [...prevMessages, userMessageObj]);

    try {
      const response = await sendMessageToChatbot(userMessage);
      const botMessageObj = {
        text: response.data[0]?.text || 'No response from bot',
        sender: 'Bot',
      };
      setMessages((prevMessages) => [...prevMessages, botMessageObj]);
    } catch (error) {
      console.error('Error communicating with backend:', error);
    }

    setUserMessage('');
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-button" onClick={toggleChat}>
        <img src={chatbotLogo} alt="Chatbot Logo" className="chatbot-logo" />
      </button>
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <img src={chatbotLogo} alt="Chatbot Logo" className="chatbot-logo" />
            <button className="close-chatbot" onClick={toggleChat}>
              <img src={closeButton} alt="Close" />
            </button>
          </div>
          <div className="chatbot-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === 'User' ? 'user-message' : 'bot-message'}`}
              >
                <strong>{msg.sender}: </strong>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="chatbot-footer">
            <button className="language-button" onClick={toggleLanguageOverlay}>
              Language
            </button>
            {showLanguageOverlay && (
              <div className="language-overlay">
                <button className="close-overlay" onClick={toggleLanguageOverlay}>
                  <img src={closeButton} alt="Close" />
                </button>
                <button className="langbutton">Hindi</button>
                <button className="langbutton">English</button>
                <button className="langbutton">Marathi</button>
                <button className="langbutton">Punjabi</button>
              </div>
            )}
            <input
              type="text"
              placeholder="Type your message..."
              value={userMessage}
              onChange={handleInputChange}
              className="chatbot-input"
            />
            <button className="send-button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
