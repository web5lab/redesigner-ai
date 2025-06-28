import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, CheckSquare, Twitter, MessageCircle, Users, Youtube, Instagram, ExternalLink } from 'lucide-react';

const SocialTasksManagement= () => {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Follow SpinWin on Twitter',
      description: 'Follow our official Twitter account for updates',
      platform: 'twitter',
      action: 'follow',
      url: 'https://twitter.com/spinwin_official',
      reward: { type: 'tokens', amount: 100 },
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'Join Telegram Community',
      description: 'Join our Telegram group to chat with players',
      platform: 'telegram',
      action: 'join',
      url: 'https://t.me/spinwin_community',
      reward: { type: 'spins', amount: 3 },
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '3',
      title: 'Subscribe to YouTube',
      description: 'Subscribe to our YouTube channel',
      platform: 'youtube',
      action: 'subscribe',
      url: 'https://youtube.com/@spinwin',
      reward: { type: 'tokens', amount: 250 },
      isActive: false,
      createdAt: '2024-01-17T09:15:00Z'
    }
  ]);

  const [completions] = useState([
    {
      id: '1',
      userAddress: '0x742d35Cc6634C0532925a3b8D96698b0C03C4532',
      taskId: '1',
      status: 'completed',
      completedAt: '2024-01-18T12:00:00Z',
      verifiedAt: '2024-01-18T12:05:00Z'
    },
    {
      id: '2',
      userAddress: '0x8ba1f109551bD432803012645Hac136c0532925a',
      taskId: '1',
      status: 'pending',
      completedAt: '2024-01-20T10:30:00Z'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    platform: 'twitter' ,
    action: 'follow' ,
    url: '',
    rewardType: 'tokens' ,
    rewardAmount: 100
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingTask) {
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id 
          ? {
              ...task,
              title: formData.title,
              description: formData.description,
              platform: formData.platform,
              action: formData.action,
              url: formData.url,
              reward: {
                type: formData.rewardType,
                amount: formData.rewardAmount
              }
            }
          : task
      ));
      setEditingTask(null);
    } else {
      const newTask= {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        platform: formData.platform,
        action: formData.action,
        url: formData.url,
        reward: {
          type: formData.rewardType,
          amount: formData.rewardAmount
        },
        isActive: true,
        createdAt: new Date().toISOString()
      };
      setTasks(prev => [...prev, newTask]);
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

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== id));
    }
  };

  const toggleActive = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, isActive: !task.isActive }
        : task
    ));
  };

  const getTaskStats = () => {
    const totalTasks = tasks.length;
    const activeTasks = tasks.filter(t => t.isActive).length;
    const totalCompletions = completions.filter(c => c.status === 'completed').length;
    const pendingVerifications = completions.filter(c => c.status === 'pending').length;
    
    return { totalTasks, activeTasks, totalCompletions, pendingVerifications };
  };

  const stats = getTaskStats();

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
              {tasks.map((task) => {
                const PlatformIcon = getPlatformIcon(task.platform);
                const platformColor = getPlatformColor(task.platform);
                
                return (
                  <tr key={task.id} className="hover:bg-gray-50">
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
                        onClick={() => toggleActive(task.id)}
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
                        onClick={() => handleDelete(task.id)}
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

      {/* Recent Completions */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Task Completions</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {completions.map((completion) => {
                const task = tasks.find(t => t.id === completion.taskId);
                if (!task) return null;
                
                return (
                  <tr key={completion.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {completion.userAddress.slice(0, 6)}...{completion.userAddress.slice(-4)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {task.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        completion.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {completion.status === 'completed' ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {completion.completedAt ? new Date(completion.completedAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {completion.status === 'pending' && (
                        <button className="text-green-600 hover:text-green-900 transition-colors">
                          Verify
                        </button>
                      )}
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
                    onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value  }))}
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
                    onChange={(e) => setFormData(prev => ({ ...prev, rewardType: e.target.value  }))}
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