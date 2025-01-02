import React from 'react';
import '../../styles/chatbox.css';
function Message({ text, sender }) {
  const isUser = sender === 'User';

  return (
    <div className={`message ${isUser ? 'user-message' : 'bot-message'}`}>
      <strong>{sender}: </strong>
      <span>{text}</span>
    </div>
  );
}

export default Message;
