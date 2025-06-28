import { useEffect, useState, Fragment } from 'react';
import {
  XIcon, Zap, Copy, LayoutDashboard, Sparkles, Wand2, Send,
  ExternalLink,
  Globe,
} from 'lucide-react';
import toast from 'react-hot-toast';
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { UserSelector } from '../store/global.Selctor';
import { editWebsite, GetWebsite } from '../store/global.Action';
import ChatWidget from './ChatWidget';

export function CodeViewer({ id, onClose, multiDesignlist, multiDesign, setPreviewWebsite }) {
  const [currentDesign, setCurrentDesign] = useState(0);
  const [showChatbot, setShowChatbot] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [hasSeenDesignIntro, setHasSeenDesignIntro] = useState(false);
  const [designs, setDesigns] = useState([]);
  const [designNames, setDesignNames] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showConvertToWebAppModal, setShowConvertToWebAppModal] = useState(false);
  const [webAppBoltPrompt, setWebAppBoltPrompt] = useState('');
  const [showAiChat, setShowAiChat] = useState(false);
  const [aiChatMessageInput, setAiChatMessageInput] = useState('');
  const user = useSelector(UserSelector);
  const dispatch = useDispatch()

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
        toast.success("This feature is not available in free plan.", {
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


  window.addEventListener("message", (event) => {
    if (event.data?.type === "CHATBOT") {
      setShowChatbot(false);
    }
  });

  const handleSendAiChatMessage = async () => {


    if (aiChatMessageInput.trim() === '') return;
    setAiChatMessageInput('');
    const data = {
      uuid: multiDesignlist[currentDesign]?.uuid || id,
      instruction: aiChatMessageInput.trim(),
      parrentUuid: id
    }
    await editWebsite({ data })
    const token = localStorage.getItem('authToken');
    dispatch(GetWebsite(token))
    setPreviewWebsite(null)
  };
  const currentDesignName = designNames[currentDesign] || 'Design Preview';
  const currentDesignUrl = designs[currentDesign] || '';
  const sectionAnimation = "opacity-0 animate-fadeInUp";

  return (
    <>

      <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">


        <main className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
          <header
            className={`${sectionAnimation} flex items-center justify-between p-3 sm:p-4 md:p-6 bg-slate-800/70 backdrop-blur-md border-b border-slate-700/50 shadow-sm z-10 shrink-0`}
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
                onClick={handleOpenConvertToWebAppModal}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-slate-700/50 hover:bg-slate-700 text-amber-300 hover:text-white transition-all duration-200 ease-in-out group focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <Globe size={18} className="text-amber-400 group-hover:text-yellow-300 transition-colors" />
                <span>Convert To Web App</span>
              </button>

              {/* Floating "Bolt.new" tag */}
              <span className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full shadow-lg ring-1 ring-yellow-300 animate-pulse">
                Bolt.new
              </span>
            </div>

            {/* Rightmost: Close Preview button */}
            <div
              className={`${sectionAnimation} ml-4 hidden md:flex`}
              style={{ animationDelay: '0.5s' }}
            >
              <button
                onClick={onClose}
                className="flex items-center justify-center space-x-2 px-3 py-2.5 text-sm rounded-lg bg-red-600/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-all duration-200 ease-in-out group focus:ring-2 focus:ring-red-500 focus:outline-none"
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
                  {showChatbot ? (
                    /* Full Chat Widget in Preview */
                    <div className="absolute bottom-6  right-6 w-80 h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
                      <ChatWidget />
                    </div>
                  ) : (
                    /* Minimized Chatbot Button in Preview */
                    <div className="absolute bottom-6 right-6 z-50">
                      <button
                        onClick={() => setShowChatbot(true)} // Open chat in preview
                        className="w-14 h-14 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 group relative"
                        title="Open chat"
                      >
                        <svg className="w-7 h-7 text-white group-hover:text-gray-100" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                        {/* Notification Badge */}
                        {unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                            {unreadCount > 9 ? '9+' : unreadCount}
                          </div>
                        )}
                        {/* Pulse Animation */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 animate-ping opacity-20"></div>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 p-4 text-center">
                  <p>No design to preview or URL is invalid.</p>
                </div>
              )}
            </div>

            {/* AI Chat Interface */}
            {showAiChat && (
              <div className="h-auto  bg-slate-800/80 backdrop-blur-sm border-t border-slate-700/50 flex flex-col p-3 md:p-4 shrink-0 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-600/70">
                  <h3 className="text-base md:text-lg font-semibold text-indigo-400 flex items-center">
                    <Wand2 size={20} className="mr-2 text-indigo-400" /> AI Quick Edit
                  </h3>
                  <button
                    onClick={() => setShowAiChat(false)}
                    className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                    aria-label="Close AI Chat"
                  >
                    <XIcon size={18} />
                  </button>
                </div>


                <div className="flex items-center gap-2 pt-2 border-slate-600/70">
                  <input
                    type="text"
                    value={aiChatMessageInput}
                    onChange={(e) => setAiChatMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendAiChatMessage()}
                    placeholder="Describe changes, e.g., 'Make header blue'"
                    className="flex-grow bg-slate-700/90 text-slate-100 px-3 py-2.5 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400 text-sm"
                  />
                  <button
                    onClick={handleSendAiChatMessage}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 h-[42px] rounded-lg flex items-center justify-center font-medium transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!aiChatMessageInput.trim()}
                    aria-label="Send message to AI"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <footer className={`${sectionAnimation} p-2 sm:p-3 bg-slate-800/70 backdrop-blur-md border-t border-slate-700/50 text-xs text-slate-400 flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center shrink-0`} style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${currentDesignUrl ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
              <span>{currentDesignUrl ? "Live Preview" : "Preview Unavailable"}</span>
            </div>
            <div className="flex items-center gap-1">
              <LayoutDashboard size={12} sm:size={14} />
              <span>redesignr.ai Studio</span>
            </div>
          </footer>
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
                    <XIcon size={20} md:size={22} />
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
                      <Copy size={14} sm:size={16} className="mr-1 sm:mr-2" /> Copy Prompt
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