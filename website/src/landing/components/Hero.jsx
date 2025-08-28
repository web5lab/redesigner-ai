import React, { useState } from 'react';
import { ArrowRight, Play, Sparkles, Zap, Crown, Star, CheckCircle } from 'lucide-react';

export const Hero = () => {
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

  window.addEventListener("message", (event) => {
    if (event.data?.type === "CHATBOT") {
      setShowChatbot(false);
    }
  });

  return (
    <section className="relative mt-12 min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-indigo-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-to-tr from-purple-400/30 to-pink-600/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Enhanced Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full border border-blue-200 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">AI-Powered Revolution</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  Your Website's
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI Chatbot,
                </span>
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Built in Seconds
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </span>
              </h1>
            </div>

            {/* Enhanced Description */}
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Transform your website with an intelligent AI chatbot that understands your business, 
              <span className="font-semibold text-blue-600"> answers visitor questions instantly</span>, 
              and delights customers 24/7.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto lg:mx-0">
              {[
                'Instant Setup',
                'Smart Learning',
                '24/7 Availability',
                'Custom Branding'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50 shadow-sm">
                  <div className="p-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Enhanced CTA Section */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="url"
                      placeholder="Enter your website URL"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="w-full px-6 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all bg-white/80 backdrop-blur-sm"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Zap className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <span className="relative">Create My Bot</span>
                    <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                {errorMessage && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
                  </div>
                )}
              </div>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                        {i}
                      </div>
                    ))}
                  </div>
                  <span className="font-medium">10,000+ businesses trust us</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 font-medium">4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enhanced Demo */}
          <div className="relative flex justify-center items-center">
            <div className="relative">
              {/* Main Chat Demo */}
              <div className="w-96 h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 transform rotate-3 hover:rotate-0 transition-transform duration-700 ease-in-out">
                <iframe src='https://customerbot.in/chatbot' className='h-full w-full rounded-3xl' />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  Online
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  AI Powered
                </div>
              </div>

              <div className="absolute top-1/2 -right-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg">
                24/7
              </div>

              <div className="absolute top-1/4 -left-12 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg">
                Instant
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
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full">
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-bold">Live Preview</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 truncate max-w-[calc(100%-200px)]">{websiteUrl}</h3>
              </div>
              <button
                onClick={() => setShowIframe(false)}
                className="p-3 text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
                title="Close preview"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden">
              <iframe
                src={websiteUrl}
                className="w-full h-full border-none"
                title="Website Preview"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />

              {/* Enhanced Chatbot Overlay */}
              {showChatbot ? (
                <div className="absolute bottom-6 right-6 w-96 h-[600px] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
                  <iframe src='https://ai.customerbot.in/\' className='h-full w-full rounded-3xl' />
                </div>
              ) : (
                <div className="absolute bottom-6 right-6 z-50">
                  <button
                    onClick={() => setShowChatbot(true)}
                    className="group relative w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    title="Open chat"
                  >
                    <svg className="w-8 h-8 text-white group-hover:text-gray-100" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    
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
};