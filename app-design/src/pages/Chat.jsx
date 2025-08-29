import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  ArrowLeft,
  MessageCircle,
  Plus,
  X,
  Search,
  MoreVertical,
  Star,
  Archive,
  Trash2,
  Clock,
  Phone,
  Video
} from 'lucide-react'
import { activeBotSelector, messagesSelector, inputSelector, isTypingSelector } from '../store/selectors'
import { addMessage, setInput, setIsTyping } from '../store/slice'

// Mock chat sessions data with more realistic conversations
const mockChatSessions = [
  {
    id: 1,
    title: 'Customer Support',
    lastMessage: 'Thank you for your help with the billing issue!',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    messageCount: 12,
    status: 'active',
    unread: 2,
    avatar: 'https://ui-avatars.com/api/?name=Customer+Support&background=3b82f6&color=ffffff&size=48',
    messages: [
      {
        id: 1,
        role: 'bot',
        content: 'Hello! I\'m here to help with your customer support needs. How can I assist you today?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30)
      },
      {
        id: 2,
        role: 'user',
        content: 'Hi! I\'m having trouble with my billing. My card was charged twice this month.',
        timestamp: new Date(Date.now() - 1000 * 60 * 25)
      },
      {
        id: 3,
        role: 'bot',
        content: 'I understand your concern about the duplicate charge. Let me look into your billing history right away. Can you provide me with your account email?',
        timestamp: new Date(Date.now() - 1000 * 60 * 24)
      },
      {
        id: 4,
        role: 'user',
        content: 'Sure, it\'s john.doe@email.com',
        timestamp: new Date(Date.now() - 1000 * 60 * 20)
      },
      {
        id: 5,
        role: 'bot',
        content: 'Perfect! I can see the duplicate charge on your account. I\'ve initiated a refund for the extra charge. You should see it reflected in 3-5 business days. Is there anything else I can help you with?',
        timestamp: new Date(Date.now() - 1000 * 60 * 15)
      },
      {
        id: 6,
        role: 'user',
        content: 'Thank you for your help with the billing issue!',
        timestamp: new Date(Date.now() - 1000 * 60 * 5)
      }
    ]
  },
  {
    id: 2,
    title: 'Product Demo',
    lastMessage: 'Can you show me the advanced features?',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    messageCount: 8,
    status: 'active',
    unread: 1,
    avatar: 'https://ui-avatars.com/api/?name=Product+Demo&background=10b981&color=ffffff&size=48',
    messages: [
      {
        id: 1,
        role: 'bot',
        content: 'Welcome! I\'m excited to show you our product features. What would you like to learn about first?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60)
      },
      {
        id: 2,
        role: 'user',
        content: 'I\'d like to understand the AI capabilities and how it can help my business.',
        timestamp: new Date(Date.now() - 1000 * 60 * 55)
      },
      {
        id: 3,
        role: 'bot',
        content: 'Great question! Our AI can handle customer inquiries 24/7, learn from your business data, and provide personalized responses. It integrates seamlessly with your existing tools.',
        timestamp: new Date(Date.now() - 1000 * 60 * 50)
      },
      {
        id: 4,
        role: 'user',
        content: 'Can you show me the advanced features?',
        timestamp: new Date(Date.now() - 1000 * 60 * 45)
      }
    ]
  },
  {
    id: 3,
    title: 'Technical Support',
    lastMessage: 'The integration is working perfectly now!',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    messageCount: 15,
    status: 'completed',
    unread: 0,
    avatar: 'https://ui-avatars.com/api/?name=Technical+Support&background=f59e0b&color=ffffff&size=48',
    messages: [
      {
        id: 1,
        role: 'bot',
        content: 'Hi! I\'m here to help with any technical issues. What seems to be the problem?',
        timestamp: new Date(Date.now() - 1000 * 60 * 180)
      },
      {
        id: 2,
        role: 'user',
        content: 'I\'m having trouble integrating the API with my website. The webhook isn\'t receiving data.',
        timestamp: new Date(Date.now() - 1000 * 60 * 175)
      },
      {
        id: 3,
        role: 'bot',
        content: 'Let me help you troubleshoot the webhook integration. First, can you check if your endpoint URL is correctly configured in the dashboard?',
        timestamp: new Date(Date.now() - 1000 * 60 * 170)
      },
      {
        id: 4,
        role: 'user',
        content: 'Yes, the URL looks correct. It\'s https://mysite.com/webhook',
        timestamp: new Date(Date.now() - 1000 * 60 * 165)
      },
      {
        id: 5,
        role: 'bot',
        content: 'Perfect! Now let\'s check the webhook secret and SSL certificate. Make sure your endpoint can handle POST requests and returns a 200 status code.',
        timestamp: new Date(Date.now() - 1000 * 60 * 160)
      },
      {
        id: 6,
        role: 'user',
        content: 'Found the issue! I had the wrong HTTP method. Changed it to POST and now it\'s working.',
        timestamp: new Date(Date.now() - 1000 * 60 * 125)
      },
      {
        id: 7,
        role: 'bot',
        content: 'Excellent! I\'m glad we got that sorted out. The webhook should now receive all the data properly. Is there anything else you need help with?',
        timestamp: new Date(Date.now() - 1000 * 60 * 123)
      },
      {
        id: 8,
        role: 'user',
        content: 'The integration is working perfectly now!',
        timestamp: new Date(Date.now() - 1000 * 60 * 120)
      }
    ]
  },
  {
    id: 4,
    title: 'Sales Inquiry',
    lastMessage: 'When can we schedule a demo?',
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    messageCount: 6,
    status: 'active',
    unread: 0,
    avatar: 'https://ui-avatars.com/api/?name=Sales+Inquiry&background=8b5cf6&color=ffffff&size=48',
    messages: [
      {
        id: 1,
        role: 'bot',
        content: 'Hello! I\'m here to help with your sales inquiry. What information can I provide about our services?',
        timestamp: new Date(Date.now() - 1000 * 60 * 260)
      },
      {
        id: 2,
        role: 'user',
        content: 'Hi! I\'m interested in your enterprise plan. Can you tell me about the pricing and features?',
        timestamp: new Date(Date.now() - 1000 * 60 * 255)
      },
      {
        id: 3,
        role: 'bot',
        content: 'I\'d be happy to discuss our enterprise solutions! Our enterprise plan includes unlimited AI conversations, priority support, custom integrations, and dedicated account management.',
        timestamp: new Date(Date.now() - 1000 * 60 * 250)
      },
      {
        id: 4,
        role: 'user',
        content: 'That sounds great! What about the pricing structure?',
        timestamp: new Date(Date.now() - 1000 * 60 * 245)
      },
      {
        id: 5,
        role: 'bot',
        content: 'Our enterprise pricing is customized based on your specific needs and usage volume. I\'d recommend scheduling a demo with our sales team to discuss your requirements and get a personalized quote.',
        timestamp: new Date(Date.now() - 1000 * 60 * 242)
      },
      {
        id: 6,
        role: 'user',
        content: 'When can we schedule a demo?',
        timestamp: new Date(Date.now() - 1000 * 60 * 240)
      }
    ]
  }
]

