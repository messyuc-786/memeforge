import React, { useState } from 'react';
import { X, Bookmark, Trash2, Edit3, RefreshCw, FileEdit, Download } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { GeneratedMemeConcept } from '../../types';
import { soundService } from '../../services/soundService';
import { useEscapeToClose } from '../../hooks/useEscapeToClose';

type VaultTab = 'saved' | 'remixes' | 'drafts' | 'exports';

export const SavedMemesModal: React.FC = () => {
  const {
    isSavedMemesModalOpen,
    setIsSavedMemesModalOpen,
    savedMemes,
    deleteSavedMeme,
    loadConceptIntoStudio,
    setSelectedRemixConcept
  } = useMeme();

  const [activeTab, setActiveTab] = useState<VaultTab>('saved');
  useEscapeToClose(() => setIsSavedMemesModalOpen(false), isSavedMemesModalOpen);

  if (!isSavedMemesModalOpen) return null;

  // Remixed memes are real, identifiable existing data — remixMemeConcept() ids are prefixed 'remix-'
  const remixes = savedMemes.filter((m) => m.id.startsWith('remix-'));
  const saved = savedMemes;

  const TABS: { id: VaultTab; label: string; icon: React.ReactNode; count: number | null }[] = [
    { id: 'saved', label: 'Saved', icon: <Bookmark className="w-3.5 h-3.5" />, count: saved.length },
    { id: 'remixes', label: 'Remixes', icon: <RefreshCw className="w-3.5 h-3.5" />, count: remixes.length },
    { id: 'drafts', label: 'Drafts', icon: <FileEdit className="w-3.5 h-3.5" />, count: null },
    { id: 'exports', label: 'Exports', icon: <Download className="w-3.5 h-3.5" />, count: null }
  ];

  const handleEditMeme = (concept: GeneratedMemeConcept) => {
    setIsSavedMemesModalOpen(false);
    loadConceptIntoStudio(concept);
  };

  const handleRemixMeme = (concept: GeneratedMemeConcept) => {
    soundService.playSparkle();
    setIsSavedMemesModalOpen(false);
    setSelectedRemixConcept(concept);
  };

  const renderMemeGrid = (memes: GeneratedMemeConcept[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {memes.map((m) => (
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

          <div className="flex items-center gap-1.5 pt-1">
            <button
              onClick={() => handleEditMeme(m)}
              className="flex-1 min-h-[36px] py-1.5 rounded-xl bg-dark-800 hover:bg-brand-yellow hover:text-slate-950 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => handleRemixMeme(m)}
              title="Remix"
              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl bg-dark-800 hover:bg-purple-900/60 text-slate-300 hover:text-white transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                soundService.playPop();
                deleteSavedMeme(m.id);
              }}
              title="Delete"
              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl bg-dark-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEmpty = (icon: string, title: string, body: string) => (
    <div className="py-16 text-center text-slate-500 flex flex-col items-center gap-3">
      <span className="text-4xl">{icon}</span>
      <p className="text-sm font-bold text-slate-300">{title}</p>
      <p className="text-xs text-slate-400 max-w-sm">{body}</p>
    </div>
  );

  const renderTabContent = () => {
    if (activeTab === 'saved') {
      return saved.length === 0
        ? renderEmpty('📂', 'No saved memes yet.', 'When you generate or customize memes, tap "Save" to keep them here.')
        : renderMemeGrid(saved);
    }
    if (activeTab === 'remixes') {
      return remixes.length === 0
        ? renderEmpty('🔁', 'No remixes saved yet.', 'Remix a meme and save it to see your remixes here.')
        : renderMemeGrid(remixes);
    }
    if (activeTab === 'drafts') {
      return renderEmpty(
        '📝',
        'Drafts aren\'t tracked yet.',
        'MemeForge doesn\'t currently autosave in-progress Studio edits as drafts — this tab is reserved for that.'
      );
    }
    return renderEmpty(
      '🎬',
      'No exports tracked yet.',
      'Downloaded images and videos aren\'t logged to a history yet — this tab is reserved for that.'
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="My Vault"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-fadeIn"
    >
      <div className="w-full max-w-3xl max-h-[85vh] rounded-3xl bg-dark-900 border border-brand-yellow/50 shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-800 bg-gradient-to-r from-brand-yellow/20 via-transparent to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/40">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black font-anton uppercase tracking-wide text-slate-100">
                MY VAULT
              </h2>
              <p className="text-xs text-slate-400">Your personal meme workspace</p>
            </div>
          </div>

          <button
            onClick={() => setIsSavedMemesModalOpen(false)}
            aria-label="Close Vault"
            className="p-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-dark-800 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-black uppercase transition flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-brand-yellow text-slate-950'
                  : 'bg-dark-800 hover:bg-dark-700 text-slate-400'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== null && <span className="opacity-70">({tab.count})</span>}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">{renderTabContent()}</div>
      </div>
    </div>
  );
};
