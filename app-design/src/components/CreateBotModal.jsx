import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  X,
  Upload,
  Bot,
  Sparkles,
  Save,
  FileText,
  Copy,
  Check,
  Globe,
  User,
  Code,
  Loader2,
  Database,
  Plus
} from 'lucide-react'
import { GetBots } from '../store/actions'

export function CreateBotModal({ onClose }) {
  const dispatch = useDispatch()
  const [currentStep, setCurrentStep] = useState(1)
  const [botName, setBotName] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [botIcon, setBotIcon] = useState(null)
  const [faqMethod, setFaqMethod] = useState('skip')
  const [faqFile, setFaqFile] = useState(null)
  const [faqText, setFaqText] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const [copiedCode, setCopiedCode] = useState('')
  const [selectedIntegration, setSelectedIntegration] = useState('react')

  const fileInputRef = useRef(null)
  const faqFileInputRef = useRef(null)

  const handleIconUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setBotIcon(file)
    }
  }

  const handleFaqFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFaqFile(file)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setIsCreating(true)

    try {
      if (!botName) {
        alert("Bot name is required")
        setIsCreating(false)
        return
      }

      // Simulate bot creation
      setTimeout(() => {
        dispatch(GetBots())
        setIsCreating(false)
        setIsCreated(true)
        setCurrentStep(4)
      }, 2000)

    } catch (error) {
      setIsCreating(false)
      console.error("Error creating bot:", error)
    }
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const copyToClipboard = (code, type) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(type)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const getIntegrationCode = () => {
    const botId = 'bot_' + Math.random().toString(36).substr(2, 9)

    const codes = {
      react: `<script
  src="https://cdn.customerbot.ai/widget.js"
  data-bot-id="${botId}"
  data-theme="modern"
></script>`,
      html: `<script src="https://cdn.customerbot.ai/widget.js" data-bot-id="${botId}"></script>`,
      wordpress: `[customerbot bot-id="${botId}" theme="modern"]`
    }

    return codes[selectedIntegration]
  }

  const getTotalSteps = () => faqMethod === 'skip' ? 3 : 4

  // Loading Screen
  if (isCreating) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm shadow-xl border border-white/50">
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-white" />
            </div>

            <Loader2 className="w-6 h-6 mx-auto text-blue-500 animate-spin mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Creating Assistant</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Please wait...</p>

            <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Processing configuration</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse delay-100"></div>
                <span>Training AI model</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-xl border border-white/50 max-h-[90vh] overflow-hidden flex flex-col">
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
                <h2 className="text-lg font-bold">Create AI Assistant</h2>
                <p className="text-white/80 text-sm">Step {currentStep} of {getTotalSteps()}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="w-full bg-white/20 rounded-full h-1.5">
              <div
                className="bg-white rounded-full h-1.5 transition-all duration-500"
                style={{ width: `${(currentStep / getTotalSteps()) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <User className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Basic Information</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Name your AI assistant</p>
              </div>

              {/* Bot Icon Upload */}
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bot Icon (Optional)
                </label>
                <div
                  className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {botIcon ? (
                    <img
                      src={URL.createObjectURL(botIcon)}
                      alt="Bot Icon"
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-white" />
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleIconUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Bot Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assistant Name *
                </label>
                <input
                  type="text"
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  placeholder="e.g., Support Assistant"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Website URL (Optional)
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: FAQ Setup */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-2">
                <Database className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Training Data Setup</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Add Training data (optional)</p>
              </div>

              {/* Tab Headers */}
              <div className="flex justify-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {["skip", "upload", "text"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setFaqMethod(method)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${faqMethod === method
                      ? "bg-blue-500 text-white shadow"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                  >
                    {method === "skip" && "Skip"}
                    {method === "upload" && "Upload PDF"}
                    {method === "text" && "Enter Text"}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="rounded-lg border border-gray-200 dark:border-gray-600 p-4 bg-white dark:bg-gray-700">
                {faqMethod === "skip" && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    You can skip adding FAQ now and do it later.
                  </p>
                )}

                {faqMethod === "upload" && (
                  <div
                    className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                    onClick={() => faqFileInputRef.current?.click()}
                  >
                    {faqFile ? (
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{faqFile.name}</span>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Click to upload PDF</p>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={faqFileInputRef}
                      onChange={handleFaqFileUpload}
                      accept=".pdf"
                      className="hidden"
                    />
                  </div>
                )}

                {faqMethod === "text" && (
                  <textarea
                    value={faqText}
                    onChange={(e) => setFaqText(e.target.value)}
                    placeholder="Enter your FAQ content here..."
                    rows="4"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                )}
              </div>
            </div>
          )}

          {/* Step 3: Review & Create */}
          {currentStep === 3 && !isCreated && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <Check className="w-8 h-8 mx-auto text-green-500 mb-2" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Review & Create</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Review your configuration</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm bg-gradient-to-br from-blue-500 to-purple-600">
                    {botIcon ? (
                      <img
                        src={URL.createObjectURL(botIcon)}
                        alt="Bot Icon"
                        className="w-full h-full rounded-lg object-cover"
                      />
                    ) : (
                      <Bot className="w-6 h-6 text-white" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <h4 className="font-bold text-gray-900 dark:text-white">{botName || 'Unnamed Assistant'}</h4>
                    {websiteUrl && (
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Globe className="w-3 h-3" />
                        <span className="truncate">{websiteUrl}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <Database className="w-3 h-3" />
                      <span>
                        FAQ: {faqMethod === 'skip' ? 'None' :
                          faqMethod === 'upload' ? `PDF: ${faqFile?.name || 'Selected'}` :
                            'Custom text'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Integration Code */}
          {(currentStep === 4 || (currentStep === 3 && isCreated)) && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <Code className="w-8 h-8 mx-auto text-green-500 mb-2" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Integration Code</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Copy code to your website</p>
              </div>

              {/* Platform Tabs */}
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                <button
                  onClick={() => setSelectedIntegration('react')}
                  className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-all ${selectedIntegration === 'react'
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                    }`}
                >
                  React
                </button>
                <button
                  onClick={() => setSelectedIntegration('html')}
                  className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-all ${selectedIntegration === 'html'
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                    }`}
                >
                  HTML
                </button>
                <button
                  onClick={() => setSelectedIntegration('wordpress')}
                  className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-all ${selectedIntegration === 'wordpress'
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                    }`}
                >
                  WordPress
                </button>
              </div>

              {/* Code Display */}
              <div className="relative">
                <pre className="bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto text-xs">
                  <code>{getIntegrationCode()}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(getIntegrationCode(), selectedIntegration)}
                  className="absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                  {copiedCode === selectedIntegration ? (
                    <Check className="w-3 h-3 text-green-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-gray-300" />
                  )}
                </button>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-400 mb-1 text-sm">Instructions:</h4>
                <p className="text-xs text-blue-800 dark:text-blue-300">
                  {selectedIntegration === 'react' && 'Add this script tag to your React app'}
                  {selectedIntegration === 'html' && 'Paste before closing </body> tag'}
                  {selectedIntegration === 'wordpress' && 'Add shortcode to any page or widget'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <button
            type="button"
            onClick={currentStep === 1 ? onClose : prevStep}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium text-sm"
            disabled={isCreated && (currentStep === 3 || currentStep === 4)}
          >
            {currentStep === 1 ? 'Cancel' : (isCreated ? 'Close' : 'Back')}
          </button>

          {(currentStep < 3 || (currentStep === 2 && faqMethod === 'skip')) ? (
            <button
              type="button"
              onClick={() => {
                if (currentStep === 2 && faqMethod === 'skip') {
                  setCurrentStep(3)
                } else {
                  nextStep()
                }
              }}
              disabled={currentStep === 1 && !botName.trim()}
              className="px-6 py-2 rounded-lg text-white font-medium transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-500 to-purple-600 text-sm"
            >
              Next
            </button>
          ) : currentStep === 3 && !isCreated ? (
            <button
              onClick={handleCreate}
              disabled={!botName.trim()}
              className="px-6 py-2 rounded-lg text-white font-medium transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-green-500 to-green-600 text-sm"
            >
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Create
              </div>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-white font-medium transition-all shadow-sm hover:shadow-md bg-gradient-to-r from-blue-500 to-purple-600 text-sm"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  )
}