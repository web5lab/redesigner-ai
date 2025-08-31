import React from 'react';
import { X } from 'lucide-react';

const StyledModal = ({ isOpen, onClose, children, title, maxWidth = 'max-w-md' }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100] p-4 transition-opacity duration-300 ease-in-out animate-fadeIn"
      onClick={onClose}
    >
      <div
        className={`bg-slate-800 rounded-xl shadow-2xl border border-slate-700 w-full ${maxWidth} p-6 sm:p-8 transform transition-all duration-300 ease-in-out animate-scaleUp`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default StyledModal;