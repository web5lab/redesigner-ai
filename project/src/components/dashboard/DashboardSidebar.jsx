import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard, History, Sparkles, LogOut, X,
  BookTemplate, Component, MessageSquare, Zap, Star,
  TrendingUp, Compass, Settings,
  Gift,
  InfoIcon,
  LucideInfo
} from 'lucide-react';
import logo from "../../assets/logo.webp";
import toast from 'react-hot-toast';


const DashboardSidebar = ({
  setIsReferralPopupOpen,
  user,
  activeTab = 'websites',
  setActiveTab = () => { },
  isMobileSidebarOpen = false,
  closeMobileSidebar = () => { },
  setShowBilling = () => { },
  setIsProfileOpen = () => { },
  onLogout = () => { }
}) => {
  const handleClick = (type) => {
    const messages = {
      credits: "Credits are used to create new websites. 5 credits = 1 site.",
      tokens:
        "AI Tokens are used when using AI for chat and editing. Usage is dynamic.",
    };

    toast.success(messages[type], {
      duration: 5000,
      position: "bottom-left",
      style: {
        background: "linear-gradient(to right, #6366f1, #8b5cf6)",
        color: "#fff",
        padding: "16px",
        borderRadius: "10px",
        boxShadow:
          "0 10px 25px -5px rgba(0,0,0,0.2), 0 20px 40px -20px rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.1)",
      },
      icon: <LucideInfo className="text-yellow-300" />,
    });
  };
  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-400 font-bold text-xl sm:text-2xl hover:text-indigo-300 transition-colors"
          onClick={closeMobileSidebar}
        >
          <img src={logo} className="h-8 w-8 sm:h-10 sm:w-10" alt="Redesignr.ai Logo" />
          <span>redesignr<span className="text-purple-400">.ai</span></span>
        </Link>
        <button onClick={closeMobileSidebar} className="md:hidden text-slate-400 hover:text-white p-1 transition-colors">
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow space-y-6">
        {/* Quick Stats */}
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <h3 className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
              Quick Stats
            </h3>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Credits Card */}
            <div onClick={() => {
              handleClick("credits");
            }} className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-emerald-400 transition-colors">
              <div className="flex items-center justify-between">
                <div className="text-md font-bold text-emerald-400">
                  {user?.AiCredits}
                </div>
                <InfoIcon
                  className="w-4 h-4 text-slate-400 hover:text-emerald-400 cursor-pointer"
                />
              </div>
              <div className="text-xs text-slate-400">Credits</div>
            </div>

            {/* AI Tokens Card */}
            <div onClick={() => {
              handleClick("tokens");
            }} className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-orange-400 transition-colors">
              <div className="flex items-center justify-between">
                <div className="text-md font-bold text-orange-400">
                  {user?.aiToken}
                </div>
                <InfoIcon
                  className="w-4 h-4 text-slate-400 hover:text-orange-400 cursor-pointer"
                />
              </div>
              <div className="text-xs text-slate-400">AI Tokens</div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="h-4 w-4 text-indigo-400" />
            <h3 className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Explore</h3>
          </div>

          {[
            {
              icon: Component,
              label: "My Websites",
              value: 'Create & Manage',
              tab: 'websites',
              color: 'blue',
              onClick: () => setActiveTab('websites'),
            },
            {
              icon: MessageSquare,
              label: "Community Chat",
              value: "Connect & Share",
              tab: 'community',
              color: 'emerald',
              onClick: () => setActiveTab('community'),

            },
            {
              icon: BookTemplate,
              label: "Template Galaxy",
              value: "Discover 1600+",
              tab: 'templates',
              color: 'purple',
              onClick: () => {
                const currentPlan = user?.currentPlan || 'Free';
                if (currentPlan.toLowerCase() === 'free') {
                  setTimeout(() => {
                    toast.success("Oops! This feature is part of our paid plans. Upgrade to unlock it!", {
                      duration: 5000,
                      position: 'top-center',
                      style: {
                        background: '#6366f1',
                        color: '#fff',
                        padding: '16px',
                        borderRadius: '10px',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
                        border: '1px solid rgba(255,255,255,0.1)'
                      },
                      icon: <Sparkles className="text-yellow-300" />,
                    });
                  }, 300);
                  return;
                } else {
                  setActiveTab('templates');
                }
              },
              special: true
            },
            {
              icon: Sparkles,
              label: "Billing & Plan",
              value: user?.currentPlan || 'Free',
              tab: 'plan',
              color: 'amber',
              onClick: () => setShowBilling(true),

            },
          ].map((item, idx) => {
            const isActive = activeTab === item.tab;
            const colorClasses = {
              blue: {
                active: 'bg-blue-500/20 border-blue-500 text-blue-400',
                inactive: 'text-slate-300 hover:text-blue-400 hover:border-blue-500/50',
                icon: 'bg-blue-500'
              },
              emerald: {
                active: 'bg-emerald-500/20 border-emerald-500 text-emerald-400',
                inactive: 'text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50',
                icon: 'bg-emerald-500'
              },
              purple: {
                active: 'bg-purple-500/20 border-purple-500 text-purple-400',
                inactive: 'text-slate-300 hover:text-purple-400 hover:border-purple-500/50',
                icon: 'bg-purple-500'
              },
              amber: {
                active: 'bg-amber-500/20 border-amber-500 text-amber-400',
                inactive: 'text-slate-300 hover:text-amber-400 hover:border-amber-500/50',
                icon: 'bg-amber-500'
              }
            };

            const colors = colorClasses[item.color];

            return (
              <button
                key={idx}
                onClick={item.onClick}
                className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 border relative
                  ${isActive
                    ? `${colors.active} shadow-lg`
                    : `bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 ${colors.inactive}`
                  }
                `}
              >
                {/* Icon container */}
                <div className={`p-2 rounded-lg mr-3 transition-colors duration-200
                  ${isActive ? colors.icon : 'bg-slate-700 group-hover:' + colors.icon}
                `}>
                  <item.icon className="h-5 w-5 text-white" />


                </div>

                {/* Content */}
                <div className="flex-grow text-left">
                  <p className="text-sm font-medium">
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-400">
                    {item.value}
                  </p>
                </div>

                {/* Special indicator */}
                {item.special && (
                  <Star className="h-4 w-4 text-amber-400 animate-pulse ml-2" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="mt-auto border-t border-slate-700/50 pt-6 space-y-3">
        {/* User Profile */}
        <button
          onClick={() => { setIsProfileOpen(true); closeMobileSidebar(); }}
          className="w-full flex items-center gap-3 p-4 rounded-xl text-left hover:bg-slate-700/50 transition-all duration-200 group"
        >
          <div className="relative">
            <img
              src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=6366f1&color=fff`}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-slate-600 group-hover:border-indigo-400 transition-colors"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800" />
          </div>

 <div className="flex-grow">
  <p className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">
    {user?.name || 'User Profile'}
  </p>
  <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors truncate max-w-[120px]">
    {user?.email || 'User email'}
  </p>
</div>


          <Settings className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
        </button>

        {/* Logout */}
        <button
          onClick={() => {
            onLogout();
            closeMobileSidebar();
          }}
          className="w-full flex items-center gap-3 p-4 rounded-xl text-left text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 group"
        >
          <div className="p-2 rounded-lg bg-slate-700 group-hover:bg-red-500/20 transition-colors">
            <LogOut className="h-4 w-4 text-slate-500 group-hover:text-red-400 transition-colors" />
          </div>
          <span className="text-sm font-medium">
            Sign Out
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden  md:fixed md:top-0 md:left-0 md:h-full md:w-80 bg-slate-900/95 backdrop-blur-xl shadow-2xl z-50 p-6 md:flex md:flex-col">
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-slate-900/95 backdrop-blur-xl shadow-2xl z-[60] p-6 flex flex-col border-r border-slate-700/30 transform transition-all duration-300 ease-out md:hidden
          ${isMobileSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
      >
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
