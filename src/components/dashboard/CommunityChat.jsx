import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserSelector } from '../../store/global.Selctor';
import toast from 'react-hot-toast';

// Import community components
import MessageList from './community/MessageList';
import MessageInput from './community/MessageInput';
import UserProfileModal from './community/UserProfileModal';
import CommunityGuidelines from './community/CommunityGuidelines';
import PremiumNotice from './community/PremiumNotice';
import ShareDesignModal from './community/ShareDesignModal';

const CommunityChat = ({ mainContentAnimation, setShowBilling }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showUserProfile, setShowUserProfile] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [showShareDesignModal, setShowShareDesignModal] = useState(false);
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

  const handleLikeMessage = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
    ));
  };

  const handleReplyToMessage = (message) => {
    setReplyingTo(message);
    document.getElementById('message-input')?.focus();
  };

  const handleShareDesign = () => {
    setShowShareDesignModal(true);
  };

  const handleShareDesignSubmit = (data) => {
    // Add new message with shared design
    const newMsg = {
      id: messages.length + 1,
      user: {
        name: user?.name || 'You',
        avatar: user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random&color=fff`,
        role: 'Community Member',
        joined: 'Just now'
      },
      text: data.description || `I wanted to share my design: ${data.title || data.design.title}`,
      timestamp: new Date().toISOString(),
      likes: 0,
      hasSharedDesign: true,
      design: {
        id: data.design.id,
        title: data.title || data.design.title,
        preview: data.design.preview
      }
    };
    
    setMessages([...messages, newMsg]);
    toast.success('Design shared with the community!');
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

      {/* Community Guidelines */}
      <CommunityGuidelines />

      {/* Chat Messages */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg mb-4">
        <MessageList 
          messages={messages}
          isLoading={isLoading}
          onLike={handleLikeMessage}
          onReply={handleReplyToMessage}
          onViewProfile={setShowUserProfile}
        />
        
        {/* Message Input */}
        <MessageInput 
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          handleShareDesign={handleShareDesign}
          replyingTo={replyingTo}
          setReplyingTo={setReplyingTo}
        />
      </div>
      
      <div className="text-xs text-slate-500 text-center">
        Messages are public and visible to all community members.
      </div>

      {/* Premium Plan Upgrade Notice */}
      {(!user?.currentPlan || user.currentPlan.toLowerCase() === 'free') && (
        <PremiumNotice setShowBilling={setShowBilling} />
      )}

      {/* User Profile Modal */}
      <UserProfileModal 
        user={showUserProfile}
        onClose={() => setShowUserProfile(null)}
      />

      {/* Share Design Modal */}
      <ShareDesignModal 
        isOpen={showShareDesignModal}
        onClose={() => setShowShareDesignModal(false)}
        onShare={handleShareDesignSubmit}
      />
    </div>
  );
};

export default CommunityChat;