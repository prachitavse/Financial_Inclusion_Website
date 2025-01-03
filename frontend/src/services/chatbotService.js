import axios from 'axios';

export const sendMessageToChatbot = async (message) => {
  try {
    const response = await axios.post('http://localhost:3001/api/chat', { message });
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

