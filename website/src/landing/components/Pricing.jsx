import { Check, Crown, Zap, Star, ArrowRight, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: 'Perfect for small websites and personal projects',
      features: [
        '50 messages/month',
        '3 Training sessions',
        'Community access',
      ],
      buttonText: 'Get Started Free',
      buttonStyle: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300',
      checkColor: 'text-gray-400',
      borderStyle: 'border-gray-200 hover:border-gray-300',
      hoverBg: 'hover:bg-gray-50',
      badge: null,
      popular: false
    },
    {
      name: 'Starter',
      monthlyPrice: 29,
      yearlyPrice: 25,
      description: 'Ideal for growing businesses and teams',
      features: [
        '2,000 AI Credits',
        '10 Training sessions',
        'Basic support',
      ],
      buttonText: 'Get Started',
      buttonStyle: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl',
      checkColor: 'text-blue-500',
      borderStyle: 'border-2 border-blue-500 shadow-xl',
      hoverBg: 'hover:bg-blue-50',
      badge: 'Most Popular',
      popular: true
    },
    {
      name: 'Professional',
      monthlyPrice: 119,
      yearlyPrice: 99,
      description: 'For large organizations with advanced needs',
      features: [
        '10,000 API calls/month',
        'Unlimited training sessions',
        'Priority support',
      ],
      buttonText: 'Get Started',
      buttonStyle: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl',
      checkColor: 'text-purple-500',
      borderStyle: 'border-purple-200 hover:border-purple-300',
      hoverBg: 'hover:bg-purple-50',
      badge: 'Enterprise',
      popular: false
    }
  ];

  const getPrice = (plan) => {
    if (plan.monthlyPrice === 0) return 'Free';
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  };

  const getPriceSuffix = (plan) => {
    if (plan.monthlyPrice === 0) return '';
    return '/month';
  };

  const getSavings = (plan) => {
    if (plan.monthlyPrice === 0) return 0;
    return ((plan.monthlyPrice - plan.yearlyPrice) / plan.monthlyPrice * 100).toFixed(0);
  };

  return (
    <section id="pricing" className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-6 py-3 rounded-full border border-green-200 shadow-lg mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Simple Pricing</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Choose Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Transparent pricing with no hidden fees. Start free and scale as you grow.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-white/50 shadow-lg">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${!isYearly
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all ${isYearly
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all duration-500 hover:scale-105 ${plan.popular
                  ? 'bg-gradient-to-br from-blue-50 to-indigo-50 transform scale-105'
                  : 'bg-white/80 backdrop-blur-sm hover:bg-white'
                } ${plan.borderStyle} shadow-xl hover:shadow-2xl overflow-hidden`}
            >
              {/* Background Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.popular ? 'from-blue-500/5 to-indigo-500/5' : 'from-gray-500/5 to-gray-500/5'
                } opacity-0 hover:opacity-100 transition-opacity duration-500`}></div>


              <div className="relative z-10">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <div className="mb-4">
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                      {typeof getPrice(plan) === 'number' ? '$' : ''}{getPrice(plan)}
                      <span className="text-lg text-gray-500 font-normal">{getPriceSuffix(plan)}</span>
                    </div>
                    {isYearly && plan.monthlyPrice > 0 && (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-gray-500 line-through">${plan.monthlyPrice}/month</span>
                        <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                          Save {getSavings(plan)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <div className={`p-1 rounded-full mr-3 ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-400'
                        }`}>
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`group w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${plan.buttonStyle}`}>
                  <div className="flex items-center justify-center gap-2">
                    <span>{plan.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-12 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Zap className="w-6 h-6" />
              <span className="text-lg font-semibold">Enterprise Solutions</span>
            </div>

            <h3 className="text-4xl font-bold mb-6">
              Need a Custom Solution?
            </h3>

            <p className="text-xl text-gray-300 mb-8">
              Get a tailored plan with dedicated support, custom integrations, and enterprise-grade security.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                <span>Schedule a Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300">
                <span>Contact Sales</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}