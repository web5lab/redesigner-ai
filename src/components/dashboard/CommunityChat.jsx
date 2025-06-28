import React, { useState, useEffect, useRef } from 'react';
import { Send, Smile, Paperclip, Image as ImageIcon, User, Clock, Search, X, Info, Settings, Bell, Users } from 'lucide-react';
import { useSelector } from 'react-redux';
import { UserSelector } from '../../store/global.Selctor';
import toast from 'react-hot-toast';

const CommunityChat = ({ mainContentAnimation, setShowBilling }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [activeChannel, setActiveChannel] = useState('general');
  const [showUserList, setShowUserList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);
  const user = useSelector(UserSelector);

  // Mock channels
  const channels = [
    { id: 'general', name: 'General', unread: 0, description: 'General discussion about web design and development' },
    { id: 'showcase', name: 'Design Showcase', unread: 2, description: 'Share your designs and get feedback from the community' },
    { id: 'help', name: 'Help & Support', unread: 0, description: 'Ask questions and get help with redesignr.ai' },
    { id: 'feedback', name: 'Feedback', unread: 0, description: 'Share your feedback and suggestions for improving redesignr.ai' },
    { id: 'jobs', name: 'Job Board', unread: 5, description: 'Find and post web design and development jobs' }
  ];

  // Mock online users
  const onlineUsers = [
    { id: 1, name: 'Sarah Chen', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'online', role: 'Designer' },
    { id: 2, name: 'Mike Rodriguez', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'online', role: 'Developer' },
    { id: 3, name: 'Emma Thompson', avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'away', role: 'Product Manager' },
    { id: 4, name: 'David Kim', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'offline', role: 'UX Designer' },
    { id: 5, name: 'Lisa Wang', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'online', role: 'Frontend Developer' },
    { id: 6, name: 'James Wilson', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'online', role: 'UI Designer' },
    { id: 7, name: 'Rachel Green', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'away', role: 'Content Strategist' },
    { id: 8, name: 'Alex Johnson', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'online', role: 'Full Stack Developer' }
  ];

  // Mock messages for each channel
  const channelMessages = {
    general: [
      { id: 1, sender: 'Sarah Chen', senderAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', content: 'Hey everyone! Has anyone tried the new AI template feature?', timestamp: '2025-01-15T10:30:00', reactions: [{ emoji: '👍', count: 3 }] },
      { id: 2, sender: 'Mike Rodriguez', senderAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', content: 'Yes! It\'s amazing. I created a landing page in minutes.', timestamp: '2025-01-15T10:32:00', reactions: [{ emoji: '🔥', count: 2 }] },
      { id: 3, sender: 'Emma Thompson', senderAvatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', content: 'I\'m working on a new portfolio site using the minimalist template. Will share once it\'s done!', timestamp: '2025-01-15T10:35:00', reactions: [{ emoji: '👀', count: 1 }] },
      { id: 4, sender: 'David Kim', senderAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', content: 'Has anyone found a good way to customize the navigation on mobile? I\'m trying to make it more compact.', timestamp: '2025-01-15T10:40:00', reactions: [] },
      { id: 5, sender: 'Lisa Wang', senderAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', content: 'David, I used the custom CSS panel to adjust the mobile nav. You can add media queries there.', timestamp: '2025-01-15T10:42:00', reactions: [{ emoji: '🙏', count: 2 }] },
      { id: 6, sender: 'James Wilson', senderAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', content: 'Just joined the community! Looking forward to connecting with fellow designers.', timestamp: '2025-01-15T10:45:00', reactions: [{ emoji: '👋', count: 4 }] }
    ],
    showcase: [
      { id: 1, sender: 'Emma Thompson', senderAvatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', content: 'Just finished this e-commerce site redesign! What do you think?', timestamp: '2025-01-15T09:30:00', reactions: [{ emoji: '❤️', count: 5 }], attachment: { type: 'image', url: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' } },
      { id: 2, sender: 'Sarah Chen', senderAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', content: 'Love the clean layout and color scheme! The product cards look great.', timestamp: '2025-01-15T09:35:00', reactions: [] },
      { id: 3, sender: 'James Wilson', senderAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', content: 'Here\'s my portfolio site created with redesignr.ai and some custom tweaks', timestamp: '2025-01-15T10:15:00', reactions: [{ emoji: '👏', count: 3 }], attachment: { type: 'image', url: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' } }
    ],
    help: [
      { id: 1, sender: 'David Kim', senderAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', content: 'How do I export my design as a React component?', timestamp: '2025-01-15T11:20:00', reactions: [] },
      { id: 2, sender: 'Lisa Wang', senderAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', content: 'Go to the export panel and select "React" from the dropdown. You can choose between functional or class components.', timestamp: '2025-01-15T11:22:00', reactions: [{ emoji: '👍', count: 1 }] },
      { id: 3, sender: 'Mike Rodriguez', senderAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', content: 'Also, make sure you\'re on the Developer plan or higher to access the React export feature.', timestamp: '2025-01-15T11:25:00', reactions: [{ emoji: '💯', count: 2 }] }
    ],
    feedback: [
      { id: 1, sender: 'Rachel Green', senderAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', content: 'I love the new template gallery! It would be great if we could filter by industry.', timestamp: '2025-01-15T14:10:00', reactions: [{ emoji: '👍', count: 6 }] },
      { id: 2, sender: 'Alex Johnson', senderAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', content: 'Agreed! Also, it would be helpful to have more e-commerce specific components.', timestamp: '2025-01-15T14:15:00', reactions: [{ emoji: '💡', count: 3 }] }
    ],
    jobs: [
      { id: 1, sender: 'Emma Thompson', senderAvatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', content: 'My company is looking for a UI/UX designer with experience in AI tools. Remote position, competitive salary. DM me if interested!', timestamp: '2025-01-15T15:30:00', reactions: [{ emoji: '👀', count: 8 }] },
      { id: 2, sender: 'Mike Rodriguez', senderAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', content: 'I\'m available for freelance web development projects. Specializing in React and Next.js. Check out my portfolio: portfolio.example.com', timestamp: '2025-01-15T16:05:00', reactions: [{ emoji: '👍', count: 2 }] }
    ]
  };

  useEffect(() => {
    // Set initial messages based on active channel
    setMessages(channelMessages[activeChannel] || []);
  }, [activeChannel]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    const currentPlan = user?.currentPlan || 'Free';
    if (currentPlan === 'Free' || currentPlan === 'free') {
      toast.error("Messaging is available on paid plans. Please upgrade to participate in the community chat.");
      setShowBilling(true);
      return;
    }

    const newMessage = {
      id: Date.now(),
      sender: user?.name || 'You',
      senderAvatar: user?.profilePicture || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      content: messageInput,
      timestamp: new Date().toISOString(),
      reactions: []
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const filteredUsers = onlineUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDate(message.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className={`${mainContentAnimation} h-full flex flex-col`} style={{ animationDelay: '0.5s' }}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Community Chat</h2>
          <div className="text-sm text-slate-400">
            Your plan: <span className="text-indigo-400 font-medium">{user?.currentPlan || 'Free'}</span>
          </div>
        </div>
        <p className="text-slate-400 text-sm">
          Connect with other users, share ideas, and get help from the community.
        </p>
      </div>

      <div className="flex-grow flex overflow-hidden bg-slate-800/30 rounded-xl border border-slate-700/50">
        {/* Channels Sidebar */}
        <div className="w-64 border-r border-slate-700/50 flex flex-col">
          <div className="p-4 border-b border-slate-700/50">
            <h3 className="text-white font-medium mb-2">Channels</h3>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search channels"
                className="w-full pl-8 pr-2 py-1.5 bg-slate-700/50 border border-slate-600 rounded-md text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-grow">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full text-left px-4 py-2 flex items-center justify-between ${
                  activeChannel === channel.id
                    ? 'bg-indigo-500/20 border-l-2 border-indigo-500'
                    : 'hover:bg-slate-700/30'
                }`}
              >
                <span className={`${activeChannel === channel.id ? 'text-indigo-400' : 'text-slate-300'}`}>
                  # {channel.name}
                </span>
                {channel.unread > 0 && (
                  <span className="bg-indigo-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
          
          <div className="p-4 border-t border-slate-700/50">
            <button
              onClick={() => setShowUserList(!showUserList)}
              className="flex items-center justify-between w-full text-slate-300 hover:text-white"
            >
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>Online Users</span>
              </div>
              <span className="bg-green-500 text-xs px-1.5 py-0.5 rounded-full">
                {onlineUsers.filter(u => u.status === 'online').length}
              </span>
            </button>
          </div>
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-grow flex flex-col">
          {/* Channel Header */}
          <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium flex items-center">
                # {channels.find(c => c.id === activeChannel)?.name || 'Channel'}
              </h3>
              <p className="text-slate-400 text-xs">
                {channels.find(c => c.id === activeChannel)?.description || 'Channel description'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-slate-400 hover:text-white">
                <Bell className="h-5 w-5" />
              </button>
              <button className="text-slate-400 hover:text-white">
                <Info className="h-5 w-5" />
              </button>
              <button className="text-slate-400 hover:text-white">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-6">
            {Object.entries(groupedMessages).map(([date, dateMessages]) => (
              <div key={date}>
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-slate-700/50 text-slate-400 text-xs px-2 py-1 rounded-full">
                    {date}
                  </div>
                </div>
                <div className="space-y-4">
                  {dateMessages.map((message) => (
                    <div key={message.id} className="flex items-start gap-3">
                      <img
                        src={message.senderAvatar}
                        alt={message.sender}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white">{message.sender}</span>
                          <span className="text-slate-400 text-xs">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                        <div className="text-slate-300">
                          {message.content}
                          {message.attachment && (
                            <div className="mt-2">
                              {message.attachment.type === 'image' && (
                                <img
                                  src={message.attachment.url}
                                  alt="Attachment"
                                  className="max-w-xs rounded-lg border border-slate-600"
                                />
                              )}
                            </div>
                          )}
                        </div>
                        {message.reactions.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {message.reactions.map((reaction, index) => (
                              <div
                                key={index}
                                className="bg-slate-700/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
                              >
                                <span>{reaction.emoji}</span>
                                <span>{reaction.count}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="flex-grow relative">
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message #${channels.find(c => c.id === activeChannel)?.name || 'channel'}`}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  rows="2"
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  <button className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-600/50">
                    <Smile className="h-5 w-5" />
                  </button>
                  <button className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-600/50">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <button className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-600/50">
                    <ImageIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Users Sidebar (conditionally rendered) */}
        {showUserList && (
          <div className="w-64 border-l border-slate-700/50 flex flex-col">
            <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
              <h3 className="text-white font-medium">Users</h3>
              <button
                onClick={() => setShowUserList(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 border-b border-slate-700/50">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search users"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 bg-slate-700/50 border border-slate-600 rounded-md text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div className="overflow-y-auto flex-grow p-2">
              <div className="mb-4">
                <h4 className="text-xs font-medium text-slate-400 uppercase px-2 mb-2">Online — {onlineUsers.filter(u => u.status === 'online').length}</h4>
                {filteredUsers
                  .filter(u => u.status === 'online')
                  .map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-slate-700/30 cursor-pointer"
                    >
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-800"></div>
                      </div>
                      <div>
                        <p className="text-white text-sm">{user.name}</p>
                        <p className="text-slate-400 text-xs">{user.role}</p>
                      </div>
                    </div>
                  ))}
              </div>
              
              <div className="mb-4">
                <h4 className="text-xs font-medium text-slate-400 uppercase px-2 mb-2">Away — {onlineUsers.filter(u => u.status === 'away').length}</h4>
                {filteredUsers
                  .filter(u => u.status === 'away')
                  .map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-slate-700/30 cursor-pointer"
                    >
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-yellow-500 rounded-full border-2 border-slate-800"></div>
                      </div>
                      <div>
                        <p className="text-white text-sm">{user.name}</p>
                        <p className="text-slate-400 text-xs">{user.role}</p>
                      </div>
                    </div>
                  ))}
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-slate-400 uppercase px-2 mb-2">Offline — {onlineUsers.filter(u => u.status === 'offline').length}</h4>
                {filteredUsers
                  .filter(u => u.status === 'offline')
                  .map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-slate-700/30 cursor-pointer"
                    >
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover opacity-70"
                        />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-slate-500 rounded-full border-2 border-slate-800"></div>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">{user.name}</p>
                        <p className="text-slate-500 text-xs">{user.role}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Plan upgrade prompt for free users */}
      {(!user?.currentPlan || user.currentPlan.toLowerCase() === 'free') && (
        <div className="mt-8 p-6 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-700/30 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-2">Unlock Community Chat</h3>
          <p className="text-indigo-200 mb-4">
            Upgrade your plan to actively participate in community discussions. Connect with other designers, share ideas, and get real-time feedback on your projects.
          </p>
          <button
            onClick={() => setShowBilling(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all"
          >
            View Plans
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunityChat;