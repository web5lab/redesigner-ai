import React from 'react';
import { useEditor } from '../context/EditorContext';
import TextEditor from './editors/TextEditor';
import StyleEditor from './editors/StyleEditor';
import ElementInspector from './ElementInspector';
import ElementReplacer from './ElementReplacer';
import BlockInserter from './BlockInserter';
import DeleteButton from './DeleteButton';
import { ElementType } from '../types/editor';

const PropertiesPanel= () => {
  const { selectedElement, selectedElementType } = useEditor();

  if (!selectedElement) return null;

  return (
    <div className="p-4 space-y-6">
      {/* <ElementInspector /> */}
      <ElementReplacer />
      {/* <BlockInserter /> */}
      <DeleteButton />
      
      {selectedElementType && (
        <>
          {/* Show text editor for text-containing elements */}
          {(selectedElementType === ElementType.Heading || 
            selectedElementType === ElementType.Paragraph || 
            selectedElementType === ElementType.Link ||
            selectedElementType === ElementType.Button) && (
            <TextEditor />
          )}
          
          {/* Always show style editor for any selected element */}
          <StyleEditor />
        </>
      )}
    </div>
  );
};

export default PropertiesPanel;