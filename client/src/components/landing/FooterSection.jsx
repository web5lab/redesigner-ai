import React from 'react';
import { useAccount } from 'wagmi';
import { Trophy } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const FooterSection = () => {
  const wallet = useAccount();

  return (
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
  );
};

export default FooterSection;