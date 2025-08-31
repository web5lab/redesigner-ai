'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Wand2, FileText, Sparkles, ArrowRight, Zap, Github } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setWebsiteQueue } from '@/store/global.Slice'
import toast from 'react-hot-toast'

const Hero = () => {
  const router = useRouter()
  const [showVideo, setShowVideo] = useState(false)
  const [activeTab, setActiveTab] = useState('redesign')
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    url: '',
    repoUrl: '',
    docsSource: 'repo',
    readmeContent: '',
    topic: '',
    instructions: '',
    theme: 'auto'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const videoUrl = "https://www.youtube.com/embed/QTD-_s0htu4?si=qbpLpDem1kV-z77k"

  const tabs = [
    { id: 'redesign', label: 'Redesign Website', icon: <Wand2 className="h-4 w-4" /> },
    { id: 'docs', label: 'GitHub Docs', icon: <Github className="h-4 w-4" /> },
    { id: 'create', label: 'Create New', icon: <Sparkles className="h-4 w-4" /> }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (activeTab === 'redesign') {
      const url = formData.url.trim()
      if (!url) {
        toast.error('Please enter a website URL')
        return false
      }
      if (!/^https:\/\/.+\..+/.test(url)) {
        toast.error('Please enter a valid HTTPS URL (must start with https://)')
        return false
      }
    }
    
    if (activeTab === 'docs') {
      if (formData.docsSource === 'repo') {
        const repoUrl = formData.repoUrl.trim()
        if (!repoUrl) {
          toast.error('Please enter a GitHub repository URL')
          return false
        }
        if (!/^https:\/\/github\.com\/.+\/.+/.test(repoUrl)) {
          toast.error('Please enter a valid GitHub repository URL (https://github.com/username/repository)')
          return false
        }
      } else {
        if (!formData.readmeContent.trim()) {
          toast.error('Please enter README content')
          return false
        }
      }
    }
    
    if (activeTab === 'create') {
      if (!formData.instructions.trim()) {
        toast.error('Please describe your website')
        return false
      }
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    dispatch(setWebsiteQueue({ formData, mode: activeTab }))
    setIsSubmitting(false)
    router.push('/dashboard')
  }

  return (
    <section className="pt-28 pb-20 min-h-[100vh] md:pt-20 md:pb-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center md:mb-12">
            <div className="md:inline-block hidden px-4 py-1.5 mb-6 bg-slate-800/80 rounded-full backdrop-blur-sm border border-slate-700 shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
              <span className="text-purple-400 text-sm font-medium">
                🚀 Your AI Companion for Web Creation
              </span>
            </div>

            <h1 className="text-4xl hidden md:block md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Redesign Any Website
              </span>{' '}
              —{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                Get Unlimited Variants Access
              </span>
              .{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500">
                No Designer. No Developer.
              </span>{' '}
              Just Your Prompt.{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-pink-400">
                Redesign & Create Stunning Pages in Minutes.
              </span>
            </h1>

            <p className="text-slate-300 hidden md:block text-lg md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
              Whether you're starting fresh or transforming existing content — our{' '}
              <span className="text-purple-400 font-medium">AI Frontend Engineer</span>{' '}
              turns your ideas, links, or repos into polished, high-converting pages in minutes.
              No coding required. Just launch.
            </p>
          </div>

          <div className="md:flex hidden mb-6 flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">🚀 Go to Dashboard</span>
            </button>

            <button
              onClick={() => setShowVideo(true)}
              className="group px-8 py-3 border border-slate-600 text-slate-300 font-semibold rounded-lg hover:border-purple-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                📖 View Demo
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>

          {/* Website Creation Form */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Start Creating Now</h2>
                <p className="text-slate-400">Choose your creation mode and let AI do the magic</p>
              </div>

              {/* Tabs */}
              <div className="md:flex hidden flex-wrap justify-center gap-2 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600/50'
                      }`}
                  >
                    {tab.icon}
                    <span className="font-medium text-sm">{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="md:hidden mb-6">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="w-full bg-slate-800 text-slate-200 border border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {tabs.map((tab) => (
                    <option key={tab.id} value={tab.id}>
                      {tab.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Redesign Tab */}
                {activeTab === 'redesign' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="url" className="block text-white font-medium mb-2">
                        Website URL to Redesign
                      </label>
                      <input
                        type="url"
                        id="url"
                        value={formData.url}
                        onChange={(e) => handleInputChange('url', e.target.value)}
                        placeholder="https://example.com"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <p className="text-slate-400 text-sm mt-2">
                        URL must start with https:// for security
                      </p>
                    </div>
                    <div>
                      <label htmlFor="redesignInstructions" className="block text-white font-medium mb-2">
                        Special Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        id="redesignInstructions"
                        value={formData.instructions}
                        onChange={(e) => handleInputChange('instructions', e.target.value)}
                        placeholder="e.g., Make it more modern, improve mobile design"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                )}

                {/* GitHub Docs Tab */}
                {activeTab === 'docs' && (
                  <div className="space-y-4">
                    <div className="flex bg-slate-700/30 rounded-lg p-1 mb-4">
                      <button
                        type="button"
                        onClick={() => handleInputChange('docsSource', 'repo')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${(formData.docsSource || 'repo') === 'repo'
                          ? 'bg-indigo-500 text-white'
                          : 'text-slate-300 hover:text-white'
                          }`}
                      >
                        <Github className="h-4 w-4" />
                        From Repository
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInputChange('docsSource', 'readme')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${formData.docsSource === 'readme'
                          ? 'bg-indigo-500 text-white'
                          : 'text-slate-300 hover:text-white'
                          }`}
                      >
                        <FileText className="h-4 w-4" />
                        From README
                      </button>
                    </div>

                    {(formData.docsSource || 'repo') === 'repo' && (
                      <div>
                        <label htmlFor="repoUrl" className="block text-white font-medium mb-2">
                          GitHub Repository URL
                        </label>
                        <input
                          type="url"
                          id="repoUrl"
                          value={formData.repoUrl}
                          onChange={(e) => handleInputChange('repoUrl', e.target.value)}
                          placeholder="https://github.com/username/repository"
                          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <p className="text-slate-400 text-sm mt-2">
                          We'll analyze your repository and create beautiful documentation
                        </p>
                      </div>
                    )}

                    {formData.docsSource === 'readme' && (
                      <div>
                        <label htmlFor="readmeContent" className="block text-white font-medium mb-2">
                          README Content
                        </label>
                        <textarea
                          id="readmeContent"
                          value={formData.readmeContent}
                          onChange={(e) => handleInputChange('readmeContent', e.target.value)}
                          rows={8}
                          placeholder="Paste your README.md content here..."
                          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                        />
                        <p className="text-slate-400 text-sm mt-2">
                          Paste your README.md content and we'll transform it into beautiful documentation
                        </p>
                      </div>
                    )}

                    <div>
                      <label htmlFor="docsInstructions" className="block text-white font-medium mb-2">
                        Documentation Focus (Optional)
                      </label>
                      <textarea
                        id="docsInstructions"
                        value={formData.instructions}
                        onChange={(e) => handleInputChange('instructions', e.target.value)}
                        rows={3}
                        placeholder="e.g., Focus on API documentation, include installation guide, highlight key features"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                )}

                {/* Create Tab */}
                {activeTab === 'create' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="createInstructions" className="block text-white font-medium mb-2">
                        Describe Your Website
                      </label>
                      <textarea
                        id="createInstructions"
                        value={formData.instructions}
                        onChange={(e) => handleInputChange('instructions', e.target.value)}
                        rows={4}
                        placeholder="e.g., A landing page for a SaaS product with pricing, testimonials, and signup form"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg transform hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5" />
                        {activeTab === 'redesign' ? 'Redesign Website' :
                          activeTab === 'docs' ? 'Generate Docs' :
                            'Create Website'}
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Features Info */}
              <div className="mt-8 p-4 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-700/30 rounded-xl">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium mb-1">What you'll get:</h3>
                    <ul className="text-indigo-200 text-sm space-y-1">
                      <li>• Production-ready HTML/CSS code</li>
                      <li>• Responsive design for all devices</li>
                      <li>• SEO-optimized structure</li>
                      {activeTab === 'docs' && <li>• Interactive documentation with search</li>}
                      {activeTab === 'docs' && <li>• Code syntax highlighting</li>}
                      <li>• Clean, maintainable code</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-7xl">
            <div className="pb-[56.25%] relative h-0 overflow-hidden rounded-lg shadow-2xl">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={videoUrl}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </section>
  )
}

export default Hero