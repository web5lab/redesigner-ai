import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useBot } from '../contexts/BotContext';
import {
  Grid,
  LayoutDashboard,
  Brain,
  MessageSquare,
  Settings,
  Plug,
  CreditCard,
  Bot,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import logo from "../assets/logo.png"
import { logedInSelector, userSelector } from '../store/global.Selctor';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setLogout } from '../store/global.Slice';

const baseNavigation = [
  { name: 'My Bots', href: '/dashboard', icon: Grid }
];

const botNavigation = [
  { name: 'Analytics', href: '/stats', icon: LayoutDashboard },
  { name: 'Chat', href: '/botchat', icon: MessageSquare },
  { name: 'Customize', href: '/preview', icon: Settings },
  { name: 'Training', href: '/training', icon: Brain },
  { name: 'Sessions', href: '/sessions', icon: MessageSquare },
  { name: 'Integrations', href: '/integrations', icon: Plug },
  { name: 'Bot Settings', href: '/bot-settings', icon: Settings },
];

const settingsNavigation = [
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const logedIn = useSelector(logedInSelector);
  const user = useSelector(userSelector);
  const { selectedBot } = useBot();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
      onClick={() => isMobile && setIsSidebarOpen(false)}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      <item.icon className="h-4 w-4 mr-3" />
      <span>{item.name}</span>
    </Link>
  );

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="sidebar-toggle fixed top-4 left-4 z-50 lg:hidden p-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
        >
          {isSidebarOpen ? (
            <X className="w-5 h-5 text-gray-600" />
          ) : (
            <Menu className="w-5 h-5 text-gray-600" />
          )}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
      )}

      {/* Sidebar */}
      <div className={`sidebar-container fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300 ease-in-out ${
        isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
      } lg:translate-x-0`}>
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-6 pb-4 overflow-y-auto h-full">
          {/* Logo */}
          <div className="flex items-center px-6 mb-8">
            <img src={logo} className="w-8 h-8 mr-3" alt="CustomerBot" />
            <span className="text-xl font-semibold text-gray-900">CustomerBot</span>
          </div>

          {/* User Profile Section */}
          <div className="px-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                  <img 
                    src={user?.user?.profilePicture || logo} 
                    className="w-full h-full object-cover" 
                    alt="Profile"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {user?.user?.name || 'User'}
                  </h3>
                  <p className="text-xs text-gray-500">Premium Member</p>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600">Credits</span>
                  <span className="text-sm font-semibold text-gray-900">
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
              <h4 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                Dashboard
              </h4>
              <div className="space-y-1">
                {baseNavigation.map((item) => (
                  <NavItem 
                    key={item.name} 
                    item={item} 
                    isActive={location.pathname === item.href} 
                  />
                ))}
              </div>
            </div>

            {/* Bot Navigation */}
            {selectedBot && (
              <div>
                <h4 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Bot Controls
                </h4>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{selectedBot.name}</p>
                      <p className="text-xs text-gray-500">AI Assistant</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
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
              <h4 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                Account
              </h4>
              <div className="space-y-1">
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
          <div className="px-4 py-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4 mr-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}