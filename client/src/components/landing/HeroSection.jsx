import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { 
  ArrowRight,
  Play,
  Gift,
  Shield,
  ChevronDown,
  Sparkles,
  RotateCcw,
  Trophy,
  Coins,
  Star,
  Crown,
  Gem,
  Zap
} from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const HeroSection = ({ 
  isAuthenticated, 
  actuallySigningIn, 
  error, 
  showReferralNotification, 
  referralCode, 
  handleSignInToCasino 
}) => {
  const navigate = useNavigate();
  const wallet = useAccount();

  return (
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
  );
};

export default HeroSection;