import React, { useState } from 'react';
import { Check, X, Plus, Minus, Star } from 'lucide-react';

const PricingPlan = ({ name, price, description, features, isPopular }) => {
  return (
    <div className={`relative flex flex-col h-full ${isPopular ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-indigo-500'
      : 'bg-slate-800/50 border border-slate-700/50'
      } rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-105`}>
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            MOST POPULAR
          </div>
        </div>
      )}

      <div className="p-6 border-b border-slate-700/50">
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-slate-400 mb-4">{description}</p>
        <div className="mb-4">
          <span className="text-4xl font-bold text-white">{price}</span>
          {price !== 'Custom' && <span className="text-slate-400 ml-1">/month</span>}
        </div>
        <a
          href="/dashboard"
          className={`block text-center py-2 px-4 rounded-lg font-medium transition-colors ${isPopular
            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600'
            : 'bg-slate-700 text-white hover:bg-slate-600'
            }`}
        >
          {isPopular ? 'Get Started' : 'Choose Plan'}
        </a>
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



const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "free",
      description: "For growing businesses",
      features: [
        { text: "15 AI credits", included: true },
        { text: "Export HTML code", included: false },
        { text: "1600 + templates", included: true },
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
  return (
    <section id="pricing" className="py-20 bg-slate-900 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Monthly Subscription Plans */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-300 text-lg">
            Start free and scale as you grow. No credit card required for the free plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, index) => (
            <PricingPlan
              key={index}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
            />
          ))}

          {/* <div className="col-span-1">
            <CustomCreditsCalculator />
          </div> */}
        </div>

        {/* Custom Enterprise Section */}
        <div className="max-w-3xl mx-auto mt-16 text-center bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4">Need a custom solution?</h3>
          <p className="text-slate-300 mb-6">
            We offer custom plans for agencies and enterprise clients with specific requirements.
            Contact our sales team to discuss your needs.
          </p>
          <a
            href="#"
            className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;