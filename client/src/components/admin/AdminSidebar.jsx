import React from 'react';
import { Gift, DollarSign, Users, Send, Trophy, BarChart3, UserPlus, CheckSquare, RotateCcw } from 'lucide-react';



const AdminSidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    {
      id: 'rewards',
      label: 'Reward Management',
      icon: Gift,
      description: 'Manage game rewards'
    },
    {
      id: 'pricing',
      label: 'Pricing Control',
      icon: DollarSign,
      description: 'Set ticket prices & discounts'
    },
    {
      id: 'users',
      label: 'User Tracking',
      icon: Users,
      description: 'Monitor user activity'
    },
    {
      id: 'referrals',
      label: 'Referral System',
      icon: UserPlus,
      description: 'Manage refer & earn program'
    },
    {
      id: 'social-tasks',
      label: 'Social Tasks',
      icon: CheckSquare,
      description: 'Manage social media tasks'
    },
    {
      id: 'spin-board',
      label: 'Spin Board',
      icon: RotateCcw,
      description: 'Configure wheel rewards'
    }
  ];

  return (
    <aside className="w-80 bg-white/80 backdrop-blur-lg border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center space-x-3 mb-3">
              <Trophy className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Quick Stats</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-center">
                <div className="font-bold text-blue-600">1,247</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-green-600">$45.2K</div>
                <div className="text-gray-600">Revenue</div>
              </div>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id )}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className={`text-sm ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                      {item.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">System Health</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-yellow-700">Server Load</span>
              <span className="text-yellow-800 font-medium">23%</span>
            </div>
            <div className="w-full bg-yellow-200 rounded-full h-1.5">
              <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '23%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;