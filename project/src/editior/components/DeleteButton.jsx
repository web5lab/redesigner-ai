import React from 'react';
import { Trash2 } from 'lucide-react';
import { useEditor } from '../context/EditorContext'; // Assuming this path is correct
import { removeElement } from '../utils/domUtils'; // Assuming this path is correct

const DeleteButton = () => {
  const { selectedElement, html, setHtml, iframeRef, addToHistory, setSelectedElement } = useEditor();

  const handleDelete = () => {
    if (!selectedElement || !iframeRef.current) return;

    // Don't allow deleting the body or html elements
    if (selectedElement.tagName.toLowerCase() === 'body' || 
        selectedElement.tagName.toLowerCase() === 'html') {
      // Optionally, provide feedback to the user here (e.g., a toast notification)
      console.warn("Cannot delete <body> or <html> elements.");
      return;
    }

    const newHtml = removeElement(
      selectedElement,
      iframeRef.current,
      html
    );

    if (newHtml) {
      setHtml(newHtml);
      addToHistory(newHtml);
      setSelectedElement(null); // Deselect after deletion
    }
  };

  // Only render the button if an element is selected and it's not the body/html
  if (!selectedElement || 
      selectedElement.tagName.toLowerCase() === 'body' || 
      selectedElement.tagName.toLowerCase() === 'html') {
    return null;
  }

  return (
    <button
      onClick={handleDelete}
      aria-label="Delete selected element"
      // Theme Change: Adjusted red shades for a slightly deeper, more "slate-like" feel,
      // while maintaining strong visual cue for a destructive action.
      // It will fit well on a bg-slate-800 (PropertiesPanel background) or similar dark surface.
      className="flex items-center justify-center w-full px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md text-sm font-medium transition-colors duration-200 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
    >
      <Trash2 className="w-4 h-4 mr-2 flex-shrink-0" />
      Delete Element
    </button>
  );
};

export default DeleteButton;