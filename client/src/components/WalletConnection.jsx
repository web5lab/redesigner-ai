import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { connectWallet } from '../store/authSlice';


const WalletConnection = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(null);

  const walletProviders = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: Wallet,
      description: 'Connect using browser extension',
      color: 'from-orange-400 to-orange-500',
    },
    {
      id: 'trustwallet',
      name: 'Trust Wallet',
      icon: Shield,
      description: 'Connect using Trust Wallet',
      color: 'from-blue-400 to-blue-500',
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: Link,
      description: 'Connect using WalletConnect',
      color: 'from-purple-400 to-purple-500',
    },
  ];

  const handleConnect = async (providerId) => {
    setIsConnecting(providerId);
    
    try {
      // This is just for UI feedback - actual connection is handled by RainbowKit
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onConnect) {
        onConnect(providerId);
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
      alert(error.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-bounce-in">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
            <Wallet className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Connect Your Wallet</h1>
          <p className="text-gray-600">Choose your preferred wallet to start playing</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-yellow-200">
          <div className="space-y-4">
            {walletProviders.map((provider, index) => {
              const Icon = provider.icon;
              const isLoading = isConnecting === provider.id;
              
              return (
                <button
                  key={provider.id}
                  onClick={() => handleConnect(provider.id)}
                  disabled={isConnecting !== null}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 animate-slide-up ${
                    isLoading
                      ? 'border-yellow-300 bg-yellow-50 scale-105'
                      : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 hover:scale-105'
                  } ${isConnecting && !isLoading ? 'opacity-50' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Make sure you're connected to BSC (Binance Smart Chain)</p>

          {showSignInButton && (
            <div className="mt-8 text-center">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Wallet Connected!</h3>
                <p className="text-green-700 mb-4">Sign a message to access the casino</p>
                <button
                  onClick={onSignIn}
                  disabled={isSigningPending}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-2 mx-auto"
                >
                  {isSigningPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Sign In to Casino</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletConnection;