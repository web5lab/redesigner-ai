import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import templateImage from "../assets/templates.png";

const TemplateShowcase = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add('section-enter-active');
          sectionRef.current?.classList.remove('section-enter');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      sectionRef.current.classList.add('section-enter');
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Minimal Header Content */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">1600+ AI Templates</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Choose Your Perfect
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              Design Template
            </span>
          </h2>

          <p className="text-xl text-slate-400 leading-relaxed mb-8">
            Professionally designed themes powered by AI — optimized for performance and visual brilliance.
          </p>
        </div>

        {/* Large Image Showcase */}
        <div className="relative w-full flex justify-center">
          <div className="relative rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden bg-slate-900/60 w-full max-w-7xl">
            <div className="w-full" style={{ aspectRatio: '16/8' }}>
              <img
                src={templateImage}
                alt="Template preview showcase"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TemplateShowcase;