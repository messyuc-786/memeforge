import React from 'react';
import { X, Shield, Trash2, Sparkles, Key } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { clearProjectStorage } from '../../services/storageService';
import { useEscapeToClose } from '../../hooks/useEscapeToClose';

export const SettingsModal: React.FC = () => {
  const { isSettingsModalOpen, setIsSettingsModalOpen, clearProject } = useMeme();
  useEscapeToClose(() => setIsSettingsModalOpen(false), isSettingsModalOpen);

  if (!isSettingsModalOpen) return null;

  const handleClearAll = () => {
    if (window.confirm('Clear all autosaved memes and reset settings?')) {
      clearProjectStorage();
      clearProject();
      setIsSettingsModalOpen(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Studio Settings"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-fadeIn"
    >
      <div className="w-full max-w-lg rounded-3xl bg-dark-900 border border-dark-700 shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-yellow/15 text-brand-yellow">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black font-anton uppercase tracking-wide text-slate-100">
                Studio Settings &amp; AI
              </h2>
              <p className="text-xs text-slate-400">Preferences &amp; AI engine status</p>
            </div>
          </div>

          <button
            onClick={() => setIsSettingsModalOpen(false)}
            aria-label="Close Settings"
            className="p-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto max-h-[75vh]">
          {/* AI Engine Status — no key entry: the provider key lives server-side only */}
          <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-dark-850 border border-dark-700">
            <span className="text-xs font-extrabold text-brand-yellow uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> AI Generation Engine
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              MemeForge runs a fast built-in humor engine out-of-the-box with <strong>zero setup</strong>. When this
              deployment has cloud AI configured, generation automatically upgrades — there's nothing to enter here,
              and no key is ever stored in your browser.
            </p>
          </div>

          {/* Privacy Note */}
          <div className="p-4 rounded-2xl bg-dark-850 border border-dark-700 flex items-start gap-3">
            <Shield className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-200">100% Client-Side Privacy</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Your images, memes, and photos never leave your device. All rendering, canvas manipulation, and shaders are processed directly in your browser.
              </p>
            </div>
          </div>

          {/* Reset / Cache */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-red-500/10 border border-red-500/30">
            <div>
              <span className="text-xs font-bold text-red-300">Clear Cache &amp; Reset Studio</span>
              <p className="text-[11px] text-slate-400">Remove autosaved projects from browser memory</p>
            </div>
            <button
              onClick={handleClearAll}
              className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white font-bold text-xs transition flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset All</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
