import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Users, 
  Plus, 
  Mail, 
  Edit3, 
  Eye, 
  Trash2, 
  X,
  UserPlus,
  Search,
  Bot,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { botsSelector, activeBotSelector } from '../store/global.Selctor';
import { CreateBotModal } from '../components/CreateBotModal';
import { GetBots } from '../store/global.Action';
import { setCurrentTeam, addTeamMember, updateTeamMemberInState, removeTeamMemberFromState } from '../store/global.Slice';
import { TeamMemberCard } from '../components/TeamMemberCard';
import { TeamInviteModal } from '../components/TeamInviteModal';

export function Teams() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bots = useSelector(botsSelector);
  const activeBot = useSelector(activeBotSelector);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBot, setSelectedBot] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedBots, setExpandedBots] = useState(new Set());
  const [isInviting, setIsInviting] = useState(false);

  // Mock team data
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
    ]
  });

  useEffect(() => {
    dispatch(GetBots());
    dispatch(getUserTeams());
  }, [dispatch]);

  const handleInviteMember = async (email, role) => {
    if (email.trim() && selectedBot) {
      setIsInviting(true);
      try {
        await inviteTeamMember({
          botId: selectedBot,
          email,
          role
        });
        
        // Refresh team data
        dispatch(getBotTeam({ botId: selectedBot }));
      } catch (error) {
        console.error('Error inviting member:', error);
        throw error;
      } finally {
        setIsInviting(false);
      }
    }
  };

  const handleRemoveMember = (botId, memberId) => {
    setBotTeams(prev => ({
      ...prev,
      [botId]: prev[botId]?.filter(member => member.id !== memberId) || []
    }));
  };

  const toggleBotExpansion = (botId) => {
    setExpandedBots(prev => {
      const newSet = new Set(prev);
      if (newSet.has(botId)) {
        newSet.delete(botId);
      } else {
        newSet.add(botId);
      }
      return newSet;
    });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getTotalMembers = () => {
    return Object.values(botTeams).reduce((total, members) => total + members.length, 0);
  };

  const getBotMembers = (botId) => {
    const members = botTeams[botId] || [];
    return members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           member.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  };

  const selectedBotData = bots.find(bot => bot._id === selectedBot);

  return (
    <div className="min-h-screen bg-white">
      {/* Create Bot Modal */}
      {showCreateModal && (
        <CreateBotModal onClose={() => setShowCreateModal(false)} />
      )}

      {/* Team Invite Modal */}
      <TeamInviteModal
        isOpen={showInviteModal}
        onClose={() => {
          setShowInviteModal(false);
          setSelectedBot(null);
        }}
        onInvite={handleInviteMember}
        botName={selectedBotData?.name || 'Bot'}
        isLoading={isInviting}
      />

      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
                <p className="text-gray-600">{getTotalMembers()} total members across {bots.length} bots</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>

        {/* Bot Teams List */}
        <div className="space-y-6">
          {bots.map((bot) => {
            const members = getBotMembers(bot._id);
            const isExpanded = expandedBots.has(bot._id);
            const totalBotMembers = botTeams[bot._id]?.length || 0;
            
            return (
              <div
                key={bot._id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                {/* Bot Header */}
                <div className="bg-gray-50 p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleBotExpansion(bot._id)}
                      className="flex items-center gap-4 flex-1 text-left group"
                    >
                      <div className="relative">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                          <img
                            src={bot.icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(bot.name)}&background=374151&color=ffffff&size=64`}
                            alt={bot.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                          <Bot className="w-2 h-2 text-white" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-gray-700 transition-colors">
                            {bot.name}
                          </h3>
                          <div className="flex items-center gap-1">
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">
                          {bot.description || 'AI Assistant for customer support'}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{totalBotMembers} members</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            <span>Active bot</span>
                          </div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedBot(bot._id);
                        setShowInviteModal(true);
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Invite Member</span>
                    </button>
                  </div>
                </div>

                {/* Bot Team Members */}
                {isExpanded && (
                  <div className="p-6">
                    {getBotTeam(bot._id)?.members?.length > 0 ? (
                      <div className="space-y-4">
                        {getBotTeam(bot._id).members.filter(member => {
                          const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                               member.email.toLowerCase().includes(searchQuery.toLowerCase());
                          return matchesSearch;
                        }).map((member) => (
                          <TeamMemberCard
                            key={member._id}
                            member={member}
                            onUpdateRole={(memberId, role) => handleUpdateMemberRole(bot._id, memberId, role)}
                            onRemove={(memberId) => handleRemoveMember(bot._id, memberId)}
                            canEdit={true}
                            isOwner={getBotTeam(bot._id)?.ownerId === member.userId}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4 border border-gray-200">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">No team members</h4>
                        <p className="text-gray-500 mb-6">
                          This bot doesn't have any team members yet
                        </p>
                        <button
                          onClick={() => {
                            setSelectedBot(bot._id);
                            setShowInviteModal(true);
                          }}
                          className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                        >
                          Invite First Member
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Empty State for No Bots */}
          {bots.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6 border border-gray-200">
                <Bot className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No bots available</h3>
              <p className="text-gray-500 mb-8">
                Create your first bot to start managing team members
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Create Your First Bot
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}