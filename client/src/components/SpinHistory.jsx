import React from 'react';
import { History, Trophy, Gift, Zap, Star, Calendar, TrendingUp, Award } from 'lucide-react';



const SpinHistory = ({ history }) => {
  const getRewardIcon = (type) => {
    switch (type) {
      case 'tokens': return Zap;
      case 'nft': return Trophy;
      case 'bonus': return Gift;
      default: return Star;
    }
  };

  const getRewardColor = (type) => {
    switch (type) {
      case 'tokens': return 'from-green-400 to-green-500';
      case 'nft': return 'from-purple-400 to-purple-500';
      case 'bonus': return 'from-blue-400 to-blue-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const totalWinnings = history.reduce((sum, spin) => sum + spin.winAmount, 0);
  const winningSpins = history.filter(spin => spin.winAmount > 0).length;
  const winRate = history.length > 0 ? ((winningSpins / history.length) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
          <History className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Spin History</h1>
        <p className="text-gray-600">Track your wins and analyze your spin patterns</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
              <History className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{history.length}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Spins</h3>
          <p className="text-sm text-gray-600">All time plays</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{totalWinnings.toLocaleString()}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Winnings</h3>
          <p className="text-sm text-gray-600">XXX tokens won</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{winRate}%</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Win Rate</h3>
          <p className="text-sm text-gray-600">{winningSpins} winning spins</p>
        </div>
      </div>

      {/* History List */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Spins</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Latest First</span>
          </div>
        </div>

        {history.length > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {history.map((spin, index) => {
              const Icon = getRewardIcon(spin.type);
              const colorClass = getRewardColor(spin.type);
              
              return (
                <div
                  key={spin.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900">{spin.reward}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{new Date(spin.timestamp).toLocaleDateString()}</span>
                        <span>{new Date(spin.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    {spin.winAmount > 0 ? (
                      <div className="text-green-600 font-semibold">
                        +{spin.winAmount} XXX
                      </div>
                    ) : spin.type === 'bonus' ? (
                      <div className="text-blue-600 font-semibold">
                        Bonus Reward
                      </div>
                    ) : spin.type === 'nft' ? (
                      <div className="text-purple-600 font-semibold">
                        NFT Prize
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        No Win
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      #{history.length - index}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No Spin History Yet</h3>
            <p className="text-sm mb-6">Start spinning to see your history here!</p>
            <button className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all transform hover:scale-105">
              Go to Spin Game
            </button>
          </div>
        )}
      </div>

      {/* Achievements */}
      {history.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Achievements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg border-2 ${
              history.length >= 10 ? 'border-yellow-300 bg-yellow-100' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  history.length >= 10 ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">First 10 Spins</p>
                  <p className="text-sm text-gray-600">{history.length}/10</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg border-2 ${
              winningSpins >= 5 ? 'border-green-300 bg-green-100' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  winningSpins >= 5 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">5 Wins</p>
                  <p className="text-sm text-gray-600">{winningSpins}/5</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg border-2 ${
              totalWinnings >= 1000 ? 'border-purple-300 bg-purple-100' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  totalWinnings >= 1000 ? 'bg-purple-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">1000 XXX Won</p>
                  <p className="text-sm text-gray-600">{totalWinnings}/1000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinHistory;