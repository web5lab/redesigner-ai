import React from 'react';
import { Wand2, Plus } from 'lucide-react';

const EmptyState = ({ onCreateNew }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-slate-800/30 rounded-xl border border-slate-700/50 shadow-xl min-h-[300px] sm:min-h-[400px] animate-fadeInUp">
      <div className="p-4 sm:p-5 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mb-4 sm:mb-6 shadow-lg">
        <Wand2 className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-400 transform group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">Embark on Your First Website</h3>
      <p className="text-slate-400 mb-6 sm:mb-8 max-w-md sm:max-w-lg text-sm sm:text-base">
        Paste a website link, pick a template, or create from scratch. AI turns it into a polished landing page instantly.
      </p>
      <button
        onClick={onCreateNew}
        className="group inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg font-semibold hover:shadow-xl hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 text-sm sm:text-base"
      >
        <Plus className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:rotate-90" />
        Create Your First Website
      </button>
    </div>
  );
};

export default EmptyState;