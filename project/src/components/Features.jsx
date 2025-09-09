import { useEffect, useRef, useState } from 'react';
import {
  FileText,
  Palette,
  BookOpen,
  User,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import web5labNew from '../assets/web5labDark.webp';
import web5labOld from '../assets/web5labOld.webp';
import docNew from '../assets/docNew.png'
import docOld from '../assets/docOld.png'
import portfolioNew from '../assets/portfolioNew.png';
import portfolioOld from '../assets/portfolioOld.png';
import blogNew from '../assets/blogNew.png';

const ProblemSolution = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('redesign');

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

  const capabilities = [
    {
      id: 'redesign',
      icon: <Palette className="h-6 w-6" />,
      title: 'Website Redesign',
      description: 'Transform any existing website',
      oldTitle: 'Outdated & Slow',
      oldDesc: 'Legacy websites with poor UX, slow loading times, and outdated designs that drive visitors away.',
      newTitle: 'Modern & Fast',
      newDesc: 'Lightning-fast, responsive designs with intuitive navigation and conversion-optimized layouts.',
      oldImage: web5labOld,
      newImage: web5labNew,
      stats: ['3x faster loading', '65% better conversion', 'Mobile-first design']
    },
    {
      id: 'portfolio',
      icon: <User className="h-6 w-6" />,
      title: 'Portfolio Sites',
      description: 'Create stunning professional portfolios',
      oldTitle: 'Generic & Forgettable',
      oldDesc: 'Cookie-cutter portfolio templates that fail to showcase your unique skills and personality.',
      newTitle: 'Unique & Memorable',
      newDesc: 'Custom-designed portfolios that tell your story and make you stand out from the competition.',
      oldImage: portfolioOld,
      newImage: portfolioNew,
      stats: ['Interactive showcases', 'Personal branding', 'Contact integration']
    },
    {
      id: 'docs',
      icon: <FileText className="h-6 w-6" />,
      title: 'Docs Generator',
      description: 'Generate stunning documentation from your codebase',
      oldTitle: 'Raw Repository Code',
      oldDesc: 'Unstructured source files that are difficult to navigate and understand.',
      newTitle: 'Developer-Friendly Docs',
      newDesc: 'Clean, structured, and interactive docs with search, examples, and better onboarding.',
      oldImage: docOld,
      newImage: docNew,
      stats: ['AI-powered', 'Code-aware formatting', 'Live previews']
    },
    {
      id: 'blog',
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Instant Blogging',
      description: 'Launch professional blogs in minutes',
      oldTitle: 'Complex Setup',
      oldDesc: 'Hours of configuration, plugin management, and design tweaking before you can start writing.',
      newTitle: 'Write Immediately',
      newDesc: 'AI-powered blog setup with SEO optimization, responsive design, and content management built-in.',
      oldImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&sat=-100',
      newImage: blogNew,
      stats: ['SEO optimized', 'Content templates', 'Analytics ready']
    }
  ];

  const activeCapability = capabilities.find(cap => cap.id === activeTab) || capabilities[0];

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Content */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">Transform Any Digital Presence</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
              From Outdated
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              to Outstanding
            </span>
          </h2>

          <p className="text-xl text-slate-400 leading-relaxed mb-8">
            Whether it's a website redesign, portfolio creation, documentation, or instant blogging — 
            your AI buddy transforms any digital project in minutes, not hours.
          </p>
        </div>

        {/* Capability Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {capabilities.map((cap) => (
            <button
              key={cap.id}
              onClick={() => setActiveTab(cap.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                activeTab === cap.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50'
              }`}
            >
              {cap.icon}
              <span>{cap.title}</span>
            </button>
          ))}
        </div>

        {/* Large Before/After Showcase */}
        <div className="relative w-full flex justify-center mb-16">
          <div className="relative rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden bg-slate-900/60 w-full max-w-7xl">
            <div className="grid md:grid-cols-2 gap-0">
              
              {/* Before Side */}
              <div className="relative group">
                <div className="p-8 md:p-10 bg-gradient-to-br from-red-500/5 to-orange-500/5 border-r border-slate-700/50 h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-red-500/20 rounded-xl mr-4">
                      <Clock className="h-6 w-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-red-400">
                        {activeCapability.oldTitle}
                      </h3>
                      <p className="text-red-300/70 text-sm">Before</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                    {activeCapability.oldDesc}
                  </p>
                  
                  <div className="flex-1 flex items-center justify-center">
                    <div className="relative overflow-hidden rounded-2xl w-full max-w-md">
                      <img
                        src={activeCapability.oldImage}
                        alt="Before transformation"
                        loading="lazy"
                        className="w-full h-64 object-cover opacity-70"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['Slow loading', 'Poor UX', 'Outdated design'].map((issue, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-red-500/20 text-red-300 text-sm rounded-full">
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* After Side */}
              <div className="relative group">
                <div className="p-8 md:p-10 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-indigo-500/20 rounded-xl mr-4">
                      <Sparkles className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-indigo-400">
                        {activeCapability.newTitle}
                      </h3>
                      <p className="text-indigo-300/70 text-sm">After</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                    {activeCapability.newDesc}
                  </p>
                  
                  <div className="flex-1 flex items-center justify-center">
                    <div className="relative overflow-hidden rounded-2xl w-full max-w-md">
                      <img
                        src={activeCapability.newImage}
                        alt="After transformation"
                        loading="lazy"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    {activeCapability.stats.map((stat, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-indigo-500/20 text-indigo-300 text-sm rounded-full">
                        ✓ {stat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Central Arrow */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full p-4 shadow-2xl border-4 border-slate-900">
                  <ArrowRight className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProblemSolution;