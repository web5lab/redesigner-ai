import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Bot, MessageCircle, BarChart3, Settings, Plus } from 'lucide-react'

export function BottomNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showFAB, setShowFAB] = useState(false)

  const navItems = [
    { id: 'bots', icon: Bot, label: 'Bots', path: '/' },
    { id: 'chat', icon: MessageCircle, label: 'Chat', path: '/chat' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', path: '/dashboard' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-6 z-50">
        <button
          onClick={() => setShowFAB(!showFAB)}
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className={`w-6 h-6 transition-transform duration-300 ${showFAB ? 'rotate-45' : ''}`} />
        </button>
        
        {showFAB && (
          <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-2 min-w-[120px]">
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              New Bot
            </button>
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              New Chat
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 z-40">
        <div className="flex items-center justify-around py-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${active ? 'scale-110' : ''} transition-transform duration-200`} />
                <span className="text-xs font-medium">{item.label}</span>
                {active && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-blue-500 rounded-full" />
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}