import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitTask, claimTaskReward } from '../store/socialSlice';
import { CheckSquare, Twitter, MessageCircle, Users, Youtube, Instagram, ExternalLink, Gift, Clock, CheckCircle, Star, Zap } from 'lucide-react';



const SocialTasks= ({ userAddress, onTaskComplete }) => {
  const dispatch = useDispatch();
  const { tasks, submitting, claiming } = useSelector((state) => state.social);

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'twitter': return Twitter;
      case 'telegram': return MessageCircle;
      case 'discord': return Users;
      case 'youtube': return Youtube;
      case 'instagram': return Instagram;
      default: return CheckSquare;
    }
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

  const getRewardIcon = (type) => {
    switch (type) {
      case 'tokens': return Zap;
      case 'tickets': return Gift;
      case 'spins': return Star;
      default: return Gift;
    }
  };

  const getRewardColor = (type) => {
    switch (type) {
      case 'tokens': return 'text-green-600';
      case 'tickets': return 'text-blue-600';
      case 'spins': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const handleTaskAction = async (task) => {
    const status = task.status;
    
    if (status === 'verified' && task.rewardClaimed) return;
    
    if (status === 'verified' && !task.rewardClaimed) {
      // Claim reward
      try {
        const result = await dispatch(claimTaskReward(task.id)).unwrap();
        if (onTaskComplete) {
          onTaskComplete(result.reward);
        }
      } catch (error) {
        console.error('Failed to claim reward:', error);
      }
      return;
    }

    // Open task URL
    window.open(task.url, '_blank');
    
    // Submit task completion
    if (status === 'available') {
      try {
        await dispatch(submitTask({ 
          taskId: task.id, 
          proof: `Completed ${task.action} on ${task.platform}` 
        })).unwrap();
      } catch (error) {
        console.error('Failed to submit task:', error);
      }
    }
  };

  const completedTasks = tasks.filter(t => t.status === 'verified').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const totalRewards = tasks
    .filter(task => task.status === 'verified' && task.rewardClaimed)
    .reduce((sum, task) => {
      if (task.reward.type === 'tokens') return sum + task.reward.amount;
      return sum;
    }, 0);

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
          <CheckSquare className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Social Tasks</h1>
        <p className="text-gray-600">Complete social media tasks to earn free rewards!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{tasks.length}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Available Tasks</h3>
          <p className="text-sm text-gray-600">Total tasks</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{completedTasks}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Completed</h3>
          <p className="text-sm text-gray-600">Tasks finished</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{pendingTasks}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Pending</h3>
          <p className="text-sm text-gray-600">Awaiting verification</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{totalRewards.toLocaleString()}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Tokens Earned</h3>
          <p className="text-sm text-gray-600">From tasks</p>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => {
          const PlatformIcon = getPlatformIcon(task.platform);
          const RewardIcon = getRewardIcon(task.reward.type);
          const status = task.status;
          const platformColor = getPlatformColor(task.platform);
          const rewardColor = getRewardColor(task.reward.type);
          
          return (
            <div
              key={task.id}
              className={`bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border transition-all transform hover:scale-105 ${
                status === 'verified' && task.rewardClaimed
                  ? 'border-green-300 bg-green-50/50' 
                : status === 'verified'
                  ? 'border-blue-300 bg-blue-50/50'
                  : status === 'pending'
                  ? 'border-orange-300 bg-orange-50/50'
                  : 'border-yellow-200 hover:border-yellow-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${platformColor} rounded-xl flex items-center justify-center`}>
                  <PlatformIcon className="w-6 h-6 text-white" />
                </div>
                
                {status === 'verified' && task.rewardClaimed && (
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Completed
                  </div>
                )}
                
                {status === 'verified' && !task.rewardClaimed && (
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    Ready to Claim
                  </div>
                )}
                
                {status === 'pending' && (
                  <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                    Pending
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{task.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <RewardIcon className={`w-4 h-4 ${rewardColor}`} />
                  <span className={`font-semibold ${rewardColor}`}>
                    +{task.reward.amount} {task.reward.type.toUpperCase()}
                  </span>
                </div>
                <span className="text-xs text-gray-500 capitalize">
                  {task.platform} • {task.action}
                </span>
              </div>

              <button
                onClick={() => handleTaskAction(task)}
                disabled={status === 'verified' && task.rewardClaimed || submitting || claiming}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                  status === 'verified' && task.rewardClaimed
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : status === 'verified' && !task.rewardClaimed
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : status === 'pending'
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
                } ${(submitting || claiming) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {submitting || claiming ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : status === 'verified' && task.rewardClaimed ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Completed</span>
                  </>
                ) : status === 'verified' && !task.rewardClaimed ? (
                  <>
                    <Gift className="w-4 h-4" />
                    <span>Claim Reward</span>
                  </>
                ) : status === 'pending' ? (
                  <>
                    <Clock className="w-4 h-4" />
                    <span>Pending Verification</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    <span>Start Task</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Daily Bonus */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Daily Task Bonus</h2>
          <p className="text-gray-600 mb-6">Complete 3 tasks today to unlock a special bonus!</p>
          
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full ${
                    i <= completedTasks ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {completedTasks}/3 tasks completed
            </span>
          </div>
          
          {completedTasks >= 3 ? (
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105">
              Claim Daily Bonus: 500 XXX + 10 Spins
            </button>
          ) : (
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <p className="text-purple-600 font-semibold">Daily Bonus Reward</p>
              <p className="text-2xl font-bold text-purple-700">500 XXX + 10 Free Spins</p>
            </div>
          )}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">How Social Tasks Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Start Task</h3>
            <p className="text-gray-600">Click on a task to open the social media platform and complete the required action</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Verify</h3>
            <p className="text-gray-600">Return to the platform and click verify to confirm you completed the task</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Claim Reward</h3>
            <p className="text-gray-600">Receive your tokens, tickets, or free spins instantly after verification</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialTasks;