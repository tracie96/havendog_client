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

// Async thunks for pet operations
export const fetchPets = createAsyncThunk('pets/fetchPets', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/auth/pets');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to fetch pets' });
  }
});

export const addPet = createAsyncThunk('pets/addPet', async (petData, { rejectWithValue }) => {
  try {
    const response = await api.post('/api/auth/pets', petData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to add pet' });
  }
});

export const updatePet = createAsyncThunk('pets/updatePet', async ({ id, petData }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/auth/pets/${id}`, petData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to update pet' });
  }
});

export const deletePet = createAsyncThunk('pets/deletePet', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/api/auth/pets/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to delete pet' });
  }
});

const initialState = {
  pets: [],
  loading: false,
  error: null
};

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Pets
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch pets';
      })
      // Add Pet
      .addCase(addPet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.loading = false;
        state.pets.push(action.payload);
      })
      .addCase(addPet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to add pet';
      })
      // Update Pet
      .addCase(updatePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePet.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.pets.findIndex(pet => pet._id === action.payload._id);
        if (index !== -1) {
          state.pets[index] = action.payload;
        }
      })
      .addCase(updatePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update pet';
      })
      // Delete Pet
      .addCase(deletePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = state.pets.filter(pet => pet._id !== action.payload);
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete pet';
      });
  }
});

export const { clearError } = petsSlice.actions;
export default petsSlice.reducer; 