import { MessageSquare, Zap, Brain, Shield, Globe, Smartphone, BarChart3, Settings, Crown, Sparkles, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Intelligent Conversations',
    description: 'Advanced AI that understands context and provides human-like responses to your customers.',
    color: 'from-blue-500 to-cyan-500',
    stats: '99.9% accuracy'
  },
  {
    icon: Brain,
    title: 'Smart Learning',
    description: 'Continuously learns from interactions to improve responses and customer satisfaction.',
    color: 'from-purple-500 to-indigo-500',
    stats: 'Self-improving'
  },
  {
    icon: Zap,
    title: 'Lightning Fast Setup',
    description: 'Get your AI chatbot up and running in under 60 seconds with our automated setup.',
    color: 'from-amber-500 to-orange-500',
    stats: '<60 seconds'
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Communicate with customers worldwide in over 50 languages with real-time translation.',
    color: 'from-green-500 to-emerald-500',
    stats: '50+ languages'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and compliance with GDPR, CCPA, and other privacy regulations.',
    color: 'from-red-500 to-pink-500',
    stats: 'SOC 2 certified'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Detailed insights into customer interactions, satisfaction scores, and performance metrics.',
    color: 'from-indigo-500 to-purple-500',
    stats: 'Real-time data'
  }
];



export function Features() {
  return (
    <section id="features" className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full border border-blue-200 shadow-lg mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Powerful Features</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Supercharge Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Customer Support
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Deliver exceptional customer experiences with AI-powered automation that never sleeps
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      {feature.stats}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                  <span className="text-sm">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-200 transition-all pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}