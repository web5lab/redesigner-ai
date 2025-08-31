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

export default Sidebar;