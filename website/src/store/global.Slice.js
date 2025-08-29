import { createSlice } from '@reduxjs/toolkit'
import { GetBots, getChatSession, getChatSessions, GetUserData, updateChatBot, getBotTeam, getUserTeams } from './global.Action'

const initialState = {
  logedIn: false,
  profile: null,
  bots: [],
  activeBot: null,
  chatSessions: [],
  activeSession: null,
  teams: [],
  currentTeam: null,
  teamPermissions: null,
  uiConfig: {
    messages: [{ role: 'bot', content: 'Hello! How can I help you today?' }],
    selectedPalette: 0, // index of the selected palette
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
  name: 'globalState',
  initialState,
  reducers: {
    setLogedIn: (state, action) => {
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
        customQuestions: [],
        messageAlignment: 'default',
        sessionId: null,
        input: '',
        isTyping: false
      }
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    setBots: (state, action) => {
      state.bots = action.payload
    },
    setBotsActive: (state, action) => {
      state.activeBot = action.payload;
      state.uiConfig.botAvatar = action.payload.icon || '';
      state.uiConfig.botName = action.payload.name || '';
      state.uiConfig.systemPrompt = action.payload.systemPrompt || 'You are a helpful assistant for customer support';
      state.uiConfig.customQuestions = action.payload.customQuestions || [];
      state.uiConfig.customPrimaryColor = action.payload.primaryColour || '#3B82F6';
      state.uiConfig.customSecondaryColor = action.payload.secondaryColour || '#1c1d1d';
      state.uiConfig.customBgColor = action.payload.backgroundColour || '#f0f9ff';
      state.uiConfig.themeMode = action.payload.themeMode || 'light';
      state.uiConfig.userAvatar = action.payload.userIcon || 'https://arcai.fun/assets/logo-CrKFoPSZ.png';
      state.uiConfig.selectedFontSize = action.payload.typography; // Default font size
      state.uiConfig.welcomeMessage = action.payload.welcomeMessage || 'Hello, how can I help you today?';
      state.uiConfig.popupMessage = action.payload.popupMessage || 'hey there! I am here to assist you. How can I help?';
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
    },
    setTeams: (state, action) => {
      state.teams = action.payload
    },
    setCurrentTeam: (state, action) => {
      state.currentTeam = action.payload
    },
    setTeamPermissions: (state, action) => {
      state.teamPermissions = action.payload
    },
    addTeamMember: (state, action) => {
      if (state.currentTeam) {
        state.currentTeam.members.push(action.payload)
      }
    },
    updateTeamMemberInState: (state, action) => {
      const { memberId, updates } = action.payload;
      if (state.currentTeam) {
        const memberIndex = state.currentTeam.members.findIndex(m => m._id === memberId);
        if (memberIndex !== -1) {
          state.currentTeam.members[memberIndex] = { ...state.currentTeam.members[memberIndex], ...updates };
        }
      }
    },
    removeTeamMemberFromState: (state, action) => {
      const memberId = action.payload;
      if (state.currentTeam) {
        state.currentTeam.members = state.currentTeam.members.filter(m => m._id !== memberId);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetUserData.pending, (state) => {
        state.logedIn = false;
      })
      .addCase(GetUserData.rejected, (state, action) => {
        state.logedIn = false;
      })
      .addCase(GetUserData.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.logedIn = true;
      });
    builder
      .addCase(GetBots.fulfilled, (state, action) => {
        state.bots = action.payload.bots || [];
      });
    builder
      .addCase(getChatSessions.pending, (state) => {
        state.chatSessions = [];
      })
      .addCase(getChatSessions.rejected, (state, action) => {
        state.chatSessions = [];
      })
      .addCase(getChatSessions.fulfilled, (state, action) => {
        state.chatSessions = action.payload || [];
      });
    builder
      .addCase(getChatSession.pending, (state) => {
        state.activeSession = null;
      })
      .addCase(getChatSession.rejected, (state, action) => {
        state.activeSession = null;
      })
      .addCase(getChatSession.fulfilled, (state, action) => {
        state.activeSession = action.payload || null;
      });
    builder
      .addCase(getBotTeam.pending, (state) => {
        state.currentTeam = null;
      })
      .addCase(getBotTeam.rejected, (state, action) => {
        state.currentTeam = null;
      })
      .addCase(getBotTeam.fulfilled, (state, action) => {
        state.currentTeam = action.payload.team || null;
      });
    builder
      .addCase(getUserTeams.pending, (state) => {
        state.teams = [];
      })
      .addCase(getUserTeams.rejected, (state, action) => {
        state.teams = [];
      })
      .addCase(getUserTeams.fulfilled, (state, action) => {
        state.teams = action.payload.teams || [];
      });
  }
})

export const { setLogedIn,
  setProfile,
  setBots,
  setBotsActive,
  setUiConfig,
  addMessage,
  setInput,
  setIsTyping,
  setSessionId,
  setLogout,
  resetMessages,
  setTeams,
  setCurrentTeam,
  setTeamPermissions,
  addTeamMember,
  updateTeamMemberInState,
  removeTeamMemberFromState } = globalSlice.actions

export default globalSlice.reducer