import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import  { adminInstance } from '../api/axiosInstance';

// Async thunks
export const adminLogin = createAsyncThunk(
  'admin/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await adminInstance.post('/admin/login', { email, password });
      
      // Store admin token
      if (response.data.data.token) {
        localStorage.setItem('adminToken', response.data.data.token);
        adminInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
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
      const response = await adminInstance.get('/admin/dashboard/stats');
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
      const response = await adminInstance.get(`/admin/users?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get users');
    }
  }
);

export const addUserBalance = createAsyncThunk(
  'admin/addUserBalance',
  async ({ userId, amount, type }, { rejectWithValue }) => {
    try {
      const response = await adminInstance.post(`/admin/users/${userId}/add-balance`, { amount, type });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add user balance');
    }
  }
);

export const getAdminRewards = createAsyncThunk(
  'admin/getRewards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminInstance.get('/admin/rewards');
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
      const response = await adminInstance.post('/admin/rewards', rewardData);
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
      const response = await adminInstance.put(`/admin/rewards/${id}`, rewardData);
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
      await adminInstance.delete(`/admin/rewards/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete reward');
    }
  }
);

export const getPricingRules = createAsyncThunk(
  'admin/getPricingRules',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminInstance.get('/admin/pricing');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get pricing rules');
    }
  }
);

export const getAdminSocialTasks = createAsyncThunk(
  'admin/getSocialTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminInstance.get('/admin/social-tasks');
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
      const response = await adminInstance.post('/admin/social-tasks', taskData);
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
      const response = await adminInstance.put(`/admin/social-tasks/${id}`, taskData);
      return response.data.data.task;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update social task');
    }
  }
);

export const deleteSocialTask = createAsyncThunk(
  'admin/deleteSocialTask',
  async (id, { rejectWithValue }) => {
    try {
      await adminInstance.delete(`/admin/social-tasks/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete social task');
    }
  }
);

export const getAdminReferrals = createAsyncThunk(
  'admin/getReferrals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminInstance.get('/admin/referrals');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get referrals');
    }
  }
);

export const getSpinBoard = createAsyncThunk(
  'admin/getSpinBoard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminInstance.get('/admin/spin-board');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get spin board');
    }
  }
);

export const reorderSpinBoard = createAsyncThunk(
  'admin/reorderSpinBoard',
  async (rewardIds, { rejectWithValue }) => {
    try {
      const response = await adminInstance.put('/admin/spin-board/reorder', { rewardIds });
      return rewardIds;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reorder spin board');
    }
  }
);

export const getAnalytics = createAsyncThunk(
  'admin/getAnalytics',
  async ({ days = 7 } = {}, { rejectWithValue }) => {
    try {
      const response = await adminInstance.get(`/admin/analytics/overview?days=${days}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get analytics');
    }
  }
);

export const getTransactions = createAsyncThunk(
  'admin/getTransactions',
  async ({ page = 1, limit = 50, type = '', status = '' } = {}, { rejectWithValue }) => {
    try {
      const response = await adminInstance.get(`/admin/transactions?page=${page}&limit=${limit}&type=${type}&status=${status}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get transactions');
    }
  }
);

export const adminLogout = createAsyncThunk(
  'admin/logout',
  async (_, { rejectWithValue }) => {
    try {
      await adminInstance.post('/admin/logout');
      localStorage.removeItem('adminToken');
      delete adminInstance.defaults.headers.common['Authorization'];
      return null;
    } catch (error) {
      // Even if logout fails on server, clear local storage
      localStorage.removeItem('adminToken');
      delete adminInstance.defaults.headers.common['Authorization'];
      return null;
    }
  }
);

const initialState = {
  admin: null,
  token: localStorage.getItem('adminToken'),
  isAuthenticated: !!localStorage.getItem('adminToken'),
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
  
  // Pricing data
  pricingRules: [],
  basePrice: 10,
  
  // Social tasks data
  socialTasks: [],
  
  // Referrals data
  referrals: [],
  referralStats: [],
  
  // Spin board data
  spinBoardRewards: [],
  totalProbability: 0,
  
  // Transactions data
  transactions: [],
  transactionsPagination: {
    page: 1,
    limit: 50,
    total: 0,
    pages: 0
  },
  
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
    },
    clearAdminData: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
      state.dashboardStats = initialState.dashboardStats;
      state.users = [];
      state.rewards = [];
      state.socialTasks = [];
      state.referrals = [];
      state.airdrops = [];
      state.transactions = [];
      state.analytics = initialState.analytics;
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
        state.loading = false;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add User Balance
      .addCase(addUserBalance.fulfilled, (state, action) => {
        const updatedUser = action.payload.user;
        const index = state.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          state.users[index] = {
            ...state.users[index],
            tokenBalances: updatedUser.tokenBalances,
            currentTickets: updatedUser.currentTickets
          };
        }
        state.loading = false;
      })
      .addCase(addUserBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
      
      // Pricing
      .addCase(getPricingRules.fulfilled, (state, action) => {
        state.pricingRules = action.payload.pricingRules;
        state.basePrice = action.payload.basePrice;
      })
      
      // Social Tasks
      .addCase(getAdminSocialTasks.fulfilled, (state, action) => {
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
      .addCase(deleteSocialTask.fulfilled, (state, action) => {
        state.socialTasks = state.socialTasks.filter(t => t._id !== action.payload);
      })
      
      // Referrals
      .addCase(getAdminReferrals.fulfilled, (state, action) => {
        state.referrals = action.payload.referrals;
        state.referralStats = action.payload.stats;
      })
      
      // Spin Board
      .addCase(getSpinBoard.fulfilled, (state, action) => {
        state.spinBoardRewards = action.payload.rewards;
        state.totalProbability = action.payload.totalProbability;
      })
      .addCase(reorderSpinBoard.fulfilled, (state, action) => {
        // Reorder rewards based on new order
        const reorderedRewards = action.payload.map((id, index) => {
          const reward = state.spinBoardRewards.find(r => r._id === id);
          return { ...reward, position: index };
        });
        state.spinBoardRewards = reorderedRewards;
      })
      
      // Transactions
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload.transactions;
        state.transactionsPagination = action.payload.pagination;
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

export const { clearError, setCredentials, clearAdminData } = adminSlice.actions;

export default adminSlice.reducer;