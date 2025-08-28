import { MessageSquare, Search, Clock, Trash2, MoreVertical, Archive, Star, Pin } from 'lucide-react';
import { useState } from 'react';

export function ChatSessions({ sessions, onSessionSelect, onSessionDelete }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredSession, setHoveredSession] = useState(null);

  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimestamp = (dateString) => {
    const now = new Date().getTime();
    const timestamp = new Date(dateString).getTime();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (isNaN(diff)) return 'Invalid date';
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${Math.max(1, minutes)}m ago`;
  };

  const getSessionPreview = (session) => {
    if (session.lastMessage) return session.lastMessage;
    if (session.messages && session.messages.length > 0) {
      const lastMsg = session.messages[session.messages.length - 1];
      return lastMsg.content.substring(0, 60) + (lastMsg.content.length > 60 ? '...' : '');
    }
    return 'No messages yet';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Enhanced Search */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-sm"
          />
        </div>
      </div>

      {/* Enhanced Sessions List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-2">
          {filteredSessions.length > 0 ? (
            <div className="space-y-2">
              {filteredSessions.map(session => (
                <div
                  key={session._id}
                  className="group relative p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200 hover:shadow-md"
                  onClick={() => onSessionSelect(session)}
                  onMouseEnter={() => setHoveredSession(session._id)}
                  onMouseLeave={() => setHoveredSession(null)}
                >
                  <div className="flex items-start gap-3">
                    {/* Session Icon */}
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      {session.isPinned && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Pin className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Session Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                          {session.title || `Chat ${session._id.slice(-6)}`}
                        </h3>
                        {session.isStarred && (
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2 leading-relaxed">
                        {getSessionPreview(session)}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimestamp(session.timestamp)}</span>
                          </div>
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                          <span>{session.messageCount || 0} messages</span>
                        </div>
                        
                        {/* Status Indicator */}
                        <div className={`w-2 h-2 rounded-full ${
                          session.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                      </div>
                    </div>

                    {/* Action Menu */}
                    <div className={`transition-opacity duration-200 ${
                      hoveredSession === session._id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle star toggle
                          }}
                          className="p-1.5 hover:bg-yellow-100 rounded-lg transition-colors"
                          title="Star conversation"
                        >
                          <Star className="w-3 h-3 text-gray-400 hover:text-yellow-500" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle archive
                          }}
                          className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Archive conversation"
                        >
                          <Archive className="w-3 h-3 text-gray-400 hover:text-blue-500" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSessionDelete(session._id);
                          }}
                          className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete conversation"
                        >
                          <Trash2 className="w-3 h-3 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-200 transition-all pointer-events-none"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchQuery ? 'No conversations found' : 'No conversations yet'}
              </h3>
              <p className="text-gray-600 text-sm">
                {searchQuery 
                  ? `No conversations found matching "${searchQuery}"`
                  : 'Start your first conversation to see it here'
                }
              </p>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}