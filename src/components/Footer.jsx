import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Disc2Icon, X } from 'lucide-react';
import logo from "../assets/logo.png"

const Footer = () => {
  return (
    <footer className="bg-slate-900 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-20"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-16 pb-8 border-b border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <a href="#" className="flex items-center gap-2 text-indigo-400 font-bold text-xl mb-4">
                <img src={logo} className="h-6 w-6" alt="Logo" />
                <span>redesignr<span className="text-purple-400">.ai</span></span>
              </a>
              <p className="text-slate-400 mb-4 text-sm sm:text-base">
                Transform your website with AI-powered redesigns that look amazing and convert better.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://x.com/redesignrai" className="text-slate-400 hover:text-white transition-colors">
                  <X className="h-5 w-5" />
                </a>
                <a href="https://x.com/redesignrai" className="text-slate-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              
                <a href="https://www.linkedin.com/company/redesignrai" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className='hidden md:block'>
              <h3 className="text-white font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Reviews</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Updates</a></li>
              </ul>
            </div>

            <div className='hidden md:block'>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div className='hidden md:block'>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="py-6 flex flex-col items-center sm:flex-row sm:justify-between gap-4 sm:gap-0 text-center">
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} redesignr.ai. All rights reserved.
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 text-sm">
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
