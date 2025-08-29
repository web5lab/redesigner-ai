import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { BotProvider } from './contexts/BotContext'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { BottomNavigation } from './components/BottomNavigation'

// Pages
import { Bots } from './pages/Bots'
import { Chat } from './pages/Chat'
import { Login } from './pages/Login'
import { Settings } from './pages/Settings'
import { Dashboard } from './pages/Dashboard'

import { logedInSelector } from './store/selectors'
import { getUserData } from './store/actions'

function AppLayout() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login'
  const isLoggedIn = useSelector(logedInSelector)
  
  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Bots />
            </ProtectedRoute>
          } />
          <Route path="/chat" element={
            <ProtectedRoute requiresBot>
              <Chat />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      
      {/* Bottom Navigation - Only show when logged in, not on auth pages, and not in chat */}
      {isLoggedIn && !isAuthPage && location.pathname !== '/chat' && <BottomNavigation />}
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