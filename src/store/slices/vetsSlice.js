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

// Async thunks for vet operations
export const fetchVets = createAsyncThunk('vets/fetchVets', async ({ searchTerm = '', specialization = '', sortBy = '' }, { rejectWithValue }) => {
  try {
    const response = await api.get(API_CONFIG.endpoints.vets, {
      params: { search: searchTerm, specialization, sort: sortBy }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to fetch veterinarians' });
  }
});

export const bookVetAppointment = createAsyncThunk('vets/bookAppointment', async (appointmentData, { rejectWithValue }) => {
  try {
    const response = await api.post(API_CONFIG.endpoints.bookings.vet, appointmentData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to book appointment' });
  }
});

const initialState = {
  vets: [],
  loading: false,
  error: null
};

const vetsSlice = createSlice({
  name: 'vets',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Vets
      .addCase(fetchVets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVets.fulfilled, (state, action) => {
        state.loading = false;
        state.vets = action.payload;
      })
      .addCase(fetchVets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch veterinarians';
      })
      // Book Appointment
      .addCase(bookVetAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookVetAppointment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(bookVetAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to book appointment';
      });
  }
});

export const { clearError } = vetsSlice.actions;
export default vetsSlice.reducer; 