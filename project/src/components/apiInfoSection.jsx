import React from 'react';
import {
    ArrowRight, Server, Code, Zap, Globe, Database,
    Key, BarChart, Lock, CheckCircle, Settings, Layers,
    Cpu
} from 'lucide-react';

const EnhancedApiSection = () => {
    return (
        <>

            <div className="mx-auto mt-8 max-w-7xl   p-8 mb-10  relative overflow-hidden">
                {/* Animated gradient blob in background */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/40 border border-indigo-700/50 mb-4">
                        <Cpu className="w-4 h-4 mr-2 text-indigo-400" />
                        <span className="text-indigo-300 text-sm font-medium">Developer API</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight bg-clip-text text-white bg-gradient-to-r from-white via-indigo-200 to-purple-200">
                        Integrate AI Website Builder Into Your Platform
                    </h2>

                    <p className="max-w-3xl mx-auto text-lg text-slate-300">
                        Supercharge your applications with our powerful API. Create, redesign, and rebrand websites
                        programmatically with just a few lines of code.
                    </p>
                </div>
              

                <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative z-10">
                    {/* Left content section */}
                    <div className="flex-1">
                        <div className="inline-block px-3 py-1 mb-4 bg-indigo-900/40 rounded-full backdrop-blur-sm border border-indigo-700/50">
                            <span className="text-indigo-300 text-sm font-medium">New for Developers</span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Powerful <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">API Access</span> for Seamless Integration
                        </h3>

                        <p className="text-slate-300 mb-6 text-lg">
                            Integrate our advanced AI website builder directly into your applications with our comprehensive API suite. Build, redesign, and rebrand websites programmatically at scale.
                        </p>

                        <div className="mt-2 p-4 bg-slate-800/70 rounded-lg border border-slate-700/50">
                            <div className="flex items-start">
                                <Code className="h-5 w-5 text-purple-400 mt-1 mr-3 flex-shrink-0" />
                                <p className="text-sm text-purple-200">
                                    <span className="font-medium text-white">Get started quickly:</span> Our RESTful API returns clean JSON responses with complete HTML/CSS/JS code and React components. Perfect for agencies, SaaS platforms, and enterprise solutions.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right content section with code preview */}
                    <div className="w-full md:w-2/5 bg-slate-900/80 rounded-lg border border-slate-700/50 backdrop-blur-sm overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700/50">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-xs text-slate-400">API Request Example</span>
                        </div>
                        <pre className="p-4 overflow-x-auto text-sm">
                            <code className="text-indigo-300">
                                <span className="text-purple-400">POST</span> <span className="text-slate-300">/api/v1/websites/generate</span>
                                {"\n"}
                                <span className="text-slate-500">// Request body</span>
                                {"\n"}
                                {"{\n"}
                                <span className="text-slate-400">  "mode"</span>: <span className="text-green-400">"redesign"</span>,
                                {"\n"}
                                <span className="text-slate-400">  "url"</span>: <span className="text-green-400">"https://example.com"</span>,
                                {"\n"}
                                <span className="text-slate-400">  "theme"</span>: <span className="text-green-400">"dark"</span>,
                                {"\n"}
                                <span className="text-slate-400">  "customInstructions"</span>: <span className="text-green-400">"Modern tech style"</span>
                                {"\n"}
                                {"}"}
                                {"\n\n"}
                                <span className="text-slate-500">// Response (truncated)</span>
                                {"\n"}
                                {"{\n"}
                                <span className="text-slate-400">  "id"</span>: <span className="text-yellow-400">"web_01HGZT..."</span>,
                                {"\n"}
                                <span className="text-slate-400">  "status"</span>: <span className="text-green-400">"success"</span>,
                                {"\n"}
                                <span className="text-slate-400">  "html"</span>: <span className="text-green-400">"{"<!DOCTYPE html>..."}"</span>,
                                {"\n"}
                                <span className="text-slate-400">  "react"</span>: <span className="text-green-400">{"..."}</span>
                                {"\n"}
                                {"}"}
                            </code>
                        </pre>
                    </div>
                </div>

                {/* Bottom CTA section */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
                    <a
                        href="/api-docs"
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 w-full sm:w-auto"
                    >
                        Explore API Documentation <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                        href="/api-playground"
                        className="flex items-center justify-center gap-2 bg-slate-800/70 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 border border-indigo-500/30 w-full sm:w-auto"
                    >
                        Try API Playground <Code className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </>
    );
};

export default EnhancedApiSection;