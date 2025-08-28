import React from 'react';
import { Info } from 'lucide-react';

const CommunityGuidelines = () => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-white font-medium mb-1">Community Guidelines</h3>
          <p className="text-slate-300 text-sm">
            Please be respectful and supportive. Share constructive feedback and help others improve their designs.
            <button className="text-indigo-400 hover:text-indigo-300 ml-1 text-sm">
              Read full guidelines
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityGuidelines;