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
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }
  return data;
};

// ============ AUTH ENDPOINTS ============

export const authAPI = {
  // Register new user
  register: async (name, email, password, domain) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ name, email, password, domain }),
    });
    const data = await handleResponse(response);
    // Save token to localStorage
    localStorage.setItem('authToken', data.token);
    return data;
  },

  // Login user
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(response);
    // Save token to localStorage
    localStorage.setItem('authToken', data.token);
    return data;
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
    const response = await fetch(`${API_BASE_URL}/ideas`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ title, description, domains, rolesNeeded }),
    });
    return handleResponse(response);
  },

  // Get all ideas
  getAllIdeas: async () => {
    const response = await fetch(`${API_BASE_URL}/ideas`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // Get single idea
  getIdeaById: async (ideaId) => {
    const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};

// ============ PROJECTS ENDPOINTS ============

export const projectAPI = {
  // Join a project
  joinProject: async (ideaId) => {
    const response = await fetch(`${API_BASE_URL}/projects/join/${ideaId}`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // Get user's projects
  getMyProjects: async () => {
    const response = await fetch(`${API_BASE_URL}/projects/my-projects`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};
