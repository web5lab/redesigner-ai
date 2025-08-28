import { useState } from 'react';
import { 
  Code,
  Copy,
  Check,
  Plug,
  Settings
} from 'lucide-react';

export function Integrations() {
  const [selectedIntegration, setSelectedIntegration] = useState('react');
  const [copiedCode, setCopiedCode] = useState('');

  const getIntegrationCode = () => {
    const botId = 'bot_' + Math.random().toString(36).substr(2, 9);

    const codes = {
      react: `<script
  src="https://cdn.customerbot.ai/widget.js"
  data-bot-id="${botId}"
  data-theme="modern"
></script>`,
      html: `<script src="https://cdn.customerbot.ai/widget.js" data-bot-id="${botId}"></script>`,
      wordpress: `[customerbot bot-id="${botId}" theme="modern"]`
    };

    return codes[selectedIntegration];
  };

  const copyToClipboard = (code, type) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none -z-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto p-6 space-y-8 z-10">
     

        {/* Integration Code Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
            </div>
            <div className="relative flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/20">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Integration Code</h2>
                <p className="text-green-100">Copy the code below to embed your chatbot</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Platform Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setSelectedIntegration('react')}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                  selectedIntegration === 'react'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                React
              </button>
              <button
                onClick={() => setSelectedIntegration('html')}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                  selectedIntegration === 'html'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                HTML
              </button>
              <button
                onClick={() => setSelectedIntegration('wordpress')}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                  selectedIntegration === 'wordpress'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                WordPress
              </button>
            </div>

            {/* Code Display */}
            <div className="relative">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{getIntegrationCode()}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(getIntegrationCode(), selectedIntegration)}
                className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
              >
                {copiedCode === selectedIntegration ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-300" />
                )}
              </button>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Instructions:</h4>
              <p className="text-sm text-blue-800">
                {selectedIntegration === 'react' && 'Add this script tag to your React app\'s public/index.html file, preferably before the closing </body> tag.'}
                {selectedIntegration === 'html' && 'Paste this code before the closing </body> tag in your HTML file.'}
                {selectedIntegration === 'wordpress' && 'Add this shortcode to any page, post, or widget where you want the chatbot to appear.'}
              </p>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Responsive design that works on all devices</li>
                <li>• Customizable theme and colors</li>
                <li>• Lightweight and fast loading</li>
                <li>• No impact on your website's performance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Setup Steps */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            Quick Setup Steps
          </h3>
          <ol className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <span>Select your platform tab above (React, HTML, or WordPress)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <span>Copy the provided code snippet using the copy button</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <span>Paste it into your website according to the platform instructions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
              <span>Your chatbot will appear on your website instantly!</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}