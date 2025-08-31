import React from 'react';
import { useEditor } from '../context/EditorContext';
import { getElementPath } from '../utils/elementUtils';
import { ChevronRight } from 'lucide-react';

const ElementInspector= () => {
  const { selectedElement, iframeRef } = useEditor();

  if (!selectedElement || !iframeRef.current) return null;

  const elementPath = getElementPath(selectedElement, iframeRef.current);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Element Path</h3>
      <div className="flex items-center flex-wrap text-xs text-gray-600">
        {elementPath.map((item, index) => (
          <React.Fragment key={index}>
            <span className="bg-gray-100 px-2 py-1 rounded">{item}</span>
            {index < elementPath.length - 1 && (
              <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ElementInspector;