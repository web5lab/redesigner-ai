import React, { useState, useEffect } from 'react';
import { X, Wand2, Rocket, Sparkles, ArrowRight } from 'lucide-react';
import logo from "../../assets/logo.png";

const WelcomeModal = ({ user, onClose, onStartTour }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to redesignr.ai!",
      description: "We're excited to have you on board. Our AI-powered platform makes it easy to create stunning websites in minutes.",
      icon: <Wand2 className="h-12 w-12 text-indigo-400" />
    },
    {
      title: "Create Websites with AI",
      description: "Redesign existing sites, create blogs, documentation, or build from scratch - all powered by advanced AI technology.",
      icon: <Rocket className="h-12 w-12 text-purple-400" />
    },
    {
      title: "Ready to Get Started?",
      description: "Let's take a quick tour of the platform to help you make the most of redesignr.ai.",
      icon: <Sparkles className="h-12 w-12 text-emerald-400" />
    }
  ];

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('welcomeModalShown', 'true');
    if (onClose) onClose();
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleClose();
      if (onStartTour) onStartTour();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 rounded-xl max-w-md w-full border border-slate-700/50 shadow-2xl overflow-hidden">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700/50 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        {/* Logo and header */}
        <div className="pt-8 pb-4 px-6 text-center">
          <img src={logo} alt="redesignr.ai Logo" className="h-16 w-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">
            redesignr<span className="text-purple-400">.ai</span>
          </h2>
        </div>
        
        {/* Slide content */}
        <div className="px-8 pb-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-slate-700/50 rounded-full">
              {slides[currentSlide].icon}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white text-center mb-3">
            {slides[currentSlide].title}
          </h3>
          
          <p className="text-slate-300 text-center mb-8">
            {slides[currentSlide].description}
          </p>
          
          {/* Progress indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8 bg-indigo-500' 
                    : 'w-4 bg-slate-600'
                }`}
              ></div>
            ))}
          </div>
          
          {/* Action button */}
          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            {currentSlide < slides.length - 1 ? 'Next' : 'Start Tour'}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;