import React, { useState } from 'react';
import { Ticket, ShoppingCart, Zap, Star, Tag, AlertCircle } from 'lucide-react';



const TicketPurchase = ({ tokenBalance, onPurchase }) => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isPurchasing, setIsPurchasing] = useState(false);
  const pricingTiers = [
    {
      tickets: 1,
      pricePerTicket: 10,
      discount: 0,
    },
    {
      tickets: 10,
      pricePerTicket: 9.5,
      discount: 5,
    },
    {
      tickets: 50,
      pricePerTicket: 9,
      discount: 10,
    },
    {
      tickets: 100,
      pricePerTicket: 8.5,
      discount: 15,
      popular: true,
    },
    {
      tickets: 500,
      pricePerTicket: 8,
      discount: 20,
    },
    {
      tickets: 1000,
      pricePerTicket: 7.5,
      discount: 25,
    },
  ];

  const handlePurchase = async (tickets, totalCost) => {
    if (totalCost > tokenBalance) {
      alert('Insufficient balance!');
      return;
    }

    setIsPurchasing(true);
    
    // Simulate transaction
    setTimeout(() => {
      onPurchase(tickets);
      setIsPurchasing(false);
      setSelectedTier(null);
      setCustomAmount('');
      alert(`Successfully purchased ${tickets} tickets!`);
    }, 2000);
  };

  const handleCustomPurchase = () => {
    const amount = parseInt(customAmount);
    if (amount > 0) {
      const totalCost = amount * 10; // Regular price for custom amounts
      handlePurchase(amount, totalCost);
    }
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
          <Ticket className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Buy Spin Tickets</h1>
        <p className="text-gray-600 mb-4">Choose from our pricing tiers or buy custom amounts</p>
        
        <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-lg rounded-lg px-4 py-2 border border-yellow-200">
          <Zap className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-medium text-gray-700">
            Balance: {tokenBalance.toLocaleString()} XXX
          </span>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricingTiers.map((tier, index) => {
          const totalCost = tier.tickets * tier.pricePerTicket;
          const savings = tier.tickets * 10 - totalCost;
          
          return (
            <div
              key={index}
              className={`relative bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border transition-all transform hover:scale-105 ${
                tier.popular
                  ? 'border-yellow-300 ring-2 ring-yellow-200'
                  : 'border-yellow-200 hover:border-yellow-300'
              } ${selectedTier === index ? 'ring-2 ring-yellow-400 scale-105' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Ticket className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{tier.tickets}</h3>
                <p className="text-gray-600">Tickets</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Price per ticket</span>
                  <span className="font-semibold text-gray-900">{tier.pricePerTicket} XXX</span>
                </div>
                
                {tier.discount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Discount</span>
                    <span className="text-green-600 font-semibold flex items-center space-x-1">
                      <Tag className="w-3 h-3" />
                      <span>{tier.discount}% OFF</span>
                    </span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Total Cost</span>
                    <span className="text-xl font-bold text-gray-900">{totalCost} XXX</span>
                  </div>
                  
                  {savings > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      Save {savings} XXX tokens!
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => handlePurchase(tier.tickets, totalCost)}
                disabled={isPurchasing || totalCost > tokenBalance}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                  totalCost > tokenBalance
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : tier.popular
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white hover:from-yellow-500 hover:to-amber-600'
                    : 'bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-500 hover:to-purple-600'
                } ${isPurchasing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isPurchasing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : totalCost > tokenBalance ? (
                  'Insufficient Balance'
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Buy Now</span>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Custom Amount */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Amount</h3>
        <p className="text-gray-600 mb-6">
          Enter any number of tickets you want to purchase (regular price: 10 XXX per ticket)
        </p>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Tickets
            </label>
            <input
              type="number"
              id="custom-amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter amount..."
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>
          
          <div className="flex-shrink-0">
            <div className="text-sm text-gray-600 mb-2">Total Cost</div>
            <div className="text-xl font-bold text-gray-900">
              {customAmount ? (parseInt(customAmount) * 10).toLocaleString() : '0'} XXX
            </div>
          </div>
          
          <button
            onClick={handleCustomPurchase}
            disabled={!customAmount || parseInt(customAmount) <= 0 || isPurchasing || (parseInt(customAmount) * 10) > tokenBalance}
            className="flex-shrink-0 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-500 hover:to-emerald-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isPurchasing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Buy'
            )}
          </button>
        </div>
        
        {customAmount && (parseInt(customAmount) * 10) > tokenBalance && (
          <div className="mt-4 flex items-center space-x-2 text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Insufficient balance for this purchase</span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">1</div>
            <div>
              <p className="font-medium">Choose Tickets</p>
              <p className="text-gray-600">Select from pricing tiers or enter custom amount</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">2</div>
            <div>
              <p className="font-medium">Confirm Transaction</p>
              <p className="text-gray-600">Review and approve the transaction in your wallet</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">3</div>
            <div>
              <p className="font-medium">Start Spinning</p>
              <p className="text-gray-600">Use your tickets to spin and win amazing rewards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPurchase;