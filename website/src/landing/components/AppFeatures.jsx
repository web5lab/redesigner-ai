import React from 'react';
import { 
  MessageSquare, 
  Users, 
  Smartphone, 
  Bot, 
  Bell, 
  BarChart3, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Globe,
  Headphones
} from 'lucide-react';

const mobileFeatures = [
  {
    icon: MessageSquare,
    title: 'Real-time Chat',
    description: 'Instant messaging with customers across all channels',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Seamless handoffs between AI and human agents',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Get notified about urgent conversations instantly',
    color: 'from-orange-500 to-amber-500'
  },
  {
    icon: BarChart3,
    title: 'Live Analytics',
    description: 'Monitor performance and customer satisfaction',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and compliance standards',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Sub-second response times with global CDN',
    color: 'from-yellow-500 to-orange-500'
  }
];

const appStats = [
  { label: 'Response Time', value: '<1s', icon: Clock },
  { label: 'Uptime', value: '99.9%', icon: Shield },
  { label: 'Languages', value: '50+', icon: Globe },
  { label: 'Support', value: '24/7', icon: Headphones }
];

export function AppFeatures() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full border border-blue-200 shadow-lg mb-6">
            <Smartphone className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Mobile App</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Support from
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Anywhere
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Empower your support team with our native mobile app. Respond to customers, manage conversations, and collaborate with your team on the go.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Mobile Screenshots */}
          <div className="relative">
            <div className="flex gap-8 justify-center">
              {/* Mobile Screenshot 1 - Chat List */}
              <div className="w-64 h-[500px] bg-gray-900 rounded-3xl p-3 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  {/* Status Bar */}
                  <div className="h-8 bg-gray-900 flex items-center justify-center">
                    <div className="text-white text-sm font-medium">9:41 AM</div>
                  </div>

                  {/* App Header */}
                  <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    <h4 className="font-bold text-lg">Support Chats</h4>
                    <p className="text-sm text-blue-100">3 active conversations</p>
                  </div>

                  {/* Chat List */}
                  <div className="p-3 space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900">John D.</div>
                        <div className="text-sm text-gray-600 truncate">Need help with account...</div>
                        <div className="text-xs text-gray-500">2 min ago</div>
                      </div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900">Sarah M.</div>
                        <div className="text-sm text-gray-600 truncate">Payment issue resolved</div>
                        <div className="text-xs text-gray-500">5 min ago</div>
                      </div>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900">Mike R.</div>
                        <div className="text-sm text-gray-600 truncate">Technical question</div>
                        <div className="text-xs text-gray-500">10 min ago</div>
                      </div>
                      <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Screenshot 2 - Chat Interface */}
              <div className="w-64 h-[500px] bg-gray-900 rounded-3xl p-3 shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  {/* Status Bar */}
                  <div className="h-8 bg-gray-900 flex items-center justify-center">
                    <div className="text-white text-sm font-medium">9:41 AM</div>
                  </div>

                  {/* Chat Header */}
                  <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">John D.</div>
                      <div className="text-sm text-blue-100 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Agent: You
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 space-y-3">
                    <div className="flex gap-2">
                      <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm">
                        I can't access my account
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <div className="bg-blue-500 text-white rounded-lg px-3 py-2 text-sm max-w-[80%]">
                        I can help you with that. Let me check your account status.
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <div className="bg-blue-500 text-white rounded-lg px-3 py-2 text-sm max-w-[80%]">
                        I've reset your password. Check your email for the new login details.
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 text-sm">
                        <CheckCircle className="w-3 h-3 inline mr-1 text-orange-600" />
                        <span className="text-orange-700">Connecting to human agent...</span>
                      </div>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="p-3 border-t border-gray-100">
                    <div className="flex gap-2">
                      <input
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        placeholder="Type a message..."
                        disabled
                      />
                      <button className="bg-blue-500 text-white p-2 rounded-lg">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 left-10 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 animate-float">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">24/7 Online</span>
              </div>
            </div>

            <div className="absolute bottom-10 left-10 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 animate-float" style={{animationDelay: '2s'}}>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Right Side - Features Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Mobile app for
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  support teams
                </span>
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Support teams can respond to customers from anywhere using our native mobile app.
                Get notifications, manage conversations, and provide help on the go.
              </p>
            </div>

            {/* App Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {appStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg text-center"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 inline-flex mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Mobile Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mobileFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Download CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                  <Smartphone className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold">Download the App</h4>
                  <p className="text-blue-100">Available for iOS and Android</p>
                </div>
              </div>
              
              <p className="text-blue-50 mb-6 leading-relaxed">
                Get the full CustomerBot experience on your mobile device. Manage support tickets, 
                respond to customers, and stay connected with your team wherever you are.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group inline-flex items-center gap-3 px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <span className="text-2xl">📱</span>
                  <div className="text-left">
                    <div className="text-sm">Download on the</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </button>
                <button className="group inline-flex items-center gap-3 px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <span className="text-2xl">🤖</span>
                  <div className="text-left">
                    <div className="text-sm">Get it on</div>
                    <div className="font-bold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Everything you need for modern customer support
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: MessageSquare, label: 'Real-time messaging' },
              { icon: Bot, label: 'AI-powered responses' },
              { icon: Users, label: 'Team collaboration' },
              { icon: BarChart3, label: 'Advanced analytics' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}