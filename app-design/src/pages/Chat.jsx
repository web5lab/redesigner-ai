import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  ArrowLeft,
  MessageCircle,
  Plus,
  X
} from 'lucide-react'
import { activeBotSelector, messagesSelector, inputSelector, isTypingSelector } from '../store/selectors'
import { addMessage, setInput, setIsTyping } from '../store/slice'

// Mock chat sessions data
const mockChatSessions = [
  {
    id: 1,
    title: 'Customer Support Chat',
    lastMessage: 'Thank you for your help!',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    messageCount: 12,
    status: 'active',
    messages: [
      {
        id: 1,
        role: 'bot',
        content: 'Hello! How can I help you today?',
        timestamp: new Date(Date.now() - 1000 * 60 * 10)
      },
      {
        id: 2,
        role: 'user',
        content: 'I need help with my account settings',
        timestamp: new Date(Date.now() - 1000 * 60 * 9)
      },
      {
        id: 3,
        role: 'bot',
        content: 'I\'d be happy to help you with your account settings! What specific setting would you like to modify?',
        timestamp: new Date(Date.now() - 1000 * 60 * 8)
      }
    ]
  },
  {
    id: 2,
    title: 'Product Inquiry',
    lastMessage: 'Can you tell me more about pricing?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    messageCount: 8,
    status: 'active',
    messages: [
      {
        id: 1,
        role: 'bot',
        content: 'Hi! I\'m here to help with any product questions.',
        timestamp: new Date(Date.now() - 1000 * 60 * 35)
      },
      {
        id: 2,
        role: 'user',
        content: 'Can you tell me more about pricing?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30)
      }
    ]
  },
  {
    id: 3,
    title: 'Technical Support',
    lastMessage: 'The issue has been resolved.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    messageCount: 15,
    status: 'completed',
    messages: [
      {
        id: 1,
        role: 'bot',
        content: 'I\'m here to help with technical issues.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3)
      },
      {
        id: 2,
        role: 'user',
        content: 'I\'m having trouble with the app crashing.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5)
      },
      {
        id: 3,
        role: 'bot',
        content: 'The issue has been resolved. Please try restarting the app.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
      }
    ]
  },
  {
    id: 4,
    title: 'Billing Question',
    lastMessage: 'When will my subscription renew?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    messageCount: 6,
    status: 'active',
    messages: [
      {
        id: 1,
        role: 'bot',
        content: 'I can help you with billing questions.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.5)
      },
      {
        id: 2,
        role: 'user',
        content: 'When will my subscription renew?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4)
      }
    ]
  }
]

