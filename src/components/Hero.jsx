import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const videoUrl = "https://www.youtube.com/embed/HzYyay3b89o?si=3ONsDpp2NYiZb5x5";

  return (
    <section className="pt-28 pb-20 min-h-[100vh] md:pt-32 md:pb-24 relative overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/2 right-1/2 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-indigo-400/40 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-blue-400/35 rounded-full animate-bounce" style={{ animationDelay: '5s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300/30 rounded-full animate-bounce" style={{ animationDelay: '7s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-block px-4 py-1.5 mb-6 bg-slate-800/80 rounded-full backdrop-blur-sm border border-slate-700 shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
              <span className="text-purple-400 text-sm font-medium">
                🤖 Your AI Buddy for Web Creation
              </span>
            </div>

            {/* Heading & Description */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Build and Redesign{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse">
                Stunning Websites
              </span>,{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                GitHub Docs
              </span>, SEO Blogs & Marketing Pages{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
                in Minutes
              </span>
            </h1>

            <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
              Instantly generate SEO-optimized blogs, sleek landing pages, GitHub-style docs, and high-converting marketing sites — all from a URL, repo, or idea. Our{' '}
              <span className="text-purple-400 font-medium">AI Frontend Engineer</span> delivers clean, production-ready HTML — no coding required. Start from scratch or redesign existing pages and save{' '}
              <span className="text-emerald-400 font-semibold">40+ hours</span> per project.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                ['GitHub URL to Docs', 'emerald-400'],
                ['AI Frontend Engineer', 'purple-400'],
                ['Production Ready', 'blue-400'],
                ['No Coding Required', 'indigo-400'],
              ].map(([label, color], i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 rounded-lg border border-slate-700/50">
                  <div className={`w-2 h-2 bg-${color} rounded-full`}></div>
                  <span className="text-sm text-slate-300">{label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">🚀 Start Building Now</span>
              </button>

              <button
                // onClick={() => setShowVideo(true)}
                className="group px-8 py-3 border border-slate-600 text-slate-300 font-semibold rounded-lg hover:border-purple-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  📖 View Demo
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showVideo && (
        <div className="fixed inset-0   z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-7xl">
            <div className="pb-[56.25%] relative h-0 overflow-hidden rounded-lg shadow-2xl">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={videoUrl}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </section>
  );
};

export default Hero;
