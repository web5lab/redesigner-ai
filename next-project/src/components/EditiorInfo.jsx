import React from 'react';
import { 
  Brain, 
  MessageSquare, 
  Mic, 
  Zap, 
  Palette, 
  Type, 
  Layout, 
  Layers,
  Sparkles, 
  Eye, 
  Smartphone,
  Monitor, 
  Tablet,
  Send,
  MicIcon
} from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-slate-800/70 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm hover:bg-slate-800 transition-all duration-300">
    <div className="bg-indigo-500 p-3 rounded-lg inline-block mb-4">
      {icon}
    </div>
    <h3 className="text-white text-lg font-medium mb-2">{title}</h3>
    <p className="text-slate-300">{description}</p>
  </div>
);

const DeviceButton = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center p-2 rounded-md transition-all ${
      isActive 
        ? 'bg-indigo-500 text-white' 
        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
    }`}
  >
    {icon}
    <span className="ml-2 text-sm">{label}</span>
  </button>
);

const AICommand = ({ command, description }) => (
  <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-3 mb-2">
    <div className="flex items-start gap-3">
      <div className="bg-indigo-500/20 p-1 rounded">
        <MessageSquare className="h-4 w-4 text-indigo-400" />
      </div>
      <div>
        <p className="text-indigo-300 font-medium text-sm">"{command}"</p>
        <p className="text-slate-400 text-xs mt-1">{description}</p>
      </div>
    </div>
  </div>
);

const PowerfulAIEditor = () => {
  const [activeDevice, setActiveDevice] = React.useState('desktop');
  const [aiInput, setAiInput] = React.useState('');
  const [isListening, setIsListening] = React.useState(false);

  const handleDeviceChange = (device) => {
    setActiveDevice(device);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
  };

  const aiFeatures = [
    {
      icon: <Brain className="h-6 w-6 text-white" />,
      title: "AI Design Assistant",
      description: "Simply tell the AI what you want and watch it transform your website instantly."
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      title: "Natural Language Commands",
      description: "Use everyday language to describe changes - no technical knowledge required."
    },
    {
      icon: <Mic className="h-6 w-6 text-white" />,
      title: "Voice Control",
      description: "Speak your design ideas directly to the AI for hands-free editing."
    },
    {
      icon: <Palette className="h-6 w-6 text-white" />,
      title: "Instant Theme Changes",
      description: "Say 'make it more modern' or 'use blue colors' and see immediate results."
    },
    {
      icon: <Type className="h-6 w-6 text-white" />,
      title: "Content Generation",
      description: "AI writes and optimizes content based on your business and goals."
    },
    {
      icon: <Layout className="h-6 w-6 text-white" />,
      title: "Smart Layouts",
      description: "Describe your vision and AI creates professional layouts automatically."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-white" />,
      title: "Style Suggestions",
      description: "Get AI-powered recommendations to improve your design aesthetics."
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "Real-Time Updates",
      description: "See changes happen instantly as the AI interprets your commands."
    },
    {
      icon: <Layers className="h-6 w-6 text-white" />,
      title: "Component Intelligence",
      description: "AI understands context and suggests the best components for your needs."
    }
  ];

  const exampleCommands = [
    { command: "Make the header more modern with a dark theme", description: "Updates header styling with contemporary dark design" },
    { command: "Make the text more engaging and professional", description: "Rewrites content with better tone and clarity" }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Gradient background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-6 bg-slate-800/80 rounded-full backdrop-blur-sm border border-slate-700">
            <span className="text-purple-400 text-sm font-medium">AI-Powered Design Revolution</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Just Tell AI <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">What You Want</span> - We'll Build It
          </h2>
          
          <p className="text-slate-300 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            No more complex tools or technical skills needed. Simply describe your vision in plain English, and our AI will instantly transform your website with themes, colors, content, and layouts.
          </p>
        </div>

        {/* AI Editor Interface */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 mb-16 backdrop-blur-sm">
          <div className="flex justify-center mb-4">
            <div className="inline-flex bg-slate-900 p-1 rounded-lg">
              <DeviceButton 
                icon={<Monitor className="h-4 w-4" />} 
                label="Desktop" 
                isActive={activeDevice === 'desktop'} 
                onClick={() => handleDeviceChange('desktop')}
              />
              <DeviceButton 
                icon={<Tablet className="h-4 w-4" />} 
                label="Tablet" 
                isActive={activeDevice === 'tablet'} 
                onClick={() => handleDeviceChange('tablet')}
              />
              <DeviceButton 
                icon={<Smartphone className="h-4 w-4" />} 
                label="Mobile" 
                isActive={activeDevice === 'mobile'} 
                onClick={() => handleDeviceChange('mobile')}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            {/* AI Command Panel */}
            <div className="w-80 bg-slate-900/70 rounded-xl border border-slate-700 p-4">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-5 w-5 text-indigo-400" />
                <h3 className="text-white font-medium">AI Assistant</h3>
              </div>
              
              {/* AI Input */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      placeholder="Tell me what you want to change..."
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
               
                  <button className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                {isListening && (
                  <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                    <MicIcon className="h-3 w-3" />
                    Listening... Speak your command
                  </p>
                )}
              </div>

              {/* Example Commands */}
              <div className="mb-4">
                <h4 className="text-slate-300 text-sm font-medium mb-2">Try these commands:</h4>
                <div className="space-y-1">
                  {exampleCommands.map((cmd, index) => (
                    <AICommand key={index} command={cmd.command} description={cmd.description} />
                  ))}
                </div>
              </div>

              {/* AI Status */}
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">AI Ready</span>
                </div>
                <p className="text-slate-400 text-xs">Waiting for your next command...</p>
              </div>
            </div>

            {/* Website Preview */}
            <div className="flex-1">
              <div className={`bg-slate-900 rounded-xl border border-slate-700 overflow-hidden transition-all duration-300 mx-auto ${
                activeDevice === 'desktop' ? 'w-full h-96' : 
                activeDevice === 'tablet' ? 'w-3/4 h-80' : 'w-1/2 h-72'
              }`}>
                <div className="flex items-center justify-between bg-slate-800 p-2 border-b border-slate-700">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="h-4 w-64 bg-slate-700 rounded"></div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
                    <span className="text-xs text-indigo-400">AI Enhancing...</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col items-center justify-center h-full">
                  <div className="h-8 w-3/4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mb-4 animate-pulse"></div>
                  <div className="h-20 w-full bg-slate-700 rounded mb-4"></div>
                  <div className="h-12 w-48 bg-indigo-500 rounded mb-4"></div>
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <div className="h-16 bg-slate-700 rounded animate-pulse animation-delay-200"></div>
                    <div className="h-16 bg-slate-700 rounded animate-pulse animation-delay-400"></div>
                    <div className="h-16 bg-slate-700 rounded animate-pulse animation-delay-600"></div>
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

export default PowerfulAIEditor;