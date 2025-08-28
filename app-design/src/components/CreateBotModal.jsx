import { useState } from 'react'
import { 
  X, 
  Bot, 
  Globe, 
  Upload, 
  FileText,
  Save,
  Sparkles
} from 'lucide-react'

export function CreateBotModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [botData, setBotData] = useState({
    name: '',
    websiteUrl: '',
    description: ''
  })

  const handleCreate = () => {
    // Create bot logic here
    console.log('Creating bot:', botData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-white/50 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10"></div>
          </div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Create AI Bot</h2>
                <p className="text-white/80 text-sm">Step {step} of 2</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors touch-target"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="w-full bg-white/20 rounded-full h-1">
              <div
                className="bg-white rounded-full h-1 transition-all duration-500"
                style={{ width: `${(step / 2) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {step === 1 ? (
            <>
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Bot Details</h3>
                <p className="text-gray-600">Give your AI assistant a name and purpose</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bot Name *
                  </label>
                  <input
                    type="text"
                    value={botData.name}
                    onChange={(e) => setBotData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Support Assistant"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={botData.websiteUrl}
                      onChange={(e) => setBotData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                      placeholder="https://example.com"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={botData.description}
                    onChange={(e) => setBotData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="What will this bot help with?"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <FileText className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Training Data</h3>
                <p className="text-gray-600">Add content to train your bot (optional)</p>
              </div>

              <div className="space-y-4">
                <label className="block w-full cursor-pointer">
                  <div className="border-2 border-dashed border-blue-300 rounded-2xl p-6 text-center bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all">
                    <Upload className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-1">Upload Documents</h4>
                    <p className="text-sm text-gray-600">PDF files, text documents</p>
                  </div>
                  <input type="file" accept=".pdf,.txt" multiple className="hidden" />
                </label>

                <div className="text-center text-gray-500">
                  <p className="text-sm">or</p>
                </div>

                <button className="w-full p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all haptic-light">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Scan Website</p>
                      <p className="text-sm text-gray-600">Auto-extract content from your site</p>
                    </div>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 py-3 text-gray-700 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition-all haptic-light"
              >
                Back
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex-1 py-3 text-gray-700 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition-all haptic-light"
              >
                Cancel
              </button>
            )}
            
            {step < 2 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!botData.name.trim()}
                className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium disabled:bg-gray-300 transition-all haptic-medium"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleCreate}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium transition-all haptic-medium"
              >
                <div className="flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  Create Bot
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}