export function Chat() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const activeBot = useSelector(activeBotSelector)
  const input = useSelector(inputSelector)
  const isTyping = useSelector(isTypingSelector)
  const [chatSessions, setChatSessions] = useState(mockChatSessions)
  const [activeSessionId, setActiveSessionId] = useState(null)
  const [showSessionsList, setShowSessionsList] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef(null)

  const activeSession = chatSessions.find(session => session.id === activeSessionId)
  const messages = activeSession?.messages || []

  const filteredSessions = chatSessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const createNewSession = () => {
    const newSession = {
      id: Date.now(),
      title: `New Chat ${chatSessions.length + 1}`,
      lastMessage: '',
      timestamp: new Date(),
      messageCount: 1,
      status: 'active',
      unread: 0,
      avatar: 'https://ui-avatars.com/api/?name=New+Chat&background=6366f1&color=ffffff&size=48',
      messages: [
        {
          id: 1,
          role: 'bot',
          content: 'Hello! I\'m your AI assistant. How can I help you today?',
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
    // Update URL to indicate we're in a chat session
    navigate(`/chat?session=${sessionId}`, { replace: true })
    // Mark as read
    setChatSessions(prev => prev.map(session => 
      session.id === sessionId ? { ...session, unread: 0 } : session
    ))
  }

  const closeSession = () => {
    setActiveSessionId(null)
    setShowSessionsList(true)
    // Remove session parameter from URL
    navigate('/chat', { replace: true })
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

    if (days > 0) return `${days}d`
    if (hours > 0) return `${hours}h`
    return `${Math.max(1, minutes)}m`
  }

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
        const responses = [
          "I understand your question. Let me help you with that right away.",
          "That's a great point! Here's what I can tell you about that topic.",
          "I'd be happy to assist you with this. Let me provide you with the information you need.",
          "Thank you for reaching out! I have some helpful information for you.",
          "I can definitely help you with that. Here's what you should know..."
        ]
        
        const botResponse = {
          id: Date.now() + 1,
          role: 'bot',
          content: responses[Math.floor(Math.random() * responses.length)],
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
      }, 1500 + Math.random() * 1000)
    } catch (error) {
      const errorResponse = {
        id: Date.now() + 1,
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

  // Sessions List View (WhatsApp-style)
  if (showSessionsList || !activeSession) {
    return (
      <div className="h-full flex flex-col bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 safe-area-top">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Chats</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {chatSessions.length} conversations
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => openSession(session.id)}
                className="w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left group"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg ring-2 ring-gray-100 dark:ring-gray-700">
                      <img
                        src={session.avatar}
                        alt={session.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {session.status === 'active' && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {session.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTimestamp(session.timestamp)}
                        </span>
                        {session.unread > 0 && (
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{session.unread}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-1">
                      {session.lastMessage}
                    </p>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{session.messageCount} messages</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        session.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Empty State */}
          {filteredSessions.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {searchQuery ? 'No conversations found' : 'No conversations yet'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {searchQuery 
                    ? `No conversations found matching "${searchQuery}"`
                    : 'Start your first conversation with an AI assistant'
                  }
                </p>
                {!searchQuery && (
                  <button
                    onClick={createNewSession}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Start New Chat
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Individual Chat View (WhatsApp-style)
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Chat Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 safe-area-top">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={closeSession}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-target"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-md ring-2 ring-gray-100 dark:ring-gray-700">
              <img
                src={activeSession?.avatar || 'https://ui-avatars.com/api/?name=AI+Assistant&background=3b82f6&color=ffffff&size=40'}
                alt={activeSession?.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900 dark:text-white truncate">
                {activeSession?.title || 'Chat Session'}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                {isTyping ? (
                  <>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span>typing...</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>online</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-target">
                <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-target">
                <Video className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={() => deleteSession(activeSessionId)}
                className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors touch-target"
              >
                <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50 dark:bg-gray-900">
        <div className="p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={message.id || index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end gap-2 max-w-[85%] group`}>
                {message.role === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-sm max-w-xs transition-all duration-200 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : message.isError
                          ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-bl-md'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-md shadow-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  
                  <div className="mt-1 px-1">
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {formatMessageTime(message.timestamp)}
                      {message.role === 'user' && (
                        <span className="text-blue-500 ml-1">✓✓</span>
                      )}
                    </span>
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-end gap-2 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3 shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 safe-area-bottom">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => dispatch(setInput(e.target.value))}
              placeholder="Type a message..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              disabled={isTyping}
            />
          </div>
          
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={`p-3 rounded-full transition-all duration-300 touch-target ${
              input.trim() && !isTyping
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
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