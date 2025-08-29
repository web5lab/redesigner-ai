import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  Users, 
  Plus, 
  Mail, 
  Crown, 
  Edit3, 
  Eye, 
  Trash2, 
  X,
  UserPlus,
  Shield,
  Settings,
  MoreVertical,
  Search,
  Filter,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Bot,
  ChevronDown,
  ChevronRight,
  Globe,
  MessageSquare
} from 'lucide-react'
import { botsSelector, activeBotSelector } from '../store/selectors'
import { CreateBotModal } from '../components/CreateBotModal'
import { GetBots } from '../store/actions'

export default function Teams() {
  const dispatch = useDispatch()
  const bots = useSelector(botsSelector)
  const activeBot = useSelector(activeBotSelector)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedBot, setSelectedBot] = useState(null)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('viewer')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [expandedBots, setExpandedBots] = useState(new Set())

  // Mock team data grouped by bot
  const [botTeams, setBotTeams] = useState({
    '1': [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        joinedAt: '2024-01-15',
        lastActive: '2 hours ago',
        status: 'online'
      },
      {
        id: 2,
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        role: 'editor',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        joinedAt: '2024-02-20',
        lastActive: '1 day ago',
        status: 'away'
      }
    ],
    '2': [
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@example.com',
        role: 'viewer',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        joinedAt: '2024-03-10',
        lastActive: '3 days ago',
        status: 'offline'
      },
      {
        id: 4,
        name: 'Emma Davis',
        email: 'emma@example.com',
        role: 'editor',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        joinedAt: '2024-03-15',
        lastActive: '5 minutes ago',
        status: 'online'
      }
    ]
  })

  useEffect(() => {
    dispatch(GetBots())
  }, [dispatch])

  const handleInviteMember = () => {
    if (inviteEmail.trim() && selectedBot) {
      const newMember = {
        id: Date.now(),
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: inviteRole,
        avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        joinedAt: new Date().toISOString().split('T')[0],
        lastActive: 'Just now',
        status: 'online'
      }
      
      setBotTeams(prev => ({
        ...prev,
        [selectedBot]: [...(prev[selectedBot] || []), newMember]
      }))
      
      setInviteEmail('')
      setInviteRole('viewer')
      setShowInviteModal(false)
      setSelectedBot(null)
    }
  }

  const handleRemoveMember = (botId, memberId) => {
    setBotTeams(prev => ({
      ...prev,
      [botId]: prev[botId]?.filter(member => member.id !== memberId) || []
    }))
  }

  const handleRoleChange = (botId, memberId, newRole) => {
    setBotTeams(prev => ({
      ...prev,
      [botId]: prev[botId]?.map(member => 
        member.id === memberId ? { ...member, role: newRole } : member
      ) || []
    }))
  }

  const toggleBotExpansion = (botId) => {
    setExpandedBots(prev => {
      const newSet = new Set(prev)
      if (newSet.has(botId)) {
        newSet.delete(botId)
      } else {
        newSet.add(botId)
      }
      return newSet
    })
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4 text-yellow-500" />
      case 'editor': return <Edit3 className="w-4 h-4 text-blue-500" />
      case 'viewer': return <Eye className="w-4 h-4 text-gray-500" />
      default: return null
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'editor': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'viewer': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getTotalMembers = () => {
    return Object.values(botTeams).reduce((total, members) => total + members.length, 0)
  }

  const getBotMembers = (botId) => {
    const members = botTeams[botId] || []
    return members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           member.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = filterRole === 'all' || member.role === filterRole
      return matchesSearch && matchesRole
    })
  }

  const selectedBotData = bots.find(bot => bot._id === selectedBot)

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Create Bot Modal */}
      {showCreateModal && (
        <CreateBotModal onClose={() => setShowCreateModal(false)} />
      )}

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 safe-area-top">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Management</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{getTotalMembers()} total members across {bots.length} bots</p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bot Teams List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-4">
          {bots.map((bot) => {
            const members = getBotMembers(bot._id)
            const isExpanded = expandedBots.has(bot._id)
            const totalBotMembers = botTeams[bot._id]?.length || 0
            
            return (
              <div
                key={bot._id}
                className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
              >
                {/* Bot Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleBotExpansion(bot._id)}
                      className="flex items-center gap-4 flex-1 text-left group"
                    >
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg ring-2 ring-gray-100 dark:ring-gray-700">
                          <img
                            src={bot.icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(bot.name)}&background=3b82f6&color=ffffff&size=56`}
                            alt={bot.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full flex items-center justify-center">
                          <Bot className="w-2 h-2 text-white" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {bot.name}
                          </h3>
                          <div className="flex items-center gap-1">
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {bot.description || 'AI Assistant for customer support'}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{totalBotMembers} members</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            <span>Active bot</span>
                          </div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedBot(bot._id)
                        setShowInviteModal(true)
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Invite</span>
                    </button>
                  </div>
                </div>

                {/* Bot Team Members */}
                {isExpanded && (
                  <div className="p-4">
                    {members.length > 0 ? (
                      <div className="space-y-3">
                        {members.map((member) => (
                          <div
                            key={member.id}
                            className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 border border-gray-100 dark:border-gray-600 hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex items-center gap-4">
                              {/* Avatar with Status */}
                              <div className="relative">
                                <img
                                  src={member.avatar}
                                  alt={member.name}
                                  className="w-12 h-12 rounded-xl object-cover shadow-md ring-2 ring-gray-100 dark:ring-gray-600"
                                />
                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} border-2 border-white dark:border-gray-700 rounded-full`}></div>
                              </div>

                              {/* Member Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-gray-900 dark:text-white truncate">{member.name}</h4>
                                  {getRoleIcon(member.role)}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{member.email}</p>
                                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>Active {member.lastActive}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span>Joined {new Date(member.joinedAt).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Role Badge */}
                              <div className={`px-3 py-1.5 rounded-xl text-xs font-medium ${getRoleColor(member.role)}`}>
                                <div className="flex items-center gap-1">
                                  {getRoleIcon(member.role)}
                                  <span className="capitalize">{member.role}</span>
                                </div>
                              </div>
                            </div>

                            {/* Member Actions */}
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                              <div className="flex items-center gap-2">
                                <select
                                  value={member.role}
                                  onChange={(e) => handleRoleChange(bot._id, member.id, e.target.value)}
                                  className="flex-1 px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="admin">Admin</option>
                                  <option value="editor">Editor</option>
                                  <option value="viewer">Viewer</option>
                                </select>
                                
                                {member.role !== 'admin' && (
                                  <button
                                    onClick={() => handleRemoveMember(bot._id, member.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No team members</h4>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                          This bot doesn't have any team members yet
                        </p>
                        <button
                          onClick={() => {
                            setSelectedBot(bot._id)
                            setShowInviteModal(true)
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                          Invite First Member
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}

          {/* Empty State for No Bots */}
          {bots.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Bot className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">No bots available</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Create your first bot to start managing team members
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

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
              </div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Invite Team Member</h3>
                    <p className="text-blue-100 text-sm">
                      {selectedBotData ? `Add member to ${selectedBotData.name}` : 'Add a new team member'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowInviteModal(false)
                    setSelectedBot(null)
                  }}
                  className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Bot Selection */}
              {!selectedBot && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Select Bot
                  </label>
                  <select
                    value={selectedBot || ''}
                    onChange={(e) => setSelectedBot(e.target.value)}
                    className="w-full px-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Choose a bot...</option>
                    {bots.map((bot) => (
                      <option key={bot._id} value={bot._id}>
                        {bot.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Selected Bot Display */}
              {selectedBot && selectedBotData && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedBotData.icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedBotData.name)}&background=3b82f6&color=ffffff&size=40`}
                      alt={selectedBotData.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-400">{selectedBotData.name}</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">Selected bot for invitation</p>
                    </div>
                    <button
                      onClick={() => setSelectedBot(null)}
                      className="ml-auto p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Role Description */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 capitalize flex items-center gap-2">
                  {getRoleIcon(inviteRole)}
                  {inviteRole} Permissions
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {inviteRole === 'admin' && 'Full access to bot settings, training, team management, and analytics'}
                  {inviteRole === 'editor' && 'Can modify bot configurations, training data, and view detailed analytics'}
                  {inviteRole === 'viewer' && 'Read-only access to conversations, basic analytics, and bot performance'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex gap-3">
              <button
                onClick={() => {
                  setShowInviteModal(false)
                  setSelectedBot(null)
                }}
                className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleInviteMember}
                disabled={!inviteEmail.trim() || !selectedBot}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mail className="w-4 h-4" />
                <span>Send Invite</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}