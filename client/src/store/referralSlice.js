import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

// Async thunks
export const getReferralStats = createAsyncThunk(
  'referral/getStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/referral/stats');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get referral stats');
    }
  }
);

export const getReferralHistory = createAsyncThunk(
  'referral/getHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/referral/history');
      return response.data.data.referrals;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get referral history');
    }
  }
);

export const createReferral = createAsyncThunk(
  'referral/create',
  async ({ referralCode, referredWalletAddress }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/referral/create', {
        referralCode,
        referredWalletAddress
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create referral');
    }
  }
);

export const createReferral = createAsyncThunk(
  'referral/create',
  async ({ referralCode, referredWalletAddress }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/referral/create', {
        referralCode,
        referredWalletAddress
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create referral');
    }
  }
);

export const claimReferralReward = createAsyncThunk(
  'referral/claimReward',
  async (referralId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/referral/claim/${referralId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to claim reward');
    }
  }
);

const initialState = {
  stats: {
    totalReferrals: 0,
    completedReferrals: 0,
    pendingReferrals: 0,
    totalRewardsEarned: 0,
    referralCode: '',
    referralLink: ''
  },
  history: [],
  loading: false,
  error: null
};

const referralSlice = createSlice({
  name: 'referral',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Stats
      .addCase(getReferralStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReferralStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getReferralStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get History
      .addCase(getReferralHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReferralHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(getReferralHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Referral
      .addCase(createReferral.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReferral.fulfilled, (state, action) => {
        state.loading = false;
        // Referral created successfully
      })
      .addCase(createReferral.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Claim Reward
      .addCase(createReferral.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReferral.fulfilled, (state, action) => {
        state.loading = false;
        // Referral created successfully
      })
      .addCase(createReferral.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Claim Reward
      .addCase(claimReferralReward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(claimReferralReward.fulfilled, (state, action) => {
        state.loading = false;
        // Update stats after claiming
        state.stats.totalRewardsEarned += action.payload.rewardAmount;
      })
      .addCase(claimReferralReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = referralSlice.actions;

export default referralSlice.reducer;