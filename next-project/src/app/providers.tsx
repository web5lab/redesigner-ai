'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import { store, persistor } from '../store';
import { EditorProvider } from '../editior/context/EditorContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <EditorProvider>
          {children}
          <Toaster position='bottom-left' />
        </EditorProvider>
      </PersistGate>
    </Provider>
  );
}