import React from 'react';
import { ArrowLeft, Wallet } from 'lucide-react';
import { useAccount } from 'wagmi';



const Header = ({ 
  onBackToHome,
  title = "Game Dashboard",
  subtitle = "Welcome back to XXX Gaming Hub",
  showWalletInfo = true
}) => {
  const wallet = useAccount();
  
  const formatAddress = (address) => `${address?.slice(0, 6)}...${address?.slice(-4)}`;

  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-yellow-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>

          {showWalletInfo && wallet.isConnected && (
            <div className="flex items-center space-x-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-lg border border-blue-200">
              <Wallet className="w-4 h-4" />
              <span className="text-sm font-medium">
                {formatAddress(wallet.address)}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;