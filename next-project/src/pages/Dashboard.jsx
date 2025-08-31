import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus, Menu, ChevronLeft, ChevronRight,
  Contact2Icon,
  XIcon,
  FilePlus2,
  Sparkles,
  ExternalLink,
  Copy,
  Zap
} from 'lucide-react';
import logo from "../assets/logo.webp";
import UserProfile from '../components/UserProfile';
import DesignChat from '../components/DesignChat';
import { addWebsitePage, createBlogApi, createDocApi, GetUserData, GetWebsite, imageToDesign, redesignWebsite, remixWebsite } from '../store/global.Action';
import { useDispatch, useSelector } from 'react-redux';
import { UserSelector, websiteSelector } from '../store/global.Selctor';
import { toast } from "react-hot-toast";
import NewWebsiteModal from '../components/NewWebsiteModal';
import { logOutUser, setEditiorPage } from '../store/global.Slice';
import WebsiteCard from '../components/WebsiteCard';
import ApiSettings from '../components/ApiSettings';
import BillingPlans from '../components/BillingPlans';

// Dashboard Components
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import SharePopup from '../components/dashboard/SharePopup';
import EditDesignPopup from '../components/dashboard/EditDesignPopup';
import ReferAndEarnPopup from '../components/dashboard/ReferAndEarnPopup';
import DashboardTour from '../components/dashboard/DashboardTour';
import EmptyState from '../components/dashboard/EmptyState';
import TemplatesTab from '../components/dashboard/TemplatesTab';
import ImageToCodeTab from '../components/dashboard/ImageToCodeTab';
import CommunityChat from '../components/dashboard/CommunityChat';
import WebsitePreview from '../components/WebsitePreview';

