import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './store/index.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import { Feedback } from "feedaura"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster  position='bottom-left'/>
        {/* <Feedback projectSecret="cmap09nbk0003jf0z1dajc5if"  apiEndpoint='https://feedaura.feedaura-ai.workers.dev/feedbacks'/> */}
      </PersistGate>
    </Provider>
  </StrictMode>
);