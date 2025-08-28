import React, { useState, useEffect } from 'react';
import {
    Wand2,
    X,
    Sun,
    Moon,
    BrainCircuit,
    ArrowRight,
    PlusCircle,
    Images,
    Layout,
    Code,
    Zap,
    Palette,
    Newspaper, // Added
    BookText,  // Added
    Github,    // Added
    UploadCloud, // Added
    FileText,  // Added
    Globe,     // Added
    Grid3x3,   // Added
    CheckCircle, // Added
    Copy // Kept, might be useful if text copy is added later, or remove if not used.
} from 'lucide-react';

// Suggestions from Hero.jsx
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
];

// Blog theme options from Hero.jsx
const blogThemeOptionsData = [
    { name: 'Indigo', value: 'indigo', colorClass: 'bg-indigo-500' },
    { name: 'Teal', value: 'teal', colorClass: 'bg-teal-500' },
    { name: 'Rose', value: 'rose', colorClass: 'bg-rose-500' },
    { name: 'Amber', value: 'amber', colorClass: 'bg-amber-500' },
    { name: 'Sky', value: 'sky', colorClass: 'bg-sky-500' },
    { name: 'Emerald', value: 'emerald', colorClass: 'bg-emerald-500' },
];


const SuggestionChip = ({ text, onClick }) => (
    <button
        onClick={onClick}
        className="px-2.5 py-1.5 bg-slate-700/70 hover:bg-slate-600/70 rounded-full text-xs text-slate-300 transition-all duration-200 whitespace-nowrap border border-slate-600/50 hover:border-slate-500 max-w-[180px] sm:max-w-[220px]"
    >
        <div className="flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap">
            <Zap className="h-3 w-3 text-indigo-400 shrink-0" />
            <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                {text}
            </span>
        </div>
    </button>
);

