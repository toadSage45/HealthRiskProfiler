import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const parseProfile = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/api/profile/parse`, data);
  return response.data;
};

export const analyzeProfile = async (answers) => {
  const response = await axios.post(`${API_BASE_URL}/api/profile/analyze`, { answers });
  return response.data;
};
