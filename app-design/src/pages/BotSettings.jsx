import { useState } from 'react'
import { useSelector } from 'react-redux'
import { 
  Bot, 
  Globe, 
  Shield, 
  Zap, 
  Save,
  Plus,
  X,
  Settings as SettingsIcon
} from 'lucide-react'
import { activeBotSelector } from '../store/selectors'

export function BotSettings() {
  const activeBot = useSelector(activeBotSelector)
  const [settings, setSettings] = useState({
    maxChatTextSize: 1000,
    urlWhitelist: ['https://example.com'],
    responseTimeout: 30,
    enableLogging: true
  })
  const [newUrl, setNewUrl] = useState('')

  const addUrl = () => {
    if (newUrl.trim() && !settings.urlWhitelist.includes(newUrl.trim())) {
      setSettings(prev => ({
        ...prev,
        urlWhitelist: [...prev.urlWhitelist, newUrl.trim()]
      }))
      setNewUrl('')
    }
  }

  const removeUrl = (urlToRemove) => {
    setSettings(prev => ({
      ...prev,
      urlWhitelist: prev.urlWhitelist.filter(url => url !== urlToRemove)
    }))
  }

  if (!activeBot) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Bot Selected</h2>
          <p className="text-gray-600">Select a bot to configure settings</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden">
              <img
                src={activeBot.icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(activeBot.name)}&background=3b82f6&color=ffffff&size=48`}
                alt={activeBot.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{activeBot.name}</h1>
              <p className="text-sm text-gray-600">Bot Configuration</p>
            </div>
          </div>
        </div>

        {/* Abuse Protection */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-red-100 text-red-600">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Abuse Protection</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Message Length
              </label>
              <input
                type="number"
                value={settings.maxChatTextSize}
                onChange={(e) => setSettings(prev => ({ ...prev, maxChatTextSize: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">Characters per message</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response Timeout (seconds)
              </label>
              <input
                type="number"
                value={settings.responseTimeout}
                onChange={(e) => setSettings(prev => ({ ...prev, responseTimeout: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>
        </div>

        {/* URL Whitelist */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-green-100 text-green-600">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">URL Whitelist</h2>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
              />
              <button
                onClick={addUrl}
                disabled={!newUrl.trim()}
                className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl disabled:bg-gray-300 transition-all haptic-medium"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {settings.urlWhitelist.map((url, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="flex-1 text-sm font-mono text-gray-900 truncate">{url}</span>
                  <button
                    onClick={() => removeUrl(url)}
                    className="p-1 text-gray-400 hover:text-red-500 touch-target"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Advanced</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900">Enable Logging</p>
                <p className="text-sm text-gray-600">Log all conversations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableLogging}
                  onChange={(e) => setSettings(prev => ({ ...prev, enableLogging: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all haptic-medium">
          <div className="flex items-center justify-center gap-2">
            <Save className="w-5 h-5" />
            Save Settings
          </div>
        </button>
      </div>
    </div>
  )
}