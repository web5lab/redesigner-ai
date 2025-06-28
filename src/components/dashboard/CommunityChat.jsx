import React, { useState, useEffect, useRef } from 'react';
import { Send, Image, Smile, User, Clock, Share2, Heart, MessageSquare, X, Info, AlertTriangle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { UserSelector } from '../../store/global.Selctor';
import toast from 'react-hot-toast';

const CommunityChat = ({ mainContentAnimation }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const [sharedDesigns, setSharedDesigns] = useState([]);
  const messagesEndRef = useRef(null);
  const user = useSelector(UserSelector);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate loading messages
    setTimeout(() => {
      setMessages([
        {
          id: 1,
          user: {
            name: 'Alex Johnson',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          text: 'Just finished a new portfolio site using the Dark Elegance template. The AI made it so easy!',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          likes: 5
        },
        {
          id: 2,
          user: {
            name: 'Maria Garcia',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          text: 'Has anyone tried the new image-to-code feature? I\'m getting amazing results with it!',
          timestamp: new Date(Date.now() - 2700000).toISOString(),
          likes: 3
        },
        {
          id: 3,
          user: {
            name: 'David Kim',
            avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          text: 'Quick question - what\'s the best template for a SaaS landing page? Need something modern and conversion-focused.',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          likes: 2
        },
        {
          id: 4,
          user: {
            name: 'Sarah Wilson',
            avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          text: 'Just shared my latest e-commerce redesign in the gallery. Would love some feedback!',
          timestamp: new Date(Date.now() - 900000).toISOString(),
          likes: 7,
          hasSharedDesign: true
        }
      ]);
      
      setSharedDesigns([
        {
          id: 1,
          title: 'Modern E-commerce Redesign',
          preview: 'https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          user: {
            name: 'Sarah Wilson',
            avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          timestamp: new Date(Date.now() - 900000).toISOString(),
          likes: 12,
          comments: 4
        },
        {
          id: 2,
          title: 'Tech Blog Template',
          preview: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          user: {
            name: 'Alex Johnson',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          likes: 8,
          comments: 2
        },
        {
          id: 3,
          title: 'Portfolio for Photographers',
          preview: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          user: {
            name: 'Michael Chen',
            avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          likes: 15,
          comments: 6
        }
      ]);
      
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Add new message
    const newMsg = {
      id: messages.length + 1,
      user: {
        name: user?.name || 'You',
        avatar: user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random&color=fff`
      },
      text: newMessage,
      timestamp: new Date().toISOString(),
      likes: 0
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleLikeMessage = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
    ));
  };

  const handleLikeDesign = (id) => {
    setSharedDesigns(designs => 
      designs.map(design => 
        design.id === id ? { ...design, likes: design.likes + 1 } : design
      )
    );
  };

  const handleShareDesign = () => {
    // In a real implementation, this would open a modal to select a design to share
    toast.success("This feature will allow you to share your designs with the community!");
  };

  return (
    <div className={`${mainContentAnimation}`} style={{ animationDelay: '0.5s' }}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Community</h2>
          <div className="text-sm text-slate-400">
            <span className="text-green-400">●</span> 42 users online
          </div>
        </div>
        <p className="text-slate-400 text-sm">
          Connect with other designers, share your creations, and get inspired by the community.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700 mb-6">
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'chat' 
              ? 'border-indigo-500 text-indigo-400' 
              : 'border-transparent text-slate-400 hover:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Community Chat
          </div>
        </button>
        <button
          onClick={() => setActiveTab('designs')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'designs' 
              ? 'border-indigo-500 text-indigo-400' 
              : 'border-transparent text-slate-400 hover:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Shared Designs
          </div>
        </button>
      </div>

      {/* Community Guidelines Notice */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-white font-medium mb-1">Community Guidelines</h3>
            <p className="text-slate-300 text-sm">
              Please be respectful and supportive. Share constructive feedback and help others improve their designs.
              <button className="text-indigo-400 hover:text-indigo-300 ml-1 text-sm">
                Read full guidelines
              </button>
            </p>
          </div>
        </div>
      </div>

      {activeTab === 'chat' ? (
        <>
          {/* Chat Messages */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg mb-4">
            <div className="h-[400px] overflow-y-auto p-4 custom-scrollbar">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="text-slate-400">Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MessageSquare className="h-12 w-12 text-slate-600 mb-3" />
                  <h3 className="text-slate-400 font-medium mb-1">No messages yet</h3>
                  <p className="text-slate-500 text-sm">Be the first to start the conversation!</p>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <div key={message.id} className="mb-4 last:mb-0">
                      <div className="flex items-start gap-3">
                        <img 
                          src={message.user.avatar} 
                          alt={message.user.name} 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-white">{message.user.name}</span>
                            <span className="text-xs text-slate-500">
                              <Clock className="inline h-3 w-3 mr-1" />
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                          <div className="bg-slate-700/50 rounded-lg p-3 text-slate-300">
                            <p>{message.text}</p>
                            {message.hasSharedDesign && (
                              <div className="mt-2 p-2 bg-slate-800/50 rounded border border-slate-600/50 text-xs text-indigo-300">
                                <Share2 className="inline h-3 w-3 mr-1" />
                                Shared a design in the gallery
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs">
                            <button 
                              onClick={() => handleLikeMessage(message.id)}
                              className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
                            >
                              <Heart className="h-3 w-3" />
                              {message.likes > 0 && message.likes}
                            </button>
                            <button className="text-slate-400 hover:text-indigo-400 transition-colors">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>
            
            {/* Message Input */}
            <div className="border-t border-slate-700/50 p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleShareDesign}
                  className="p-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300 hover:text-indigo-400 hover:border-indigo-500/50 transition-colors"
                  title="Share a design"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
          
          <div className="text-xs text-slate-500 text-center">
            Messages are public and visible to all community members.
          </div>
        </>
      ) : (
        <>
          {/* Shared Designs Gallery */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Community Designs</h3>
              <button 
                onClick={handleShareDesign}
                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Share Your Design
              </button>
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : sharedDesigns.length === 0 ? (
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-8 text-center">
                <Image className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-slate-400 font-medium mb-1">No designs shared yet</h3>
                <p className="text-slate-500 text-sm mb-4">Be the first to share your design with the community!</p>
                <button 
                  onClick={handleShareDesign}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm transition-colors"
                >
                  Share a Design
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sharedDesigns.map((design) => (
                  <div 
                    key={design.id} 
                    className="bg-slate-800/30 border border-slate-700/50 rounded-lg overflow-hidden group hover:border-indigo-500/50 transition-all duration-300"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={design.preview} 
                        alt={design.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm transition-colors">
                            View Design
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-white mb-2 group-hover:text-indigo-300 transition-colors">
                        {design.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img 
                            src={design.user.avatar} 
                            alt={design.user.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-sm text-slate-400">{design.user.name}</span>
                        </div>
                        <span className="text-xs text-slate-500">
                          {formatTime(design.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-700/30">
                        <button 
                          onClick={() => handleLikeDesign(design.id)}
                          className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors text-sm"
                        >
                          <Heart className="h-4 w-4" />
                          {design.likes}
                        </button>
                        <div className="flex items-center gap-1 text-slate-400 text-sm">
                          <MessageSquare className="h-4 w-4" />
                          {design.comments}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Premium Plan Upgrade Notice */}
      {(!user?.currentPlan || user.currentPlan.toLowerCase() === 'free') && (
        <div className="mt-8 p-6 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-700/30 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Unlock Full Community Features</h3>
              <p className="text-indigo-200 mb-4">
                Upgrade to a premium plan to share unlimited designs, create private design collections, and get priority community support.
              </p>
              <button
                onClick={() => {}} // This would open billing modal in a real implementation
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all"
              >
                View Plans
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityChat;