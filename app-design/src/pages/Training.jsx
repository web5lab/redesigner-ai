import { useState } from 'react'
import { 
  Upload, 
  Globe, 
  Type, 
  MessageSquare, 
  Plus, 
  FileText,
  Brain,
  Target,
  Zap,
  X,
  Check
} from 'lucide-react'

const tabs = [
  { id: 'pdf', label: 'PDFs', icon: FileText, color: 'text-red-500 bg-red-100' },
  { id: 'web', label: 'Websites', icon: Globe, color: 'text-blue-500 bg-blue-100' },
  { id: 'text', label: 'Text', icon: Type, color: 'text-green-500 bg-green-100' },
  { id: 'qa', label: 'Q&A', icon: MessageSquare, color: 'text-purple-500 bg-purple-100' }
]

export function Training() {
  const [activeTab, setActiveTab] = useState('pdf')
  const [trainingData, setTrainingData] = useState({
    pdf: [],
    web: [],
    text: [],
    qa: []
  })
  const [newQA, setNewQA] = useState({ question: '', answer: '' })
  const [newUrl, setNewUrl] = useState('')
  const [newText, setNewText] = useState('')

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setTrainingData(prev => ({
        ...prev,
        pdf: [...prev.pdf, { name: file.name, status: 'processing', size: file.size }]
      }))
    }
  }

  const handleUrlAdd = () => {
    if (newUrl.trim()) {
      setTrainingData(prev => ({
        ...prev,
        web: [...prev.web, { url: newUrl, status: 'processing' }]
      }))
      setNewUrl('')
    }
  }

  const handleTextAdd = () => {
    if (newText.trim()) {
      setTrainingData(prev => ({
        ...prev,
        text: [...prev.text, { content: newText.substring(0, 100) + '...', status: 'completed' }]
      }))
      setNewText('')
    }
  }

  const handleQAAdd = () => {
    if (newQA.question.trim() && newQA.answer.trim()) {
      setTrainingData(prev => ({
        ...prev,
        qa: [...prev.qa, { ...newQA, id: Date.now() }]
      }))
      setNewQA({ question: '', answer: '' })
    }
  }

  const removeItem = (type, index) => {
    setTrainingData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'pdf':
        return (
          <div className="space-y-4">
            <label className="block w-full cursor-pointer">
              <input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileUpload}
                className="hidden" 
              />
              <div className="border-2 border-dashed border-blue-300 rounded-2xl p-6 text-center bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all">
                <Upload className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Upload PDF</h3>
                <p className="text-sm text-gray-600">Tap to select PDF files</p>
              </div>
            </label>

            <div className="space-y-3">
              {trainingData.pdf.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200">
                  <div className="p-2 rounded-lg bg-red-100 text-red-600">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{(item.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.status === 'completed' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    )}
                    <button
                      onClick={() => removeItem('pdf', index)}
                      className="p-1 text-gray-400 hover:text-red-500 touch-target"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'web':
        return (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <button
                onClick={handleUrlAdd}
                disabled={!newUrl.trim()}
                className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl disabled:bg-gray-300 transition-all haptic-medium"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {trainingData.web.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.url}</p>
                    <p className="text-xs text-gray-500 capitalize">{item.status}</p>
                  </div>
                  <button
                    onClick={() => removeItem('web', index)}
                    className="p-1 text-gray-400 hover:text-red-500 touch-target"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )

      case 'text':
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Enter your training text here..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
              />
              <button
                onClick={handleTextAdd}
                disabled={!newText.trim()}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl disabled:bg-gray-300 transition-all font-medium haptic-medium"
              >
                Add Text Content
              </button>
            </div>

            <div className="space-y-3">
              {trainingData.text.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200">
                  <div className="p-2 rounded-lg bg-green-100 text-green-600">
                    <Type className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.content}</p>
                    <p className="text-xs text-gray-500">Text content</p>
                  </div>
                  <button
                    onClick={() => removeItem('text', index)}
                    className="p-1 text-gray-400 hover:text-red-500 touch-target"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )

      case 'qa':
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <input
                type="text"
                value={newQA.question}
                onChange={(e) => setNewQA(prev => ({ ...prev, question: e.target.value }))}
                placeholder="Enter question..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              />
              <textarea
                value={newQA.answer}
                onChange={(e) => setNewQA(prev => ({ ...prev, answer: e.target.value }))}
                placeholder="Enter answer..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
              />
              <button
                onClick={handleQAAdd}
                disabled={!newQA.question.trim() || !newQA.answer.trim()}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl disabled:bg-gray-300 transition-all font-medium haptic-medium"
              >
                Add Q&A Pair
              </button>
            </div>

            <div className="space-y-3">
              {trainingData.qa.map((item, index) => (
                <div key={item.id} className="p-4 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-gray-900 text-sm">Q&A {index + 1}</span>
                    </div>
                    <button
                      onClick={() => removeItem('qa', index)}
                      className="p-1 text-gray-400 hover:text-red-500 touch-target"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Question:</p>
                      <p className="text-sm text-gray-900">{item.question}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Answer:</p>
                      <p className="text-sm text-gray-600">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Tab Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all haptic-light ${
                activeTab === tab.id
                  ? 'bg-white shadow-lg scale-105'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className={`p-2 rounded-lg ${tab.color}`}>
                <tab.icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-gray-700">{tab.label}</span>
              <span className="text-xs text-gray-500">
                {trainingData[tab.id].length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {renderTabContent()}
      </div>

      {/* Training Status */}
      <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl">
            <Brain className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Training Status</p>
            <p className="text-sm text-green-100">Ready to train with your data</p>
          </div>
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-medium transition-all haptic-medium">
            Start Training
          </button>
        </div>
      </div>
    </div>
  )
}