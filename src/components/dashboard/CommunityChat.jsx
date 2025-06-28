import React, { useState, useEffect, useRef } from 'react';
import { Send, Image, User, Clock, Share2, Heart, MessageSquare, Info, AlertTriangle, ThumbsUp, Reply, X, MoreHorizontal, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { useSelector } from 'react-redux';
import { UserSelector } from '../../store/global.Selctor';
import toast from 'react-hot-toast';

const CommunityChat = ({ mainContentAnimation }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showUserProfile, setShowUserProfile] = useState(null);
  const messagesEndRef = useRef(null);
  const user = useSelector(UserSelector);
  const [replyingTo, setReplyingTo] = useState(null);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate loading messages
    setTimeout(() => {
      setMessages([
        {
          id: 1,
          user: {
            name: 'Alex Johnson',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            role: 'Web Designer',
            joined: 'January 2024'
          },
          text: 'Just finished a new portfolio site using the Dark Elegance template. The AI made it so easy!',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          likes: 5,
          hasSharedDesign: true,
          design: {
            id: 101,
            title: 'Dark Elegance Portfolio',
            preview: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          }
        },
        {
          id: 2,
          user: {
            name: 'Maria Garcia',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            role: 'UX Designer',
            joined: 'March 2024'
          },
          text: 'Has anyone tried the new image-to-code feature? I\'m getting amazing results with it!',
          timestamp: new Date(Date.now() - 2700000).toISOString(),
          likes: 3
        },
        {
          id: 3,
          user: {
            name: 'David Kim',
            avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            role: 'Frontend Developer',
            joined: 'December 2023'
          },
          text: 'Quick question - what\'s the best template for a SaaS landing page? Need something modern and conversion-focused.',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          likes: 2
        },
        {
          id: 4,
          user: {
            name: 'Sarah Wilson',
            avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            role: 'Marketing Specialist',
            joined: 'February 2024'
          },
          text: 'Just redesigned my e-commerce site and the conversion rate has already improved by 25%! Here\'s a preview:',
          timestamp: new Date(Date.now() - 900000).toISOString(),
          likes: 7,
          hasSharedDesign: true,
          design: {
            id: 102,
            title: 'Modern E-commerce Redesign',
            preview: 'https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          }
        },
        {
          id: 5,
          user: {
            name: 'James Wilson',
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            role: 'Product Manager',
            joined: 'April 2024'
          },
          text: 'I\'m looking for feedback on my new SaaS dashboard design. Any suggestions for improvement?',
          timestamp: new Date(Date.now() - 600000).toISOString(),
          likes: 1,
          hasSharedDesign: true,
          design: {
            id: 103,
            title: 'SaaS Dashboard',
            preview: 'https://images.pexels.com/photos/5926393/pexels-photo-5926393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          }
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
        avatar: user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random&color=fff`,
        role: 'Community Member',
        joined: 'Just now'
      },
      text: replyingTo ? `@${replyingTo.user.name} ${newMessage}` : newMessage,
      timestamp: new Date().toISOString(),
      likes: 0
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    setReplyingTo(null);
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

  const handleReplyToMessage = (message) => {
    setReplyingTo(message);
    document.getElementById('message-input').focus();
  };

  const handleShareDesign = () => {
    // In a real implementation, this would open a modal to select a design to share
    toast.success("Share your design with the community!");
  };

  const handleViewUserProfile = (user) => {
    setShowUserProfile(user);
  };

  return (
    <div className={`${mainContentAnimation}`} style={{ animationDelay: '0.5s' }}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Community Chat</h2>
          <div className="text-sm text-slate-400">
            <span className="text-green-400">●</span> 42 users online
          </div>
        </div>
        <p className="text-slate-400 text-sm">
          Connect with other designers, share your creations, and get inspired by the community.
        </p>
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

      {/* Chat Messages */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg mb-4">
        <div className="h-[500px] overflow-y-auto p-4 custom-scrollbar">
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
                <div key={message.id} className="mb-6 last:mb-0">
                  <div className="flex items-start gap-3">
                    <img 
                      src={message.user.avatar} 
                      alt={message.user.name} 
                      className="w-10 h-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all"
                      onClick={() => handleViewUserProfile(message.user)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span 
                          className="font-medium text-white cursor-pointer hover:text-indigo-300 transition-colors"
                          onClick={() => handleViewUserProfile(message.user)}
                        >
                          {message.user.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-3 text-slate-300">
                        <p>{message.text}</p>
                        
                        {/* Shared Design Preview */}
                        {message.hasSharedDesign && message.design && (
                          <div className="mt-3 bg-slate-800/70 rounded-lg overflow-hidden border border-slate-600/50">
                            <div className="relative aspect-video">
                              <img 
                                src={message.design.preview} 
                                alt={message.design.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="font-medium text-white text-sm">{message.design.title}</h4>
                              <div className="flex items-center justify-between mt-2">
                                <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                                  <ExternalLink className="h-3 w-3" />
                                  View Full Design
                                </button>
                                <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                                  <LinkIcon className="h-3 w-3" />
                                  Copy Link
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs">
                        <button 
                          onClick={() => handleLikeMessage(message.id)}
                          className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
                        >
                          <ThumbsUp className="h-3.5 w-3.5" />
                          {message.likes > 0 && <span>{message.likes}</span>}
                          <span>Like</span>
                        </button>
                        <button 
                          onClick={() => handleReplyToMessage(message)}
                          className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
                        >
                          <Reply className="h-3.5 w-3.5" />
                          <span>Reply</span>
                        </button>
                        <button className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors">
                          <Share2 className="h-3.5 w-3.5" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                    <button className="text-slate-500 hover:text-slate-300 transition-colors">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
        
        {/* Message Input */}
        <div className="border-t border-slate-700/50 p-4">
          {replyingTo && (
            <div className="flex items-center justify-between bg-slate-700/30 rounded px-3 py-2 mb-2 text-sm">
              <div className="flex items-center text-slate-300">
                <Reply className="h-4 w-4 mr-2 text-indigo-400" />
                Replying to <span className="font-medium text-indigo-300 ml-1">{replyingTo.user.name}</span>
              </div>
              <button 
                onClick={() => setReplyingTo(null)}
                className="text-slate-400 hover:text-slate-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              id="message-input"
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
              <Image className="h-5 w-5" />
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

      {/* User Profile Modal */}
      {showUserProfile && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl max-w-md w-full border border-slate-700 shadow-2xl animate-fadeInScaleUp">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">User Profile</h3>
                <button
                  onClick={() => setShowUserProfile(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex flex-col items-center mb-6">
                <img 
                  src={showUserProfile.avatar} 
                  alt={showUserProfile.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 mb-4"
                />
                <h4 className="text-xl font-bold text-white">{showUserProfile.name}</h4>
                <p className="text-indigo-400">{showUserProfile.role}</p>
                <p className="text-sm text-slate-400 mt-1">Member since {showUserProfile.joined}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-white">12</div>
                  <div className="text-xs text-slate-400">Designs</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-white">48</div>
                  <div className="text-xs text-slate-400">Likes</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-white">5</div>
                  <div className="text-xs text-slate-400">Months</div>
                </div>
              </div>
              
              <div className="flex justify-center gap-3">
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm transition-colors">
                  View Designs
                </button>
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityChat;