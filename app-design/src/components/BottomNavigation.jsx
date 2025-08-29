import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Bot, MessageCircle, Users, Settings, Plus } from 'lucide-react'

export function BottomNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showFAB, setShowFAB] = useState(false)

  const navItems = [
    { id: 'bots', icon: Bot, label: 'Bots', path: '/' },
    { id: 'chat', icon: MessageCircle, label: 'Chat', path: '/chat' },
    { id: 'teams', icon: Users, label: 'Teams', path: '/teams' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
    

      {/* Bottom Navigation */}
      <nav className=" bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 z-40">
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