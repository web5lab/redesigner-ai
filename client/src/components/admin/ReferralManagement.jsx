import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminReferrals } from '../../store/adminSlice';
import { UserPlus, TrendingUp, Users, Gift, Target, Award } from 'lucide-react';

const ReferralManagement = () => {
  const dispatch = useDispatch();
  const { referrals, referralStats, loading } = useSelector((state) => state.admin);

  // Load referral data on component mount
  useEffect(() => {
    dispatch(getAdminReferrals());
  }, [dispatch]);

  // Static milestone rewards for display
  const milestoneRewards = [
    { referrals: 5, reward: 1500, type: 'tokens', description: 'First milestone bonus' },
    { referrals: 10, reward: 5000, type: 'tokens', description: 'Includes rare NFT' },
    { referrals: 25, reward: 15000, type: 'tokens', description: 'VIP status unlock' },
    { referrals: 50, reward: 50000, type: 'tokens', description: 'Ultimate reward tier' }
  ];

  const formatAddress = (address) => `${address?.slice(0, 6)}...${address?.slice(-4)}`;

  // Calculate stats from referrals data
  const calculateStats = () => {
    if (!referrals || referrals.length === 0) {
      return {
        totalReferrals: 0,
        activeReferrals: 0,
        totalRewardsPaid: 0,
        conversionRate: 0
      };
    }

    const totalReferrals = referrals.length;
    const activeReferrals = referrals.filter(r => r.status === 'active' || r.status === 'completed').length;
    const totalRewardsPaid = referralStats?.reduce((sum, stat) => sum + (stat.totalRewards || 0), 0) || 0;
    const conversionRate = totalReferrals > 0 ? ((activeReferrals / totalReferrals) * 100).toFixed(1) : 0;

    return {
      totalReferrals,
      activeReferrals,
      totalRewardsPaid,
      conversionRate
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Referral System Management</h1>
          <p className="text-gray-600 mt-1">Configure referral rewards and track performance</p>
        </div>
        <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
          <UserPlus className="w-5 h-5" />
          <span className="font-medium">System Active</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Referrals</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalReferrals.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Referrals</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeReferrals.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rewards Paid</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalRewardsPaid.toLocaleString()} XXX</p>
            </div>
            <Gift className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-orange-600">{stats.conversionRate}%</p>
            </div>
            <Target className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Referral Rewards Configuration */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Referral Rewards Configuration</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Per Referral Reward</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-700">Referrer gets:</span>
                  <span className="font-bold text-blue-900">200 XXX + 5 Spins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Referred gets:</span>
                  <span className="font-bold text-blue-900">100 XXX + 3 Spins</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Qualification Rules</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-700">Min Spins:</span>
                  <span className="font-bold text-green-900">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Min Spent:</span>
                  <span className="font-bold text-green-900">10 XXX</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Time Limit:</span>
                  <span className="font-bold text-green-900">30 days</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2">System Settings</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-purple-700">Auto-approve:</span>
                  <span className="font-bold text-purple-900">Enabled</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Code Length:</span>
                  <span className="font-bold text-purple-900">6 chars</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Notifications:</span>
                  <span className="font-bold text-purple-900">Disabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Rewards */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Milestone Rewards</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {milestoneRewards.map((milestone, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-200">
                <div className="text-center">
                  <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">{milestone.referrals} Referrals</h3>
                  <p className="text-2xl font-bold text-yellow-600">{milestone.reward.toLocaleString()} XXX</p>
                  <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Referrals */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Referrals</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referred User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {referrals.map((referral) => (
                <tr key={referral.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {formatAddress(referral.referrerAddress)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatAddress(referral.referredAddress)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      referral.status === 'completed' || referral.status === 'active'
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {referral.status === 'completed' || referral.status === 'active' ? 'Active' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(referral.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {referral.rewardClaimed ? (
                      <span className="text-green-600 font-semibold text-sm">Claimed</span>
                    ) : referral.status === 'completed' || referral.status === 'active' ? (
                      <span className="text-blue-600 font-semibold text-sm">Ready to Claim</span>
                    ) : (
                      <span className="text-gray-500 text-sm">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">System Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Referral Activity (days)
              </label>
              <input
                type="number"
                defaultValue={7}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Referral Code Length
              </label>
              <input
                type="number"
                defaultValue={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Auto-approve referrals</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                Enabled
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Email notifications</span>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-400 transition-colors">
                Disabled
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-blue-200">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralManagement;