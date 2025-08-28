import { createSlice } from '@reduxjs/toolkit'
import { getUserData, getBots } from './actions'

const initialState = {
  logedIn: false,
  profile: null,
  bots: [],
  activeBot: null,
  chatSessions: [],
  uiConfig: {
    messages: [{ role: 'bot', content: 'Hello! How can I help you today?' }],
    customPrimaryColor: '#3B82F6',
    customSecondaryColor: '#1c1d1d',
    customBgColor: '#f0f9ff',
    themeMode: 'light',
    botAvatar: '',
    userAvatar: '',
    selectedFontSize: '16px',
    botName: 'AI Assistant',
    welcomeMessage: 'Hello! How can I help you today?',
    customQuestions: [],
    input: '',
    isTyping: false,
    sessionId: null
  }
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.logedIn = action.payload
    },
    setLogout: (state) => {
      state.logedIn = false
      state.profile = null
      state.bots = []
      state.activeBot = null
      state.chatSessions = []
      state.uiConfig = initialState.uiConfig
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    setActiveBot: (state, action) => {
      state.activeBot = action.payload
      if (action.payload) {
        state.uiConfig.botName = action.payload.name || 'AI Assistant'
        state.uiConfig.botAvatar = action.payload.icon || ''
      }
    },
    setUiConfig: (state, action) => {
      state.uiConfig = { ...state.uiConfig, ...action.payload }
    },
    addMessage: (state, action) => {
      state.uiConfig.messages.push(action.payload)
    },
    setInput: (state, action) => {
      state.uiConfig.input = action.payload
    },
    setIsTyping: (state, action) => {
      state.uiConfig.isTyping = action.payload
    },
    resetMessages: (state) => {
      state.uiConfig.messages = [{ role: 'bot', content: 'Hello! How can I help you today?' }]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.fulfilled, (state, action) => {
        state.profile = action.payload
        state.logedIn = true
      })
      .addCase(getBots.fulfilled, (state, action) => {
        state.bots = action.payload || []
      })
  }
})

export const {
  setLoggedIn,
  setLogout,
  setProfile,
  setActiveBot,
  setUiConfig,
  addMessage,
  setInput,
  setIsTyping,
  resetMessages
} = globalSlice.actions

export default globalSlice.reducer