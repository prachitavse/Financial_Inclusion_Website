// META DATA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Developer Details:
//     Name: Harshita Jangde 
//     Role: Frontend Developer
//     Name: Tanisha Priya
//     Role: Backend Developer
//     Description: 
//         This React component implements a chatbot interface that allows users to communicate with an AI chatbot.
//         It includes features such as opening and closing the chatbot window, sending messages, 
//         displaying responses from the bot, and language selection for user interaction (English, Hindi, Marathi, Punjabi).
//         It also handles the state management of the messages and user input dynamically.

//     Dependencies:
//         - React (for component structure and state management)
//         - CSS (for styling the chatbot interface)
//         - chatbotService (for sending and receiving messages from the backend chatbot API)
//         - Images (for logo and close button used in the UI)
//     - Key Features:
//         - Toggle between open and closed chatbot window
//         - Display messages sent by both user and bot
//         - Language selection overlay to switch chatbot communication language
//         - Input field to type and send messages to the chatbot
//         - Handling user inputs and API responses dynamically

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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
            <button className="chatbot-language-button" onClick={toggleLanguageOverlay}>
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
