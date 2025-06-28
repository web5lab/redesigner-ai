import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Zap, LayoutDashboard, FileText, Image, Sparkles } from 'lucide-react';

const DashboardTour = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showAgain, setShowAgain] = useState(false);
  
  const totalSteps = 5;

  useEffect(() => {
    if (isOpen) {
      // Reset to first step when modal opens
      setCurrentStep(1);
      
      // Check if user has previously chosen not to show again
      const dontShowAgain = localStorage.getItem('dashboardTourDontShow') === 'true';
      setShowAgain(!dontShowAgain);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    if (!showAgain) {
      localStorage.setItem('dashboardTourDontShow', 'true');
    }
    onClose();
  };

  const steps = [
    {
      title: "Welcome to redesignr.ai",
      description: "Let's take a quick tour of your dashboard to help you get started with our AI-powered website builder.",
      icon: <Sparkles className="h-8 w-8 text-indigo-400" />
    },
    {
      title: "Create New Websites",
      description: "Click the 'New Website' button to start creating a new website. You can redesign existing sites, create blogs, documentation, or build from scratch.",
      icon: <Zap className="h-8 w-8 text-indigo-400" />
    },
    {
      title: "Manage Your Websites",
      description: "View and manage all your created websites. Preview, edit, export code, or share your designs with others.",
      icon: <LayoutDashboard className="h-8 w-8 text-indigo-400" />
    },
    {
      title: "Template Gallery",
      description: "Explore our collection of 1600+ professional templates. Choose a template and customize it to match your brand.",
      icon: <FileText className="h-8 w-8 text-indigo-400" />
    },
    {
      title: "Image to Code",
      description: "Convert any design image or mockup into clean, responsive code with our AI technology.",
      icon: <Image className="h-8 w-8 text-indigo-400" />
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-slate-800 rounded-xl max-w-md w-full border border-slate-700 shadow-2xl animate-fadeInScaleUp">
        {/* Progress bar */}
        <div className="h-1.5 bg-slate-700 rounded-t-xl overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        
        <div className="p-6">
          {/* Close button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700/50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Step content */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-indigo-500/20 rounded-full">
                {steps[currentStep - 1].icon}
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {steps[currentStep - 1].title}
            </h3>
            <p className="text-slate-300">
              {steps[currentStep - 1].description}
            </p>
          </div>
          
          {/* Step indicators */}
          <div className="flex justify-center mb-6">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
                  currentStep === index + 1 
                    ? 'bg-indigo-500 scale-125' 
                    : currentStep > index + 1 
                      ? 'bg-indigo-400/70' 
                      : 'bg-slate-600'
                }`}
              ></div>
            ))}
          </div>
          
          {/* Show again checkbox */}
          <div className="flex items-center justify-center mb-6">
            <label className="flex items-center text-sm text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={showAgain}
                onChange={() => setShowAgain(!showAgain)}
                className="mr-2 h-4 w-4 rounded border-slate-500 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-800"
              />
              Show this tour next time
            </label>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                currentStep === 1
                  ? 'text-slate-500 cursor-not-allowed'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all"
            >
              {currentStep === totalSteps ? (
                <>
                  <Check className="h-4 w-4" />
                  Get Started
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTour;