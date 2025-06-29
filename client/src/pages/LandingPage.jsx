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
  ChevronDown,
  RotateCcw,
  Gamepad2,
  Wallet,
  Lock,
  CheckCircle,
  Globe,
  Smartphone,
  Layers,
  Infinity,
  Flame,
  Lightning,
  Heart,
  MessageCircle,
  Twitter,
  Youtube,
  Instagram,
  ExternalLink,
  ArrowUp,
  Menu,
  X
} from 'lucide-react';
import TradingSection from '../components/TradingSection';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wallet = useAccount();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [isSigningIn, setIsSigningIn] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
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
      
      // Authenticate user with signature
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Moving Gradients */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/50">
                <Trophy className="w-7 h-7 text-black font-bold" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">XXX Gaming</h1>
                <p className="text-xs text-yellow-400 font-semibold">Web3 Casino</p>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-yellow-400 font-medium transition-colors">Features</a>
              <a href="#games" className="text-white/80 hover:text-yellow-400 font-medium transition-colors">Games</a>
              <a href="#rewards" className="text-white/80 hover:text-yellow-400 font-medium transition-colors">Rewards</a>
              <a href="#community" className="text-white/80 hover:text-yellow-400 font-medium transition-colors">Community</a>
              <ConnectButton />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10">
              <div className="flex flex-col space-y-4 pt-4">
                <a href="#features" className="text-white/80 hover:text-yellow-400 font-medium transition-colors">Features</a>
                <a href="#games" className="text-white/80 hover:text-yellow-400 font-medium transition-colors">Games</a>
                <a href="#rewards" className="text-white/80 hover:text-yellow-400 font-medium transition-colors">Rewards</a>
                <a href="#community" className="text-white/80 hover:text-yellow-400 font-medium transition-colors">Community</a>
                <div className="pt-2">
                  <ConnectButton />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8 animate-slide-up">
              {/* Badge */}
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-6 py-3 backdrop-blur-xl">
                <Flame className="w-5 h-5 text-yellow-400 animate-pulse" />
                <span className="text-yellow-400 font-bold">🔥 HOTTEST WEB3 CASINO</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl font-black leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse">
                    WIN
                  </span>
                  <br />
                  <span className="text-white">BIG</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                    PLAY
                  </span>
                  <br />
                  <span className="text-white">SMART</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed max-w-lg">
                  The most <span className="text-yellow-400 font-bold">revolutionary</span> blockchain casino. 
                  Spin, win, and earn <span className="text-green-400 font-bold">real rewards</span> in the metaverse!
                </p>
              </div>

              {/* Referral Notification */}
              {showReferralNotification && (
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-2xl p-6 backdrop-blur-xl animate-bounce-in">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-green-400 font-bold text-lg">🎉 EXCLUSIVE BONUS UNLOCKED!</h3>
                      <p className="text-green-300 mb-2">
                        Referral Code: <span className="font-mono font-bold bg-green-400/20 px-3 py-1 rounded text-green-200">{referralCode}</span>
                      </p>
                      <p className="text-green-200 text-sm">
                        Connect & sign in to claim <strong>100 XXX tokens + 3 FREE spins!</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-6">
                {!wallet.isConnected ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
                        <span className="text-blue-400 font-bold">1</span>
                      </div>
                      <span className="font-medium">Connect your Web3 wallet</span>
                    </div>
                    <div className="pl-13">
                      <ConnectButton />
                    </div>
                  </div>
                ) : !isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-green-400">
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center border border-green-400/30">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <span className="font-medium">Wallet Connected!</span>
                      {showReferralNotification && (
                        <span className="text-yellow-400 font-bold animate-pulse">🎁 Bonus Ready!</span>
                      )}
                    </div>
                    
                    {error && (
                      <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-3 text-red-300 text-sm backdrop-blur-xl">
                        {error}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-3 text-gray-300 mb-4">
                      <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-400/30">
                        <span className="text-yellow-400 font-bold">2</span>
                      </div>
                      <span className="font-medium">Sign message to enter casino</span>
                    </div>
                    
                    <button
                      onClick={handleSignInToCasino}
                      disabled={actuallySigningIn}
                      className={`group relative overflow-hidden ${
                        showReferralNotification 
                          ? 'bg-gradient-to-r from-green-500 via-emerald-600 to-green-700' 
                          : 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500'
                      } text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[300px]`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      {actuallySigningIn ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>SIGNING IN...</span>
                        </>
                      ) : (
                        <>
                          {showReferralNotification ? (
                            <>
                              <Gift className="w-6 h-6 group-hover:animate-pulse" />
                              <span>CLAIM BONUS & ENTER</span>
                            </>
                          ) : (
                            <>
                              <Rocket className="w-6 h-6 group-hover:animate-pulse" />
                              <span>ENTER CASINO</span>
                            </>
                          )}
                          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-green-400">
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center border border-green-400/30">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <span className="font-medium">Ready to Play!</span>
                    </div>
                    
                    <button
                      onClick={() => navigate('/game')}
                      className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3 min-w-[300px]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <Play className="w-6 h-6 group-hover:animate-pulse" />
                      <span>ENTER CASINO</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
                
                {/* Secondary Actions */}
                <div className="flex items-center space-x-6">
                  <button className="group bg-white/10 backdrop-blur-xl text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all transform hover:scale-105 border border-white/20 flex items-center space-x-2">
                    <Play className="w-5 h-5 text-yellow-400 group-hover:animate-spin" />
                    <span>Watch Demo</span>
                  </button>
                  
                  <a href="#features" className="text-gray-400 hover:text-white font-medium flex items-center space-x-1 group">
                    <span>Explore Features</span>
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">50K+</div>
                  <div className="text-sm text-gray-400">Players</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">$2.5M</div>
                  <div className="text-sm text-gray-400">Won</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">99.9%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
              </div>
            </div>

            {/* Right Column - 3D Casino Visual */}
            <div className="relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {/* Main Casino Container */}
              <div className="relative">
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
                
                {/* Casino Machine */}
                <div className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-black rounded-3xl p-8 shadow-2xl border border-yellow-400/30 backdrop-blur-xl">
                  {/* Screen */}
                  <div className="bg-black rounded-2xl p-6 mb-6 border-4 border-yellow-400/50 shadow-inner">
                    {/* Spinning Wheel */}
                    <div className="relative w-64 h-64 mx-auto">
                      <div className="absolute inset-0 rounded-full border-8 border-yellow-400 shadow-2xl overflow-hidden">
                        {/* Wheel Segments */}
                        {[
                          { color: 'from-yellow-400 to-amber-600', icon: Coins, label: '500', glow: 'shadow-yellow-500/50' },
                          { color: 'from-green-400 to-emerald-600', icon: Trophy, label: 'NFT', glow: 'shadow-green-500/50' },
                          { color: 'from-blue-400 to-indigo-600', icon: Gift, label: 'BONUS', glow: 'shadow-blue-500/50' },
                          { color: 'from-purple-500 to-violet-700', icon: Zap, label: '1000', glow: 'shadow-purple-500/50' },
                          { color: 'from-pink-500 to-rose-700', icon: Crown, label: 'JACKPOT', glow: 'shadow-pink-500/50' },
                          { color: 'from-orange-400 to-red-500', icon: Star, label: '250', glow: 'shadow-orange-500/50' },
                          { color: 'from-cyan-400 to-blue-600', icon: Gem, label: 'RARE', glow: 'shadow-cyan-500/50' },
                          { color: 'from-emerald-400 to-teal-600', icon: Sparkles, label: '2X', glow: 'shadow-emerald-500/50' }
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
                                animationDuration: '12s'
                              }}
                            >
                              <div className={`relative w-full h-full bg-gradient-to-br ${segment.color} ${segment.glow} shadow-2xl`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                                <div className="relative flex items-center justify-center h-full">
                                  <div 
                                    className="text-center text-white transform translate-y-8"
                                    style={{ transform: `rotate(${90 - (360 / 8) / 2}deg) translateY(-50px)` }}
                                  >
                                    <Icon className="w-6 h-6 mx-auto mb-1 drop-shadow-lg" />
                                    <p className="text-xs font-black drop-shadow-lg tracking-wide">{segment.label}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Center Hub */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center z-10">
                        <RotateCcw className="w-6 h-6 text-black animate-spin-slow" />
                      </div>
                      
                      {/* Pointer */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-yellow-400 shadow-lg"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Control Panel */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg">
                      SPIN NOW
                    </button>
                    <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-bold hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
                      MAX BET
                    </button>
                  </div>
                  
                  {/* Stats Display */}
                  <div className="grid grid-cols-2 gap-4 text-center text-white">
                    <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xl border border-white/20">
                      <div className="text-xl font-bold text-yellow-400">68%</div>
                      <div className="text-xs text-gray-300">Win Rate</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xl border border-white/20">
                      <div className="text-xl font-bold text-green-400">15K+</div>
                      <div className="text-xs text-gray-300">NFTs Won</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/50 animate-bounce">
                  <Trophy className="w-8 h-8 text-black" />
                </div>
                
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <Coins className="w-6 h-6 text-white" />
                </div>
                
                <div className="absolute top-1/2 -right-8 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 animate-bounce" style={{ animationDelay: '1s' }}>
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6">
              REVOLUTIONARY FEATURES
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of gaming with cutting-edge Web3 technology and unmatched rewards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Provably Fair",
                description: "Blockchain-verified spins with transparent smart contracts",
                color: "from-blue-400 to-cyan-500",
                glow: "shadow-blue-500/50"
              },
              {
                icon: Lightning,
                title: "Instant Payouts",
                description: "Automatic token distribution directly to your wallet",
                color: "from-yellow-400 to-orange-500",
                glow: "shadow-yellow-500/50"
              },
              {
                icon: Gem,
                title: "Exclusive NFTs",
                description: "Win rare collectibles and unique digital assets",
                color: "from-purple-400 to-pink-500",
                glow: "shadow-purple-500/50"
              },
              {
                icon: Infinity,
                title: "Multi-Chain",
                description: "Support for multiple blockchains and cryptocurrencies",
                color: "from-green-400 to-emerald-500",
                glow: "shadow-green-500/50"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`group bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all transform hover:scale-105 hover:shadow-2xl ${feature.glow} animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6">
              EPIC GAMES
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose your adventure and win big with our collection of thrilling Web3 games
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Spin Wheel",
                description: "Classic casino wheel with crypto rewards",
                image: "🎰",
                color: "from-yellow-400 to-orange-500",
                players: "12.5K",
                jackpot: "50,000 XXX"
              },
              {
                title: "NFT Lottery",
                description: "Win exclusive digital collectibles",
                image: "🎨",
                color: "from-purple-400 to-pink-500",
                players: "8.2K",
                jackpot: "Rare NFT"
              },
              {
                title: "Token Rain",
                description: "Catch falling tokens in real-time",
                image: "💰",
                color: "from-green-400 to-emerald-500",
                players: "15.7K",
                jackpot: "25,000 XXX"
              }
            ].map((game, index) => (
              <div
                key={index}
                className={`group relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all transform hover:scale-105 overflow-hidden animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                
                <div className="relative z-10">
                  <div className="text-6xl mb-4 text-center">{game.image}</div>
                  <h3 className="text-2xl font-bold text-white mb-3 text-center">{game.title}</h3>
                  <p className="text-gray-400 mb-6 text-center">{game.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Players Online</span>
                      <span className="text-green-400 font-bold">{game.players}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Current Jackpot</span>
                      <span className="text-yellow-400 font-bold">{game.jackpot}</span>
                    </div>
                  </div>
                  
                  <button className={`w-full bg-gradient-to-r ${game.color} text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105`}>
                    PLAY NOW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section id="rewards" className="relative z-10 py-20 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6">
              MASSIVE REWARDS
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Every spin could change your life. Check out the incredible prizes waiting for you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "MEGA JACKPOT", amount: "100,000 XXX", rarity: "LEGENDARY", color: "from-yellow-400 to-orange-500", chance: "0.1%" },
              { name: "RARE NFT", amount: "Exclusive Art", rarity: "EPIC", color: "from-purple-400 to-pink-500", chance: "2%" },
              { name: "TOKEN BONUS", amount: "10,000 XXX", rarity: "RARE", color: "from-blue-400 to-cyan-500", chance: "5%" },
              { name: "MULTIPLIER", amount: "5x Boost", rarity: "COMMON", color: "from-green-400 to-emerald-500", chance: "15%" }
            ].map((prize, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${prize.color} rounded-2xl p-6 text-white shadow-2xl transform hover:scale-105 transition-all animate-slide-up overflow-hidden`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
                      {prize.rarity}
                    </span>
                    <span className="text-xs font-bold bg-black/20 px-3 py-1 rounded-full">
                      {prize.chance}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-2">{prize.name}</h3>
                  <p className="text-lg font-bold opacity-90 mb-4">{prize.amount}</p>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-1000 group-hover:w-full" 
                      style={{ width: prize.chance }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
              JOIN THE COMMUNITY
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with thousands of players, share strategies, and stay updated with the latest news
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { platform: "Discord", icon: MessageCircle, members: "25K+", color: "from-indigo-500 to-purple-600", link: "#" },
              { platform: "Twitter", icon: Twitter, members: "50K+", color: "from-blue-400 to-blue-600", link: "#" },
              { platform: "YouTube", icon: Youtube, members: "15K+", color: "from-red-500 to-red-600", link: "#" },
              { platform: "Instagram", icon: Instagram, members: "30K+", color: "from-pink-500 to-purple-600", link: "#" }
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.link}
                  className={`group block bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all transform hover:scale-105 animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">{social.platform}</h3>
                  <p className="text-gray-400 mb-4">{social.members} members</p>
                  <div className="flex items-center text-yellow-400 group-hover:text-yellow-300 transition-colors">
                    <span className="text-sm font-medium">Join Now</span>
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trading Section */}
      <section className="relative z-10 py-20 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <TradingSection />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="relative bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-12 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full translate-x-30 translate-y-30"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-10 h-10 text-white animate-bounce" />
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                READY TO WIN BIG?
              </h2>
              
              <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
                Join the revolution of Web3 gaming. Connect your wallet and start your journey to incredible rewards!
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button
                  onClick={() => {
                    if (!wallet.isConnected) {
                      document.querySelector('.connect-wallet-section')?.scrollIntoView({ behavior: 'smooth' });
                    } else if (isAuthenticated) {
                      navigate('/game');
                    } else {
                      handleSignInToCasino();
                    }
                  }}
                  disabled={actuallySigningIn}
                  className="group relative overflow-hidden bg-white text-gray-900 px-10 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all transform hover:scale-110 shadow-xl flex items-center space-x-3"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <Trophy className="w-6 h-6" />
                  <span>
                    {actuallySigningIn ? 'SIGNING IN...' : 
                     !wallet.isConnected ? 'CONNECT WALLET' :
                     isAuthenticated ? 'ENTER GAME' : 'SIGN IN TO CASINO'}
                  </span>
                  <ArrowRight className="w-6 h-6" />
                </button>
                
                <button className="group bg-white/20 backdrop-blur-xl text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all transform hover:scale-105 border border-white/30 flex items-center space-x-3">
                  <Play className="w-5 h-5 group-hover:animate-pulse" />
                  <span>WATCH DEMO</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/80 backdrop-blur-xl border-t border-white/10 py-12 connect-wallet-section">
        <div className="container mx-auto px-4">
          {/* Wallet Connection Section */}
          {!wallet.isConnected && (
            <div className="text-center mb-12 p-8 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl border border-yellow-500/30 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Playing?</h3>
              <p className="text-gray-300 mb-6">Connect your wallet to access the XXX Gaming Hub</p>
              <ConnectButton />
            </div>
          )}
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">XXX Gaming Hub</h3>
                <p className="text-gray-400 text-sm">The Future of Web3 Gaming</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2024 XXX Gaming Hub. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Built on Binance Smart Chain • Powered by Web3
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/50 hover:scale-110 transition-all"
      >
        <ArrowUp className="w-6 h-6 text-black" />
      </button>
    </div>
  );
};

export default LandingPage;