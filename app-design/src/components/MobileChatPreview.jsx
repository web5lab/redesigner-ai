import { Bot, User, Send, Crown, Sparkles } from 'lucide-react'

export function MobileChatPreview({ config }) {
  const {
    customPrimaryColor = '#3B82F6',
    customSecondaryColor = '#1c1d1d',
    customBgColor = '#f0f9ff',
    botName = 'AI Assistant',
    welcomeMessage = 'Hello! How can I help you today?',
    selectedFontSize = '16px'
  } = config

  return (
    <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Chat Header */}
      <div
        className="p-4 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${customPrimaryColor} 0%, ${customSecondaryColor} 100%)`
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10"></div>
        </div>

        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold">{botName}</h3>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
          <Crown className="w-4 h-4 text-yellow-300" />
        </div>
      </div>

      {/* Messages Area */}
      <div 
        className="flex-1 p-4 space-y-4 overflow-y-auto"
        style={{ backgroundColor: customBgColor }}
      >
        {/* Welcome Message */}
        <div className="flex justify-start">
          <div className="flex items-start gap-3 max-w-[85%]">
            <div className="w-8 h-8 rounded-xl bg-white shadow-lg flex items-center justify-center">
              <Bot className="w-4 h-4" style={{ color: customPrimaryColor }} />
            </div>
            <div className="bg-white rounded-2xl rounded-bl-lg px-4 py-3 shadow-lg border border-gray-200">
              <p className="text-sm" style={{ fontSize: selectedFontSize }}>
                {welcomeMessage}
              </p>
              <p className="text-xs text-gray-500 mt-1">Just now</p>
            </div>
          </div>
        </div>

        {/* Sample User Message */}
        <div className="flex justify-end">
          <div className="flex items-start gap-3 max-w-[85%]">
            <div
              className="rounded-2xl rounded-br-lg px-4 py-3 shadow-lg text-white"
              style={{
                background: `linear-gradient(135deg, ${customPrimaryColor} 0%, ${customSecondaryColor} 100%)`
              }}
            >
              <p className="text-sm" style={{ fontSize: selectedFontSize }}>
                Hello! I'd like to know more about your services.
              </p>
              <p className="text-xs text-white/70 mt-1">Just now</p>
            </div>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Sample Bot Response */}
        <div className="flex justify-start">
          <div className="flex items-start gap-3 max-w-[85%]">
            <div className="w-8 h-8 rounded-xl bg-white shadow-lg flex items-center justify-center">
              <Bot className="w-4 h-4" style={{ color: customPrimaryColor }} />
            </div>
            <div className="bg-white rounded-2xl rounded-bl-lg px-4 py-3 shadow-lg border border-gray-200">
              <p className="text-sm text-gray-800" style={{ fontSize: selectedFontSize }}>
                I'd be happy to help! I can provide information about our products, pricing, and support options. What specific area interests you most?
              </p>
              <p className="text-xs text-gray-500 mt-1">Just now</p>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 focus:border-blue-500 transition-all"
              style={{ borderColor: `${customPrimaryColor}30` }}
            />
          </div>
          <button
            className="p-3 rounded-2xl text-white shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${customPrimaryColor} 0%, ${customSecondaryColor} 100%)`
            }}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}