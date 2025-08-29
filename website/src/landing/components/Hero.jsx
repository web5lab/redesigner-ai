import React from 'react';
import { ArrowRight, Play, Bot, MessageSquare, Users, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

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

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all"
            >
              Get started
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-6 py-3 font-medium transition-colors">
              <Play className="w-4 h-4" />
              Watch demo
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
    </section>
  );
}