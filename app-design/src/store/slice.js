import { createSlice } from '@reduxjs/toolkit'
import { GetUserData, GetBots, createBot, getChatSessions, getChatSession, scrapPdfData, scrapWebsiteUrl } from './actions'

const initialState = {
  user: null,
  bots: [],
  activeBot: null,
  chatSessions: [],
  activeChatSession: null,
  messages: [],
  loading: false,
  error: null
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setActiveBot: (state, action) => {
      state.activeBot = action.payload
    },
    setActiveChatSession: (state, action) => {
      state.activeChatSession = action.payload
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    clearMessages: (state) => {
      state.messages = []
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // GetUserData
      .addCase(GetUserData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(GetUserData.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
      })
      .addCase(GetUserData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // GetBots
      .addCase(GetBots.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(GetBots.fulfilled, (state, action) => {
        state.loading = false
        state.bots = action.payload.bots || []
      })
      .addCase(GetBots.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // createBot
      .addCase(createBot.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createBot.fulfilled, (state, action) => {
        state.loading = false
        state.bots.push(action.payload.bot)
      })
      .addCase(createBot.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // getChatSessions
      .addCase(getChatSessions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getChatSessions.fulfilled, (state, action) => {
        state.loading = false
        state.chatSessions = action.payload.sessions || []
      })
      .addCase(getChatSessions.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // getChatSession
      .addCase(getChatSession.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getChatSession.fulfilled, (state, action) => {
        state.loading = false
        state.activeChatSession = action.payload.session
        state.messages = action.payload.session?.messages || []
      })
      .addCase(getChatSession.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // scrapPdfData
      .addCase(scrapPdfData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(scrapPdfData.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(scrapPdfData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // scrapWebsiteUrl
      .addCase(scrapWebsiteUrl.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(scrapWebsiteUrl.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(scrapWebsiteUrl.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { setActiveBot, setActiveChatSession, addMessage, clearMessages, clearError } = globalSlice.actions
export default globalSlice.reducer