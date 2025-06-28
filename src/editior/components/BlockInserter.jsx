import React from 'react';
import { useEditor } from '../context/EditorContext';
import { createElement } from '../utils/domUtils';
import Modal from './Modal';
import { Type, Image, Link, Donut as Button, ListOrdered, Square, FormInput } from 'lucide-react';


const BlockInserter= () => {
  const { selectedElement, html, setHtml, iframeRef, addToHistory } = useEditor();
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);

  const blocks = [
    { type: 'h2', label: 'Heading', icon: <Type className="w-4 h-4" /> },
    { type: 'p', label: 'Paragraph', icon: <Type className="w-4 h-4" /> },
    { type: 'div', label: 'Container', icon: <Square className="w-4 h-4" /> },
    { type: 'button', label: 'Button', icon: <Button className="w-4 h-4" /> },
    { type: 'a', label: 'Link', icon: <Link className="w-4 h-4" /> },
    { type: 'img', label: 'Image', icon: <Image className="w-4 h-4" /> },
    { type: 'ul', label: 'List', icon: <ListOrdered className="w-4 h-4" /> },
    { type: 'input', label: 'Input', icon: <FormInput className="w-4 h-4" /> }
  ];

  const handleInsertBlock = (type) => {
    if (!selectedElement || !iframeRef.current) return;

    const newHtml = createElement(
      type,
      selectedElement,
      iframeRef.current,
      html
    );

    if (newHtml) {
      setHtml(newHtml);
      addToHistory(newHtml);
    }
  };

  const handleImageInsert = (url) => {
    if (!selectedElement || !iframeRef.current) return;

    const newHtml = createElement(
      'img',
      selectedElement,
      iframeRef.current,
      html,
      { src: url }
    );

    if (newHtml) {
      setHtml(newHtml);
      addToHistory(newHtml);
    }
    setIsImageModalOpen(false);
  };

  const handleBlockClick = (type) => {
    if (type === 'img') {
      setIsImageModalOpen(true);
    } else {
      handleInsertBlock(type);
    }
  };

  if (!selectedElement) return null;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Insert Block</h3>
        <div className="grid grid-cols-2 gap-2">
          {blocks.map((block) => (
            <button
              key={block.type}
              onClick={() => handleBlockClick(block.type)}
              className="flex items-center justify-center p-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              {block.icon}
              <span className="ml-2 text-sm">{block.label}</span>
            </button>
          ))}
        </div>
      </div>
      <Modal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onConfirm={handleImageInsert}
        title="Insert Image"
        inputLabel="Image URL"
        inputPlaceholder="https://example.com/image.jpg"
        confirmText="Insert Image"
      />
    </>
  );
};

export default BlockInserter;