import React, { useState } from 'react';
import { Copy, Twitter, Linkedin, Facebook } from 'lucide-react';
import { toast } from 'react-hot-toast';
import StyledModal from './StyledModal';

const SharePopup = ({ isOpen, onClose, website }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${website?.uuid}`;

  if (!isOpen || !website) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <StyledModal isOpen={isOpen} onClose={onClose} title={`Share "${website.source || website.url}"`} maxWidth="max-w-lg">
      <p className="text-slate-300 text-sm mb-4">Share this redesigned masterpiece:</p>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 caret-indigo-500"
        />
        <button
          onClick={handleCopy}
          className={`p-3 rounded-lg transition-all duration-200 ${copied ? 'bg-green-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500'} whitespace-nowrap sm:w-auto w-full`}
          title={copied ? "Copied!" : "Copy link"}
        >
          <span className="sm:hidden">{copied ? "Copied!" : "Copy Link"}</span>
          <Copy className="h-5 w-5 sm:inline hidden" />
        </button>
      </div>

      <p className="text-slate-300 text-sm mb-3">Or share on social media:</p>
      <div className="flex items-center gap-3 flex-wrap">
        {[
          { Icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out this website redesign I made with redesignr.ai!`, label: "Twitter" },
          { Icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, label: "LinkedIn" },
          { Icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, label: "Facebook" },
        ].map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-700 hover:bg-slate-600 p-3 rounded-lg text-slate-300 hover:text-white transition-colors"
            aria-label={`Share on ${label}`}
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </StyledModal>
  );
};

export default SharePopup;