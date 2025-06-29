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
  X,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  DollarSign,
  TrendingDown,
  Eye,
  Clock,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Send,
  ChevronRight,
  Hexagon,
  Layers3,
  Cpu,
  Database,
  Network,
  Fingerprint,
  Radar,
  Orbit
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
  const [activeTestimonial, setActiveTestimonial] = React.useState(0);
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

  // Auto-rotate testimonials
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Show referral notification if there's a pending referral code
  const showReferralNotification = referralCode && !isAuthenticated;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Dynamic Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black animate-gradient-shift"></div>
        
        {/* Floating Orbs */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-xl animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 60}px`,
                height: `${20 + Math.random() * 60}px`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-2xl border-b border-white/10 sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl blur-lg opacity-75 animate-pulse"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-2xl">
                  <Trophy className="w-7 h-7 text-black font-bold" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">XXX GAMING</h1>
                <p className="text-xs text-yellow-400 font-semibold tracking-wider">WEB3 REVOLUTION</p>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-yellow-400 font-medium transition-all hover:scale-105">Features</a>
              <a href="#games" className="text-white/80 hover:text-yellow-400 font-medium transition-all hover:scale-105">Games</a>
              <a href="#rewards" className="text-white/80 hover:text-yellow-400 font-medium transition-all hover:scale-105">Rewards</a>
              <a href="#community" className="text-white/80 hover:text-yellow-400 font-medium transition-all hover:scale-105">Community</a>
              <ConnectButton />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10 animate-slide-down">
              <div className="flex flex-col space-y-4 pt-4">
                <a href="#features" className="text-white/80 hover:text-yellow-400 font-medium transition-colors py-2">Features</a>
                <a href="#games" className="text-white/80 hover:text-yellow-400 font-medium transition-colors py-2">Games</a>
                <a href="#rewards" className="text-white/80 hover:text-yellow-400 font-medium transition-colors py-2">Rewards</a>
                <a href="#community" className="text-white/80 hover:text-yellow-400 font-medium transition-colors py-2">Community</a>
                <div className="pt-2">
                  <ConnectButton />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8 animate-slide-up">
              {/* Live Badge */}
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-full px-6 py-3 backdrop-blur-xl">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-bold text-sm">🔴 LIVE NOW</span>
                <span className="text-white/60 text-sm">50,247 PLAYERS ONLINE</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-7xl md:text-9xl font-black leading-none">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-text-shimmer">
                    SPIN
                  </span>
                  <span className="block text-white">TO</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-text-shimmer" style={{ animationDelay: '0.5s' }}>
                    WIN
                  </span>
                </h1>
                
                <div className="space-y-4">
                  <p className="text-2xl md:text-3xl text-gray-300 font-bold leading-tight">
                    The most <span className="text-yellow-400 animate-pulse">INSANE</span> Web3 casino
                  </p>
                  <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
                    🚀 Instant payouts • 🎯 Provably fair • 💎 Exclusive NFTs • 🔥 Massive jackpots
                  </p>
                </div>
              </div>

              {/* Referral Notification */}
              {showReferralNotification && (
                <div className="relative bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-2xl p-6 backdrop-blur-xl animate-bounce-in overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 animate-pulse"></div>
                  <div className="relative flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 animate-bounce">
                      <Gift className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-green-400 font-black text-xl mb-2">🎉 EXCLUSIVE BONUS UNLOCKED!</h3>
                      <p className="text-green-300 mb-3">
                        Referral Code: <span className="font-mono font-bold bg-green-400/20 px-4 py-2 rounded-lg text-green-200 text-lg">{referralCode}</span>
                      </p>
                      <p className="text-green-200">
                        Connect & sign in to claim <strong className="text-yellow-400">100 XXX tokens + 3 FREE spins!</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Flow */}
              <div className="space-y-6">
                {!wallet.isConnected ? (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 text-gray-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center border-2 border-blue-400/30 shadow-lg">
                        <span className="text-white font-black text-lg">1</span>
                      </div>
                      <div>
                        <p className="font-bold text-lg">Connect Web3 Wallet</p>
                        <p className="text-sm text-gray-400">MetaMask, Trust Wallet, or WalletConnect</p>
                      </div>
                    </div>
                    <div className="pl-16">
                      <ConnectButton />
                    </div>
                  </div>
                ) : !isAuthenticated ? (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 text-green-400">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center border-2 border-green-400/30 shadow-lg">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">Wallet Connected! ✅</p>
                        <p className="text-sm text-green-300">
                          {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                          {showReferralNotification && <span className="ml-2 text-yellow-400 font-bold animate-pulse">🎁 Bonus Ready!</span>}
                        </p>
                      </div>
                    </div>
                    
                    {error && (
                      <div className="bg-red-500/20 border border-red-400/50 rounded-xl p-4 text-red-300 backdrop-blur-xl">
                        <div className="flex items-center space-x-2">
                          <ExternalLink className="w-5 h-5" />
                          <span className="font-medium">{error}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-4 text-gray-300 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center border-2 border-yellow-400/30 shadow-lg">
                        <span className="text-white font-black text-lg">2</span>
                      </div>
                      <div>
                        <p className="font-bold text-lg">Sign Message</p>
                        <p className="text-sm text-gray-400">Secure authentication (no gas fees)</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleSignInToCasino}
                      disabled={actuallySigningIn}
                      className={`group relative overflow-hidden ${
                        showReferralNotification 
                          ? 'bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 shadow-green-500/50' 
                          : 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 shadow-yellow-500/50'
                      } text-white px-10 py-5 rounded-2xl font-black text-xl transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[350px]`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      {actuallySigningIn ? (
                        <>
                          <div className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>SIGNING IN...</span>
                        </>
                      ) : (
                        <>
                          {showReferralNotification ? (
                            <>
                              <Gift className="w-7 h-7 group-hover:animate-bounce" />
                              <span>CLAIM BONUS & ENTER</span>
                            </>
                          ) : (
                            <>
                              <Rocket className="w-7 h-7 group-hover:animate-pulse" />
                              <span>ENTER CASINO</span>
                            </>
                          )}
                          <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 text-green-400">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center border-2 border-green-400/30 shadow-lg animate-pulse">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">Ready to Play! 🎮</p>
                        <p className="text-sm text-green-300">All systems go!</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => navigate('/game')}
                      className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all transform hover:scale-105 shadow-2xl shadow-yellow-500/50 flex items-center justify-center space-x-4 min-w-[350px]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <Play className="w-7 h-7 group-hover:animate-pulse" />
                      <span>ENTER CASINO</span>
                      <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                )}
                
                {/* Secondary Actions */}
                <div className="flex items-center space-x-6 pt-4">
                  <button className="group bg-white/10 backdrop-blur-xl text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all transform hover:scale-105 border border-white/20 flex items-center space-x-2">
                    <Play className="w-5 h-5 text-yellow-400 group-hover:animate-spin" />
                    <span>Demo</span>
                  </button>
                  
                  <a href="#features" className="text-gray-400 hover:text-white font-medium flex items-center space-x-1 group">
                    <span>Explore</span>
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="text-3xl font-black text-yellow-400 animate-pulse">50K+</div>
                  <div className="text-sm text-gray-400 font-medium">Active Players</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-green-400 animate-pulse">$2.5M</div>
                  <div className="text-sm text-gray-400 font-medium">Total Won</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-purple-400 animate-pulse">99.9%</div>
                  <div className="text-sm text-gray-400 font-medium">Uptime</div>
                </div>
              </div>
            </div>

            {/* Right Column - 3D Casino Visual */}
            <div className="relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {/* Floating Casino Machine */}
              <div className="relative transform hover:scale-105 transition-transform duration-500">
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-3xl opacity-40 animate-pulse"></div>
                
                {/* Casino Machine */}
                <div className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-black rounded-3xl p-8 shadow-2xl border-2 border-yellow-400/30 backdrop-blur-xl">
                  {/* Screen */}
                  <div className="bg-black rounded-2xl p-6 mb-6 border-4 border-yellow-400/50 shadow-inner relative overflow-hidden">
                    {/* Screen Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 animate-pulse"></div>
                    
                    {/* Spinning Wheel */}
                    <div className="relative w-72 h-72 mx-auto">
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
                                animationDuration: '15s'
                              }}
                            >
                              <div className={`relative w-full h-full bg-gradient-to-br ${segment.color} ${segment.glow} shadow-2xl`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                                <div className="relative flex items-center justify-center h-full">
                                  <div 
                                    className="text-center text-white transform translate-y-8"
                                    style={{ transform: `rotate(${90 - (360 / 8) / 2}deg) translateY(-60px)` }}
                                  >
                                    <Icon className="w-7 h-7 mx-auto mb-2 drop-shadow-lg" />
                                    <p className="text-sm font-black drop-shadow-lg tracking-wide">{segment.label}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Center Hub */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center z-10">
                        <RotateCcw className="w-8 h-8 text-black animate-spin-slow" />
                      </div>
                      
                      {/* Pointer */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                        <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-l-transparent border-r-transparent border-b-yellow-400 shadow-lg"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Control Panel */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg">
                      SPIN NOW
                    </button>
                    <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
                      MAX BET
                    </button>
                  </div>
                  
                  {/* Stats Display */}
                  <div className="grid grid-cols-2 gap-4 text-center text-white">
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-xl border border-white/20">
                      <div className="text-2xl font-bold text-yellow-400">68%</div>
                      <div className="text-xs text-gray-300">Win Rate</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-xl border border-white/20">
                      <div className="text-2xl font-bold text-green-400">15K+</div>
                      <div className="text-xs text-gray-300">NFTs Won</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/50 animate-bounce">
                  <Trophy className="w-10 h-10 text-black" />
                </div>
                
                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <Coins className="w-8 h-8 text-white" />
                </div>
                
                <div className="absolute top-1/2 -right-10 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 animate-bounce" style={{ animationDelay: '1s' }}>
                  <Star className="w-6 h-6 text-white" />
                </div>
                
                <div className="absolute top-1/4 -left-6 w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-bounce" style={{ animationDelay: '1.5s' }}>
                  <Gem className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full px-6 py-3 backdrop-blur-xl mb-8">
              <Layers3 className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-bold">REVOLUTIONARY FEATURES</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-8">
              NEXT-GEN GAMING
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of gaming with cutting-edge Web3 technology, unmatched security, and revolutionary rewards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Provably Fair",
                description: "Blockchain-verified spins with transparent smart contracts and cryptographic proof",
                color: "from-blue-400 to-cyan-500",
                glow: "shadow-blue-500/50",
                features: ["Smart Contract Verified", "Transparent RNG", "Immutable Results"]
              },
              {
                icon: Lightning,
                title: "Instant Payouts",
                description: "Automatic token distribution directly to your wallet within seconds",
                color: "from-yellow-400 to-orange-500",
                glow: "shadow-yellow-500/50",
                features: ["0-3 Second Payouts", "No Manual Claims", "Gas Optimized"]
              },
              {
                icon: Gem,
                title: "Exclusive NFTs",
                description: "Win rare collectibles and unique digital assets with real utility",
                color: "from-purple-400 to-pink-500",
                glow: "shadow-purple-500/50",
                features: ["Rare Collections", "Utility NFTs", "Marketplace Ready"]
              },
              {
                icon: Infinity,
                title: "Multi-Chain",
                description: "Support for multiple blockchains and cryptocurrencies",
                color: "from-green-400 to-emerald-500",
                glow: "shadow-green-500/50",
                features: ["BSC Native", "ETH Bridge", "Polygon Support"]
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all transform hover:scale-105 hover:shadow-2xl ${feature.glow} animate-slide-up overflow-hidden`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">{feature.title}</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-6 leading-relaxed">{feature.description}</p>
                    
                    <div className="space-y-2">
                      {feature.features.map((feat, i) => (
                        <div key={i} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="relative z-10 py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-full px-6 py-3 backdrop-blur-xl mb-8">
              <Gamepad2 className="w-5 h-5 text-pink-400" />
              <span className="text-pink-400 font-bold">EPIC GAMES</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-8">
              CHOOSE YOUR GAME
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Multiple thrilling Web3 games with massive jackpots, exclusive rewards, and unbeatable odds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Spin Wheel",
                description: "Classic casino wheel with crypto rewards and NFT prizes",
                image: "🎰",
                color: "from-yellow-400 to-orange-500",
                players: "12.5K",
                jackpot: "50,000 XXX",
                winRate: "68%",
                features: ["Instant Wins", "NFT Drops", "Multipliers"]
              },
              {
                title: "NFT Lottery",
                description: "Win exclusive digital collectibles and rare artwork",
                image: "🎨",
                color: "from-purple-400 to-pink-500",
                players: "8.2K",
                jackpot: "Rare NFT",
                winRate: "15%",
                features: ["Rare NFTs", "Artist Collabs", "Utility Tokens"]
              },
              {
                title: "Token Rain",
                description: "Catch falling tokens in real-time multiplayer action",
                image: "💰",
                color: "from-green-400 to-emerald-500",
                players: "15.7K",
                jackpot: "25,000 XXX",
                winRate: "45%",
                features: ["Real-time", "Multiplayer", "Skill-based"]
              }
            ].map((game, index) => (
              <div
                key={index}
                className={`group relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all transform hover:scale-105 overflow-hidden animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                
                <div className="relative z-10">
                  <div className="text-8xl mb-6 text-center">{game.image}</div>
                  <h3 className="text-3xl font-bold text-white mb-4 text-center">{game.title}</h3>
                  <p className="text-gray-400 mb-6 text-center leading-relaxed">{game.description}</p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Players Online</span>
                      <span className="text-green-400 font-bold">{game.players}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Current Jackpot</span>
                      <span className="text-yellow-400 font-bold">{game.jackpot}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Win Rate</span>
                      <span className="text-purple-400 font-bold">{game.winRate}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {game.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className={`w-full bg-gradient-to-r ${game.color} text-white py-4 px-6 rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2`}>
                    <Play className="w-5 h-5" />
                    <span>PLAY NOW</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Game Stats */}
          <div className="bg-gradient-to-r from-gray-900/50 to-purple-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-black text-yellow-400 mb-2">36K+</div>
                <div className="text-gray-400">Games Played Today</div>
              </div>
              <div>
                <div className="text-4xl font-black text-green-400 mb-2">$847K</div>
                <div className="text-gray-400">Won in Last 24h</div>
              </div>
              <div>
                <div className="text-4xl font-black text-purple-400 mb-2">2.3K</div>
                <div className="text-gray-400">NFTs Minted</div>
              </div>
              <div>
                <div className="text-4xl font-black text-blue-400 mb-2">99.2%</div>
                <div className="text-gray-400">Player Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section id="rewards" className="relative z-10 py-32 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-6 py-3 backdrop-blur-xl mb-8">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">MASSIVE REWARDS</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-8">
              LIFE-CHANGING PRIZES
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Every spin could change your life forever. Check out the incredible prizes waiting for lucky winners!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { 
                name: "MEGA JACKPOT", 
                amount: "100,000 XXX", 
                rarity: "LEGENDARY", 
                color: "from-yellow-400 to-orange-500", 
                chance: "0.1%",
                icon: Crown,
                description: "The ultimate prize"
              },
              { 
                name: "RARE NFT", 
                amount: "Exclusive Art", 
                rarity: "EPIC", 
                color: "from-purple-400 to-pink-500", 
                chance: "2%",
                icon: Gem,
                description: "Limited edition collectibles"
              },
              { 
                name: "TOKEN BONUS", 
                amount: "10,000 XXX", 
                rarity: "RARE", 
                color: "from-blue-400 to-cyan-500", 
                chance: "5%",
                icon: Coins,
                description: "Instant token rewards"
              },
              { 
                name: "MULTIPLIER", 
                amount: "5x Boost", 
                rarity: "COMMON", 
                color: "from-green-400 to-emerald-500", 
                chance: "15%",
                icon: Zap,
                description: "Multiply your next win"
              }
            ].map((prize, index) => {
              const Icon = prize.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br ${prize.color} rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all animate-slide-up overflow-hidden`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
                        {prize.rarity}
                      </span>
                      <span className="text-xs font-bold bg-black/20 px-3 py-1 rounded-full">
                        {prize.chance}
                      </span>
                    </div>
                    
                    <div className="text-center mb-6">
                      <Icon className="w-16 h-16 mx-auto mb-4 drop-shadow-lg" />
                      <h3 className="text-2xl font-black mb-2">{prize.name}</h3>
                      <p className="text-lg font-bold opacity-90 mb-2">{prize.amount}</p>
                      <p className="text-sm opacity-75">{prize.description}</p>
                    </div>
                    
                    <div className="w-full bg-white/20 rounded-full h-3 mb-4">
                      <div 
                        className="bg-white rounded-full h-3 transition-all duration-1000 group-hover:w-full" 
                        style={{ width: prize.chance }}
                      ></div>
                    </div>
                    
                    <div className="text-center">
                      <span className="text-xs font-bold opacity-75">Win Probability</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Winners */}
          <div className="bg-gradient-to-r from-gray-900/50 to-yellow-900/50 backdrop-blur-xl rounded-2xl p-8 border border-yellow-500/20">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">🏆 Recent Big Winners</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { address: "0x742d...532", prize: "50,000 XXX", time: "2 mins ago", game: "Spin Wheel" },
                { address: "0x8f3a...891", prize: "Rare NFT", time: "5 mins ago", game: "NFT Lottery" },
                { address: "0x1b4c...234", prize: "25,000 XXX", time: "8 mins ago", game: "Token Rain" }
              ].map((winner, index) => (
                <div key={index} className="bg-white/10 rounded-xl p-4 backdrop-blur-xl border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-400 font-mono text-sm">{winner.address}</span>
                    <span className="text-gray-400 text-xs">{winner.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">{winner.prize}</span>
                    <span className="text-gray-400 text-sm">{winner.game}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full px-6 py-3 backdrop-blur-xl mb-8">
              <Heart className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-bold">PLAYER TESTIMONIALS</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-8">
              WHAT PLAYERS SAY
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {[
              {
                name: "CryptoKing",
                address: "0x742d...532",
                text: "Won 50,000 XXX tokens on my first spin! This platform is absolutely insane. The payouts are instant and the games are so addictive.",
                rating: 5,
                prize: "50K XXX"
              },
              {
                name: "NFTCollector",
                address: "0x8f3a...891", 
                text: "Got a rare NFT worth $5000! The art quality is amazing and the marketplace integration is seamless. Best Web3 casino ever!",
                rating: 5,
                prize: "Rare NFT"
              },
              {
                name: "TokenMaster",
                address: "0x1b4c...234",
                text: "Been playing for 3 months, won over 100K tokens total. The referral system is generous and the community is amazing!",
                rating: 5,
                prize: "100K+ XXX"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`${index === activeTestimonial ? 'block' : 'hidden'} bg-gradient-to-br from-gray-900/50 to-purple-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center animate-fade-in`}
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.address}</div>
                    <div className="text-green-400 text-sm font-bold">Won: {testimonial.prize}</div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTestimonial ? 'bg-yellow-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="relative z-10 py-32 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-6 py-3 backdrop-blur-xl mb-8">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-bold">JOIN THE COMMUNITY</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-8">
              50K+ PLAYERS
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect with thousands of players, share strategies, get exclusive tips, and stay updated with the latest news
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { 
                platform: "Discord", 
                icon: MessageCircle, 
                members: "25K+", 
                color: "from-indigo-500 to-purple-600", 
                link: "#",
                description: "Real-time chat & exclusive events"
              },
              { 
                platform: "Twitter", 
                icon: Twitter, 
                members: "50K+", 
                color: "from-blue-400 to-blue-600", 
                link: "#",
                description: "Latest updates & announcements"
              },
              { 
                platform: "YouTube", 
                icon: Youtube, 
                members: "15K+", 
                color: "from-red-500 to-red-600", 
                link: "#",
                description: "Tutorials & gameplay videos"
              },
              { 
                platform: "Instagram", 
                icon: Instagram, 
                members: "30K+", 
                color: "from-pink-500 to-purple-600", 
                link: "#",
                description: "Behind the scenes & winners"
              }
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.link}
                  className={`group block bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all transform hover:scale-105 animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${social.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">{social.platform}</h3>
                  <p className="text-gray-400 mb-4">{social.members} members</p>
                  <p className="text-gray-500 text-sm mb-6">{social.description}</p>
                  <div className="flex items-center text-yellow-400 group-hover:text-yellow-300 transition-colors">
                    <span className="font-medium">Join Community</span>
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Community Stats */}
          <div className="bg-gradient-to-r from-gray-900/50 to-blue-900/50 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-black text-blue-400 mb-2">50K+</div>
                <div className="text-gray-400">Community Members</div>
              </div>
              <div>
                <div className="text-4xl font-black text-green-400 mb-2">24/7</div>
                <div className="text-gray-400">Active Support</div>
              </div>
              <div>
                <div className="text-4xl font-black text-purple-400 mb-2">1K+</div>
                <div className="text-gray-400">Daily Messages</div>
              </div>
              <div>
                <div className="text-4xl font-black text-yellow-400 mb-2">100+</div>
                <div className="text-gray-400">Weekly Events</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Section */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-6 py-3 backdrop-blur-xl mb-8">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-bold">SMART CONTRACT TRADING</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-8">
              TRADE & EARN
            </h2>
          </div>
          <TradingSection />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="relative bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-16 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48"></div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Rocket className="w-12 h-12 text-white animate-bounce" />
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8">
                READY TO WIN BIG?
              </h2>
              
              <p className="text-2xl text-yellow-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join the revolution of Web3 gaming. Connect your wallet and start your journey to incredible rewards!
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
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
                  className="group relative overflow-hidden bg-white text-gray-900 px-12 py-5 rounded-2xl font-black text-2xl hover:bg-gray-100 transition-all transform hover:scale-110 shadow-xl flex items-center space-x-4"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <Trophy className="w-8 h-8" />
                  <span>
                    {actuallySigningIn ? 'SIGNING IN...' : 
                     !wallet.isConnected ? 'CONNECT WALLET' :
                     isAuthenticated ? 'ENTER GAME' : 'SIGN IN TO CASINO'}
                  </span>
                  <ArrowRight className="w-8 h-8" />
                </button>
                
                <button className="group bg-white/20 backdrop-blur-xl text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/30 transition-all transform hover:scale-105 border border-white/30 flex items-center space-x-3">
                  <Play className="w-6 h-6 group-hover:animate-pulse" />
                  <span>WATCH DEMO</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/80 backdrop-blur-xl border-t border-white/10 py-16 connect-wallet-section">
        <div className="container mx-auto px-4">
          {/* Wallet Connection Section */}
          {!wallet.isConnected && (
            <div className="text-center mb-16 p-12 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl border border-yellow-500/30 backdrop-blur-xl">
              <h3 className="text-3xl font-bold text-white mb-6">Ready to Start Playing?</h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Connect your wallet to access the XXX Gaming Hub and start winning big!</p>
              <div className="flex justify-center">
                <ConnectButton />
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">XXX Gaming</h3>
                  <p className="text-gray-400 text-sm">Web3 Revolution</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                The most revolutionary blockchain casino with provably fair games, instant payouts, and exclusive rewards.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Twitter className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <MessageCircle className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Youtube className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#features" className="text-gray-400 hover:text-yellow-400 transition-colors">Features</a></li>
                <li><a href="#games" className="text-gray-400 hover:text-yellow-400 transition-colors">Games</a></li>
                <li><a href="#rewards" className="text-gray-400 hover:text-yellow-400 transition-colors">Rewards</a></li>
                <li><a href="#community" className="text-gray-400 hover:text-yellow-400 transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Whitepaper</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Resources</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Smart Contracts</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Token Economics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Audit Reports</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-yellow-400" />
                  <a href="mailto:support@xxxgaming.com" className="text-gray-400 hover:text-yellow-400 transition-colors">support@xxxgaming.com</a>
                </li>
                <li className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-yellow-400" />
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Discord Support</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Twitter className="w-5 h-5 text-yellow-400" />
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">@XXXGaming</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 XXX Gaming Hub. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Built on Binance Smart Chain • Powered by Web3
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">Responsible Gaming</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/50 hover:scale-110 transition-all"
      >
        <ArrowUp className="w-6 h-6 text-black" />
      </button>
    </div>
  );
};

export default LandingPage;