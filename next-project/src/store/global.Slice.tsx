import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getApiKeys, GetChatHistory, getLogs, getPublicTemplates, getStats, getTemplates, GetUserData, GetWebsite, } from './global.Action'

interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  currentPlan: string;
  planValidity: string;
  AiCredits: number;
  aiToken: number;
  referralCode?: string;
}

interface Website {
  _id: string;
  uuid: string;
  source: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  multiDesign?: boolean;
  multiDesignlist?: any[];
  type?: string;
  instruction?: string;
}

interface GlobalState {
  User: User | null;
  apiKeys: any[];
  logs: any[];
  stats: any;
  pagination: any;
  websites: Website[];
  selctedPageForEditing: string | null;
  websiteQueqe: any;
  templates: any[];
  totalCount: number;
  totalPages: number;
  publicTemplates: any[];
  chatHistory: any[];
  fullScrrenPreview: boolean;
}

const initialState: GlobalState = {
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
  chatHistory:[],
  fullScrrenPreview: false,
}

export const globalSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.User = action.payload
    },
    logOutUser: (state) => {
      state.User = null;
      state.websites = [];
    },
    setFullScrrenPreview: (state, action: PayloadAction<boolean>) => {
      state.fullScrrenPreview = action.payload;
    },
    setEditiorPage: (state, action: PayloadAction<string>) => {
      state.selctedPageForEditing = action.payload;
    },
    setWebsiteQueqe: (state, action: PayloadAction<any>) => {
      state.websiteQueqe = action.payload;
    },
    setChatHistory:(state, action: PayloadAction<any>) => {
      state.chatHistory.push(action.payload);
    }
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
      .addCase(getPublicTemplates.fulfilled, (state, action) => {
        state.publicTemplates = action.payload.data;
      });
    builder
    .addCase(GetChatHistory.fulfilled, (state, action) => {
      state.chatHistory = action.payload.messages;
    }); 
  }
})

export const { setCurrentUser,setFullScrrenPreview, setChatHistory,logOutUser, setEditiorPage, setWebsiteQueqe } = globalSlice.actions

export default globalSlice.reducer