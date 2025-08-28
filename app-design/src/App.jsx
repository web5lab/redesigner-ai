import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { BottomNavigation } from './components/BottomNavigation'
import { TopBar } from './components/TopBar'
import { BotProvider } from './contexts/BotContext'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'

// Pages
import { Dashboard } from './pages/Dashboard'
import { Chat } from './pages/Chat'
import { Bots } from './pages/Bots'
import { Training } from './pages/Training'
import { Settings } from './pages/Settings'
import { Login } from './pages/Login'
import { BotSettings } from './pages/BotSettings'
import { Sessions } from './pages/Sessions'
import { Preview } from './pages/Preview'

import { logedInSelector } from './store/selectors'
import { getUserData } from './store/actions'

function AppLayout() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login'
  
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {!isAuthPage && <TopBar />}
      
      <main className={`flex-1 overflow-hidden ${!isAuthPage ? 'pb-20' : ''}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/bots" element={
            <ProtectedRoute>
              <Bots />
            </ProtectedRoute>
          } />
          <Route path="/chat" element={
            <ProtectedRoute requiresBot>
              <Chat />
            </ProtectedRoute>
          } />
          <Route path="/training" element={
            <ProtectedRoute requiresBot>
              <Training />
            </ProtectedRoute>
          } />
          <Route path="/sessions" element={
            <ProtectedRoute requiresBot>
              <Sessions />
            </ProtectedRoute>
          } />
          <Route path="/preview" element={
            <ProtectedRoute requiresBot>
              <Preview />
            </ProtectedRoute>
          } />
          <Route path="/bot-settings" element={
            <ProtectedRoute requiresBot>
              <BotSettings />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      
      {!isAuthPage && <BottomNavigation />}
    </div>
  )
}

export default function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(logedInSelector)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token && !isLoggedIn) {
      dispatch(getUserData(token))
    }
  }, [dispatch, isLoggedIn])

  return (
    <BrowserRouter>
      <AuthProvider>
        <BotProvider>
          <AppLayout />
        </BotProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}