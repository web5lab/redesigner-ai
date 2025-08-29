import React from 'react';
import { Users, MessageSquare, Clock, Globe, TrendingUp, Zap } from 'lucide-react';

const stats = [
  {
    number: '50K+',
    label: 'Support Teams',
    description: 'Trust CustomerBot worldwide',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    number: '10M+',
    label: 'Conversations',
    description: 'Handled every month',
    icon: MessageSquare,
    color: 'text-green-600'
  },
  {
    number: '< 2s',
    label: 'Response Time',
    description: 'Average AI response',
    icon: Clock,
    color: 'text-purple-600'
  },
  {
    number: '99.9%',
    label: 'Uptime',
    description: 'Reliable service guarantee',
    icon: Zap,
    color: 'text-orange-600'
  }
];

export function Stats() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}