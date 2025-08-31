import React, { useState, useEffect } from 'react';
import { useEditor } from '../../context/EditorContext'; // Assuming this path is correct
import { updateElementContent } from '../../utils/domUtils'; // Assuming this path is correct
import { Type } from 'lucide-react';

const TextEditor = () => {
  const { selectedElement, html, setHtml, iframeRef, addToHistory } = useEditor();
  const [text, setText] = useState('');

  useEffect(() => {
    if (selectedElement) {
      // Ensure we handle cases where textContent might be null
      setText(selectedElement.textContent || '');
    }
  }, [selectedElement]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleApplyText = () => {
    if (!selectedElement || !iframeRef.current) return;
    
    // Assuming updateElementContent handles the selected element being part of iframeRef.current.document
    const newHtml = updateElementContent(
      selectedElement, 
      text, 
      iframeRef.current, // Pass the iframe ref directly
      html // Pass the current full HTML string
    );
    
    if (newHtml !== null && newHtml !== undefined) { // Check if newHtml is actually returned
      setHtml(newHtml);
      addToHistory(newHtml); // Add the new state to history
    }
  };

  // If no element is selected, this component (or its content) shouldn't render.
  // This check is good, but the parent (PropertiesPanel) might already handle this.
  if (!selectedElement) return null;

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 mb-4">
      <h3 className="flex items-center text-sm font-medium text-slate-200 mb-3">
        <Type className="w-4 h-4 mr-2 text-indigo-400" />
        Text Content
      </h3>
      <textarea
        value={text}
        onChange={handleTextChange}
        className="w-full p-2 border border-slate-600 bg-slate-700 text-slate-100 rounded-md mb-3 min-h-24 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400"
        placeholder="Enter text content..."
      />
      <button
        onClick={handleApplyText}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
      >
        Apply Changes
      </button>
    </div>
  );
};

export default TextEditor;