import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { 
  Home, 
  Bot, 
  MessageSquare, 
  Brain, 
  Settings,
  Plus,
  Sparkles
} from 'lucide-react'
import { activeBotSelector } from '../store/selectors'

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Home',
    icon: Home,
    path: '/',
    color: 'text-blue-500',
    activeColor: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'bots',
    label: 'Bots',
    icon: Bot,
    path: '/bots',
    color: 'text-purple-500',
    activeColor: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    id: 'chat',
    label: 'Chat',
    icon: MessageSquare,
    path: '/chat',
    color: 'text-green-500',
    activeColor: 'text-green-600',
    bgColor: 'bg-green-50',
    requiresBot: true
  },
  {
    id: 'training',
    label: 'Training',
    icon: Brain,
    path: '/training',
    color: 'text-orange-500',
    activeColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    requiresBot: true
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    path: '/settings',
    color: 'text-gray-500',
    activeColor: 'text-gray-600',
    bgColor: 'bg-gray-50'
  }
]

export function BottomNavigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const activeBot = useSelector(activeBotSelector)

  const handleNavigation = (item) => {
    if (item.requiresBot && !activeBot) {
      navigate('/bots')
      return
    }
    navigate(item.path)
  }

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50"></div>
      
      {/* Navigation content */}
      <div className="relative px-4 py-2">
        <div className="flex items-center justify-around">
          {navigationItems.map((item) => {
            const active = isActive(item.path)
            const disabled = item.requiresBot && !activeBot
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                disabled={disabled}
                className={`
                  relative flex flex-col items-center justify-center p-3 rounded-2xl
                  transition-all duration-300 touch-target haptic-light
                  ${active 
                    ? `${item.bgColor} ${item.activeColor} scale-110 shadow-lg` 
                    : disabled 
                      ? 'text-gray-300' 
                      : `${item.color} hover:${item.bgColor} active:scale-95`
                  }
                `}
              >
                {/* Active indicator */}
                {active && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                )}
                
                {/* Icon container */}
                <div className={`
                  relative p-2 rounded-xl transition-all duration-300
                  ${active ? 'bg-white shadow-md' : ''}
                `}>
                  <item.icon className={`w-5 h-5 transition-all duration-300 ${
                    active ? item.activeColor : disabled ? 'text-gray-300' : item.color
                  }`} />
                  
                  {/* Notification dot for chat */}
                  {item.id === 'chat' && activeBot && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                  )}
                </div>
                
                {/* Label */}
                <span className={`
                  text-xs font-medium mt-1 transition-all duration-300
                  ${active ? 'font-semibold' : disabled ? 'text-gray-300' : ''}
                `}>
                  {item.label}
                </span>

                {/* Ripple effect */}
                {active && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}