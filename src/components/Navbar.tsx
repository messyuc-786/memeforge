import React, { useState } from 'react';
import {
  Flame,
  Sparkles,
  Download,
  Settings,
  RotateCcw,
  RotateCw,
  FolderOpen,
  Volume2,
  VolumeX,
  Plus,
  Bookmark,
  Share2,
  Film,
  Users,
  Camera,
  Layers
} from 'lucide-react';
import { useMeme } from '../context/MemeContext';
import { AppView, MemeTone } from '../types';
import { soundService } from '../services/soundService';

interface NavbarProps {
  onGoHome: () => void;
  isLanding?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onGoHome }) => {
  const {
    currentView,
    setCurrentView,
    undo,
    redo,
    canUndo,
    canRedo,
    setIsExportModalOpen,
    setIsSettingsModalOpen,
    setIsTemplatesModalOpen,
    setIsSavedMemesModalOpen,
    setIsPutMeInMemeModalOpen,
    savedMemes,
    clearProject
  } = useMeme();

  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundService.setMuted(next);
    if (!next) soundService.playPop();
  };

  const navTabs: { view: AppView; label: string; icon: string }[] = [
    { view: 'home', label: 'Forge AI', icon: '🚀' },
    { view: 'studio', label: 'Studio', icon: '🎨' },
    { view: 'video', label: 'Video Meme', icon: '🎥' },
    { view: 'trends', label: 'Trends', icon: '🔥' },
    { view: 'desi', label: 'Desi Mode', icon: '🇮🇳' },
    { view: 'community', label: 'Community', icon: '🌐' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-dark-900/90 backdrop-blur-xl border-b border-dark-700/80 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 select-none shadow-xl">
      {/* Left: Brand Logo & Tagline */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            soundService.playPop();
            setCurrentView('home');
            onGoHome();
          }}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-orange via-brand-pink to-brand-purple flex items-center justify-center text-white shadow-lg shadow-brand-orange/30 group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
            <Flame className="w-6 h-6 fill-white" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black font-anton tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-pink leading-none">
                MEMEFORGE
              </span>
              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-full bg-brand-pink/20 text-brand-pink border border-brand-pink/40">
                AI 2026
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 hidden sm:inline leading-none mt-0.5">
              IDEA IN. MEME OUT. 🔥
            </span>
          </div>
        </button>

        {/* Center Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-dark-950/70 p-1 rounded-2xl border border-dark-800">
          {navTabs.map((tab) => {
            const isActive = currentView === tab.view;
            return (
              <button
                key={tab.view}
                onClick={() => {
                  soundService.playPop();
                  setCurrentView(tab.view);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-orange to-brand-pink text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-dark-850'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => setIsPutMeInMemeModalOpen(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-black text-brand-pink hover:text-white hover:bg-brand-pink/20 transition flex items-center gap-1.5"
          >
            <span>🤳</span>
            <span>Put Me In Meme</span>
          </button>
        </nav>
      </div>

      {/* Right Controls & Quick Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Undo / Redo (Active in Studio Mode) */}
        {currentView === 'studio' && (
          <div className="hidden sm:flex items-center gap-1 bg-dark-950/60 p-1 rounded-2xl border border-dark-800">
            <button
              onClick={undo}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
              className="p-1.5 rounded-xl hover:bg-dark-800 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              title="Redo (Ctrl+Y)"
              className="p-1.5 rounded-xl hover:bg-dark-800 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 transition"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Funky Meme Soundboard Fast Triggers */}
        <div className="flex items-center gap-1 bg-dark-950/60 p-1 rounded-2xl border border-dark-800">
          <button
            onClick={() => soundService.playVineBoom()}
            title="💥 Vine Boom Bass Drop"
            className="px-2 py-1 rounded-xl bg-dark-800 hover:bg-dark-700 text-xs font-bold text-slate-200 transition hover:scale-105 active:scale-95"
          >
            💥 Boom
          </button>
          <button
            onClick={() => soundService.playAirhorn()}
            title="📯 MLG Airhorn"
            className="px-2 py-1 rounded-xl bg-dark-800 hover:bg-dark-700 text-xs font-bold text-slate-200 transition hover:scale-105 active:scale-95"
          >
            📯 Horn
          </button>
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute Meme SFX' : 'Mute Meme SFX'}
            className="p-1.5 rounded-xl hover:bg-dark-800 text-slate-400 hover:text-white transition"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-brand-cyan" />}
          </button>
        </div>

        {/* Saved Memes Vault Trigger */}
        <button
          onClick={() => setIsSavedMemesModalOpen(true)}
          title="Saved Memes Vault"
          className="p-2 rounded-2xl bg-dark-950/60 hover:bg-dark-800 border border-dark-800 text-slate-300 hover:text-brand-yellow transition relative"
        >
          <Bookmark className="w-4 h-4" />
          {savedMemes.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-yellow text-slate-950 text-[9px] font-black flex items-center justify-center shadow">
              {savedMemes.length}
            </span>
          )}
        </button>

        {/* Settings Modal Trigger */}
        <button
          onClick={() => setIsSettingsModalOpen(true)}
          title="Settings & API Key"
          className="p-2 rounded-2xl bg-dark-950/60 hover:bg-dark-800 border border-dark-800 text-slate-300 hover:text-white transition"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Primary Export CTA */}
        {currentView === 'studio' && (
          <button
            onClick={() => {
              soundService.playVictoryChime();
              setIsExportModalOpen(true);
            }}
            className="px-3 sm:px-4 py-2 rounded-2xl bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-pink text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brand-orange/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 border border-white/20"
          >
            <Download className="w-4 h-4 stroke-[3]" />
            <span className="hidden sm:inline">Export HD</span>
            <span className="sm:hidden">Save</span>
          </button>
        )}
      </div>
    </header>
  );
};
