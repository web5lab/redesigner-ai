import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

// Async thunks
export const getSocialTasks = createAsyncThunk(
  'social/getTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/social/tasks');
      return response.data.data.tasks;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get tasks');
    }
  }
);

export const submitTask = createAsyncThunk(
  'social/submitTask',
  async ({ taskId, proof }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/social/tasks/${taskId}/submit`, { proof });
      return { taskId, status: response.data.data.status };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit task');
    }
  }
);

export const claimTaskReward = createAsyncThunk(
  'social/claimReward',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/social/tasks/${taskId}/claim`);
      return { taskId, reward: response.data.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to claim reward');
    }
  }
);

const initialState = {
  tasks: [],
  loading: false,
  submitting: false,
  claiming: false,
  error: null
};

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateTaskStatus: (state, action) => {
      const { taskId, status } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = status;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Tasks
      .addCase(getSocialTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSocialTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getSocialTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Submit Task
      .addCase(submitTask.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitTask.fulfilled, (state, action) => {
        state.submitting = false;
        const { taskId, status } = action.payload;
        const task = state.tasks.find(t => t.id === taskId);
        if (task) {
          task.status = status;
          task.completedAt = new Date().toISOString();
        }
      })
      .addCase(submitTask.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })
      
      // Claim Reward
      .addCase(claimTaskReward.pending, (state) => {
        state.claiming = true;
        state.error = null;
      })
      .addCase(claimTaskReward.fulfilled, (state, action) => {
        state.claiming = false;
        const { taskId } = action.payload;
        const task = state.tasks.find(t => t.id === taskId);
        if (task) {
          task.rewardClaimed = true;
        }
      })
      .addCase(claimTaskReward.rejected, (state, action) => {
        state.claiming = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, updateTaskStatus } = socialSlice.actions;

export default socialSlice.reducer;