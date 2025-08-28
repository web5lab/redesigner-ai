import { Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MinimalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-blue-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <Bot className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Web3 Trainer</span>
          </Link>
        </div>
      </div>
    </header>
  );
}