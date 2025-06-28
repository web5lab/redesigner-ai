import React from 'react';
import { 
  Wand2, 
  Code, 
  Layout, 
  Layers, 
  Palette, 
  Move, 
  Edit3, 
  Image as ImageIcon,
  Code2, 
  Eye, 
  Smartphone,
  Monitor, 
  Tablet
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

const PowerfulEditor = () => {
  const [activeDevice, setActiveDevice] = React.useState('desktop');

  const handleDeviceChange = (device) => {
    setActiveDevice(device);
  };

  const editorFeatures = [
    {
      icon: <Layout className="h-6 w-6 text-white" />,
      title: "Intuitive Interface",
      description: "Drag-and-drop components, resize elements, and organize layouts with our user-friendly editor."
    },
    {
      icon: <Layers className="h-6 w-6 text-white" />,
      title: "Component Library",
      description: "Access hundreds of pre-built components to quickly build professional websites."
    },
    {
      icon: <Palette className="h-6 w-6 text-white" />,
      title: "Advanced Styling",
      description: "Customize colors, typography, and effects with our powerful styling controls."
    },
    {
      icon: <Move className="h-6 w-6 text-white" />,
      title: "Responsive Design",
      description: "Preview and adjust your design across desktop, tablet, and mobile views."
    },
    {
      icon: <Edit3 className="h-6 w-6 text-white" />,
      title: "In-Place Editing",
      description: "Edit content directly on the page for a seamless design experience."
    },
    {
      icon: <Wand2 className="h-6 w-6 text-white" />,
      title: "AI-Powered Tools",
      description: "Generate sections, improve designs, and get suggestions with our AI assistant."
    },
    {
      icon: <ImageIcon className="h-6 w-6 text-white" />,
      title: "Image Management",
      description: "Upload, resize, and optimize images directly within the editor."
    },
    {
      icon: <Code2 className="h-6 w-6 text-white" />,
      title: "Code Customization",
      description: "Access and modify the underlying code for advanced customizations."
    },
    {
      icon: <Eye className="h-6 w-6 text-white" />,
      title: "Real-Time Preview",
      description: "See changes instantly as you edit for a seamless design workflow."
    }
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
            <span className="text-purple-400 text-sm font-medium">Visual Design Made Easy</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Powerful <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Visual Editor</span> with AI Enhancements
          </h2>
          
          <p className="text-slate-300 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Design with confidence using our intuitive editor. Drag, drop, and customize elements with ease while our AI assists you in creating the perfect website.
          </p>
        </div>

        {/* Editor Preview Section */}
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
          
          <div className="relative">
            {/* Placeholder for Editor Interface - would be replaced with actual editor component in production */}
            <div className={`bg-slate-900 rounded-xl border border-slate-700 overflow-hidden transition-all duration-300 mx-auto ${
              activeDevice === 'desktop' ? 'w-full h-96' : 
              activeDevice === 'tablet' ? 'w-3/4 h-80' : 'w-1/3 h-72'
            }`}>
              <div className="flex items-center justify-between bg-slate-800 p-2 border-b border-slate-700">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="h-4 w-64 bg-slate-700 rounded"></div>
                <div className="h-4 w-16 bg-slate-700 rounded"></div>
              </div>
              <div className="flex h-full">
                <div className="w-48 border-r border-slate-700 p-3 bg-slate-800/50">
                  <div className="h-6 w-32 bg-slate-700 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-8 w-full bg-slate-700 rounded"></div>
                    <div className="h-8 w-full bg-slate-700 rounded"></div>
                    <div className="h-8 w-full bg-slate-700 rounded"></div>
                    <div className="h-8 w-full bg-slate-700 rounded"></div>
                  </div>
                </div>
                <div className="flex-1 p-4">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="h-8 w-3/4 bg-slate-700 rounded mb-4"></div>
                    <div className="h-20 w-3/4 bg-slate-700 rounded mb-4"></div>
                    <div className="h-12 w-48 bg-indigo-500 rounded mb-4"></div>
                    <div className="grid grid-cols-3 gap-4 w-3/4">
                      <div className="h-16 bg-slate-700 rounded"></div>
                      <div className="h-16 bg-slate-700 rounded"></div>
                      <div className="h-16 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="w-64 border-l border-slate-700 p-3 bg-slate-800/50">
                  <div className="h-6 w-32 bg-slate-700 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-10 w-full bg-slate-700 rounded"></div>
                    <div className="h-20 w-full bg-slate-700 rounded"></div>
                    <div className="h-10 w-full bg-slate-700 rounded"></div>
                    <div className="h-6 w-3/4 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements to make it look like an editor */}
            <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="p-2 bg-indigo-500 rounded-md shadow-lg">
                <Edit3 className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="absolute bottom-1/3 left-1/3 transform -translate-x-1/2 translate-y-1/2 pointer-events-none">
              <div className="p-2 bg-purple-500 rounded-md shadow-lg">
                <Move className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          
          {/* Code/Preview Toggle */}
          <div className="flex justify-center mt-6">
            <div className="inline-flex bg-slate-900 p-1 rounded-lg">
              <button className="flex items-center px-4 py-2 rounded bg-indigo-500 text-white">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
              <button className="flex items-center px-4 py-2 rounded text-slate-300 hover:bg-slate-800">
                <Code className="h-4 w-4 mr-2" />
                Code
              </button>
            </div>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {editorFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-700/30 rounded-xl p-8 backdrop-blur-sm max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Experience the Power of AI-Enhanced Web Design</h3>
            <p className="text-indigo-200 mb-6">Whether you're a developer, designer, or business owner, our editor makes it easy for anyone to create professional websites.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-indigo-500/25 transition-all duration-300">
                Try Editor Now
                <Wand2 className="h-5 w-5" />
              </button>
              <button className="flex items-center justify-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-all duration-300 border border-slate-700">
                Watch Tutorial
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PowerfulEditor;