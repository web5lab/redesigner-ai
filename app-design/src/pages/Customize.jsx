import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Sliders, 
  Eye, 
  Save,
  Palette,
  User,
  Type,
  MessageSquare,
  Upload,
  X,
  Crown,
  Sparkles,
  Sun,
  Moon,
  Zap,
  Paintbrush,
  Bot,
  Send,
  Loader2,
  Minimize2,
  Maximize2,
  Settings
} from 'lucide-react'
import { activeBotSelector, uiConfigSelector } from '../store/selectors'
import { setUiConfig } from '../store/slice'
import { updateChatBot, geminiChatApi } from '../store/actions'
import toast from 'react-hot-toast'

// Constants
const COLOR_PALETTES = [
  { primary: '#3B82F6', secondary: '#1c1d1d', bg: '#f0f9ff', theme: 'light', name: 'Ocean Blue' },
  { primary: '#6366F1', secondary: '#EC4899', bg: '#f3f4ff', theme: 'light', name: 'Purple Pink' },
  { primary: '#818CF8', secondary: '#FB7185', bg: '#111827', theme: 'dark', name: 'Dark Violet' },
  { primary: '#10B981', secondary: '#F59E0B', bg: '#f0fdf4', theme: 'light', name: 'Emerald Gold' },
  { primary: '#F59E0B', secondary: '#EF4444', bg: '#fffbeb', theme: 'light', name: 'Sunset' },
  { primary: '#0ea5e9', secondary: '#14b8a6', bg: '#e0f7fa', theme: 'light', name: 'Tropical Aqua' }
]

const FONT_SIZES = [
  { label: 'Small', value: '14px' },
  { label: 'Medium', value: '16px' },
  { label: 'Large', value: '18px' },
  { label: 'Extra Large', value: '20px' }
]

const THINKING_MESSAGES = [
  "Analyzing your request...",
  "Consulting the knowledge base...",
  "Generating the best response...",
  "Processing your question...",
  "Thinking carefully about this..."
]

