import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from 'wagmi';
import { connectWallet, setAuthenticatedFromToken, getUserProfile } from '../store/authSlice';
import { createReferral } from '../store/referralSlice';
import { web3Service } from '../utils/web3Utils';
import axiosInstance from '../api/axiosInstance';
import { 
  Trophy, 
  Users, 
  Gift, 
  Star, 
  Crown,
  ArrowRight,
  Play,
  Sparkles,
  Zap,
  CheckCircle
} from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import toast from 'react-hot-toast';

const ReferralLanding = () => {
  const { referralCode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wallet = useAccount();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  
  const [referralProcessed, setReferralProcessed] = useState(false);
  const [referralError, setReferralError] = useState(null);
  const [isProcessingReferral, setIsProcessingReferral] = useState(false);

  // Handle wallet authentication with referral
  const handleWalletAuth = async () => {
    if (!wallet.isConnected || !wallet.address) {
      return;
    }

    // Check if user is already authenticated
    if (isAuthenticated) {
      // If authenticated but referral not processed, process it
      if (referralCode && !referralProcessed && !isProcessingReferral) {
        await processReferral();
      }
      return;
    }

    try {
      // Check if we need to sign a message
      const authData = await web3Service.signAuthMessage(wallet.address);
      
      // If authData is null, it means we already have a valid token
      if (authData === null) {
        // Try to get user profile with existing token
        try {
          await dispatch(getUserProfile()).unwrap();
        } catch (error) {
          console.error('Failed to get profile with existing token:', error);
          // Clear invalid token and retry
          localStorage.removeItem('token');
          delete axiosInstance.defaults.headers.common['Authorization'];
          // Retry authentication
          const newAuthData = await web3Service.signAuthMessage(wallet.address);
          if (newAuthData) {
            await dispatch(connectWallet({
              walletAddress: wallet.address,
              signature: newAuthData.signature,
              message: newAuthData.message,
              timestamp: newAuthData.timestamp,
              walletProvider: 'metamask',
              network: 'BSC'
            })).unwrap();
          }
        }
      } else {
        // Dispatch login with signature
        await dispatch(connectWallet({
          walletAddress: wallet.address,
          signature: authData.signature,
          message: authData.message,
          timestamp: authData.timestamp,
          walletProvider: 'metamask',
          network: 'BSC'
        })).unwrap();
      }

    } catch (error) {
      console.error('Authentication failed:', error);
      toast.error('Failed to connect wallet');
    }
  };

  // Separate function to process referral
  const processReferral = async () => {
    if (!referralCode || referralProcessed || isProcessingReferral || !wallet.address) {
      return;
    }

    setIsProcessingReferral(true);
    
    try {
      await dispatch(createReferral({
        referralCode: referralCode.toUpperCase(),
        referredWalletAddress: wallet.address
      })).unwrap();
      
      setReferralProcessed(true);
      toast.success('🎉 Referral bonus activated! You and your friend will receive rewards!');
    } catch (error) {
      console.error('Referral processing error:', error);
      setReferralError(error);
      // Don't show error toast for already existing referrals
      if (!error.includes('already exists')) {
        toast.error(error || 'Failed to process referral');
      }
    } finally {
      setIsProcessingReferral(false);
    }
  };
  // Auto-authenticate when wallet is connected
  useEffect(() => {
    // Check if we have a token and set authenticated state
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      dispatch(setAuthenticatedFromToken());
      return;
    }

    if (wallet.isConnected && wallet.address && !isAuthenticated && !loading) {
      handleWalletAuth();
    }
  }, [wallet.isConnected, wallet.address, isAuthenticated, loading, dispatch]);

  // Process referral when authenticated
  useEffect(() => {
    if (isAuthenticated && wallet.address && referralCode && !referralProcessed && !isProcessingReferral) {
      processReferral();
    }
  }, [isAuthenticated, wallet.address, referralCode, referralProcessed, isProcessingReferral]);

  // Navigate to game when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Small delay to show success message
      setTimeout(() => {
        navigate('/game');
      }, 2000);
    }
  }, [isAuthenticated, navigate]);

  const benefits = [
    {
      icon: Gift,
      title: "Welcome Bonus",
      description: "Get 100 XXX tokens + 3 free spins when you join",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Users,
      title: "Friend Bonus",
      description: "Your friend gets 200 XXX tokens + 5 free spins",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Crown,
      title: "VIP Access",
      description: "Unlock exclusive games and higher rewards",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Zap,
      title: "Instant Rewards",
      description: "All bonuses are credited immediately",
      color: "from-yellow-400 to-amber-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-400/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-lg border-b border-yellow-200">
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
            
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                🎁 Referral Bonus Active
              </div>
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Referral Code Display */}
          <div className="mb-8 animate-bounce-in">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl px-8 py-4 border-2 border-purple-400/30 shadow-2xl">
              <Users className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-purple-600 font-bold text-sm">REFERRAL CODE</p>
                <p className="text-2xl font-black text-purple-800">{referralCode}</p>
              </div>
              <Gift className="w-8 h-8 text-purple-600 animate-pulse" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 mb-6 animate-slide-up">
            YOU'RE INVITED!
          </h1>
          
          <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Join XXX Gaming Hub & Get Exclusive Bonuses
          </p>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            Your friend has invited you to the most exciting Web3 gaming platform! 
            Connect your wallet now to claim your welcome bonus and start winning!
          </p>

          {/* Status Messages */}
          {referralProcessed && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl animate-slide-up">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-green-800 font-semibold">Referral bonus activated! Redirecting to game...</span>
              </div>
            </div>
          )}

          {referralError && !referralError.includes('already exists') && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl animate-slide-up">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-red-800 font-semibold">⚠️ {referralError}</span>
              </div>
            </div>
          )}

          {/* Connect Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            {!isAuthenticated ? (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Connect your wallet to claim your bonus</p>
                <div className="flex justify-center">
                  <ConnectButton />
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('/game')}
                className="group bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-xl hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-110 shadow-2xl shadow-yellow-500/50 flex items-center space-x-3"
              >
                <Play className="w-6 h-6 group-hover:animate-pulse" />
                <span>Enter Game Platform</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-20 bg-white/50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600 mb-4">
              Your Exclusive Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              As a referred user, you get special bonuses that regular users don't receive!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-yellow-200 hover:shadow-2xl transition-all transform hover:scale-105 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started is simple and takes less than 2 minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <span className="text-3xl font-black text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Connect Wallet</h3>
              <p className="text-gray-600">Connect your MetaMask or other Web3 wallet to get started</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <span className="text-3xl font-black text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Claim Bonus</h3>
              <p className="text-gray-600">Your referral bonus is automatically credited to your account</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <span className="text-3xl font-black text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Playing</h3>
              <p className="text-gray-600">Use your bonus tokens and free spins to win amazing rewards</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Ready to Win Big?
              </h2>
              
              <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
                Don't miss out on this exclusive opportunity! Your friend is waiting for you to join.
              </p>
              
              {!isAuthenticated ? (
                <div className="flex justify-center">
                  <ConnectButton />
                </div>
              ) : (
                <button
                  onClick={() => navigate('/game')}
                  className="bg-white text-gray-900 px-10 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all transform hover:scale-110 shadow-xl flex items-center space-x-3 mx-auto"
                >
                  <Trophy className="w-6 h-6" />
                  <span>Enter Game Now</span>
                  <ArrowRight className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
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
                Referral Code: {referralCode}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReferralLanding;