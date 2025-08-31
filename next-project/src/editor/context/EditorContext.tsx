'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, RefObject } from 'react'
import { useSelector } from 'react-redux'
import { editorPageSelector } from '@/store/global.Selector'

interface EditorContextType {
  html: string
  setHtml: (html: string) => void
  selectedElement: HTMLElement | null
  setSelectedElement: (element: HTMLElement | null) => void
  selectedElementType: string | null
  setSelectedElementType: (type: string | null) => void
  undoStack: string[]
  redoStack: string[]
  addToHistory: (html: string) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  autoSave: boolean
  setAutoSave: (autoSave: boolean) => void
  loadFromUrl: (url: string) => Promise<void>
  isLoading: boolean
  iframeRef: RefObject<HTMLIFrameElement>
}

const defaultHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Settings - Clean & Light</title>
    <meta name="description" content="Manage your profile and account settings with a clean, light theme.">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 font-sans text-gray-800 leading-normal antialiased">
    
</body>
</html>
`

const EditorContext = createContext<EditorContextType | undefined>(undefined)

export const useEditor = () => {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider')
  }
  return context
}

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [html, setHtml] = useState(defaultHtml)
  const websiteId = useSelector(editorPageSelector)
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null)
  const [selectedElementType, setSelectedElementType] = useState<string | null>(null)
  const [undoStack, setUndoStack] = useState([defaultHtml])
  const [redoStack, setRedoStack] = useState<string[]>([])
  const [autoSave, setAutoSave] = useState(true)
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (websiteId) {
      const fetchHtml = async () => {
        const url = `${process.env.VITE_FILE_SERVER_URL}/saved-pages/${websiteId}`
        const response = await fetch(url)
        const html = await response.text()
        setHtml(html)
        addToHistory(html)
      }
      fetchHtml()
    }
  }, [websiteId])

  const loadFromUrl = async (url: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(url)
      const html = await response.text()
      setHtml(html)
      addToHistory(html)
    } catch (error) {
      console.error('Failed to load HTML from URL:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const addToHistory = React.useCallback((newHtml: string) => {
    setUndoStack(prev => [...prev.slice(0, 20), newHtml])
    setRedoStack([])
  }, [])

  const undo = () => {
    if (undoStack.length > 1) {
      const newUndoStack = [...undoStack]
      const current = newUndoStack.pop()!
      setUndoStack(newUndoStack)
      setRedoStack(prev => [...prev, current])
      setHtml(newUndoStack[newUndoStack.length - 1])
    }
  }

  const redo = () => {
    if (redoStack.length > 0) {
      const newRedoStack = [...redoStack]
      const next = newRedoStack.pop()!
      setRedoStack(newRedoStack)
      setUndoStack(prev => [...prev, next])
      setHtml(next)
    }
  }

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
  )
}