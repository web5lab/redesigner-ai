import React from 'react';
import { ArrowLeft } from 'lucide-react';



const Header= ({ 
  onBackToHome,
  title = "Game Dashboard",
  subtitle = "Welcome back to XXX Gaming Hub"
}) => {
  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-yellow-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>

          
        </div>
      </div>
    </header>
  );
};

export default Header;