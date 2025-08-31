'use client';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard, History, Sparkles, LogOut, X,
  BookTemplate, Component, MessageSquare, Zap, Star,
  TrendingUp, Compass, Settings,
  Gift,
  InfoIcon,
  LucideInfo,
  User
} from 'lucide-react';
import logo from "../../assets/logo.webp";
import Image from 'next/image';
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
  onLogout = () => { },
  isOpen = false,
  onClose = () => { }
}) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleUpgradeClick = () => {
    setShowUpgradeModal(true);
  };

  const handleCloseUpgradeModal = () => {
    setShowUpgradeModal(false);
  };

  const handleLogout = () => {
    onLogout();
    toast.success('Logged out successfully');
  };

  const menuItems = [
    { icon: BookTemplate, label: 'Templates', path: '/templates' },
    { icon: Component, label: 'Components', path: '/components' },
    { icon: MessageSquare, label: 'Chat', path: '/chat' },
    { icon: Zap, label: 'Quick Actions', path: '/quick-actions' },
    { icon: Star, label: 'Favorites', path: '/favorites' },
    { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

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
                  {user?.AiCredits || 0}
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
                  {user?.aiToken || 0}
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
            <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
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

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900">DevTools</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {user.profilePicture ? (
                  <Image
                    src={user.profilePicture}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover"
                    width={32}
                    height={32}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Upgrade Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Upgrade to Pro</span>
              </div>
              <p className="text-sm text-indigo-100 mb-3">
                Unlock premium features and unlimited access
              </p>
              <button
                onClick={handleUpgradeClick}
                className="w-full bg-white text-indigo-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 transition-colors"
              >
                Upgrade Now
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="space-y-2">
              <Link
                to="/usage"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <History className="h-5 w-5" />
                <span>Usage History</span>
              </Link>
              <Link
                to="/billing"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <CreditCard className="h-5 w-5" />
                <span>Billing</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upgrade to Pro</h3>
              <button
                onClick={handleCloseUpgradeModal}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Unlock Premium Features
                </h4>
                <p className="text-gray-600 mb-6">
                  Get access to advanced tools, unlimited usage, and priority support.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700">Unlimited API calls</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700">Advanced templates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700">Priority support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700">Custom integrations</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-gray-900">$29</div>
                <div className="text-sm text-gray-600">per month</div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleCloseUpgradeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Maybe Later
                </button>
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-colors">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;