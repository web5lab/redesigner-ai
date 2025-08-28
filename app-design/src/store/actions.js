import { createAsyncThunk } from '@reduxjs/toolkit'

// Mock API calls for the prototype
export const getUserData = createAsyncThunk(
  'global/getUserData',
  async (token) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'John Doe',
          email: 'john@example.com',
          profilePicture: null
        })
      }, 1000)
    })
  }
)

export const getBots = createAsyncThunk(
  'global/getBots',
  async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            _id: '1',
            name: 'Support Assistant',
            icon: 'https://ui-avatars.com/api/?name=Support+Assistant&background=3b82f6&color=ffffff&size=48',
            status: 'active',
            description: 'Helps with customer support'
          },
          {
            _id: '2',
            name: 'Sales Bot',
            icon: 'https://ui-avatars.com/api/?name=Sales+Bot&background=10b981&color=ffffff&size=48',
            status: 'active',
            description: 'Assists with sales inquiries'
          }
        ])
      }, 1000)
    })
  }
)