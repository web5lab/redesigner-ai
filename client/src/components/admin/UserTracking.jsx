import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../store/adminSlice';
import { Users, Download, Search, Filter, TrendingUp, Wallet, Calendar, Trophy } from 'lucide-react';

const UserTracking = () => {
  const dispatch = useDispatch();
  const { users, usersPagination, loading } = useSelector((state) => state.admin);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('totalSpent');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);

  // Load users on component mount and when filters change
  useEffect(() => {
    dispatch(getUsers({ 
      page, 
      limit: 20, 
      search: searchTerm, 
      sortBy, 
      sortOrder 
    }));
  }, [dispatch, page, searchTerm, sortBy, sortOrder]);

  const formatAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
  const formatDateTime = (dateString) => new Date(dateString).toLocaleString();

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    dispatch(getUsers({ 
      page: 1, 
      limit: 20, 
      search: searchTerm, 
      sortBy, 
      sortOrder 
    }));
  };

  const handleExport = () => {
    const csvContent = [
      ['Wallet Address', 'Tickets Purchased', 'Total Spent', 'Total Winnings', 'Total Spins', 'Win Rate', 'Join Date', 'Last Activity'],
      ...users.map(user => [
        user.walletAddress,
        user.ticketsPurchased || 0,
        user.totalSpent,
        user.totalWinnings,
        user.totalSpins,
        user.winRate,
        user.joinDate,
        user.lastActivityDate
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

  // Calculate total stats from current users
  const totalStats = {
    totalUsers: usersPagination.total || 0,
    totalRevenue: users.reduce((sum, user) => sum + (user.totalSpent || 0), 0) || 0,
    totalWinnings: users.reduce((sum, user) => sum + (user.totalWinnings || 0), 0) || 0,
    avgWinRate: users.length > 0 
      ? users.reduce((sum, user) => sum + (user.winRate || 0), 0) / users.length 
      : 0
  };

  if (loading && users.length === 0) {
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
              <p className="text-2xl font-bold text-blue-600">{totalStats.totalUsers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">{totalStats.totalRevenue?.toLocaleString() || 0} XXX</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Winnings</p>
              <p className="text-2xl font-bold text-purple-600">{totalStats.totalWinnings?.toLocaleString() || 0} XXX</p>
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
          <form onSubmit={handleSearch} className="flex items-center space-x-4">
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
            <button 
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Search
            </button>
          </form>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="totalSpent">Total Spent</option>
                <option value="totalWinnings">Total Winnings</option>
                <option value="totalSpins">Total Spins</option>
                <option value="winRate">Win Rate</option>
                <option value="lastActivityDate">Last Activity</option>
                <option value="joinDate">Join Date</option>
              </select>
              <button
                onClick={() => {
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  setPage(1);
                }}
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
          <h2 className="text-xl font-semibold text-gray-900">User Activity ({usersPagination.total || 0} users)</h2>
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
              {users.map((user) => {
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
                      {user.currentTickets || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.totalSpent?.toLocaleString() || 0} XXX
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.totalWinnings?.toLocaleString() || 0} XXX</div>
                      <div className={`text-xs ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {profitLoss >= 0 ? '+' : ''}{profitLoss?.toLocaleString() || 0} XXX
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.totalSpins || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" 
                            style={{ width: `${Math.min(user.winRate || 0, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{(user.winRate || 0).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(user.joinDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDateTime(user.lastActivityDate)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {usersPagination.pages > 1 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(Math.min(usersPagination.pages, page + 1))}
                disabled={page === usersPagination.pages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(page - 1) * 20 + 1}</span> to <span className="font-medium">{Math.min(page * 20, usersPagination.total)}</span> of{' '}
                  <span className="font-medium">{usersPagination.total}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    &larr;
                  </button>
                  
                  {[...Array(Math.min(5, usersPagination.pages))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={i}
                        onClick={() => setPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === pageNum
                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {usersPagination.pages > 5 && (
                    <>
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        ...
                      </span>
                      <button
                        onClick={() => setPage(usersPagination.pages)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === usersPagination.pages
                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {usersPagination.pages}
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={() => setPage(Math.min(usersPagination.pages, page + 1))}
                    disabled={page === usersPagination.pages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    &rarr;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
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
                    {user.totalSpent?.toLocaleString() || 0} XXX
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Highest Win Rates</h3>
          <div className="space-y-3">
            {users
              .sort((a, b) => (b.winRate || 0) - (a.winRate || 0))
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
                    {(user.winRate || 0).toFixed(1)}%
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