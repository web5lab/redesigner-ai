import React from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard, History, Sparkles, LogOut, ChevronDown, X,
  BookTemplate, Component, MessageSquare, Users
} from 'lucide-react';
import logo from "../../assets/logo.png";
import toast from 'react-hot-toast';

const DashboardSidebar = ({
  user,
  activeTab, // 👈 New prop
  setActiveTab,
  isMobileSidebarOpen,
  closeMobileSidebar,
  setShowBilling,
  setIsProfileOpen,
  setIsReferralPopupOpen,
  onLogout
}) => {

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-400 font-bold text-xl sm:text-2xl"
          onClick={closeMobileSidebar}
        >
          <img src={logo} className="h-8 w-8 sm:h-10 sm:w-10" alt="Redesignr.ai Logo" />
          <span>redesignr<span className="text-purple-400">.ai</span></span>
        </Link>
        <button onClick={closeMobileSidebar} className="md:hidden text-slate-400 hover:text-white p-1">
          <X size={24} />
        </button>
      </div>

      <nav className="flex-grow space-y-2 sm:space-y-3">
        <h3 className="text-xs text-slate-500 uppercase font-semibold tracking-wider px-2 mb-2">Overview</h3>
        {[
          {
            icon: Component,
            label: "My Website",
            value: 'Created Websites',
            tab: 'websites',
            accent: true,
            onClick: () => setActiveTab('websites'),
          },
          {
            icon: MessageSquare,
            label: "Community",
            value: user?.completdDesign ? `${user.completdDesign} designs shared` : 'Connect & Share',
            tab: 'community',
            accent: true,
            onClick: () => setActiveTab('community'),
          },
          {
            icon: BookTemplate,
            label: "Template Gallery",
            value: "1600+",
            tab: 'templates',
            accent: true,
            onClick: () => {
              const currentPlan = user?.currentPlan || 'Free';
              if (currentPlan.toLowerCase() === 'free') {
                toast.success("Oops! This feature is part of our premium plan. Upgrade to unlock it!", {
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
              } else {
                setActiveTab('templates');
              }
            },
          },
          {
            icon: CreditCard,
            label: "Credits Remaining",
            value: user?.AiCredits ?? 'N/A',
            tab: 'credits',
            onClick: () => setShowBilling(true),
          },
          {
            icon: History,
            label: "Completed Page Designs",
            value: user?.completdDesign ?? 'N/A',
            tab: 'history'
          },
          {
            icon: Sparkles,
            label: "Current Plan",
            value: user?.currentPlan || 'N/A',
            tab: 'plan',
            accent: true,
            onClick: () => setShowBilling(true),
          },
        ].map((item, idx) => {
          const isActive = activeTab === item.tab;

          const Wrapper = item.onClick ? 'button' : 'div';
          return (
            <Wrapper
              key={idx}
              onClick={item.onClick}
              className={`flex items-center p-2 sm:p-3 rounded-lg transition-all duration-200 ease-in-out
                ${item.onClick ? 'w-full text-left' : ''}
                ${isActive
                  ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 scale-[1.02] shadow-md'
                  : 'bg-slate-700/50'
                }`}
            >
              <div className={`p-1.5 sm:p-2 rounded-md mr-2 sm:mr-3 transition-all duration-200
                ${isActive
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg'
                  : item.accent
                    ? 'bg-gradient-to-br from-indigo-500/30 to-purple-500/30'
                    : 'bg-slate-700'
                }`}
              >
                <item.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isActive ? 'text-indigo-100' : 'text-indigo-400'}`} />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-slate-400">{item.label}</p>
                <p className="text-base sm:text-lg font-semibold text-white">{item.value}</p>
              </div>
            </Wrapper>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-700 pt-3 sm:pt-4">
        <button
          onClick={() => { setIsProfileOpen(true); closeMobileSidebar(); }}
          className="w-full flex items-center gap-3 p-2 sm:p-3 rounded-lg text-left hover:bg-slate-700/50 transition-colors group"
        >
          <img
            src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random&color=fff`}
            alt="Profile"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-slate-600 group-hover:border-indigo-500 transition-colors"
          />
          <div className="flex-grow">
            <p className="text-xs sm:text-sm font-medium text-white truncate">{user?.name || 'User Profile'}</p>
            <p className="text-[10px] sm:text-xs text-slate-400">View profile & settings</p>
          </div>
          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
        </button>
        <button
          onClick={() => {
            onLogout();
            closeMobileSidebar();
          }}
          className="w-full flex items-center gap-3 p-2 sm:p-3 mt-1 sm:mt-2 rounded-lg text-left text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors group"
        >
          <LogOut className="h-4 w-4 sm:h-5 sm:w-5 text-slate-500 group-hover:text-red-400 transition-colors" />
          <span className="text-xs sm:text-sm font-medium">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden min-h-[100vh] md:fixed md:top-0 md:left-0 md:h-full md:w-72 bg-slate-800/70 backdrop-blur-lg shadow-2xl z-50 p-6 md:flex md:flex-col border-r border-slate-700/50">
        <div className="h-full overflow-y-auto hide-scrollbar">
          <div className="h-full flex-col flex">
            <SidebarContent />
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-[55] md:hidden" onClick={closeMobileSidebar}></div>
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-slate-800 shadow-2xl z-[60] p-6 flex flex-col border-r border-slate-700/50 transform transition-transform duration-300 ease-in-out md:hidden
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full overflow-y-auto hide-scrollbar">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
