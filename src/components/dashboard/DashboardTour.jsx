import React, { useState, useEffect } from 'react';
import { 
  X, ChevronRight, ChevronLeft, Check, Zap, LayoutDashboard, 
  FileText, Image, Sparkles, Github, Newspaper, Code, 
  PlusCircle, Wand2, Download, Share2, Layers, Palette
} from 'lucide-react';

const DashboardTour = ({ isOpen, onClose, setActiveTab }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showAgain, setShowAgain] = useState(false);
  
  const totalSteps = 8;

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

  const handleTabChange = (tab) => {
    if (setActiveTab) {
      setActiveTab(tab);
    }
    handleNext();
  };

  const steps = [
    {
      title: "Welcome to redesignr.ai",
      description: "Let's take a quick tour of your dashboard to help you get started with our AI-powered website builder. We'll show you all the powerful features available to you.",
      icon: <Sparkles className="h-8 w-8 text-indigo-400" />,
      action: null
    },
    {
      title: "Create New Websites",
      description: "Click the 'New Website' button to start creating. You can redesign existing sites, create blogs, documentation sites, or build from scratch with AI assistance.",
      icon: <PlusCircle className="h-8 w-8 text-indigo-400" />,
      action: null
    },
    {
      title: "GitHub Documentation",
      description: "Transform any GitHub repository into beautiful, searchable documentation. Just paste your repo URL or README content and our AI will do the rest.",
      icon: <Github className="h-8 w-8 text-indigo-400" />,
      action: null
    },
    {
      title: "Blog Creation",
      description: "Generate SEO-optimized blog sites with just a topic. Our AI creates engaging content, proper structure, and responsive design automatically.",
      icon: <Newspaper className="h-8 w-8 text-indigo-400" />,
      action: null
    },
    {
      title: "Website Management",
      description: "View and manage all your created websites. Preview designs, export code, add new pages, and share your creations with others.",
      icon: <LayoutDashboard className="h-8 w-8 text-indigo-400" />,
      action: () => handleTabChange('websites')
    },
    {
      title: "Template Gallery",
      description: "Browse our collection of 1600+ professional templates. Remix any template with your own content or apply it to an existing website.",
      icon: <Layers className="h-8 w-8 text-indigo-400" />,
      action: () => handleTabChange('templates')
    },
    {
      title: "Image to Website",
      description: "Upload any design image or mockup and our AI will convert it into a fully functional, responsive website with clean code.",
      icon: <Image className="h-8 w-8 text-indigo-400" />,
      action: null
    },
    {
      title: "Export & Share",
      description: "Export your website's code for self-hosting or share a live preview link with clients and colleagues. Your creations are always accessible.",
      icon: <Download className="h-8 w-8 text-indigo-400" />,
      action: null
    }
  ];

  if (!isOpen) return null;

  const currentStep1Based = currentStep;
  const currentStepData = steps[currentStep1Based - 1];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-slate-800 rounded-xl max-w-md w-full border border-slate-700 shadow-2xl animate-fadeInScaleUp">
        {/* Progress bar */}
        <div className="h-1.5 bg-slate-700 rounded-t-xl overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
            style={{ width: `${(currentStep1Based / totalSteps) * 100}%` }}
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
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-indigo-500/20 rounded-full">
                {currentStepData.icon}
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {currentStepData.title}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {currentStepData.description}
            </p>
          </div>
          
          {/* Step indicators */}
          <div className="flex justify-center mb-6">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
                  currentStep1Based === index + 1 
                    ? 'bg-indigo-500 scale-125' 
                    : currentStep1Based > index + 1 
                      ? 'bg-indigo-400/70' 
                      : 'bg-slate-600'
                }`}
              ></div>
            ))}
          </div>
          
          {/* Show again checkbox */}
          <div className="flex items-center justify-center mb-8">
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
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep1Based === 1}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                currentStep1Based === 1
                  ? 'text-slate-500 cursor-not-allowed'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            
            {currentStepData.action ? (
              <button
                onClick={currentStepData.action}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all font-medium"
              >
                Try It Now
                <Zap className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all font-medium"
              >
                {currentStep1Based === totalSteps ? (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTour;