import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

// Async thunks
export const adminLogin = createAsyncThunk(
  'admin/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/admin/login', { email, password });
      
      // Store admin token
      if (response.data.data.token) {
        localStorage.setItem('adminToken', response.data.data.token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
      }
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const getDashboardStats = createAsyncThunk(
  'admin/getDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/stats');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get dashboard stats');
    }
  }
);

export const getUsers = createAsyncThunk(
  'admin/getUsers',
  async ({ page = 1, limit = 20, search = '', sortBy = 'joinDate', sortOrder = 'desc' } = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/users?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get users');
    }
  }
);

export const getAdminRewards = createAsyncThunk(
  'admin/getRewards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/rewards');
      return response.data.data.rewards;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get rewards');
    }
  }
);

export const createReward = createAsyncThunk(
  'admin/createReward',
  async (rewardData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/admin/rewards', rewardData);
      return response.data.data.reward;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create reward');
    }
  }
);

export const updateReward = createAsyncThunk(
  'admin/updateReward',
  async ({ id, ...rewardData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/rewards/${id}`, rewardData);
      return response.data.data.reward;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update reward');
    }
  }
);

export const deleteReward = createAsyncThunk(
  'admin/deleteReward',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/admin/rewards/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete reward');
    }
  }
);

export const getSocialTasks = createAsyncThunk(
  'admin/getSocialTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/social-tasks');
      return response.data.data.tasks;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get social tasks');
    }
  }
);

export const createSocialTask = createAsyncThunk(
  'admin/createSocialTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/admin/social-tasks', taskData);
      return response.data.data.task;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create social task');
    }
  }
);

export const updateSocialTask = createAsyncThunk(
  'admin/updateSocialTask',
  async ({ id, ...taskData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/social-tasks/${id}`, taskData);
      return response.data.data.task;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update social task');
    }
  }
);

export const getReferrals = createAsyncThunk(
  'admin/getReferrals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/referrals');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get referrals');
    }
  }
);

export const getAnalytics = createAsyncThunk(
  'admin/getAnalytics',
  async ({ days = 7 } = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/analytics/overview?days=${days}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get analytics');
    }
  }
);

export const adminLogout = createAsyncThunk(
  'admin/logout',
  async () => {
    localStorage.removeItem('adminToken');
    delete axiosInstance.defaults.headers.common['Authorization'];
    return null;
  }
);

const initialState = {
  admin: null,
  token: localStorage.getItem('adminToken'),
  isAuthenticated: false,
  loading: false,
  error: null,
  
  // Dashboard data
  dashboardStats: {
    totalUsers: 0,
    totalSpins: 0,
    totalRevenue: 0,
    activeUsers: 0,
    recentSpins: [],
    topUsers: []
  },
  
  // Users data
  users: [],
  usersPagination: {
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  },
  
  // Rewards data
  rewards: [],
  
  // Social tasks data
  socialTasks: [],
  
  // Referrals data
  referrals: [],
  referralStats: [],
  
  // Analytics data
  analytics: {
    userGrowth: [],
    revenueData: [],
    spinData: []
  }
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // Admin Login
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      // Dashboard Stats
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.dashboardStats = action.payload;
      })
      
      // Users
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.usersPagination = action.payload.pagination;
      })
      
      // Rewards
      .addCase(getAdminRewards.fulfilled, (state, action) => {
        state.rewards = action.payload;
      })
      .addCase(createReward.fulfilled, (state, action) => {
        state.rewards.push(action.payload);
      })
      .addCase(updateReward.fulfilled, (state, action) => {
        const index = state.rewards.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.rewards[index] = action.payload;
        }
      })
      .addCase(deleteReward.fulfilled, (state, action) => {
        state.rewards = state.rewards.filter(r => r._id !== action.payload);
      })
      
      // Social Tasks
      .addCase(getSocialTasks.fulfilled, (state, action) => {
        state.socialTasks = action.payload;
      })
      .addCase(createSocialTask.fulfilled, (state, action) => {
        state.socialTasks.push(action.payload);
      })
      .addCase(updateSocialTask.fulfilled, (state, action) => {
        const index = state.socialTasks.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.socialTasks[index] = action.payload;
        }
      })
      
      // Referrals
      .addCase(getReferrals.fulfilled, (state, action) => {
        state.referrals = action.payload.referrals;
        state.referralStats = action.payload.stats;
      })
      
      // Analytics
      .addCase(getAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
      })
      
      // Logout
      .addCase(adminLogout.fulfilled, (state) => {
        state.admin = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  }
});

export const { clearError, setCredentials } = adminSlice.actions;

export default adminSlice.reducer;