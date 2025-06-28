import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2, Globe, FileText, Sparkles, ArrowRight, Zap, Github } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState('redesign');
  const [formData, setFormData] = useState({
    url: '',
    repoUrl: '',
    topic: '',
    instructions: '',
    theme: 'auto'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const videoUrl = "https://www.youtube.com/embed/HzYyay3b89o?si=3ONsDpp2NYiZb5x5";

  const tabs = [
    { id: 'redesign', label: 'Redesign Website', icon: <Wand2 className="h-4 w-4" /> },
    { id: 'docs', label: 'GitHub Docs', icon: <Github className="h-4 w-4" /> },
    { id: 'blog', label: 'Create Blog', icon: <FileText className="h-4 w-4" /> },
    { id: 'create', label: 'Create New', icon: <Sparkles className="h-4 w-4" /> }
  ];

  const themes = [
    { value: 'auto', label: 'AI Choose' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to dashboard with form data
      navigate('/dashboard', { state: { formData, mode: activeTab } });
    }, 1000);
  };

  const isFormValid = () => {
    if (activeTab === 'redesign') {
      return formData.url.trim() && /^https?:\/\/.+\..+/.test(formData.url.trim());
    }
    if (activeTab === 'docs') {
      return formData.repoUrl.trim() && /^https?:\/\/github\.com\/.+\/.+/.test(formData.repoUrl.trim());
    }
    if (activeTab === 'blog') {
      return formData.topic.trim();
    }
    if (activeTab === 'create') {
      return formData.instructions.trim();
    }
    return false;
  };

  return (
    <section className="pt-28 pb-20 min-h-[100vh] md:pt-32 md:pb-24 relative overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/2 right-1/2 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-indigo-400/40 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-blue-400/35 rounded-full animate-bounce" style={{ animationDelay: '5s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300/30 rounded-full animate-bounce" style={{ animationDelay: '7s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-block px-4 py-1.5 mb-6 bg-slate-800/80 rounded-full backdrop-blur-sm border border-slate-700 shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
              <span className="text-purple-400 text-sm font-medium">
                🤖 Your AI Buddy for Web Creation
              </span>
            </div>

            {/* Heading & Description */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Build and Redesign{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse">
                Stunning Websites
              </span>,{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                GitHub Docs
              </span>, SEO Blogs & Marketing Pages{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
                in Minutes
              </span>
            </h1>

            <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
              Instantly generate SEO-optimized blogs, sleek landing pages, GitHub-style docs, and high-converting marketing sites — all from a URL, repo, or idea. Our{' '}
              <span className="text-purple-400 font-medium">AI Frontend Engineer</span> delivers clean, production-ready HTML — no coding required.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                ['GitHub URL to Docs', 'emerald-400'],
                ['AI Frontend Engineer', 'purple-400'],
                ['Production Ready', 'blue-400'],
                ['No Coding Required', 'indigo-400'],
              ].map(([label, color], i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 rounded-lg border border-slate-700/50">
                  <div className={`w-2 h-2 bg-${color} rounded-full`}></div>
                  <span className="text-sm text-slate-300">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Website Creation Form */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Start Creating Now</h2>
                <p className="text-slate-400">Choose your creation mode and let AI do the magic</p>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600/50'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium text-sm">{tab.label}</span>
                  </button>
                ))}
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
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="theme" className="block text-white font-medium mb-2">
                          Theme Preference
                        </label>
                        <select
                          id="theme"
                          value={formData.theme}
                          onChange={(e) => handleInputChange('theme', e.target.value)}
                          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          {themes.map((theme) => (
                            <option key={theme.value} value={theme.value} className="bg-slate-700">
                              {theme.label}
                            </option>
                          ))}
                        </select>
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
                  </div>
                )}

                {/* GitHub Docs Tab */}
                {activeTab === 'docs' && (
                  <div className="space-y-4">
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

                {/* Blog Tab */}
                {activeTab === 'blog' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="topic" className="block text-white font-medium mb-2">
                        Blog Topic
                      </label>
                      <textarea
                        id="topic"
                        value={formData.topic}
                        onChange={(e) => handleInputChange('topic', e.target.value)}
                        rows={3}
                        placeholder="e.g., The future of AI in web development, Best practices for responsive design"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="blogUrl" className="block text-white font-medium mb-2">
                        Reference Website (Optional)
                      </label>
                      <input
                        type="url"
                        id="blogUrl"
                        value={formData.url}
                        onChange={(e) => handleInputChange('url', e.target.value)}
                        placeholder="https://your-website.com (for styling reference)"
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
                    disabled={!isFormValid() || isSubmitting}
                    className={`flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                      isFormValid() && !isSubmitting
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg transform hover:scale-105'
                        : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    }`}
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
                         activeTab === 'blog' ? 'Generate Blog' : 'Create Website'}
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">🚀 Go to Dashboard</span>
            </button>

            <button
              // onClick={() => setShowVideo(true)}
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
        </div>
      </div>

      {/* Modal */}
      {showVideo && (
        <div className="fixed inset-0   z-50 flex items-center justify-center p-4">
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
  );
};

export default Hero;