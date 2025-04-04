import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_CONFIG from '../../config/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_CONFIG.baseURL
});

// Set token in axios headers
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Load token from storage
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

// Async thunks for boarder operations
export const fetchBoarders = createAsyncThunk('boarders/fetchBoarders', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(API_CONFIG.endpoints.boarders);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to fetch pet boarders' });
  }
});

export const bookBoarding = createAsyncThunk('boarders/bookBoarding', async (bookingData, { rejectWithValue }) => {
  try {
    const response = await api.post(API_CONFIG.endpoints.boardingBookings, bookingData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to book boarding' });
  }
});

const initialState = {
  boarders: [],
  loading: false,
  error: null
};

const boardersSlice = createSlice({
  name: 'boarders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Boarders
      .addCase(fetchBoarders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoarders.fulfilled, (state, action) => {
        state.loading = false;
        state.boarders = action.payload;
      })
      .addCase(fetchBoarders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch pet boarders';
      })
      // Book Boarding
      .addCase(bookBoarding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookBoarding.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(bookBoarding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to book boarding';
      });
  }
});

export const { clearError } = boardersSlice.actions;
export default boardersSlice.reducer; 