import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultHtml } from '../data/defaultHtml';
import { useSelector } from 'react-redux';
import { editiorPageSelector } from '../../store/global.Selctor';
const EditorContext = createContext(undefined);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};

export const EditorProvider = ({ children }) => {
  const [html, setHtml] = useState(defaultHtml);
  const wesbsiteId = useSelector(editiorPageSelector)
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedElementType, setSelectedElementType] = useState(null);
  const [undoStack, setUndoStack] = useState([defaultHtml]);
  const [redoStack, setRedoStack] = useState([]);
  const [autoSave, setAutoSave] = useState(true);
  const iframeRef = React.useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (wesbsiteId) {
      const fetchHtml = async () => {
        const url = `${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${wesbsiteId}`
        const response = await fetch(url);
        const html = await response.text();
        setHtml(html);
        addToHistory(html);
      }
      fetchHtml()
    }
  }, [wesbsiteId])


  const loadFromUrl = async (url) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const html = await response.text();
      setHtml(html);
      addToHistory(html);
    } catch (error) {
      console.error('Failed to load HTML from URL:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addToHistory = React.useCallback((newHtml) => {
    setUndoStack(prev => [...prev.slice(0, 20), newHtml]);
    setRedoStack([]); // Clear redo stack when new changes are made
  }, [autoSave]);

  const undo = () => {
    if (undoStack.length > 1) {
      const newUndoStack = [...undoStack];
      const current = newUndoStack.pop();
      setUndoStack(newUndoStack);
      setRedoStack(prev => [...prev, current]);
      setHtml(newUndoStack[newUndoStack.length - 1]);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const newRedoStack = [...redoStack];
      const next = newRedoStack.pop();
      setRedoStack(newRedoStack);
      setUndoStack(prev => [...prev, next]);
      setHtml(next);
    }
  };

  return (
    <EditorContext.Provider
      value={{
        html,
        setHtml,
        selectedElement,
        setSelectedElement,
        selectedElementType,
        setSelectedElementType,
        iframeRef,
        undoStack,
        redoStack,
        addToHistory,
        undo,
        redo,
        canUndo: undoStack.length > 1,
        canRedo: redoStack.length > 0,
        autoSave,
        setAutoSave,
        loadFromUrl,
        isLoading
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};