import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chatSelector, UserSelector } from '../../store/global.Selctor';
import toast from 'react-hot-toast';

// Import community components
import MessageList from './community/MessageList';
import MessageInput from './community/MessageInput';
import ShareDesignModal from './community/ShareDesignModal';
import socket from '../../socket';
import { GetChatHistory, sendMessageApi } from '../../store/global.Action';
import { setChatHistory } from '../../store/global.Slice';

const CommunityChat = ({ mainContentAnimation, setShowBilling ,setActiveTab }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [showShareDesignModal, setShowShareDesignModal] = useState(false);
  const user = useSelector(UserSelector);
  const chatHistory = useSelector(chatSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetChatHistory())
  }, [])

  useEffect(() => {
    // Connect to socket server
    socket.emit('join-room', user); // Optional: join a public room

    // Listen for real-time new messages
    socket.on('new-message', (msg) => {
      console.log("test data",msg)
      dispatch(setChatHistory(msg));
    });

    return () => {
      socket.off('new-message');
      socket.emit('leave-room', 'community');
    };
  }, []);


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    await sendMessageApi({
      data: {
        content: replyingTo ? `@${replyingTo.user.name} ${newMessage}` : newMessage,
      }
    })
    setNewMessage('');
    setReplyingTo(null);
  };

  const handleShareDesign = () => {
    setShowShareDesignModal(true);
  };

  const handleShareDesignSubmit = async (data) => {
    await sendMessageApi({
      data: {
        content: data.description,
        website: data.id
      }
    })

    toast.success('Design shared with the community!');
  };

  return (
    <div className={`${mainContentAnimation}`} style={{ animationDelay: '0.5s' }}>

      {/* Chat Messages */}
      <div className="bg-slate-800/30 border min-h-[90vh] border-slate-700/50 rounded-lg mb-4">
        <MessageList
        setActiveTab={setActiveTab}
          messages={chatHistory}
          isLoading={isLoading}
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
        Messages are public and visible to all redesignr members.
      </div>


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