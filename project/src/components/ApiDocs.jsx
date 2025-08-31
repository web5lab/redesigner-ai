import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, Key, Shield, Zap, Clock, BookOpen, Cpu, Play, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';

const CodeBlock = ({ code, language, onCopy }) => (
  <div className="relative bg-slate-900/50 rounded-lg p-4">
    <div className="absolute top-3 right-3 flex items-center gap-2">
      <span className="text-xs text-slate-500 font-mono">{language}</span>
      {onCopy && (
        <button
          onClick={onCopy}
          className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Copy className="h-4 w-4 text-slate-400" />
        </button>
      )}
    </div>
    <pre className="text-indigo-400 font-mono text-sm overflow-x-auto">
      {code}
    </pre>
  </div>
);



const ApiPlayground = ({ endpoint, onTest }) => {
  const [formData, setFormData] = useState(endpoint.request);
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onTest({ ...formData, apiKey });
  };

  return (
    <div className="bg-slate-900/50 rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            API Key
          </label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {Object.entries(endpoint.request).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              {key}
            </label>
            <input
              type={typeof value === 'boolean' ? 'checkbox' : 'text'}
              checked={typeof value === 'boolean' ? formData[key] : undefined}
              value={typeof value === 'boolean' ? undefined : formData[key]}
              onChange={(e) => setFormData({
                ...formData,
                [key]: typeof value === 'boolean' ? e.target.checked : e.target.value
              })}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
        >
          <Play className="h-4 w-4" />
          Test Endpoint
        </button>
      </form>
    </div>
  );
};

