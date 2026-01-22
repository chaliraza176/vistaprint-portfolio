import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor - add auth token if available
api.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user');
        if (user) {
            const { token } = JSON.parse(user);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('user');
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);

// ============ CATEGORIES ============
export const getCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const getCategoryBySlug = async (slug) => {
    try {
        const response = await api.get(`/categories/${slug}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
};

// ============ PRODUCTS ============
export const getProducts = async (params = {}) => {
    try {
        const response = await api.get('/products', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const getProductBySlug = async (slug) => {
    try {
        const response = await api.get(`/products/${slug}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};

export const searchProducts = async (query) => {
    try {
        const response = await api.get(`/products/search/${query}`);
        return response.data;
    } catch (error) {
        console.error('Error searching products:', error);
        return [];
    }
};

// ============ USER AUTH ============
// Demo mode - allows login without backend for deployed demo
const DEMO_MODE = !import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL.includes('localhost');

export const registerUser = async (userData) => {
    // Demo mode - simulate registration
    if (DEMO_MODE) {
        const demoUser = {
            _id: 'demo_' + Date.now(),
            name: userData.name || 'Demo User',
            email: userData.email,
            token: 'demo_token_' + Date.now(),
            createdAt: new Date().toISOString()
        };
        localStorage.setItem('user', JSON.stringify(demoUser));
        return { user: demoUser, message: 'Registration successful (Demo Mode)' };
    }

    try {
        const response = await api.post('/users/register', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Registration failed' };
    }
};

export const loginUser = async (credentials) => {
    // Demo mode - simulate login with any credentials
    if (DEMO_MODE) {
        const demoUser = {
            _id: 'demo_' + Date.now(),
            name: credentials.email.split('@')[0] || 'Demo User',
            email: credentials.email,
            token: 'demo_token_' + Date.now(),
            createdAt: new Date().toISOString()
        };
        localStorage.setItem('user', JSON.stringify(demoUser));
        return { user: demoUser, message: 'Login successful (Demo Mode)' };
    }

    try {
        const response = await api.post('/users/login', credentials);
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Login failed' };
    }
};

export const logoutUser = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const updateUserProfile = async (userId, data) => {
    try {
        const response = await api.put(`/users/${userId}`, data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Update failed' };
    }
};

// ============ CART ============
export const getCart = async (userId) => {
    try {
        const response = await api.get(`/cart/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        return { items: [], subtotal: 0 };
    }
};

export const addToCart = async (userId, item) => {
    try {
        const response = await api.post(`/cart/${userId}/items`, item);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to add to cart' };
    }
};

export const updateCartItem = async (userId, itemId, quantity) => {
    try {
        const response = await api.put(`/cart/${userId}/items/${itemId}`, { quantity });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to update cart' };
    }
};

export const removeFromCart = async (userId, itemId) => {
    try {
        const response = await api.delete(`/cart/${userId}/items/${itemId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to remove from cart' };
    }
};

export const clearCart = async (userId) => {
    try {
        const response = await api.delete(`/cart/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to clear cart' };
    }
};

// ============ ORDERS ============
export const getUserOrders = async (userId) => {
    try {
        const response = await api.get(`/orders/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
};

export const getOrderById = async (orderId) => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Order not found' };
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await api.post('/orders', orderData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to create order' };
    }
};

export const cancelOrder = async (orderId) => {
    try {
        const response = await api.put(`/orders/${orderId}/cancel`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to cancel order' };
    }
};

// ============ PROJECTS ============
export const getUserProjects = async (userId, status = null) => {
    try {
        const params = status ? { status } : {};
        const response = await api.get(`/projects/user/${userId}`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
};

export const getProjectById = async (projectId) => {
    try {
        const response = await api.get(`/projects/${projectId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Project not found' };
    }
};

export const createProject = async (projectData) => {
    try {
        const response = await api.post('/projects', projectData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to create project' };
    }
};

export const updateProject = async (projectId, data) => {
    try {
        const response = await api.put(`/projects/${projectId}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to update project' };
    }
};

export const deleteProject = async (projectId) => {
    try {
        const response = await api.delete(`/projects/${projectId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to delete project' };
    }
};

export const duplicateProject = async (projectId) => {
    try {
        const response = await api.post(`/projects/${projectId}/duplicate`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to duplicate project' };
    }
};

// ============ USER ADDRESSES ============
export const addUserAddress = async (userId, address) => {
    try {
        const response = await api.post(`/users/${userId}/addresses`, address);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to add address' };
    }
};

export default api;
