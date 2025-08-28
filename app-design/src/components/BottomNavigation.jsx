import { useLocation, useNavigate } from 'react-router-dom'
import { 
  Bot, 
  MessageSquare, 
  BarChart3, 
  Settings,
  Plus
} from 'lucide-react'

const navItems = [
  {
    path: '/',
    icon: Bot,
    label: 'Bots',
    activeColor: 'text-blue-600',
    inactiveColor: 'text-gray-400'
  },
  {
    path: '/chat',
    icon: MessageSquare,
    label: 'Chat',
    activeColor: 'text-green-600',
    inactiveColor: 'text-gray-400'
  },
  {
    path: '/dashboard',
    icon: BarChart3,
    label: 'Analytics',
    activeColor: 'text-purple-600',
    inactiveColor: 'text-gray-400'
  },
  {
    path: '/settings',
    icon: Settings,
    label: 'Settings',
    activeColor: 'text-orange-600',
    inactiveColor: 'text-gray-400'
  }
]

export function BottomNavigation() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="relative">
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50"></div>
      
      {/* Navigation content */}
      <nav className="relative flex items-center justify-around px-2 py-2 safe-area-bottom">
        {navItems.map((item) => {
          const active = isActive(item.path)
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 touch-target group ${
                active 
                  ? 'bg-gray-100 dark:bg-gray-800 shadow-lg scale-105' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              {/* Active indicator */}
              {active && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              )}
              
              {/* Icon with gradient background when active */}
              <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                active 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' 
                  : 'group-hover:bg-gray-100 dark:group-hover:bg-gray-700'
              }`}>
                <item.icon 
                  className={`w-5 h-5 transition-colors duration-300 ${
                    active ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                  }`} 
                />
                
                {/* Notification badge for chat */}
                {item.path === '/chat' && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                )}
              </div>
              
              {/* Label */}
              <span className={`text-xs font-medium mt-1 transition-colors duration-300 ${
                active 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {item.label}
              </span>
              
              {/* Ripple effect */}
              <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                active 
                  ? 'bg-gradient-to-r from-blue-500/10 to-purple-600/10' 
                  : 'bg-transparent group-hover:bg-gray-100/50 dark:group-hover:bg-gray-700/50'
              }`}></div>
            </button>
          )
        })}
        
        {/* Floating Action Button */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <button className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group">
            <Plus className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping opacity-20"></div>
          </button>
        </div>
      </nav>
    </div>
  )
}