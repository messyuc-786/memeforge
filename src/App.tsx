import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { MemeCanvas } from './components/MemeCanvas';
import { Toolbar } from './components/Toolbar';
import { TemplatesModal } from './components/panels/TemplatesModal';
import { SettingsModal } from './components/panels/SettingsModal';
import { ExportModal } from './components/panels/ExportModal';
import { useMeme } from './context/MemeContext';
import { ToolMode } from './types';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'studio'>('landing');
  const {
    setToolMode,
    undo,
    redo,
    selectedElementId,
    removeElement,
    setSelectedElementId
  } = useMeme();

  const handleStartStudio = (mode: ToolMode = 'meme') => {
    setToolMode(mode);
    setCurrentView('studio');
  };

  const handleGoHome = () => {
    setCurrentView('landing');
  };

  // Keyboard Shortcuts (Undo, Redo, Delete, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If user is typing inside an input or textarea, don't trigger global shortcuts
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedElementId) {
          e.preventDefault();
          removeElement(selectedElementId);
        }
      } else if (e.key === 'Escape') {
        setSelectedElementId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, selectedElementId, removeElement, setSelectedElementId]);

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-brand-orange selection:text-white">
      {/* Top Navbar */}
      <Navbar onGoHome={handleGoHome} isLanding={currentView === 'landing'} />

      {/* Main Viewport */}
      {currentView === 'landing' ? (
        <LandingPage onStart={handleStartStudio} />
      ) : (
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          <MemeCanvas />
          <Toolbar />
        </main>
      )}

      {/* Modals */}
      <TemplatesModal />
      <SettingsModal />
      <ExportModal />
    </div>
  );
};
