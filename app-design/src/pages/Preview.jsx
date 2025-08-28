import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  Palette, 
  Type, 
  User, 
  Save,
  Eye,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react'
import { uiConfigSelector } from '../store/selectors'
import { setUiConfig } from '../store/slice'
import { MobileChatPreview } from '../components/MobileChatPreview'

const colorPalettes = [
  { primary: '#3B82F6', secondary: '#1c1d1d', bg: '#f0f9ff', name: 'Ocean Blue' },
  { primary: '#6366F1', secondary: '#EC4899', bg: '#f3f4ff', name: 'Purple Pink' },
  { primary: '#10B981', secondary: '#F59E0B', bg: '#f0fdf4', name: 'Emerald Gold' },
  { primary: '#F59E0B', secondary: '#EF4444', bg: '#fffbeb', name: 'Sunset' }
]

const fontSizes = [
  { label: 'Small', value: '14px' },
  { label: 'Medium', value: '16px' },
  { label: 'Large', value: '18px' }
]

export function Preview() {
  const dispatch = useDispatch()
  const uiConfig = useSelector(uiConfigSelector)
  const [previewMode, setPreviewMode] = useState('mobile')

  const updateConfig = (updates) => {
    dispatch(setUiConfig(updates))
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Chat Preview</h1>
            <p className="text-sm text-gray-600">Customize your chat appearance</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-2 rounded-xl transition-all touch-target ${
                previewMode === 'mobile' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-2 rounded-xl transition-all touch-target ${
                previewMode === 'desktop' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Customization Panel */}
          <div className="w-full max-w-sm bg-white/80 backdrop-blur-sm border-r border-gray-200 overflow-y-auto custom-scrollbar">
            <div className="p-4 space-y-6">
              {/* Colors */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-600" />
                  Colors
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {colorPalettes.map((palette, index) => (
                    <button
                      key={index}
                      onClick={() => updateConfig({
                        customPrimaryColor: palette.primary,
                        customSecondaryColor: palette.secondary,
                        customBgColor: palette.bg
                      })}
                      className="p-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all haptic-light"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: palette.primary }}
                        />
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: palette.secondary }}
                        />
                      </div>
                      <p className="text-xs font-medium text-gray-700">{palette.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Type className="w-5 h-5 text-green-600" />
                  Typography
                </h3>
                
                <div className="space-y-3">
                  {fontSizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => updateConfig({ selectedFontSize: size.value })}
                      className={`w-full p-3 rounded-xl border-2 transition-all haptic-light ${
                        uiConfig.selectedFontSize === size.value
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold mb-1" style={{ fontSize: size.value }}>Aa</div>
                        <div className="text-xs text-gray-600">{size.label}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bot Settings */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Bot Settings
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bot Name</label>
                    <input
                      type="text"
                      value={uiConfig.botName || ''}
                      onChange={(e) => updateConfig({ botName: e.target.value })}
                      placeholder="AI Assistant"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Message</label>
                    <textarea
                      value={uiConfig.welcomeMessage || ''}
                      onChange={(e) => updateConfig({ welcomeMessage: e.target.value })}
                      placeholder="Hello! How can I help you?"
                      rows={3}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all haptic-medium">
                <div className="flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </div>
              </button>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 flex items-center justify-center p-4 bg-gray-100">
            <div className={`${previewMode === 'mobile' ? 'w-80 h-[600px]' : 'w-96 h-[500px]'} transition-all duration-300`}>
              <MobileChatPreview config={uiConfig} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}