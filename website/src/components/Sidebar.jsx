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
  X,
  ChevronDown,
  Check
} from 'lucide-react';
import logo from "../assets/logo.png"
import { logedInSelector, userSelector, botsSelector, activeBotSelector } from '../store/global.Selctor';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setLogout, setBotsActive } from '../store/global.Slice';

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
  const bots = useSelector(botsSelector);
  const activeBot = useSelector(activeBotSelector);
  const { selectedBot } = useBot();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showBotSelector, setShowBotSelector] = useState(false);

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

  const handleBotChange = (bot) => {
    dispatch(setBotsActive(bot));
    setShowBotSelector(false);
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

          {/* Bot Selector */}
          {bots.length > 0 && (
            <div className="px-6 mb-6">
              <div className="relative">
                <button
                  onClick={() => setShowBotSelector(!showBotSelector)}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {activeBot?.icon ? (
                      <img
                        src={activeBot.icon}
                        alt={activeBot.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Bot className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h2 className="text-sm font-semibold text-gray-900 truncate">
                      {activeBot?.name || 'Select Bot'}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {activeBot ? 'Active bot' : 'Choose a bot'}
                    </p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showBotSelector ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showBotSelector && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
                    <div className="p-2">
                      {bots.map((bot) => (
                        <button
                          key={bot._id}
                          onClick={() => handleBotChange(bot)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            activeBot?._id === bot._id
                              ? 'bg-gray-100 text-gray-900'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                            {bot.icon ? (
                              <img
                                src={bot.icon}
                                alt={bot.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Bot className="w-4 h-4 text-gray-600" />
                            )}
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <h3 className="text-sm font-semibold truncate">{bot.name}</h3>
                            <p className="text-xs text-gray-500 truncate">
                              {bot.description || 'AI Assistant'}
                            </p>
                          </div>
                          {activeBot?._id === bot._id && (
                            <Check className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

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
            {activeBot && (
              <>
                <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                      {activeBot?.icon ? (
                        <img
                          src={activeBot.icon}
                          alt={activeBot.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeBot.name)}&background=374151&color=ffffff&size=32`;
                          }}
                        />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{activeBot.name}</p>
                      <p className="text-xs text-gray-500">Active bot</p>
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
              </>
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