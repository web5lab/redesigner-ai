import { useState } from 'react';
import { useBot } from '../contexts/BotContext';
import { 
  Bot, 
  Save, 
  Globe, 
  Shield,
  Settings as SettingsIcon,
  Plus,
  Trash2
} from 'lucide-react';

export function BotSettings() {
  const { selectedBot } = useBot();
  const [settings, setSettings] = useState({
    maxChatTextSize: 1000,
    urlWhitelist: ['https://example.com', 'https://api.trusted-service.com']
  });

  const [newUrl, setNewUrl] = useState('');

  const handleSave = () => {
    console.log('Saving bot settings:', settings);
    // Save logic here
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const addUrl = () => {
    if (newUrl.trim() && !settings.urlWhitelist.includes(newUrl.trim())) {
      setSettings(prev => ({
        ...prev,
        urlWhitelist: [...prev.urlWhitelist, newUrl.trim()]
      }));
      setNewUrl('');
    }
  };

  const removeUrl = (urlToRemove) => {
    setSettings(prev => ({
      ...prev,
      urlWhitelist: prev.urlWhitelist.filter(url => url !== urlToRemove)
    }));
  };

  if (!selectedBot) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Bot Selected</h2>
          <p className="text-gray-600">Please select a bot to configure its settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none -z-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative max-w-4xl mx-auto p-6 space-y-8 z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Bot className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Bot Settings
              </h1>
              <p className="text-gray-600">Configure {selectedBot.name} security settings</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Save className="w-5 h-5" />
            <span className="font-semibold">Save Settings</span>
          </button>
        </div>

        {/* Settings Cards */}
        <div className="space-y-6">
          {/* Abuse Protection */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Abuse Protection</h2>
                <p className="text-gray-600">Configure limits to prevent abuse</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Chat Text Size (characters)
              </label>
              <input
                type="number"
                value={settings.maxChatTextSize}
                onChange={(e) => updateSetting('maxChatTextSize', parseInt(e.target.value) || 0)}
                min="100"
                max="10000"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/30 focus:border-transparent"
                placeholder="Enter maximum characters allowed per message"
              />
              <p className="text-sm text-gray-500 mt-1">
                Messages longer than this limit will be rejected
              </p>
            </div>
          </div>

          {/* URL Whitelist */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">URL Whitelist</h2>
                <p className="text-gray-600">Allowed domains for bot interactions</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Add New URL */}
              <div className="flex gap-3">
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/30 focus:border-transparent"
                />
                <button
                  onClick={addUrl}
                  disabled={!newUrl.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add
                </button>
              </div>

              {/* URL List */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Whitelisted URLs:</h3>
                {settings.urlWhitelist.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Globe className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No URLs in whitelist</p>
                    <p className="text-sm">Add URLs that your bot is allowed to access</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {settings.urlWhitelist.map((url, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900 font-mono text-sm">{url}</span>
                        </div>
                        <button
                          onClick={() => removeUrl(url)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}