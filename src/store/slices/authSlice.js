import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_CONFIG } from '../../config/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_CONFIG.baseURL
});

// Set token in axios headers
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Load token and user from storage
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (token) {
  setAuthToken(token);
}

// Async thunk for registration
export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    console.log('Registration data being sent:', userData);
    const response = await api.post('/auth/register', userData);
    const { token, user } = response.data;

    // Set token in axios headers and localStorage
    setAuthToken(token);
    localStorage.setItem('user', JSON.stringify(user));

    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data);
    return rejectWithValue(error.response?.data || { message: 'Registration failed' });
  }
});

// Async thunk for login
export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token, user } = response.data;

    // Set token in axios headers and localStorage
    setAuthToken(token);
    localStorage.setItem('user', JSON.stringify(user));

    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data);
    return rejectWithValue(error.response?.data || { message: 'Login failed' });
  }
});

// Async thunk for creating admin account (requires admin authentication)
// Note: This creates a new admin account, it doesn't log in as the new admin
export const createAdmin = createAsyncThunk('auth/createAdmin', async (adminData, { rejectWithValue }) => {
  try {
    console.log('Admin creation data being sent:', adminData);
    // The token is automatically included via api.defaults.headers.common['Authorization']
    // which is set by setAuthToken() when user logs in
    const response = await api.post('/auth/admin/create', adminData);
    
    // Creating an admin account typically doesn't return a token for the new admin
    // It just confirms the account was created successfully
    return response.data;
  } catch (error) {
    console.error('Admin creation error:', error.response?.data);
    return rejectWithValue(error.response?.data || { message: 'Failed to create admin account' });
  }
});

// Async thunk for admin login
export const loginAdmin = createAsyncThunk('auth/loginAdmin', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/admin/login', credentials);
    const { token, user } = response.data;

    // Set token in axios headers and localStorage
    setAuthToken(token);
    localStorage.setItem('user', JSON.stringify(user));

    return response.data;
  } catch (error) {
    console.error('Admin login error:', error.response?.data);
    return rejectWithValue(error.response?.data || { message: 'Admin login failed' });
  }
});

const initialState = {
  user: user || null,
  token: token || null,
  loading: false,
  error: null,
  isAuthenticated: !!token
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      setAuthToken(null);
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Registration failed';
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      })
      // Admin Creation (creating new admin account - doesn't change current user session)
      .addCase(createAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.loading = false;
        // Don't change authentication state - we're creating another admin, not logging in
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create admin account';
        // Don't change authentication state on error
      })
      // Admin Login
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Admin login failed';
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
