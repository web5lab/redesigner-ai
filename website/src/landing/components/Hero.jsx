import React, { useState } from 'react';
import { ArrowRight, Play, Bot, Zap, CheckCircle, X } from 'lucide-react';

export function Hero() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showIframe, setShowIframe] = useState(false);

  const handleSubmit = () => {
    if (!websiteUrl) {
      setErrorMessage('Please enter a website URL');
      return;
    }

    try {
      new URL(websiteUrl);
      setErrorMessage('');
      setShowIframe(true);
    } catch (error) {
      setErrorMessage('Please enter a valid URL (e.g., https://example.com)');
    }
  };

  const handleWatchDemo = () => {
    setWebsiteUrl('https://example.com');
    setShowIframe(true);
    setErrorMessage('');
  };

  return (
    <section className="relative pt-32 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Centered Hero Content */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-8">
            <div>
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight leading-tight">
                AI customer support
                <br />
                <span className="text-gray-600">with human backup</span>
              </h1>

              <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Deploy intelligent chatbots that seamlessly hand off to human agents.
                Support customers 24/7 from web and mobile app.
              </p>
            </div>

            {/* Demo Input Section */}
            <div className="mb-12 max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1 relative w-full">
                    <input
                      type="url"
                      placeholder="Enter your website URL to see the demo"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="w-full px-6 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Zap className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>Try Demo</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {errorMessage && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={handleWatchDemo}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-6 py-3 font-medium transition-colors"
              >
                <Play className="w-4 h-4" />
                Or watch overview
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 text-sm text-gray-600 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>99.9% uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>10k+ support teams</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Mobile app included</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Website Preview Modal */}
      {showIframe && (
        <div className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="relative w-full h-full max-w-screen-xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Enhanced Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full">
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-bold">Live Demo</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 truncate max-w-[calc(100%-200px)]">
                  {websiteUrl || 'Demo Website'}
                </h3>
              </div>
              <button
                onClick={() => setShowIframe(false)}
                className="p-3 text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
                title="Close preview"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden">
              <iframe
                src={websiteUrl || 'https://example.com'}
                className="w-full h-full border-none"
                title="Website Preview"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />

            </div>
          </div>
        )}
    </section>
  );
}