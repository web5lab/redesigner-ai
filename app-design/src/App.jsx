import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { BotProvider } from './contexts/BotContext'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'

// Pages
import { Bots } from './pages/Bots'
import { Chat } from './pages/Chat'
import { Login } from './pages/Login'

import { logedInSelector } from './store/selectors'
import { getUserData } from './store/actions'

function AppLayout() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login'
  
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
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
        </Routes>
      </main>
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