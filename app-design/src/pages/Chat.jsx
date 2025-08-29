import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
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
  Video,
  Paperclip,
  Image,
  FileText,
  Camera,
  ChevronDown,
  Check
} from 'lucide-react'
import { activeBotSelector, messagesSelector, inputSelector, isTypingSelector } from '../store/selectors'
import { botsSelector } from '../store/selectors'
import { addMessage, setInput, setIsTyping, setSessionId } from '../store/slice'
import { geminiChatApi, getChatSessions } from '../store/actions'

export function Chat() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const activeBot = useSelector(activeBotSelector)
  const bots = useSelector(botsSelector)
  const input = useSelector(inputSelector)
  const isTyping = useSelector(isTypingSelector)
  const [chatSessions, setChatSessions] = useState([])
  const [activeSessionId, setActiveSessionId] = useState(null)
  const [showSessionsList, setShowSessionsList] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [sessionMessages, setSessionMessages] = useState({})
  const [showBotSelector, setShowBotSelector] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const imageInputRef = useRef(null)

  const activeSession = chatSessions.find(session => session._id === activeSessionId)
  const messages = sessionMessages[activeSessionId] || []

  const filteredSessions = chatSessions.filter(session =>
    (session.title || session.name || 'Untitled Chat').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (session.lastMessage || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Load chat sessions when component mounts or activeBot changes
  useEffect(() => {
    if (activeBot?._id) {
      loadChatSessions()
    }
  }, [activeBot])

  // Close bot selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showBotSelector && !event.target.closest('.relative')) {
        setShowBotSelector(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showBotSelector])

  const loadChatSessions = async () => {
    try {
      const response = await dispatch(getChatSessions({ botId: activeBot._id }))
      if (response.payload) {
        setChatSessions(response.payload)
      }
    } catch (error) {
      console.error('Error loading chat sessions:', error)
    }
  }

  const loadSessionMessages = async (sessionId) => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/chat/get-chat-session/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const sessionData = await response.json()
      
      if (sessionData.messages) {
        setSessionMessages(prev => ({
          ...prev,
          [sessionId]: sessionData.messages
        }))
      }
    } catch (error) {
      console.error('Error loading session messages:', error)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Check URL for session parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const sessionId = params.get('session')
    if (sessionId) {
      const session = chatSessions.find(s => s._id === sessionId)
      if (session) {
        setActiveSessionId(session._id)
        setShowSessionsList(false)
        loadSessionMessages(session._id)
      }
    }
  }, [location.search, chatSessions])

  const createNewSession = async () => {
    if (!activeBot) return

    try {
      // Create a new session by sending the first message
      const welcomeMessage = activeBot.welcomeMessage || 'Hello! How can I help you today?'
      
      const newSessionData = {
        _id: `temp_${Date.now()}`,
        title: `New Chat ${chatSessions.length + 1}`,
        name: `New Chat ${chatSessions.length + 1}`,
        lastMessage: welcomeMessage,
        timestamp: new Date(),
        messageCount: 1,
        status: 'active',
        unread: 0,
        messages: [
          {
            _id: `msg_${Date.now()}`,
            role: 'bot',
            content: welcomeMessage,
            timestamp: new Date()
          }
        ]
      }

      setChatSessions(prev => [newSessionData, ...prev])
      setSessionMessages(prev => ({
        ...prev,
        [newSessionData._id]: newSessionData.messages
      }))
      setActiveSessionId(newSessionData._id)
      setShowSessionsList(false)
    } catch (error) {
      console.error('Error creating new session:', error)
    }
  }

  const openSession = (sessionId) => {
    setActiveSessionId(sessionId)
    setShowSessionsList(false)
    navigate(`/chat?session=${sessionId}`, { replace: true })
    
    // Load messages if not already loaded
    if (!sessionMessages[sessionId]) {
      loadSessionMessages(sessionId)
    }
    
    // Mark as read
    setChatSessions(prev => prev.map(session => 
      session._id === sessionId ? { ...session, unread: 0 } : session
    ))
  }

  const closeSession = () => {
    setActiveSessionId(null)
    setShowSessionsList(true)
    navigate('/chat', { replace: true })
  }

  const deleteSession = async (sessionId) => {
    try {
      const token = localStorage.getItem('authToken')
      await fetch(`${import.meta.env.VITE_SERVER_URL}/chat/delete-session/${sessionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      setChatSessions(prev => prev.filter(session => session._id !== sessionId))
      setSessionMessages(prev => {
        const newMessages = { ...prev }
        delete newMessages[sessionId]
        return newMessages
      })
      
      if (activeSessionId === sessionId) {
        closeSession()
      }
    } catch (error) {
      console.error('Error deleting session:', error)
    }
  }

  const formatTimestamp = (date) => {
    const now = new Date()
    const timestamp = new Date(date)
    const diff = now - timestamp
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

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setShowAttachmentMenu(false)
    }
  }

  const removeSelectedFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (imageInputRef.current) imageInputRef.current.value = ''
  }

  const sendFileMessage = () => {
    if (!selectedFile || !activeSession) return

    const fileMessage = {
      _id: `msg_${Date.now()}`,
      role: 'user',
      content: `📎 ${selectedFile.name}`,
      timestamp: new Date(),
      file: {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type
      }
    }

    setSessionMessages(prev => ({
      ...prev,
      [activeSessionId]: [...(prev[activeSessionId] || []), fileMessage]
    }))

    setChatSessions(prev => prev.map(session => 
      session._id === activeSessionId 
        ? {
            ...session,
            lastMessage: `📎 ${selectedFile.name}`,
            messageCount: (session.messageCount || 0) + 1,
            timestamp: new Date()
          }
        : session
    ))

    removeSelectedFile()

    // Simulate bot response to file
    setTimeout(() => {
      const botResponse = {
        _id: `msg_${Date.now() + 1}`,
        role: 'bot',
        content: `I've received your file "${selectedFile.name}". How can I help you with this?`,
        timestamp: new Date()
      }
      
      setSessionMessages(prev => ({
        ...prev,
        [activeSessionId]: [...(prev[activeSessionId] || []), botResponse]
      }))

      setChatSessions(prev => prev.map(session => 
        session._id === activeSessionId 
          ? {
              ...session,
              lastMessage: botResponse.content,
              messageCount: (session.messageCount || 0) + 1,
              timestamp: new Date()
            }
          : session
      ))
    }, 1000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isTyping || !activeBot) return

    dispatch(setIsTyping(true))
    
    const userMessage = {
      _id: `msg_${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    // Add message to current session
    setSessionMessages(prev => ({
      ...prev,
      [activeSessionId]: [...(prev[activeSessionId] || []), userMessage]
    }))

    // Update session in list
    setChatSessions(prev => prev.map(session => 
      session._id === activeSessionId 
        ? {
            ...session,
            lastMessage: input,
            messageCount: (session.messageCount || 0) + 1,
            timestamp: new Date()
          }
        : session
    ))
    
    const messageToSend = input
    dispatch(setInput(''))

    try {
      const chatData = await geminiChatApi({
        data: { 
          message: messageToSend, 
          botId: activeBot._id,
          sessionId: activeSessionId.startsWith('temp_') ? null : activeSessionId
        }
      })
      
      // Update session ID if it was temporary
      if (activeSessionId.startsWith('temp_') && chatData.sessionId) {
        const newSessionId = chatData.sessionId
        
        // Update the session ID in the sessions list
        setChatSessions(prev => prev.map(session => 
          session._id === activeSessionId 
            ? { ...session, _id: newSessionId }
            : session
        ))
        
        // Move messages to new session ID
        setSessionMessages(prev => {
          const messages = prev[activeSessionId] || []
          const newMessages = { ...prev }
          delete newMessages[activeSessionId]
          newMessages[newSessionId] = messages
          return newMessages
        })
        
        setActiveSessionId(newSessionId)
        dispatch(setSessionId(newSessionId))
      }
      
      const botResponse = {
        _id: `msg_${Date.now() + 1}`,
        role: 'bot',
        content: chatData.aiResponse,
        timestamp: new Date()
      }
      
      const finalSessionId = chatData.sessionId || activeSessionId
      
      setSessionMessages(prev => ({
        ...prev,
        [finalSessionId]: [...(prev[finalSessionId] || []), botResponse]
      }))

      setChatSessions(prev => prev.map(session => 
        session._id === finalSessionId 
          ? {
              ...session,
              lastMessage: botResponse.content,
              messageCount: (session.messageCount || 0) + 1,
              timestamp: new Date()
            }
          : session
      ))
      
      dispatch(setIsTyping(false))
    } catch (error) {
      const errorResponse = {
        _id: `msg_${Date.now() + 1}`,
        role: 'bot',
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
        isError: true
      }
      
      setSessionMessages(prev => ({
        ...prev,
        [activeSessionId]: [...(prev[activeSessionId] || []), errorResponse]
      }))

      setChatSessions(prev => prev.map(session => 
        session._id === activeSessionId 
          ? {
              ...session,
              lastMessage: errorResponse.content,
              messageCount: (session.messageCount || 0) + 1,
              timestamp: new Date()
            }
          : session
      ))
      dispatch(setIsTyping(false))
    }
  }

  const handleBotChange = (bot) => {
    dispatch(setActiveBot(bot))
    setShowBotSelector(false)
    // Reset chat state when switching bots
    setActiveSessionId(null)
    setShowSessionsList(true)
    setSessionMessages({})
    setChatSessions([])
    navigate('/chat', { replace: true })
    // Load new bot's sessions
    setTimeout(() => {
      if (bot._id) {
        loadChatSessions()
      }
    }, 100)
  }

  // Sessions List View (Mobile-optimized)
  if (showSessionsList || !activeSession) {
    return (
      <div className="h-full flex flex-col bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 safe-area-top">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/')}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-target"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                
                {/* Bot Selector Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowBotSelector(!showBotSelector)}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-2xl border border-gray-200 dark:border-gray-600 transition-colors min-w-[200px]"
                  >
                    <div className="w-8 h-8 rounded-xl overflow-hidden shadow-md ring-2 ring-gray-100 dark:ring-gray-600 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      {activeBot?.icon ? (
                        <img
                          src={activeBot.icon}
                          alt={activeBot.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <h2 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                        {activeBot?.name || 'Select Bot'}
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {chatSessions.length} conversations
                      </p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showBotSelector ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showBotSelector && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-64 overflow-y-auto animate-slide-down">
                      <div className="p-2">
                        {bots.map((bot) => (
                          <button
                            key={bot._id}
                            onClick={() => handleBotChange(bot)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                              activeBot?._id === bot._id
                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-xl overflow-hidden shadow-md ring-2 ring-gray-100 dark:ring-gray-600 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                              {bot.icon ? (
                                <img
                                  src={bot.icon}
                                  alt={bot.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Bot className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className="flex-1 text-left min-w-0">
                              <h3 className="text-sm font-semibold truncate">{bot.name}</h3>
                              <p className="text-xs opacity-75 truncate">
                                {bot.description || 'AI Assistant'}
                              </p>
                            </div>
                            {activeBot?._id === bot._id && (
                              <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            )}
                          </button>
                        ))}
                        
                        {bots.length === 0 && (
                          <div className="p-4 text-center">
                            <Bot className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">No bots available</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={createNewSession}
                className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-5 h-5" />
              </button>
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
                key={session._id}
                onClick={() => openSession(session._id)}
                className="w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left group"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg ring-2 ring-gray-100 dark:ring-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      {activeBot?.icon ? (
                        <img
                          src={activeBot.icon}
                          alt={session.title || session.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Bot className="w-6 h-6 text-white" />
                      )}
                    </div>
                    {session.status === 'active' && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {session.title || session.name || `Chat ${session._id.slice(-6)}`}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTimestamp(session.timestamp || session.updatedAt)}
                        </span>
                        {session.unread > 0 && (
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{session.unread}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-1">
                      {session.lastMessage || 'No messages yet'}
                    </p>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{session.messageCount || 0} messages</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        session.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteSession(session._id)
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
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
                    : `Start your first conversation with ${activeBot?.name || 'your AI assistant'}`
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

  // Individual Chat View (Mobile-optimized)
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
            
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-md ring-2 ring-gray-100 dark:ring-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              {activeBot?.icon ? (
                <img
                  src={activeBot.icon}
                  alt={activeBot.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900 dark:text-white truncate">
                {activeBot?.name || 'AI Assistant'}
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
              <button
                onClick={() => deleteSession(activeSessionId)}
                className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors touch-target"
              >
                <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50 dark:bg-gray-900">
        <div className="p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Start a conversation
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Send a message to begin chatting with {activeBot?.name || 'your AI assistant'}
                </p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={message._id || index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end gap-2 max-w-[85%] group`}>
                  {message.role === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      {activeBot?.icon ? (
                        <img
                          src={activeBot.icon}
                          alt="Bot"
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
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
            ))
          )}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-end gap-2 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                  {activeBot?.icon ? (
                    <img
                      src={activeBot.icon}
                      alt="Bot"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3 shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-xs text-gray-500 italic">AI is thinking...</span>
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
        {/* File Preview */}
        {selectedFile && (
          <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                  {selectedFile.type.startsWith('image/') ? (
                    <Image className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={sendFileMessage}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Send
                </button>
                <button
                  onClick={removeSelectedFile}
                  className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          {/* Attachment Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors touch-target"
            >
              <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            {/* Attachment Menu */}
            {showAttachmentMenu && (
              <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-slide-up">
                <div className="p-2">
                  <button
                    onClick={() => {
                      imageInputRef.current?.click()
                      setShowAttachmentMenu(false)
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Image className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Photo</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      fileInputRef.current?.click()
                      setShowAttachmentMenu(false)
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors"
                  >
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Document</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowAttachmentMenu(false)
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors"
                  >
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Camera className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Camera</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => dispatch(setInput(e.target.value))}
              placeholder="Type a message..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              disabled={isTyping}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
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

        {/* Hidden File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
          onChange={handleFileSelect}
          className="hidden"
        />
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  )
}