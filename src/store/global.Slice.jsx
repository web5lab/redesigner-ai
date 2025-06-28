import { createSlice } from '@reduxjs/toolkit'
import { getApiKeys, getLogs, getPublicTemplates, getStats, getTemplates, GetUserData, GetWebsite, } from './global.Action'


const initialState = {
  User: null,
  apiKeys: [],
  logs: [],
  stats: null,
  pagination: null,
  websites: [],
  selctedPageForEditing: null,
  websiteQueqe: null,
  templates: [],
  totalCount: 0,
  totalPages: 0,
  publicTemplates: [],
}

export const globalSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {

    setCurrentUser: (state, action) => {
      state.User = action.payload
    },
    logOutUser: (state) => {
      state.User = null;
      state.websites = [];
    },
    setEditiorPage: (state, action) => {
      state.selctedPageForEditing = action.payload;
    },
    setWebsiteQueqe: (state, action) => {
      state.websiteQueqe = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetUserData.fulfilled, (state, action) => {
        state.User = action.payload.user;
      });
    builder
      .addCase(getApiKeys.fulfilled, (state, action) => {
        state.apiKeys = action.payload;
      });
    builder
      .addCase(GetWebsite.fulfilled, (state, action) => {
        state.websites = action.payload;
      });
    builder
      .addCase(getTemplates.fulfilled, (state, action) => {
        state.templates = action.payload.data;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
      });
    builder
      .addCase(getLogs.fulfilled, (state, action) => {
        state.logs = action.payload.logs;
        state.pagination = action.payload.pagination;
      });
    builder
      .addCase(getStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
    builder
      .addCase(getPublicTemplates.fulfilled, (state,action) => {
        state.publicTemplates = action.payload.data;
      });
  }
})

export const { setCurrentUser, logOutUser, setEditiorPage, setWebsiteQueqe } = globalSlice.actions

export default globalSlice.reducer