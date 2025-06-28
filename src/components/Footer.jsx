import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Disc2Icon, X } from 'lucide-react';
import logo from "../assets/logo.png"

const Footer = () => {
  return (
    <footer className=" relative overflow-hidden">
    
      
      {/* Animated blobs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-600/15 rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-indigo-600/15 rounded-full filter blur-3xl opacity-40 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-600/10 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-indigo-400/50 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-bounce" style={{animationDelay: '5s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300/40 rounded-full animate-bounce" style={{animationDelay: '7s'}}></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-emerald-400/40 rounded-full animate-bounce" style={{animationDelay: '6s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-16 pb-8 border-b border-slate-700/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <a href="#" className="group flex items-center gap-2 text-indigo-400 font-bold text-xl mb-4 hover:text-purple-400 transition-colors duration-300">
                <img src={logo} className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" alt="Logo" />
                <span>redesignr<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">.ai</span></span>
              </a>
              <p className="text-slate-400 mb-6 text-sm sm:text-base leading-relaxed">
                Transform your website with{' '}
                <span className="text-purple-400 font-medium">AI-powered redesigns</span>{' '}
                that look amazing and convert better.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://x.com/redesignrai" className="group p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:border-purple-400/50 hover:bg-slate-700/50 transition-all duration-300">
                  <X className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a href="https://x.com/redesignrai" className="group p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:border-indigo-400/50 hover:bg-slate-700/50 transition-all duration-300">
                  <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a href="https://www.linkedin.com/company/redesignrai" className="group p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:border-blue-400/50 hover:bg-slate-700/50 transition-all duration-300">
                  <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>
            </div>

            <div className='hidden md:block'>
              <h3 className="text-white font-bold mb-6 text-lg">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                  Product
                </span>
              </h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-block">Features</a></li>
                <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 hover:translate-x-1 inline-block">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block">Case Studies</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 hover:translate-x-1 inline-block">Reviews</a></li>
                <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-block">Updates</a></li>
              </ul>
            </div>

            <div className='hidden md:block'>
              <h3 className="text-white font-bold mb-6 text-lg">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Company
                </span>
              </h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 hover:translate-x-1 inline-block">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block">Careers</a></li>
                <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 hover:translate-x-1 inline-block">Press</a></li>
                <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-block">Contact</a></li>
              </ul>
            </div>

            <div className='hidden md:block'>
              <h3 className="text-white font-bold mb-6 text-lg">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
                  Resources
                </span>
              </h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors duration-300 hover:translate-x-1 inline-block">Help Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Documentation</a></li>
                <li><a href="#" className="text-slate-400 hover:text-red-400 transition-colors duration-300 hover:translate-x-1 inline-block">API Reference</a></li>
                <li><a href="#" className="text-slate-400 hover:text-pink-400 transition-colors duration-300 hover:translate-x-1 inline-block">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-block">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="py-8 flex flex-col items-center sm:flex-row sm:justify-between gap-4 sm:gap-0 text-center">
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()}{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 font-medium">
              redesignr.ai
            </span>
            . All rights reserved.
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 text-sm">
            <a href="#" className="text-slate-500 hover:text-purple-400 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors duration-300">Cookies</a>
          </div>
        </div>
      </div>

      {/* Top gradient fade */}
    </footer>
  );
};

export default Footer;