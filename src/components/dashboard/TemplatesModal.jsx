import React, { useState } from 'react';
import { Wand2, Upload, X, Globe, FileText } from 'lucide-react';

// Remix Modal Component with Tabs
export const RemixModal = ({ isOpen, onClose, template, onRemix }) => {
  const [activeTab, setActiveTab] = useState('url'); // 'url' or 'instructions'
  const [customInstructions, setCustomInstructions] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [website, setWebsite] = useState('');

  const handleSubmit = () => {
    const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;
    const match = template.name.match(uuidRegex);
    const data = {
      sourceUuid: match ? match[0] : null,
      instruction: customInstructions.trim(),
      mode: activeTab == "url" ? "remix" : 'create',
      url:website.trim()
    }
    onRemix(data);
    onClose();
    setCustomInstructions('');
    setSelectedImage(null);
    setWebsite('');
  };

  const resetForm = () => {
    setCustomInstructions('');
    setSelectedImage(null);
    setWebsite('');
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Remix Template: {template.name}</h3>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Template Preview */}
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <img
                src={template.image}
                alt={template.name}
                className="w-24 h-18 object-cover rounded-lg flex-shrink-0"
              />
              <div>
                <h4 className="font-medium text-white mb-1">{template.name}</h4>
                <p className="text-slate-400 text-sm mb-2">{template.description}</p>
                <p className="text-slate-500 text-xs">Source: {template.url}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-700">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('url')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'url'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Remix from URL
                </div>
              </button>
              <button
                onClick={() => setActiveTab('instructions')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'instructions'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Remix with Instructions
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px]">
            {activeTab === 'url' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="website" className="block text-white font-medium mb-2">
                    Enter your website URL to redesign
                  </label>
                  <input
                    type="url"
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://your-website.com"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <p className="text-slate-400 text-sm mt-2">
                    We'll analyze your website and apply the template's design principles to create a new version.
                  </p>
                </div>

                <div>
                  <label htmlFor="urlInstructions" className="block text-white font-medium mb-2">
                    Additional Instructions (Optional)
                  </label>
                  <textarea
                    id="urlInstructions"
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    rows={3}
                    placeholder="Any specific changes you'd like to make while applying this template..."
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'instructions' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="remixInstructions" className="block text-white font-medium mb-2">
                    Customization Instructions
                  </label>
                  <textarea
                    id="remixInstructions"
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    rows={6}
                    placeholder="Describe how you'd like to customize this template (e.g., 'Change colors to blue theme', 'Add contact form', 'Make it for a restaurant', 'Convert to a portfolio site')..."
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <p className="text-slate-400 text-sm mt-2">
                    Be as specific as possible about the changes you want. The more details you provide, the better the result.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={activeTab === 'url' ? !website.trim() : !customInstructions.trim()}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wand2 className="h-4 w-4" />
              Remix Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};