'use client'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/store'
import { EditorProvider } from '@/editor/context/EditorContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <EditorProvider>
          {children}
        </EditorProvider>
      </PersistGate>
    </Provider>
  )
}