const Dashboard = () => {
  const [isNewWebsiteModalOpen, setIsNewWebsiteModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [previewWebsite, setPreviewWebsite] = useState(null);
  const [designChatWebsite, setDesignChatWebsite] = useState(null);
  const [sharePopup, setSharePopup] = useState({ isOpen: false, website: null });
  const [editDesignPopup, setEditDesignPopup] = useState({ isOpen: false, website: null });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isReferralPopupOpen, setIsReferralPopupOpen] = useState(false);
  const [referralLink, setReferralLink] = useState('');
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);
  const [activeTab, setActiveTab] = useState('websites');
  const [showAddWebpageModal, setShowAddWebpageModal] = useState(false);
  const [newPagePrompt, setNewPagePrompt] = useState('');
  const [newPageData, setNewPageData] = useState(null);
  const [webAppBoltPrompt, setWebAppBoltPrompt] = useState('');
  const [showConvertToWebAppModal, setShowConvertToWebAppModal] = useState(false);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Adjust this number based on your preference

  const websites = useSelector(websiteSelector);
  const dispatch = useDispatch();
  const user = useSelector(UserSelector);
  const navigate = useNavigate();

  // Calculate pagination values
  const totalPages = Math.ceil((websites?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWebsites = websites?.slice(startIndex, endIndex) || [];

  // Reset to first page when switching tabs or when websites change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, websites?.length]);


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Check if this is the first visit to dashboard
      const hasVisitedDashboard = localStorage.getItem('hasVisitedDashboard') === 'true';
      if (!hasVisitedDashboard) {
        // setShowTourModal(true);
        localStorage.setItem('hasVisitedDashboard', 'true');
      }

      dispatch(GetUserData(token));

      const interval = setInterval(() => {
        dispatch(GetWebsite(token));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [dispatch]);



  useEffect(() => {
    if (user && (user._id || user.referralCode)) {
      const code = user.referralCode || user._id;
      const link = `${window.location.origin}/?ref=${code}`;
      setReferralLink(link);
    }
  }, [user]);

  const handleNewWebsite = async (data) => {
    if (data.url && !/^https?:\/\/.+\..+/.test(data.url)) {
      toast.error('Please enter a valid URL (e.g., https://example.com)');
      return;
    }
    if (!user || user.AiCredits <= 4) {
      toast.error('Insufficient credits or user data missing. Please check your plan or re-login.');
      return;
    }

    setIsNewWebsiteModalOpen(false);
    setShowAnimation(true);

    try {
      let webdata;
      if (data.mode == 'createDoc') {
        webdata = await createDocApi({ data })
      } else if (data.mode == 'createBlog') {
        webdata = await createBlogApi({ data })
      } else if (data.mode == 'design') {
        const submitData = {
          image: data.uploadedImage,
          instruction: data.customInstructions
        }
        webdata = await imageToDesign({ data: submitData })
      }
      else {
        webdata = await redesignWebsite({ data });
      }
      const token = localStorage.getItem('authToken');

      if (webdata) {
        if (token) {
          dispatch(GetWebsite(token));
          dispatch(GetUserData(token));
        }
        toast.success('Website creation initiated! Your new site is being crafted.');
      }
    } catch (error) {
      console.error('Error creating new website:', error);
      toast.error(error.message || 'Failed to start website creation.');
    }

    setShowAnimation(false);
  };

  const handlePreview = (website) => {
    const currentWebsiteState = websites.find(w => w._id === website._id) || website;
    setPreviewWebsite(currentWebsiteState);
  };

  const handleOpenConvertToWebAppModal = async (uuid) => {
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
    const htmlCode = await fetch(`${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${uuid}`)
    const promptText = `convert this HTML code into a web app with good folder structure ${await htmlCode.text()}`;
    setWebAppBoltPrompt(promptText);
    setShowConvertToWebAppModal(true);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const handleRemixTemplate = async (remixData) => {
    if (!user || user.AiCredits <= 4) {
      toast.error('Insufficient credits. Please upgrade your plan.');
      return;
    }
    setShowAnimation(true);
    try {
      const webdata = await remixWebsite({ data: remixData });
      setActiveTab('websites');
      const token = localStorage.getItem('authToken');
      if (webdata) {
        if (token) {
          dispatch(GetWebsite(token));
          dispatch(GetUserData(token));
        }
        toast.success('Template remix initiated! Your customized site is being created.');
      }
    } catch (error) {
      console.error('Error remixing template:', error);
      toast.error(error.message || 'Failed to remix template.');
    }
    setShowAnimation(false);
  };


  const handleOpenDesignChat = (website) => {
    dispatch(setEditiorPage(website.uuid));
    setDesignChatWebsite(website);
  };

  const handleCloseDesignChat = () => {
    setDesignChatWebsite(null);
  };

  const handleDesignChatUpdate = () => {
    // Refresh websites data when design is updated
    const token = localStorage.getItem('authToken');
    dispatch(GetWebsite(token));
  };

  const handleOpenEditDesignPopup = (websiteToEdit) => {
    dispatch(setEditiorPage(websiteToEdit.uuid));
    navigate('/editior');
  }

  const handleDesignSelected = (newDesignUuid, websiteId) => {
    dispatch(setEditiorPage(newDesignUuid));
    toast.success(`Switched to new design! Opening editor...`);
    navigate('/editior');
    setEditDesignPopup({ isOpen: false, website: null });
    if (previewWebsite && previewWebsite._id === websiteId) {
      setPreviewWebsite(prev => ({ ...prev, uuid: newDesignUuid }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(logOutUser());
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const handleFormatSelect = async (uuid) => {
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

    try {
      const designToDownload = uuid;
      if (!designToDownload) {
        toast.error("No design selected to download.");
        return;
      }

      // Show loading toast
      const loadingToast = toast.loading("Preparing your download...", {
        style: {
          background: '#1e293b',
          color: '#fff',
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.1)'
        }
      });

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/download-page/${designToDownload}/zip`);
      if (!response.ok) {
        throw new Error('Zip download failed');
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `website.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      toast.dismiss(loadingToast);
      toast.success("Download started successfully!", {
        duration: 3000,
        style: {
          background: '#059669',
          color: '#fff',
          borderRadius: '10px',
        }
      });
    } catch (error) {
      console.error('Error downloading HTML:', error);
      toast.error("Failed to download. Please try again.", {
        duration: 4000,
        style: {
          background: '#dc2626',
          color: '#fff',
          borderRadius: '10px',
        }
      });
    }
  };

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleGenerateNewPage = async () => {
    if (!newPagePrompt.trim()) {
      toast.error("Please select a variant type or enter a descriptive prompt.");
      return;
    }

    const data = {
      parentUuid: newPageData?.uuid || null,
      instruction: newPagePrompt.trim(),
    }
    await addWebsitePage({ data });
    const token = localStorage.getItem('authToken');
    dispatch(GetWebsite(token))
    setPreviewWebsite(null)
    setShowAddWebpageModal(false)
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const mainContentAnimation = "opacity-0 animate-fadeInUp";
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans">
      {(showConvertToWebAppModal) && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeInScaleUp">
          <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg border border-slate-700/60 p-5 sm:p-6 md:p-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700/50">
            {showConvertToWebAppModal && (
              <Fragment>
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center">
                    <Zap size={20} className="mr-2 md:mr-3 text-amber-400" /> Edit Your App In Bolt.new
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
                      <Copy size={14} sm:size={16} className="mr-1 sm:mr-2" /> Copy Prompt
                      <Copy size={14} className="mr-1 sm:mr-2" /> Copy Prompt
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
      <DashboardSidebar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileSidebarOpen={isMobileSidebarOpen}
        closeMobileSidebar={closeMobileSidebar}
        setShowBilling={setShowBilling}
        setIsProfileOpen={setIsProfileOpen}
        setIsReferralPopupOpen={setIsReferralPopupOpen}
        onLogout={handleLogout}
      />

      {showAddWebpageModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeInScaleUp">
          <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg border border-slate-700/60 p-5 sm:p-6 md:p-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700/50">
            <Fragment>
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center">
                  <FilePlus2 size={20} className="mr-2 md:mr-3 text-indigo-400" /> Add New Webpage
                </h3>
                <button onClick={() => setShowAddWebpageModal(false)} className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700 transition-colors">
                  <XIcon size={20} />
                </button>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="pagePrompt" className="block text-slate-300 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                    Describe the new page (e.g., "A page about our company history and team")
                  </label>
                  <textarea
                    id="pagePrompt"
                    value={newPagePrompt}
                    onChange={(e) => setNewPagePrompt(e.target.value)}
                    rows={3}
                    placeholder="Enter page details or features..."
                    className="w-full bg-slate-700 text-slate-100 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400 text-sm"
                  />
                </div>
                <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    onClick={() => setShowAddWebpageModal(false)}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 bg-slate-700 hover:bg-slate-600/80 text-slate-200 rounded-lg transition-colors font-medium text-sm sm:text-base order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleGenerateNewPage}
                    disabled={!newPagePrompt.trim()}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg transition-all font-medium text-sm sm:text-base shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed order-1 sm:order-2"
                  >
                    Generate New Page
                  </button>
                </div>
              </div>
            </Fragment>
          </div>
        </div>
      )}

      <main className={`flex-1 p-4 sm:p-6 md:p-8 md:ml-72 overflow-y-auto`}>
        <header
          className={`md:hidden flex items-center justify-between gap-2 mb-6 ${mainContentAnimation}`}
          style={{ animationDelay: "0.1s" }}
        >
          {/* Menu Button */}
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="text-slate-300 hover:text-white p-2 -ml-2"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>



          {/* Create Button */}
          <button
            onClick={() => setIsNewWebsiteModalOpen(true)}
            className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm"
          >
            <Plus className="h-4 w-4" />
            <span className="inline">Create & Redesign</span>
          </button>


        </header>


        {activeTab === 'websites' && (<header className={`hidden md:block mb-8 sm:mb-10 ${mainContentAnimation}`} style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Your Websites</h1>
              <p className="text-slate-400 mt-1 text-sm sm:text-base">Manage your websites</p>
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() => setIsNewWebsiteModalOpen(true)}
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="h-4 w-4" />
                Create & Redesign Website
              </button>
              <a
                href='mailto:shiva@redesignr.ai'
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
              >
                <Contact2Icon className="h-4 w-4" />
                Contact Support
              </a>
            </div>
          </div>
        </header>)}


        {/* Content based on active tab */}
        {activeTab === 'websites' ? (
          websites && websites.length === 0 && !showAnimation ? (
            <div className={`${mainContentAnimation}`} style={{ animationDelay: '0.5s' }}>
              <EmptyState onCreateNew={() => setIsNewWebsiteModalOpen(true)} />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Pagination */}
              {websites && websites.length > itemsPerPage && (
                <div
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${mainContentAnimation}`}
                  style={{ animationDelay: "0.6s" }}
                >
                  {/* Pagination Controls */}
                  <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    {/* Prev Button */}
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-300 bg-slate-800 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden xs:inline">Previous</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex flex-wrap items-center gap-1 justify-center">
                      {getPageNumbers().map((page, index) => (
                        <React.Fragment key={index}>
                          {page === "..." ? (
                            <span className="px-2 sm:px-3 py-1.5 sm:py-2 text-slate-400">...</span>
                          ) : (
                            <button
                              onClick={() => goToPage(page)}
                              className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${currentPage === page
                                  ? "bg-indigo-500 text-white"
                                  : "text-slate-300 bg-slate-800 hover:bg-slate-700"
                                }`}
                            >
                              {page}
                            </button>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-300 bg-slate-800 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <span className="hidden xs:inline">Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Showing Info */}
                  <div className="text-xs sm:text-sm text-center sm:text-right text-slate-400">
                    Showing {startIndex + 1} to {Math.min(endIndex, websites.length)} of {websites.length} websites
                  </div>
                </div>
              )}

              {/* Website Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {currentWebsites?.map((website, index) => (
                  <WebsiteCard
                    key={website._id}
                    setShowBilling={setShowBilling}
                    handleFormatSelect={handleFormatSelect}
                    handlePreview={handlePreview}
                    handleOpenEditDesignPopup={handleOpenEditDesignPopup}
                    website={website}
                    handleOpenConvertToWebAppModal={handleOpenConvertToWebAppModal}
                    index={startIndex + index}
                    setSharePopup={setSharePopup}
                    onOpenDesignChat={handleOpenDesignChat}
                    openNewWebsiteModal={(data) => {
                      setShowAddWebpageModal(true)
                      setNewPageData(data)
                    }
                    }
                  />
                ))}
              </div>
            </div>
          )
        ) : activeTab === 'templates' ? (
          <TemplatesTab
            user={user}
            setIsTemplatesModalOpen={setIsTemplatesModalOpen}
            setShowBilling={setShowBilling}
            mainContentAnimation={mainContentAnimation}
            onRemixTemplate={handleRemixTemplate}
          />
        ) : activeTab === 'community' ? (
          <CommunityChat
            user={user}
            mainContentAnimation={mainContentAnimation}
          />
        ) : (
          <ImageToCodeTab
            user={user}
            onImageToCode={handleNewWebsite}
            mainContentAnimation={mainContentAnimation}
            setShowBilling={setShowBilling}
          />
        )}
      </main>



      {/* Modals */}
      <NewWebsiteModal
        isOpen={isNewWebsiteModalOpen}
        onClose={() => setIsNewWebsiteModalOpen(false)}
        onSubmit={handleNewWebsite}
        showAnimation={showAnimation}
      />

      {previewWebsite && (
        <WebsitePreview
          data={previewWebsite}
          handleFormatSelect={handleFormatSelect}
          handleOpenDesignChat={handleOpenDesignChat}
          setPreviewWebsite={setPreviewWebsite}
          onClose={() => setPreviewWebsite(null)}
        />
      )}



      {designChatWebsite && (
        <DesignChat
          website={designChatWebsite}
          onClose={handleCloseDesignChat}
          onPreviewUpdate={handleDesignChatUpdate}
        />
      )}

      <UserProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <ApiSettings isOpen={showApiSettings} onClose={() => setShowApiSettings(false)} />
      <BillingPlans isOpen={showBilling} onClose={() => setShowBilling(false)} />

      <SharePopup
        isOpen={sharePopup.isOpen}
        onClose={() => setSharePopup({ isOpen: false, website: null })}
        website={sharePopup.website}
      />

      <EditDesignPopup
        isOpen={editDesignPopup.isOpen}
        onClose={() => setEditDesignPopup({ isOpen: false, website: null })}
        website={editDesignPopup.website}
        onDesignSelect={handleDesignSelected}
      />

      <DashboardTour
        isOpen={showTourModal}
        onClose={() => setShowTourModal(false)}
      />

      <ReferAndEarnPopup
        isOpen={isReferralPopupOpen}
        onClose={() => setIsReferralPopupOpen(false)}
        referralLink={referralLink}
      />



      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .sm .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: ${'#1e293b'}; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${'#4f46e5'}; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: ${'#6366f1'}; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-in-out forwards; }

        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-scaleUp { animation: scaleUp 0.3s ease-in-out forwards; }
        
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; }

        .animate-enter { animation: fadeInUp 0.3s cubic-bezier(0.21, 1.02, 0.73, 1) forwards; }
        .animate-leave { animation: fadeOutDown 0.4s cubic-bezier(0.06, 0.71, 0.55, 1) forwards; }
        @keyframes fadeOutDown { from { opacity: 1; transform: translateY(0px); } to { opacity: 0; transform: translateY(20px); } }
      `}</style>
    </div>
  );
};

export default Dashboard;
