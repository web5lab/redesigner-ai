import React from 'react';
import { Bot, Upload, Settings, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Create Your Bot',
    description: 'Set up your AI assistant in under 60 seconds. Just enter your website URL and we\'ll scan your content automatically.',
    icon: Bot,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    number: '02',
    title: 'Train & Customize',
    description: 'Upload documents, add FAQs, and customize the appearance to match your brand perfectly.',
    icon: Upload,
    color: 'bg-green-100 text-green-600'
  },
  {
    number: '03',
    title: 'Configure Settings',
    description: 'Set up human handoff rules, team permissions, and notification preferences for optimal workflow.',
    icon: Settings,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    number: '04',
    title: 'Go Live',
    description: 'Deploy your bot with a single line of code. Start helping customers immediately with 24/7 support.',
    icon: Rocket,
    color: 'bg-orange-100 text-orange-600'
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your AI-powered customer support up and running in minutes, not hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className={`w-16 h-16 ${step.color} rounded-lg flex items-center justify-center mx-auto mb-6`}>
                  <step.icon className="w-8 h-8" />
                </div>
                
                <div className="text-sm font-bold text-gray-400 mb-2">{step.number}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>

              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 text-gray-300">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-all">
            Start building your bot
          </button>
        </div>
      </div>
    </section>
  );
}