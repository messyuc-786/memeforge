import React from 'react';
import {
  Download,
  RotateCcw,
  RotateCw,
  Trash2,
  Settings,
  Sparkles,
  LayoutTemplate,
  Flame,
  Home
} from 'lucide-react';
import { useMeme } from '../context/MemeContext';

interface NavbarProps {
  onGoHome?: () => void;
  isLanding?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onGoHome, isLanding = false }) => {
  const {
    undo,
    redo,
    canUndo,
    canRedo,
    clearProject,
    setIsExportModalOpen,
    setIsSettingsModalOpen,
    setIsTemplatesModalOpen
  } = useMeme();

  return (
    <header className="sticky top-0 z-40 w-full bg-dark-900/90 backdrop-blur-md border-b border-dark-700/80 px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          {onGoHome && !isLanding && (
            <button
              onClick={onGoHome}
              title="Return to Home"
              className="p-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
            >
              <Home className="w-4 h-4 text-brand-orange" />
              <span className="hidden sm:inline">Home</span>
            </button>
          )}

          <div
            onClick={onGoHome}
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-orange via-brand-yellow to-brand-pink p-0.5 shadow-lg shadow-brand-orange/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-dark-950 rounded-[14px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-brand-yellow animate-pulse-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black font-anton tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-pink">
                  MEMEFORGE
                </span>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-brand-purple/30 text-brand-pink border border-brand-purple/40">
                  AI 2026
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden md:block">
                Turn ordinary moments into legendary memes.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {!isLanding && (
            <>
              {/* Templates */}
              <button
                onClick={() => setIsTemplatesModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-200 border border-dark-700 hover:border-brand-purple/50 text-xs font-semibold transition"
              >
                <LayoutTemplate className="w-4 h-4 text-brand-purple" />
                <span className="hidden md:inline">Templates</span>
              </button>

              {/* Undo / Redo */}
              <div className="flex items-center bg-dark-800 rounded-xl p-0.5 border border-dark-700">
                <button
                  onClick={undo}
                  disabled={!canUndo}
                  title="Undo (Ctrl+Z)"
                  className="p-1.5 rounded-lg hover:bg-dark-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={redo}
                  disabled={!canRedo}
                  title="Redo (Ctrl+Y)"
                  className="p-1.5 rounded-lg hover:bg-dark-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>

              {/* Reset */}
              <button
                onClick={() => {
                  if (window.confirm('Reset this meme canvas back to default?')) {
                    clearProject();
                  }
                }}
                title="Reset Meme"
                className="p-2 rounded-xl bg-dark-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-dark-700 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Settings */}
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            title="Settings & AI Keys"
            className="p-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-300 border border-dark-700 hover:border-slate-500 transition"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Export / Download CTA */}
          {!isLanding && (
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-orange via-brand-pink to-brand-purple hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-brand-orange/25 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Meme</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
