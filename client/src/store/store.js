import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import gameReducer from './gameSlice'
import socialReducer from './socialSlice'
import referralReducer from './referralSlice'
import adminReducer from './adminSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    social: socialReducer,
    referral: referralReducer,
    admin: adminReducer
  },
})
