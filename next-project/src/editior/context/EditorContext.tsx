import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { defaultHtml } from '../data/defaultHtml';
import { useSelector } from 'react-redux';
import { editiorPageSelector } from '../../store/global.Selctor';

interface EditorContextType {
  html: string;
  setHtml: (html: string) => void;
  selectedElement: HTMLElement | null;
  setSelectedElement: (element: HTMLElement | null) => void;
  selectedElementType: string | null;
  setSelectedElementType: (type: string | null) => void;
  undoStack: string[];
  redoStack: string[];
  addToHistory: (html: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  autoSave: boolean;
  setAutoSave: (autoSave: boolean) => void;
  loadFromUrl: (url: string) => Promise<void>;
  isLoading: boolean;
  iframeRef: React.RefObject<HTMLIFrameElement>;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [html, setHtml] = useState(defaultHtml);
  const wesbsiteId = useSelector(editiorPageSelector)
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [selectedElementType, setSelectedElementType] = useState<string | null>(null);
  const [undoStack, setUndoStack] = useState([defaultHtml]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [autoSave, setAutoSave] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (wesbsiteId) {
      const fetchHtml = async () => {
        const url = `${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/saved-pages/${wesbsiteId}`
        const response = await fetch(url);
        const html = await response.text();
        setHtml(html);
        addToHistory(html);
      }
      fetchHtml()
    }
  }, [wesbsiteId])

  const loadFromUrl = async (url: string) => {
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

  const addToHistory = React.useCallback((newHtml: string) => {
    setUndoStack(prev => [...prev.slice(0, 20), newHtml]);
    setRedoStack([]); // Clear redo stack when new changes are made
  }, [autoSave]);

  const undo = () => {
    if (undoStack.length > 1) {
      const newUndoStack = [...undoStack];
      const current = newUndoStack.pop()!;
      setUndoStack(newUndoStack);
      setRedoStack(prev => [...prev, current]);
      setHtml(newUndoStack[newUndoStack.length - 1]);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const newRedoStack = [...redoStack];
      const next = newRedoStack.pop()!;
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