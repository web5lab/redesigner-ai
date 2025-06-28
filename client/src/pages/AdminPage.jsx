import React, { useState } from 'react';
import { Shield, Settings } from 'lucide-react';
import AdminSidebar from '../components/admin/AdminSidebar';
import RewardManagement from '../components/admin/RewardManagement';
import PricingControl from '../components/admin/PricingControl';
import UserTracking from '../components/admin/UserTracking';
import AirdropIntegration from '../components/admin/AirdropIntegration';
import ReferralManagement from '../components/admin/ReferralManagement';
import SocialTasksManagement from '../components/admin/SocialTasksManagement';
import SpinBoardManagement from '../components/admin/SpinBoardManagement';

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('rewards');

  const renderContent = () => {
    switch (activeSection) {
      case 'rewards':
        return <RewardManagement />;
      case 'pricing':
        return <PricingControl />;
      case 'users':
        return <UserTracking />;
      case 'airdrops':
        return <AirdropIntegration />;
      case 'referrals':
        return <ReferralManagement />;
      case 'social-tasks':
        return <SocialTasksManagement />;
      case 'spin-board':
        return <SpinBoardManagement />;
      default:
        return <RewardManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-sm text-gray-600">XXX Gaming Hub Management Panel</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                System Online
              </div>
              <Settings className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </header>
      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;