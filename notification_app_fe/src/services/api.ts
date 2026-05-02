import axios from 'axios';
import { Logger } from '../utils/logger';

const BASE_URL = 'http://20.207.122.201/evaluation-service';

export const register = async (userData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error: any) {
    console.error('Registration failed:', error.response?.data || error.message);
    throw error;
  }
};

export const getAuthToken = async (authData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth`, authData);
    const { access_token } = response.data;
    if (access_token) {
      Logger.setAuthToken(access_token);
    }
    return response.data;
  } catch (error: any) {
    console.error('Auth failed:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchNotifications = async () => {
  // In a real app, this would fetch from a notification endpoint
  // For now, we return mock data
  return [
    { id: 1, title: 'Server Down', message: 'Backend server is not responding.', level: 'error', time: '2 mins ago' },
    { id: 2, title: 'New User', message: 'A new user has registered.', level: 'info', time: '10 mins ago' },
    { id: 3, title: 'Database Warning', message: 'Database connection is slow.', level: 'warn', time: '1 hour ago' },
    { id: 4, title: 'Deployment Success', message: 'Version 1.2.0 deployed successfully.', level: 'debug', time: '2 hours ago' },
  ];
};
