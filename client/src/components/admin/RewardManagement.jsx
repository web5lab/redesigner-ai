import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminRewards, createReward, updateReward, deleteReward } from '../../store/adminSlice';
import { Plus, Edit, Trash2, Eye, EyeOff, Gift, Coins, Trophy, Zap, Crown, Sparkles } from 'lucide-react';

const RewardManagement= () => {
  const dispatch = useDispatch();
  const { rewards, loading } = useSelector((state) => state.admin);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingReward, setEditingReward] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: 'coins',
    probability: 10,
    rewardType: 'tokens' ,
    value: 0,
    description: ''
  });

  // Load rewards on component mount
  React.useEffect(() => {
    dispatch(getAdminRewards());
  }, [dispatch]);

  const iconOptions = [
    { value: 'coins', label: 'Coins', icon: Coins },
    { value: 'trophy', label: 'Trophy', icon: Trophy },
    { value: 'gift', label: 'Gift', icon: Gift },
    { value: 'zap', label: 'Zap', icon: Zap },
    { value: 'crown', label: 'Crown', icon: Crown },
    { value: 'sparkles', label: 'Sparkles', icon: Sparkles }
  ];

  const getIconComponent = (iconName) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName);
    return iconOption ? iconOption.icon : Coins;
  };

  const getRewardTypeColor = (type) => {
    switch (type) {
      case 'tokens': return 'from-green-400 to-emerald-500';
      case 'nft': return 'from-purple-400 to-pink-500';
      case 'bonus': return 'from-blue-400 to-cyan-500';
      case 'multiplier': return 'from-orange-400 to-red-500';
      case 'jackpot': return 'from-yellow-400 to-amber-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingReward) {
      dispatch(updateReward({ id: editingReward._id, ...formData }));
      setEditingReward(null);
    } else {
      dispatch(createReward(formData));
    }
    
    setFormData({
      name: '',
      icon: 'coins',
      probability: 10,
      rewardType: 'tokens',
      value: 0,
      description: ''
    });
    setShowAddForm(false);
  };

  const handleEdit = (reward) => {
    setEditingReward(reward);
    setFormData({
      name: reward.name,
      icon: reward.icon,
      probability: reward.probability,
      rewardType: reward.rewardType,
      value: reward.value,
      description: reward.description
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this reward?')) {
      dispatch(deleteReward(id));
    }
  };

  const toggleActive = (id) => {
    const reward = rewards.find(r => r._id === id);
    if (reward) {
      dispatch(updateReward({ id, isActive: !reward.isActive }));
    }
  };

  const totalProbability = rewards.filter(r => r.isActive).reduce((sum, r) => sum + r.probability, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reward Management</h1>
          <p className="text-gray-600 mt-1">Configure game rewards and their probabilities</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Reward</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Rewards</p>
              <p className="text-2xl font-bold text-gray-900">{rewards.length}</p>
            </div>
            <Gift className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Rewards</p>
              <p className="text-2xl font-bold text-green-600">{rewards.filter(r => r.isActive).length}</p>
            </div>
            <Eye className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Probability</p>
              <p className={`text-2xl font-bold ${totalProbability === 100 ? 'text-green-600' : 'text-orange-600'}`}>
                {totalProbability}%
              </p>
            </div>
            <Zap className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Value</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(rewards.reduce((sum, r) => sum + r.value, 0) / rewards.length)}
              </p>
            </div>
            <Trophy className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Probability Warning */}
      {totalProbability !== 100 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-orange-600" />
            <span className="text-orange-800 font-medium">
              Warning: Total probability is {totalProbability}%. It should equal 100% for proper distribution.
            </span>
          </div>
        </div>
      )}

      {/* Rewards List */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Current Rewards</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rewards.map((reward) => {
                const IconComponent = getIconComponent(reward.icon);
                return (
                  <tr key={reward._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${getRewardTypeColor(reward.rewardType)} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{reward.name}</div>
                          <div className="text-sm text-gray-500">{reward.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${getRewardTypeColor(reward.rewardType)} text-white`}>
                        {reward.rewardType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reward.probability}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reward.value > 0 ? reward.value.toLocaleString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleActive(reward._id)}
                        className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                          reward.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {reward.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{reward.isActive ? 'Active' : 'Inactive'}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(reward)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(reward._id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingReward ? 'Edit Reward' : 'Add New Reward'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {iconOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reward Type</label>
                <select
                  value={formData.rewardType}
                  onChange={(e) => setFormData(prev => ({ ...prev, rewardType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="tokens">Tokens</option>
                  <option value="nft">NFT</option>
                  <option value="bonus">Bonus</option>
                  <option value="multiplier">Multiplier</option>
                  <option value="jackpot">Jackpot</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Probability (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.probability}
                  onChange={(e) => setFormData(prev => ({ ...prev, probability: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <input
                  type="number"
                  min="0"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
                >
                  {editingReward ? 'Update' : 'Add'} Reward
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingReward(null);
                    setFormData({
                      name: '',
                      icon: 'coins',
                      probability: 10,
                      rewardType: 'tokens',
                      value: 0,
                      description: ''
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

export default RewardManagement;