import React from 'react';
import { Trophy, Shield, Zap, Coins } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Trophy,
      title: "Premium Rewards",
      description: "Win exclusive NFTs, bonus tokens, and rare collectibles",
      color: "from-yellow-400 to-amber-500"
    },
    {
      icon: Shield,
      title: "Secure & Fair",
      description: "Blockchain-verified spins with transparent smart contracts",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Instant Payouts",
      description: "Automatic token distribution directly to your wallet",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Coins,
      title: "Multiple Tokens",
      description: "Support for various cryptocurrencies and custom tokens",
      color: "from-green-400 to-emerald-500"
    }
  ];

  return (
    <section id="features" className="relative z-10 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600 mb-4">
            Why Choose XXX Gaming Hub?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of gaming with our cutting-edge Web3 platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-yellow-200 hover:shadow-2xl transition-all transform hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;