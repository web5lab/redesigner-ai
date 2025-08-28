import { Send, Loader2, X, Sparkles, Bot, User, Zap, Crown, Settings, Minimize2, Maximize2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeBotSelector, inputSelector, isTypingSelector, messagesSelector, sessionIdSelector, uiConfigSelector } from '../store/global.Selctor';
import { addMessage, setInput, setIsTyping, setSessionId } from '../store/global.Slice';
import { geminiChatApi } from '../store/global.Action';


const THINKING_MESSAGES = [
  "Analyzing your request...",
  "Consulting the knowledge base...",
  "Generating the best response...",
  "Processing your question...",
  "Thinking carefully about this..."
];

export const ChatUI = () => {
  const dispatch = useDispatch();
  const uiConfig = useSelector(uiConfigSelector);
  const { customPrimaryColor, customSecondaryColor, customBgColor, themeMode, botAvatar, userAvatar, selectedFontSize, botName, customQuestions } = uiConfig;
  const currentBg = customBgColor;
  const currentPrimary = customPrimaryColor;
  const currentSecondary = customSecondaryColor;
  const messages = useSelector(messagesSelector);
  const input = useSelector(inputSelector);
  const isTyping = useSelector(isTypingSelector);
  const activeBot = useSelector(activeBotSelector);
  const sessionId = useSelector(sessionIdSelector);
  const [thinkingMessage, setThinkingMessage] = useState(THINKING_MESSAGES[0]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const userMessageStyle = {
    background: `linear-gradient(135deg, ${currentPrimary} 0%, ${currentSecondary} 100%)`,
    color: 'white',
    fontSize: selectedFontSize,
  };

  const botMessageStyle = {
    backgroundColor: themeMode === 'light' ? 'white' : '#374151',
    color: themeMode === 'light' ? '#111827' : '#f3f4f6',
    fontSize: selectedFontSize,
    boxShadow: themeMode === 'light' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
  };

  // Theme-aware input section styles
  const inputSectionStyle = {
    backgroundColor: themeMode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(55, 65, 81, 0.8)',
    borderTopColor: themeMode === 'light' ? 'rgba(229, 231, 235, 1)' : 'rgba(75, 85, 99, 1)',
  };

  const inputFieldStyle = {
    backgroundColor: themeMode === 'light' ? 'white' : '#1f2937',
    color: themeMode === 'light' ? '#111827' : '#f3f4f6',
    borderColor: `${currentPrimary}30`,
    fontSize: selectedFontSize,
  };

  const placeholderStyle = themeMode === 'light' ? 'placeholder-gray-500' : 'placeholder-gray-400';
  const textColorSecondary = themeMode === 'light' ? '#6b7280' : '#9ca3af';
  const textColorTertiary = themeMode === 'light' ? '#9ca3af' : '#6b7280';

  const setInputData = (value) => dispatch(setInput(value));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    dispatch(setIsTyping(true));
    dispatch(addMessage({ role: 'user', content: input }));
    dispatch(setInput(''));

    const thinkingInterval = setInterval(() => {
      setThinkingMessage(THINKING_MESSAGES[Math.floor(Math.random() * THINKING_MESSAGES.length)]);
    }, 2000);

    try {
      const Chatdata = await geminiChatApi({
        data: { message: input, botId: activeBot?._id, sessionId }
      });

      clearInterval(thinkingInterval);
      dispatch(setSessionId(Chatdata.sessionId));
      dispatch(addMessage({
        role: 'bot',
        content: Chatdata.aiResponse,
        animation: 'fadeIn'
      }));
    } catch (error) {
      clearInterval(thinkingInterval);
      dispatch(addMessage({
        role: 'bot',
        content: "Sorry, I encountered an error processing your request.",
        isError: true
      }));
    } finally {
      dispatch(setIsTyping(false));
    }
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => scrollToBottom(), [messages]);

  const chatHeight = isFullscreen ? 'h-screen' : isMinimized ? 'h-16' : 'h-[700px]';
  const chatWidth = isFullscreen ? 'w-screen' : 'w-[520px]';

  return (
    <div
      className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 flex flex-col relative ${chatHeight} ${chatWidth}`}
      style={{
        backgroundColor: themeMode === 'light' ? 'white' : '#1f2937',
        border: `2px solid ${currentPrimary}20`,
        boxShadow: `0 25px 50px -12px ${currentPrimary}40, 0 0 0 1px ${currentPrimary}10`
      }}
    >
      {/* Enhanced Header */}
      <div
        className="relative p-6 flex items-center justify-between overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${currentPrimary} 0%, ${currentSecondary} 100%)`,
        }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        <div className="relative flex items-center gap-4 flex-1">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
              {botAvatar ? (
                <img src={botAvatar} alt="Bot" className="w-10 h-10 rounded-xl object-cover" />
              ) : (
                <Bot className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-white font-bold text-lg">{botName || 'AI Assistant'}</h2>
              <Crown className="w-4 h-4 text-yellow-300" />
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              {isTyping ? (
                <>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span>Typing...</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Online • Ready to help</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="relative flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30"
            title={isMinimized ? "Expand" : "Minimize"}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4 text-white" /> : <Minimize2 className="w-4 h-4 text-white" />}
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            <Settings className="w-4 h-4 text-white" />
          </button>
          <button className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Enhanced Message Area */}
          <div className="flex-1 overflow-hidden relative" style={{ backgroundColor: currentBg }}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 rounded-full blur-3xl" style={{ backgroundColor: currentPrimary }}></div>
              <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full blur-2xl" style={{ backgroundColor: currentSecondary }}></div>
            </div>

            <div className="relative h-full overflow-y-auto custom-scrollbar p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="relative mb-6">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
                      style={{ backgroundColor: `${currentPrimary}20` }}
                    >
                      <Sparkles className="w-10 h-10" style={{ color: currentPrimary }} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: themeMode === 'light' ? currentPrimary : 'white' }}>
                    Hello! I'm {botName || 'your AI Assistant'}
                  </h3>
                  <p className="text-lg mb-6" style={{ color: themeMode === 'light' ? '#6b7280' : '#9ca3af' }}>
                    I'm here to help you with anything you need. What would you like to know?
                  </p>
                  <div className="flex items-center gap-2 text-sm" style={{ color: themeMode === 'light' ? '#6b7280' : '#9ca3af' }}>
                    <Zap className="w-4 h-4" />
                    <span>Powered by advanced AI technology</span>
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}>
                    <div className={`flex items-start gap-4 max-w-[85%] ${message.animation === 'fadeIn' ? 'animate-fadeIn' : ''}`}>
                      {message.role === 'bot' && (
                        <div className="relative">
                          <div className="w-10 h-10 rounded-2xl bg-white shadow-lg flex items-center justify-center border-2 border-gray-100">
                            {botAvatar ? (
                              <img src={botAvatar} alt="Bot" className="w-8 h-8 rounded-xl object-cover" />
                            ) : (
                              <Bot className="w-5 h-5" style={{ color: currentPrimary }} />
                            )}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                      )}

                      <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div
                          className={`rounded-2xl px-6 py-4 shadow-lg transition-all duration-200 hover:shadow-xl ${message.role === 'user'
                              ? 'rounded-br-none'
                              : 'rounded-bl-none'
                            } ${message.isError ? 'bg-red-100 text-red-800 border border-red-200' : ''}`}
                          style={message.role === 'user' ? userMessageStyle : botMessageStyle}
                        >
                          <p className="leading-relaxed" style={{ fontSize: selectedFontSize }}>
                            {message.content}
                          </p>
                        </div>
                        <div className="mt-2 text-xs flex items-center gap-1" style={{ color: textColorTertiary }}>
                          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          {message.role === 'user' && <span className="text-green-500">✓</span>}
                        </div>
                      </div>

                      {message.role === 'user' && (
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-600 shadow-lg flex items-center justify-center">
                          {userAvatar ? (
                            <img src={userAvatar} alt="User" className="w-8 h-8 rounded-xl object-cover" />
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-4 max-w-[80%]">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-lg flex items-center justify-center border-2 border-gray-100">
                      {botAvatar ? (
                        <img src={botAvatar} alt="Bot" className="w-8 h-8 rounded-xl object-cover" />
                      ) : (
                        <Bot className="w-5 h-5" style={{ color: currentPrimary }} />
                      )}
                    </div>
                    <div className="rounded-2xl rounded-bl-none px-6 py-4 shadow-lg" style={botMessageStyle}>
                      <div className="flex items-center gap-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: currentPrimary, animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: currentPrimary, animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: currentPrimary, animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-sm italic" style={{ color: themeMode === 'light' ? '#6b7280' : '#9ca3af' }}>
                          {thinkingMessage}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Enhanced Input Area - Now Theme Aware */}
          <div 
            className="p-6 border-t backdrop-blur-sm"
            style={inputSectionStyle}
          >
            {customQuestions.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {customQuestions.map((question, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setInputData(question)}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 shadow-sm"
                    style={{
                      backgroundColor: `${currentPrimary}15`,
                      color: currentPrimary,
                      border: `1px solid ${currentPrimary}30`
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-end gap-4">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={e => setInputData(e.target.value)}
                  placeholder="Ask me anything..."
                  rows={1}
                  className={`w-full px-6 py-4 pr-16 rounded-2xl border-2 focus:outline-none focus:ring-2 transition-all duration-200 resize-none shadow-sm ${placeholderStyle}`}
                  style={{
                    ...inputFieldStyle,
                    '--tw-ring-color': `${currentPrimary}40`,
                    minHeight: '56px',
                    maxHeight: '120px'
                  }}
                  disabled={isTyping}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <div className="absolute right-4 bottom-4 text-xs" style={{ color: textColorTertiary }}>
                  {input.length}/500
                </div>
              </div>
              <button
                type="submit"
                className={`relative p-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl group ${isTyping || !input.trim()
                    ? 'cursor-not-allowed'
                    : 'text-white hover:scale-105'
                  }`}
                style={{
                  backgroundColor: isTyping || !input.trim() ? (themeMode === 'light' ? '#f3f4f6' : '#374151') : currentPrimary,
                  background: !isTyping && input.trim() ? `linear-gradient(135deg, ${currentPrimary} 0%, ${currentSecondary} 100%)` : undefined,
                  color: isTyping || !input.trim() ? textColorTertiary : 'white'
                }}
                disabled={isTyping || !input.trim()}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {isTyping ? (
                  <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                ) : (
                  <Send className="w-5 h-5 relative z-10" />
                )}
              </button>
            </form>

            <div className="flex items-center justify-between mt-3 text-xs" style={{ color: textColorTertiary }}>
              <span>Press Enter to send, Shift + Enter for new line</span>
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3" />
                <span>AI-powered responses</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};