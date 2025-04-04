import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_CONFIG } from '../../config/api';

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
export const fetchBoarders = createAsyncThunk('boarders/fetchBoarders', async ({ searchTerm = '', petType = '', sortBy = '' }, { rejectWithValue }) => {
  try {
    const response = await api.get(API_CONFIG.endpoints.boarders, {
      params: { search: searchTerm, petType, sort: sortBy }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to fetch pet boarders' });
  }
});

export const fetchBoardingRequests = createAsyncThunk('boarders/fetchBoardingRequests', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`${API_CONFIG.endpoints.boarders}/requests`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to fetch boarding requests' });
  }
});

export const updateBoardingRequest = createAsyncThunk('boarders/updateBoardingRequest', async ({ requestId, status }, { rejectWithValue }) => {
  try {
    const response = await api.put(`${API_CONFIG.endpoints.boarders}/requests/${requestId}`, { status });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to update boarding request' });
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

export const fetchBoardedPets = createAsyncThunk('boarders/fetchBoardedPets', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`${API_CONFIG.endpoints.boarders}/pets`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to fetch boarded pets' });
  }
});

const initialState = {
  boarders: [],
  boardingRequests: [],
  boardedPets: [],
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
      // Fetch Boarding Requests
      .addCase(fetchBoardingRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoardingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.boardingRequests = action.payload;
      })
      .addCase(fetchBoardingRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch boarding requests';
      })
      // Update Boarding Request
      .addCase(updateBoardingRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBoardingRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.boardingRequests = state.boardingRequests.map(request => 
          request._id === action.payload._id ? action.payload : request
        );
      })
      .addCase(updateBoardingRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update boarding request';
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
      })
      // Fetch Boarded Pets
      .addCase(fetchBoardedPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoardedPets.fulfilled, (state, action) => {
        state.loading = false;
        state.boardedPets = action.payload;
      })
      .addCase(fetchBoardedPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch boarded pets';
      });
  }
});

export const { clearError } = boardersSlice.actions;
export default boardersSlice.reducer; 