import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Sparkles,
  Crown,
  Zap,
  MoreVertical,
  Copy,
  Plus,
  X,
  ArrowLeft,
  MessageCircle
} from 'lucide-react'
import { activeBotSelector, messagesSelector, inputSelector, isTypingSelector } from '../store/selectors'
import { addMessage, setInput, setIsTyping } from '../store/slice'

const THINKING_MESSAGES = [
  "Analyzing your request...",
  "Consulting knowledge base...",
  "Generating response...",
  "Processing your question..."
]

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
  },
  {
    id: 5,
    title: 'Feature Request',
    lastMessage: 'Could you add dark mode support?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    messageCount: 9,
    status: 'completed',
    messages: [
      {
        id: 1,
        role: 'bot',
        content: 'I\'d love to hear your feature suggestions!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25)
      },
      {
        id: 2,
        role: 'user',
        content: 'Could you add dark mode support?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
      },
      {
        id: 3,
        role: 'bot',
        content: 'Great suggestion! I\'ll forward this to our development team.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23.5)
      }
    ]
  }
]

export function Chat() {
  const dispatch = useDispatch()
  const activeBot = useSelector(activeBotSelector)
  const storeMessages = useSelector(messagesSelector)
  const input = useSelector(inputSelector)
  const isTyping = useSelector(isTypingSelector)
  const [thinkingMessage, setThinkingMessage] = useState(THINKING_MESSAGES[0])
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

    const thinkingInterval = setInterval(() => {
      setThinkingMessage(THINKING_MESSAGES[Math.floor(Math.random() * THINKING_MESSAGES.length)])
    }, 2000)

    try {
      // Simulate AI response
      setTimeout(() => {
        clearInterval(thinkingInterval)
        const botResponse = {
          id: Date.now(),
          role: 'bot',
          content: "I understand your question. Let me help you with that. This is a simulated response for the mobile app prototype.",
          timestamp: new Date(),
          animation: 'fadeIn'
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
      clearInterval(thinkingInterval)
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

  const quickQuestions = [
    "How can I help you?",
    "Tell me about pricing",
    "How does setup work?",
    "Contact support"
  ]

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Sessions List View
  if (showSessionsList || !activeSession) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold">Chat Sessions</h2>
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
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {/* New Chat Button */}
          <button
            onClick={createNewSession}
            className="w-full p-4 mb-4 border-2 border-dashed border-blue-300 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all haptic-medium"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-gray-900">Start New Chat</h3>
                <p className="text-sm text-gray-600">Begin a new conversation</p>
              </div>
            </div>
          </button>

          {/* Sessions Grid */}
          <div className="space-y-3">
            {chatSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all haptic-light"
                onClick={() => openSession(session.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    session.status === 'active' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                      : 'bg-gradient-to-r from-gray-400 to-gray-600'
                  }`}>
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">{session.title}</h3>
                    <p className="text-sm text-gray-600 truncate">{session.lastMessage}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{formatTimestamp(session.timestamp)}</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteSession(session.id)
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all touch-target"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {chatSessions.length === 0 && (
            <div className="text-center py-12">
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
          )}
        </div>
      </div>
    )
  }

  // Individual Chat View
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={closeSession}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors touch-target"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
            </div>
            
            <div>
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
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => deleteSession(activeSessionId)}
              className="p-2 rounded-xl bg-white/20 hover:bg-red-500 transition-colors touch-target"
            >
              <X className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors touch-target">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Hello! I'm {activeBot?.name || 'your AI Assistant'}
            </h3>
            <p className="text-gray-600 mb-6">How can I help you today?</p>
            
            {/* Quick Questions */}
            <div className="w-full space-y-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => dispatch(setInput(question))}
                  className="w-full p-3 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl text-sm text-blue-700 hover:bg-blue-50 transition-all haptic-light"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div key={message.id || index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-3 max-w-[85%] ${message.animation === 'fadeIn' ? 'animate-fade-in' : ''}`}>
                  {message.role === 'bot' && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 shadow-lg ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-lg'
                          : message.isError
                            ? 'bg-red-100 text-red-800 border border-red-200 rounded-bl-lg'
                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-lg'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    
                    <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                      <span>{formatMessageTime(message.timestamp)}</span>
                      {message.role === 'user' && <span className="text-green-500">✓</span>}
                    </div>
                  </div>

                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-lg px-4 py-3 shadow-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-sm text-gray-500 italic">{thinkingMessage}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      {activeSession && (
        <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
          <form onSubmit={handleSubmit} className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => dispatch(setInput(e.target.value))}
                placeholder="Type your message..."
                rows={1}
                className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none bg-white"
                style={{ minHeight: '48px', maxHeight: '120px' }}
                disabled={isTyping}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
              <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                {input.length}/500
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className={`p-3 rounded-2xl transition-all shadow-lg touch-target ${
                input.trim() && !isTyping
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
          
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Press Enter to send</span>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>AI-powered</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => dispatch(setInput(e.target.value))}
              placeholder="Type your message..."
              rows={1}
              className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none bg-white"
              style={{ minHeight: '48px', maxHeight: '120px' }}
              disabled={isTyping}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <div className="absolute right-3 bottom-3 text-xs text-gray-400">
              {input.length}/500
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={`p-3 rounded-2xl transition-all shadow-lg touch-target ${
              input.trim() && !isTyping
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
        
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>Press Enter to send</span>
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <span>AI-powered</span>
          </div>
        </div>
      </div>
    </div>
  )
}