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

// Async thunks for booking operations
export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async (_, { rejectWithValue }) => {
  try {
    const [boardingResponse, vetResponse] = await Promise.all([
      api.get(API_CONFIG.endpoints.bookings.boarding),
      api.get(API_CONFIG.endpoints.bookings.vet)
    ]);
    return {
      boarding: boardingResponse.data,
      vet: vetResponse.data
    };
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to fetch bookings' });
  }
});

export const cancelBooking = createAsyncThunk('bookings/cancelBooking', async (bookingId, { rejectWithValue }) => {
  try {
    await api.post(API_CONFIG.endpoints.bookings.cancel(bookingId));
    return bookingId;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to cancel booking' });
  }
});

const initialState = {
  boarding: [],
  vet: [],
  loading: false,
  error: null
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Bookings
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.boarding = action.payload.boarding;
        state.vet = action.payload.vet;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch bookings';
      })
      // Cancel Booking
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the cancelled booking from both boarding and vet arrays
        state.boarding = state.boarding.filter(booking => booking._id !== action.payload);
        state.vet = state.vet.filter(booking => booking._id !== action.payload);
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to cancel booking';
      });
  }
});

export const { clearError } = bookingsSlice.actions;
export default bookingsSlice.reducer; 