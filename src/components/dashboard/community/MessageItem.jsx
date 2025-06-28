import React from 'react';
import { Clock, ThumbsUp, Reply, Share2, MoreHorizontal, ExternalLink, Link as LinkIcon } from 'lucide-react';

const MessageItem = ({ message, onLike, onReply, onViewProfile }) => {
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

  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-start gap-3">
        <img 
          src={message.user.avatar} 
          alt={message.user.name} 
          className="w-10 h-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all"
          onClick={() => onViewProfile(message.user)}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span 
              className="font-medium text-white cursor-pointer hover:text-indigo-300 transition-colors"
              onClick={() => onViewProfile(message.user)}
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
              onClick={() => onLike(message.id)}
              className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              {message.likes > 0 && <span>{message.likes}</span>}
              <span>Like</span>
            </button>
            <button 
              onClick={() => onReply(message)}
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
  );
};

export default MessageItem;