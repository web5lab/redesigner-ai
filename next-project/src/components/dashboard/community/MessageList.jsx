import React, { useRef, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import MessageItem from './MessageItem';
import { useSelector } from 'react-redux';
import { UserSelector } from '../../../store/global.Selctor';

const MessageList = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);
  const user = useSelector(UserSelector);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="max-h-[80vh] overflow-y-auto p-4 custom-scrollbar">
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
            <MessageItem 
              key={message.id} 
              message={message}
              currentUser={user}
            />
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default MessageList;