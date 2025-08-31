import { createSlice } from '@reduxjs/toolkit'
import { 
  getApiKeys, 
  GetChatHistory, 
  getLogs, 
  getPublicTemplates, 
  getStats, 
  getTemplates, 
  GetUserData, 
  GetWebsite 
} from './global.Action'

const initialState = {
  User: null,
  apiKeys: [],
  logs: [],
  stats: null,
  pagination: null,
  websites: [],
  selectedPageForEditing: null,
  websiteQueue: null,
  templates: [],
  totalCount: 0,
  totalPages: 0,
  publicTemplates: [],
  chatHistory: [],
  fullScreenPreview: false,
}

export const globalSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.User = action.payload
    },
    logOutUser: (state) => {
      state.User = null
      state.websites = []
    },
    setFullScreenPreview: (state, action) => {
      state.fullScreenPreview = action.payload
    },
    setEditorPage: (state, action) => {
      state.selectedPageForEditing = action.payload
    },
    setWebsiteQueue: (state, action) => {
      state.websiteQueue = action.payload
    },
    setChatHistory: (state, action) => {
      state.chatHistory.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetUserData.fulfilled, (state, action) => {
        state.User = action.payload.user
      })
      .addCase(getApiKeys.fulfilled, (state, action) => {
        state.apiKeys = action.payload
      })
      .addCase(GetWebsite.fulfilled, (state, action) => {
        state.websites = action.payload
      })
      .addCase(getTemplates.fulfilled, (state, action) => {
        state.templates = action.payload.data
        state.totalCount = action.payload.totalCount
        state.totalPages = action.payload.totalPages
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.logs = action.payload.logs
        state.pagination = action.payload.pagination
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.stats = action.payload
      })
      .addCase(getPublicTemplates.fulfilled, (state, action) => {
        state.publicTemplates = action.payload.data
      })
      .addCase(GetChatHistory.fulfilled, (state, action) => {
        state.chatHistory = action.payload.messages
      })
  }
})

export const { 
  setCurrentUser, 
  setFullScreenPreview, 
  setChatHistory, 
  logOutUser, 
  setEditorPage, 
  setWebsiteQueue 
} = globalSlice.actions

export default globalSlice.reducer