// API Service - Handles all backend communication
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to set headers with JWT token
const getHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// Helper function for error handling
const handleResponse = async (response) => {
  let data;
  try {
    data = await response.json();
  } catch (e) {
    console.error('Response parse error:', e);
    throw new Error('Invalid response from server');
  }
  if (!response.ok) {
    console.error('API Error:', { status: response.status, data });
    throw new Error(data.error || `API request failed with status ${response.status}`);
  }
  return data;
};

// ============ AUTH ENDPOINTS ============

export const authAPI = {
  // Register new user
  register: async (name, email, password, domain) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include', // Important: Include credentials for CORS
        body: JSON.stringify({ name, email, password, domain }),
      });
      const data = await handleResponse(response);
      // Save token to localStorage
      localStorage.setItem('authToken', data.token);
      return data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include', // Important: Include credentials for CORS
        body: JSON.stringify({ email, password }),
      });
      const data = await handleResponse(response);
      // Save token to localStorage
      localStorage.setItem('authToken', data.token);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('authToken');
  },

  // Get token from localStorage
  getToken: () => {
    return localStorage.getItem('authToken');
  },
};

// ============ IDEAS ENDPOINTS ============

export const ideaAPI = {
  // Create new idea
  createIdea: async (title, description, domains, rolesNeeded) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ideas`, {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify({ title, description, domains, rolesNeeded }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Create idea error:', error);
      throw error;
    }
  },

  // Get all ideas
  getAllIdeas: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/ideas`, {
        method: 'GET',
        headers: getHeaders(),
        credentials: 'include',
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Get ideas error:', error);
      throw error;
    }
  },

  // Get single idea
  getIdeaById: async (ideaId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}`, {
        method: 'GET',
        headers: getHeaders(),
        credentials: 'include',
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Get idea error:', error);
      throw error;
    }
  },
};

// ============ PROJECTS ENDPOINTS ============

export const projectAPI = {
  // Join a project
  joinProject: async (ideaId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/join/${ideaId}`, {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include',
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Join project error:', error);
      throw error;
    }
  },

  // Get user's projects
  getMyProjects: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/my-projects`, {
        method: 'GET',
        headers: getHeaders(),
        credentials: 'include',
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Get projects error:', error);
      throw error;
    }
  },
};
