import React from 'react';
import { TrendingUp, Ticket, Trophy, Clock, Star, Gift, Zap } from 'lucide-react';



const Dashboard = ({ user, tickets, recentSpins }) => {
  const formatNumber = (num) => num.toLocaleString();
  const formatAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-yellow-100 mb-4">
              Wallet: {formatAddress(user.address)}
            </p>
            <div className="flex items-center space-x-6 text-yellow-100">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  Last login: {new Date(user.lastLoginDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center animate-glow">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{formatNumber(user.tokenBalance)}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">XXX Balance</h3>
          <p className="text-sm text-gray-600">Available tokens</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center">
              <Ticket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{tickets}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Active Tickets</h3>
          <p className="text-sm text-gray-600">Ready to spin</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{user.totalSpins}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Spins</h3>
          <p className="text-sm text-gray-600">All time plays</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{formatNumber(user.totalWinnings)}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Winnings</h3>
          <p className="text-sm text-gray-600">XXX tokens won</p>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Spins */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Spins</h2>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          
          {recentSpins.length > 0 ? (
            <div className="space-y-4">
              {recentSpins.map((spin) => (
                <div key={spin.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      spin.type === 'tokens' ? 'bg-green-100 text-green-600' :
                      spin.type === 'nft' ? 'bg-purple-100 text-purple-600' :
                      spin.type === 'bonus' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{spin.reward}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(spin.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {spin.winAmount > 0 && (
                    <span className="text-green-600 font-semibold">
                      +{spin.winAmount} XXX
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Gift className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No recent spins yet</p>
              <p className="text-sm">Buy tickets and start spinning!</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">Spin Now</h3>
                <Ticket className="w-5 h-5 text-yellow-600" />
              </div>
              <p className="text-sm text-gray-600 mb-3">
                You have {tickets} tickets ready to use
              </p>
              <button 
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all transform hover:scale-105"
                disabled={tickets === 0}
              >
                {tickets > 0 ? 'Start Spinning' : 'No Tickets Available'}
              </button>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">Buy More Tickets</h3>
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Get bulk discounts on ticket purchases
              </p>
              <button className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-500 hover:to-indigo-600 transition-all transform hover:scale-105">
                Buy Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;