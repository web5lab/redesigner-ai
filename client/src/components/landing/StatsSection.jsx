import React from 'react';
import { Users, Coins, Gem, Target } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { label: "Total Players", value: "50K+", icon: Users },
    { label: "Tokens Distributed", value: "$2.5M", icon: Coins },
    { label: "NFTs Awarded", value: "15K+", icon: Gem },
    { label: "Win Rate", value: "68%", icon: Target }
  ];

  return (
    <section id="stats" className="relative z-10 py-20 bg-white/50 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-black text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;