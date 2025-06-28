import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

// Async thunks
export const getRewards = createAsyncThunk(
  'game/getRewards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/game/rewards');
      return response.data.data.rewards;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get rewards');
    }
  }
);

export const purchaseTickets = createAsyncThunk(
  'game/purchaseTickets',
  async (amount, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/game/purchase-tickets', { amount });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to purchase tickets');
    }
  }
);

export const spinWheel = createAsyncThunk(
  'game/spinWheel',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/game/spin');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to spin wheel');
    }
  }
);

export const getSpinHistory = createAsyncThunk(
  'game/getSpinHistory',
  async ({ page = 1, limit = 20 } = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/game/spin-history?page=${page}&limit=${limit}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get spin history');
    }
  }
);

const initialState = {
  rewards: [],
  spinHistory: [],
  lastSpinResult: null,
  loading: false,
  spinning: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  }
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearLastSpinResult: (state) => {
      state.lastSpinResult = null;
    },
    setSpinning: (state, action) => {
      state.spinning = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Rewards
      .addCase(getRewards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRewards.fulfilled, (state, action) => {
        state.loading = false;
        state.rewards = action.payload;
      })
      .addCase(getRewards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Purchase Tickets
      .addCase(purchaseTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(purchaseTickets.fulfilled, (state, action) => {
        state.loading = false;
        // Update will be handled by auth slice
      })
      .addCase(purchaseTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Spin Wheel
      .addCase(spinWheel.pending, (state) => {
        state.spinning = true;
        state.error = null;
      })
      .addCase(spinWheel.fulfilled, (state, action) => {
        state.spinning = false;
        state.lastSpinResult = action.payload.spinResult;
        // Add to history
        state.spinHistory.unshift(action.payload.spinResult);
      })
      .addCase(spinWheel.rejected, (state, action) => {
        state.spinning = false;
        state.error = action.payload;
      })
      
      // Get Spin History
      .addCase(getSpinHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpinHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.spinHistory = action.payload.spins;
        state.pagination = action.payload.pagination;
      })
      .addCase(getSpinHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearLastSpinResult, setSpinning } = gameSlice.actions;

export default gameSlice.reducer;