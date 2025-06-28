import React, { useState } from 'react';
import { Wallet, Shield, Smartphone, Link } from 'lucide-react';



const WalletConnection= ({ onConnect }) => {
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
    
    // Simulate connection process
    setTimeout(() => {
      const wallet = {
        address: '0x742d35Cc6634C0532925a3b8D96698b0C03C4532',
        provider: providerId ,
        network: 'BSC',
      };
      
      onConnect(wallet);
      setIsConnecting(null);
    }, 2000);
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
        </div>
      </div>
    </div>
  );
};

export default WalletConnection;