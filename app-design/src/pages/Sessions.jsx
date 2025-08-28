import { useState } from 'react'
import { 
  MessageSquare, 
  Search, 
  Clock, 
  Trash2, 
  MoreVertical,
  User,
  Bot,
  Filter,
  Calendar
} from 'lucide-react'

const mockSessions = [
  {
    id: 1,
    title: 'Customer Support Chat',
    lastMessage: 'Thank you for your help!',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    messageCount: 12,
    status: 'completed'
  },
  {
    id: 2,
    title: 'Product Inquiry',
    lastMessage: 'Can you tell me more about pricing?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    messageCount: 8,
    status: 'active'
  },
  {
    id: 3,
    title: 'Technical Support',
    lastMessage: 'The issue has been resolved.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    messageCount: 15,
    status: 'completed'
  }
]

export function Sessions() {
  const [sessions, setSessions] = useState(mockSessions)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSession, setSelectedSession] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || session.status === filterStatus
    return matchesSearch && matchesFilter
  })

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

  const deleteSession = (sessionId) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId))
    if (selectedSession?.id === sessionId) {
      setSelectedSession(null)
    }
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Search and Filter */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200 space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search sessions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>

        <div className="flex gap-2">
          {['all', 'active', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all haptic-light ${
                filterStatus === status
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {selectedSession ? (
          <div className="h-full flex flex-col">
            {/* Session Header */}
            <div className="p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedSession(null)}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors touch-target"
                >
                  ←
                </button>
                <div>
                  <h2 className="font-bold text-gray-900">{selectedSession.title}</h2>
                  <p className="text-sm text-gray-600">{selectedSession.messageCount} messages</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4">
              {/* Sample messages */}
              <div className="flex justify-start">
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-lg px-4 py-3 shadow-lg border border-gray-200">
                    <p className="text-sm">Hello! How can I help you today?</p>
                    <p className="text-xs text-gray-500 mt-1">2:30 PM</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl rounded-br-lg px-4 py-3 shadow-lg">
                    <p className="text-sm">{selectedSession.lastMessage}</p>
                    <p className="text-xs text-blue-200 mt-1">2:32 PM</p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                onClick={() => setSelectedSession(session)}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all haptic-light"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">{session.title}</h3>
                    <p className="text-sm text-gray-600 truncate">{session.lastMessage}</p>
                    
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTimestamp(session.timestamp)}</span>
                      </div>
                      <span>{session.messageCount} messages</span>
                      <div className={`w-2 h-2 rounded-full ${
                        session.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteSession(session.id)
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-all touch-target"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {filteredSessions.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
                <p className="text-gray-500">
                  {searchQuery ? 'Try adjusting your search' : 'Start chatting to see sessions here'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}