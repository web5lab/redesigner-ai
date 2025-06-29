import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowUpDown, 
  ExternalLink, 
  BarChart3, 
  DollarSign,
  Coins,
  Activity,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const TradeDashboard = () => {
  const [activeTab, setActiveTab] = useState('pancakeswap');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIframeError(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIframeLoaded(false);
  };

  const tradingPairs = [
    {
      pair: 'BNB/USDT',
      price: '$590.45',
      change: '+2.37%',
      volume: '$83.05M',
      isPositive: true
    },
    {
      pair: 'XXX/BNB',
      price: '0.0024',
      change: '+5.12%',
      volume: '$1.2M',
      isPositive: true
    },
    {
      pair: 'USDT/BNB',
      price: '0.00169',
      change: '-0.85%',
      volume: '$45.3M',
      isPositive: false
    }
  ];

  const quickActions = [
    {
      title: 'Buy BNB',
      description: 'Purchase BNB with USDT',
      icon: Coins,
      color: 'from-yellow-400 to-amber-500'
    },
    {
      title: 'Swap Tokens',
      description: 'Exchange between tokens',
      icon: ArrowUpDown,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      title: 'Add Liquidity',
      description: 'Provide liquidity to pools',
      icon: Activity,
      color: 'from-green-400 to-emerald-500'
    },
    {
      title: 'View Charts',
      description: 'Analyze price movements',
      icon: BarChart3,
      color: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Trading Dashboard</h1>
        <p className="text-gray-600">Trade tokens directly on PancakeSwap</p>
      </div>

      {/* Trading Pairs Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tradingPairs.map((pair, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{pair.pair}</h3>
              <div className={`flex items-center space-x-1 ${pair.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className={`w-4 h-4 ${!pair.isPositive ? 'rotate-180' : ''}`} />
                <span className="text-sm font-medium">{pair.change}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Price</span>
                <span className="font-semibold text-gray-900">{pair.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">24h Volume</span>
                <span className="font-semibold text-gray-900">{pair.volume}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setActiveTab('pancakeswap')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-all ${
            activeTab === 'pancakeswap'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowUpDown className="w-5 h-5" />
          <span>PancakeSwap</span>
        </button>
        
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-all ${
            activeTab === 'analytics'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span>Analytics</span>
        </button>
      </div>

      {/* PancakeSwap Tab */}
      {activeTab === 'pancakeswap' && (
        <div className="space-y-6">
          {/* PancakeSwap Integration */}
          <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-yellow-200 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">PancakeSwap Trading</h2>
                  <p className="text-gray-600 text-sm">BNB/USDT Trading Pair</p>
                </div>
                <div className="flex items-center space-x-3">
                  {iframeLoaded && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Connected</span>
                    </div>
                  )}
                  <button
                    onClick={() => window.open('https://pancakeswap.finance/swap?outputCurrency=0x55d398326f99059fF775485246999027B3197955', '_blank')}
                    className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-amber-600 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open in New Tab</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* PancakeSwap Iframe */}
            <div className="relative">
              {!iframeLoaded && !iframeError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                  <div className="text-center">
                    <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading PancakeSwap...</p>
                  </div>
                </div>
              )}
              
              {iframeError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                  <div className="text-center p-8">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Trading Interface</h3>
                    <p className="text-gray-600 mb-4">Please try opening PancakeSwap in a new tab</p>
                    <button
                      onClick={() => window.open('https://pancakeswap.finance/swap?outputCurrency=0x55d398326f99059fF775485246999027B3197955', '_blank')}
                      className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-3 rounded-lg hover:from-yellow-500 hover:to-amber-600 transition-all flex items-center space-x-2 mx-auto"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open PancakeSwap</span>
                    </button>
                  </div>
                </div>
              )}
              
              <iframe
                src="https://pancakeswap.finance/swap?outputCurrency=0x55d398326f99059fF775485246999027B3197955&inputCurrency=BNB"
                width="100%"
                height="600"
                frameBorder="0"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                className="w-full"
                title="PancakeSwap Trading Interface"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
              />
            </div>
          </div>

          {/* Trading Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <span>Trading Tips</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="text-gray-700">• Always check slippage tolerance before trading</p>
                <p className="text-gray-700">• Consider gas fees when making small trades</p>
                <p className="text-gray-700">• Use limit orders for better price execution</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">• Keep some BNB for transaction fees</p>
                <p className="text-gray-700">• Double-check token addresses</p>
                <p className="text-gray-700">• Start with small amounts when testing</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </div>
              );
            })}
          </div>

          {/* Market Overview */}
          <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Market Overview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">$590.45</div>
                <div className="text-gray-600">BNB Price</div>
                <div className="text-green-600 text-sm">+2.37% (24h)</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">$83.05M</div>
                <div className="text-gray-600">24h Volume</div>
                <div className="text-blue-600 text-sm">BNB/USDT</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">$98.5B</div>
                <div className="text-gray-600">Market Cap</div>
                <div className="text-purple-600 text-sm">BNB</div>
              </div>
            </div>
          </div>

          {/* External Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">PancakeSwap</h4>
              <p className="text-gray-600 mb-4">The leading DEX on Binance Smart Chain</p>
              <button
                onClick={() => window.open('https://pancakeswap.finance/', '_blank')}
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-amber-600 transition-all flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit PancakeSwap</span>
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">CoinGecko</h4>
              <p className="text-gray-600 mb-4">Track prices and market data</p>
              <button
                onClick={() => window.open('https://www.coingecko.com/en/coins/binancecoin', '_blank')}
                className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 text-white py-3 px-4 rounded-lg hover:from-blue-500 hover:to-cyan-600 transition-all flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View on CoinGecko</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeDashboard;