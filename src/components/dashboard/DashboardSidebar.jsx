import React from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard, History, Sparkles, LogOut, ChevronDown, X, Gift,
  BookTemplate,
  Component,
  AppWindowIcon
} from 'lucide-react';
import logo from "../../assets/logo.png";

const DashboardSidebar = ({
  user,
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
            accent: true,
            onClick: () => setActiveTab('websites'),
          },
          {
            icon: BookTemplate,
            label: "Template Gallery",
            value: "1600 +",
            accent: true,
            onClick: () => setActiveTab('templates'),
          },
          {
            icon: CreditCard, label: "Credits Remaining",
            value: user?.AiCredits ?? 'N/A',
            onClick: () => setShowBilling(true),
          },
          { icon: History, label: "Completed Page designs", value: user?.completdDesign ?? 'N/A' },
          {
            icon: Sparkles,
            label: "Current Plan",
            value: user?.currentPlan || 'N/A',
            accent: true,
            onClick: () => setShowBilling(true),
          },
          // {
          //   icon: AppWindowIcon,
          //   label: "Connected Apps",
          //   value: "Applications",
          //   accent: true,
          //   onClick: () => setShowBilling(true),
          // },
        ].map((item, idx) => {
          const Wrapper = item.onClick ? 'button' : 'div';
          return (
            <Wrapper
              key={idx}
              onClick={item.onClick}
              className={`flex items-center p-2 sm:p-3 rounded-lg transition-colors hover:bg-slate-700/50 ${item.onClick ? 'w-full text-left' : ''
                }`}
            >
              <div className={`p-1.5 sm:p-2 rounded-md mr-2 sm:mr-3 ${item.accent ? 'bg-gradient-to-br from-indigo-500/30 to-purple-500/30' : 'bg-slate-700'}`}>
                <item.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${item.accent ? 'text-indigo-300' : 'text-indigo-400'}`} />
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
        <div className="h-full overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="hide-scrollbar h-full flex-col flex">
            <SidebarContent />
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] md:hidden"
          onClick={closeMobileSidebar}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-slate-800 shadow-2xl z-[60] p-6 flex flex-col border-r border-slate-700/50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="h-full overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="hide-scrollbar">
            <SidebarContent />
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;