import React from 'react';
import { X, Bookmark, Trash2, Edit3, Share2, Sparkles, Download } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { GeneratedMemeConcept } from '../../types';
import { soundService } from '../../services/soundService';

export const SavedMemesModal: React.FC = () => {
  const {
    isSavedMemesModalOpen,
    setIsSavedMemesModalOpen,
    savedMemes,
    deleteSavedMeme,
    loadConceptIntoStudio
  } = useMeme();

  if (!isSavedMemesModalOpen) return null;

  const handleEditMeme = (concept: GeneratedMemeConcept) => {
    setIsSavedMemesModalOpen(false);
    loadConceptIntoStudio(concept);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl rounded-3xl bg-dark-900 border border-brand-yellow/50 shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-800 bg-gradient-to-r from-brand-yellow/20 via-transparent to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/40">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black font-anton uppercase tracking-wide text-slate-100">
                MY SAVED MEMES ({savedMemes.length})
              </h2>
              <p className="text-xs text-slate-400">Your personal vault of forged memes &amp; creations</p>
            </div>
          </div>

          <button
            onClick={() => setIsSavedMemesModalOpen(false)}
            className="p-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {savedMemes.length === 0 ? (
            <div className="py-16 text-center text-slate-500 flex flex-col items-center gap-3">
              <span className="text-4xl">📂</span>
              <p className="text-sm font-bold text-slate-300">No saved memes yet.</p>
              <p className="text-xs text-slate-400 max-w-sm">
                When you generate or customize memes, click the "Save" icon to keep them here!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {savedMemes.map((m) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-2xl bg-dark-850 border border-dark-700/80 hover:border-brand-yellow/50 transition flex flex-col gap-2.5 shadow-md group"
                >
                  <div className="w-full aspect-square rounded-xl bg-dark-950 border border-dark-800 p-2 flex items-center justify-center relative overflow-hidden">
                    <img src={m.templatePreviewUrl} alt={m.templateTitle} className="max-h-full max-w-full object-contain" />
                    <span className="absolute top-2 left-2 text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-brand-orange text-white">
                      {m.tone}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-black text-slate-100 line-clamp-1">{m.topText}</span>
                    <span className="text-[11px] text-slate-400 line-clamp-1 italic">{m.bottomText}</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleEditMeme(m)}
                      className="flex-1 py-1.5 rounded-xl bg-dark-800 hover:bg-brand-yellow hover:text-slate-950 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        soundService.playPop();
                        deleteSavedMeme(m.id);
                      }}
                      title="Delete"
                      className="p-1.5 rounded-xl bg-dark-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
