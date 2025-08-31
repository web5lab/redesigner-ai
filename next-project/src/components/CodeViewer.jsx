import { useEffect, useState, Fragment } from 'react';
import {
  XIcon, Zap, Copy, LayoutDashboard, Sparkles, Wand2, Send,
  ExternalLink,
  Globe,
  Download,
  Edit2Icon,
  BotIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';
import logo from "../assets/logo.webp";
import { useDispatch, useSelector } from 'react-redux';
import { UserSelector } from '../store/global.Selctor';
import { editWebsite, GetWebsite } from '../store/global.Action';
import ChatWidget from './ChatWidget';

export function CodeViewer({ id, handleOpenDesignChat, website, onClose, multiDesignlist, handleFormatSelect, multiDesign, setPreviewWebsite }) {
  const [currentDesign, setCurrentDesign] = useState(0);
  const [designs, setDesigns] = useState([]);
  const [designNames, setDesignNames] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showConvertToWebAppModal, setShowConvertToWebAppModal] = useState(false);
  const [webAppBoltPrompt, setWebAppBoltPrompt] = useState('');
  const user = useSelector(UserSelector);

  useEffect(() => {
    if (multiDesign && multiDesignlist) {
      const mappedDesigns = multiDesignlist.map(item =>
        `${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${item.uuid}`
      );
      const names = multiDesignlist.map((item, i) => item.name || `Variation ${i + 1}`);
      setDesigns(mappedDesigns);
      setDesignNames(names);
    } else {
      setDesigns([`${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${id}`]);
      setDesignNames(["Current Design"]);
    }
  }, [multiDesign, multiDesignlist, id]);

  const handleOpenConvertToWebAppModal = async () => {
    const currentPlan = user?.currentPlan || 'Free';
    if (currentPlan === 'Free' || currentPlan === 'free') {
      setTimeout(() => {
        toast.success("Oops! This feature is part of our paid plans. Upgrade to unlock it!", {
          duration: 5000,
          position: 'top-center',
          style: {
            background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
            color: '#fff',
            padding: '16px',
            borderRadius: '10px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2), 0 20px 40px -20px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)'
          },
          icon: <Sparkles className="text-yellow-300" />,
        });
      }, 300);
      return;
    }
    const htmlCode = await fetch(`${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${multiDesign ? multiDesignlist[currentDesign].uuid : id}`)
    const promptText = `convert this HTML code into a web app ${await htmlCode.text()}`;
    setWebAppBoltPrompt(promptText);
    setShowConvertToWebAppModal(true);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const currentDesignName = designNames[currentDesign] || 'Design Preview';
  const currentDesignUrl = designs[currentDesign] || '';
  const sectionAnimation = "opacity-0 animate-fadeInUp";

  return (
    <>

      <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">


        <main className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
          <header
            className={`${sectionAnimation} flex items-center justify-between p-1 sm:p-4 md:p-4 bg-slate-800/70 backdrop-blur-md border-b border-slate-700/50 shadow-sm z-10 shrink-0`}
            style={{ animationDelay: '0.2s' }}
          >
            {/* Left side: Menu + Design name */}
            <button onClick={onClose} className="flex items-center gap-2 group"> {/* Changed Link to button for consistency */}
              <img src={logo} alt="Redesignr.ai Logo" className="h-8 w-8 md:h-10 md:w-10 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
              <span className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:opacity-90 transition-opacity duration-300">
                redesignr<span className="text-purple-400">.ai</span>
              </span>
            </button>

            {/* Center/Right: Web App button */}
            <div className="relative flex-1 flex justify-end">
            <button
                onClick={onClose}
                className="flex items-center justify-center space-x-2 px-3 py-2.5 text-sm rounded-lg bg-red-600/20 hover:bg-red-500/40 text-red-300 hover:text-white transition-all group focus:ring-2 focus:ring-red-500 focus:outline-none"
                title="Close Preview"
              >
                <XIcon size={18} />
              </button>
            </div>

            {/* Rightmost: Close Preview button */}
            <div className={`${sectionAnimation} ml-4 gap-2 hidden md:flex`} style={{ animationDelay: '0.5s' }}>
              <button
                onClick={() => {
                  handleFormatSelect(id)
                }}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-slate-700/50 hover:bg-slate-700 text-sky-300 hover:text-white transition-all group focus:ring-2 focus:ring-sky-500 focus:outline-none"
              >
                <Download size={18} className="text-sky-300 group-hover:text-white transition-colors" />
                <span>Download Code</span>
              </button>

              <button
                onClick={() => {
                  handleOpenDesignChat(website)
                  onClose();
                }}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-slate-700/50 hover:bg-slate-700 text-indigo-300 hover:text-white transition-all group focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <Edit2Icon size={18} className="text-indigo-300 group-hover:text-white transition-colors" />
                <span>Edit Design</span>
              </button>

              <button
                onClick={() => {
                  handleOpenDesignChat(website)
                  onClose();
                }}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-slate-700/50 hover:bg-slate-700 text-violet-300 hover:text-white transition-all group focus:ring-2 focus:ring-violet-500 focus:outline-none"
              >
                <BotIcon size={18} className="text-violet-300 group-hover:text-white transition-colors" />
                <span>AI Chat</span>
              </button>

              <button
                onClick={onClose}
                className="flex items-center justify-center space-x-2 px-3 py-2.5 text-sm rounded-lg bg-red-600/20 hover:bg-red-500/40 text-red-300 hover:text-white transition-all group focus:ring-2 focus:ring-red-500 focus:outline-none"
                title="Close Preview"
              >
                <XIcon size={18} />
                <span>Close Preview</span>
              </button>
            </div>
          </header>


          {/* Content Area: Iframe + AI Chat */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Iframe Preview */}
            <div className="flex-1 relative animate-fadeIn overflow-hidden" style={{ animationDelay: '0.3s' }}>
              {currentDesignUrl ? (

                <div className="flex-1 w-full h-full relative overflow-hidden">
                  <iframe
                    key={currentDesignUrl}
                    src={currentDesignUrl}
                    className=" w-full h-full border-none bg-white"
                    title={currentDesignName}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms" // Recommended sandbox attributes
                  />

                  {/* Enhanced Chatbot Overlay Button/Widget */}

                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 p-4 text-center">
                  <p>No design to preview or URL is invalid.</p>
                </div>
              )}
            </div>


          </div>
        </main>
      </div>

      {/* Modals */}
      {(showConvertToWebAppModal) && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeInScaleUp">
          <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg border border-slate-700/60 p-5 sm:p-6 md:p-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700/50">
            {showConvertToWebAppModal && (
              <Fragment>
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center">
                    <Zap size={20} md:size={24} className="mr-2 md:mr-3 text-amber-400" /> Convert to Web App
                  </h3>
                  <button onClick={() => setShowConvertToWebAppModal(false)} className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700 transition-colors">
                    <XIcon size={20} />
                  </button>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-slate-300 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Step 1: Copy this tailored prompt for Bolt.new
                    </label>
                    <textarea
                      value={webAppBoltPrompt}
                      readOnly
                      rows={4}
                      className="w-full bg-slate-700 text-slate-300 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder-slate-500 text-sm"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(webAppBoltPrompt);
                        toast.success('Prompt copied to clipboard!', { icon: <Copy size={16} className="text-green-400" /> });
                      }}
                      className="mt-2 w-full bg-amber-500 hover:bg-amber-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg flex items-center justify-center font-medium transition-colors shadow-sm hover:shadow-md text-sm sm:text-base"
                    >
                      <Copy size={16} className="mr-2" /> Copy Prompt
                    </button>
                  </div>
                  <div>
                    <label className="block text-slate-300 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Step 2: Paste into Bolt.new
                    </label>
                    <a
                      href="https://bolt.new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-slate-600 hover:bg-slate-500 text-slate-100 font-medium transition-colors duration-200 group"
                    >
                      <span>Open Bolt.new</span>
                      <ExternalLink size={16} className="opacity-70 group-hover:opacity-100" />
                    </a>
                    <p className="text-xs text-slate-400 mt-2 text-center">Bolt.new will guide you through the app creation process.</p>
                  </div>
                  <div className="pt-4 sm:pt-6 flex justify-end">
                    <button onClick={() => setShowConvertToWebAppModal(false)} className="px-4 py-2 sm:px-5 sm:py-2.5 bg-slate-700 hover:bg-slate-600/80 text-slate-200 rounded-lg transition-colors font-medium text-sm sm:text-base">
                      Done
                    </button>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      )}
    </>
  );
}