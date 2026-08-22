import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { MemeProvider } from './context/MemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <MemeProvider>
        <App />
      </MemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
