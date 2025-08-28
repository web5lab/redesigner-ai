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
  Check,
  Loader2,
  CheckCircle,
  AlertCircle,
  Trash2
} from 'lucide-react'
import { TrainingStats } from '../components/TrainingStats'

const tabs = [
  { id: 'pdf', label: 'PDFs', icon: FileText, color: 'text-red-500 bg-red-100' },
  { id: 'web', label: 'Websites', icon: Globe, color: 'text-blue-500 bg-blue-100' },
  { id: 'text', label: 'Text', icon: Type, color: 'text-green-500 bg-green-100' },
  { id: 'qa', label: 'Q&A', icon: MessageSquare, color: 'text-purple-500 bg-purple-100' }
]

const mockTrainingData = {
  pdf: [
    { name: 'Product Manual.pdf', status: 'completed', size: 2048000, uploadedAt: new Date(Date.now() - 1000 * 60 * 30) },
    { name: 'FAQ Document.pdf', status: 'processing', size: 1024000, uploadedAt: new Date(Date.now() - 1000 * 60 * 5) }
  ],
  web: [
    { url: 'https://example.com/help', status: 'completed', pages: 15, uploadedAt: new Date(Date.now() - 1000 * 60 * 60) },
    { url: 'https://docs.example.com', status: 'processing', pages: 8, uploadedAt: new Date(Date.now() - 1000 * 60 * 10) }
  ],
  text: [
    { content: 'Company policies and procedures for customer service...', status: 'completed', uploadedAt: new Date(Date.now() - 1000 * 60 * 120) },
    { content: 'Product specifications and technical details...', status: 'completed', uploadedAt: new Date(Date.now() - 1000 * 60 * 180) }
  ],
  qa: [
    { question: 'What are your business hours?', answer: 'We are open Monday to Friday, 9 AM to 6 PM EST.' },
    { question: 'How do I reset my password?', answer: 'Click on "Forgot Password" on the login page and follow the instructions.' },
    { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, PayPal, and bank transfers.' }
  ]
}
export function Training() {
  const [activeTab, setActiveTab] = useState('pdf')
  const [trainingData, setTrainingData] = useState(mockTrainingData)
  const [newQA, setNewQA] = useState({ question: '', answer: '' })
  const [newUrl, setNewUrl] = useState('')
  const [newText, setNewText] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      setTrainingData(prev => ({
        ...prev,
        pdf: [...prev.pdf, { 
          name: file.name, 
          status: 'processing', 
          size: file.size,
          uploadedAt: new Date()
        }]
      }))
      
      // Simulate upload process
      setTimeout(() => {
        setTrainingData(prev => ({
          ...prev,
          pdf: prev.pdf.map(item => 
            item.name === file.name 
              ? { ...item, status: 'completed' }
              : item
          )
        }))
        setIsUploading(false)
      }, 2000)
    }
  }

  const handleUrlAdd = () => {
    if (newUrl.trim()) {
      setTrainingData(prev => ({
        ...prev,
        web: [...prev.web, { 
          url: newUrl, 
          status: 'processing',
          pages: 0,
          uploadedAt: new Date()
        }]
      }))
      setNewUrl('')
      
      // Simulate processing
      setTimeout(() => {
        setTrainingData(prev => ({
          ...prev,
          web: prev.web.map(item => 
            item.url === newUrl 
              ? { ...item, status: 'completed', pages: Math.floor(Math.random() * 20) + 1 }
              : item
          )
        }))
      }, 3000)
    }
  }

  const handleTextAdd = () => {
    if (newText.trim()) {
      setTrainingData(prev => ({
        ...prev,
        text: [...prev.text, { 
          content: newText.length > 100 ? newText.substring(0, 100) + '...' : newText, 
          status: 'completed',
          uploadedAt: new Date()
        }]
      }))
      setNewText('')
    }
  }

  const handleQAAdd = () => {
    if (newQA.question.trim() && newQA.answer.trim()) {
      setTrainingData(prev => ({
        ...prev,
        qa: [...prev.qa, { 
          ...newQA, 
          id: Date.now(),
          uploadedAt: new Date()
        }]
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

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatTimestamp = (date) => {
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return `${Math.max(1, minutes)}m ago`
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
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
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <div className="p-2 rounded-lg bg-red-100 text-red-600">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{formatFileSize(item.size)}</span>
                      <span>•</span>
                      <span>{formatTimestamp(item.uploadedAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <button
                      onClick={() => removeItem('pdf', index)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all touch-target"
                    >
                      <Trash2 className="w-4 h-4" />
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
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.url}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="capitalize">{item.status}</span>
                      {item.pages > 0 && (
                        <>
                          <span>•</span>
                          <span>{item.pages} pages</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{formatTimestamp(item.uploadedAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <button
                      onClick={() => removeItem('web', index)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all touch-target"
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
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <div className="p-2 rounded-lg bg-green-100 text-green-600">
                    <Type className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.content}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Text content</span>
                      <span>•</span>
                      <span>{formatTimestamp(item.uploadedAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <button
                      onClick={() => removeItem('text', index)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all touch-target"
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
                <div key={item.id || index} className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-gray-900 text-sm">Q&A Pair {index + 1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <button
                        onClick={() => removeItem('qa', index)}
                        className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all touch-target"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
                    {item.uploadedAt && (
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-xs text-gray-400">Added {formatTimestamp(item.uploadedAt)}</p>
                      </div>
                    )}
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
      {/* Training Stats */}
      <div className="p-4">
        <TrainingStats trainingData={trainingData} />
      </div>

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
            {isUploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Brain className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-semibold">
              {isUploading ? 'Processing Data' : 'Training Status'}
            </p>
            <p className="text-sm text-green-100">
              {isUploading ? 'Uploading and processing...' : `${Object.values(trainingData).flat().length} sources ready`}
            </p>
          </div>
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-medium transition-all haptic-medium">
            {isUploading ? 'Processing...' : 'Start Training'}
          </button>
        </div>
      </div>
    </div>
  )
}