import React, { useState } from 'react';
import { Check, X, Plus, Minus, Star, Zap, Crown, Rocket } from 'lucide-react';

const PricingPlan = ({ name, price, description, features, isPopular, icon: Icon, gradient }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative flex flex-col h-full group transition-all duration-500 transform hover:scale-105 ${
        isPopular 
          ? 'bg-gradient-to-br from-purple-900/50 via-slate-800/90 to-indigo-900/50 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20' 
          : 'bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 border border-slate-700/30 hover:border-purple-400/30'
      } rounded-xl overflow-hidden backdrop-blur-sm`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${gradient}`}></div>
      
      {/* Popular badge with animation */}
      {isPopular && (
        <div className="absolute -top-1 -right-1 z-10">
          <div className="relative">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-bl-xl rounded-tr-xl shadow-lg animate-pulse">
              ⭐ MOST POPULAR
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-bl-xl rounded-tr-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          </div>
        </div>
      )}

      {/* Floating particles for popular plan */}
      {isPopular && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-4 left-4 w-1 h-1 bg-purple-400/60 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-indigo-400/60 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-12 left-6 w-1 h-1 bg-pink-400/60 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>
      )}

      <div className="p-6 border-b border-slate-700/30 relative z-10">
        {/* Icon and name */}
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2 rounded-lg ${isPopular ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20' : 'bg-slate-700/50'} transition-all duration-300 group-hover:scale-110`}>
            <Icon className={`h-5 w-5 ${isPopular ? 'text-purple-400' : 'text-slate-400'} group-hover:text-white transition-colors duration-300`} />
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors duration-300">{name}</h3>
        </div>
        
        <p className="text-slate-400 mb-4 group-hover:text-slate-300 transition-colors duration-300">{description}</p>
        
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className={`text-4xl font-bold transition-all duration-300 ${
              isPopular 
                ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400' 
                : 'text-white group-hover:text-purple-200'
            }`}>
              {price}
            </span>
            {price !== 'Custom' && price !== 'free' && (
              <span className="text-slate-400 ml-1 group-hover:text-slate-300 transition-colors duration-300">/month</span>
            )}
          </div>
          {price === 'free' && (
            <div className="text-emerald-400 text-sm font-medium mt-1 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Forever free
            </div>
          )}
        </div>

        <button className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden group/btn ${
          isPopular
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-purple-500/25 hover:shadow-purple-500/40'
            : 'bg-slate-700/80 text-white hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-700 hover:shadow-slate-500/25'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isPopular ? (
              <>
                <Rocket className="h-4 w-4" />
                Get Started
              </>
            ) : (
              'Choose Plan'
            )}
          </span>
        </button>
      </div>

      <div className="p-6 flex-grow relative z-10">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start group/item">
              <div className={`mr-3 mt-0.5 flex-shrink-0 transition-all duration-300 ${
                feature.included ? 'group-hover/item:scale-110' : ''
              }`}>
                {feature.included ? (
                  <div className="relative">
                    <Check className="h-5 w-5 text-emerald-400 group-hover/item:text-emerald-300 transition-colors duration-300" />
                    <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur group-hover/item:bg-emerald-400/30 transition-all duration-300"></div>
                  </div>
                ) : (
                  <X className="h-5 w-5 text-slate-600" />
                )}
              </div>
              <span className={`transition-colors duration-300 ${
                feature.included 
                  ? 'text-slate-300 group-hover/item:text-white' 
                  : 'text-slate-500'
              }`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hover glow effect */}
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
        isPopular 
          ? 'shadow-2xl shadow-purple-500/20' 
          : 'shadow-xl shadow-slate-400/10'
      }`}></div>
    </div>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "free",
      description: "Perfect for trying out our platform",
      features: [
        { text: "15 AI credits", included: true },
        { text: "Export HTML code", included: false },
        { text: "1600+ templates", included: false },
      ],
      isPopular: false,
      productId: "",
      icon: Zap,
      gradient: "bg-gradient-to-br from-emerald-500/20 to-green-500/20"
    },
    {
      name: "Professional",
      price: "$19.99",
      description: "For growing businesses and creators",
      features: [
        { text: "100 AI credits", included: true },
        { text: "Export HTML code", included: true },
        { text: "1600+ templates", included: true },
      ],
      isPopular: false,
      productId: "pdt_nc4U0FwEgLcBMJ1qTqKGL",
      icon: Star,
      gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
    },
    {
      name: "Developer",
      price: "$49.99",
      description: "For technical users who want full control",
      features: [
        { text: "250 AI credits", included: true },
        { text: "Export HTML code", included: true },
        { text: "1600+ templates", included: true },
      ],
      isPopular: true,
      productId: "pdt_1xPNCsEnCy3zS6hbaP4WY",
      icon: Crown,
      gradient: "bg-gradient-to-br from-purple-500/20 to-indigo-500/20"
    },
    {
      name: "Business",
      price: "$99.99",
      description: "For agencies and teams with high volume needs",
      features: [
        { text: "550 AI credits", included: true },
        { text: "Export HTML code", included: true },
        { text: "1600+ templates", included: true },
        { text: "Priority support", included: true },
      ],
      isPopular: false,
      productId: "pdt_U7VV5fU4SaAh47BhHuANz",
      icon: Rocket,
      gradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20"
    }
  ];

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      {/* Dynamic background matching hero section */}
      
      {/* Animated background blobs */}
      <div className="absolute top-1/4 right-1/6 w-96 h-96 bg-purple-600/15 rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/6 w-96 h-96 bg-indigo-600/15 rounded-full filter blur-3xl opacity-40 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/10 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-indigo-400/50 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-400/45 rounded-full animate-bounce" style={{animationDelay: '5s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-300/40 rounded-full animate-bounce" style={{animationDelay: '7s'}}></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-pink-400/35 rounded-full animate-bounce" style={{animationDelay: '9s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section with enhanced styling */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          {/* Badge */}
          <div className="inline-block px-4 py-1.5 mb-6 bg-slate-800/80 rounded-full backdrop-blur-sm border border-slate-700 shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
            <span className="text-purple-400 text-sm font-medium">
              💎 Choose Your Perfect Plan
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Simple,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 animate-pulse">
              Transparent
            </span>{' '}
            Pricing
          </h2>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Start free and scale as you grow.{' '}
            <span className="text-emerald-400 font-medium">
              No credit card required
            </span>{' '}
            for the free plan. Upgrade anytime to unlock more{' '}
            <span className="text-purple-400 font-medium">
              AI-powered features
            </span>
            .
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, index) => (
            <PricingPlan
              key={index}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              icon={plan.icon}
              gradient={plan.gradient}
            />
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Pricing;