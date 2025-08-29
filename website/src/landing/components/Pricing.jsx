import { Check, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'For small teams getting started',
      features: [
        '100 conversations/month',
        '1 AI assistant',
        'Basic analytics',
        'Email support'
      ],
      buttonText: 'Get started',
      buttonStyle: 'bg-gray-900 hover:bg-gray-800 text-white'
    },
    {
      name: 'Pro',
      price: isYearly ? 29 : 39,
      description: 'For growing businesses',
      features: [
        '5,000 conversations/month',
        '5 AI assistants',
        'Advanced analytics',
        'Human handoff',
        'Mobile app access',
        'Priority support'
      ],
      buttonText: 'Start free trial',
      buttonStyle: 'bg-gray-900 hover:bg-gray-800 text-white',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Unlimited conversations',
        'Unlimited assistants',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantee',
        'Advanced security'
      ],
      buttonText: 'Contact sales',
      buttonStyle: 'border border-gray-300 hover:border-gray-400 text-gray-900'
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free and scale as you grow. No hidden fees or surprises.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="bg-white rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                !isYearly ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                isYearly ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-lg border p-8 ${
                plan.popular 
                  ? 'border-gray-900 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300'
              } transition-all`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                  </span>
                  {typeof plan.price === 'number' && plan.price > 0 && (
                    <span className="text-gray-600">/month</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need something custom?
            </h3>
            <p className="text-gray-600 mb-6">
              Get a tailored solution with dedicated support and custom integrations.
            </p>
            <button className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all">
              Contact sales
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};