import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Rocket, Trophy, ArrowRight } from 'lucide-react';

const CTASection = ({ 
  isAuthenticated, 
  actuallySigningIn, 
  handleSignInToCasino 
}) => {
  const navigate = useNavigate();
  const wallet = useAccount();

  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-10 h-10 text-white animate-bounce" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Ready to Win Big?
            </h2>
            
            <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
              Join the revolution of Web3 gaming. Connect your wallet and start spinning for incredible rewards!
            </p>
            
            <button
              onClick={() => {
                if (!wallet.isConnected) {
                  // Scroll to connect wallet section or show connect button
                  document.querySelector('.connect-wallet-section')?.scrollIntoView({ behavior: 'smooth' });
                } else if (isAuthenticated) {
                  navigate('/game');
                } else {
                  handleSignInToCasino();
                }
              }}
              disabled={actuallySigningIn}
              className="bg-white text-gray-900 px-10 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all transform hover:scale-110 shadow-xl flex items-center space-x-3 mx-auto"
            >
              <Trophy className="w-6 h-6" />
              <span>
                {actuallySigningIn ? 'Signing In...' : 
                 !wallet.isConnected ? 'Connect Wallet' :
                 isAuthenticated ? 'Enter Game' : 'Sign In to Casino'}
              </span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;