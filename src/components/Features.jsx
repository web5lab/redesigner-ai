import { useEffect, useRef, useState } from 'react';
import { 
  Code, 
  FileText, 
  Globe, 
  Palette, 
  Github, 
  BookOpen, 
  User, 
  Zap,
  ArrowRight,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Sparkles
} from 'lucide-react';
import web5labNew from '../assets/web5labDark.png';
import web5labOld from '../assets/web5labOld.png';
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
      icon: <FileText className="h-6 w-6" />, // Assuming you're using Lucide icons; replace if needed
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
    <section ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-1/2 right-1/2 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block px-4 py-1.5 mb-6 bg-slate-800/80 rounded-full backdrop-blur-sm border border-slate-700">
            <span className="text-purple-400 text-sm font-medium">
              Transform Any Digital Presence
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-4">
            From <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Outdated</span> to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Outstanding</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            Whether it's a website redesign, portfolio creation, documentation, or instant blogging - 
            your AI buddy transforms any digital project in minutes, not hours.
          </p>
        </div>

        {/* Capability Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {capabilities.map((cap) => (
            <button
              key={cap.id}
              onClick={() => setActiveTab(cap.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === cap.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
              }`}
            >
              {cap.icon}
              <span className="font-medium">{cap.title}</span>
            </button>
          ))}
        </div>

        {/* Main Comparison */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          {/* Before */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative p-6 md:p-8 bg-slate-800/90 backdrop-blur-sm rounded-xl border border-red-500/20">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-red-500/20 rounded-lg mr-3">
                  <Clock className="h-5 w-5 text-red-400" />
                </div>
                <h3 className="text-2xl font-semibold text-red-400">{activeCapability.oldTitle}</h3>
              </div>
              <p className="text-slate-300 mb-6">{activeCapability.oldDesc}</p>
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={activeCapability.oldImage} 
                  alt="Before transformation"
                  className="w-full h-64 object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Slow loading', 'Poor UX', 'Outdated design'].map((issue, idx) => (
                  <span key={idx} className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                    {issue}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* After */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative p-6 md:p-8 bg-slate-800/90 backdrop-blur-sm rounded-xl border border-indigo-500/20">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-indigo-500/20 rounded-lg mr-3">
                  <Sparkles className="h-5 w-5 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-semibold text-indigo-400">{activeCapability.newTitle}</h3>
              </div>
              <p className="text-slate-300 mb-6">{activeCapability.newDesc}</p>
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={activeCapability.newImage} 
                  alt="After transformation"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeCapability.stats.map((stat, idx) => (
                  <span key={idx} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full">
                    ✓ {stat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProblemSolution;