import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  Brain, 
  FileText, 
  Globe, 
  Type, 
  MessageSquare, 
  Upload, 
  Plus, 
  X, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Trash2,
  ArrowLeft,
  ChevronDown,
  Check,
  Bot,
  Target,
  Zap
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { botsSelector, activeBotSelector } from '../store/selectors'
import { setActiveBot } from '../store/slice'
import { scrapPdfData, scrapWebsiteUrl } from '../store/actions'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_SOURCES = 20
const MAX_TEXT_LENGTH = 5000

export function Training() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const bots = useSelector(botsSelector)
  const activeBot = useSelector(activeBotSelector)
  const [activeTab, setActiveTab] = useState('pdf')
  const [showBotSelector, setShowBotSelector] = useState(false)
  const [trainingItems, setTrainingItems] = useState({
    pdf: [],
    websites: [],
    text: []
  })

  const fileInputRef = useRef(null)

  const tabs = [
    { 
      key: 'pdf', 
      label: 'PDF', 
      icon: FileText, 
      gradient: 'from-red-500 to-pink-500',
      description: 'Upload PDF documents'
    },
    { 
      key: 'websites', 
      label: 'Websites', 
      icon: Globe, 
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Scrape web content'
    },
    { 
      key: 'text', 
      label: 'Text', 
      icon: Type, 
      gradient: 'from-green-500 to-emerald-500',
      description: 'Add custom text'
    },
    { 
      key: 'qa', 
      label: 'Q&A', 
      icon: MessageSquare, 
      gradient: 'from-purple-500 to-indigo-500',
      description: 'Question-answer pairs'
    }
  ]

  const handleBotChange = (bot) => {
    dispatch(setActiveBot(bot))
    setShowBotSelector(false)
    // Reset training items when switching bots
    setTrainingItems({
      pdf: [],
      websites: [],
      text: []
    })
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      alert('File size must be less than 10MB')
      return
    }

    if (trainingItems.pdf.length >= MAX_SOURCES) {
      alert('Maximum number of sources reached')
      return
    }

    setTrainingItems(prev => ({
      ...prev,
      pdf: [...prev.pdf, { name: file.name, status: 'processing' }]
    }))

    const formData = new FormData()
    formData.append('pdf', file)

    try {
      await dispatch(scrapPdfData({ data: formData }))
      setTrainingItems(prev => ({
        ...prev,
        pdf: prev.pdf.map(item =>
          item.name === file.name ? { ...item, status: 'completed' } : item
        )
      }))
    } catch (error) {
      setTrainingItems(prev => ({
        ...prev,
        pdf: prev.pdf.map(item =>
          item.name === file.name ? { ...item, status: 'failed' } : item
        )
      }))
    }
  }

  const handleWebsiteAdd = async (e) => {
    e.preventDefault()
    const url = new FormData(e.currentTarget).get('url')
    if (!url) return

    if (trainingItems.websites.length >= MAX_SOURCES) {
      alert('Maximum number of sources reached')
      return
    }

    setTrainingItems(prev => ({
      ...prev,
      websites: [...prev.websites, { name: url.toString(), status: 'processing' }]
    }))

    try {
      await dispatch(scrapWebsiteUrl({ url: url.toString() }))
      setTrainingItems(prev => ({
        ...prev,
        websites: prev.websites.map(item =>
          item.name === url.toString() ? { ...item, status: 'completed' } : item
        )
      }))
    } catch (error) {
      setTrainingItems(prev => ({
        ...prev,
        websites: prev.websites.map(item =>
          item.name === url.toString() ? { ...item, status: 'failed' } : item
        )
      }))
    }

    e.currentTarget.reset()
  }

  const handleTextAdd = (e) => {
    e.preventDefault()
    const text = new FormData(e.currentTarget).get('text')
    if (!text) return

    if (trainingItems.text.length >= MAX_SOURCES) {
      alert('Maximum number of sources reached')
      return
    }

    setTrainingItems(prev => ({
      ...prev,
      text: [...prev.text, { 
        name: `Text Document ${prev.text.length + 1}`, 
        content: text.toString(), 
        status: 'completed' 
      }]
    }))

    e.currentTarget.reset()
  }

  const removeItem = (type, index) => {
    setTrainingItems(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-500 animate-spin" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getTabStats = (key) => {
    return trainingItems[key]?.length || 0
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'pdf':
        return (
          <div className="space-y-4">
            {/* Upload Section */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-4 border border-red-200 dark:border-red-800">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center gap-3 p-6 border-2 border-dashed border-red-300 dark:border-red-700 rounded-xl hover:border-red-400 dark:hover:border-red-600 transition-colors"
                disabled={trainingItems.pdf.length >= MAX_SOURCES}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Upload PDF</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Max 10MB per file</p>
                </div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Items List */}
            <div className="space-y-2">
              {trainingItems.pdf.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PDF Document</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <button
                      onClick={() => removeItem('pdf', index)}
                      className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'websites':
        return (
          <div className="space-y-4">
            {/* Add Website Form */}
            <form onSubmit={handleWebsiteAdd} className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Add Website</h3>
                </div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    name="url"
                    placeholder="https://example.com"
                    className="flex-1 px-4 py-3 rounded-xl border border-blue-200 dark:border-blue-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    disabled={trainingItems.websites.length >= MAX_SOURCES}
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>

            {/* Items List */}
            <div className="space-y-2">
              {trainingItems.websites.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{item.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Website Content</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <button
                      onClick={() => removeItem('websites', index)}
                      className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'text':
        return (
          <div className="space-y-4">
            {/* Add Text Form */}
            <form onSubmit={handleTextAdd} className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4 border border-green-200 dark:border-green-800">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Type className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Add Text Content</h3>
                </div>
                <textarea
                  name="text"
                  placeholder="Enter your training text here..."
                  maxLength={MAX_TEXT_LENGTH}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  required
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Max {MAX_TEXT_LENGTH.toLocaleString()} characters
                  </span>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    disabled={trainingItems.text.length >= MAX_SOURCES}
                  >
                    Add Text
                  </button>
                </div>
              </div>
            </form>

            {/* Items List */}
            <div className="space-y-2">
              {trainingItems.text.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <Type className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Custom Text</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <button
                      onClick={() => removeItem('text', index)}
                      className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'qa':
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-4 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Q&A Training</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Create question-answer pairs to train your AI assistant
              </p>
              <button className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Plus className="w-4 h-4" />
                Add Q&A Pair
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header with Bot Selector */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 safe-area-top">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-target"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Training</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Train your AI assistant</p>
              </div>
            </div>
          </div>

          {/* Bot Selector */}
          <div className="relative">
            <button
              onClick={() => setShowBotSelector(!showBotSelector)}
              className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-2xl border border-gray-200 dark:border-gray-600 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md ring-2 ring-gray-100 dark:ring-gray-600 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                {activeBot?.icon ? (
                  <img
                    src={activeBot.icon}
                    alt={activeBot.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <h2 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  {activeBot?.name || 'Select Bot'}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activeBot ? 'Training data' : 'Choose bot to train'}
                </p>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showBotSelector ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showBotSelector && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-64 overflow-y-auto animate-slide-down">
                <div className="p-2">
                  {bots.map((bot) => (
                    <button
                      key={bot._id}
                      onClick={() => handleBotChange(bot)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                        activeBot?._id === bot._id
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl overflow-hidden shadow-md ring-2 ring-gray-100 dark:ring-gray-600 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        {bot.icon ? (
                          <img
                            src={bot.icon}
                            alt={bot.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <h3 className="text-sm font-semibold truncate">{bot.name}</h3>
                        <p className="text-xs opacity-75 truncate">
                          {bot.description || 'AI Assistant'}
                        </p>
                      </div>
                      {activeBot?._id === bot._id && (
                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </button>
                  ))}
                  
                  {bots.length === 0 && (
                    <div className="p-4 text-center">
                      <Bot className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">No bots available</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 transition-all ${
                activeTab === tab.key
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.key 
                  ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {getTabStats(tab.key)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4">
          {activeBot ? (
            renderTabContent()
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Select a Bot</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Choose a bot from the dropdown above to start training
              </p>
              <button
                onClick={() => setShowBotSelector(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Select Bot
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}