import React from 'react';
import { Trophy, Ticket, RotateCcw, History, Users, Gift, LogOut, Wallet, Zap, Settings } from 'lucide-react';



const UserSidebar = ({ 
  activeSection, 
  onSectionChange, 
  wallet,
  onDisconnect,
  userStats 
}) => {
  const menuItems = [
    {
      id: 'buy',
      label: 'Buy Tickets',
      icon: Ticket,
      description: 'Purchase spin tickets'
    },
    {
      id: 'spin',
      label: 'Spin Game',
      icon: RotateCcw,
      description: 'Play the wheel'
    },
    {
      id: 'history',
      label: 'Spin History',
      icon: History,
      description: 'View past spins'
    },
    {
      id: 'referral',
      label: 'Refer & Earn',
      icon: Users,
      description: 'Invite friends'
    },
    {
      id: 'tasks',
      label: 'Social Tasks',
      icon: Gift,
      description: 'Complete tasks'
    }
  ];

  const formatAddress = (address) => `${address?.slice(0, 6)}...${address?.slice(-4)}`;

  return (
    <aside className="w-80 bg-white/90 backdrop-blur-lg border-r border-yellow-200 min-h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-yellow-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">XXX Gaming Hub</h1>
            <p className="text-sm text-gray-600">Premium Web3 Gaming</p>
          </div>
        </div>

        {/* Wallet Info */}
        {wallet && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center space-x-3 mb-3">
              <Wallet className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Connected Wallet</p>
                <p className="text-xs text-gray-600">{formatAddress(wallet?.address)}</p>
              </div>
            </div>
            
            {userStats && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="text-center">
                  <div className="font-bold text-green-600">{userStats.tokenBalance.toLocaleString()}</div>
                  <div className="text-gray-600">XXX Tokens</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600">{userStats.tickets}</div>
                  <div className="text-gray-600">Tickets</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id )}
                className={`w-full text-left p-4 rounded-xl transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg transform scale-105'
                    : 'hover:bg-yellow-50 text-gray-700 hover:text-gray-900 hover:scale-102'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-yellow-600'}`} />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className={`text-sm ${isActive ? 'text-yellow-100' : 'text-gray-500'}`}>
                      {item.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Quick Stats */}
      {userStats && (
        <div className="p-6 border-t border-yellow-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-600">Total Spins</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{userStats.totalSpins}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">Total Winnings</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{userStats.totalWinnings.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="p-6 border-t border-yellow-200 space-y-3">
        <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        
        {onDisconnect && (
          <button
            onClick={onDisconnect}
            className="w-full flex items-center space-x-3 p-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Disconnect Wallet</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default UserSidebar;