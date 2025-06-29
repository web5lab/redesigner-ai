import React from 'react';
import { Star } from 'lucide-react';

const PrizesSection = () => {
  const prizes = [
    { name: "Jackpot", amount: "10,000 XXX", rarity: "Ultra Rare", color: "from-yellow-400 to-orange-500" },
    { name: "Rare NFT", amount: "Exclusive", rarity: "Rare", color: "from-purple-400 to-pink-500" },
    { name: "Bonus Tokens", amount: "5,000 XXX", rarity: "Common", color: "from-blue-400 to-cyan-500" },
    { name: "Multiplier", amount: "2x Boost", rarity: "Uncommon", color: "from-green-400 to-emerald-500" }
  ];

  return (
    <section id="prizes" className="relative z-10 py-20 bg-gradient-to-br from-yellow-100/50 to-amber-100/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600 mb-4">
            Amazing Prizes Await
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every spin could be your lucky moment. Check out what you can win!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${prize.color} rounded-2xl p-6 text-white shadow-2xl transform hover:scale-105 transition-all animate-slide-up overflow-hidden`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
                    {prize.rarity}
                  </span>
                  <Star className="w-5 h-5 animate-pulse" />
                </div>
                <h3 className="text-2xl font-black mb-2">{prize.name}</h3>
                <p className="text-lg font-semibold opacity-90">{prize.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;