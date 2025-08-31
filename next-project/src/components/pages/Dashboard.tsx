'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { UserSelector, websiteSelector } from '@/store/global.Selector'
import { GetUserData, GetWebsite, addWebsitePage, redesignWebsite, createDocApi, imageToDesign } from '@/store/global.Action'
import { logOutUser, setEditorPage } from '@/store/global.Slice'
import { Plus, Menu, ChevronLeft, ChevronRight, Contact2Icon, XIcon, FilePlus2, Sparkles, ExternalLink, Copy, Zap } from 'lucide-react'
import toast from 'react-hot-toast'

// Import dashboard components
import DashboardSidebar from '../dashboard/DashboardSidebar'
import NewWebsiteModal from '../NewWebsiteModal'
import WebsiteCard from '../WebsiteCard'
import EmptyState from '../dashboard/EmptyState'
import TemplatesTab from '../dashboard/TemplatesTab'
import CommunityChat from '../dashboard/CommunityChat'
import UserProfile from '../UserProfile'
import BillingPlans from '../BillingPlans'
import SharePopup from '../dashboard/SharePopup'
import EditDesignPopup from '../dashboard/EditDesignPopup'
import WebsitePreview from '../WebsitePreview'
import DesignChat from '../DesignChat'

const Dashboard = () => {
  const [isNewWebsiteModalOpen, setIsNewWebsiteModalOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [showBilling, setShowBilling] = useState(false)
  const [previewWebsite, setPreviewWebsite] = useState(null)
  const [designChatWebsite, setDesignChatWebsite] = useState(null)
  const [sharePopup, setSharePopup] = useState({ isOpen: false, website: null })
  const [editDesignPopup, setEditDesignPopup] = useState({ isOpen: false, website: null })
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('websites')
  const [showAddWebpageModal, setShowAddWebpageModal] = useState(false)
  const [newPagePrompt, setNewPagePrompt] = useState('')
  const [newPageData, setNewPageData] = useState(null)
  const [webAppBoltPrompt, setWebAppBoltPrompt] = useState('')
  const [showConvertToWebAppModal, setShowConvertToWebAppModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)

  const websites = useSelector(websiteSelector)
  const dispatch = useDispatch()
  const user = useSelector(UserSelector)
  const router = useRouter()

  // Calculate pagination values
  const totalPages = Math.ceil((websites?.length || 0) / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentWebsites = websites?.slice(startIndex, endIndex) || []

  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, websites?.length])

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      dispatch(GetUserData(token) as any)
      
      const interval = setInterval(() => {
        dispatch(GetWebsite(token) as any)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [dispatch])

  const handleNewWebsite = async (data: any) => {
    if (data.url && !/^https?:\/\/.+\..+/.test(data.url)) {
      toast.error('Please enter a valid URL (e.g., https://example.com)')
      return
    }
    if (!user || user.AiCredits <= 4) {
      toast.error('Insufficient credits or user data missing. Please check your plan or re-login.')
      return
    }

    setIsNewWebsiteModalOpen(false)

    try {
      let webdata
      if (data.mode === 'createDoc') {
        webdata = await createDocApi({ data })
      } else if (data.mode === 'design') {
        const submitData = {
          image: data.uploadedImage,
          instruction: data.customInstructions
        }
        webdata = await imageToDesign({ data: submitData })
      } else {
        webdata = await redesignWebsite({ data })
      }
      
      const token = localStorage.getItem('authToken')
      if (webdata && token) {
        dispatch(GetWebsite(token) as any)
        dispatch(GetUserData(token) as any)
        toast.success('Website creation initiated! Your new site is being crafted.')
      }
    } catch (error: any) {
      console.error('Error creating new website:', error)
      toast.error(error.message || 'Failed to start website creation.')
    }
  }

  const handlePreview = (website: any) => {
    const currentWebsiteState = websites.find((w: any) => w._id === website._id) || website
    setPreviewWebsite(currentWebsiteState)
  }

  const handleOpenDesignChat = (website: any) => {
    dispatch(setEditorPage(website.uuid))
    setDesignChatWebsite(website)
  }

  const handleCloseDesignChat = () => {
    setDesignChatWebsite(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    dispatch(logOutUser())
    router.push('/login')
    toast.success('Logged out successfully')
  }

  const handleFormatSelect = async (uuid: string) => {
    const currentPlan = user?.currentPlan || 'Free'
    if (currentPlan === 'Free' || currentPlan === 'free') {
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
      })
      return
    }

    try {
      const response = await fetch(`${process.env.VITE_SERVER_URL}/download-page/${uuid}/zip`)
      if (!response.ok) throw new Error('Download failed')

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `website.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download. Please try again.')
    }
  }

  const mainContentAnimation = "opacity-0 animate-fadeInUp"
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false)

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans">
      <DashboardSidebar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileSidebarOpen={isMobileSidebarOpen}
        closeMobileSidebar={closeMobileSidebar}
        setShowBilling={setShowBilling}
        setIsProfileOpen={setIsProfileOpen}
        onLogout={handleLogout}
      />

      <main className={`flex-1 p-4 sm:p-6 md:p-8 md:ml-72 overflow-y-auto`}>
        <header
          className={`md:hidden flex items-center justify-between gap-2 mb-6 ${mainContentAnimation}`}
          style={{ animationDelay: "0.1s" }}
        >
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="text-slate-300 hover:text-white p-2 -ml-2"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          <button
            onClick={() => setIsNewWebsiteModalOpen(true)}
            className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm"
          >
            <Plus className="h-4 w-4" />
            <span className="inline">Create & Redesign</span>
          </button>
        </header>

        {activeTab === 'websites' && (
          <header className={`hidden md:block mb-8 sm:mb-10 ${mainContentAnimation}`} style={{ animationDelay: '0.3s' }}>
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
          </header>
        )}

        {/* Content based on active tab */}
        {activeTab === 'websites' ? (
          websites && websites.length === 0 ? (
            <div className={`${mainContentAnimation}`} style={{ animationDelay: '0.5s' }}>
              <EmptyState onCreateNew={() => setIsNewWebsiteModalOpen(true)} />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Website Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {currentWebsites?.map((website: any, index: number) => (
                  <WebsiteCard
                    key={website._id}
                    setShowBilling={setShowBilling}
                    handleFormatSelect={handleFormatSelect}
                    handlePreview={handlePreview}
                    website={website}
                    index={startIndex + index}
                    setSharePopup={setSharePopup}
                    onOpenDesignChat={handleOpenDesignChat}
                    openNewWebsiteModal={(data: any) => {
                      setShowAddWebpageModal(true)
                      setNewPageData(data)
                    }}
                  />
                ))}
              </div>
            </div>
          )
        ) : activeTab === 'templates' ? (
          <TemplatesTab
            user={user}
            setShowBilling={setShowBilling}
            mainContentAnimation={mainContentAnimation}
            onRemixTemplate={() => {}}
          />
        ) : activeTab === 'community' ? (
          <CommunityChat
            mainContentAnimation={mainContentAnimation}
            setShowBilling={setShowBilling}
          />
        ) : null}
      </main>

      {/* Modals */}
      <NewWebsiteModal
        isOpen={isNewWebsiteModalOpen}
        onClose={() => setIsNewWebsiteModalOpen(false)}
        onSubmit={handleNewWebsite}
        showAnimation={false}
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
        />
      )}

      <UserProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

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
        onDesignSelect={() => {}}
      />
    </div>
  )
}

export default Dashboard