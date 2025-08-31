import React from 'react';
import { Star } from 'lucide-react';


const Testimonial = ({ content, author, role, company, image }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 flex flex-col h-full">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-slate-300 mb-6 flex-grow">{content}</p>
      <div className="flex items-center">
        <img 
          src={image} 
          alt={author} 
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h4 className="text-white font-medium">{author}</h4>
          <p className="text-slate-400 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials= () => {
  const testimonials = [
    {
      content: "redesignr.ai transformed our outdated website into a modern masterpiece in just hours. Our conversion rate increased by 45% within the first month after implementation.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechVision",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      content: "I was skeptical about AI-generated designs, but redesignr.ai blew me away. The platform understood our brand perfectly and created a website that looks custom-made by a top agency.",
      author: "Michael Chen",
      role: "CEO",
      company: "StartupLaunch",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      content: "As a small business owner, I couldn't afford a professional redesign. redesignr.ai gave us an enterprise-quality website at a fraction of the cost. Our customers love the new look!",
      author: "Emily Rodriguez",
      role: "Owner",
      company: "Craft Coffee Co.",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900"></div>
      
      {/* Animated gradient circles */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-indigo-600/10 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by Businesses Worldwide</h2>
          <p className="text-slate-300 text-lg">
            Join hundreds of satisfied customers who have transformed their online presence with redesignr.ai.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              image={testimonial.image}
            />
          ))}
        </div>
        
        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">1600+</div>
            <div className="text-slate-400">Websites Redesigned</div>
          </div>
          
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">28%</div>
            <div className="text-slate-400">Avg. Conversion Increase</div>
          </div>
          
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.5/5</div>
            <div className="text-slate-400">Customer Satisfaction</div>
          </div>
          
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">15+</div>
            <div className="text-slate-400">Industries Served</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;