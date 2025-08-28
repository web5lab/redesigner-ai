import React, { useState, useEffect, useRef } from 'react';
import {
    Zap,
    ArrowRight,
    X,
    Eye,
    Sparkles,
    LayoutGrid,
    FileText,
    Newspaper,
    Briefcase,
    BookText
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { publicTemplatesSelector } from '../store/global.Selctor';
import { useNavigate } from 'react-router-dom';

const TemplateShowcase = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const sectionRef = useRef(null);
    const navigate = useNavigate();

    const templates = useSelector(publicTemplatesSelector);

    const [activeTab, setActiveTab] = useState('all');

    const tabCategories = [
        { id: 'all', label: 'All Templates', icon: <LayoutGrid className="h-4 w-4 mr-2" /> },
        { id: 'docs', label: 'Docs', icon: <BookText className="h-4 w-4 mr-2" /> },
        { id: 'landingPage', label: 'Landing Pages', icon: <FileText className="h-4 w-4 mr-2" /> },
        { id: 'blog', label: 'Blogs', icon: <Newspaper className="h-4 w-4 mr-2" /> },
        { id: 'portfolio', label: 'Portfolios', icon: <Briefcase className="h-4 w-4 mr-2" /> },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    sectionRef.current?.classList.add('section-enter-active');
                    sectionRef.current?.classList.remove('section-enter');
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            sectionRef.current.classList.add('section-enter');
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleUseTemplate = (template) => {
        navigate('/dashboard');
    };

    const displayedTemplates = templates;


    return (
        <>
            {selectedTemplate && (
                <div className="fixed  z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-800/50">
                            <div className="flex items-center gap-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-white">{selectedTemplate.name}</h3>
                                    <p className="text-sm text-slate-400">{selectedTemplate.category || 'General'} Template</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* The "Use This Template" button in the modal can also use handleUseTemplate */}
                                <button
                                    onClick={() => handleUseTemplate(selectedTemplate)}
                                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-2.5 px-6 rounded-lg font-medium transition-all duration-200"
                                >
                                    <Zap className="h-4 w-4" />
                                    Use This Template
                                </button>
                                <button
                                    onClick={() => setSelectedTemplate(null)}
                                    className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                                >
                                    <X className="h-6 w-6 text-slate-400" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="overflow-y-auto max-h-[calc(90vh-100px)]"> {/* Adjusted height for header */}
                            <div className="p-6">
                                <div className="aspect-[16/10] rounded-lg overflow-hidden bg-slate-700/30 border border-slate-600/50">
                                    <iframe
                                        src={selectedTemplate.previewUrl || "about:blank"} // Provide a fallback
                                        className="w-full h-full"
                                        title={`Preview of ${selectedTemplate.name}`}
                                        sandbox="allow-scripts allow-same-origin" // Security for iframes
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <section ref={sectionRef} className="relative py-20 md:py-28  overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/2 right-1/2 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-12 md:mb-16"> {/* Reduced bottom margin slightly */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full px-4 py-2 mb-6">
                            <Sparkles className="h-4 w-4 text-indigo-400" />
                            <span className="text-sm font-medium text-indigo-300">1600+ Prebuilt AI Themes</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">
                            Choose Your Perfect
                            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                                Design Template
                            </span>
                        </h2>

                        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Explore a vast collection of professionally designed themes powered by AI — tailored for performance,
                            accessibility, and visual brilliance on every screen.
                        </p>
                    </div>

                    {/* NEW: Tabs for Template Categories */}
                    {/* <div className="mb-10 md:mb-12 flex justify-center">
                        <div className="flex flex-wrap justify-center items-center gap-2 p-1.5 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl">
                            {tabCategories.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-out
                                        ${activeTab === tab.id
                                            ? 'bg-indigo-500 text-white shadow-lg'
                                            : 'text-slate-300 hover:bg-slate-700/70 hover:text-white'
                                        }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div> */}

                    {/* Templates Grid */}
                    {displayedTemplates && displayedTemplates.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {displayedTemplates.map((template, index) => (
                                <div
                                    key={template.id || index} // Added index as fallback key
                                    className={`template-card group ${index % 2 === 0 ? 'floating' : 'floating-delay'}`}
                                >
                                    <div className="gradient-border">
                                        <div className="gradient-border-inner overflow-hidden">
                                            <div className="relative overflow-hidden aspect-[4/3]">
                                                <img
                                                    src={template.image || 'https://via.placeholder.com/400x300?text=No+Preview'} // Fallback image
                                                    alt={template.name || 'Template Preview'}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Error+Loading'; }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                            <div className="p-6">
                                                <h4 className="text-lg font-semibold text-white mb-1 truncate group-hover:text-indigo-300 transition-colors">
                                                    {template.name || 'Unnamed Template'}
                                                </h4>
                                                <p className="text-sm text-slate-400 mb-4 truncate h-5">
                                                    {template.category || 'General Purpose'}
                                                </p>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => setSelectedTemplate(template)}
                                                        className="flex-1 flex items-center justify-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-200 border border-slate-600/50 hover:border-slate-500/50"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        Preview
                                                    </button>
                                                    <button
                                                        onClick={() => handleUseTemplate(template)}
                                                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-200"
                                                    >
                                                        <Zap className="h-4 w-4" />
                                                        Use Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <LayoutGrid className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-300 mb-2">No Templates Found</h3>
                            <p className="text-slate-400">
                                It seems there are no templates available for the selected category or at all.
                                {activeTab !== 'all' && (
                                    <button onClick={() => setActiveTab('all')} className="text-indigo-400 hover:text-indigo-300 ml-1">
                                        View all templates.
                                    </button>
                                )}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default TemplateShowcase;