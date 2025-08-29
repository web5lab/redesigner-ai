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
  Activity,
  Users,
  UserPlus,
  Mail,
  Shield,
  X
} from 'lucide-react'
import { botsSelector } from '../store/selectors'
import { setActiveBot } from '../store/slice'
export function Bots() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const bots = useSelector(botsSelector)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [selectedBotForTeam, setSelectedBotForTeam] = useState(null)
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=ffffff&size=40' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Editor', avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=10b981&color=ffffff&size=40' }
  ])
  const [newMemberEmail, setNewMemberEmail] = useState('')
  const [newMemberRole, setNewMemberRole] = useState('Editor')

  const handleBotSelect = (bot) => {
    dispatch(setActiveBot(bot))
    navigate('/chat')
  }

  const handleTeamManagement = (e, bot) => {
    e.stopPropagation()
    setSelectedBotForTeam(bot)
    setShowTeamModal(true)
  }

  const addTeamMember = () => {
    if (!newMemberEmail.trim()) return
    
    const newMember = {
      id: Date.now(),
      name: newMemberEmail.split('@')[0],
      email: newMemberEmail,
      role: newMemberRole,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newMemberEmail.split('@')[0])}&background=6366f1&color=ffffff&size=40`
    }
    
    setTeamMembers(prev => [...prev, newMember])
    setNewMemberEmail('')
    setNewMemberRole('Editor')
  }

  const removeMember = (memberId) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId))
  }

  const updateMemberRole = (memberId, newRole) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    ))
  }

  const filteredBots = bots.filter(bot =>
    bot.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Team Management Modal */}
      {showTeamModal && selectedBotForTeam && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={selectedBotForTeam.icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedBotForTeam.name)}&background=3b82f6&color=ffffff&size=48`}
                    alt={selectedBotForTeam.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Team Management</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedBotForTeam.name}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowTeamModal(false)
                  setSelectedBotForTeam(null)
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Add Member Section */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-blue-600" />
                  Add Team Member
                </h3>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                  <button
                    onClick={addTeamMember}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleTeamManagement(e, bot)
                    }}
                    disabled={!newMemberEmail.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Team Members List */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Team Members ({teamMembers.length})
                </h3>
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-10 h-10 rounded-full shadow-md"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{member.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <select
                          value={member.role}
                          onChange={(e) => updateMemberRole(member.id, e.target.value)}
                          className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Viewer">Viewer</option>
                          <option value="Editor">Editor</option>
                          <option value="Admin">Admin</option>
                        </select>
                        <button
                          onClick={() => removeMember(member.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Role Permissions Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4">
                <h4 className="font-medium text-blue-900 dark:text-blue-400 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Role Permissions
                </h4>
                <div className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                  <div><strong>Admin:</strong> Full access to bot settings, training, and team management</div>
                  <div><strong>Editor:</strong> Can modify bot responses and training data</div>
                  <div><strong>Viewer:</strong> Can view conversations and analytics only</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => {
                  setShowTeamModal(false)
                  setSelectedBotForTeam(null)
                }}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 safe-area-top">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Assistants</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{bots.length} bots available</p>
            </div>
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
                    <Users className="w-4 h-4" />
                    Team
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl transition-colors text-sm font-medium text-blue-700 dark:text-blue-400">
                    <MessageSquare className="w-4 h-4" />
                    Chat Now
                  </button>
                </div>
              </div>
            </div>
          ))}

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