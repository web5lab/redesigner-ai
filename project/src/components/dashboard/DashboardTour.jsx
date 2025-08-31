import React, { useState, useEffect } from 'react';
import { 
  X, ChevronRight, ChevronLeft, Check, Zap, LayoutDashboard, 
  FileText, Image, Sparkles, MessageSquare, Github, Globe, 
  Code, Palette, Layers, Share2, Download, ExternalLink,
  Eye, Users, Wand2, Search, Upload, Smartphone, Code2
} from 'lucide-react';

const DashboardTour = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showAgain, setShowAgain] = useState(true);
  
  const totalSteps = 7;

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
      icon: <Sparkles className="h-8 w-8 text-indigo-400" />,
      image: "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      title: "Create New Websites",
      description: "Click the 'New Website' button to start creating a new website. You can redesign existing sites, create blogs, documentation, or build from scratch.",
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
      image: "https://images.pexels.com/photos/5926393/pexels-photo-5926393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      title: "Manage Your Websites",
      description: "View and manage all your created websites. Preview, edit, export code, or share your designs with others.",
      icon: <LayoutDashboard className="h-8 w-8 text-blue-400" />,
      image: "https://images.pexels.com/photos/5926389/pexels-photo-5926389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      gradient: "from-blue-500 to-cyan-500"
    },
   
    {
      title: "Template Gallery",
      description: "Explore our collection of 1600+ professional templates. Choose a template and customize it to match your brand.",
      icon: <FileText className="h-8 w-8 text-purple-400" />,
      image: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "GitHub Docs Generator",
      description: "Transform your GitHub repositories into beautiful documentation sites. Just paste your repo URL and let our AI do the rest.",
      icon: <Github className="h-8 w-8 text-slate-300" />,
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      gradient: "from-slate-500 to-slate-700"
    },
    // {
    //   title: "Image to Code",
    //   description: "Convert any design image or mockup into clean, responsive code with our AI technology. Just upload your image and we'll generate the code.",
    //   icon: <Image className="h-8 w-8 text-rose-400" />,
    //   image: "https://images.pexels.com/photos/5926386/pexels-photo-5926386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //   gradient: "from-rose-500 to-red-500"
    // },
    {
      title: "Export & Deploy",
      description: "Export your designs as clean HTML/CSS code or deploy directly to your hosting provider. Your websites are ready for production use.",
      icon: <Download className="h-8 w-8 text-teal-400" />,
      image: "https://images.pexels.com/photos/5926383/pexels-photo-5926383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      gradient: "from-teal-500 to-emerald-500"
    },
     {
      title: "Community Chat",
      description: "Connect with other users, share your designs, and get inspired by the community. Ask questions and provide feedback to fellow designers.",
      icon: <MessageSquare className="h-8 w-8 text-green-400" />,
      image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      gradient: "from-green-500 to-emerald-500"
    },
  ];

  if (!isOpen) return null;

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-slate-800 rounded-xl max-w-3xl w-full border border-slate-700 shadow-2xl animate-fadeInScaleUp overflow-hidden">
        {/* Progress bar */}
        <div className="h-1.5 bg-slate-700 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${currentStepData.gradient} transition-all duration-300`}
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative hidden md:block">
            <img 
              src={currentStepData.image} 
              alt={currentStepData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent"></div>
            
            {/* Step number */}
            <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-white border border-white/20">
              Step {currentStep} of {totalSteps}
            </div>
            
            {/* Close button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Content Section */}
          <div className="p-6 md:p-8">
            {/* Mobile-only header */}
            <div className="flex justify-between items-center mb-4 md:hidden">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-white border border-white/20">
                Step {currentStep} of {totalSteps}
              </div>
              <button 
                onClick={handleClose}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700/50 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Step content */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className={`p-3 bg-gradient-to-r ${currentStepData.gradient} rounded-full`}>
                  {currentStepData.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {currentStepData.title}
              </h3>
              <p className="text-slate-300">
                {currentStepData.description}
              </p>
            </div>
            
            {/* Feature highlights for each step */}
            <div className="mb-8">
              {currentStep === 1 && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Palette className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">AI-Powered Design</h4>
                      <p className="text-slate-400 text-xs">Create stunning websites with our advanced AI technology</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Layers className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">1600+ Templates</h4>
                      <p className="text-slate-400 text-xs">Choose from our vast library of professional templates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Code className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Clean Code Export</h4>
                      <p className="text-slate-400 text-xs">Get production-ready HTML/CSS code for your projects</p>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Globe className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Website Redesign</h4>
                      <p className="text-slate-400 text-xs">Transform any existing website with a fresh, modern design</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <FileText className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Blog Creation</h4>
                      <p className="text-slate-400 text-xs">Generate SEO-optimized blogs with beautiful layouts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Github className="h-5 w-5 text-slate-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Documentation Sites</h4>
                      <p className="text-slate-400 text-xs">Create beautiful docs from your GitHub repositories</p>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Eye className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Live Preview</h4>
                      <p className="text-slate-400 text-xs">See your website in action before finalizing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Code className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Export Code</h4>
                      <p className="text-slate-400 text-xs">Download clean, production-ready HTML/CSS</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Share2 className="h-5 w-5 text-pink-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Share Designs</h4>
                      <p className="text-slate-400 text-xs">Share your creations with clients or the community</p>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 7 && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Real-time Chat</h4>
                      <p className="text-slate-400 text-xs">Connect with other designers and developers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Share2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Share Your Work</h4>
                      <p className="text-slate-400 text-xs">Showcase your designs and get feedback</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Users className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Connect with Peers</h4>
                      <p className="text-slate-400 text-xs">Build your network and find collaboration opportunities</p>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 4 && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Layers className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">1600+ Templates</h4>
                      <p className="text-slate-400 text-xs">Browse our extensive collection of professional templates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Wand2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Remix Templates</h4>
                      <p className="text-slate-400 text-xs">Customize any template to match your brand</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Zap className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">One-Click Apply</h4>
                      <p className="text-slate-400 text-xs">Apply templates to existing websites instantly</p>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 5 && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Github className="h-5 w-5 text-slate-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">GitHub Integration</h4>
                      <p className="text-slate-400 text-xs">Connect directly to your GitHub repositories</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Search className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Searchable Docs</h4>
                      <p className="text-slate-400 text-xs">Create docs with powerful search functionality</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Code className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Code Highlighting</h4>
                      <p className="text-slate-400 text-xs">Beautiful syntax highlighting for your code examples</p>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 8 && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Upload className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Upload Any Image</h4>
                      <p className="text-slate-400 text-xs">Convert mockups, screenshots, or hand-drawn sketches</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Code className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Clean Code Output</h4>
                      <p className="text-slate-400 text-xs">Get production-ready HTML/CSS from your images</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Smartphone className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Responsive Design</h4>
                      <p className="text-slate-400 text-xs">AI ensures your design works on all devices</p>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 6 && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Download className="h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">Export as HTML/CSS</h4>
                      <p className="text-slate-400 text-xs">Download clean, optimized code for your projects</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <ExternalLink className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">One-Click Deploy</h4>
                      <p className="text-slate-400 text-xs">Deploy directly to Netlify, Vercel, or GitHub Pages</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <Code2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-white text-sm">React Components</h4>
                      <p className="text-slate-400 text-xs">Export as React components for your applications</p>
                    </div>
                  </div>
                </div>
              )}
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
                className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  currentStep === totalSteps
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600'
                }`}
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
    </div>
  );
};

export default DashboardTour;