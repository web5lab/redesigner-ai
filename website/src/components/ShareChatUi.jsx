import { Send, Loader2, X, Sparkles, Bot, User, Zap, Crown, Settings, Minimize2, Maximize2 } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { geminiChatApi, getBotConfig } from '../store/global.Action';

const THINKING_MESSAGES = [
    "Analyzing your request...",
    "Consulting the knowledge base...",
    "Generating the best response...",
    "Processing your question...",
    "Thinking carefully about this..."
];

const LoadingScreen = () => {
    const [loadingText, setLoadingText] = useState("Initializing AI Assistant...");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const texts = [
            "Initializing AI Assistant...",
            "Loading configuration...",
            "Setting up your experience...",
            "Almost ready..."
        ];

        let textIndex = 0;
        const textInterval = setInterval(() => {
            textIndex = (textIndex + 1) % texts.length;
            setLoadingText(texts[textIndex]);
        }, 1500);

        // Simulate progress
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) return prev;
                return prev + Math.random() * 15;
            });
        }, 300);

        return () => {
            clearInterval(textInterval);
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Main Loading Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
                {/* Logo/Icon Section */}
                <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
                        <Bot className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                        <Crown className="w-4 h-4 text-white" />
                    </div>

                    {/* Rotating Ring */}
                    <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
                </div>

                {/* Loading Text */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4 animate-fadeIn">
                    {loadingText}
                </h2>

                {/* Progress Bar */}
                <div className="w-full max-w-xs mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Loading</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Loading Dots */}
                <div className="flex space-x-2 mb-8">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>

                {/* Features Preview */}
                <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2 justify-center opacity-80">
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        <span>AI-powered conversations</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center opacity-80">
                        <Zap className="w-4 h-4 text-green-500" />
                        <span>Lightning-fast responses</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center opacity-80">
                        <Crown className="w-4 h-4 text-purple-500" />
                        <span>Premium experience</span>
                    </div>
                </div>
            </div>

            {/* Bottom Branding */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-gray-500 text-sm">Powered by Advanced AI Technology</p>
                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-gray-400">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Secure & Private</span>
                </div>
            </div>
        </div>
    );
};

export const ShareChatUI = () => {
    const [customPrimaryColor, setCustomPrimaryColor] = useState();
    const [customSecondaryColor, setCustomSecondaryColor] = useState();
    const [customBgColor, setCustomBgColor] = useState();
    const [themeMode, setThemeMode] = useState();
    const [botAvatar, setBotAvatar] = useState();
    const [userAvatar, setUserAvatar] = useState();
    const [selectedFontSize, setSelectedFontSize] = useState();
    const [botName, setBotName] = useState();
    const [customQuestions, setCustomQuestions] = useState([]);
    const currentBg = customBgColor;
    const currentPrimary = customPrimaryColor;
    const currentSecondary = customSecondaryColor;
    const [messages, setMessages] = useState([{ role: 'bot', content: 'Hello! How can I help you today?' }]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState();
    const [activeBotId, setActiveBotId] = useState();
    const [sessionId, setSessionId] = useState();
    const [thinkingMessage, setThinkingMessage] = useState(THINKING_MESSAGES[0]);
    const [isLoading, setisLoading] = useState(true);



    useLayoutEffect(() => {
        const fetchThemeData = async () => {
            try {
                setisLoading(true);
                const query = new URLSearchParams(window.location.search);
                const id = query.get('id');
                console.log('id', id);
                if (id) {
                    setActiveBotId(id);
                    const data = await getBotConfig({ botId: id }); // Replace with your API endpoint
                    setCustomPrimaryColor(data.primaryColour);
                    setCustomSecondaryColor(data.secondaryColour);
                    setCustomBgColor(data.backgroundColour);
                    setThemeMode(data.themeMode);
                    setBotAvatar(data.icon);
                    setUserAvatar(data.userIcon);
                    setSelectedFontSize(data.typography);
                    setBotName(data.name);
                    setCustomQuestions(data.customQuestions);
                    setMessages([{ role: 'bot', content: data.welcomeMessage }]);
                    setInput('');
                    setIsTyping(false);
                    setSessionId(data.sessionId || null);
                }
            } catch (error) {
                console.error('Error fetching theme data:', error);
            } finally {
                setisLoading(false);
            }
        }
        fetchThemeData();
    }, [])


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
    const textColorTertiary = themeMode === 'light' ? '#9ca3af' : '#6b7280';

    const setInputData = (value) => setInput(value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        setIsTyping(true);
        let updatedMessages = [...messages, { role: 'user', content: input }];
        setMessages(updatedMessages);
        setInput('');

        const thinkingInterval = setInterval(() => {
            setThinkingMessage(THINKING_MESSAGES[Math.floor(Math.random() * THINKING_MESSAGES.length)]);
        }, 2000);

        try {
            const Chatdata = await geminiChatApi({
                data: { message: input, botId: activeBotId, sessionId }
            });

            clearInterval(thinkingInterval);
            setSessionId(Chatdata.sessionId);
            setMessages([...updatedMessages, { role: 'bot', content: Chatdata.aiResponse, animation: 'fadeIn' }]);
        } catch (error) {
            clearInterval(thinkingInterval);
            setMessages([...updatedMessages, { role: 'bot', content: "Sorry, I encountered an error processing your request.", isError: true }]);
        } finally {
            setIsTyping(false);
        }
    };

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    useEffect(() => scrollToBottom(), [messages]);

    return (
        <>
            {isLoading ? (<LoadingScreen />) : (<div
                className={` overflow-hidden transition-all duration-500 flex flex-col relative h-screen w-screen`}
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

                            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30"

                        >
                            <Maximize2 className="w-4 h-4 text-white" />
                        </button>

                    </div>
                </div>



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

            </div>)}

        </>
    );
};