import { CreditCard, Package, Zap, CheckCircle, Brain, MessageSquare, Database, Cpu, Crown, Star, TrendingUp, Shield, Gift, Sparkles, ArrowRight, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { UpgradeModal } from '../components/UpgradeModal';
import { AddOnModal } from '../components/AddOnModal';

const addOns = [
  {
    id: 'api-calls',
    name: 'API Calls',
    description: 'Additional API calls for your applications',
    price: '$10',
    quantity: 1000,
    icon: <Cpu className="w-8 h-8 text-blue-500" />,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'storage',
    name: 'Storage',
    description: 'Extra storage space for your data',
    price: '$5',
    quantity: 1,
    icon: <Database className="w-8 h-8 text-green-500" />,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'training-sessions',
    name: 'Training Sessions',
    description: 'Additional AI training sessions',
    price: '$15',
    quantity: 5,
    icon: <MessageSquare className="w-8 h-8 text-purple-500" />,
    gradient: 'from-purple-500 to-pink-500'
  }
];

const plans = [
  {
    name: 'Free',
    price: '$0',
    originalPrice: '',
    period: '/month',
    description: 'Explore the basics of Redesignr.ai',
    features: [
      '50 messages/month',
      '3 Training sessions',
      'Community access',
    ],
    current: false,
    popular: false,
    gradient: 'from-gray-400 to-gray-600'
  },
  {
    name: 'Starter',
    price: '$29.99',
    originalPrice: '$39',
    period: '/month',
    description: 'Perfect for individuals and small teams',
    features: [
      '2,000 AI Credits',
      '10 Training sessions',
      'Basic support',
    ],
    current: false,
    popular: false,
    gradient: 'from-blue-500 to-cyan-500',
    badge: null
  },
  {
    name: 'Professional',
    price: '$99',
    originalPrice: '$129',
    period: '/month',
    description: 'Ideal for growing businesses',
    features: [
      '10,000 API calls/month',
      'Unlimited training sessions',
      'Priority support',
    ],
    current: true,
    popular: true,
    gradient: 'from-purple-500 to-pink-500',
    badge: 'Most Popular'
  }
];

const usageStats = [
  {
    label: 'API Calls',
    current: 4521,
    total: 50000,
    icon: Zap,
    gradient: 'from-blue-500 to-cyan-500',
    unit: 'calls'
  },
  {
    label: 'Storage Used',
    current: 2.1,
    total: 50,
    icon: Package,
    gradient: 'from-green-500 to-emerald-500',
    unit: 'GB'
  },
  {
    label: 'Training Sessions',
    current: 12,
    total: 999,
    icon: Brain,
    gradient: 'from-purple-500 to-pink-500',
    unit: 'sessions'
  }
];

export function Billing() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedAddOn, setSelectedAddOn] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none -z-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto p-6 space-y-8 z-10">
        {selectedPlan && (
          <UpgradeModal
            plan={selectedPlan}
            onClose={() => setSelectedPlan(null)}
          />
        )}
        {selectedAddOn && (
          <AddOnModal
            addOn={selectedAddOn}
            onClose={() => setSelectedAddOn(null)}
          />
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Billing & Subscription
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your subscription, view usage, and upgrade your plan
          </p>
        </div>

        {/* Current Plan Overview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Current Plan</h2>
                <p className="text-gray-600">Professional Plan - Active</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">$99<span className="text-lg text-gray-500">/month</span></div>
              <p className="text-sm text-green-600 font-medium">Next billing: Dec 15, 2024</p>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {usageStats.map((stat, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      {stat.current.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      of {stat.total === 999 ? '∞' : stat.total.toLocaleString()} {stat.unit}
                    </span>
                  </div>
                  
                  {stat.total !== 999 && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${stat.gradient}`}
                        style={{ width: `${Math.min((stat.current / stat.total) * 100, 100)}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-white/50 shadow-lg">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-xl font-medium transition-all relative ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl border-2 p-8 transition-all duration-300 hover:scale-105 ${
                plan.current
                  ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl'
                  : plan.popular
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl'
                    : 'border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg hover:border-gray-300'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${
                  plan.popular ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 
                  plan.current ? 'bg-gradient-to-r from-purple-500 to-pink-600' :
                  'bg-gradient-to-r from-orange-500 to-red-600'
                }`}>
                  {plan.badge}
                </div>
              )}

              {/* Current Plan Indicator */}
              {plan.current && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Crown className="w-4 h-4" />
                    Current
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-4">
                  {plan.originalPrice && (
                    <div className="text-lg text-gray-500 line-through mb-1">
                      {plan.originalPrice}{plan.period}
                    </div>
                  )}
                  <div className="text-4xl font-bold text-gray-900">
                    {plan.price}
                    <span className="text-lg text-gray-500 font-normal">{plan.period}</span>
                  </div>
                  {billingCycle === 'yearly' && plan.price !== 'Custom' && (
                    <div className="text-sm text-green-600 font-medium mt-1">
                      Save ${(parseInt(plan.originalPrice?.replace('$', '') || plan.price.replace('$', '')) * 12 * 0.2).toFixed(0)} per year
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-gray-700">
                    <div className={`p-1 rounded-full bg-gradient-to-r ${plan.gradient || 'from-green-500 to-emerald-500'}`}>
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  plan.current
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg hover:shadow-xl'
                    : plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                }`}
                onClick={() => !plan.current && setSelectedPlan(plan)}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : plan.price === 'Custom' ? 'Contact Sales' : 'Upgrade Now'}
              </button>
            </div>
          ))}
        </div>

        

        {/* Billing History */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Billing History</h2>
                <p className="text-gray-600">View your past invoices and payments</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg">
              <ArrowRight className="w-4 h-4" />
              View All
            </button>
          </div>

          <div className="space-y-4">
            {[
              { date: 'Nov 15, 2024', amount: '$99.00', status: 'Paid', invoice: 'INV-001' },
              { date: 'Oct 15, 2024', amount: '$99.00', status: 'Paid', invoice: 'INV-002' },
              { date: 'Sep 15, 2024', amount: '$99.00', status: 'Paid', invoice: 'INV-003' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{item.invoice}</div>
                    <div className="text-sm text-gray-600">{item.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{item.amount}</div>
                  <div className="text-sm text-green-600 font-medium">{item.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Trust */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Secure & Trusted</h3>
                <p className="text-blue-100">Your payments are protected with enterprise-grade security</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">256-bit</div>
                <div className="text-sm text-blue-200">SSL Encryption</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">PCI DSS</div>
                <div className="text-sm text-blue-200">Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm text-blue-200">Uptime SLA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}