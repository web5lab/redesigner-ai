import React from 'react';
import { AlertTriangle } from 'lucide-react';

const PremiumNotice = ({ setShowBilling }) => {
  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-700/30 rounded-xl">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Unlock Full Community Features</h3>
          <p className="text-indigo-200 mb-4">
            Upgrade to a premium plan to share unlimited designs, create private design collections, and get priority community support.
          </p>
          <button
            onClick={() => setShowBilling && setShowBilling(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all"
          >
            View Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumNotice;