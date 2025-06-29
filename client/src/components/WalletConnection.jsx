import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { connectWallet } from '../store/authSlice';
import { useSignMessage } from '../hooks/useSignMessage';
import { Wallet, Shield, Smartphone, Link } from 'lucide-react';



const WalletConnection = ({ onConnect, showSignInButton = false, onSignIn }) => {
  const dispatch = useDispatch();
  const [isConnecting, setIsConnecting] = useState(null);
  const { signAuthMessage, isPending: isSigningPending } = useSignMessage();

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
      // Connect to wallet
      const walletInfo = { connected: true, address: '0x...', network: 'BSC' }; // This would come from wagmi
      
      if (walletInfo.connected) {
        // Call onConnect callback
        onConnect({
          address: walletInfo.address,
          provider: providerId,
          network: walletInfo.network,
        });
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
                    <div className={`w-12 h-12 bg-gradient-to-br ${provider.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
                      <p className="text-sm text-gray-600">{provider.description}</p>
                    </div>
                    {isLoading && (
                      <div className="w-6 h-6 border-2 border-yellow-300 border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-yellow-800">Secure Connection</h4>
                <p className="text-xs text-yellow-700 mt-1">
                  Your wallet connection is encrypted and secure. We never store your private keys.
                </p>
              </div>
            </div>
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