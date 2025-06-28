import React, { useState } from 'react';
import { Copy, Twitter, Linkedin, Facebook } from 'lucide-react';
import { toast } from 'react-hot-toast';
import StyledModal from './StyledModal';

const ReferAndEarnPopup = ({ isOpen, onClose, referralLink }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!referralLink) {
      toast.error("Referral link not available yet.");
      return;
    }
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <StyledModal isOpen={isOpen} onClose={onClose} title="Refer & Earn Credits" maxWidth="max-w-lg">
      <p className="text-slate-300 text-sm mb-2">
        Share your unique referral link with friends. When they sign up and create their first website,
        you'll <strong className="text-yellow-400">earn 2 bonus credits!</strong>
      </p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 mt-4">
        <input
          type="text"
          value={referralLink || "Generating your link..."}
          readOnly
          className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 caret-indigo-500"
        />
        <button
          onClick={handleCopy}
          disabled={!referralLink}
          className={`p-3 rounded-lg transition-all duration-200 ${copied ? 'bg-green-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500'} whitespace-nowrap sm:w-auto w-full disabled:opacity-50 disabled:cursor-not-allowed`}
          title={copied ? "Copied!" : "Copy link"}
        >
          <span className="sm:hidden">{copied ? "Copied!" : "Copy Link"}</span>
          <Copy className="h-5 w-5 sm:inline hidden" />
        </button>
      </div>

      <p className="text-slate-300 text-sm mb-3">Or share directly:</p>
      <div className="flex items-center gap-3 flex-wrap">
        {[
          { Icon: Twitter, href: `https://twitter.com/intent/tweet?text=Check%20out%20redesignr.ai%20and%20get%20a%20bonus%20when%20you%20sign%20up%20using%20my%20link!%20${encodeURIComponent(referralLink || '')}`, label: "Twitter" },
          { Icon: Linkedin, href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(referralLink || '')}&title=Join%20me%20on%20redesignr.ai!&summary=Redesign%20websites%20with%20AI.%20Use%20my%20referral%20link!`, label: "LinkedIn" },
          { Icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink || '')}`, label: "Facebook" },
        ].map(({ Icon, href, label }) => (
          <a
            key={label}
            href={referralLink ? href : '#'}
            onClick={(e) => !referralLink && e.preventDefault()}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-slate-700 hover:bg-slate-600 p-3 rounded-lg text-slate-300 hover:text-white transition-colors ${!referralLink ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label={`Share on ${label}`}
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
      <div className="mt-6 sm:mt-8 flex justify-end">
        <button
          onClick={onClose}
          className="px-5 py-2.5 text-sm font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors w-full sm:w-auto"
        >
          Close
        </button>
      </div>
    </StyledModal>
  );
};

export default ReferAndEarnPopup;