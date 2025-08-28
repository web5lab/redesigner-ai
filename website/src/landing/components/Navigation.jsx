import React, { useState, useEffect } from 'react';
import { Bot, Menu, X, Sparkles, Zap, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Background Effects */}
      <div className="fixed top-0 left-0 right-0 h-20 overflow-hidden pointer-events-none z-40">
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-0 left-1/4 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/20'
          : 'bg-white/60 backdrop-blur-md'
        }`}>
        <div className="container mx-auto px-6 py-4 relative">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Bot className="w-6 h-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-2xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                    CustomerBot
                  </span>
                  <div className="flex items-center gap-2 -mt-1">
                    <div className="h-0.5 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span className="text-xs text-gray-500 font-medium">AI Powered</span>
                  </div>
                </div>

                <div className="relative">
                  <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg">
                    BETA
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-ping opacity-20"></div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {isMenuOpen ?
                <X className="w-5 h-5 text-gray-700 relative z-10" /> :
                <Menu className="w-5 h-5 text-gray-700 relative z-10" />
              }
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                <a href="#home" className="relative group px-4 py-2 rounded-xl transition-all duration-300">
                  <span className="relative z-10 text-gray-700 group-hover:text-blue-600 font-medium transition-colors">
                    Home
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-8 transition-all duration-300"></div>
                </a>

                <a href="#features" className="relative group px-4 py-2 rounded-xl transition-all duration-300">
                  <span className="relative z-10 text-gray-700 group-hover:text-blue-600 font-medium transition-colors">
                    Features
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-8 transition-all duration-300"></div>
                </a>

                <a href="#pricing" className="relative group px-4 py-2 rounded-xl transition-all duration-300">
                  <span className="relative z-10 text-gray-700 group-hover:text-blue-600 font-medium transition-colors">
                    Pricing
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-8 transition-all duration-300"></div>
                </a>
              </div>

              {/* Premium Dashboard Button */}
              <div className="relative">
                <button onClick={() => {
                  navigate('/dashboard');
                }} className="group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>

                  <div className="relative flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    <span>Dashboard</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>

                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-20 animate-pulse"></div>
                </button>

                {/* Floating notification */}
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="p-6 space-y-4">
                {/* Mobile Navigation Links */}
                <div className="space-y-3">
                  <a href="#home" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group" onClick={() => setIsMenuOpen(false)}>
                    <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform"></div>
                    <span className="text-gray-700 font-medium">Home</span>
                  </a>

                  <a href="#features" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group" onClick={() => setIsMenuOpen(false)}>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full group-hover:scale-125 transition-transform"></div>
                    <span className="text-gray-700 font-medium">Features</span>
                  </a>

                  <a href="#pricing" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group" onClick={() => setIsMenuOpen(false)}>
                    <div className="w-2 h-2 bg-purple-500 rounded-full group-hover:scale-125 transition-transform"></div>
                    <span className="text-gray-700 font-medium">Pricing</span>
                  </a>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                {/* Mobile Dashboard Button */}
                <button
                  className="w-full group relative flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <Crown className="w-5 h-5 relative" />
                  <span className="relative">Dashboard</span>
                  <Sparkles className="w-4 h-4 relative animate-pulse" />
                </button>

                {/* Status indicator */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>All systems operational</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom border gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      </nav>
    </>
  );
}