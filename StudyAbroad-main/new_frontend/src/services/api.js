import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api', // Pointing to new_backend on 5001
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Auth Services
export const authService = {
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },
    signup: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
    }
};

// University Services
export const universityService = {
    // Get all universities with optional filters
    getAll: async (params = {}) => {
        const response = await api.get('/universities', { params });
        return response.data;
    },

    // Get university by ID
    getById: async (id) => {
        const response = await api.get(`/universities/${id}`);
        return response.data;
    },

    // Get statistics (count, countries, etc.)
    getStatistics: async () => {
        const response = await api.get('/universities/statistics');
        return response.data;
    },

    // Get available countries
    getCountries: async () => {
        const response = await api.get('/universities/countries');
        return response.data;
    },

    // Get available fields of study
    getFields: async () => {
        const response = await api.get('/universities/fields');
        return response.data;
    },

    // Search universities with query and filters
    search: async (query, filters = {}) => {
        const params = { q: query, ...filters };
        const response = await api.get('/universities', { params });
        return response.data;
    },

    // Get search suggestions
    getSuggestions: async (query) => {
        const response = await api.get('/universities/search/suggestions', { params: { q: query } });
        return response.data;
    },

    // Get top universities (by ranking)
    getTopUniversities: async (limit = 4) => {
        const response = await api.get('/universities', {
            params: { sort_by: 'ranking', sort_order: 'asc', per_page: limit }
        });
        return response.data;
    }
};

export default api;
