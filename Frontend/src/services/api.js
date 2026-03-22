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

// Custom error class for API errors
class APIError extends Error {
  constructor(message, statusCode, type = 'unknown') {
    super(message);
    this.statusCode = statusCode;
    this.type = type; // 'network', 'auth', 'server', 'validation', 'unknown'
  }
}

// Helper function for error handling with specific error types
const handleResponse = async (response) => {
  let data;
  
  try {
    data = await response.json();
  } catch (parseError) {
    // Server didn't return valid JSON
    throw new APIError(
      'Server returned an invalid response. Please try again.',
      response.status,
      'server'
    );
  }

  if (!response.ok) {
    const errorMessage = data.error || data.message || 'An error occurred';
    
    if (response.status === 401) {
      // Use the server's actual message — "Invalid email or password" only makes sense on login;
      // other protected routes (join project, etc.) return their own descriptive message
      throw new APIError(errorMessage, 401, 'auth');
    } else if (response.status === 400) {
      throw new APIError(errorMessage, 400, 'validation');
    } else if (response.status >= 500) {
      throw new APIError('Server error. Please try again later.', response.status, 'server');
    } else if (response.status >= 400) {
      throw new APIError(errorMessage, response.status, 'server');
    }
    
    throw new APIError(errorMessage, response.status, 'unknown');
  }

  return data;
};

// Shared fetch wrapper — centralizes network error handling to avoid duplication
const apiFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, { headers: getHeaders(), ...options });
    return await handleResponse(response);
  } catch (error) {
    if (error instanceof APIError) throw error;
    // Handle network errors (e.g. server not running)
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new APIError(
        'Unable to connect to server. Please ensure the server is running on http://localhost:5000',
        0,
        'network'
      );
    }
    throw new APIError(error.message || 'An unexpected error occurred. Please try again.', 0, 'unknown');
  }
};

// ============ AUTH ENDPOINTS ============

export const authAPI = {
  // Register new user
  register: async (name, email, password, domain) => {
    const data = await apiFetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password, domain }),
    });
    localStorage.setItem('authToken', data.token);
    return data;
  },

  // Login user
  login: async (email, password) => {
    const data = await apiFetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
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
  createIdea: async (title, description, domains, rolesNeeded) =>
    apiFetch(`${API_BASE_URL}/ideas`, {
      method: 'POST',
      body: JSON.stringify({ title, description, domains, rolesNeeded }),
    }),

  // Get all ideas
  getAllIdeas: async () => apiFetch(`${API_BASE_URL}/ideas`),

  // Get single idea
  getIdeaById: async (ideaId) => apiFetch(`${API_BASE_URL}/ideas/${ideaId}`),
};

// ============ PROJECTS ENDPOINTS ============

export const projectAPI = {
  // Join a project
  joinProject: async (ideaId) =>
    apiFetch(`${API_BASE_URL}/projects/join/${ideaId}`, { method: 'POST' }),

  // Get user's projects
  getMyProjects: async () => apiFetch(`${API_BASE_URL}/projects/my-projects`),
};

// ============ USER / PROFILE ENDPOINTS ============

export const userAPI = {
  // Get current user's full profile
  getProfile: async () => apiFetch(`${API_BASE_URL}/users/me`),

  // Update bio and social links
  updateProfile: async (bio, socials) =>
    apiFetch(`${API_BASE_URL}/users/me`, {
      method: 'PUT',
      body: JSON.stringify({ bio, socials }),
    }),

  // Get any user's public profile
  getUserById: async (userId) => apiFetch(`${API_BASE_URL}/users/${userId}`),
};

// Export APIError for use in other files
export { APIError };
