import { useState } from 'react'
import { 
  MessageSquare, 
  Search, 
  Clock, 
  Trash2, 
  MoreVertical,
  Star,
  Archive,
  Pin,
  User,
  Bot
} from 'lucide-react'

const mockSessions = [
  {
    id: 1,
    title: 'Customer Support Chat',
    lastMessage: 'Thank you for your help!',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    messageCount: 12,
    status: 'completed',
    isStarred: false,
    isPinned: true
  },
  {
    id: 2,
    title: 'Product Inquiry',
    lastMessage: 'Can you tell me more about pricing?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    messageCount: 8,
    status: 'active',
    isStarred: true,
    isPinned: false
  },
  {
    id: 3,
    title: 'Technical Support',
    lastMessage: 'The issue has been resolved.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    messageCount: 15,
    status: 'completed',
    isStarred: false,
    isPinned: false
  },
  {
    id: 4,
    title: 'Billing Question',
    lastMessage: 'When will my subscription renew?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    messageCount: 6,
    status: 'active',
    isStarred: false,
    isPinned: false
  },
  {
    id: 5,
    title: 'Feature Request',
    lastMessage: 'Could you add dark mode support?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    messageCount: 9,
    status: 'completed',
    isStarred: true,
    isPinned: false
  }
]

export function ChatSessions({ 
  sessions = mockSessions, 
  activeSessionId, 
  onSessionSelect, 
  onSessionDelete 
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSessionMenu, setSelectedSessionMenu] = useState(null)

  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatTimestamp = (date) => {
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return `${Math.max(1, minutes)}m ago`
  }

  const handleSessionAction = (action, sessionId) => {
    switch (action) {
      case 'delete':
        onSessionDelete?.(sessionId)
        break
      case 'star':
        // Handle star toggle
        console.log('Toggle star for session:', sessionId)
        break
      case 'archive':
        // Handle archive
        console.log('Archive session:', sessionId)
        break
      case 'pin':
        // Handle pin toggle
        console.log('Toggle pin for session:', sessionId)
        break
    }
    setSelectedSessionMenu(null)
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Chat Sessions</h2>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
          />
        </div>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredSessions.length > 0 ? (
          <div className="p-2">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className={`relative p-4 m-2 rounded-2xl border transition-all haptic-light ${
                  activeSessionId === session.id
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg'
                    : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onSessionSelect?.(session)}
              >
                <div className="flex items-start gap-3">
                  {/* Session Icon */}
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md ${
                      session.status === 'active' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                    }`}>
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Status indicators */}
                    {session.isPinned && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Pin className="w-2 h-2 text-white" />
                      </div>
                    )}
                    
                    {session.status === 'active' && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                    )}
                  </div>

                  {/* Session Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-bold truncate ${
                        activeSessionId === session.id ? 'text-blue-700' : 'text-gray-900'
                      }`}>
                        {session.title}
                      </h3>
                      
                      <div className="flex items-center gap-1">
                        {session.isStarred && (
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedSessionMenu(selectedSessionMenu === session.id ? null : session.id)
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all touch-target"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 truncate mb-2">
                      {session.lastMessage}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimestamp(session.timestamp)}</span>
                        </div>
                        <span>{session.messageCount} messages</span>
                      </div>
                      
                      <div className={`w-2 h-2 rounded-full ${
                        session.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    </div>
                  </div>
                </div>

                {/* Action Menu */}
                {selectedSessionMenu === session.id && (
                  <div className="absolute top-12 right-4 bg-white rounded-xl shadow-xl border border-gray-200 z-10 min-w-[140px] animate-slide-down">
                    <div className="py-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSessionAction('star', session.id)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                      >
                        <Star className="w-4 h-4" />
                        {session.isStarred ? 'Unstar' : 'Star'}
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSessionAction('pin', session.id)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <Pin className="w-4 h-4" />
                        {session.isPinned ? 'Unpin' : 'Pin'}
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSessionAction('archive', session.id)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Archive className="w-4 h-4" />
                        Archive
                      </button>
                      
                      <div className="border-t border-gray-100 my-1"></div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSessionAction('delete', session.id)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? 'No conversations found' : 'No conversations yet'}
              </h3>
              <p className="text-gray-500 text-sm">
                {searchQuery 
                  ? `No conversations found matching "${searchQuery}"`
                  : 'Start your first conversation to see it here'
                }
              </p>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-blue-600 font-medium text-sm"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}