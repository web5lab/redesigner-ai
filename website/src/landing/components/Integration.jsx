import React from 'react';
import { Puzzle, Code, Smartphone, Globe, ArrowRight, CheckCircle } from 'lucide-react';

const platforms = [
  { name: 'WordPress', users: '40M+', logo: '📝' },
  { name: 'Shopify', users: '2M+', logo: '🛍️' },
  { name: 'React', users: '15M+', logo: '⚛️' },
  { name: 'Webflow', users: '3M+', logo: '🌊' },
  { name: 'Squarespace', users: '4M+', logo: '⬜' },
  { name: 'HTML/JS', users: 'Universal', logo: '🌐' }
];

const apiFeatures = [
  'RESTful API with full documentation',
  'Webhook support for real-time events',
  'SDKs for popular programming languages',
  'Rate limiting and authentication',
  'Comprehensive error handling',
  'Real-time chat via WebSockets'
];

export function Integration() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Integrate with your existing tools
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect CustomerBot with your favorite platforms and tools. Works everywhere your customers are.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Platform Integrations */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-6">
              <Puzzle className="w-4 h-4" />
              Platform Integrations
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Works with your favorite platforms
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {platforms.map((platform, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <span className="text-2xl">{platform.logo}</span>
                  <div>
                    <div className="font-semibold text-gray-900">{platform.name}</div>
                    <div className="text-sm text-gray-600">{platform.users} sites</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors">
              View all integrations
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* API & Mobile */}
          <div className="space-y-12">
            {/* API Section */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-4">
                <Code className="w-4 h-4" />
                Developer API
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Powerful API for custom integrations
              </h3>
              
              <div className="space-y-3">
                {apiFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile App Section */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-4">
                <Smartphone className="w-4 h-4" />
                Mobile App
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Native mobile apps
              </h3>
              
              <p className="text-gray-600 mb-6">
                Download our mobile app for iOS and Android. Manage support tickets, respond to customers, and collaborate with your team from anywhere.
              </p>

              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  <span>📱</span>
                  App Store
                </button>
                <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  <span>🤖</span>
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}