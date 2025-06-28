import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Wand2, LayoutGrid, FileText, Image, Zap, Settings, CreditCard } from 'lucide-react';

const TourStep = ({ title, description, icon: Icon, position, onNext, onClose, isLastStep }) => {
  return (
    <div 
      className={`fixed z-[100] bg-slate-800 border border-indigo-500/50 rounded-xl shadow-2xl p-6 max-w-sm animate-fadeIn ${position}`}
    >
      <div className="absolute -top-3 -right-3">
        <button 
          onClick={onClose}
          className="bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-full p-1.5 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex items-start gap-4 mb-4">
        <div className="p-2.5 bg-indigo-500/20 rounded-lg">
          <Icon className="h-6 w-6 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-slate-300 text-sm">{description}</p>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {isLastStep ? 'Finish Tour' : 'Next'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const PlatformTour = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTour, setShowTour] = useState(true);
  
  // Define tour steps
  const steps = [
    {
      title: "Welcome to redesignr.ai!",
      description: "Let's take a quick tour to help you get started with our platform. We'll show you how to create websites, access templates, and manage your account.",
      icon: Wand2,
      position: "top-1/4 left-1/2 transform -translate-x-1/2"
    },
    {
      title: "Create New Websites",
      description: "Click the 'New Website' button to start creating a new website. You can redesign existing sites, create blogs, documentation, or build from scratch.",
      icon: LayoutGrid,
      position: "top-32 right-8"
    },
    {
      title: "Your Websites",
      description: "All your created websites appear here. Preview, edit, or export the code for any website you've created.",
      icon: FileText,
      position: "top-1/3 left-1/2 transform -translate-x-1/2"
    },
    {
      title: "Template Gallery",
      description: "Browse our collection of 1600+ templates to jumpstart your website creation. Choose any template and customize it to your needs.",
      icon: Image,
      position: "top-1/2 left-80"
    },
    {
      title: "AI Credits",
      description: "Your available AI credits are displayed in the sidebar. Each website creation or redesign uses credits from your account.",
      icon: Zap,
      position: "bottom-1/3 left-80"
    },
    {
      title: "Account Settings",
      description: "Access your profile settings, billing information, and subscription plan details from the sidebar.",
      icon: Settings,
      position: "bottom-1/4 left-1/2 transform -translate-x-1/2"
    },
    {
      title: "Upgrade Your Plan",
      description: "Need more features? Click on 'Current Plan' in the sidebar to view and upgrade to premium plans with additional benefits.",
      icon: CreditCard,
      position: "bottom-1/3 right-8"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const completeTour = () => {
    setShowTour(false);
    localStorage.setItem('platformTourCompleted', 'true');
    if (onClose) onClose();
  };

  if (!showTour) return null;

  const currentStepData = steps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[90]" onClick={completeTour}></div>
      
      {/* Tour Step */}
      <TourStep
        title={currentStepData.title}
        description={currentStepData.description}
        icon={currentStepData.icon}
        position={currentStepData.position}
        onNext={handleNext}
        onClose={completeTour}
        isLastStep={currentStep === steps.length - 1}
      />
    </>
  );
};

export default PlatformTour;