import axios from 'axios';

const API_URL = 'http://localhost:3001/api/chat';

export const sendMessageToChatbot = (message) => {
  return axios.post(API_URL, { message });
};
