import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminSocialTasks, createSocialTask, updateSocialTask, deleteSocialTask } from '../../store/adminSlice';
import { Plus, Edit, Trash2, Eye, EyeOff, CheckSquare, Twitter, MessageCircle, Users, Youtube, Instagram, ExternalLink } from 'lucide-react';

const SocialTasksManagement = () => {
  const dispatch = useDispatch();
  const { socialTasks, loading } = useSelector((state) => state.admin);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    platform: 'twitter',
    action: 'follow',
    url: '',
    rewardType: 'tokens',
    rewardAmount: 100
  });

  // Load tasks on component mount
  useEffect(() => {
    dispatch(getAdminSocialTasks());
  }, [dispatch]);

  const platformOptions = [
    { value: 'twitter', label: 'Twitter', icon: Twitter },
    { value: 'telegram', label: 'Telegram', icon: MessageCircle },
    { value: 'discord', label: 'Discord', icon: Users },
    { value: 'youtube', label: 'YouTube', icon: Youtube },
    { value: 'instagram', label: 'Instagram', icon: Instagram }
  ];

  const actionOptions = [
    { value: 'follow', label: 'Follow' },
    { value: 'like', label: 'Like' },
    { value: 'share', label: 'Share' },
    { value: 'join', label: 'Join' },
    { value: 'subscribe', label: 'Subscribe' },
    { value: 'retweet', label: 'Retweet' }
  ];

  const getPlatformIcon = (platform) => {
    const platformOption = platformOptions.find(opt => opt.value === platform);
    return platformOption ? platformOption.icon : CheckSquare;
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'twitter': return 'from-blue-400 to-blue-500';
      case 'telegram': return 'from-blue-500 to-cyan-500';
      case 'discord': return 'from-indigo-500 to-purple-500';
      case 'youtube': return 'from-red-500 to-red-600';
      case 'instagram': return 'from-pink-500 to-purple-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const taskData = {
      title: formData.title,
      description: formData.description,
      platform: formData.platform,
      action: formData.action,
      url: formData.url,
      reward: {
        type: formData.rewardType,
        amount: formData.rewardAmount
      }
    };

    try {
      if (editingTask) {
        await dispatch(updateSocialTask({ id: editingTask._id, ...taskData })).unwrap();
      } else {
        await dispatch(createSocialTask(taskData)).unwrap();
      }
      
      setFormData({
        title: '',
        description: '',
        platform: 'twitter',
        action: 'follow',
        url: '',
        rewardType: 'tokens',
        rewardAmount: 100
      });
      setShowAddForm(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      platform: task.platform,
      action: task.action,
      url: task.url,
      rewardType: task.reward.type,
      rewardAmount: task.reward.amount
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await dispatch(deleteSocialTask(id)).unwrap();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const toggleActive = async (task) => {
    try {
      await dispatch(updateSocialTask({ 
        id: task._id, 
        isActive: !task.isActive 
      })).unwrap();
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
  };

  const getTaskStats = () => {
    const totalTasks = socialTasks.length;
    const activeTasks = socialTasks.filter(t => t.isActive).length;
    const totalCompletions = socialTasks.reduce((sum, t) => sum + (t.currentCompletions || 0), 0);
    const pendingVerifications = socialTasks.reduce((sum, t) => {
      return sum + (t.completions?.filter(c => c.status === 'pending').length || 0);
    }, 0);
    
    return { totalTasks, activeTasks, totalCompletions, pendingVerifications };
  };

  const stats = getTaskStats();

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
          <h1 className="text-3xl font-bold text-gray-900">Social Tasks Management</h1>
          <p className="text-gray-600 mt-1">Create and manage social media tasks for users</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalTasks}</p>
            </div>
            <CheckSquare className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Tasks</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeTasks}</p>
            </div>
            <Eye className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completions</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalCompletions}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">{stats.pendingVerifications}</p>
            </div>
            <ExternalLink className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Social Tasks</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {socialTasks.map((task) => {
                const PlatformIcon = getPlatformIcon(task.platform);
                const platformColor = getPlatformColor(task.platform);
                
                return (
                  <tr key={task._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${platformColor} rounded-lg flex items-center justify-center`}>
                          <PlatformIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{task.title}</div>
                          <div className="text-sm text-gray-500">{task.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                        {task.platform}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {task.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {task.reward.amount} {task.reward.type.toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleActive(task)}
                        className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                          task.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {task.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{task.isActive ? 'Active' : 'Inactive'}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(task)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => window.open(task.url, '_blank')}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Task Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingTask ? 'Edit Task' : 'Add New Task'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {platformOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                  <select
                    value={formData.action}
                    onChange={(e) => setFormData(prev => ({ ...prev, action: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {actionOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="https://..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reward Type</label>
                  <select
                    value={formData.rewardType}
                    onChange={(e) => setFormData(prev => ({ ...prev, rewardType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="tokens">Tokens</option>
                    <option value="tickets">Tickets</option>
                    <option value="spins">Spins</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.rewardAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, rewardAmount: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  {editingTask ? 'Update' : 'Create'} Task
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingTask(null);
                    setFormData({
                      title: '',
                      description: '',
                      platform: 'twitter',
                      action: 'follow',
                      url: '',
                      rewardType: 'tokens',
                      rewardAmount: 100
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

export default SocialTasksManagement;