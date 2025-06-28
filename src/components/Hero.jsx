// Hero.js
import React from 'react';
import {
  ArrowRight, Wand2, MessageSquare, Sun, Moon, BrainCircuit, Copy, Edit,
  PlusCircle, Layout, Code, Images, Download, Server, Zap, Upload, Palette,
  Grid3x3, CheckCircle, Globe, FileText, Newspaper, BookText, Github, UploadCloud, Paintbrush // Added Paintbrush
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GetUserData, GetWebsite, redesignWebsite } from '../store/global.Action';
import { UserSelector, publicTemplatesSelector } from '../store/global.Selctor';
import { useDispatch, useSelector } from 'react-redux';
import EnhancedCodeAnimation from './CodeAnimation';
import toast from 'react-hot-toast';
import WebsitePreview from './WebsitePreview';
import { setWebsiteQueqe } from '../store/global.Slice';

// DesignOption and SuggestionChip components remain unchanged
const DesignOption = ({ icon, title, description, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-start p-4 rounded-lg border transition-all duration-300 ${isSelected
      ? 'bg-indigo-500/20 border-indigo-500'
      : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800'
      }`}
  >
    <div className={`p-2 rounded-lg mr-3 ${isSelected ? 'bg-indigo-500' : 'bg-slate-700'}`}>
      {icon}
    </div>
    <div className="text-left">
      <h4 className="font-medium text-white mb-1">{title}</h4>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  </button>
);

const SuggestionChip = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="px-2.5 py-1.5 bg-slate-700/70 hover:bg-slate-600/70 rounded-full text-xs text-slate-300 transition-all duration-200 whitespace-nowrap border border-slate-600/50 hover:border-slate-500 max-w-[180px] sm:max-w-[220px]" // Adjusted max-width
  >
    <div className="flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap">
      <Zap className="h-3 w-3 text-indigo-400 shrink-0" />
      <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
        {text}
      </span>
    </div>
  </button>
);


const Hero = () => {
  const [previewWebsite, setPreviewWebsite] = React.useState(null);
  const [website, setWebsite] = React.useState(''); // Used for URLs across different modes (redesign, remix, blog context, doc repo)
  const [selectedOption, setSelectedOption] = React.useState(0); // For redesign theme
  const [mode, setMode] = React.useState('create'); // Default mode
  const [redesignMode, setRedesignMode] = React.useState('multi');
  const [customInstructions, setCustomInstructions] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState(null); // For image-to-code
  const [selectedMarkdownFile, setSelectedMarkdownFile] = React.useState(null); // For doc .md upload
  const [selectedTemplateForRemix, setSelectedTemplateForRemix] = React.useState(null);

  // New states for Create Blog mode
  const [blogTopic, setBlogTopic] = React.useState('');
  const [selectedBlogTheme, setSelectedBlogTheme] = React.useState('indigo'); // Default theme

  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = React.useState(false);
  const user = useSelector(UserSelector);
  const dispatch = useDispatch();

  const allTemplatesFromStore = useSelector(publicTemplatesSelector);

  const [remixActiveTab, setRemixActiveTab] = React.useState('url'); // 'url' or 'instructions' for Remix mode
  const [docContentSourceTab, setDocContentSourceTab] = React.useState('url'); // 'url' or 'file' for Doc creation

  const createSuggestions = [
    "SaaS Landing Page: Hero, Pricing, Testimonials",
    "Startup Landing: Product Demo, Features, CTA",
    "Agency Landing: Portfolio, Team, Contact",
    "App Landing: Download, Screenshots, Features",
    "E-commerce Landing: Product Gallery, Reviews",
    "Consulting Page: Services, Case Studies, Lead Form",
  ];

  const blogTopicSuggestions = [
    "Latest AI advancements & trends",
    "Beginner's guide to quantum computing",
    "Healthy vegan recipes for athletes",
    "Personal finance tips for Gen Z",
    "Exploring sustainable travel destinations",
    "Startup scaling: challenges & solutions",
    "The future of remote work culture",
    "Book reviews: contemporary fiction",
  ];

  const blogThemeOptions = [
    { name: 'Indigo', value: 'indigo', colorClass: 'bg-indigo-500' },
    { name: 'Teal', value: 'teal', colorClass: 'bg-teal-500' },
    { name: 'Rose', value: 'rose', colorClass: 'bg-rose-500' },
    { name: 'Amber', value: 'amber', colorClass: 'bg-amber-500' },
    { name: 'Sky', value: 'sky', colorClass: 'bg-sky-500' },
    { name: 'Emerald', value: 'emerald', colorClass: 'bg-emerald-500' },
    { name: 'Violet', value: 'violet', colorClass: 'bg-violet-500' },
    { name: 'Slate', value: 'slate', colorClass: 'bg-slate-500' },
  ];

  const designOptions = [ // For Redesign mode
    { icon: <Sun className="h-5 w-5 text-yellow-400" />, title: "Light", value: "light", description: "Bright and clean interface" },
    { icon: <Moon className="h-5 w-5 text-blue-300" />, title: "Dark", value: "dark", description: "Sleek and easy on eyes" },
    { icon: <BrainCircuit className="h-5 w-5 text-purple-400" />, title: "AI Choose", value: "auto", description: "Let AI decide based on context" }
  ];

  React.useEffect(() => {
    // Set default blog theme when component mounts or when blogThemeOptions are available
    if (blogThemeOptions.length > 0) {
      setSelectedBlogTheme(blogThemeOptions[0].value);
    }
  }, []); // Ensure blogThemeOptions is stable or add to dependency array if it can change

  const handleModeToggle = (newMode) => {
    setMode(newMode);
    setCustomInstructions('');
    setSelectedImage(null);
    setSelectedMarkdownFile(null);
    setSelectedTemplateForRemix(null);
    setWebsite(''); // Clears URL input for all modes
    setRemixActiveTab('url');
    setDocContentSourceTab('url');
    setSelectedOption(0); // Reset redesign theme choice
    setBlogTopic(''); // Reset blog specific state
    if (blogThemeOptions.length > 0) { // Reset blog theme to default
      setSelectedBlogTheme(blogThemeOptions[0].value);
    }
  };

  const handleRedesignModeToggle = (newRedesignMode) => {
    setRedesignMode(newRedesignMode);
  };

  const handleInstructionsChange = (value) => {
    setCustomInstructions(value);
  };

  const handleSuggestionClick = (suggestion, target = 'instructions') => {
    if (target === 'blogTopic') {
      setBlogTopic(suggestion);
    } else {
      setCustomInstructions(suggestion);
    }
  };

  const handleBlogTopicChange = (value) => {
    setBlogTopic(value);
  };


  const handleNewWebsite = async () => {
    let queuePayload = {
      mode,
      customInstructions: customInstructions.trim(),
    };

    if (mode === 'redesign') {
      if (!website.trim() || !/^https?:\/\/.+\..+/.test(website)) {
        toast.error('Please enter a valid URL to redesign.');
        return;
      }
      queuePayload = {
        ...queuePayload,
        url: website.trim(),
        redesignMode,
        theme: redesignMode === 'manual' ? designOptions[selectedOption].value : 'auto',
        multiDesign: redesignMode !== 'manual',
      };
    } else if (mode === 'remix') {
      if (!selectedTemplateForRemix) {
        toast.error('Please select a template to remix.');
        return;
      }
      queuePayload.selectedTemplate = selectedTemplateForRemix;
      queuePayload.selectedCategory = selectedTemplateForRemix?.category || null;
      queuePayload.remixMode = remixActiveTab;

      if (remixActiveTab === 'url') {
        if (!website.trim() || !/^https?:\/\/.+\..+/.test(website)) {
          toast.error('Please enter a valid website URL to apply the template.');
          return;
        }
        queuePayload.url = website.trim();
      } else if (remixActiveTab === 'instructions') {
        if (!customInstructions.trim()) {
          toast.error('Please provide customization instructions for the template.');
          return;
        }
      }
    } else if (mode === 'create') {
      if (!customInstructions.trim()) {
        toast.error('Please describe the landing page you want to build.');
        return;
      }
    } else if (mode === 'createBlog') {
      if (!blogTopic.trim()) {
        toast.error('Please define the topic for your blog.');
        return;
      }
      queuePayload.blogTopic = blogTopic.trim();
      queuePayload.themeColor = selectedBlogTheme; // e.g., 'indigo'

      // Optional context URL for blog
      if (website.trim()) {
        if (!/^https?:\/\/.+\..+/.test(website)) {
          toast.error('If providing a website URL for context, please enter a valid one.');
          return;
        }
        queuePayload.contextUrl = website.trim();
      }
    } else if (mode === 'createDoc') {
      queuePayload.contentSourceType = docContentSourceTab;
      if (docContentSourceTab === 'url') {
        if (!website.trim() || !/^https?:\/\/(?:www\.)?github\.com\/[^/]+\/[^/]+(?:\.git)?$/.test(website)) { // Stricter GitHub repo URL regex
          toast.error('Please enter a valid GitHub repository URL for the docs (e.g., https://github.com/username/repo).');
          return;
        }
        queuePayload.url = website.trim(); // This is the repo URL
      } else if (docContentSourceTab === 'file') {
        if (!selectedMarkdownFile) {
          toast.error('Please upload a Markdown file (e.g., README.md) for the docs.');
          return;
        }
        queuePayload.selectedMarkdownFile = selectedMarkdownFile;
      }
      // Check if at least one source or instruction is provided for docs
      if (!customInstructions.trim() && !queuePayload.url && !queuePayload.selectedMarkdownFile) {
        toast.error('Please provide a source (Repo URL or Markdown File) or custom instructions for the documentation.');
        return;
      }
    }

    if (!user) {
      dispatch(setWebsiteQueqe(queuePayload));
      navigate('/login');
      return;
    }

    if (user.AiCredits <= 0) { // Assuming 0 credits means no actions allowed
      toast.error('You have no credits left. Please upgrade your plan.');
      return;
    }

    try {
      // redesignWebsite should handle FormData internally if selectedImage or selectedMarkdownFile is present
      await redesignWebsite({ data: queuePayload });

      const token = localStorage.getItem('authToken');
      dispatch(GetWebsite(token));
      dispatch(GetUserData(token));
      navigate('/dashboard');
    } catch (error) {
      console.error("Error processing website request:", error);
      toast.error('Error processing request: ' + (error.response?.data?.message || error.message || 'Unknown error'));
    } finally {
      // Clear all relevant form states, some are cleared in handleModeToggle already
      // Redundancy here is fine for safety.
      setWebsite('');
      setCustomInstructions('');
      setSelectedOption(0);
      setSelectedImage(null);
      setSelectedMarkdownFile(null);
      setSelectedTemplateForRemix(null);
      setBlogTopic('');
      if (blogThemeOptions.length > 0) setSelectedBlogTheme(blogThemeOptions[0].value);
      // Tabs are reset in handleModeToggle
    }
  };


  return (
    <section className="pt-28 pb-20 md:pt-32 md:pb-24 relative overflow-hidden">
      {showAnimation && <EnhancedCodeAnimation />}
      {previewWebsite && (
        <WebsitePreview
          data={previewWebsite}
          onClose={() => setPreviewWebsite(null)}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/2 right-1/2 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 mb-6 bg-slate-800/80 rounded-full backdrop-blur-sm border border-slate-700">
              <span className="text-purple-400 text-sm font-medium">
                Your AI Buddy for Web Creation
              </span>
            </div>
            <h1 className="text-4xl  md:text-5xl font-bold mb-6 leading-tight">
              Build and Redesign Stunning{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Websites, GitHub Docs, SEO Blogs & Marketing Pages
              </span>{' '}
              in Minutes with AI
            </h1>
            <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed">
              Instantly generate SEO-friendly blogs, GitHub-style docs, high-converting marketing pages, and sleek landing pages — all from a URL, repo, idea, or Markdown file. Whether you're starting from scratch or improving an existing site, your AI assistant delivers clean, production-ready HTML — no coding required.
            </p>
          </div>
          {/* Mode Toggle Buttons */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center rounded-lg border border-slate-700 bg-slate-800/70 backdrop-blur-sm p-1 gap-1 sm:gap-0 sm:flex-wrap">
              {[
                { key: 'create', label: 'New Page', icon: PlusCircle },
                { key: 'createBlog', label: 'New Blog', icon: Newspaper },
                { key: 'createDoc', label: 'New Docs', icon: BookText },
                { key: 'redesign', label: 'Redesign', icon: Wand2 },
                { key: 'remix', label: 'Templates', icon: Palette },
              ].map((item, index, arr) => (
                <button
                  key={item.key}
                  onClick={() => handleModeToggle(item.key)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 transition-all text-sm sm:text-base 
                          ${mode === item.key ? 'bg-indigo-500 text-white' : 'text-slate-300 hover:bg-slate-700'}
                          ${index === 0 ? 'rounded-t-md sm:rounded-l-md sm:rounded-tr-none' : ''}
                          ${index === arr.length - 1 ? 'rounded-b-md sm:rounded-r-md sm:rounded-bl-none' : ''}
                          ${index > 0 && index < arr.length - 1 ? 'sm:rounded-none' : ''}
                          ${arr.length > 3 && index !== 0 && index !== arr.length - 1 ? 'border-t border-b sm:border-t-0 sm:border-b-0 sm:border-l sm:border-r border-slate-600/60' : ''} 
                          `}
                >
                  <item.icon className="h-4 w-4" /> {item.label}
                </button>
              ))}
            </div>
          </div>


          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8 mb-8">
            {/* CREATE LANDING PAGE MODE */}
            {mode === 'create' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="createInstructions" className="block text-white font-medium mb-2">
                    What type of landing page do you want to build?
                  </label>
                  <textarea
                    id="createInstructions"
                    value={customInstructions}
                    onChange={(e) => handleInstructionsChange(e.target.value)}
                    placeholder="Describe your landing page (e.g., 'SaaS page for project management software with pricing, testimonials, free trial signup')"
                    rows={4}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-3">Popular page types I can help create:</p>
                  <div className="flex flex-wrap gap-2">
                    {createSuggestions.map((suggestion, index) => (
                      <SuggestionChip key={index} text={suggestion} onClick={() => handleSuggestionClick(suggestion)} />
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-slate-900/70 rounded-lg border border-slate-700">
                  <div className="flex items-start">
                    <Code className="h-5 w-5 text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-sm text-indigo-200">
                      <span className="font-medium text-white">Export Ready Code:</span> Get clean,
                      production-ready React.js or HTML/CSS code.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleNewWebsite}
                    disabled={!customInstructions.trim()}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Build Landing Page <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* CREATE BLOG MODE */}
            {mode === 'createBlog' && (
              <div className="space-y-6">

                <h3 className="text-2xl font-semibold text-white text-center">
                  Craft Your AI-Powered Blog
                </h3>
                <div>
                  <label htmlFor="blogContextUrl" className="block text-white font-medium mb-2">
                    Your Website URL (for context & style, optional)
                  </label>
                  <input
                    type="url"
                    id="blogContextUrl"
                    value={website} // Reusing the 'website' state
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://your-existing-website.com"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="blogTopic" className="block text-white font-medium mb-2">
                    What is your blog about? <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="blogTopic"
                    value={blogTopic}
                    onChange={(e) => handleBlogTopicChange(e.target.value)}
                    placeholder="e.g., 'The future of renewable energy', 'A travel blog about backpacking through South America', 'Tips for learning a new programming language'"
                    rows={3}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-3">Or get inspired by these topics:</p>
                  <div className="flex flex-wrap gap-2">
                    {blogTopicSuggestions.map((suggestion, index) => (
                      <SuggestionChip key={index} text={suggestion} onClick={() => handleSuggestionClick(suggestion, 'blogTopic')} />
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="blogCustomInstructions" className="block text-white font-medium mb-2">
                    Additional Instructions (Optional)
                  </label>
                  <textarea
                    id="blogCustomInstructions"
                    value={customInstructions}
                    onChange={(e) => handleInstructionsChange(e.target.value)}
                    placeholder="e.g., 'Target audience: tech enthusiasts', 'Tone: informal and engaging', 'Include a call to action for newsletter signup'"
                    rows={3}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div className="p-4 bg-slate-900/70 rounded-lg border border-slate-700">
                  <div className="flex items-start">
                    <Newspaper className="h-5 w-5 text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-sm text-indigo-200">
                      <span className="font-medium text-white">AI Blog Generation:</span> Your AI buddy will craft engaging blog posts based on your topic and preferences.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleNewWebsite}
                    disabled={!blogTopic.trim()}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Generate Blog <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* CREATE DOCS MODE */}
            {mode === 'createDoc' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white text-center">
                  Create New Documentation
                </h3>

                <div className="border-b border-slate-700 mb-2">
                  <nav className="flex space-x-6">
                    <button
                      onClick={() => setDocContentSourceTab('url')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${docContentSourceTab === 'url'
                        ? 'border-indigo-500 text-indigo-400'
                        : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        From Repository URL
                      </div>
                    </button>
                    <button
                      onClick={() => setDocContentSourceTab('file')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${docContentSourceTab === 'file'
                        ? 'border-indigo-500 text-indigo-400'
                        : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Upload README.md
                      </div>
                    </button>
                  </nav>
                </div>

                <div className="min-h-[100px] pt-4">
                  {docContentSourceTab === 'url' && (
                    <div>
                      <label htmlFor="docRepoUrl" className="block text-white font-medium mb-2">
                        Enter GitHub Repository URL <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="url"
                        id="docRepoUrl"
                        value={website} // Reusing 'website' state
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://github.com/username/repository"
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <p className="text-slate-400 text-sm mt-2">
                        Provide a link to a public GitHub repository. Your AI buddy will analyze its content (README, etc.).
                      </p>
                    </div>
                  )}
                  {docContentSourceTab === 'file' && (
                     <div>
                     <label htmlFor="markdownUpload" className="block text-white font-medium mb-2">
                        Add your README.md Text <span className="text-red-400">*</span>
                      </label>
                     <textarea
                       id="blogCustomInstructions"
                       value={customInstructions}
                       onChange={(e) => handleInstructionsChange(e.target.value)}
                       placeholder="e.g., 'Target audience: tech enthusiasts', 'Tone: informal and engaging', 'Include a call to action for newsletter signup'"
                       rows={3}
                       className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                     />
                   </div>
                  
                  )}
                </div>

                <div>
                  <label htmlFor="docInstructions" className="block text-white font-medium mb-2">
                    Additional Instructions (Optional)
                  </label>
                  <textarea
                    id="docInstructions"
                    value={customInstructions}
                    onChange={(e) => handleInstructionsChange(e.target.value)}
                    placeholder={"e.g., 'Organize by sections in README', 'Create a getting started guide', 'Focus on API endpoints description'"}
                    rows={3}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div className="p-4 bg-slate-900/70 rounded-lg border border-slate-700">
                  <div className="flex items-start">
                    <BookText className="h-5 w-5 text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-sm text-indigo-200">
                      <span className="font-medium text-white">AI Documentation Builder:</span> Your AI buddy will process the provided source to structure and generate your documentation.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleNewWebsite}
                    disabled={
                      (docContentSourceTab === 'url' && !website.trim()) ||
                      (docContentSourceTab === 'file' && !selectedMarkdownFile)
                    }
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Documentation <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* REDESIGN FROM URL MODE */}
            {mode === 'redesign' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <label htmlFor="websiteUrlRedesign" className="block text-white font-medium mb-2">
                      Paste a link to redesign your page <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="url"
                      id="websiteUrlRedesign"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://your-landing-page.com"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div className="w-full md:w-auto mt-4 md:mt-0">
                    <label className="block text-white font-medium mb-2 md:text-right">
                      Page design Mode
                    </label>
                    <div className="flex items-stretch rounded-lg border border-slate-700 bg-slate-800/70 backdrop-blur-sm p-1 gap-0">
                      <button
                        onClick={() => handleRedesignModeToggle('multi')}
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-l-md transition-all ${redesignMode === 'multi'
                          ? 'bg-indigo-500 text-white'
                          : 'text-slate-300 hover:bg-slate-700'
                          }`}
                      >
                        <Images className="h-4 w-4" /> Multi
                      </button>
                      <button
                        onClick={() => handleRedesignModeToggle('manual')}
                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-r-md transition-all border-l border-slate-600 ${redesignMode === 'manual'
                          ? 'bg-indigo-500 text-white'
                          : 'text-slate-300 hover:bg-slate-700'
                          }`}
                      >
                        <Layout className="h-4 w-4" /> Manual
                      </button>
                    </div>
                  </div>
                </div>
                {redesignMode === 'multi' && (
                  <div className="p-4 bg-indigo-900/30 border border-indigo-700/30 rounded-lg">
                    <div className="flex items-start">
                      <Images className="h-5 w-5 text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                      <p className="text-sm text-indigo-200">
                        <span className="font-medium text-white">Multi-Design Mode:</span> Generate
                        three unique landing page variations.
                      </p>
                    </div>
                  </div>
                )}
                {redesignMode === 'manual' && (
                  <div className="p-4 bg-indigo-900/30 border border-indigo-700/30 rounded-lg">
                    <div className="flex items-start">
                      <Layout className="h-5 w-5 text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                      <p className="text-sm text-indigo-200">
                        <span className="font-medium text-white">Manual Mode:</span> Choose your
                        theme for a single optimized design.
                      </p>
                    </div>
                  </div>
                )}
                <div>
                  <label htmlFor="redesignInstructions" className="block text-white font-medium mb-2">
                    Instructions (Optional)
                  </label>
                  <textarea
                    id="redesignInstructions"
                    value={customInstructions}
                    onChange={(e) => handleInstructionsChange(e.target.value)}
                    placeholder="Specific improvements (e.g., 'Improve CTAs', 'Make it mobile-first')"
                    rows={3}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                {redesignMode === 'manual' && (
                  <div>
                    <label className="block text-white font-medium mb-4">Choose your theme</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {designOptions.map((option, index) => (
                        <DesignOption
                          key={index}
                          icon={option.icon}
                          title={option.title}
                          description={option.description}
                          isSelected={selectedOption === index}
                          onClick={() => setSelectedOption(index)}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleNewWebsite}
                    disabled={!website.trim()}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Redesign Page <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* REMIX TEMPLATE MODE */}
            {mode === 'remix' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-4">
                    Choose a Landing Page Template <span className="text-red-400">*</span>
                  </label>
                  {allTemplatesFromStore && allTemplatesFromStore.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto p-1 pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800/50 rounded-lg border border-slate-700">
                      {allTemplatesFromStore.map((template) => (
                        <button
                          key={template.id}
                          className={`group bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl w-full text-left ${selectedTemplateForRemix?._id === template._id
                            ? 'ring-2 ring-indigo-500 border-indigo-500'
                            : 'border border-transparent hover:border-slate-600'
                            }`}
                          onClick={() => setSelectedTemplateForRemix(template)}
                        >
                          <div className="relative overflow-hidden aspect-[16/9] bg-slate-700">
                            <img
                              src={template.image}
                              alt={template.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) =>
                                (e.currentTarget.src = 'https://via.placeholder.com/400x225?text=No+Preview')
                              }
                            />
                            {selectedTemplateForRemix?._id === template._id && (
                              <div className="absolute inset-0 bg-indigo-500/30 flex items-center justify-center">
                                <CheckCircle className="h-10 w-10 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <h4 className="font-medium text-white text-sm truncate">{template.name}</h4>
                            <p className="text-xs text-slate-400 truncate">
                              {template.description || 'Professional landing page template'}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 text-center py-6 bg-slate-900/30 rounded-lg">
                      No templates available at the moment.
                    </p>
                  )}
                </div>

                <div className="border-b border-slate-700 mt-6 mb-2">
                  <nav className="flex space-x-6">
                    <button
                      onClick={() => setRemixActiveTab('url')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${remixActiveTab === 'url'
                        ? 'border-indigo-500 text-indigo-400'
                        : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Apply to Existing Page
                      </div>
                    </button>
                    <button
                      onClick={() => setRemixActiveTab('instructions')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${remixActiveTab === 'instructions'
                        ? 'border-indigo-500 text-indigo-400'
                        : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Customize Template
                      </div>
                    </button>
                  </nav>
                </div>

                <div className="min-h-[150px] pt-4">
                  {remixActiveTab === 'url' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="remixWebsiteUrl" className="block text-white font-medium mb-2">
                          Enter your website URL to apply template <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="url"
                          id="remixWebsiteUrl"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="https://your-existing-site.com"
                          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <p className="text-slate-400 text-sm mt-2">
                          AI will analyze your site and apply "{selectedTemplateForRemix?.name || 'selected template'}" design.
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="remixUrlInstructions"
                          className="block text-white font-medium mb-2"
                        >
                          Instructions (Optional)
                          {selectedTemplateForRemix && ` for "${selectedTemplateForRemix.name}"`}
                        </label>
                        <textarea
                          id="remixUrlInstructions"
                          value={customInstructions}
                          onChange={(e) => handleInstructionsChange(e.target.value)}
                          rows={3}
                          placeholder="e.g., 'Keep current logo', 'Change color palette...'"
                          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  )}

                  {remixActiveTab === 'instructions' && (
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="remixOnlyInstructions"
                          className="block text-white font-medium mb-2"
                        >
                          Customization Instructions <span className="text-red-400">*</span>
                          {selectedTemplateForRemix && ` for "${selectedTemplateForRemix.name}"`}
                        </label>
                        <textarea
                          id="remixOnlyInstructions"
                          value={customInstructions}
                          onChange={(e) => handleInstructionsChange(e.target.value)}
                          rows={5}
                          placeholder="e.g., 'Change colors to blue/silver', 'Add contact form', 'Make it for a coffee shop'..."
                          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <p className="text-slate-400 text-sm mt-2">
                          More details help AI tailor "{selectedTemplateForRemix?.name || 'selected template'}" better.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-700/30 rounded-lg mt-6">
                  <div className="flex items-start">
                    <Grid3x3 className="h-5 w-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-sm text-green-200">
                      <span className="font-medium text-white">
                        {allTemplatesFromStore?.length || '0'}+ AI Templates:
                      </span>{' '}
                      Choose from professionally designed, AI-optimized, and customizable templates.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleNewWebsite}
                    disabled={
                      !selectedTemplateForRemix ||
                      (remixActiveTab === 'url' && !website.trim()) ||
                      (remixActiveTab === 'instructions' && !customInstructions.trim())
                    }
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-300 ${(!selectedTemplateForRemix ||
                      (remixActiveTab === 'url' && !website.trim()) ||
                      (remixActiveTab === 'instructions' && !customInstructions.trim()))
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 hover:shadow-indigo-500/25'
                      }`}
                  >
                    Remix Template <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;