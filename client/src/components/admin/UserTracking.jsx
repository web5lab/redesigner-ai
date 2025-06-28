import React, { useState } from 'react';
import { Users, Download, Search, Filter, TrendingUp, Wallet, Calendar, Trophy } from 'lucide-react';

const UserTracking = () => {
  const [users] = useState([
    {
      id: '1',
      walletAddress: '0x742d35Cc6634C0532925a3b8D96698b0C03C4532',
      ticketsPurchased: 150,
      totalSpent: 1500,
      totalWinnings: 850,
      lastActivity: '2024-01-20T14:30:00Z',
      joinDate: '2024-01-10T09:00:00Z',
      totalSpins: 145,
      winRate: 58.6
    },
    {
      id: '2',
      walletAddress: '0x8ba1f109551bD432803012645Hac136c0532925a',
      ticketsPurchased: 89,
      totalSpent: 890,
      totalWinnings: 420,
      lastActivity: '2024-01-20T12:15:00Z',
      joinDate: '2024-01-12T16:45:00Z',
      totalSpins: 87,
      winRate: 48.3
    },
    {
      id: '3',
      walletAddress: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
      ticketsPurchased: 320,
      totalSpent: 3200,
      totalWinnings: 1950,
      lastActivity: '2024-01-20T16:45:00Z',
      joinDate: '2024-01-08T11:20:00Z',
      totalSpins: 315,
      winRate: 61.9
    },
    {
      id: '4',
      walletAddress: '0x9f8e7d6c5b4a3928374650192837465019283746',
      ticketsPurchased: 45,
      totalSpent: 450,
      totalWinnings: 180,
      lastActivity: '2024-01-19T20:30:00Z',
      joinDate: '2024-01-15T14:10:00Z',
      totalSpins: 43,
      winRate: 41.9
    },
    {
      id: '5',
      walletAddress: '0x5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
      ticketsPurchased: 200,
      totalSpent: 2000,
      totalWinnings: 1200,
      lastActivity: '2024-01-20T18:20:00Z',
      joinDate: '2024-01-05T08:30:00Z',
      totalSpins: 195,
      winRate: 61.5
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('totalSpent');
  const [sortOrder, setSortOrder] = useState('desc');

  const formatAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
  const formatDateTime = (dateString) => new Date(dateString).toLocaleString();

  const filteredUsers = users
    .filter(user => 
      user.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

  const totalStats = {
    totalUsers: users.length,
    totalRevenue: users.reduce((sum, user) => sum + user.totalSpent, 0),
    totalWinnings: users.reduce((sum, user) => sum + user.totalWinnings, 0),
    avgWinRate: users.reduce((sum, user) => sum + user.winRate, 0) / users.length
  };

  const handleExport = () => {
    const csvContent = [
      ['Wallet Address', 'Tickets Purchased', 'Total Spent', 'Total Winnings', 'Total Spins', 'Win Rate', 'Join Date', 'Last Activity'],
      ...filteredUsers.map(user => [
        user.walletAddress,
        user.ticketsPurchased,
        user.totalSpent,
        user.totalWinnings,
        user.totalSpins,
        user.winRate,
        user.joinDate,
        user.lastActivity
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_analytics.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Tracking</h1>
          <p className="text-gray-600 mt-1">Monitor user activity and analyze player behavior</p>
        </div>
        <button
          onClick={handleExport}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all flex items-center space-x-2 shadow-lg"
        >
          <Download className="w-5 h-5" />
          <span>Export Data</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-blue-600">{totalStats.totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">{totalStats.totalRevenue.toLocaleString()} XXX</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Winnings</p>
              <p className="text-2xl font-bold text-purple-600">{totalStats.totalWinnings.toLocaleString()} XXX</p>
            </div>
            <Trophy className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Win Rate</p>
              <p className="text-2xl font-bold text-orange-600">{totalStats.avgWinRate.toFixed(1)}%</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by wallet address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value )}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="totalSpent">Total Spent</option>
                <option value="totalWinnings">Total Winnings</option>
                <option value="ticketsPurchased">Tickets Purchased</option>
                <option value="winRate">Win Rate</option>
                <option value="lastActivity">Last Activity</option>
                <option value="joinDate">Join Date</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="text-purple-600 hover:text-purple-800 transition-colors"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">User Activity ({filteredUsers.length} users)</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winnings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spins</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Win Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const profitLoss = user.totalWinnings - user.totalSpent;
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center">
                          <Wallet className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{formatAddress(user.walletAddress)}</div>
                          <div className="text-xs text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.ticketsPurchased}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.totalSpent.toLocaleString()} XXX
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.totalWinnings.toLocaleString()} XXX</div>
                      <div className={`text-xs ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {profitLoss >= 0 ? '+' : ''}{profitLoss.toLocaleString()} XXX
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.totalSpins}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" 
                            style={{ width: `${Math.min(user.winRate, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{user.winRate.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(user.joinDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDateTime(user.lastActivity)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Spenders</h3>
          <div className="space-y-3">
            {users
              .sort((a, b) => b.totalSpent - a.totalSpent)
              .slice(0, 5)
              .map((user, index) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {formatAddress(user.walletAddress)}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    {user.totalSpent.toLocaleString()} XXX
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Highest Win Rates</h3>
          <div className="space-y-3">
            {users
              .sort((a, b) => b.winRate - a.winRate)
              .slice(0, 5)
              .map((user, index) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {formatAddress(user.walletAddress)}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-purple-600">
                    {user.winRate.toFixed(1)}%
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTracking;