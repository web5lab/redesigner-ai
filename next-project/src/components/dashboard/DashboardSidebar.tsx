'use client';

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
import Image from 'next/image';
import toast from 'react-hot-toast';

const Sidebar = ({ user, onLogout, isOpen, onClose }) => {
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

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-slate-900 border-r border-slate-700 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-white">DevCraft</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Profile */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center space-x-4 group cursor-pointer">
              <div className="relative">
                <Image
                  src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=6366f1&color=fff`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-600 group-hover:border-indigo-400 transition-colors"
                  width={48}
                  height={48}
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{user?.name || 'User'}</p>
                <p className="text-slate-400 text-sm truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200 group"
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <item.icon size={20} className="group-hover:text-indigo-400 transition-colors" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Upgrade Section */}
          <div className="p-4 border-t border-slate-700">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <Sparkles className="text-yellow-300" size={24} />
                <div>
                  <h3 className="text-white font-semibold">Upgrade to Pro</h3>
                  <p className="text-indigo-100 text-sm">Unlock premium features</p>
                </div>
              </div>
              <button
                onClick={handleUpgradeClick}
                className="w-full bg-white text-indigo-600 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Upgrade Now
              </button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <Link
                to="/billing"
                className="flex items-center space-x-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <CreditCard size={18} />
                <span className="text-sm">Billing</span>
              </Link>
              <Link
                to="/history"
                className="flex items-center space-x-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <History size={18} />
                <span className="text-sm">History</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors w-full text-left"
              >
                <LogOut size={18} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Upgrade to Pro</h2>
              <button
                onClick={handleCloseUpgradeModal}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <Gift className="text-indigo-400" size={20} />
                <span className="text-slate-300">Unlimited templates</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="text-indigo-400" size={20} />
                <span className="text-slate-300">Priority support</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="text-indigo-400" size={20} />
                <span className="text-slate-300">Advanced features</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleCloseUpgradeModal}
                className="flex-1 px-4 py-2 text-slate-400 hover:text-white border border-slate-600 rounded-lg transition-colors"
              >
                Maybe Later
              </button>
              <button className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;