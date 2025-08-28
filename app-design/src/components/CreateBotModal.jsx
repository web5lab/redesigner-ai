import { useState } from 'react'
import { 
  X, 
  Bot, 
  Save,
  Sparkles
} from 'lucide-react'

export function CreateBotModal({ onClose }) {
  const [botName, setBotName] = useState('')

  const handleCreate = () => {
    if (!botName.trim()) return
    
    // Create bot logic here
    console.log('Creating bot:', botName)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-white/50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10"></div>
          </div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/20">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Create AI Bot</h2>
                <p className="text-white/80 text-sm">Build your assistant</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors touch-target"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Name Your Bot</h3>
            <p className="text-gray-600">Give your AI assistant a name</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Bot Name
            </label>
            <input
              type="text"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              placeholder="e.g., Support Assistant"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              autoFocus
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-3xl">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 text-gray-700 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition-all haptic-light"
            >
              Cancel
            </button>
            
            <button
              onClick={handleCreate}
              disabled={!botName.trim()}
              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium disabled:bg-gray-300 transition-all haptic-medium"
            >
              <div className="flex items-center justify-center gap-2">
                <Save className="w-4 h-4" />
                Create
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}