const DesignOption = ({ icon, title, description, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-start p-4 rounded-lg border transition-all duration-300 w-full ${isSelected
            ? 'bg-indigo-500/20 border-indigo-500'
            : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800'
            }`}
    >
        <div className={`p-2 rounded-lg mr-3 shrink-0 ${isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
            {icon}
        </div>
        <div className="text-left">
            <h4 className="font-medium text-white mb-1">{title}</h4>
            <p className="text-sm text-slate-400">{description}</p>
        </div>
    </button>
);

const NewWebsiteModal = ({ isOpen, onClose, onSubmit, showAnimation, allTemplatesFromStore = [] }) => {
    const [websiteUrl, setWebsiteUrl] = useState(''); // For URLs (redesign, blog context, doc repo, remix apply)
    const [mode, setMode] = useState('create'); // create, createBlog, createDoc, redesign, remix
    
    // Create Mode
    const [customInstructions, setCustomInstructions] = useState('');
    
    // Redesign Mode
    const [redesignMode, setRedesignMode] = useState('multi'); // 'multi' or 'manual'
    const [selectedRedesignThemeIndex, setSelectedRedesignThemeIndex] = useState(0); // For manual redesign theme

    // Create Blog Mode
    const [blogTopic, setBlogTopic] = useState('');
    const [selectedBlogTheme, setSelectedBlogTheme] = useState(blogThemeOptionsData[0]?.value || 'indigo');

    // Create Doc Mode
    const [docContentSourceTab, setDocContentSourceTab] = useState('url'); // 'url' or 'file'
    const [selectedMarkdownFile, setSelectedMarkdownFile] = useState(null);
    const [readmeText, setreadmeText] = useState('')

    // Remix Mode
    const [selectedTemplateForRemix, setSelectedTemplateForRemix] = useState(null);
    const [remixActiveTab, setRemixActiveTab] = useState('url'); // 'url' or 'instructions'

    // Theme options for Redesign (manual)
    const redesignThemeOptions = [
        { icon: <Sun className="h-5 w-5 text-yellow-400" />, title: "Light", value: "light", description: "Bright and clean interface" },
        { icon: <Moon className="h-5 w-5 text-blue-300" />, title: "Dark", value: "dark", description: "Sleek and easy on eyes" },
        { icon: <BrainCircuit className="h-5 w-5 text-purple-400" />, title: "AI Choose", value: "auto", description: "Let AI decide the theme" }
    ];
    
    useEffect(() => {
        if (isOpen) {
            // Reset to default mode and its specific states if modal is reopened
            // Or, keep last state if preferred (current implementation resets)
            handleModeToggle('create', true); // true to skip clearing all on initial open
        }
    }, [isOpen]);


    const handleModeToggle = (newMode, initialOpen = false) => {
        setMode(newMode);
        if (!initialOpen) {
            setCustomInstructions('');
            setWebsiteUrl('');
            setSelectedRedesignThemeIndex(0);
            setRedesignMode('multi');
            setBlogTopic('');
            setSelectedBlogTheme(blogThemeOptionsData[0]?.value || 'indigo');
            setDocContentSourceTab('url');
            setSelectedMarkdownFile(null);
            setSelectedTemplateForRemix(null);
            setRemixActiveTab('url');
        }
    };

    const handleInstructionsChange = (value) => {
        setCustomInstructions(value);
    };
    
    const handleBlogTopicChange = (value) => {
        setBlogTopic(value);
    };

    const handleSuggestionClick = (suggestion, target = 'instructions') => {
        if (target === 'blogTopic') {
            setBlogTopic(suggestion);
        } else {
            setCustomInstructions(suggestion);
        }
    };

    const handleMarkdownUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type === "text/markdown" || file.name.endsWith('.md') || file.name.endsWith('.MD')) {
                setSelectedMarkdownFile(file);
                // Simple feedback, consider using react-hot-toast if available globally
                console.log(`Selected file: ${file.name}`);
            } else {
                alert('Please upload a valid .md file.');
                setSelectedMarkdownFile(null);
                if (event.target) event.target.value = null; // Reset file input
            }
        }
    };

    const handleFormSubmit = () => {
        let payload = {
            mode: mode,
            customInstructions: customInstructions.trim(),
        };

        if (mode === 'create') {

        } else if (mode === 'redesign') {
            payload.url = websiteUrl.trim();
            payload.redesignMode = redesignMode;
            payload.theme = redesignMode === 'manual' ? redesignThemeOptions[selectedRedesignThemeIndex].value : 'auto';
            payload.multiDesign = redesignMode !== 'manual';
        } else if (mode === 'createBlog') {
            payload.topic = blogTopic.trim();
            if (websiteUrl.trim()) {
                payload.url = websiteUrl.trim();
            }
        } else if (mode === 'createDoc') {
            if (docContentSourceTab === 'url') {
                payload.url = websiteUrl.trim(); // Repo URL
            }
            payload.readMe = readmeText.trim(); // For file content
        } else if (mode === 'remix') {
            payload.selectedTemplate = selectedTemplateForRemix; // Send whole object or just ID
            payload.remixMode = remixActiveTab;
            if (remixActiveTab === 'url') {
                payload.url = websiteUrl.trim();
            }
            // customInstructions for remix is already in base payload
        }
        
        onSubmit(payload);
        onClose(); // Close modal after submit

        // Reset all states after submission (or on next open)
        // handleModeToggle(mode); // Resets based on current mode, maybe better to reset to default
        handleModeToggle('create'); 
    };

    const getModalTitle = () => {
        switch (mode) {
            case 'create': return 'Create New Landing Page';
            case 'createBlog': return 'Create New Blog';
            case 'createDoc': return 'Create New Documentation';
            case 'redesign': return 'Redesign from URL';
            case 'remix': return 'Remix with Template';
            default: return 'New Project';
        }
    };

    const getSubmitButtonText = () => {
        switch (mode) {
            case 'create': return 'Create';
            case 'createBlog': return 'Generate Blog';
            case 'createDoc': return 'Create Documentation';
            case 'redesign': return 'Redesign';
            case 'remix': return 'Remix Template';
            default: return 'Submit';
        }
    };

    const isSubmitDisabled = () => {
        if (showAnimation) return true;
        switch (mode) {
            case 'create':
                return !customInstructions.trim();
            case 'redesign':
                return !websiteUrl.trim() || !/^https?:\/\/.+\..+/.test(websiteUrl.trim());
            case 'createBlog':
                return !blogTopic.trim() || (websiteUrl.trim() && !/^https?:\/\/.+\..+/.test(websiteUrl.trim()));
            case 'createDoc':
                const isUrlSourceInvalid = docContentSourceTab === 'url' && (!websiteUrl.trim() || !/^https?:\/\/(?:www\.)?github\.com\/[^/]+\/[^/]+(?:\.git)?$/.test(websiteUrl.trim()));
                const isFileSourceInvalid = docContentSourceTab === 'file' && !selectedMarkdownFile;
                const noSourceProvided = isUrlSourceInvalid && isFileSourceInvalid;
                // Allow submit if instructions are given, even if source is problematic (backend might handle this)
                // Or be stricter: one valid source OR instructions
                return (docContentSourceTab === 'url' && !websiteUrl.trim() && !customInstructions.trim()) ||
                       (docContentSourceTab === 'file' && !selectedMarkdownFile && !customInstructions.trim()) ||
                       (docContentSourceTab === 'url' && websiteUrl.trim() && !/^https?:\/\/(?:www\.)?github\.com\/[^/]+\/[^/]+(?:\.git)?$/.test(websiteUrl.trim()))


            case 'remix':
                const isRemixUrlInvalid = remixActiveTab === 'url' && (!websiteUrl.trim() || !/^https?:\/\/.+\..+/.test(websiteUrl.trim()));
                const isRemixInstructionsInvalid = remixActiveTab === 'instructions' && !customInstructions.trim();
                return !selectedTemplateForRemix || isRemixUrlInvalid || isRemixInstructionsInvalid;
            default:
                return true;
        }
    };


    if (!isOpen) return null;

    const modeButtons = [
        { key: 'create', label: 'New Page', icon: PlusCircle },
        // { key: 'createBlog', label: 'New Blog', icon: Newspaper },
        { key: 'createDoc', label: 'New Docs', icon: BookText },
        { key: 'redesign', label: 'Redesign', icon: Wand2 },
    ];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full border border-slate-700 shadow-xl overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800/50">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">{getModalTitle()}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Mode Toggle Buttons */}
                <div className="flex justify-center mb-6">
                    <div className="inline-flex flex-wrap justify-center rounded-lg border border-slate-700 bg-slate-900/70 backdrop-blur-sm p-1 gap-1">
                        {modeButtons.map(item => (
                             <button
                                key={item.key}
                                onClick={() => handleModeToggle(item.key)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all text-xs sm:text-sm 
                                            ${mode === item.key ? 'bg-indigo-500 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                            >
                                <item.icon className="h-4 w-4" /> {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content based on selected mode */}
                {mode === 'create' && (
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="createInstructions" className="block text-white font-medium mb-2">
                                What kind of landing page do you want to build?
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
                            <p className="text-sm text-slate-400 mb-3">Quick suggestions:</p>
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
                                    <span className="font-medium text-white">Export Options:</span> After creating your website, you can download the full source code in React.js or HTML/CSS format.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'redesign' && (
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                                <label htmlFor="websiteUrlRedesign" className="block text-white font-medium mb-2">
                                    Paste a link to redesign <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="url"
                                    id="websiteUrlRedesign"
                                    value={websiteUrl}
                                    onChange={(e) => setWebsiteUrl(e.target.value)}
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
                                        onClick={() => setRedesignMode('multi')}
                                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-l-md transition-all ${redesignMode === 'multi' ? 'bg-indigo-500 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                                    > <Images className="h-4 w-4" /> Multi </button>
                                    <button
                                        onClick={() => setRedesignMode('manual')}
                                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-r-md transition-all border-l border-slate-600 ${redesignMode === 'manual' ? 'bg-indigo-500 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                                    > <Layout className="h-4 w-4" /> Manual </button>
                                </div>
                            </div>
                        </div>
                        {redesignMode === 'manual' && (
                             <div className="p-3 bg-indigo-900/20 border border-indigo-700/30 rounded-lg text-sm text-indigo-200">
                                <Layout className="inline h-4 w-4 mr-2" />
                                Manual Mode: Choose your theme for a single optimized design.
                            </div>
                        )}
                        {redesignMode === 'multi' && (
                            <div className="p-3 bg-indigo-900/20 border border-indigo-700/30 rounded-lg text-sm text-indigo-200">
                                <Images className="inline h-4 w-4 mr-2" />
                                Multi-Design Mode: Generate three unique landing page variations.
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
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {redesignThemeOptions.map((option, index) => (
                                        <DesignOption
                                            key={index}
                                            icon={option.icon}
                                            title={option.title}
                                            description={option.description}
                                            isSelected={selectedRedesignThemeIndex === index}
                                            onClick={() => setSelectedRedesignThemeIndex(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {mode === 'createBlog' && (
                    <div className="space-y-6">
                         <div>
                            <label htmlFor="blogContextUrl" className="block text-white font-medium mb-2">
                                Your Website URL (for context & style, optional)
                            </label>
                            <input
                                type="url"
                                id="blogContextUrl"
                                value={websiteUrl}
                                onChange={(e) => setWebsiteUrl(e.target.value)}
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
                                placeholder="e.g., 'The future of renewable energy', 'Tips for learning a new programming language'"
                                rows={3}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 mb-3">Topic suggestions:</p>
                            <div className="flex flex-wrap gap-2">
                                {blogTopicSuggestions.map((suggestion, index) => (
                                    <SuggestionChip key={index} text={suggestion} onClick={() => handleSuggestionClick(suggestion, 'blogTopic')} />
                                ))}
                            </div>
                        </div>
                       
                        
                        <div>
                            <label htmlFor="blogCustomInstructions" className="block text-white font-medium mb-2">Additional Instructions (Optional)</label>
                            <textarea
                                id="blogCustomInstructions" value={customInstructions} onChange={(e) => handleInstructionsChange(e.target.value)}
                                placeholder="e.g., 'Target audience: tech enthusiasts', 'Tone: informal and engaging'"
                                rows={3}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                )}

                {mode === 'createDoc' && (
                    <div className="space-y-6">
                        <div className="border-b border-slate-700">
                            <nav className="flex space-x-4 sm:space-x-6 -mb-px">
                                <button onClick={() => setDocContentSourceTab('url')}
                                    className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors ${docContentSourceTab === 'url' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'}`}>
                                    <div className="flex items-center gap-2"><Github className="h-4 w-4" /> From Repository URL</div>
                                </button>
                                <button onClick={() => setDocContentSourceTab('file')}
                                    className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors ${docContentSourceTab === 'file' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'}`}>
                                    <div className="flex items-center gap-2"><FileText className="h-4 w-4" /> From README.md Text</div>
                                </button>
                            </nav>
                        </div>
                        <div className="min-h-[100px] pt-4">
                            {docContentSourceTab === 'url' && (
                                <div>
                                    <label htmlFor="docRepoUrl" className="block text-white font-medium mb-2">GitHub Repository URL <span className="text-red-400">*</span></label>
                                    <input type="url" id="docRepoUrl" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)}
                                        placeholder="https://github.com/username/repository"
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                                    <p className="text-slate-400 text-xs mt-2">Provide a public GitHub repository. AI will analyze its content.</p>
                                </div>
                            )}
                            {docContentSourceTab === 'file' && (
                                 <div>
                                 <label htmlFor="markdownUpload" className="block text-white font-medium mb-2">
                                    Add your README.md Text <span className="text-red-400">*</span>
                                  </label>
                                 <textarea
                                   id="blogCustomInstructions"
                                   value={readmeText}
                                   onChange={(e) => setreadmeText(e.target.value)}
                                   placeholder="e.g., 'Target audience: tech enthusiasts', 'Tone: informal and engaging', 'Include a call to action for newsletter signup'"
                                   rows={3}
                                   className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                 />
                               </div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="docInstructions" className="block text-white font-medium mb-2">Additional Instructions (Optional)</label>
                            <textarea id="docInstructions" value={customInstructions} onChange={(e) => handleInstructionsChange(e.target.value)}
                                placeholder="e.g., 'Organize by sections in README', 'Focus on API endpoints'"
                                rows={3}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                )}

                {mode === 'remix' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-white font-medium mb-3">Choose a Template <span className="text-red-400">*</span></label>
                            {allTemplatesFromStore && allTemplatesFromStore.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[250px] overflow-y-auto p-1 pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800/50 rounded-lg border border-slate-700">
                                    {allTemplatesFromStore.map((template) => (
                                        <button key={template.id} onClick={() => setSelectedTemplateForRemix(template)}
                                            className={`group bg-slate-800/60 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg w-full text-left ${selectedTemplateForRemix?.id === template.id ? 'ring-2 ring-indigo-500 border-indigo-500' : 'border border-transparent hover:border-slate-600'}`}>
                                            <div className="relative overflow-hidden aspect-video bg-slate-700">
                                                <img src={template.image} alt={template.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300x168?text=No+Preview')} />
                                                {selectedTemplateForRemix?.id === template.id && (<div className="absolute inset-0 bg-indigo-500/40 flex items-center justify-center"><CheckCircle className="h-8 w-8 text-white" /></div>)}
                                            </div>
                                            <div className="p-2">
                                                <h4 className="font-medium text-white text-xs sm:text-sm truncate">{template.name}</h4>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (<p className="text-slate-400 text-center py-4 bg-slate-900/30 rounded-lg text-sm">No templates available.</p>)}
                        </div>
                        <div className="border-b border-slate-700">
                            <nav className="flex space-x-4 sm:space-x-6 -mb-px">
                                <button onClick={() => setRemixActiveTab('url')}
                                    className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors ${remixActiveTab === 'url' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'}`}>
                                    <div className="flex items-center gap-2"><Globe className="h-4 w-4" /> Apply to Existing Page</div>
                                </button>
                                <button onClick={() => setRemixActiveTab('instructions')}
                                    className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors ${remixActiveTab === 'instructions' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'}`}>
                                    <div className="flex items-center gap-2"><FileText className="h-4 w-4" /> Customize Template</div>
                                </button>
                            </nav>
                        </div>
                        <div className="min-h-[100px] pt-4">
                            {remixActiveTab === 'url' && (
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="remixWebsiteUrl" className="block text-white font-medium mb-2">Your website URL <span className="text-red-400">*</span></label>
                                        <input type="url" id="remixWebsiteUrl" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)}
                                            placeholder="https://your-existing-site.com"
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                                        <p className="text-slate-400 text-xs mt-2">AI will apply "{selectedTemplateForRemix?.name || 'selected template'}" to this site.</p>
                                    </div>
                                    <div>
                                        <label htmlFor="remixUrlInstructions" className="block text-white font-medium mb-2">Instructions (Optional)</label>
                                        <textarea id="remixUrlInstructions" value={customInstructions} onChange={(e) => handleInstructionsChange(e.target.value)} rows={2}
                                            placeholder="e.g., 'Keep current logo', 'Change color palette...'"
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                </div>
                            )}
                             {remixActiveTab === 'instructions' && (
                                <div>
                                    <label htmlFor="remixOnlyInstructions" className="block text-white font-medium mb-2">Customization Instructions <span className="text-red-400">*</span></label>
                                    <textarea id="remixOnlyInstructions" value={customInstructions} onChange={(e) => handleInstructionsChange(e.target.value)} rows={4}
                                        placeholder="e.g., 'Change colors to blue/silver', 'Add contact form', 'Make it for a coffee shop'..."
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                     <p className="text-slate-400 text-xs mt-2">Describe how you want to customize "{selectedTemplateForRemix?.name || 'selected template'}".</p>
                                </div>
                            )}
                        </div>
                         <div className="p-3 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-700/30 rounded-lg text-sm text-green-200">
                             <Grid3x3 className="inline h-4 w-4 mr-2" />
                             <span className="font-medium text-white">{allTemplatesFromStore?.length || '0'}+ AI Templates:</span> Choose from professionally designed, customizable templates.
                        </div>
                    </div>
                )}


                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-700">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleFormSubmit}
                        disabled={isSubmitDisabled()}
                        className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg
                            bg-gradient-to-r from-indigo-500 to-purple-500 text-white
                            hover:from-indigo-600 hover:to-purple-600 hover:shadow-indigo-500/25
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-700 disabled:shadow-none`}
                    >
                        {getSubmitButtonText()}
                        <ArrowRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewWebsiteModal;