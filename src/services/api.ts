import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface ChatResponse {
  message: string;
}

export interface MatchResponse {
  id: string;
  name: string;
  role: string;
  compatibilityScore: number;
  email: string;
  availability: string;
  communicationStyle: string;
  supportNeeds: string[];
  preferences: {
    cats?: boolean;
    schedule?: string;
    experience?: string;
  };
}

interface UserData {
  role: string;
  name: string;
  email: string;
  availability: string;
  communicationStyle: string;
  supportNeeds: string;
  catPreference: boolean;
}

export const api = {
  registerUser: async (userData: UserData): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  getMatches: async (role: string, name: string) => {
    try {
      const response = await fetch(`${API_URL}/matches?role=${role}&name=${name}`);
      if (!response.ok) {
        throw new Error('Failed to fetch matches');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching matches:', error);
      throw error;
    }
  },

  sendMessage: async (message: string) => {
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
};

export default api;