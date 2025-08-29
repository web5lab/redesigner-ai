import { createSlice } from '@reduxjs/toolkit'
import { GetUserData, GetBots, getChatSessions, getChatSession } from './actions'

const initialState = {
  logedIn: false,
  profile: null,
  bots: [],
  activeBot: null,
  chatSessions: [],
  activeSession: null,
  uiConfig: {
    messages: [{ role: 'bot', content: 'Hello! How can I help you today?' }],
    selectedPalette: 0,
    isCustomColorMode: false,
    customPrimaryColor: '#3B82F6',
    customSecondaryColor: '#1c1d1d',
    customBgColor: '#f0f9ff',
    themeMode: 'light',
    botAvatar: '',
    userAvatar: '',
    selectedFontSize: '16px',
    botName: '',
    systemPrompt: 'You are a helpful assistant for customer support',
    customQuestions: [],
    messageAlignment: 'default',
    sessionId: null,
    input: '',
    welcomeMessage: 'Hello, how can I help you today?',
    popupMessage: 'hey there! I am here to assist you. How can I help?',
    isTyping: false
  },
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
      state.activeSession = null
      state.uiConfig = {
        messages: [{ role: 'bot', content: 'Hello! How can I help you today?' }],
        selectedPalette: 0,
        isCustomColorMode: false,
        customPrimaryColor: '#3B82F6',
        customSecondaryColor: '#1c1d1d',
        customBgColor: '#f0f9ff',
        themeMode: 'light',
        botAvatar: '',
        userAvatar: '',
        selectedFontSize: '16px',
        botName: '',
        systemPrompt: 'You are a helpful assistant for customer support',
        customQuestions: [],
        messageAlignment: 'default',
        sessionId: null,
        input: '',
        welcomeMessage: 'Hello, how can I help you today?',
        popupMessage: 'hey there! I am here to assist you. How can I help?',
        isTyping: false
      }
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    setBots: (state, action) => {
      state.bots = action.payload
    },
    setActiveBot: (state, action) => {
      state.activeBot = action.payload
      if (action.payload) {
        state.uiConfig.botAvatar = action.payload.icon || ''
        state.uiConfig.botName = action.payload.name || ''
        state.uiConfig.systemPrompt = action.payload.systemPrompt || 'You are a helpful assistant for customer support'
        state.uiConfig.customQuestions = action.payload.customQuestions || []
        state.uiConfig.customPrimaryColor = action.payload.primaryColour || '#3B82F6'
        state.uiConfig.customSecondaryColor = action.payload.secondaryColour || '#1c1d1d'
        state.uiConfig.customBgColor = action.payload.backgroundColour || '#f0f9ff'
        state.uiConfig.themeMode = action.payload.themeMode || 'light'
        state.uiConfig.userAvatar = action.payload.userIcon || ''
        state.uiConfig.selectedFontSize = action.payload.typography || '16px'
        state.uiConfig.welcomeMessage = action.payload.welcomeMessage || 'Hello, how can I help you today?'
        state.uiConfig.popupMessage = action.payload.popupMessage || 'hey there! I am here to assist you. How can I help?'
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
    setSessionId: (state, action) => {
      state.uiConfig.sessionId = action.payload
    },
    resetMessages: (state) => {
      state.uiConfig.messages = [{ role: 'bot', content: 'Hello! How can I help you today?' }]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetUserData.pending, (state) => {
        state.logedIn = false
      })
      .addCase(GetUserData.rejected, (state, action) => {
        state.logedIn = false
      })
      .addCase(GetUserData.fulfilled, (state, action) => {
        state.profile = action.payload
        state.logedIn = true
      })
      .addCase(GetBots.fulfilled, (state, action) => {
        state.bots = action.payload.bots || []
      })
      .addCase(GetBots.fulfilled, (state, action) => {
        state.bots = action.payload.bots || []
      })
      .addCase(getChatSessions.pending, (state) => {
        state.chatSessions = []
      })
      .addCase(getChatSessions.rejected, (state, action) => {
        state.chatSessions = []
      })
      .addCase(getChatSessions.fulfilled, (state, action) => {
        state.chatSessions = action.payload || []
      })
      .addCase(getChatSession.pending, (state) => {
        state.activeSession = null
      })
      .addCase(getChatSession.rejected, (state, action) => {
        state.activeSession = null
      })
      .addCase(getChatSession.fulfilled, (state, action) => {
        state.activeSession = action.payload || null
      })
  }
})

export const {
  setLoggedIn,
  setLogout,
  setProfile,
  setBots,
  setActiveBot,
  setUiConfig,
  addMessage,
  setInput,
  setIsTyping,
  setSessionId,
  resetMessages
} = globalSlice.actions

export default globalSlice.reducer