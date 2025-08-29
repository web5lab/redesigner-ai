import { Send, Loader2, X, Bot, User, Settings, Minimize2, Maximize2 } from 'lucide-react';
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
  const messages = useSelector(messagesSelector);
  const input = useSelector(inputSelector);
  const isTyping = useSelector(isTypingSelector);
  const activeBot = useSelector(activeBotSelector);
  const sessionId = useSelector(sessionIdSelector);
  const [thinkingMessage, setThinkingMessage] = useState(THINKING_MESSAGES[0]);
  const [isMinimized, setIsMinimized] = useState(false);

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

  const chatHeight = isMinimized ? 'h-16' : 'h-[700px]';

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-500 flex flex-col relative ${chatHeight} w-[520px]`}>
      {/* Header */}
      <div className="bg-gray-50 p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
              {botAvatar ? (
                <img src={botAvatar} alt="Bot" className="w-8 h-8 rounded-lg object-cover" />
              ) : (
                <Bot className="w-5 h-5 text-gray-600" />
              )}
            </div>
            <div>
              <h2 className="text-gray-900 font-semibold">{botName || 'AI Assistant'}</h2>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                {isTyping ? (
                  <>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span>Typing...</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Online</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4 text-gray-600" /> : <Minimize2 className="w-4 h-4 text-gray-600" />}
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Message Area */}
          <div className="flex-1 overflow-hidden" style={{ backgroundColor: customBgColor }}>
            <div className="h-full overflow-y-auto p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mb-6 border border-gray-200">
                    <Bot className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Hello! I'm {botName || 'your AI Assistant'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    I'm here to help you with anything you need. What would you like to know?
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className="flex items-start gap-4 max-w-[85%]">
                      {message.role === 'bot' && (
                        <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                          {botAvatar ? (
                            <img src={botAvatar} alt="Bot" className="w-6 h-6 rounded-lg object-cover" />
                          ) : (
                            <Bot className="w-4 h-4 text-gray-600" />
                          )}
                        </div>
                      )}

                      <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div
                          className={`rounded-lg px-4 py-3 border ${
                            message.role === 'user'
                              ? 'bg-gray-900 text-white border-gray-900'
                              : message.isError 
                                ? 'bg-red-50 text-red-800 border-red-200' 
                                : 'bg-white text-gray-900 border-gray-200'
                          }`}
                          style={{ fontSize: selectedFontSize }}
                        >
                          <p className="leading-relaxed">{message.content}</p>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          {message.role === 'user' && <span className="text-green-500 ml-1">✓</span>}
                        </div>
                      </div>

                      {message.role === 'user' && (
                        <div className="w-8 h-8 rounded-lg bg-gray-600 border border-gray-600 flex items-center justify-center">
                          {userAvatar ? (
                            <img src={userAvatar} alt="User" className="w-6 h-6 rounded-lg object-cover" />
                          ) : (
                            <User className="w-4 h-4 text-white" />
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
                    <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                      {botAvatar ? (
                        <img src={botAvatar} alt="Bot" className="w-6 h-6 rounded-lg object-cover" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div className="rounded-lg px-4 py-3 bg-white border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-sm italic text-gray-500">{thinkingMessage}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-200 bg-white">
            {customQuestions.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {customQuestions.map((question, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setInputData(question)}
                    className="px-4 py-2 rounded-full text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
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
                  className="w-full px-4 py-3 pr-16 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                  style={{
                    minHeight: '48px',
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
                <div className="absolute right-4 bottom-3 text-xs text-gray-500">
                  {input.length}/500
                </div>
              </div>
              <button
                type="submit"
                className={`p-3 rounded-lg transition-all ${
                  isTyping || !input.trim()
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
                disabled={isTyping || !input.trim()}
              >
                {isTyping ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>

            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <span>Press Enter to send, Shift + Enter for new line</span>
              <span>AI-powered responses</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};