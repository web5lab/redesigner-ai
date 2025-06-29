import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from 'wagmi';
import { authenticateUser, clearError } from '../store/authSlice';
import { useSignMessage } from '../hooks/useSignMessage';
import { useReferralCode } from '../hooks/useReferralCode';
import { 
  Trophy, 
  Zap, 
  Shield, 
  Coins, 
  Star, 
  Sparkles, 
  Crown, 
  Gem,
  ArrowRight,
  Play,
  Gift,
  TrendingUp,
  Users,
  Award,
  Rocket,
  Target,
  ChevronDown
} from 'lucide-react';
import TradingSection from '../components/TradingSection';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const LandingPage= () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wallet = useAccount();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [isSigningIn, setIsSigningIn] = React.useState(false);
  const { signAuthMessage, isPending: isSigningPending } = useSignMessage();
  const { referralCode, clearReferralCode, getPendingReferralCode } = useReferralCode();

  // Handle signing message to access casino
  const handleSignInToCasino = async () => {
    if (!wallet.isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setIsSigningIn(true);
      dispatch(clearError());
      
      // Sign authentication message
      const authData = await signAuthMessage(wallet.address);
      
      // Get pending referral code
      const pendingReferralCode = getPendingReferralCode();
      
      // Authenticate user with signature (don't reconnect wallet)
      await dispatch(authenticateUser({
        walletAddress: wallet.address,
        signature: authData.signature,
        message: authData.message,
        timestamp: authData.timestamp,
        referralCode: pendingReferralCode
      })).unwrap();
      
      // Clear referral code after successful authentication
      if (pendingReferralCode) {
        clearReferralCode();
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      // Don't show error for user rejection
      if (!error.message?.includes('rejected') && !error.message?.includes('denied')) {
        alert('Failed to sign in. Please try again.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const actuallySigningIn = isSigningIn || isSigningPending;

  // Navigate to game when authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/game');
    }
  }, [isAuthenticated, navigate]);

  // Clear error when wallet disconnects
  React.useEffect(() => {
    if (!wallet.isConnected) {
      dispatch(clearError());
    }
  }, [wallet.isConnected, dispatch]);

  // Show referral notification if there's a pending referral code
  const showReferralNotification = referralCode && !isAuthenticated;

  const features = [
    {
      icon: Trophy,
      title: "Premium Rewards",
      description: "Win exclusive NFTs, bonus tokens, and rare collectibles",
      color: "from-yellow-400 to-amber-500"
    },
    {
      icon: Shield,
      title: "Secure & Fair",
      description: "Blockchain-verified spins with transparent smart contracts",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Instant Payouts",
      description: "Automatic token distribution directly to your wallet",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Coins,
      title: "Multiple Tokens",
      description: "Support for various cryptocurrencies and custom tokens",
      color: "from-green-400 to-emerald-500"
    }
  ];

  const stats = [
    { label: "Total Players", value: "50K+", icon: Users },
    { label: "Tokens Distributed", value: "$2.5M", icon: Coins },
    { label: "NFTs Awarded", value: "15K+", icon: Gem },
    { label: "Win Rate", value: "68%", icon: Target }
  ];

  const prizes = [
    { name: "Jackpot", amount: "10,000 XXX", rarity: "Ultra Rare", color: "from-yellow-400 to-orange-500" },
    { name: "Rare NFT", amount: "Exclusive", rarity: "Rare", color: "from-purple-400 to-pink-500" },
    { name: "Bonus Tokens", amount: "5,000 XXX", rarity: "Common", color: "from-blue-400 to-cyan-500" },
    { name: "Multiplier", amount: "2x Boost", rarity: "Uncommon", color: "from-green-400 to-emerald-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-400/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-lg border-b border-yellow-200 top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">XXX Gaming Hub</h1>
                <p className="text-sm text-gray-600">Premium Web3 Gaming</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">Features</a>
              <a href="#prizes" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">Prizes</a>
              <a href="#stats" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">Stats</a>
             <ConnectButton/>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-300 rounded-full px-4 py-2 text-sm font-semibold text-yellow-800">
              <Sparkles className="w-4 h-4" />
              <span>Web3 Gaming Revolution</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black leading-tight">
                <span className="text-gray-900">Win Big with</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-pulse">
                  XXX Gaming
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
                The ultimate blockchain casino where every spin could change your life. 
                <span className="text-yellow-600 font-bold"> Win tokens, NFTs, and exclusive rewards!</span>
              </p>
            </div>

            {/* Referral Notification */}
            {showReferralNotification && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 animate-bounce-in">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-green-800 font-bold text-lg">🎉 Referral Bonus Available!</h3>
                    <p className="text-green-700 mb-2">
                      Code: <span className="font-mono font-bold bg-green-100 px-2 py-1 rounded">{referralCode}</span>
                    </p>
                    <p className="text-green-600 text-sm">
                      Connect your wallet and sign in to claim <strong>100 XXX tokens + 3 free tickets!</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              {!wallet.isConnected ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <span className="font-medium">Connect your wallet to get started</span>
                  </div>
                  <ConnectButton />
                </div>
              ) : !isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <span className="font-medium">Wallet connected!</span>
                    {showReferralNotification && (
                      <span className="text-green-600 font-bold">🎁 Bonus ready to claim!</span>
                    )}
                  </div>
                  
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 text-gray-600 mb-4">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 font-bold text-sm">2</span>
                    </div>
                    <span className="font-medium">Sign message to access the casino</span>
                  </div>
                  
                  <button
                    onClick={handleSignInToCasino}
                    disabled={actuallySigningIn}
                    className={`group w-full sm:w-auto ${
                      showReferralNotification 
                        ? 'bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 shadow-green-500/30' 
                        : 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 shadow-orange-500/30'
                    } text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 shadow-xl flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                  >
                    {actuallySigningIn ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        {showReferralNotification ? (
                          <>
                            <Gift className="w-6 h-6 group-hover:animate-pulse" />
                            <span>Claim Bonus & Enter Casino</span>
                          </>
                        ) : (
                          <>
                            <Shield className="w-6 h-6 group-hover:animate-pulse" />
                            <span>Sign In to Casino</span>
                          </>
                        )}
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <span className="font-medium">Ready to play!</span>
                  </div>
                  
                  <button
                    onClick={() => navigate('/game')}
                    className="group w-full sm:w-auto bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 shadow-xl shadow-orange-500/30 flex items-center justify-center space-x-3"
                  >
                    <Play className="w-6 h-6 group-hover:animate-pulse" />
                    <span>Enter Casino</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
              
              {/* Secondary Action */}
              <div className="flex items-center space-x-4">
                <button className="group bg-white/80 backdrop-blur-lg text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-white transition-all transform hover:scale-105 shadow-lg border border-gray-200 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-yellow-600 group-hover:animate-spin" />
                  <span>Watch Demo</span>
                </button>
                
                <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium flex items-center space-x-1 group">
                  <span>Learn More</span>
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Active Players</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$2.5M</div>
                <div className="text-sm text-gray-600">Rewards Paid</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {/* Main Visual Container */}
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-3xl p-8 shadow-2xl border border-yellow-400/20">
                {/* Spinning Wheel Preview */}
                <div className="relative w-64 h-64 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-8 border-yellow-400 shadow-2xl overflow-hidden">
                    {/* Wheel Segments */}
                    {[
                      { color: 'from-yellow-400 to-amber-600', icon: Coins, label: '500' },
                      { color: 'from-green-400 to-emerald-600', icon: Trophy, label: 'NFT' },
                      { color: 'from-blue-400 to-indigo-600', icon: Gift, label: 'BONUS' },
                      { color: 'from-purple-500 to-violet-700', icon: Zap, label: '1000' },
                      { color: 'from-pink-500 to-rose-700', icon: Crown, label: 'JACKPOT' },
                      { color: 'from-orange-400 to-red-500', icon: Star, label: '250' },
                      { color: 'from-cyan-400 to-blue-600', icon: Gem, label: 'RARE' },
                      { color: 'from-emerald-400 to-teal-600', icon: Sparkles, label: '2X' }
                    ].map((segment, index) => {
                      const angle = (360 / 8) * index;
                      const Icon = segment.icon;
                      
                      return (
                        <div
                          key={index}
                          className="absolute w-full h-full animate-spin-slow"
                          style={{
                            transform: `rotate(${angle}deg)`,
                            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((2 * Math.PI) / 8)}% ${50 - 50 * Math.sin((2 * Math.PI) / 8)}%)`,
                            animationDelay: `${index * 0.1}s`,
                            animationDuration: '8s'
                          }}
                        >
                          <div className={`relative w-full h-full bg-gradient-to-br ${segment.color}`}>
                            <div className="relative flex items-center justify-center h-full">
                              <div 
                                className="text-center text-white transform translate-y-8"
                                style={{ transform: `rotate(${90 - (360 / 8) / 2}deg) translateY(-50px)` }}
                              >
                                <Icon className="w-6 h-6 mx-auto mb-1 drop-shadow-lg" />
                                <p className="text-xs font-black drop-shadow-lg">{segment.label}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Center Hub */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center z-10">
                    <RotateCcw className="w-6 h-6 text-white animate-spin-slow" />
                  </div>
                  
                  {/* Pointer */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-yellow-400 shadow-lg"></div>
                  </div>
                </div>
                
                {/* Game Stats */}
                <div className="grid grid-cols-2 gap-4 text-center text-white">
                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="text-xl font-bold text-yellow-400">68%</div>
                    <div className="text-xs text-gray-300">Win Rate</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="text-xl font-bold text-green-400">15K+</div>
                    <div className="text-xs text-gray-300">NFTs Won</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl animate-bounce" style={{ animationDelay: '0.5s' }}>
                <Coins className="w-6 h-6 text-white" />
              </div>
              
              <div className="absolute top-1/2 -right-8 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-xl animate-bounce" style={{ animationDelay: '1s' }}>
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative z-10 py-20 bg-white/50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600 mb-4">
              Why Choose XXX Gaming Hub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of gaming with our cutting-edge Web3 platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-yellow-200 hover:shadow-2xl transition-all transform hover:scale-105 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="relative z-10 py-20 bg-gradient-to-br from-yellow-100/50 to-amber-100/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600 mb-4">
              Amazing Prizes Await
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every spin could be your lucky moment. Check out what you can win!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {prizes.map((prize, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br ${prize.color} rounded-2xl p-6 text-white shadow-2xl transform hover:scale-105 transition-all animate-slide-up overflow-hidden`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
                      {prize.rarity}
                    </span>
                    <Star className="w-5 h-5 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">{prize.name}</h3>
                  <p className="text-lg font-semibold opacity-90">{prize.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 mb-20">
          <TradingSection />
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-10 h-10 text-white animate-bounce" />
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Ready to Win Big?
              </h2>
              
              <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
                Join the revolution of Web3 gaming. Connect your wallet and start spinning for incredible rewards!
              </p>
              
              <button
                onClick={() => {
                  if (!wallet.isConnected) {
                    // Scroll to connect wallet section or show connect button
                    document.querySelector('.connect-wallet-section')?.scrollIntoView({ behavior: 'smooth' });
                  } else if (isAuthenticated) {
                    navigate('/game');
                  } else {
                    handleSignInToCasino();
                  }
                }}
                disabled={actuallySigningIn}
                className="bg-white text-gray-900 px-10 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all transform hover:scale-110 shadow-xl flex items-center space-x-3 mx-auto"
              >
                <Trophy className="w-6 h-6" />
                <span>
                  {actuallySigningIn ? 'Signing In...' : 
                   !wallet.isConnected ? 'Connect Wallet' :
                   isAuthenticated ? 'Enter Game' : 'Sign In to Casino'}
                </span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12 connect-wallet-section">
        <div className="container mx-auto px-4">
          {/* Wallet Connection Section */}
          {!wallet.isConnected && (
            <div className="text-center mb-12 p-8 bg-gray-800 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Playing?</h3>
              <p className="text-gray-300 mb-6">Connect your wallet to access the XXX Gaming Hub</p>
              <ConnectButton />
            </div>
          )}
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">XXX Gaming Hub</h3>
                <p className="text-gray-400 text-sm">Premium Web3 Gaming</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2024 XXX Gaming Hub. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Built on Binance Smart Chain
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;