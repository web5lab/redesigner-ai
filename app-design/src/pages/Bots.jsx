import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Bot, 
  MessageSquare,
  ArrowRight,
  Crown,
  Sparkles,
  MoreHorizontal,
  Settings,
  Trash2,
  Star,
  Activity
} from 'lucide-react'
import { botsSelector } from '../store/selectors'
import { setActiveBot } from '../store/slice'
export function Bots() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const bots = useSelector(botsSelector)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleBotSelect = (bot) => {
    dispatch(setActiveBot(bot))
    navigate('/chat')
  }

  const filteredBots = bots.filter(bot =>
    bot.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
   

      {/* Premium Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 safe-area-top">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Assistants</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{bots.length} bots available</p>
            </div>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="relative p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Plus className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </button>
          </div>

        </div>
      </div>

      {/* Bots List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
        

          {/* Bots List */}
          {filteredBots.map((bot) => (
            <div
              key={bot._id}
              className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
            >
              <button
                onClick={() => handleBotSelect(bot)}
                className="w-full p-4 text-left"
              >
                <div className="flex items-center gap-4">
                  {/* Bot Avatar */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg ring-2 ring-gray-100 dark:ring-gray-700">
                      <img
                        src={bot.icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(bot.name)}&background=3b82f6&color=ffffff&size=56`}
                        alt={bot.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Bot Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">{bot.name}</h3>
                      <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {bot.description || 'AI Assistant • Ready to help'}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>1.2k chats</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        <span>Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </button>

              {/* Bot Actions */}
              <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Settings className="w-4 h-4" />
                    Configure
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl transition-colors text-sm font-medium text-blue-700 dark:text-blue-400">
                    <MessageSquare className="w-4 h-4" />
                    Chat Now
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredBots.length === 0 && searchQuery && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No assistants found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search terms</p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Clear search
              </button>
            </div>
          )}

          {/* No Bots State */}
          {bots.length === 0 && !searchQuery && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Bot className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Welcome to CustomerBot</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 px-8">
                Create your first AI assistant to get started with automated customer support
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Create Your First Bot
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}