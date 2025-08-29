import React, { useState, useEffect } from 'react';
import { Bot, Menu, X } from 'lucide-react';
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200' 
        : 'bg-white/60 backdrop-blur-sm'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">CustomerBot</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Pricing
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Docs
            </a>
            <button 
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Sign in
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-all"
            >
              Get started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-4 pt-4">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">
                Pricing
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
                Docs
              </a>
              <button 
                onClick={() => navigate('/login')}
                className="text-left text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign in
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium text-left"
              >
                Get started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}