export function Customize() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const activeBot = useSelector(activeBotSelector)
  const uiConfig = useSelector(uiConfigSelector)
  const [activeTab, setActiveTab] = useState('customize')
  const [saving, setSaving] = useState(false)
  const [botIcon, setBotIcon] = useState(null)
  const [userIcon, setUserIcon] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [thinkingMessage, setThinkingMessage] = useState(THINKING_MESSAGES[0])

  const {
    customPrimaryColor = '#3B82F6',
    customSecondaryColor = '#1c1d1d',
    customBgColor = '#f0f9ff',
    themeMode = 'light',
    botAvatar = '',
    userAvatar = '',
    selectedFontSize = '16px',
    botName = '',
    customQuestions = [],
    systemPrompt = '',
    welcomeMessage = '',
    popupMessage = '',
    messages = [],
    input = ''
  } = uiConfig

  const handleBotAvatarUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => dispatch(setUiConfig({ botAvatar: reader.result }))
      reader.readAsDataURL(file)
      setBotIcon(file)
    }
  }

  const handleUserAvatarUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => dispatch(setUiConfig({ userAvatar: reader.result }))
      reader.readAsDataURL(file)
      setUserIcon(file)
    }
  }

  const handleSaveChanges = async () => {
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append('name', botName)
      if (botIcon) formData.append('icon', botIcon)
      if (userIcon) formData.append('userIcon', userIcon)
      formData.append('botAvatar', botAvatar)
      formData.append('userAvatar', userAvatar)
      formData.append('customPrimaryColor', customPrimaryColor)
      formData.append('customSecondaryColor', customSecondaryColor)
      formData.append('customBgColor', customBgColor)
      formData.append('themeMode', themeMode)
      formData.append('selectedFontSize', selectedFontSize)
      formData.append('customQuestions', JSON.stringify(customQuestions))
      formData.append('systemPrompt', systemPrompt)
      formData.append('welcomeMessage', welcomeMessage || '')
      formData.append('popupMessage', popupMessage || '')

      const response = await updateChatBot({
        data: formData, 
        botId: activeBot._id
      })

      toast.success("Changes saved successfully!")
      setSaving(false)
    } catch (error) {
      console.error("Error saving changes:", error)
      toast.error("Failed to save changes")
      setSaving(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    setIsTyping(true)
    const userMessage = { role: 'user', content: input }
    dispatch(setUiConfig({ 
      messages: [...messages, userMessage],
      input: ''
    }))

    const thinkingInterval = setInterval(() => {
      setThinkingMessage(THINKING_MESSAGES[Math.floor(Math.random() * THINKING_MESSAGES.length)])
    }, 2000)

    try {
      const chatData = await geminiChatApi({
        data: { message: input, botId: activeBot?._id }
      })

      clearInterval(thinkingInterval)
      dispatch(setUiConfig({
        messages: [...messages, userMessage, {
          role: 'bot',
          content: chatData.aiResponse,
          animation: 'fadeIn'
        }]
      }))
    } catch (error) {
      clearInterval(thinkingInterval)
      dispatch(setUiConfig({
        messages: [...messages, userMessage, {
          role: 'bot',
          content: "Sorry, I encountered an error processing your request.",
          isError: true
        }]
      }))
    } finally {
      setIsTyping(false)
    }
  }

  const userMessageStyle = {
    background: `linear-gradient(135deg, ${customPrimaryColor} 0%, ${customSecondaryColor} 100%)`,
    color: 'white',
    fontSize: selectedFontSize,
  }

  const botMessageStyle = {
    backgroundColor: themeMode === 'light' ? 'white' : '#374151',
    color: themeMode === 'light' ? '#111827' : '#f3f4f6',
    fontSize: selectedFontSize,
    boxShadow: themeMode === 'light' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
  }

  const inputSectionStyle = {
    backgroundColor: themeMode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(55, 65, 81, 0.8)',
    borderTopColor: themeMode === 'light' ? 'rgba(229, 231, 235, 1)' : 'rgba(75, 85, 99, 1)',
  }

  const inputFieldStyle = {
    backgroundColor: themeMode === 'light' ? 'white' : '#1f2937',
    color: themeMode === 'light' ? '#111827' : '#f3f4f6',
    borderColor: `${customPrimaryColor}30`,
    fontSize: selectedFontSize,
  }

  const placeholderStyle = themeMode === 'light' ? 'placeholder-gray-500' : 'placeholder-gray-400'
  const textColorTertiary = themeMode === 'light' ? '#9ca3af' : '#6b7280'

  if (!activeBot) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8">
          <Bot className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Bot Selected</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Please select a bot to customize</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Select Bot
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 safe-area-top">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-target"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Customize</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Design your bot</p>
              </div>
            </div>
            
            {saving ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Saving...</span>
              </div>
            ) : (
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </div>
              </button>
            )}
          </div>

          {/* Bot Info */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md ring-2 ring-gray-100 dark:ring-gray-600 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              {activeBot.icon ? (
                <img
                  src={activeBot.icon}
                  alt={activeBot.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900 dark:text-white truncate">{activeBot.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">AI Assistant</p>
            </div>
            <Crown className="w-5 h-5 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="flex">
          <button
            onClick={() => setActiveTab('customize')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 transition-all ${
              activeTab === 'customize'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Sliders className="w-5 h-5" />
            <span className="font-medium">Customize</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 transition-all ${
              activeTab === 'preview'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Eye className="w-5 h-5" />
            <span className="font-medium">Preview</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'customize' ? (
          <div className="p-4 space-y-6">
            {/* Bot Persona Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 shadow-lg">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Bot Persona</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Define personality and behavior</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Bot Name</label>
                  <input
                    type="text"
                    value={botName}
                    onChange={(e) => dispatch(setUiConfig({ botName: e.target.value }))}
                    className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Enter bot name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">System Prompt</label>
                  <textarea
                    value={systemPrompt}
                    onChange={(e) => dispatch(setUiConfig({ systemPrompt: e.target.value }))}
                    className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 min-h-[100px] resize-y"
                    placeholder="Define the bot's personality and behavior..."
                  />
                </div>
              </div>
            </div>

            {/* Appearance Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Appearance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Colors and themes</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Color Schemes</label>
                  <div className="grid grid-cols-2 gap-3">
                    {COLOR_PALETTES.map((palette, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          dispatch(setUiConfig({
                            themeMode: palette.theme,
                            customPrimaryColor: palette.primary,
                            customSecondaryColor: palette.secondary,
                            customBgColor: palette.bg
                          }))
                        }}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          customPrimaryColor === palette.primary
                            ? 'ring-2 ring-offset-2 ring-blue-500 border-blue-500'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-6 h-6 rounded-full shadow-md"
                            style={{ backgroundColor: palette.primary }}
                          />
                          <div
                            className="w-4 h-4 rounded-full shadow-md"
                            style={{ backgroundColor: palette.secondary }}
                          />
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{palette.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{palette.theme}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Theme Mode</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { mode: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
                      { mode: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' }
                    ].map(({ mode, icon, label }) => (
                      <button
                        key={mode}
                        onClick={() => dispatch(setUiConfig({ themeMode: mode }))}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                          themeMode === mode
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                            : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {icon}
                        <span className="font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Typography Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
                  <Type className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Typography</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Text size settings</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Font Size</label>
                <div className="grid grid-cols-2 gap-3">
                  {FONT_SIZES.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => dispatch(setUiConfig({ selectedFontSize: size.value }))}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        selectedFontSize === size.value
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                          : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/10'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold mb-1" style={{ fontSize: size.value }}>Aa</div>
                        <div className="text-xs">{size.label}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Avatar Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Avatars</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Chat profile pictures</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Bot Avatar', current: botAvatar, handler: handleBotAvatarUpload },
                  { title: 'User Avatar', current: userAvatar, handler: handleUserAvatarUpload }
                ].map((avatar) => (
                  <div key={avatar.title}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{avatar.title}</label>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md ring-2 ring-gray-100 dark:ring-gray-600 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        {avatar.current ? (
                          <img src={avatar.current} alt={avatar.title} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <label className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                        <Upload className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={avatar.handler}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 shadow-lg">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Chat Settings</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Messages and behavior</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Welcome Message</label>
                  <textarea
                    value={welcomeMessage}
                    onChange={(e) => dispatch(setUiConfig({ welcomeMessage: e.target.value }))}
                    className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 min-h-[80px] resize-y"
                    placeholder="Enter the first message the bot sends..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Quick Questions</label>
                  <div className="space-y-2">
                    {customQuestions?.map((question, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={question}
                          onChange={(e) => {
                            const newQuestions = [...(customQuestions || [])]
                            newQuestions[index] = e.target.value
                            dispatch(setUiConfig({ customQuestions: newQuestions }))
                          }}
                          className="flex-1 p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter a quick question"
                        />
                        <button
                          onClick={() => {
                            const newQuestions = (customQuestions || []).filter((_, i) => i !== index)
                            dispatch(setUiConfig({ customQuestions: newQuestions }))
                          }}
                          className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        if ((customQuestions || []).length < 5) {
                          dispatch(setUiConfig({
                            customQuestions: [...(customQuestions || []), '']
                          }))
                        }
                      }}
                      className="w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 hover:border-orange-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all flex items-center justify-center gap-2"
                      disabled={(customQuestions || []).length >= 5}
                    >
                      <Zap className="w-4 h-4" />
                      Add Quick Question ({(customQuestions || []).length}/5)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Preview Tab */
          <div className="p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 max-w-sm mx-auto">
              {/* Chat Header */}
              <div
                className="p-4 text-white relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${customPrimaryColor} 0%, ${customSecondaryColor} 100%)`,
                }}
              >
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10"></div>
                </div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                      {botAvatar ? (
                        <img src={botAvatar} alt="Bot" className="w-8 h-8 rounded-xl object-cover" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-white font-bold">{botName || 'AI Assistant'}</h2>
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        {isTyping ? (
                          <>
                            <div className="flex space-x-1">
                              <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce"></div>
                              <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                            <span>Typing...</span>
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>Online</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors">
                      <Minimize2 className="w-4 h-4 text-white" />
                    </button>
                    <button className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors">
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="h-80 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: customBgColor }}>
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${customPrimaryColor}20` }}>
                      <Sparkles className="w-6 h-6" style={{ color: customPrimaryColor }} />
                    </div>
                    <h3 className="font-bold mb-2" style={{ color: themeMode === 'light' ? customPrimaryColor : 'white' }}>
                      {botName || 'AI Assistant'}
                    </h3>
                    <p className="text-sm" style={{ color: themeMode === 'light' ? '#6b7280' : '#9ca3af' }}>
                      {welcomeMessage || 'Hello! How can I help you today?'}
                    </p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-start gap-2 max-w-[85%]`}>
                        {message.role === 'bot' && (
                          <div className="w-8 h-8 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                            {botAvatar ? (
                              <img src={botAvatar} alt="Bot" className="w-6 h-6 rounded-xl object-cover" />
                            ) : (
                              <Bot className="w-4 h-4" style={{ color: customPrimaryColor }} />
                            )}
                          </div>
                        )}

                        <div
                          className={`rounded-2xl px-4 py-3 shadow-lg ${
                            message.role === 'user' ? 'rounded-br-none' : 'rounded-bl-none'
                          }`}
                          style={message.role === 'user' ? userMessageStyle : botMessageStyle}
                        >
                          <p className="leading-relaxed" style={{ fontSize: selectedFontSize }}>
                            {message.content}
                          </p>
                        </div>

                        {message.role === 'user' && (
                          <div className="w-8 h-8 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-600 shadow-lg flex items-center justify-center">
                            {userAvatar ? (
                              <img src={userAvatar} alt="User" className="w-6 h-6 rounded-xl object-cover" />
                            ) : (
                              <User className="w-4 h-4 text-white" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                        {botAvatar ? (
                          <img src={botAvatar} alt="Bot" className="w-6 h-6 rounded-xl object-cover" />
                        ) : (
                          <Bot className="w-4 h-4" style={{ color: customPrimaryColor }} />
                        )}
                      </div>
                      <div className="rounded-2xl rounded-bl-none px-4 py-3 shadow-lg" style={botMessageStyle}>
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: customPrimaryColor }}></div>
                            <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: customPrimaryColor, animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: customPrimaryColor, animationDelay: '300ms' }}></div>
                          </div>
                          <span className="text-sm italic" style={{ color: themeMode === 'light' ? '#6b7280' : '#9ca3af' }}>
                            {thinkingMessage}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t backdrop-blur-sm" style={inputSectionStyle}>
                {customQuestions.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {customQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => dispatch(setUiConfig({ input: question }))}
                        className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 shadow-sm"
                        style={{
                          backgroundColor: `${customPrimaryColor}15`,
                          color: customPrimaryColor,
                          border: `1px solid ${customPrimaryColor}30`
                        }}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex items-end gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      value={input}
                      onChange={e => dispatch(setUiConfig({ input: e.target.value }))}
                      placeholder="Ask me anything..."
                      rows={1}
                      className={`w-full px-4 py-3 pr-12 rounded-2xl border-2 focus:outline-none focus:ring-2 transition-all resize-none shadow-sm ${placeholderStyle}`}
                      style={{
                        ...inputFieldStyle,
                        '--tw-ring-color': `${customPrimaryColor}40`,
                        minHeight: '48px',
                        maxHeight: '100px'
                      }}
                      disabled={isTyping}
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-3 rounded-2xl transition-all shadow-lg hover:shadow-xl group text-white hover:scale-105"
                    style={{
                      backgroundColor: isTyping || !input.trim() ? '#9ca3af' : customPrimaryColor,
                      background: !isTyping && input.trim() ? `linear-gradient(135deg, ${customPrimaryColor} 0%, ${customSecondaryColor} 100%)` : undefined
                    }}
                    disabled={isTyping || !input.trim()}
                  >
                    {isTyping ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}