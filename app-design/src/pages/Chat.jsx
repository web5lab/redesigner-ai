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
  Refresh
} from 'lucide-react'
import { activeBotSelector, messagesSelector, inputSelector, isTypingSelector } from '../store/selectors'
import { addMessage, setInput, setIsTyping } from '../store/slice'

const THINKING_MESSAGES = [
  "Analyzing your request...",
  "Consulting knowledge base...",
  "Generating response...",
  "Processing your question..."
]

export function Chat() {
  const dispatch = useDispatch()
  const activeBot = useSelector(activeBotSelector)
  const messages = useSelector(messagesSelector)
  const input = useSelector(inputSelector)
  const isTyping = useSelector(isTypingSelector)
  const [thinkingMessage, setThinkingMessage] = useState(THINKING_MESSAGES[0])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    dispatch(setIsTyping(true))
    dispatch(addMessage({ role: 'user', content: input }))
    dispatch(setInput(''))

    const thinkingInterval = setInterval(() => {
      setThinkingMessage(THINKING_MESSAGES[Math.floor(Math.random() * THINKING_MESSAGES.length)])
    }, 2000)

    try {
      // Simulate AI response
      setTimeout(() => {
        clearInterval(thinkingInterval)
        dispatch(addMessage({
          role: 'bot',
          content: "I understand your question. Let me help you with that. This is a simulated response for the mobile app prototype.",
          animation: 'fadeIn'
        }))
        dispatch(setIsTyping(false))
      }, 2000)
    } catch (error) {
      clearInterval(thinkingInterval)
      dispatch(addMessage({
        role: 'bot',
        content: "Sorry, I encountered an error. Please try again.",
        isError: true
      }))
      dispatch(setIsTyping(false))
    }
  }

  const quickQuestions = [
    "How can I help you?",
    "Tell me about pricing",
    "How does setup work?",
    "Contact support"
  ]

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
            </div>
            
            <div>
              <h2 className="font-bold">{activeBot?.name || 'AI Assistant'}</h2>
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

          <button className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors touch-target">
            <MoreVertical className="w-5 h-5" />
          </button>
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
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
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
                      <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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
    </div>
  )
}