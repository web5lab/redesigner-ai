import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Activity,
  MoreHorizontal,
  Filter,
  ArrowUpDown,
  Trash2,
  Edit,
  Settings,
  Sparkles,
  Zap,
  Crown,
  TrendingUp,
  Users,
  MessageSquare,
  Calendar,
  Share2,
  Copy,
  Link,
  Code,
  X,
  Check,
  Globe,
  CodeSquare
} from 'lucide-react';
import { useBot } from '../contexts/BotContext';
import { CreateBotModal } from '../components/CreateBotModal';
import { botsSelector } from '../store/global.Selctor';
import { useSelector, useDispatch } from 'react-redux';
import { setBotsActive } from '../store/global.Slice';
import logo from '../assets/logo.png';
import { DeleteChatBot, GetBots } from '../store/global.Action';

// Simple dropdown component implementation
const SimpleDropdown = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 backdrop-blur-sm">
          <div className="py-2">
            {children(setIsOpen)}
          </div>
        </div>
      )}
    </div>
  );
};

// Sharing Modal Component
const SharingModal = ({ bot, onClose }) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedTab, setSelectedTab] = useState('url');

  // Generate dummy sharing URL
  const shareUrl = `${import.meta.env.VITE_WEB_URL}/chat?id=${bot._id}`;

  // Generate embed code
  const embedCode = `<!-- AI Chatbot Integration -->
<script>
  window.ChatBotConfig = {
    botId: "${bot.id}",
    botName: "${bot.name}",
    theme: "modern",
    position: "bottom-right",
    primaryColor: "#3b82f6"
  };
</script>
<script src="https://cdn.yoursite.com/chatbot-widget.js"></script>`;

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'url') {
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
      } else {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg">
              <img
                src={bot.icon}
                alt={bot.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(bot.name)}&background=3b82f6&color=ffffff&size=48`;
                }}
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Share {bot.name}</h2>
              <p className="text-sm text-gray-500">Make your AI assistant accessible to others</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setSelectedTab('url')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${selectedTab === 'url'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Globe className="w-4 h-4" />
              Share URL
            </div>
          </button>
          <button
            onClick={() => setSelectedTab('embed')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${selectedTab === 'embed'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Code className="w-4 h-4" />
              Embed Code
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {selectedTab === 'url' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Public Chat URL
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm text-gray-700 pr-12"
                    />
                    <Link className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <button
                    onClick={() => copyToClipboard(shareUrl, 'url')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${copiedUrl
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      {copiedUrl ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedUrl ? 'Copied!' : 'Copy'}
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  How it works
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Anyone with this URL can chat with your AI assistant</li>
                  <li>• The bot will use your configured settings and personality</li>
                  <li>• You can revoke access anytime from the settings</li>
                  <li>• All conversations are logged in your dashboard</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="text-sm text-gray-600">Shared Sessions</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">247</div>
                  <div className="text-sm text-gray-600">Public Messages</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HTML Embed Code
                </label>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs font-mono overflow-x-auto max-h-48 overflow-y-auto">
                    {embedCode}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(embedCode, 'code')}
                    className={`absolute top-3 right-3 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${copiedCode
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedCode ? 'Copied!' : 'Copy'}
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-medium text-orange-900 mb-2 flex items-center gap-2">
                  <CodeSquare className="w-4 h-4" />
                  Integration Instructions
                </h3>
                <ol className="space-y-2 text-sm text-orange-800 list-decimal list-inside">
                  <li>Copy the embed code above</li>
                  <li>Paste it before the closing &lt;/body&gt; tag in your HTML</li>
                  <li>The chatbot widget will appear on your website</li>
                  <li>Customize colors and position in the config object</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Need help? <a href="#" className="text-blue-600 hover:underline">View documentation</a>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export function Bots() {
  const navigate = useNavigate();
  const { setSelectedBot } = useBot();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSharingModal, setShowSharingModal] = useState(false);
  const [selectedBotForSharing, setSelectedBotForSharing] = useState(null);
  const [sortBy, setSortBy] = useState('name'); // 'name', 'status', 'date'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'inactive'
  const botsData = useSelector(botsSelector);
  const dispatch = useDispatch();

  const handleBotSelect = (bot) => {
    if (bot) {
      setSelectedBot(bot);
      dispatch(setBotsActive(bot));
    }
    navigate(`/dashboard?bot=${bot.name}`);
  };

  const handleBotEdit = (e, bot) => {
    e.stopPropagation();
    dispatch(setBotsActive(bot))
    navigate('/preview')
  };

  const handleBotDelete = async (e, botId) => {
    e.stopPropagation();
    await DeleteChatBot({ chatBotId: botId });
    dispatch(GetBots());
    console.log('Delete bot:', botId);
  };



  const handleBotShare = (e, bot) => {
    e.stopPropagation();
    setSelectedBotForSharing(bot);
    setShowSharingModal(true);
  };

  const filteredBots = useMemo(() => {
    return botsData
      .filter(bot => {
        const matchesSearch = bot.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || bot.status === filterStatus;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortBy === 'status') {
          return a.status === 'active' ? -1 : 1;
        } else if (sortBy === 'date') {
          return new Date(b.lastActive) - new Date(a.lastActive);
        }
        return 0;
      });
  }, [botsData, searchQuery, filterStatus, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Background Pattern - Fixed z-index and positioning */}
      <div className="fixed inset-0 opacity-30 pointer-events-none -z-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-8 space-y-8 z-10">
        {showCreateModal && (
          <CreateBotModal onClose={() => setShowCreateModal(false)} />
        )}

        {showSharingModal && selectedBotForSharing && (
          <SharingModal
            bot={selectedBotForSharing}
            onClose={() => {
              setShowSharingModal(false);
              setSelectedBotForSharing(null);
            }}
          />
        )}

        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <img src={logo} className="w-10 h-10" alt="Logo" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Crown className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                My AI Assistants
              </h1>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <span>{botsData.length} bots available</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="text-green-600 font-medium">All systems operational</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <Plus className="w-5 h-5 relative z-10" />
            <span className="font-semibold relative z-10">Create New Bot</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Bots', value: botsData.length, icon: MessageSquare, gradient: 'from-blue-500 to-cyan-500', change: '+12%' },
            { label: 'Active Bots', value: botsData.filter(b => b.status === 'active').length, icon: Activity, gradient: 'from-green-500 to-emerald-500', change: '+8%' },
            { label: 'Total Conversations', value: '2.4k', icon: Users, gradient: 'from-purple-500 to-pink-500', change: '+23%' },
            { label: 'This Month', value: '847', icon: TrendingUp, gradient: 'from-orange-500 to-red-500', change: '+15%' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Controls Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your AI assistants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="flex gap-3">
                <SimpleDropdown
                  trigger={
                    <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700 font-medium">
                        {filterStatus === 'all' ? 'All Status' :
                          filterStatus === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </button>
                  }
                >
                  {(close) => (
                    <>
                      <button
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                        onClick={() => {
                          setFilterStatus('all');
                          close();
                        }}
                      >
                        All Status
                      </button>
                      <button
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                        onClick={() => {
                          setFilterStatus('active');
                          close();
                        }}
                      >
                        Active
                      </button>
                      <button
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                        onClick={() => {
                          setFilterStatus('inactive');
                          close();
                        }}
                      >
                        Inactive
                      </button>
                    </>
                  )}
                </SimpleDropdown>

                <SimpleDropdown
                  trigger={
                    <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors">
                      <ArrowUpDown className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700 font-medium">
                        Sort by: {sortBy === 'name' ? 'Name' :
                          sortBy === 'status' ? 'Status' : 'Last Active'}
                      </span>
                    </button>
                  }
                >
                  {(close) => (
                    <>
                      <button
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                        onClick={() => {
                          setSortBy('name');
                          close();
                        }}
                      >
                        Name
                      </button>
                      <button
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                        onClick={() => {
                          setSortBy('status');
                          close();
                        }}
                      >
                        Status
                      </button>
                      <button
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                        onClick={() => {
                          setSortBy('date');
                          close();
                        }}
                      >
                        Last Active
                      </button>
                    </>
                  )}
                </SimpleDropdown>
              </div>
            </div>
          </div>

          {/* Bots Grid */}
          <div className="p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Create New Bot Card */}
              <div
                onClick={() => setShowCreateModal(true)}
                className="group relative rounded-2xl border-2 border-dashed border-blue-200 p-8 flex flex-col items-center justify-center gap-4 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer min-h-[240px] bg-gradient-to-br from-blue-50/50 to-indigo-50/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <div className="text-center relative">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Create New Assistant</h3>
                  <p className="text-sm text-gray-600">
                    Build a custom AI assistant for your needs
                  </p>
                </div>
              </div>

              {/* Bot Cards */}
              {filteredBots.map((bot) => (
                <div
                  key={bot.id}
                  className="group relative rounded-2xl bg-blue-50 backdrop-blur-sm border border-white/50 hover:border-blue-200 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                  onClick={() => handleBotSelect(bot)}
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {/* Menu Button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <SimpleDropdown
                      trigger={
                        <button className="p-2 rounded-lg bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-md">
                          <MoreHorizontal className="w-4 h-4 text-gray-500" />
                        </button>
                      }
                    >
                      {(close) => (
                        <>
                          <button
                            className="flex items-center w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                            onClick={(e) => {
                              handleBotShare(e, bot);
                              close();
                            }}
                          >
                            <Share2 className="w-4 h-4 mr-3" />
                            Share
                          </button>
                          <button
                            className="flex items-center w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                            onClick={(e) => {
                              handleBotEdit(e, bot);
                              close();
                            }}
                          >
                            <Edit className="w-4 h-4 mr-3" />
                            Edit
                          </button>
                          <button
                            className="flex items-center w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(setBotsActive(bot));
                              navigate(`/bot-settings`);
                              close();
                            }}
                          >
                            <Settings className="w-4 h-4 mr-3" />
                            Settings
                          </button>
                          <div className="border-t border-gray-100 my-2 mx-2"></div>
                          <button
                            className="flex items-center w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors rounded-lg mx-2"
                            onClick={(e) => {
                              handleBotDelete(e, bot._id);
                              close();
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-3" />
                            Delete
                          </button>
                        </>
                      )}
                    </SimpleDropdown>
                  </div>

                  {/* Share Button - Always visible */}


                  <div className="relative p-6 h-full flex flex-col">
                    {/* Bot Avatar and Info */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl  flex items-center justify-center overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                          <img
                            src={bot.icon}
                            alt={bot.name}
                            className="w-full h-full "
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(bot.name)}&background=3b82f6&color=ffffff&size=64`;
                            }}
                          />
                        </div>
                        {bot.status === 'active' && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full">
                            <div className="w-full h-full bg-green-500 rounded-full animate-ping"></div>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {bot.name || 'Untitled Assistant'}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {bot.description || 'No description provided.'}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-gray-900">1.2k</div>
                        <div className="text-xs text-gray-500">Conversations</div>
                      </div>
                    </div>

                    {/* Footer */}

                    <button
                      onClick={(e) => handleBotShare(e, bot)}
                      className="p-2 flex justify-center gap-4 items-center rounded-lg w-full bg-blue-100/80 backdrop-blur-sm hover:bg-white transition-colors shadow-md hover:shadow-lg group/share"
                      title="Share this bot"
                    >
                      <Share2 className="w-4 h-4 text-blue-500 group-hover/share:text-blue-600" />
                      <span>Share</span>
                    </button>

                  </div>

                </div>
              ))}
            </div>

            {filteredBots.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bots found</h3>
                <p className="text-gray-500 mb-4">No bots found matching "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}