import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Activity, 
  DollarSign, 
  ArrowUpDown,
  RefreshCw,
  Eye,
  Users,
  Zap,
  Target,
  Clock,
  ChevronUp,
  ChevronDown,
  Wallet,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { web3Service, } from '../utils/web3Utils';
import { CONTRACTS } from '../contracts/PancakeSwapABI';



const TradingSection = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('7');
  const [priceData, setPriceData] = useState([]);
  const [tokenStats, setTokenStats] = useState({
    price: 0,
    change24h: 0,
    volume24h: 0,
    marketCap: 0,
    supply: 0,
    holders: 0,
    liquidity: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wallet, setWallet] = useState({
    connected: false,
    address: '',
    balance: '0',
    network: '',
    chainId: ''
  });
  
  const [tradeForm, setTradeForm] = useState({
    fromAmount: '1',
    toAmount: '0',
    fromToken: 'XXX',
    toToken: 'USDT',
    slippage: 1
  });

  const [transactionStatus, setTransactionStatus] = useState({
    status: 'idle',
    message: ''
  });

  const [tokenBalances, setTokenBalances] = useState({
    bnb: '0',
    usdt: '0',
    spinwin: '0'
  });

  // CoinGecko API for real price data
  const COINGECKO_API = 'https://api.coingecko.com/api/v3';

  // Fetch real BNB price data from CoinGecko
  const fetchRealPriceData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch current price and market data
      const marketResponse = await fetch(
        `${COINGECKO_API}/simple/price?ids=binancecoin&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`
      );
      const marketData = await marketResponse.json();

      // Fetch historical price data
      const historyResponse = await fetch(
        `${COINGECKO_API}/coins/binancecoin/market_chart?vs_currency=usd&days=${timeframe}&interval=${timeframe === '1' ? 'hourly' : 'daily'}`
      );
      const historyData = await historyResponse.json();

      if (marketData.binancecoin && historyData.prices) {
        const bnbData = marketData.binancecoin;
        
        // Set token stats
        setTokenStats({
          price: bnbData.usd,
          change24h: bnbData.usd_24h_change || 0,
          volume24h: bnbData.usd_24h_vol || 0,
          marketCap: bnbData.usd_market_cap || 0,
          supply: 166801148, // BNB circulating supply
          holders: 334771, // Estimated
          liquidity: 2100000000 // Estimated
        });

        // Process historical data
        const processedData = historyData.prices.map((item, index) => {
          const timestamp = item[0];
          const price = item[1];
          const volume = historyData.total_volumes?.[index]?.[1] || 0;
          
          return {
            time: timeframe === '1' 
              ? new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
              : new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price,
            volume,
            timestamp
          };
        });

        setPriceData(processedData);
      } else {
        throw new Error('Invalid API response');
      }
    } catch (err) {
      console.error('Error fetching real price data:', err);
      setError('Failed to fetch real market data');
      
      // Fallback to dummy data
      setTokenStats({
        price: 590.45,
        change24h: 2.37,
        volume24h: 83051830.10,
        marketCap: 98500000000,
        supply: 166801148,
        holders: 334771,
        liquidity: 2100000000
      });
      
      // Generate fallback data
      const fallbackData = generateFallbackData();
      setPriceData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  // Generate fallback data if API fails
  const generateFallbackData = () => {
    const data = [];
    const basePrice = 590.45;
    const now = Date.now();
    const intervals = parseInt(timeframe) === 1 ? 24 : parseInt(timeframe);
    const intervalMs = parseInt(timeframe) === 1 ? 3600000 : 86400000;
    
    for (let i = intervals; i >= 0; i--) {
      const timestamp = now - (i * intervalMs);
      const volatility = 0.02;
      const randomChange = (Math.random() - 0.5) * volatility;
      const price = basePrice * (1 + randomChange);
      const volume = Math.random() * 1000000 + 500000;
      
      data.push({
        time: parseInt(timeframe) === 1 
          ? new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          : new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price,
        volume,
        timestamp
      });
    }
    
    return data;
  };

  // MetaMask connection functions
  const connectWallet = async () => {
    try {
      setTransactionStatus({ status: 'pending', message: 'Connecting wallet...' });
      const walletState = await web3Service.connectWallet();
      setWallet(walletState);
      
      // Load token balances
      await loadTokenBalances(walletState.address);
      
      setTransactionStatus({ status: 'success', message: 'Wallet connected successfully!' });
      setTimeout(() => setTransactionStatus({ status: 'idle', message: '' }), 3000);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setTransactionStatus({ status: 'error', message: error.message });
      setTimeout(() => setTransactionStatus({ status: 'idle', message: '' }), 5000);
    }
  };

  const disconnectWallet = () => {
    setWallet({
      connected: false,
      address: '',
      balance: '0',
      network: '',
      chainId: ''
    });
    setTokenBalances({
      bnb: '0',
      usdt: '0',
      spinwin: '0'
    });
  };

  // Load token balances
  const loadTokenBalances = async (address) => {
    try {
      const [usdtBalance, spinwinBalance] = await Promise.all([
        web3Service.getTokenBalance(CONTRACTS.USDT, address),
        web3Service.getTokenBalance(CONTRACTS.SPINWIN_TOKEN, address)
      ]);

      setTokenBalances({
        bnb: wallet.balance,
        usdt: usdtBalance,
        spinwin: spinwinBalance
      });
    } catch (error) {
      console.error('Error loading token balances:', error);
    }
  };

  // Switch to BSC network
  const switchToBSC = async () => {
    try {
      setTransactionStatus({ status: 'pending', message: 'Switching to BSC network...' });
      await web3Service.switchToBSC();
      
      // Reconnect to get updated network info
      const walletState = await web3Service.connectWallet();
      setWallet(walletState);
      
      setTransactionStatus({ status: 'success', message: 'Switched to BSC network!' });
      setTimeout(() => setTransactionStatus({ status: 'idle', message: '' }), 3000);
    } catch (error) {
      console.error('Error switching network:', error);
      setTransactionStatus({ status: 'error', message: error.message });
      setTimeout(() => setTransactionStatus({ status: 'idle', message: '' }), 5000);
    }
  };

  // Execute direct smart contract trade
  const executeDirectTrade = async () => {
    if (!wallet.connected) {
      setTransactionStatus({ status: 'error', message: 'Please connect your wallet first' });
      return;
    }

    if (wallet.chainId !== '0x38') {
      const switchNetwork = confirm('You need to switch to BSC network to trade. Switch now?');
      if (switchNetwork) {
        await switchToBSC();
        return;
      }
    }

    try {
      setTransactionStatus({ status: 'pending', message: 'Preparing transaction...' });

      const fromAmount = parseFloat(tradeForm.fromAmount);
      const toAmount = parseFloat(tradeForm.toAmount);

      if (fromAmount <= 0) {
        throw new Error('Please enter a valid amount');
      }

      let txHash;

      if (tradeForm.fromToken === 'BNB' && tradeForm.toToken === 'USDT') {
        // BNB to USDT
        setTransactionStatus({ status: 'pending', message: 'Swapping BNB for USDT...' });
        txHash = await web3Service.swapBNBForTokens(
          fromAmount.toString(),
          toAmount.toString(),
          CONTRACTS.USDT,
          tradeForm.slippage
        );
      } else if (tradeForm.fromToken === 'USDT' && tradeForm.toToken === 'BNB') {
        // USDT to BNB - need approval first
        setTransactionStatus({ status: 'pending', message: 'Approving USDT...' });
        await web3Service.approveToken(CONTRACTS.USDT, CONTRACTS.PANCAKE_ROUTER, fromAmount.toString());
        
        setTransactionStatus({ status: 'pending', message: 'Swapping USDT for BNB...' });
        txHash = await web3Service.swapTokensForBNB(
          CONTRACTS.USDT,
          fromAmount.toString(),
          toAmount.toString(),
          tradeForm.slippage
        );
      } else if (tradeForm.fromToken === 'BNB' && tradeForm.toToken === 'SPINWIN') {
        // BNB to SpinWin Token
        setTransactionStatus({ status: 'pending', message: 'Swapping BNB for SpinWin tokens...' });
        txHash = await web3Service.swapBNBForTokens(
          fromAmount.toString(),
          toAmount.toString(),
          CONTRACTS.SPINWIN_TOKEN,
          tradeForm.slippage
        );
      } else {
        throw new Error('Trading pair not supported');
      }

      setTransactionStatus({ 
        status: 'success', 
        message: 'Transaction successful!', 
        hash: txHash 
      });

      // Reload balances
      await loadTokenBalances(wallet.address);

      setTimeout(() => setTransactionStatus({ status: 'idle', message: '' }), 10000);
    } catch (error) {
      console.error('Error executing trade:', error);
      setTransactionStatus({ status: 'error', message: error.message });
      setTimeout(() => setTransactionStatus({ status: 'idle', message: '' }), 5000);
    }
  };

  // Add token to wallet
  const addTokenToWallet = async (tokenAddress, symbol) => {
    try {
      await web3Service.addTokenToWallet(tokenAddress, symbol);
      setTransactionStatus({ status: 'success', message: `${symbol} added to wallet!` });
      setTimeout(() => setTransactionStatus({ status: 'idle', message: '' }), 3000);
    } catch (error) {
      setTransactionStatus({ status: 'error', message: error.message });
      setTimeout(() => setTransactionStatus({ status: 'idle', message: '' }), 5000);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchRealPriceData();
  }, [timeframe]);

  // Auto-refresh data every 60 seconds
  useEffect(() => {
    const interval = setInterval(fetchRealPriceData, 60000);
    return () => clearInterval(interval);
  }, [timeframe]);

  // Update trade amounts when form changes
  useEffect(() => {
    if (tokenStats.price > 0) {
      const fromAmount = parseFloat(tradeForm.fromAmount) || 0;
      if (tradeForm.fromToken === 'BNB' && tradeForm.toToken === 'USDT') {
        const toAmount = (fromAmount * tokenStats.price).toFixed(2);
        setTradeForm(prev => ({ ...prev, toAmount }));
      } else if (tradeForm.fromToken === 'USDT' && tradeForm.toToken === 'BNB') {
        const toAmount = (fromAmount / tokenStats.price).toFixed(6);
        setTradeForm(prev => ({ ...prev, toAmount }));
      }
    }
  }, [tradeForm.fromAmount, tradeForm.fromToken, tradeForm.toToken, tokenStats.price]);

  // Check if MetaMask is connected on component mount
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts) => {
          if (accounts.length > 0) {
            connectWallet();
          }
        });
    }
  }, []);

  const formatPrice = (price) => `$${price.toFixed(2)}`;
  const formatVolume = (volume) => {
    if (volume >= 1000000000) return `$${(volume / 1000000000).toFixed(1)}B`;
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `$${(volume / 1000).toFixed(1)}K`;
    return `$${volume.toFixed(0)}`;
  };

  const formatNumber = (num) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const formatAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  const currentPrice = priceData[priceData.length - 1]?.price || tokenStats.price;
  const priceChange = tokenStats.change24h;
  const isPositive = priceChange >= 0;

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-yellow-200">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading real market data from CoinGecko...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-yellow-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600 mb-2">
            Smart Contract Trading
          </h2>
          <p className="text-gray-600">Direct DEX trading with Web3 integration</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">{formatPrice(currentPrice)}</div>
            <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="font-semibold">{isPositive ? '+' : ''}{priceChange.toFixed(2)}%</span>
            </div>
          </div>
          
          <button 
            onClick={fetchRealPriceData}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={loading}
          >
            <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Transaction Status */}
      {transactionStatus.status !== 'idle' && (
        <div className={`mb-6 p-4 rounded-xl border-2 ${
          transactionStatus.status === 'pending' ? 'bg-blue-50 border-blue-200' :
          transactionStatus.status === 'success' ? 'bg-green-50 border-green-200' :
          'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center space-x-3">
            {transactionStatus.status === 'pending' && <Loader className="w-5 h-5 text-blue-600 animate-spin" />}
            {transactionStatus.status === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
            {transactionStatus.status === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
            <div>
              <p className={`font-semibold ${
                transactionStatus.status === 'pending' ? 'text-blue-800' :
                transactionStatus.status === 'success' ? 'text-green-800' :
                'text-red-800'
              }`}>
                {transactionStatus.message}
              </p>
              {transactionStatus.hash && (
                <a
                  href={`https://bscscan.com/tx/${transactionStatus.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>View on BSCScan</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Wallet Connection */}
      <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Wallet className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Web3 Wallet</h3>
              <p className="text-sm text-gray-600">
                {wallet.connected 
                  ? `Connected: ${formatAddress(wallet.address)} • ${wallet.balance} BNB • ${wallet.network}`
                  : 'Connect your wallet for direct smart contract trading'
                }
              </p>
            </div>
          </div>
          
          {wallet.connected ? (
            <div className="flex items-center space-x-2">
              {wallet.chainId !== '0x38' && (
                <button
                  onClick={switchToBSC}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                >
                  Switch to BSC
                </button>
              )}
              <button
                onClick={disconnectWallet}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
              Connect MetaMask
            </button>
          )}
        </div>
      </div>

      {/* Token Balances */}
      {wallet.connected && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">BNB Balance</p>
                <p className="text-xl font-bold text-yellow-700">{tokenBalances.bnb}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">BNB</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">USDT Balance</p>
                <p className="text-xl font-bold text-green-700">{tokenBalances.usdt}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">USDT</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">SpinWin Balance</p>
                <p className="text-xl font-bold text-purple-700">{tokenBalances.spinwin}</p>
              </div>
              <button
                onClick={() => addTokenToWallet(CONTRACTS.SPINWIN_TOKEN, 'SPINWIN')}
                className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                <span className="text-white font-bold text-xs">SW</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-8">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-all ${
            activeTab === 'overview'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span>Overview</span>
        </button>
        
        <button
          onClick={() => setActiveTab('trade')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-all ${
            activeTab === 'trade'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowUpDown className="w-5 h-5" />
          <span>Direct Trade</span>
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-6 h-6 text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">24H Volume</span>
              </div>
              <div className="text-xl font-bold text-blue-900">{formatVolume(tokenStats.volume24h)}</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <Activity className="w-6 h-6 text-green-600" />
                <span className="text-xs text-green-600 font-medium">Market Cap</span>
              </div>
              <div className="text-xl font-bold text-green-900">{formatVolume(tokenStats.marketCap)}</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-6 h-6 text-purple-600" />
                <span className="text-xs text-purple-600 font-medium">Supply</span>
              </div>
              <div className="text-xl font-bold text-purple-900">{formatNumber(tokenStats.supply)}</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-6 h-6 text-orange-600" />
                <span className="text-xs text-orange-600 font-medium">Smart Contract</span>
              </div>
              <div className="text-sm font-bold text-orange-900">PancakeSwap V2</div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Real Price Chart</h3>
              
              <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
                {[
                  { value: '1', label: '1D' },
                  { value: '7', label: '7D' },
                  { value: '30', label: '30D' },
                  { value: '365', label: '1Y' }
                ].map((tf) => (
                  <button
                    key={tf.value}
                    onClick={() => setTimeframe(tf.value )}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      timeframe === tf.value
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceData}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(value) => `$${value.toFixed(0)}`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [formatPrice(value), 'Price']}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fill="url(#priceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Trade Tab */}
      {activeTab === 'trade' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trading Form */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Direct Smart Contract Trading</h3>
              
              <div className="space-y-4">
                {/* From Token */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <div className="bg-white rounded-lg border border-gray-300 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <input
                        type="number"
                        value={tradeForm.fromAmount}
                        onChange={(e) => setTradeForm(prev => ({ ...prev, fromAmount: e.target.value }))}
                        className="text-2xl font-bold bg-transparent border-none outline-none flex-1"
                        placeholder="0.0"
                      />
                      <select
                        value={tradeForm.fromToken}
                        onChange={(e) => setTradeForm(prev => ({ ...prev, fromToken: e.target.value }))}
                        className="bg-gray-100 rounded-lg px-3 py-2 font-semibold"
                      >
                        <option value="BNB">BNB</option>
                        <option value="USDT">USDT</option>
                      </select>
                    </div>
                    <div className="text-sm text-gray-500">
                      Balance: {tradeForm.fromToken === 'BNB' ? tokenBalances.bnb : tokenBalances.usdt}
                    </div>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <button 
                    onClick={() => {
                      setTradeForm(prev => ({
                        ...prev,
                        fromToken: prev.toToken,
                        toToken: prev.fromToken,
                        fromAmount: prev.toAmount,
                        toAmount: prev.fromAmount
                      }));
                    }}
                    className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ArrowUpDown className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* To Token */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <div className="bg-white rounded-lg border border-gray-300 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <input
                        type="number"
                        value={tradeForm.toAmount}
                        onChange={(e) => setTradeForm(prev => ({ ...prev, toAmount: e.target.value }))}
                        className="text-2xl font-bold bg-transparent border-none outline-none flex-1"
                        placeholder="0.0"
                        readOnly
                      />
                      <select
                        value={tradeForm.toToken}
                        onChange={(e) => setTradeForm(prev => ({ ...prev, toToken: e.target.value }))}
                        className="bg-gray-100 rounded-lg px-3 py-2 font-semibold"
                      >
                        <option value="USDT">USDT</option>
                        <option value="BNB">BNB</option>
                        <option value="SPINWIN">SPINWIN</option>
                      </select>
                    </div>
                    <div className="text-sm text-gray-500">
                      Balance: {
                        tradeForm.toToken === 'BNB' ? tokenBalances.bnb :
                        tradeForm.toToken === 'USDT' ? tokenBalances.usdt :
                        tokenBalances.spinwin
                      }
                    </div>
                  </div>
                </div>

                {/* Slippage */}
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Slippage Tolerance</span>
                    <span className="text-sm font-semibold text-yellow-700">{tradeForm.slippage}%</span>
                  </div>
                  <div className="flex space-x-2">
                    {[0.5, 1, 2, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => setTradeForm(prev => ({ ...prev, slippage: value }))}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          tradeForm.slippage === value
                            ? 'bg-yellow-400 text-white'
                            : 'bg-white text-gray-700 hover:bg-yellow-100'
                        }`}
                      >
                        {value}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trade Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rate</span>
                    <span className="font-medium">1 BNB = {currentPrice.toFixed(2)} USDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Network Fee</span>
                    <span className="font-medium">~0.0005 BNB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">DEX Fee (0.25%)</span>
                    <span className="font-medium">${(parseFloat(tradeForm.fromAmount) * currentPrice * 0.0025).toFixed(2)}</span>
                  </div>
                </div>

                {/* Trade Button */}
                <button 
                  onClick={executeDirectTrade}
                  disabled={!wallet.connected || transactionStatus.status === 'pending'}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 ${
                    wallet.connected && transactionStatus.status !== 'pending'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {transactionStatus.status === 'pending' ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : wallet.connected ? (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>Execute Trade</span>
                    </>
                  ) : (
                    <>
                      <Wallet className="w-5 h-5" />
                      <span>Connect Wallet to Trade</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Smart Contract Info */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-4">Smart Contract Details</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Router Contract</span>
                  <a 
                    href={`https://bscscan.com/address/${CONTRACTS.PANCAKE_ROUTER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                  >
                    <span>PancakeSwap V2</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network</span>
                  <span className="font-medium">Binance Smart Chain</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Security</span>
                  <span className="font-medium text-green-600">Audited</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart and Info */}
          <div className="space-y-6">
            {/* Mini Chart */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Live Price Chart</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">{formatPrice(currentPrice)}</span>
                  <span className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    <span className="font-semibold">{priceChange.toFixed(2)}%</span>
                  </span>
                </div>
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceData.slice(-20)}>
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke={isPositive ? "#10b981" : "#ef4444"}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                      formatter={(value) => [formatPrice(value), 'Price']}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Trading Instructions */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h4 className="font-semibold text-gray-900 mb-4">How Direct Trading Works</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <div>
                    <p className="font-medium">Connect MetaMask</p>
                    <p className="text-gray-600">Ensure you're on BSC network with sufficient BNB for gas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <div>
                    <p className="font-medium">Set Trade Parameters</p>
                    <p className="text-gray-600">Enter amount, select tokens, and adjust slippage tolerance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <div>
                    <p className="font-medium">Execute Smart Contract</p>
                    <p className="text-gray-600">Transaction executes directly on PancakeSwap smart contract</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span>Security Notice</span>
              </h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Always verify contract addresses before trading</p>
                <p>• Start with small amounts for testing</p>
                <p>• Keep sufficient BNB for transaction fees</p>
                <p>• Double-check slippage settings</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingSection;