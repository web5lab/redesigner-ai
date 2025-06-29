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
  Trophy,
  Coins,
  Star,
  Crown,
  Gem,
  Zap,
  TrendingUp,
  Users,
  Target
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

        {/* Right Column - Modern Visual */}
        <div className="relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {/* Main Visual Container */}
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
            
            {/* Main Dashboard Card */}
            <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-8 shadow-2xl border border-yellow-200">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Gaming Dashboard</h3>
                    <p className="text-gray-600 text-sm">Live Statistics</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-xs text-blue-600 font-medium">+12%</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">50K+</div>
                  <div className="text-xs text-blue-700">Active Players</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <Coins className="w-5 h-5 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">+8%</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">$2.5M</div>
                  <div className="text-xs text-green-700">Rewards Paid</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <Gem className="w-5 h-5 text-purple-600" />
                    <span className="text-xs text-purple-600 font-medium">+15%</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900">15K+</div>
                  <div className="text-xs text-purple-700">NFTs Won</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <Target className="w-5 h-5 text-orange-600" />
                    <span className="text-xs text-orange-600 font-medium">+3%</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-900">68%</div>
                  <div className="text-xs text-orange-700">Win Rate</div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-gray-900">Performance</h4>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                
                {/* Simplified Chart Visualization */}
                <div className="flex items-end space-x-2 h-20">
                  {[40, 65, 45, 80, 55, 90, 70, 85].map((height, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-t from-yellow-400 to-orange-500 rounded-t-sm flex-1 animate-pulse"
                      style={{ 
                        height: `${height}%`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Start Playing</span>
                </button>
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