import React, { useState } from 'react';
import { Send, Plus, Users, Coins, Gift, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const AirdropIntegration = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: '1',
      name: 'New Year Bonus',
      type: 'tokens',
      amount: 1000,
      recipients: [
        '0x742d35Cc6634C0532925a3b8D96698b0C03C4532',
        '0x8ba1f109551bD432803012645Hac136c0532925a',
        '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t'
      ],
      status: 'completed',
      createdAt: '2024-01-01T00:00:00Z',
      completedAt: '2024-01-01T12:00:00Z'
    },
    {
      id: '2',
      name: 'VIP Player Rewards',
      type: 'nft',
      amount: 1,
      recipients: [
        '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
        '0x5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b'
      ],
      status: 'active',
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '3',
      name: 'Weekly Jackpot Winners',
      type: 'tokens',
      amount: 5000,
      recipients: [
        '0x9f8e7d6c5b4a3928374650192837465019283746'
      ],
      status: 'draft',
      createdAt: '2024-01-20T14:00:00Z'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'tokens' ,
    amount: 100,
    recipients: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const recipientList = formData.recipients
      .split('\n')
      .map(addr => addr.trim())
      .filter(addr => addr.length > 0);

    const newCampaign = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      amount: formData.amount,
      recipients: recipientList,
      status: 'draft',
      createdAt: new Date().toISOString()
    };

    setCampaigns(prev => [...prev, newCampaign]);
    setFormData({
      name: '',
      type: 'tokens',
      amount: 100,
      recipients: ''
    });
    setShowCreateForm(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === id) {
        const updated = { ...campaign, status: newStatus };
        if (newStatus === 'completed') {
          updated.completedAt = new Date().toISOString();
        }
        return updated;
      }
      return campaign;
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'active': return Clock;
      case 'draft': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'draft': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const totalStats = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.status === 'active').length,
    completedCampaigns: campaigns.filter(c => c.status === 'completed').length,
    totalRecipients: campaigns.reduce((sum, c) => sum + c.recipients.length, 0)
  };

  const formatAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Airdrop Integration</h1>
          <p className="text-gray-600 mt-1">Manage token and NFT distributions to users</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-indigo-600">{totalStats.totalCampaigns}</p>
            </div>
            <Send className="w-8 h-8 text-indigo-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-blue-600">{totalStats.activeCampaigns}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{totalStats.completedCampaigns}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Recipients</p>
              <p className="text-2xl font-bold text-purple-600">{totalStats.totalRecipients}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => alert('Airdrop to all active users initiated!')}
            className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Airdrop to All Users</div>
                <div className="text-sm text-gray-600">Send rewards to all active players</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => alert('VIP airdrop campaign created!')}
            className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg hover:from-purple-100 hover:to-indigo-100 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">VIP Rewards</div>
                <div className="text-sm text-gray-600">Special rewards for top players</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => alert('Jackpot winner notification sent!')}
            className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg hover:from-yellow-100 hover:to-amber-100 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Jackpot Winners</div>
                <div className="text-sm text-gray-600">Distribute jackpot rewards</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Airdrop Campaigns</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaigns.map((campaign) => {
                const StatusIcon = getStatusIcon(campaign.status);
                return (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${
                          campaign.type === 'tokens' ? 'from-green-400 to-emerald-500' : 'from-purple-400 to-pink-500'
                        } rounded-lg flex items-center justify-center`}>
                          {campaign.type === 'tokens' ? 
                            <Coins className="w-5 h-5 text-white" /> : 
                            <Gift className="w-5 h-5 text-white" />
                          }
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-xs text-gray-500">ID: {campaign.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        campaign.type === 'tokens' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {campaign.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.type === 'tokens' ? `${campaign.amount.toLocaleString()} XXX` : `${campaign.amount} NFT`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.recipients.length} users
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span className="capitalize">{campaign.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(campaign.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {campaign.status === 'draft' && (
                          <button
                            onClick={() => handleStatusChange(campaign.id, 'active')}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                          >
                            Activate
                          </button>
                        )}
                        {campaign.status === 'active' && (
                          <button
                            onClick={() => handleStatusChange(campaign.id, 'completed')}
                            className="text-green-600 hover:text-green-900 transition-colors"
                          >
                            Complete
                          </button>
                        )}
                        <button className="text-indigo-600 hover:text-indigo-900 transition-colors">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Campaign Details */}
      {campaigns.length > 0 && (
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Campaign Recipients</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns[campaigns.length - 1].recipients.slice(0, 6).map((address, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">{formatAddress(address)}</span>
              </div>
            ))}
            {campaigns[campaigns.length - 1].recipients.length > 6 && (
              <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg">
                <span className="text-sm text-gray-600">
                  +{campaigns[campaigns.length - 1].recipients.length - 6} more recipients
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Airdrop Campaign</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Weekly Bonus Rewards"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="tokens">Tokens</option>
                  <option value="nft">NFT</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount {formData.type === 'tokens' ? '(XXX tokens)' : '(NFTs)'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipients (one wallet address per line)
                </label>
                <textarea
                  value={formData.recipients}
                  onChange={(e) => setFormData(prev => ({ ...prev, recipients: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={5}
                  placeholder="0x742d35Cc6634C0532925a3b8D96698b0C03C4532&#10;0x8ba1f109551bD432803012645Hac136c0532925a"
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all"
                >
                  Create Campaign
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setFormData({
                      name: '',
                      type: 'tokens',
                      amount: 100,
                      recipients: ''
                    });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirdropIntegration;