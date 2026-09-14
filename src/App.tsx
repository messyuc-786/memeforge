import React, { useEffect, Suspense, lazy } from 'react';
import { Undo2, Redo2, Download, ChevronLeft } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
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

// Heavy, secondary-path features — code-split so Home/Forge (the primary path) doesn't
// pay for Studio's editor panels or Video's MediaRecorder pipeline until they're opened.
const MemeCanvas = lazy(() => import('./components/MemeCanvas').then((m) => ({ default: m.MemeCanvas })));
const Toolbar = lazy(() => import('./components/Toolbar').then((m) => ({ default: m.Toolbar })));
const VideoMemeStudio = lazy(() =>
  import('./components/features/VideoMemeStudio').then((m) => ({ default: m.VideoMemeStudio }))
);

const LazyFallback: React.FC = () => (
  <div className="flex-1 flex items-center justify-center py-24">
    <div className="w-8 h-8 border-[3px] border-brand-orange border-t-transparent rounded-full animate-spin" />
  </div>
);

export const App: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    undo,
    redo,
    canUndo,
    canRedo,
    selectedElementId,
    removeElement,
    setSelectedElementId,
    setIsSavedMemesModalOpen,
    setIsExportModalOpen
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
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Studio header: obvious Back / Undo / Redo / Export — was previously nowhere in Studio */}
            <div className="w-full flex items-center justify-between gap-2 px-3 sm:px-4 py-2 bg-dark-950/95 border-b border-dark-800 z-30">
              <button
                onClick={() => {
                  soundService.playPop();
                  setCurrentView('home');
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 text-xs font-bold transition shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </button>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={undo}
                  disabled={!canUndo}
                  title="Undo"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
                <button
                  onClick={redo}
                  disabled={!canRedo}
                  title="Redo"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition"
                >
                  <Redo2 className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => {
                  soundService.playVictoryChime();
                  setIsExportModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-orange hover:brightness-110 text-white font-black text-xs uppercase tracking-wide shadow-md shadow-brand-orange/25 active:scale-95 transition shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            </div>

            <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
              <Suspense fallback={<LazyFallback />}>
                <MemeCanvas />
                <Toolbar />
              </Suspense>
            </main>
          </div>
        );
      case 'video':
        return (
          <div className="flex-1 flex flex-col justify-between">
            <Suspense fallback={<LazyFallback />}>
              <VideoMemeStudio />
            </Suspense>
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