const ApiDocs= () => {
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [response, setResponse] = useState(null);

  const handleCopy = (text, endpoint) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const handleTest = async (data) => {
    // Simulate API call
    setResponse({
      status: 'success',
      data: {
        _id: '507f1f77bcf86cd799439011',
        user: '507f1f77bcf86cd799439012',
        source: data.url,
        uuid: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        status: 'pending',
        instruction: data.customInstructions,
        multiDesign: data.multiDesign,
        multiDesignlist: [
          { uuid: 'd290f1ee-6c54-4b01-90e6-d701748f0851' }
        ]
      }
    });
  };

  const endpoints = [
    {
      name: 'Create Website Redesign',
      method: 'POST',
      endpoint: '/redesign',
      description: 'Generate new website designs based on provided URL and preferences.',
      authentication: 'Bearer Token required',
      request: {
        url: 'https://example.com',
        theme: 'light',
        mode: 'redesign',
        customInstructions: 'Make it modern and minimal',
        multiDesign: false
      },
      response: {
        _id: '507f1f77bcf86cd799439011',
        user: '507f1f77bcf86cd799439012',
        source: 'https://example.com',
        uuid: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        status: 'pending',
        instruction: 'Make it modern and minimal',
        multiDesign: false,
        multiDesignlist: [
          { uuid: 'd290f1ee-6c54-4b01-90e6-d701748f0851' }
        ]
      }
    },
    {
      name: 'Get Website Design',
      method: 'GET',
      endpoint: '/website/:id',
      description: 'Retrieve the generated HTML for a specific website design.',
      authentication: 'Bearer Token required',
      request: {
        id: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
      },
      response: {
        html: '<!DOCTYPE html>...',
        status: 'completed'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <Navbar/>
      <div className="max-w-5xl mt-12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">API Documentation</h1>
          <p className="text-slate-400">
            Integrate redesignr.ai's powerful website redesign capabilities into your application
          </p>
        </div>

        <div className="flex items-center bg-slate-800/30 rounded-xl p-1 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-indigo-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('endpoints')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'endpoints'
                ? 'bg-indigo-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="h-4 w-4" />
            Endpoints
          </button>
          <button
            onClick={() => setActiveTab('playground')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'playground'
                ? 'bg-indigo-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Play className="h-4 w-4" />
            Playground
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Key className="h-5 w-5 text-indigo-400" />
                  <h2 className="text-xl font-bold text-white">Getting Started</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300">
                    To get started with the redesignr.ai API, you'll need:
                  </p>
                  <ul className="text-slate-300 space-y-2 mt-4">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full" />
                      An API key from your dashboard
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full" />
                      Sufficient credits in your account
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full" />
                      A website URL to redesign
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-5 w-5 text-indigo-400" />
                  <h2 className="text-xl font-bold text-white">Authentication</h2>
                </div>
                <p className="text-slate-300 mb-4">
                  All API requests require authentication using a Bearer token in the Authorization header.
                </p>
                <CodeBlock
                  code="Authorization: Bearer your-api-token"
                  language="http"
                  onCopy={() => handleCopy("Authorization: Bearer your-api-token", "auth")}
                />
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-5 w-5 text-indigo-400" />
                  <h2 className="text-xl font-bold text-white">Rate Limiting</h2>
                </div>
                <p className="text-slate-300 mb-4">
                  The API is rate limited to ensure fair usage. Current limits are:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white mb-1">100</div>
                    <div className="text-slate-400">Requests per minute</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white mb-1">1,000</div>
                    <div className="text-slate-400">Requests per hour</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white mb-1">10,000</div>
                    <div className="text-slate-400">Requests per day</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="h-5 w-5 text-indigo-400" />
                  <h2 className="text-xl font-bold text-white">Error Handling</h2>
                </div>
                <p className="text-slate-300 mb-4">
                  The API uses conventional HTTP response codes to indicate success or failure.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-green-400 font-mono">200</span>
                    <span className="text-slate-300">Success</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-yellow-400 font-mono">400</span>
                    <span className="text-slate-300">Bad Request - Invalid parameters</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-red-400 font-mono">401</span>
                    <span className="text-slate-300">Unauthorized - Invalid API key</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-red-400 font-mono">429</span>
                    <span className="text-slate-300">Too Many Requests - Rate limit exceeded</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-red-400 font-mono">500</span>
                    <span className="text-slate-300">Server Error - Please try again</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'endpoints' && (
          <div className="space-y-8">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center gap-3 mb-4">
                <Key className="h-5 w-5 text-indigo-400" />
                <h2 className="text-xl font-bold text-white">Authentication</h2>
              </div>
              <p className="text-slate-300 mb-4">
                All API endpoints require authentication using a Bearer token in the Authorization header.
              </p>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <code className="text-indigo-400 font-mono text-sm">
                  Authorization: Bearer your-api-token
                </code>
              </div>
            </div>

            <div className="space-y-8">
              {endpoints.map((endpoint) => (
                <div 
                  key={endpoint.endpoint}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden"
                >
                  <div className="p-6 border-b border-slate-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-white">{endpoint.name}</h2>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          endpoint.method === 'POST' 
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {endpoint.method}
                        </span>
                        <button
                          onClick={() => handleCopy(endpoint.endpoint, endpoint.endpoint)}
                          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                          title="Copy endpoint"
                        >
                          {copiedEndpoint === endpoint.endpoint ? (
                            <Check className="h-4 w-4 text-green-400" />
                          ) : (
                            <Copy className="h-4 w-4 text-slate-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-4">{endpoint.description}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Terminal className="h-4 w-4" />
                      <code className="font-mono">
                        {endpoint.method} {endpoint.endpoint}
                      </code>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-900/30">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-slate-400 mb-3">Request Body</h3>
                        <div className="bg-slate-900/50 rounded-lg p-4">
                          <pre className="text-indigo-400 font-mono text-sm overflow-x-auto">
                            {JSON.stringify(endpoint.request, null, 2)}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-slate-400 mb-3">Response</h3>
                        <div className="bg-slate-900/50 rounded-lg p-4">
                          <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                            {JSON.stringify(endpoint.response, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-slate-700/50 bg-slate-900/30">
                    <h3 className="text-sm font-medium text-slate-400 mb-3">Example Usage</h3>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <pre className="text-purple-400 font-mono text-sm overflow-x-auto">
{`fetch('${endpoint.endpoint}', {
  method: '${endpoint.method}',
  headers: {
    'Authorization': 'Bearer your-api-token',
    'Content-Type': 'application/json'
  }${endpoint.method === 'POST' ? `,
  body: JSON.stringify(${JSON.stringify(endpoint.request, null, 2)})` : ''}
})`}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'playground' && (
          <div className="space-y-8">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Play className="h-5 w-5 text-indigo-400" />
                  <h2 className="text-xl font-bold text-white">API Playground</h2>
                </div>
                <p className="text-slate-300 mb-6">
                  Test our API endpoints directly from your browser. Select an endpoint and provide the required parameters.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    {endpoints.map((endpoint) => (
                      <button
                        key={endpoint.endpoint}
                        onClick={() => setSelectedEndpoint(endpoint.endpoint)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          selectedEndpoint === endpoint.endpoint
                            ? 'bg-indigo-500 text-white'
                            : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {endpoint.name}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ))}
                  </div>

                  {selectedEndpoint && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-slate-400 mb-3">Request</h3>
                        <ApiPlayground
                          endpoint={endpoints.find(e => e.endpoint === selectedEndpoint)}
                          onTest={handleTest}
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-slate-400 mb-3">Response</h3>
                        <div className="bg-slate-900/50 rounded-lg p-6">
                          {response ? (
                            <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                              {JSON.stringify(response, null, 2)}
                            </pre>
                          ) : (
                            <div className="text-slate-400 text-center">
                              Response will appear here after testing the endpoint
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiDocs;