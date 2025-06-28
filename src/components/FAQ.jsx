import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, Code, FileText, Zap } from 'lucide-react';

const FAQItem = ({ question, answer, icon: Icon, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Split answer into paragraphs if it contains \n
  const answerParagraphs = typeof answer === 'string' ? answer.split('\n') : [answer];

  return (
    <div className="group border-b border-slate-700/30 px-6 last:border-b-0 hover:bg-slate-800/30 transition-all duration-300">
      <button
        className="flex justify-between items-center w-full py-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${
            index % 4 === 0 ? 'from-purple-500/20 to-indigo-500/20 border border-purple-500/30' :
            index % 4 === 1 ? 'from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30' :
            index % 4 === 2 ? 'from-yellow-500/20 to-orange-500/20 border border-yellow-500/30' :
            'from-pink-500/20 to-purple-500/20 border border-pink-500/30'
          } flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`h-5 w-5 ${
              index % 4 === 0 ? 'text-purple-400' :
              index % 4 === 1 ? 'text-emerald-400' :
              index % 4 === 2 ? 'text-yellow-400' :
              'text-pink-400'
            }`} />
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
            {question}
          </h3>
        </div>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-slate-400 group-hover:text-purple-400 transition-colors duration-300" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-400 group-hover:text-purple-400 transition-colors duration-300" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="pb-6 text-slate-300 space-y-3 ml-14 animate-fadeIn">
          {answerParagraphs.map((paragraph, pIndex) => (
            <p key={pIndex} className="leading-relaxed text-slate-300">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How does the AI Frontend Engineer work?",
      answer: "Our AI Frontend Engineer is your intelligent web creation assistant that understands modern design principles and coding best practices. Simply provide a URL, GitHub repository, idea, or Markdown file, and it instantly generates production-ready HTML, CSS, and React code. The AI analyzes your requirements and applies cutting-edge design patterns to create stunning, functional websites without you writing a single line of code.",
      icon: Sparkles
    },
    {
      question: "What can I build with this AI assistant?",
      answer: `Transform any idea into a professional website in minutes:\n• **SEO-Friendly Blogs:** Generate optimized blog layouts with your content and branding\n• **GitHub Documentation:** Convert repositories into beautiful, searchable documentation sites\n• **Landing Pages:** Create high-converting marketing pages from your specifications\n• **Website Redesigns:** Upload any URL and get modern, responsive redesigns\n• **Template Customization:** Apply professional templates to your existing content\n• **Marketing Pages:** Build conversion-focused pages with AI-optimized layouts`,
      icon: Code
    },
    {
      question: "How do I create documentation from my GitHub repository?",
      answer: "Creating professional documentation is incredibly simple! Just paste your public GitHub repository URL, and our AI will analyze your README, code structure, and project files to generate a complete documentation website. The AI understands code patterns, API structures, and technical writing best practices to create searchable, well-organized docs that make your project shine. You can also upload Markdown files directly for custom documentation needs.",
      icon: FileText
    },
    {
      question: "What makes this different from other website builders?",
      answer: "Unlike traditional drag-and-drop builders, our AI Frontend Engineer thinks like a professional developer and designer. It doesn't just arrange blocks—it understands your content, analyzes modern design trends, and generates clean, semantic code that's actually maintainable. You get production-ready React components and HTML/CSS that you can deploy anywhere, modify, or hand off to developers. Plus, it specializes in technical content like GitHub docs and SEO-optimized blogs.",
      icon: Zap
    },
    {
      question: "Can I customize the generated websites and export the code?",
      answer: "Absolutely! Every website generated comes with complete, production-ready source code in both React.js and HTML/CSS formats. The code is clean, well-structured, and follows modern web standards, making it easy for you or your developers to customize further. You own the code completely—deploy it on any platform, modify the design, add features, or integrate it into larger projects. No vendor lock-in, no limitations.",
      icon: Code
    },
    {
      question: "How does the AI handle SEO and performance optimization?",
      answer: "Our AI Frontend Engineer automatically implements SEO best practices and performance optimizations in every generated website. This includes semantic HTML structure, proper meta tags, optimized images, fast loading times, mobile responsiveness, and clean URL structures. For blogs, it generates SEO-friendly content layouts with proper heading hierarchies and schema markup. Your sites are built to rank well and load fast from day one.",
      icon: Sparkles
    },
    {
      question: "Can I redesign existing websites or work with templates?",
      answer: "Yes! Paste any website URL and choose from multiple redesign options—get three unique design variations or specify your preferred theme (light, dark, or let AI choose). You can also start with professional templates and either apply them to your existing site's content or customize them with specific instructions. The AI understands how to preserve your content while applying modern design patterns and improved user experience.",
      icon: Zap
    }
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background gradients matching hero */}
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 right-1/6 w-72 h-72 bg-purple-600/10 rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/6 w-80 h-80 bg-emerald-600/10 rounded-full filter blur-3xl opacity-40 animate-pulse" style={{animationDelay: '3s'}}></div>
      <div className="absolute top-1/2 right-1/2 w-64 h-64 bg-indigo-600/10 rounded-full filter blur-3xl opacity-40 animate-pulse" style={{animationDelay: '6s'}}></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-emerald-400/50 rounded-full animate-bounce" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-indigo-400/45 rounded-full animate-bounce" style={{animationDelay: '7s'}}></div>
        <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 bg-yellow-400/40 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            {/* Badge */}
            <div className="inline-block px-4 py-2 mb-6 bg-slate-800/80 rounded-full backdrop-blur-sm border border-slate-700 shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
              <span className="text-purple-400 text-sm font-medium">
                🤖 AI Frontend Engineer FAQ
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Frequently Asked{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400">
                Questions
              </span>
            </h2>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Everything you need to know about building stunning websites, GitHub docs, and SEO blogs with your{' '}
              <span className="text-purple-400 font-medium">AI Frontend Engineer</span>
              . Get instant answers about features, customization, and code export.
            </p>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl overflow-hidden shadow-2xl">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer}
                icon={faq.icon}
                index={index}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-slate-300 mb-6 text-lg">
              Ready to build something amazing with AI?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">
                  🚀 Start Building Now
                </span>
              </button>
              
              <button className="group px-8 py-3 border border-slate-600 text-slate-300 font-semibold rounded-lg hover:border-purple-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300">
                <span className="flex items-center gap-2">
                  💬 Contact Support
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent"></div>

    </section>
  );
};

export default FAQ;