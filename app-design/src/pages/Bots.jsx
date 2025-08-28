import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Bot, 
  MoreVertical, 
  Settings, 
  Trash2, 
  Share2,
  Activity,
  Crown,
  Sparkles
} from 'lucide-react'
import { botsSelector } from '../store/selectors'
import { setActiveBot } from '../store/slice'
import { CreateBotModal } from '../components/CreateBotModal'

export function Bots() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const bots = useSelector(botsSelector)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedBotMenu, setSelectedBotMenu] = useState(null)

  const handleBotSelect = (bot) => {
    dispatch(setActiveBot(bot))
    navigate('/chat')
  }

  const filteredBots = bots.filter(bot =>
    bot.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {showCreateModal && (
        <CreateBotModal onClose={() => setShowCreateModal(false)} />
      )}

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My AI Bots</h1>
              <p className="text-sm text-gray-600">{bots.length} assistants available</p>
            </div>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all haptic-medium"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your bots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>

          {/* Create New Bot Card */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full p-6 border-2 border-dashed border-blue-300 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all haptic-medium"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-gray-900">Create New Bot</h3>
                <p className="text-sm text-gray-600">Build your AI assistant</p>
              </div>
            </div>
          </button>

          {/* Bots Grid */}
          <div className="space-y-4">
            {filteredBots.map((bot) => (
              <div
                key={bot._id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  {/* Bot Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={bot.icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(bot.name)}&background=3b82f6&color=ffffff&size=48`}
                        alt={bot.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>

                  {/* Bot Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 truncate">{bot.name}</h3>
                      <Crown className="w-4 h-4 text-yellow-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">AI Assistant</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        <span>1.2k chats</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBotSelect(bot)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transition-all haptic-light"
                    >
                      Open
                    </button>
                    
                    <button
                      onClick={() => setSelectedBotMenu(selectedBotMenu === bot._id ? null : bot._id)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all touch-target"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bot Menu */}
                {selectedBotMenu === bot._id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 animate-slide-down">
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => {
                          dispatch(setActiveBot(bot))
                          navigate('/bot-settings')
                          setSelectedBotMenu(null)
                        }}
                        className="flex flex-col items-center gap-1 p-3 bg-gray-50 hover:bg-blue-50 rounded-xl transition-all haptic-light"
                      >
                        <Settings className="w-4 h-4 text-gray-600" />
                        <span className="text-xs text-gray-600">Settings</span>
                      </button>
                      
                      <button className="flex flex-col items-center gap-1 p-3 bg-gray-50 hover:bg-green-50 rounded-xl transition-all haptic-light">
                        <Share2 className="w-4 h-4 text-gray-600" />
                        <span className="text-xs text-gray-600">Share</span>
                      </button>
                      
                      <button className="flex flex-col items-center gap-1 p-3 bg-gray-50 hover:bg-red-50 rounded-xl transition-all haptic-light">
                        <Trash2 className="w-4 h-4 text-gray-600" />
                        <span className="text-xs text-gray-600">Delete</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredBots.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bots found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-blue-600 font-medium"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}