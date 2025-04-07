import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_CONFIG, handleApiError, createApiHelper } from '../../config/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout
});

// Create API helper with retry functionality
const apiHelper = createApiHelper(api);

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
    const config = {
      method: 'get',
      url: API_CONFIG.endpoints.boarders,
      params: { search: searchTerm, petType, sort: sortBy }
    };
    
    const response = await apiHelper.retryRequest(config);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const fetchBoardingRequests = createAsyncThunk('boarders/fetchBoardingRequests', async (_, { rejectWithValue }) => {
  try {
    const config = {
      method: 'get',
      url: `${API_CONFIG.endpoints.boarders}/requests`
    };
    
    const response = await apiHelper.retryRequest(config);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const updateBoardingRequest = createAsyncThunk('boarders/updateBoardingRequest', async ({ requestId, status }, { rejectWithValue }) => {
  try {
    const config = {
      method: 'put',
      url: `${API_CONFIG.endpoints.boarders}/requests/${requestId}`,
      data: { status }
    };
    
    const response = await apiHelper.retryRequest(config);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const bookBoarding = createAsyncThunk('boarders/bookBoarding', async (bookingData, { rejectWithValue }) => {
  try {
    const config = {
      method: 'post',
      url: API_CONFIG.endpoints.boardingBookings,
      data: bookingData
    };
    
    const response = await apiHelper.retryRequest(config);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const fetchBoardedPets = createAsyncThunk('boarders/fetchBoardedPets', async (_, { rejectWithValue }) => {
  try {
    const config = {
      method: 'get',
      url: `${API_CONFIG.endpoints.boarders}/pets`
    };
    
    const response = await apiHelper.retryRequest(config);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

const initialState = {
  boarders: [],
  boardingRequests: [],
  boardedPets: [],
  loading: false,
  error: null,
  connectionIssue: false
};

const boardersSlice = createSlice({
  name: 'boarders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.connectionIssue = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Boarders
      .addCase(fetchBoarders.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.connectionIssue = false;
      })
      .addCase(fetchBoarders.fulfilled, (state, action) => {
        state.loading = false;
        state.boarders = action.payload;
      })
      .addCase(fetchBoarders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch pet boarders';
        state.connectionIssue = action.payload?.isConnectionIssue || false;
      })
      // Fetch Boarding Requests
      .addCase(fetchBoardingRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.connectionIssue = false;
      })
      .addCase(fetchBoardingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.boardingRequests = action.payload;
      })
      .addCase(fetchBoardingRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch boarding requests';
        state.connectionIssue = action.payload?.isConnectionIssue || false;
      })
      // Update Boarding Request
      .addCase(updateBoardingRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.connectionIssue = false;
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
        state.connectionIssue = action.payload?.isConnectionIssue || false;
      })
      // Book Boarding
      .addCase(bookBoarding.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.connectionIssue = false;
      })
      .addCase(bookBoarding.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(bookBoarding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to book boarding';
        state.connectionIssue = action.payload?.isConnectionIssue || false;
      })
      // Fetch Boarded Pets
      .addCase(fetchBoardedPets.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.connectionIssue = false;
      })
      .addCase(fetchBoardedPets.fulfilled, (state, action) => {
        state.loading = false;
        state.boardedPets = action.payload;
      })
      .addCase(fetchBoardedPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch boarded pets';
        state.connectionIssue = action.payload?.isConnectionIssue || false;
      });
  }
});

export const { clearError } = boardersSlice.actions;
export default boardersSlice.reducer; 