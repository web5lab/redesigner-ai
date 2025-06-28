import React, { useState } from 'react';
import { UserPlus, Edit, Save, TrendingUp, Users, Gift, Settings, Award, Target } from 'lucide-react';

const ReferralManagement= () => {
  const [referralRewards, setReferralRewards] = useState([
    {
      id: '1',
      type: 'tokens',
      amount: 200,
      description: 'Per successful referral',
      isActive: true
    },
    {
      id: '2',
      type: 'spins',
      amount: 5,
      description: 'Bonus spins for referrer',
      isActive: true
    },
    {
      id: '3',
      type: 'tokens',
      amount: 100,
      description: 'Welcome bonus for new user',
      isActive: true
    }
  ]);

  const [milestoneRewards, setMilestoneRewards] = useState([
    { referrals: 5, reward: 1500, type: 'tokens', description: 'First milestone bonus' },
    { referrals: 10, reward: 5000, type: 'tokens', description: 'Includes rare NFT' },
    { referrals: 25, reward: 15000, type: 'tokens', description: 'VIP status unlock' },
    { referrals: 50, reward: 50000, type: 'tokens', description: 'Ultimate reward tier' }
  ]);

  const [referralStats] = useState({
    totalReferrals: 1247,
    activeReferrals: 892,
    totalRewardsPaid: 248500,
    conversionRate: 71.5
  });

  const [recentReferrals] = useState([
    {
      id: '1',
      referrerAddress: '0x742d35Cc6634C0532925a3b8D96698b0C03C4532',
      referredAddress: '0x8ba1f109551bD432803012645Hac136c0532925a',
      status: 'completed',
      rewardClaimed: true,
      createdAt: '2024-01-20T10:30:00Z',
      completedAt: '2024-01-20T15:45:00Z'
    },
    {
      id: '2',
      referrerAddress: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
      referredAddress: '0x9f8e7d6c5b4a3928374650192837465019283746',
      status: 'pending',
      rewardClaimed: false,
      createdAt: '2024-01-20T14:20:00Z'
    }
  ]);

  const [editingReward, setEditingReward] = useState(null);
  const [editForm, setEditForm] = useState({ type: 'tokens', amount: 0, description: '' });

  const handleEditReward = (reward) => {
    setEditingReward(reward.id);
    setEditForm({
      type: reward.type,
      amount: reward.amount,
      description: reward.description
    });
  };

  const handleSaveReward = (id) => {
    setReferralRewards(prev => prev.map(reward => 
      reward.id === id 
        ? { ...reward, ...editForm }
        : reward
    ));
    setEditingReward(null);
  };

  const toggleRewardActive = (id) => {
    setReferralRewards(prev => prev.map(reward => 
      reward.id === id 
        ? { ...reward, isActive: !reward.isActive }
        : reward
    ));
  };

  const formatAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

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
              <p className="text-2xl font-bold text-blue-600">{referralStats.totalReferrals.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Referrals</p>
              <p className="text-2xl font-bold text-green-600">{referralStats.activeReferrals.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rewards Paid</p>
              <p className="text-2xl font-bold text-purple-600">{referralStats.totalRewardsPaid.toLocaleString()} XXX</p>
            </div>
            <Gift className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-orange-600">{referralStats.conversionRate}%</p>
            </div>
            <Target className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Referral Rewards Configuration */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Referral Rewards Configuration</h2>
            <Settings className="w-5 h-5 text-gray-500" />
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {referralRewards.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  {editingReward === reward.id ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <select
                        value={editForm.type}
                        onChange={(e) => setEditForm(prev => ({ ...prev, type: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="tokens">Tokens</option>
                        <option value="tickets">Tickets</option>
                        <option value="spins">Spins</option>
                      </select>
                      
                      <input
                        type="number"
                        value={editForm.amount}
                        onChange={(e) => setEditForm(prev => ({ ...prev, amount: parseInt(e.target.value) }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Amount"
                      />
                      
                      <input
                        type="text"
                        value={editForm.description}
                        onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Description"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          reward.type === 'tokens' ? 'bg-green-100 text-green-800' :
                          reward.type === 'tickets' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {reward.type.toUpperCase()}
                        </span>
                        <span className="font-semibold text-gray-900">{reward.amount}</span>
                        <span className="text-gray-600">{reward.description}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleRewardActive(reward.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      reward.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {reward.isActive ? 'Active' : 'Inactive'}
                  </button>
                  
                  {editingReward === reward.id ? (
                    <button
                      onClick={() => handleSaveReward(reward.id)}
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditReward(reward)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
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
              {recentReferrals.map((referral) => (
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
                      referral.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {referral.status === 'completed' ? 'Active' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(referral.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {referral.rewardClaimed ? (
                      <span className="text-green-600 font-semibold text-sm">Claimed</span>
                    ) : referral.status === 'completed' ? (
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