export function Chat() {
  const dispatch = useDispatch()
  const activeBot = useSelector(activeBotSelector)
  const input = useSelector(inputSelector)
  const isTyping = useSelector(isTypingSelector)
  const [chatSessions, setChatSessions] = useState(mockChatSessions)
  const [activeSessionId, setActiveSessionId] = useState(null)
  const [showSessionsList, setShowSessionsList] = useState(true)
  const messagesEndRef = useRef(null)

  const activeSession = chatSessions.find(session => session.id === activeSessionId)
  const messages = activeSession?.messages || []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const createNewSession = () => {
    const newSession = {
      id: Date.now(),
      title: `New Chat ${chatSessions.length + 1}`,
      lastMessage: '',
      timestamp: new Date(),
      messageCount: 0,
      status: 'active',
      messages: [
        {
          id: 1,
          role: 'bot',
          content: 'Hello! How can I help you today?',
          timestamp: new Date()
        }
      ]
    }
    setChatSessions(prev => [newSession, ...prev])
    setActiveSessionId(newSession.id)
    setShowSessionsList(false)
  }

  const openSession = (sessionId) => {
    setActiveSessionId(sessionId)
    setShowSessionsList(false)
  }

  const closeSession = () => {
    setActiveSessionId(null)
    setShowSessionsList(true)
  }

  const deleteSession = (sessionId) => {
    setChatSessions(prev => prev.filter(session => session.id !== sessionId))
    if (activeSessionId === sessionId) {
      closeSession()
    }
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    if (!activeSession) return

    dispatch(setIsTyping(true))
    
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    // Update the active session with new message
    setChatSessions(prev => prev.map(session => 
      session.id === activeSessionId 
        ? {
            ...session,
            messages: [...session.messages, userMessage],
            lastMessage: input,
            messageCount: session.messageCount + 1,
            timestamp: new Date()
          }
        : session
    ))
    
    dispatch(setInput(''))

    try {
      // Simulate AI response
      setTimeout(() => {
        const botResponse = {
          id: Date.now(),
          role: 'bot',
          content: "I understand your question. Let me help you with that. This is a simulated response for the mobile app.",
          timestamp: new Date()
        }
        
        setChatSessions(prev => prev.map(session => 
          session.id === activeSessionId 
            ? {
                ...session,
                messages: [...session.messages, botResponse],
                lastMessage: botResponse.content,
                messageCount: session.messageCount + 1,
                timestamp: new Date()
              }
            : session
        ))
        
        dispatch(setIsTyping(false))
      }, 2000)
    } catch (error) {
      const errorResponse = {
        id: Date.now(),
        role: 'bot',
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
        isError: true
      }
      setChatSessions(prev => prev.map(session => 
        session.id === activeSessionId 
          ? {
              ...session,
              messages: [...session.messages, errorResponse],
              lastMessage: errorResponse.content,
              messageCount: session.messageCount + 1,
              timestamp: new Date()
            }
          : session
      ))
      dispatch(setIsTyping(false))
    }
  }

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Sessions List View (WhatsApp-style)
  if (showSessionsList || !activeSession) {
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white shadow-lg safe-area-top">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{activeBot?.name || 'Chat Sessions'}</h2>
                <p className="text-sm text-blue-100">{chatSessions.length} conversations</p>
              </div>
            </div>
            <button
              onClick={createNewSession}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors touch-target"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="divide-y divide-gray-100">
            {chatSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => openSession(session.id)}
                className="w-full p-4 hover:bg-gray-50 transition-colors text-left haptic-light"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    session.status === 'active' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                      : 'bg-gradient-to-r from-gray-400 to-gray-600'
                  }`}>
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-900 truncate">{session.title}</h3>
                      <span className="text-xs text-gray-500">{formatTimestamp(session.timestamp)}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{session.lastMessage}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{session.messageCount} messages</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span className={`text-xs font-medium ${
                        session.status === 'active' ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {session.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      session.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
                    }`}></div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Empty State */}
          {chatSessions.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No Chat Sessions</h3>
                <p className="text-gray-600 mb-6">Start your first conversation</p>
                <button
                  onClick={createNewSession}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium haptic-medium"
                >
                  Create New Chat
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Individual Chat View (WhatsApp-style)
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white shadow-lg safe-area-top">
        <div className="flex items-center gap-3">
          <button
            onClick={closeSession}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors touch-target"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          
          <div className="flex-1">
            <h2 className="font-bold">{activeSession?.title || 'Chat Session'}</h2>
            <div className="flex items-center gap-2 text-sm text-blue-100">
              {isTyping ? (
                <>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span>Typing...</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Online</span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => deleteSession(activeSessionId)}
            className="p-2 rounded-xl bg-white/20 hover:bg-red-500 transition-colors touch-target"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div key={message.id || index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start gap-3 max-w-[85%]`}>
              {message.role === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`rounded-2xl px-4 py-3 shadow-sm max-w-xs ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-lg'
                      : message.isError
                        ? 'bg-red-100 text-red-800 border border-red-200 rounded-bl-lg'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-lg'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                
                <div className="mt-1 text-xs text-gray-500">
                  {formatMessageTime(message.timestamp)}
                  {message.role === 'user' && <span className="text-green-500 ml-1">✓</span>}
                </div>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white rounded-2xl rounded-bl-lg px-4 py-3 shadow-sm border border-gray-200">
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
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200 safe-area-bottom">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => dispatch(setInput(e.target.value))}
              placeholder="Type a message..."
              className="w-full px-4 py-3 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-gray-50"
              disabled={isTyping}
            />
          </div>
          
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={`p-3 rounded-full transition-all touch-target ${
              input.trim() && !isTyping
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg haptic-medium'
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
    </div>
  )
}