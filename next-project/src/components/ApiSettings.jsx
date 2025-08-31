import React, { useState } from 'react';
import { Key, Plus, Trash2, Copy, Check, Globe, Shield, RefreshCw, Loader2, AlertCircle, BookOpen } from 'lucide-react';


const ApiSettings = ({ isOpen, onClose }) => {
  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk_live_123456789',
      created: '2024-02-15',
      lastUsed: '2024-03-15'
    }
  ]);

  const [whitelist, setWhitelist] = useState([
    {
      id: '1',
      type: 'domain',
      value: 'example.com',
      added: '2024-03-01'
    },
    {
      id: '2',
      type: 'ip',
      value: '192.168.1.1',
      added: '2024-03-10'
    }
  ]);

  const [newKeyName, setNewKeyName] = useState('');
  const [newWhitelistValue, setNewWhitelistValue] = useState('');
  const [whitelistType, setWhitelistType] = useState('domain');
  const [copiedKey, setCopiedKey] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const MAX_API_KEYS = 3;
  const [showGuide, setShowGuide] = useState(false);

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const generateApiKey = async () => {
    setIsGenerating(true);
    // Simulate API key generation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newKey = {
      id: (apiKeys.length + 1).toString(),
      name: newKeyName,
      key: `sk_live_${Math.random().toString(36).substring(2)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: '-'
    };
    
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setIsGenerating(false);
  };

  const addToWhitelist = () => {
    const newEntry = {
      id: (whitelist.length + 1).toString(),
      type: whitelistType,
      value: newWhitelistValue,
      added: new Date().toISOString().split('T')[0]
    };
    
    setWhitelist([...whitelist, newEntry]);
    setNewWhitelistValue('');
  };

  const removeApiKey = (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  const removeWhitelistEntry = (id) => {
    setWhitelist(whitelist.filter(entry => entry.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">API Settings</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowGuide(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Integration Guide
              </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ×
            </button>
            </div>
          </div>

          {/* No API Keys Message */}
          {apiKeys.length === 0 && (
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-medium mb-1">No API Keys Found</h3>
                  <p className="text-slate-300">
                    You haven't created any API keys yet. Generate a new key to start using the redesignr.ai API.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* API Keys Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">API Keys</h3>
              <div className="flex items-center gap-2">
                {apiKeys.length >= MAX_API_KEYS ? (
                  <span className="text-yellow-400 text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Maximum of {MAX_API_KEYS} API keys reached
                  </span>
                ) : (
                  <>
                    <input
                      type="text"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="Key name"
                      className="bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-1.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={generateApiKey}
                      disabled={!newKeyName || isGenerating || apiKeys.length >= MAX_API_KEYS}
                      className="flex items-center gap-2 bg-indigo-500 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          Generate New Key
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left p-4 text-slate-400 font-medium">Name</th>
                      <th className="text-left p-4 text-slate-400 font-medium">API Key</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Created</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Last Used</th>
                      <th className="text-right p-4 text-slate-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map((key) => (
                      <tr key={key.id} className="border-b border-slate-700/50 last:border-0">
                        <td className="p-4 text-white">{key.name}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <code className="text-indigo-400 font-mono">
                              {key.key.slice(0, 8)}...{key.key.slice(-4)}
                            </code>
                            <button
                              onClick={() => handleCopyKey(key.key)}
                              className="p-1 hover:bg-slate-700 rounded transition-colors"
                            >
                              {copiedKey === key.key ? (
                                <Check className="h-4 w-4 text-green-400" />
                              ) : (
                                <Copy className="h-4 w-4 text-slate-400" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-slate-300">{key.created}</td>
                        <td className="p-4 text-slate-300">{key.lastUsed}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => removeApiKey(key.id)}
                            className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Whitelist Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Domain & IP Whitelist</h3>
              <div className="flex items-center gap-2">
                <select
                  value={whitelistType}
                  onChange={(e) => setWhitelistType(e.target.value)}
                  className="bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="domain">Domain</option>
                  <option value="ip">IP Address</option>
                </select>
                <input
                  type="text"
                  value={newWhitelistValue}
                  onChange={(e) => setNewWhitelistValue(e.target.value)}
                  placeholder={whitelistType === 'domain' ? 'example.com' : '192.168.1.1'}
                  className="bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-1.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={addToWhitelist}
                  disabled={!newWhitelistValue}
                  className="flex items-center gap-2 bg-indigo-500 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                  Add to Whitelist
                </button>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left p-4 text-slate-400 font-medium">Type</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Value</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Added</th>
                      <th className="text-right p-4 text-slate-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {whitelist.map((entry) => (
                      <tr key={entry.id} className="border-b border-slate-700/50 last:border-0">
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                            entry.type === 'domain'
                              ? 'bg-purple-500/20 text-purple-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {entry.type === 'domain' ? (
                              <Globe className="h-3 w-3" />
                            ) : (
                              <Shield className="h-3 w-3" />
                            )}
                            {entry.type === 'domain' ? 'Domain' : 'IP Address'}
                          </span>
                        </td>
                        <td className="p-4 text-white font-mono">{entry.value}</td>
                        <td className="p-4 text-slate-300">{entry.added}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => removeWhitelistEntry(entry.id)}
                            className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Guide Modal */}
        {showGuide && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Integration Guide</h2>
                  <button
                    onClick={() => setShowGuide(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Quick Start</h3>
                      <p className="text-slate-300">
                        Follow these steps to integrate redesignr.ai into your website or application:
                      </p>
                      <ol className="mt-4 space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm">1</span>
                          <div>
                            <h4 className="font-medium text-white">Generate an API Key</h4>
                            <p className="text-slate-300 text-sm">Create a new API key and securely store it.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm">2</span>
                          <div>
                            <h4 className="font-medium text-white">Add Domains/IPs to Whitelist</h4>
                            <p className="text-slate-300 text-sm">Whitelist the domains or IP addresses that will make API requests.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm">3</span>
                          <div>
                            <h4 className="font-medium text-white">Make API Requests</h4>
                            <p className="text-slate-300 text-sm">Use our API endpoints to transform websites. Check the API documentation for details.</p>
                          </div>
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Code Example</h3>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <pre className="text-indigo-400 font-mono text-sm overflow-x-auto">
{`// Example API request
const response = await fetch('https://api.redesignr.ai/v1/redesign', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://example.com',
    theme: 'light',
    customInstructions: 'Make it modern'
  })
});`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Need Help?</h3>
                      <p className="text-slate-300">
                        Check our <a href="/api" className="text-indigo-400 hover:text-indigo-300">API documentation</a> for 
                        detailed information about all available endpoints and features. If you need further assistance, 
                        don't hesitate to contact our support team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiSettings;