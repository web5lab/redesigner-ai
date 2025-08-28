import { useState } from 'react'
import { useSelector } from 'react-redux'
import { 
  MessageSquare, 
  Search, 
  Clock, 
  Trash2, 
  MoreVertical,
  User,
  Bot,
  Filter,
  Calendar,
  Send,
  Loader2
} from 'lucide-react'
import { activeBotSelector } from '../store/selectors'
import { ChatSessions } from '../components/ChatSessions'

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
  const activeBot = useSelector(activeBotSelector)
  const [sessions, setSessions] = useState(mockSessions)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSession, setSelectedSession] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

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

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || isTyping) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: newMessage,
      timestamp: new Date()
    }

    // Update selected session with new message
    const updatedSession = {
      ...selectedSession,
      messages: [...(selectedSession.messages || []), userMessage],
      lastMessage: newMessage,
      messageCount: (selectedSession.messageCount || 0) + 1
    }
    
    setSelectedSession(updatedSession)
    setSessions(prev => prev.map(s => s.id === selectedSession.id ? updatedSession : s))
    setNewMessage('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        role: 'bot',
        content: "Thank you for your message! I'm here to help you with any questions you might have.",
        timestamp: new Date()
      }

      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, botMessage],
        lastMessage: botMessage.content,
        messageCount: updatedSession.messageCount + 1
      }

      setSelectedSession(finalSession)
      setSessions(prev => prev.map(s => s.id === selectedSession.id ? finalSession : s))
      setIsTyping(false)
    }, 1500)
  }
  return (
    <div className="h-full flex bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Sessions Sidebar */}
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-sm border-r border-gray-200 flex-shrink-0">
        <ChatSessions
          sessions={sessions}
          activeSessionId={selectedSession?.id}
          onSessionSelect={setSelectedSession}
          onSessionDelete={deleteSession}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedSession ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">{selectedSession.title}</h2>
                  <p className="text-sm text-gray-600">{selectedSession.messageCount} messages</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
              {/* Sample conversation */}
              <div className="flex justify-start">
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-lg px-4 py-3 shadow-lg border border-gray-200">
                    <p className="text-sm">Hello! How can I help you today?</p>
                    <p className="text-xs text-gray-500 mt-1">{formatTimestamp(new Date(Date.now() - 1000 * 60 * 10))}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl rounded-br-lg px-4 py-3 shadow-lg">
                    <p className="text-sm">{selectedSession.lastMessage}</p>
                    <p className="text-xs text-blue-200 mt-1">{formatTimestamp(selectedSession.timestamp)}</p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Show more messages if they exist */}
              {selectedSession.messages?.map((message, index) => (
                <div key={message.id || index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex items-start gap-3 max-w-[85%]">
                    {message.role === 'bot' && (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div className={`rounded-2xl px-4 py-3 shadow-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-lg'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-lg'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>

                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-bl-lg px-4 py-3 shadow-lg border border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-xs text-gray-500">Typing...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    rows={1}
                    className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none bg-white"
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                    disabled={isTyping}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage(e)
                      }
                    }}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isTyping}
                  className={`p-3 rounded-2xl transition-all shadow-lg touch-target ${
                    newMessage.trim() && !isTyping
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl haptic-medium'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 bg-white/60">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Select a Conversation</h3>
              <p className="text-gray-600 mb-6">Choose a chat session from the sidebar to view the conversation</p>
              
              {activeBot && (
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activeBot.name}</p>
                      <p className="text-sm text-gray-600">Ready to chat</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}