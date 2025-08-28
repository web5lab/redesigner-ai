import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { 
  Bell, 
  Search, 
  Menu,
  Bot,
  Crown,
  Sparkles,
  Zap
} from 'lucide-react'
import { userSelector, activeBotSelector } from '../store/selectors'

const pageTitle = {
  '/': 'Dashboard',
  '/bots': 'My Bots',
  '/chat': 'Chat',
  '/training': 'Training',
  '/sessions': 'Sessions',
  '/preview': 'Preview',
  '/bot-settings': 'Bot Settings',
  '/settings': 'Settings'
}

export function TopBar() {
  const location = useLocation()
  const user = useSelector(userSelector)
  const activeBot = useSelector(activeBotSelector)
  
  const currentTitle = pageTitle[location.pathname] || 'CustomerBot'

  return (
    <div className="sticky top-0 z-40 safe-area-top">
      {/* Background with blur */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left section */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              
              <div>
                <h1 className="text-lg font-bold text-gray-900">{currentTitle}</h1>
                {activeBot && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">{activeBot.name}</span>
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2">
              {/* Search button */}
              <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors touch-target">
                <Search className="w-5 h-5 text-gray-600" />
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors touch-target">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
              </button>

              {/* User avatar */}
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center overflow-hidden">
                  {user?.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-bold text-white">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
              </div>
            </div>
          </div>

          {/* Active bot indicator */}
          {activeBot && (
            <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Active: {activeBot.name}</span>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}