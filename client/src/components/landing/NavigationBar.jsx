import React from 'react';
import { Trophy } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const NavigationBar = () => {
  return (
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
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;