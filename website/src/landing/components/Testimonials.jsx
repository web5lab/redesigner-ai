import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, ArrowRight, TrendingUp, Users, MessageSquare } from 'lucide-react';
import web5lablogo from "../assets/web5lab.png";
import proboticsLogo from "../assets/probotics.png";
import arcAiLogo from "../assets/arcAi.png";

const testimonials = [
  {
    text: "CustomerBot has revolutionized how we handle customer support. Our response times are down 80% and customer satisfaction is through the roof! The AI's ability to understand context and provide accurate responses is remarkable.",
    author: "Sarah Johnson, MBA",
    role: "Customer Success Manager",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    logo: web5lablogo,
    stats: {
      responseTime: "-80%",
      satisfaction: "+95%",
      efficiency: "+120%"
    },
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    text: "Implementing CustomerBot was a game-changer for our support team. We've seen a 65% reduction in ticket resolution time and our team can now focus on complex issues while the AI handles routine queries.",
    author: "Michael Chen, PhD",
    role: "Head of Support",
    company: "CloudScale",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    logo: proboticsLogo,
    stats: {
      resolutionTime: "-65%",
      efficiency: "+75%",
      teamProductivity: "+90%"
    },
    gradient: "from-purple-500 to-pink-500"
  },
  {
    text: "The level of customization and learning capabilities of CustomerBot is impressive. It's like having a support team that works 24/7 and gets smarter every day. Our customers love the instant responses.",
    author: "Emily Rodriguez, CTO",
    role: "Operations Director",
    company: "InnovateX",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    logo: arcAiLogo,
    stats: {
      availability: "24/7",
      satisfaction: "+88%",
      responseTime: "<2s"
    },
    gradient: "from-green-500 to-emerald-500"
  }
];

const companyLogos = [
  { name: "TechCorp", logo: web5lablogo },
  { name: "CloudScale", logo: proboticsLogo },
  { name: "InnovateX", logo: arcAiLogo },
  { name: "DataFlow", logo: web5lablogo },
  { name: "NextGen", logo: proboticsLogo },
  { name: "FutureAI", logo: arcAiLogo }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-6 py-3 rounded-full border border-purple-200 shadow-lg mb-6">
            <Star className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Customer Stories</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Trusted by
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how companies are transforming their customer support with CustomerBot
          </p>
        </div>

        {/* Company Logos */}
        <div className="mb-20">
          <p className="text-center text-gray-500 mb-8 font-medium">Trusted by 10,000+ companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companyLogos.map((company, index) => (
              <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="h-8 w-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-6xl mx-auto">
          <div className={`relative rounded-3xl p-12 md:p-16 shadow-2xl transition-all duration-500 ${
            isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
          } bg-gradient-to-br ${currentTestimonial.gradient} text-white overflow-hidden`}>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
            </div>

            <div className="relative z-10">
              {/* Quote Icon */}
              <Quote className="w-16 h-16 mb-8 opacity-50" />
              
              {/* Testimonial Content */}
              <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-12">
                "{currentTestimonial.text}"
              </blockquote>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 mb-12">
                {Object.entries(currentTestimonial.stats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2">{value}</div>
                    <div className="text-sm opacity-80 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.author}
                    className="w-16 h-16 rounded-full border-4 border-white/30 shadow-lg"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{currentTestimonial.author}</h3>
                    <p className="opacity-80">{currentTestimonial.role}</p>
                    <p className="text-sm opacity-60">{currentTestimonial.company}</p>
                  </div>
                </div>
                
                <img
                  src={currentTestimonial.logo}
                  alt={`${currentTestimonial.company} logo`}
                  className="h-12 opacity-80"
                />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-12 gap-6">
            <button
              onClick={handlePrevious}
              disabled={isAnimating}
              className="group p-4 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
            </button>
            
            {/* Indicators */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === index 
                      ? 'w-12 h-3 bg-gradient-to-r from-blue-500 to-indigo-600' 
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="group p-4 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}