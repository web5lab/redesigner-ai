import React from 'react';
import { Send, Image, Reply, X } from 'lucide-react';

const MessageInput = ({ 
  newMessage, 
  setNewMessage, 
  handleSendMessage, 
  handleShareDesign, 
  replyingTo, 
  setReplyingTo 
}) => {
  return (
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
  );
};

export default MessageInput;