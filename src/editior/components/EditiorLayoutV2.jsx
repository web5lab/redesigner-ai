import React from 'react';
import Preview from './Preview';
import PropertiesPanel from './PropertiesPanel';
import { useEditor } from '../context/EditorContext';

function EditorLayoutV2 ({ viewport = "desktop" }) {
    const { selectedElement } = useEditor();
    return (
        <div className="flex flex-col h-screen bg-slate-900 text-slate-300 antialiased">
            <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
                <div className="w-full max-w-[360px] md:w-2/5 lg:w-1/3 h-1/2 md:h-full overflow-hidden flex flex-col bg-slate-800 border-r border-slate-600">
                    <div className="flex-grow overflow-y-auto custom-scrollbar">
                        <div className="h-full">
                            <PropertiesPanel />
                            {!selectedElement && (
                                <div className="flex items-center justify-center h-full text-center p-8">
                                    <div className="max-w-sm">
                                        <svg className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <h3 className="mt-2 text-lg font-medium text-slate-100">No element selected</h3>
                                        <p className="mt-1 text-sm text-slate-400">
                                            Click on an element in the preview canvas to see and edit its properties.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-3/5 lg:w-full h-1/2 md:h-full overflow-auto bg-slate-900">
                    <Preview viewport={viewport} />
                </div>
            </div>
        </div>
    );
};

export default EditorLayoutV2;
