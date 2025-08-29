import React, { useState } from 'react';
import { ArrowRight, Play, Bot, MessageSquare, Users, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Bot className="w-4 h-4" />
            AI Customer Support
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Support that scales
            <br />
            <span className="text-gray-600">with your business</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            AI-powered customer support with seamless human handoff. 
            Deploy in minutes, support customers 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => navigate('/dashboard')}
              className="group flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all"
            >
              Get started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
              <span>10k+ businesses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>50+ languages</span>
            </div>
          </div>
        </div>

        {/* Demo Preview */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden">
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
            <div className="h-96 bg-gray-50 relative overflow-hidden">
              <div className="absolute bottom-6 right-6 w-80 h-80 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Support Assistant</div>
                    <div className="text-sm text-green-600">Online</div>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 space-y-3 overflow-hidden">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm">
                      Hi! How can I help you today?
                    </div>
                  </div>
                  
                  <div className="flex gap-2 justify-end">
                    <div className="bg-blue-500 text-white rounded-lg px-3 py-2 text-sm">
                      I need help with billing
                    </div>
                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-orange-100 border border-orange-200 rounded-lg px-3 py-2 text-sm">
                      <div className="flex items-center gap-2 text-orange-700">
                        <Zap className="w-3 h-3" />
                        Connecting you with Sarah from billing...
                      </div>
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
        </div>
      </div>
    </section>
  );
};