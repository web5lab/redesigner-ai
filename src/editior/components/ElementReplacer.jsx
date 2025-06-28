import React from 'react';
import { useEditor } from '../context/EditorContext'; // Assuming path is correct
import { replaceElement } from '../utils/domUtils'; // Assuming path is correct
import { Image, Type, Link, Square, ListOrdered, FormInput, Donut as ButtonIcon } from 'lucide-react'; // Renamed Button to ButtonIcon to avoid conflict with HTML button element

const ElementReplacer = () => {
  const { selectedElement, html, setHtml, iframeRef, addToHistory } = useEditor();

  // Note: The 'Button' alias for 'Donut' icon was changed to 'ButtonIcon'
  // to avoid confusion if you were to use an actual <Button> component later.
  // If 'Type', 'Link', 'Square', 'ListOrdered' icons are not used, they can be removed.
  const elements = [
    { type: 'img', label: 'Image', icon: <Image className="w-4 h-4 mr-2" /> }, // Added mr-2 for spacing
    { type: 'input', label: 'Input', icon: <FormInput className="w-4 h-4 mr-2" /> } // Added mr-2 for spacing
    // Example using ButtonIcon (originally Donut)
    // { type: 'button', label: 'Button', icon: <ButtonIcon className="w-4 h-4 mr-2" /> },
  ];

  const handleReplace = (newType) => {
    if (!selectedElement || !iframeRef.current) return;
    const newHtml = replaceElement(
      selectedElement,
      newType,
      iframeRef.current,
      html
    );

    if (newHtml) {
      setHtml(newHtml);
      addToHistory(newHtml);
    }
  };

  if (!selectedElement) return null;

  return (
    <div className="bg-slate-800 rounded-lg shadow-md border border-slate-700 p-4 mb-4">
      <h3 className="text-sm font-medium text-slate-100 mb-3">Replace Element</h3>
      <div className="grid grid-cols-2 gap-2">
        {elements.map((element) => (
          <button
            key={element.type}
            onClick={() => handleReplace(element.type)}
            className="flex items-center justify-center p-2 border border-slate-600 rounded-md 
                       text-slate-300 hover:bg-slate-700 hover:border-slate-500 hover:text-slate-100 
                       transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            {element.icon}
            <span className="text-sm">{element.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ElementReplacer;