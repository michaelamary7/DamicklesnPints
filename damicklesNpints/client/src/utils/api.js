import axios from 'axios';

const API_URL = 'https://your-api-url.com'; // Replace with your actual API URL

// Function to login a user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Function to register a new user
export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

// Add more helper functions as needed