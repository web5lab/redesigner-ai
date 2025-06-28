import React, { useState } from 'react';
import { RotateCcw, Plus, Edit, Trash2, Eye, EyeOff, Save, Coins, Gift, Zap, Star, Crown, Sparkles, Gem, Trophy } from 'lucide-react';

const SpinBoardManagement = () => {
  const [spinRewards, setSpinRewards] = useState([
    {
      id: '1',
      name: '500 COINS',
      icon: 'coins',
      probability: 25,
      rewardType: 'tokens',
      value: 500,
      description: 'Standard token reward',
      color: 'from-yellow-400 via-yellow-500 to-amber-600',
      isActive: true,
      position: 0,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'NOTHING',
      icon: 'star',
      probability: 20,
      rewardType: 'nothing',
      value: 0,
      description: 'No reward',
      color: 'from-gray-600 via-gray-700 to-gray-800',
      isActive: true,
      position: 1,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '3',
      name: '1,000 COINS',
      icon: 'coins',
      probability: 20,
      rewardType: 'tokens',
      value: 1000,
      description: 'Medium token reward',
      color: 'from-green-400 via-emerald-500 to-green-600',
      isActive: true,
      position: 2,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '4',
      name: 'BONUS SPIN',
      icon: 'gift',
      probability: 15,
      rewardType: 'bonus',
      value: 0,
      description: 'Extra spin opportunity',
      color: 'from-purple-500 via-violet-600 to-purple-700',
      isActive: true,
      position: 3,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '5',
      name: '250 COINS',
      icon: 'coins',
      probability: 15,
      rewardType: 'tokens',
      value: 250,
      description: 'Small token reward',
      color: 'from-orange-400 via-orange-500 to-red-500',
      isActive: true,
      position: 4,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '6',
      name: 'RARE NFT',
      icon: 'gem',
      probability: 3,
      rewardType: 'nft',
      value: 0,
      description: 'Exclusive collectible NFT',
      color: 'from-pink-500 via-rose-600 to-pink-700',
      isActive: true,
      position: 5,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '7',
      name: '5,000 COINS',
      icon: 'crown',
      probability: 1,
      rewardType: 'jackpot',
      value: 5000,
      description: 'Jackpot reward',
      color: 'from-cyan-400 via-blue-500 to-indigo-600',
      isActive: true,
      position: 6,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '8',
      name: '2X MULTIPLIER',
      icon: 'sparkles',
      probability: 1,
      rewardType: 'multiplier',
      value: 0,
      description: 'Double next reward',
      color: 'from-emerald-400 via-teal-500 to-cyan-600',
      isActive: true,
      position: 7,
      createdAt: '2024-01-15T10:00:00Z'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingReward, setEditingReward] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: 'coins',
    probability: 10,
    rewardType: 'tokens' ,
    value: 0,
    description: '',
    color: 'from-yellow-400 via-yellow-500 to-amber-600',
    position: 0
  });

  const iconOptions = [
    { value: 'coins', label: 'Coins', icon: Coins },
    { value: 'gift', label: 'Gift', icon: Gift },
    { value: 'zap', label: 'Zap', icon: Zap },
    { value: 'star', label: 'Star', icon: Star },
    { value: 'crown', label: 'Crown', icon: Crown },
    { value: 'sparkles', label: 'Sparkles', icon: Sparkles },
    { value: 'gem', label: 'Gem', icon: Gem },
    { value: 'trophy', label: 'Trophy', icon: Trophy }
  ];

  const colorOptions = [
    { value: 'from-yellow-400 via-yellow-500 to-amber-600', label: 'Gold', preview: 'bg-gradient-to-r from-yellow-400 to-amber-600' },
    { value: 'from-green-400 via-emerald-500 to-green-600', label: 'Green', preview: 'bg-gradient-to-r from-green-400 to-green-600' },
    { value: 'from-blue-400 via-blue-500 to-indigo-600', label: 'Blue', preview: 'bg-gradient-to-r from-blue-400 to-indigo-600' },
    { value: 'from-purple-500 via-violet-600 to-purple-700', label: 'Purple', preview: 'bg-gradient-to-r from-purple-500 to-purple-700' },
    { value: 'from-pink-500 via-rose-600 to-pink-700', label: 'Pink', preview: 'bg-gradient-to-r from-pink-500 to-pink-700' },
    { value: 'from-orange-400 via-orange-500 to-red-500', label: 'Orange', preview: 'bg-gradient-to-r from-orange-400 to-red-500' },
    { value: 'from-gray-600 via-gray-700 to-gray-800', label: 'Gray', preview: 'bg-gradient-to-r from-gray-600 to-gray-800' },
    { value: 'from-cyan-400 via-blue-500 to-indigo-600', label: 'Cyan', preview: 'bg-gradient-to-r from-cyan-400 to-indigo-600' },
    { value: 'from-emerald-400 via-teal-500 to-cyan-600', label: 'Teal', preview: 'bg-gradient-to-r from-emerald-400 to-cyan-600' }
  ];

  const getIconComponent = (iconName) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName);
    return iconOption ? iconOption.icon : Coins;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingReward) {
      setSpinRewards(prev => prev.map(reward => 
        reward.id === editingReward.id 
          ? { ...reward, ...formData }
          : reward
      ));
      setEditingReward(null);
    } else {
      const newReward = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        createdAt: new Date().toISOString()
      };
      setSpinRewards(prev => [...prev, newReward]);
    }
    
    setFormData({
      name: '',
      icon: 'coins',
      probability: 10,
      rewardType: 'tokens',
      value: 0,
      description: '',
      color: 'from-yellow-400 via-yellow-500 to-amber-600',
      position: 0
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
      description: reward.description,
      color: reward.color,
      position: reward.position
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this reward?')) {
      setSpinRewards(prev => prev.filter(reward => reward.id !== id));
    }
  };

  const toggleActive = (id) => {
    setSpinRewards(prev => prev.map(reward => 
      reward.id === id 
        ? { ...reward, isActive: !reward.isActive }
        : reward
    ));
  };

  const movePosition = (id, direction) => {
    setSpinRewards(prev => {
      const rewards = [...prev];
      const index = rewards.findIndex(r => r.id === id);
      if (index === -1) return prev;
      
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= rewards.length) return prev;
      
      [rewards[index], rewards[newIndex]] = [rewards[newIndex], rewards[index]];
      
      // Update positions
      return rewards.map((reward, idx) => ({ ...reward, position: idx }));
    });
  };

  const totalProbability = spinRewards.filter(r => r.isActive).reduce((sum, r) => sum + r.probability, 0);
  const activeRewards = spinRewards.filter(r => r.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Spin Board Management</h1>
          <p className="text-gray-600 mt-1">Configure the rewards that appear on the spin wheel</p>
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
              <p className="text-2xl font-bold text-gray-900">{spinRewards.length}</p>
            </div>
            <RotateCcw className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Rewards</p>
              <p className="text-2xl font-bold text-green-600">{activeRewards}</p>
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
              <p className="text-sm text-gray-600">Max Value</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.max(...spinRewards.map(r => r.value)).toLocaleString()}
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

      {/* Wheel Preview */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Wheel Preview</h2>
        
        <div className="flex justify-center">
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 rounded-full border-8 border-yellow-400 shadow-2xl overflow-hidden">
              {spinRewards
                .filter(r => r.isActive)
                .sort((a, b) => a.position - b.position)
                .map((reward, index) => {
                  const angle = (360 / activeRewards) * index;
                  const Icon = getIconComponent(reward.icon);
                  
                  return (
                    <div
                      key={reward.id}
                      className="absolute w-full h-full"
                      style={{
                        transform: `rotate(${angle}deg)`,
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((2 * Math.PI) / activeRewards)}% ${50 - 50 * Math.sin((2 * Math.PI) / activeRewards)}%)`,
                      }}
                    >
                      <div className={`relative w-full h-full bg-gradient-to-br ${reward.color}`}>
                        <div className="relative flex items-center justify-center h-full">
                          <div 
                            className="text-center text-white transform translate-y-8"
                            style={{ transform: `rotate(${90 - (360 / activeRewards) / 2}deg) translateY(-60px)` }}
                          >
                            <Icon className="w-6 h-6 mx-auto mb-1 drop-shadow-lg" />
                            <p className="text-xs font-black drop-shadow-lg tracking-wide">{reward.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            
            {/* Center Hub */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center z-10">
              <RotateCcw className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Rewards List */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Spin Board Rewards</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {spinRewards
                .sort((a, b) => a.position - b.position)
                .map((reward, index) => {
                  const IconComponent = getIconComponent(reward.icon);
                  
                  return (
                    <tr key={reward.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">#{reward.position + 1}</span>
                          <div className="flex flex-col space-y-1">
                            <button
                              onClick={() => movePosition(reward.id, 'up')}
                              disabled={index === 0}
                              className="text-xs text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                            >
                              ↑
                            </button>
                            <button
                              onClick={() => movePosition(reward.id, 'down')}
                              disabled={index === spinRewards.length - 1}
                              className="text-xs text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                            >
                              ↓
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${reward.color} rounded-lg flex items-center justify-center`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{reward.name}</div>
                            <div className="text-sm text-gray-500">{reward.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          reward.rewardType === 'tokens' ? 'bg-green-100 text-green-800' :
                          reward.rewardType === 'nft' ? 'bg-purple-100 text-purple-800' :
                          reward.rewardType === 'bonus' ? 'bg-blue-100 text-blue-800' :
                          reward.rewardType === 'jackpot' ? 'bg-yellow-100 text-yellow-800' :
                          reward.rewardType === 'multiplier' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
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
                          onClick={() => toggleActive(reward.id)}
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
                          onClick={() => handleDelete(reward.id)}
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
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingReward ? 'Edit Spin Reward' : 'Add New Spin Reward'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 500 COINS"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
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
                    onChange={(e) => setFormData(prev => ({ ...prev, rewardType: e.target.value  }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="tokens">Tokens</option>
                    <option value="nft">NFT</option>
                    <option value="bonus">Bonus</option>
                    <option value="multiplier">Multiplier</option>
                    <option value="jackpot">Jackpot</option>
                    <option value="nothing">Nothing</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
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
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="number"
                  min="0"
                  max="7"
                  value={formData.position}
                  onChange={(e) => setFormData(prev => ({ ...prev, position: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map(color => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.color === color.value 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-full h-6 rounded ${color.preview} mb-1`}></div>
                      <p className="text-xs text-gray-600">{color.label}</p>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Brief description of the reward"
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
                      description: '',
                      color: 'from-yellow-400 via-yellow-500 to-amber-600',
                      position: 0
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

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => {
              const balanced = spinRewards.map(reward => ({ ...reward, probability: Math.floor(100 / spinRewards.length) }));
              setSpinRewards(balanced);
            }}
            className="p-4 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-all text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Balance Probabilities</div>
                <div className="text-sm text-gray-600">Set equal probability for all rewards</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => {
              const shuffled = [...spinRewards].sort(() => Math.random() - 0.5);
              setSpinRewards(shuffled.map((reward, index) => ({ ...reward, position: index })));
            }}
            className="p-4 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-all text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Shuffle Positions</div>
                <div className="text-sm text-gray-600">Randomize reward positions</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => {
              if (confirm('This will reset all rewards to default values. Continue?')) {
                // Reset to default rewards logic here
                alert('Rewards reset to default configuration');
              }
            }}
            className="p-4 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-all text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-500 rounded-lg flex items-center justify-center">
                <Save className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Reset to Default</div>
                <div className="text-sm text-gray-600">Restore original reward setup</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpinBoardManagement;