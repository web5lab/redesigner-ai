import React, { useState } from 'react';
import { ArrowRight, Play, Bot, MessageSquare, Users, Smartphone, Zap, CheckCircle, X } from 'lucide-react';

export default function Hero() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showIframe, setShowIframe] = useState(false);
  const [showChatbot, setShowChatbot] = useState(true);
  const [unreadCount, setUnreadCount] = useState(2);

  const handleSubmit = () => {
    if (!websiteUrl) {
      setErrorMessage('Please enter a website URL');
      return;
    }

    try {
      new URL(websiteUrl);
      setErrorMessage('');
      setShowIframe(true);
      setShowChatbot(true);
    } catch (error) {
      setErrorMessage('Please enter a valid URL (e.g., https://example.com)');
    }
  };

  const handleWatchDemo = () => {
    setWebsiteUrl('https://example.com');
    setShowIframe(true);
    setShowChatbot(true);
    setErrorMessage('');
  };

  return (
    <section className="relative pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            AI customer support
            <br />
            <span className="text-gray-600">with human backup</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Deploy intelligent chatbots that seamlessly hand off to human agents. 
            Support customers 24/7 from web and mobile app.
          </p>

          {/* Demo Input Section */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 relative w-full">
                  <input
                    type="url"
                    placeholder="Enter your website URL to see the demo"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full px-6 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Zap className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>Try Demo</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              {errorMessage && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-6 py-3 font-medium transition-colors">
              <Play className="w-4 h-4" />
              Or watch overview
            </button>
          </div>

          {/* Simple Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>99.9% uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>10k+ support teams</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Mobile app included</span>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Web Demo */}
          <div className="relative">
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
              {/* Browser Bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="bg-white border border-gray-200 rounded px-3 py-1 text-sm text-gray-600 max-w-xs mx-auto">
                    yoursite.com
                  </div>
                </div>
              </div>
              
              {/* Chat Interface */}
              <div className="h-80 bg-gray-50 p-6 relative">
                <div className="absolute bottom-6 right-6 w-72 h-64 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col">
                  {/* Chat Header */}
                  <div className="flex items-center gap-3 p-3 border-b border-gray-100">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">Support Bot</div>
                      <div className="text-xs text-green-600">Online</div>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 p-3 space-y-2 text-xs">
                    <div className="flex gap-2">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-2 h-2 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-lg px-2 py-1">
                        Hi! How can I help you?
                      </div>
                    </div>
                    
                    <div className="flex gap-2 justify-end">
                      <div className="bg-blue-500 text-white rounded-lg px-2 py-1">
                        I need help with billing
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-2 h-2 text-white" />
                      </div>
                      <div className="bg-orange-100 border border-orange-200 rounded-lg px-2 py-1">
                        <div className="text-orange-700">Connecting you with Sarah...</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Input */}
                  <div className="p-2 border-t border-gray-100">
                    <div className="flex gap-1">
                      <input 
                        className="flex-1 px-2 py-1 border border-gray-200 rounded text-xs" 
                        placeholder="Type a message..."
                        disabled
                      />
                      <button className="bg-blue-500 text-white p-1 rounded">
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile App Screenshots */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mobile app for agents</h3>
              <p className="text-gray-600 mb-6">
                Support teams can respond to customers from anywhere using our native mobile app. 
                Get notifications, manage conversations, and provide help on the go.
              </p>
            </div>

            {/* Mobile Screenshots */}
            <div className="flex gap-4 justify-center">
              {/* Mobile Screenshot 1 - Chat List */}
              <div className="w-48 h-96 bg-gray-900 rounded-3xl p-2 shadow-xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  {/* Status Bar */}
                  <div className="h-6 bg-gray-900 flex items-center justify-center">
                    <div className="text-white text-xs">9:41 AM</div>
                  </div>
                  
                  {/* App Header */}
                  <div className="p-4 border-b border-gray-100">
                    <h4 className="font-bold text-gray-900">Support Chats</h4>
                    <p className="text-sm text-gray-600">3 active conversations</p>
                  </div>
                  
                  {/* Chat List */}
                  <div className="p-2 space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm">John D.</div>
                        <div className="text-xs text-gray-600 truncate">Need help with account...</div>
                      </div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm">Sarah M.</div>
                        <div className="text-xs text-gray-600 truncate">Payment issue resolved</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 rounded-lg">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm">Mike R.</div>
                        <div className="text-xs text-gray-600 truncate">Technical question</div>
                      </div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Screenshot 2 - Chat Interface */}
              <div className="w-48 h-96 bg-gray-900 rounded-3xl p-2 shadow-xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  {/* Status Bar */}
                  <div className="h-6 bg-gray-900 flex items-center justify-center">
                    <div className="text-white text-xs">9:41 AM</div>
                  </div>
                  
                  {/* Chat Header */}
                  <div className="flex items-center gap-3 p-3 border-b border-gray-100">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">John D.</div>
                      <div className="text-xs text-green-600">Agent: You</div>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 p-3 space-y-2">
                    <div className="flex gap-2">
                      <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-2 h-2 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-lg px-2 py-1 text-xs">
                        I can't access my account
                      </div>
                    </div>
                    
                    <div className="flex gap-2 justify-end">
                      <div className="bg-blue-500 text-white rounded-lg px-2 py-1 text-xs">
                        I can help you with that. Let me check your account status.
                      </div>
                    </div>
                    
                    <div className="flex gap-2 justify-end">
                      <div className="bg-blue-500 text-white rounded-lg px-2 py-1 text-xs">
                        I've reset your password. Check your email for the new login details.
                      </div>
                    </div>
                  </div>
                  
                  {/* Input */}
                  <div className="p-2 border-t border-gray-100">
                    <div className="flex gap-1">
                      <input 
                        className="flex-1 px-2 py-1 border border-gray-200 rounded text-xs" 
                        placeholder="Type a message..."
                        disabled
                      />
                      <button className="bg-blue-500 text-white p-1 rounded">
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Features */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600">Real-time chat</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-500" />
                <span className="text-gray-600">Team collaboration</span>
              </div>
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-500" />
                <span className="text-gray-600">AI handoff</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600">Push notifications</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Website Preview Modal */}
      {showIframe && (
        <div className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="relative w-full h-full max-w-screen-xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Enhanced Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full">
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-bold">Live Demo</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 truncate max-w-[calc(100%-200px)]">
                  {websiteUrl || 'Demo Website'}
                </h3>
              </div>
              <button
                onClick={() => setShowIframe(false)}
                className="p-3 text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
                title="Close preview"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden">
              <iframe
                src={websiteUrl || 'https://example.com'}
                className="w-full h-full border-none"
                title="Website Preview"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />

              {/* Enhanced Chatbot Overlay */}
              {showChatbot ? (
                <div className="absolute bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">AI Support</div>
                        <div className="text-sm text-green-600 flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Online
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowChatbot(false)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3">
                        <p className="text-sm text-gray-900">
                          Hello! I'm your AI assistant. How can I help you today?
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 justify-end">
                      <div className="bg-blue-500 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-xs">
                        <p className="text-sm">
                          I'm having trouble with my recent order
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3">
                        <p className="text-sm text-gray-900">
                          I'd be happy to help with your order. Can you provide your order number?
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-2xl rounded-tl-md px-4 py-3">
                        <p className="text-sm text-orange-700">
                          <CheckCircle className="w-4 h-4 inline mr-2" />
                          Connecting you to a human agent...
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Input Area */}
                  <div className="p-4 border-t border-gray-100 bg-gray-50">
                    <div className="flex gap-2">
                      <input 
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Type your message..."
                        disabled
                      />
                      <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute bottom-6 right-6 z-50">
                  <button
                    onClick={() => {
                      setShowChatbot(true);
                      setUnreadCount(0);
                    }}
                    className="group relative w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    title="Open chat"
                  >
                    <MessageSquare className="w-7 h-7 text-white" />
                    
                    {unreadCount > 0 && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-bounce">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </div>
                    )}
                    
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 animate-ping opacity-20"></div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}