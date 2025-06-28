import React, { useState } from 'react';
import { Check, Shield, X, Plus, Minus, Star } from 'lucide-react';
import { useSelector } from 'react-redux';
import { UserSelector } from '../store/global.Selctor';

const PricingPlan = ({ name, price, description, features, isPopular, productId, currentPlan, planValidity, onUpgrade }) => {
  // Determine plan status
  const isCurrentPlan = currentPlan === name.toLowerCase();
  const planRanking = { "Free": 1, "professional": 2, "developer": 3 , 'business':4 };
  const currentRank = planRanking[currentPlan?.toLowerCase()] || 0;
  const thisRank = planRanking[name.toLowerCase()] || 0;
  const canUpgrade = thisRank > currentRank;
  
  return (
    <div className={`relative flex flex-col h-full ${
      isCurrentPlan ? 'bg-gradient-to-b from-green-800/40 to-green-900/40 border-2 border-green-500' :
      isPopular ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-indigo-500' :
      'bg-slate-800/50 border border-slate-700/50'
    } rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-105`}>
      {isPopular && !isCurrentPlan && (
        <div className="absolute top-0 right-0">
          <div className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            MOST POPULAR
          </div>
        </div>
      )}
      
      {isCurrentPlan && (
        <div className="absolute top-0 right-0">
          <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center">
            <Star className="w-3 h-3 mr-1" /> CURRENT PLAN
          </div>
        </div>
      )}

      <div className="p-6 border-b border-slate-700/50">
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-slate-400 mb-4">{description}</p>
        <div className="mb-4">
          <span className="text-4xl font-bold text-white">{price}</span>
          {price !== 'Custom' && price !== 'Free' && <span className="text-slate-400 ml-1">/month</span>}
        </div>
        
        {isCurrentPlan && (
          <div className="bg-green-900/30 rounded-lg p-3 mb-4 border border-green-700/50">
            <p className="text-green-300 text-sm font-medium">
              Valid until: {new Date(planValidity).toLocaleDateString()}
            </p>
          </div>
        )}
        
        {!isCurrentPlan ? (
          <button
            onClick={() => onUpgrade(name.toLowerCase())}
            disabled={!canUpgrade}
            className={`block w-full text-center py-2 px-4 rounded-lg font-medium transition-colors ${
              canUpgrade ? 
                (isPopular ? 
                  'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600' : 
                  'bg-slate-700 text-white hover:bg-slate-600'
                ) : 
                'bg-slate-700/50 text-slate-500 cursor-not-allowed'
            }`}
          >
            {canUpgrade ? 'Upgrade Plan' : 'Not Available'}
          </button>
        ) : (
          <button
            disabled={true}
            className="block w-full text-center py-2 px-4 rounded-lg font-medium bg-green-700/30 text-green-300 cursor-default"
          >
            Current Plan
          </button>
        )}
      </div>

      <div className="p-6 flex-grow">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              ) : (
                <X className="h-5 w-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" />
              )}
              <span className={feature.included ? 'text-slate-300' : 'text-slate-500'}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const BillingPlans = ({ isOpen, onClose }) => {
  const user = useSelector(UserSelector);
  const currentPlan = user.currentPlan || 'starter'; // Default to starter if no plan is set
  const planValidity = user.planValidity || new Date().toISOString(); // Default to current date if no validity
  
  const handleUpgrade = (planName) => {
    // Redirect to checkout for the selected plan
    const plan = plans.find(p => p.name.toLowerCase() === planName);
    if (plan && plan.productId) {
      window.open(
        `${import.meta.env.VITE_PAYMENT_URL}/${plan.productId}?quantity=1&redirect_url=${import.meta.env.VITE_FRONTEND_URL}%2Fdashboard&metadata_userId=${user._id}`,
        '_blank'
      );
    }
  };
  const plans = [
    {
      name: "Free",
      price: "free",
      description: "For growing businesses",
      features: [
        { text: "15 AI credits", included: true },
        { text: "Export HTML code", included: false },
        { text: "1600 + templates", included: false },
      ],
      isPopular: false,
      productId: ""
    },
    {
      name: "Professional",
      price: "$19.99",
      description: "For growing businesses",
      features: [
        { text: "100 AI credits", included: true },
        { text: "Export HTML code", included: true },
        { text: "1600 + templates", included: true },
      ],
      isPopular: false,
      productId: "pdt_nc4U0FwEgLcBMJ1qTqKGL"
    },
    {
      name: "Developer",
      price: "$49.99",
      description: "For technical users who want full control",
      features: [
        { text: "250 AI credits", included: true },
        { text: "Export HTML code", included: true },
        { text: "1600 + templates", included: true },
      ],
      isPopular: true,
      productId: "pdt_1xPNCsEnCy3zS6hbaP4WY"
    },
    {
      name: "Business",
      price: "$99.99",
      description: "For agencies and teams with high volume needs",
      features: [
        { text: "550 AI credits", included: true },
        { text: "Export HTML code", included: true },
        { text: "1600 + templates", included: true },
        { text: "Priority support", included: true },
      ],
      isPopular: false,
      productId: "pdt_U7VV5fU4SaAh47BhHuANz"
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl max-w-7xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Billing & Plans</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>

          <div className="mb-6 bg-slate-900/50 p-4 rounded-lg border border-slate-700/30">
            <h3 className="text-lg font-bold text-white mb-2">Your Current Plan: <span className="text-green-400">{currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}</span></h3>
            <p className="text-slate-400">
              Valid until: {new Date(planValidity).toLocaleDateString()} • 
              {" "}You can only upgrade to higher tier plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <PricingPlan
                key={index}
                name={plan.name}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                isPopular={plan.isPopular}
                productId={plan.productId}
                currentPlan={currentPlan}
                planValidity={planValidity}
                onUpgrade={handleUpgrade}
              />
            ))}
          </div>

          <div className="mt-8 bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-500/20 rounded-lg">
                <Shield className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Secure Billing</h3>
                <p className="text-slate-400">
                  Your payment information is securely processed and never stored on our servers.
                  All transactions are protected by industry-standard encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPlans;