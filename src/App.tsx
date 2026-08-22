import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { MemeCanvas } from './components/MemeCanvas';
import { Toolbar } from './components/Toolbar';
import { VideoMemeStudio } from './components/features/VideoMemeStudio';
import { TrendsSection } from './components/features/TrendsSection';
import { CommunitySection } from './components/features/CommunitySection';
import { DesiModeSection } from './components/features/DesiModeSection';
import { MemeDNAModal } from './components/features/MemeDNAModal';
import { RemixDrawer } from './components/features/RemixDrawer';
import { PlatformOptimizerModal } from './components/features/PlatformOptimizerModal';
import { PutMeInMemeModal } from './components/features/PutMeInMemeModal';
import { SavedMemesModal } from './components/features/SavedMemesModal';
import { TemplatesModal } from './components/panels/TemplatesModal';
import { SettingsModal } from './components/panels/SettingsModal';
import { ExportModal } from './components/panels/ExportModal';
import { useMeme } from './context/MemeContext';
import { soundService } from './services/soundService';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    undo,
    redo,
    selectedElementId,
    removeElement,
    setSelectedElementId,
    setIsSavedMemesModalOpen
  } = useMeme();

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <LandingPage />;
      case 'studio':
        return (
          <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
            <MemeCanvas />
            <Toolbar />
          </main>
        );
      case 'video':
        return (
          <div className="flex-1 flex flex-col justify-between">
            <VideoMemeStudio />
            <Footer />
          </div>
        );
      case 'trends':
        return (
          <div className="flex-1 flex flex-col justify-between pt-6 bg-[#faf8fc]">
            <TrendsSection />
            <Footer />
          </div>
        );
      case 'desi':
        return (
          <div className="flex-1 flex flex-col justify-between pt-6 bg-[#faf8fc]">
            <DesiModeSection />
            <Footer />
          </div>
        );
      case 'community':
        return (
          <div className="flex-1 flex flex-col justify-between pt-6 bg-slate-950 text-white">
            <CommunitySection />
            <Footer />
          </div>
        );
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-orange selection:text-white pb-16 lg:pb-0">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Viewport */}
      {renderCurrentView()}

      {/* Mobile Bottom Navigation Dock (Phone Experience) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 px-3 py-2 flex items-center justify-around text-xs shadow-2xl">
        <button
          onClick={() => {
            soundService.playPop();
            setCurrentView('home');
          }}
          className={`flex flex-col items-center gap-0.5 font-bold ${
            currentView === 'home' ? 'text-brand-orange' : 'text-slate-400'
          }`}
        >
          <span className="text-lg">🚀</span>
          <span>Forge AI</span>
        </button>

        <button
          onClick={() => {
            soundService.playPop();
            setCurrentView('studio');
          }}
          className={`flex flex-col items-center gap-0.5 font-bold ${
            currentView === 'studio' ? 'text-brand-orange' : 'text-slate-400'
          }`}
        >
          <span className="text-lg">🎨</span>
          <span>Studio</span>
        </button>

        <button
          onClick={() => {
            soundService.playPop();
            setCurrentView('video');
          }}
          className={`flex flex-col items-center gap-0.5 font-bold ${
            currentView === 'video' ? 'text-brand-orange' : 'text-slate-400'
          }`}
        >
          <span className="text-lg">🎥</span>
          <span>Video</span>
        </button>

        <button
          onClick={() => {
            soundService.playPop();
            setCurrentView('desi');
          }}
          className={`flex flex-col items-center gap-0.5 font-bold ${
            currentView === 'desi' ? 'text-brand-orange' : 'text-slate-400'
          }`}
        >
          <span className="text-lg">🇮🇳</span>
          <span>Desi</span>
        </button>

        <button
          onClick={() => {
            soundService.playPop();
            setIsSavedMemesModalOpen(true);
          }}
          className="flex flex-col items-center gap-0.5 font-bold text-slate-400"
        >
          <span className="text-lg">⭐</span>
          <span>Vault</span>
        </button>
      </nav>

      {/* Global Modals & Drawers */}
      <MemeDNAModal />
      <RemixDrawer />
      <PlatformOptimizerModal />
      <PutMeInMemeModal />
      <SavedMemesModal />
      <TemplatesModal />
      <SettingsModal />
      <ExportModal />
    </div>
  );
};
