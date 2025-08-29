import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    text: "CustomerBot reduced our support response time by 80%. The AI handles routine questions perfectly, and the human handoff is seamless.",
    author: "Sarah Johnson",
    role: "Head of Support",
    company: "TechCorp",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
  },
  {
    text: "The mobile app lets our team provide support from anywhere. Game-changer for our distributed team.",
    author: "Michael Chen",
    role: "Customer Success",
    company: "CloudScale",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
  },
  {
    text: "Setup took less than 5 minutes. The AI learned our FAQ instantly and started helping customers right away.",
    author: "Emily Rodriguez",
    role: "Operations Manager",
    company: "StartupXYZ",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Loved by support teams
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 px-4">
            See what our customers have to say about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                "{testimonial.text}"
              </blockquote>
              
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                />
                <div>
                  <div className="text-sm sm:text-base font-medium text-gray-900">{testimonial.author}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}