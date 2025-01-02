import React, { useState } from 'react';
import Message from './messageessage';
import { sendMessageToChatbot } from '../services/chatbotService';
import './ChatBox.css';

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'User' };
    setMessages([...messages, userMessage]);

    try {
      const response = await sendMessageToChatbot(input);
      const botMessage = { text: response.data[0]?.text || 'No response from bot', sender: 'Bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error communicating with backend:', error.message);
    }

    setInput('');
};

return (
  <div className="chatbox">
    <div className="chatbox-messages">
      {messages.map((msg, index) => (
        <Message key={index} text={msg.text} sender={msg.sender} />
      ))}
    </div>
    <div className="chatbox-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  </div>
);
}

export default ChatBox;
