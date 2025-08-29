import { MessageSquare, Users, Smartphone, Zap, Shield, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'AI-First Support',
    description: 'Intelligent chatbots handle common queries instantly, reducing response time to seconds.'
  },
  {
    icon: Users,
    title: 'Human Handoff',
    description: 'Seamless escalation to human agents when AI reaches its limits or customers request it.'
  },
  {
    icon: Smartphone,
    title: 'Mobile App',
    description: 'Manage support from anywhere with our native mobile app for iOS and Android.'
  },
  {
    icon: Zap,
    title: 'Quick Setup',
    description: 'Deploy your support bot in under 60 seconds. No coding required.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption and GDPR compliance.'
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Track performance, customer satisfaction, and team efficiency in real-time.'
  }
];

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything you need for customer support
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Powerful features that help you deliver exceptional customer experiences at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-4 sm:p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}