import React, { useState } from 'react';
import { Copy, Twitter, Linkedin, Facebook, Gift, Users, Sparkles, X } from 'lucide-react';

const ReferAndEarnPopup = ({ isOpen = true, onClose = () => {}, referralLink = "https://redesignr.ai/ref/abc123" }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!referralLink) {
      alert("Referral link not available yet.");
      return;
    }
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700/50 max-w-lg w-full overflow-hidden animate-slideUp">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="relative p-8 pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg">
              <Gift className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent mb-2">
            Refer & Earn
          </h2>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              10 Bonus Credits
            </span>
            <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
          </div>
        </div>

        {/* Content */}
        <div className="relative px-8 pb-8">
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-5 w-5 text-indigo-400" />
              <p className="text-slate-300 text-sm">
                Share your unique referral link with friends. When they sign up and create their first website, 
                you'll earn <span className="text-yellow-400 font-semibold">10 bonus credits!</span>
              </p>
            </div>
          </div>

          {/* Referral Link Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">Your Referral Link</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={referralLink || "Generating your link..."}
                  readOnly
                  className="w-full bg-slate-900/70 border border-slate-600 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <button
                onClick={handleCopy}
                disabled={!referralLink}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  copied 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25'
                } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap`}
              >
                <span className="flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  {copied ? "Copied!" : "Copy"}
                </span>
              </button>
            </div>
          </div>

          {/* Social Share */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">Share directly</label>
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { 
                  Icon: Twitter, 
                  href: `https://twitter.com/intent/tweet?text=Check%20out%20redesignr.ai%20and%20get%20a%20bonus%20when%20you%20sign%20up%20using%20my%20link!%20${encodeURIComponent(referralLink || '')}`, 
                  label: "Twitter",
                  color: "from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500"
                },
                { 
                  Icon: Linkedin, 
                  href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(referralLink || '')}&title=Join%20me%20on%20redesignr.ai!&summary=Redesign%20websites%20with%20AI.%20Use%20my%20referral%20link!`, 
                  label: "LinkedIn",
                  color: "from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
                },
                { 
                  Icon: Facebook, 
                  href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink || '')}`, 
                  label: "Facebook",
                  color: "from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700"
                },
              ].map(({ Icon, href, label, color }) => (
                <a
                  key={label}
                  href={referralLink ? href : '#'}
                  onClick={(e) => !referralLink && e.preventDefault()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gradient-to-r ${color} p-4 rounded-xl text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${!referralLink ? 'opacity-50 cursor-not-allowed hover:scale-100' : 'shadow-md'}`}
                  aria-label={`Share on ${label}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-xl font-medium transition-all duration-200 border border-slate-600/50 hover:border-slate-500/50 backdrop-blur-sm"
            >
              Close
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-2xl"></div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ReferAndEarnPopup;