import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useBot } from '../contexts/BotContext';
import {
  Grid,
  LayoutDashboard,
  Brain,
  MessageSquare,
  Play,
  Settings,
  Plug,
  CreditCard,
  Bot,
  Wallet,
  Coins,
  SearchSlash,
  LucideSettings2,
  ChevronRight,
  Sparkles,
  User,
  LogOut,
  Crown,
  Zap,
  Menu,
  X
} from 'lucide-react';
import logo from "../assets/logo.png"
import { logedInSelector, userSelector } from '../store/global.Selctor';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setLogout } from '../store/global.Slice';

const baseNavigation = [
  { name: 'My Bots', href: '/dashboard', icon: Grid, gradient: 'from-blue-500 to-indigo-600' }
];

const botNavigation = [
  { name: 'Analytics', href: '/stats', icon: LayoutDashboard, gradient: 'from-emerald-500 to-teal-600' },
  { name: 'Chat', href: '/botchat', icon: MessageSquare, gradient: 'from-purple-500 to-pink-600' },
  { name: 'Customize', href: '/preview', icon: LucideSettings2, gradient: 'from-orange-500 to-red-600' },
  { name: 'Training', href: '/training', icon: Brain, gradient: 'from-cyan-500 to-blue-600' },
  { name: 'Sessions', href: '/sessions', icon: SearchSlash, gradient: 'from-violet-500 to-purple-600' },
  { name: 'Integrations', href: '/integrations', icon: Plug, gradient: 'from-indigo-500 to-blue-600' },
  { name: 'Bot Settings', href: '/bot-settings', icon: Settings, gradient: 'from-gray-500 to-slate-600' },
];

const settingsNavigation = [
  { name: 'Billing', href: '/billing', icon: CreditCard, gradient: 'from-green-500 to-emerald-600' },
  { name: 'Settings', href: '/settings', icon: Settings, gradient: 'from-gray-500 to-slate-600' },
];

export function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const logedIn = useSelector(logedInSelector);
  const user = useSelector(userSelector);
  const { selectedBot } = useBot();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile/tablet
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false); // Close sidebar on desktop
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isSidebarOpen && !event.target.closest('.sidebar-container') && !event.target.closest('.sidebar-toggle')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isSidebarOpen]);
  
  if (!logedIn) return null;

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const NavItem = ({ item, isActive }) => (
    <Link
      to={item.href}
      onClick={() => isMobile && setIsSidebarOpen(false)} // Close sidebar on mobile when nav item is clicked
      className={`group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
        isActive
          ? 'bg-blue-200 shadow-lg shadow-blue-200/50 text-gray-900 scale-105'
          : 'text-gray-600 bg-white hover:bg-white/60 hover:text-gray-900 hover:shadow-md hover:scale-102'
      }`}
    >
      <div className={`relative p-2 rounded-lg mr-3 transition-all duration-300 ${
        isActive 
          ? `bg-gradient-to-r ${item.gradient} shadow-lg` 
          : 'bg-gray-100 group-hover:bg-gradient-to-r group-hover:' + item.gradient
      }`}>
        <item.icon
          className={`h-4 w-4 transition-colors duration-300 ${
            isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'
          }`}
        />
      </div>
      <span className="flex-1">{item.name}</span>
      {isActive && (
        <ChevronRight className="h-4 w-4 text-gray-400" />
      )}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-r-full" />
      )}
    </Link>
  );

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="sidebar-toggle fixed top-4 left-4 z-50 lg:hidden p-3 bg-white/90 backdrop-blur-sm hover:bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300" />
      )}

      {/* Sidebar */}
      <div className={`sidebar-container fixed lg:static inset-y-0 left-0 z-40 w-72 flex flex-col transition-transform duration-300 ease-in-out ${
        isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
      } lg:translate-x-0`}>
        <div className="flex flex-col flex-grow bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-r border-blue-100/50 pt-6 pb-4 overflow-y-auto custom-scrollbar relative h-full">
   

        {/* User Profile Section */}
        <div className="relative px-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src={user?.user?.profilePicture || logo} 
                  className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-md" 
                  alt="Profile"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {user?.user?.name || 'User'}
                </h3>
                <p className="text-xs text-gray-500">Premium Member</p>
              </div>
              <Crown className="w-4 h-4 text-yellow-500" />
            </div>
            
            {/* Credits Display */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
                    <Coins className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-600">Credits</span>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {user?.platform?.[0]?.remainingCredits || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-6">
          {/* Base Navigation */}
          <div>
            <h4 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Dashboard
            </h4>
            <div className="space-y-2">
              {baseNavigation.map((item) => (
                <NavItem 
                  key={item.name} 
                  item={item} 
                  isActive={location.pathname === item.href} 
                />
              ))}
            </div>
          </div>

          {/* Bot Navigation - Only shown when a bot is selected */}
          {selectedBot && (
            <div>
              <div className="flex items-center justify-between px-3 mb-3">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Bot Controls
                </h4>
                <div className="flex items-center space-x-1 bg-white/60 rounded-full px-2 py-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600">Active</span>
                </div>
              </div>
              
              {/* Selected Bot Info */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 mb-4 border border-white/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{selectedBot.name}</p>
                    <p className="text-xs text-gray-500">AI Assistant</p>
                  </div>
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                </div>
              </div>

              <div className="space-y-2">
                {botNavigation.map((item) => (
                  <NavItem 
                    key={item.name} 
                    item={item} 
                    isActive={location.pathname === item.href} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Settings Navigation */}
          <div>
            <h4 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Account
            </h4>
            <div className="space-y-2">
              {settingsNavigation.map((item) => (
                <NavItem 
                  key={item.name} 
                  item={item} 
                  isActive={location.pathname === item.href} 
                />
              ))}
            </div>
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="px-4 py-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="group w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-200 bg-blue-100 rounded-xl transition-all duration-300"
          >
            <div className="p-2 rounded-lg mr-3 bg-gray-100 group-hover:bg-blue-100 transition-colors duration-300">
              <LogOut className="h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors duration-300" />
            </div>
            <span>Sign Out</span>
          </button>
        </div>

        {/* Upgrade Banner */}
        <div className="mx-4 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-4 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-semibold">Upgrade to Pro</span>
              </div>
              <p className="text-xs opacity-90 mb-3">Unlock unlimited features and priority support</p>
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg py-2 text-xs font-medium transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}