import React from 'react';
import { X, RefreshCw } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { remixMemeConcept, RemixType } from '../../services/ai/remixService';
import { MEME_TEMPLATES } from '../../data/templatesData';
import { soundService } from '../../services/soundService';
import { useEscapeToClose } from '../../hooks/useEscapeToClose';

export const RemixDrawer: React.FC = () => {
  const {
    selectedRemixConcept,
    setSelectedRemixConcept,
    loadConceptIntoStudio,
    setCurrentUniverse,
    currentUniverse
  } = useMeme();
  useEscapeToClose(() => setSelectedRemixConcept(null), !!selectedRemixConcept);

  if (!selectedRemixConcept) return null;

  const handleApplyRemix = (type: RemixType, templateId?: string) => {
    soundService.playSparkle();
    const targetTemplate = templateId ? MEME_TEMPLATES.find((t) => t.id === templateId) : undefined;
    const remixed = remixMemeConcept(selectedRemixConcept, type, targetTemplate);

    // Update in universe if exists
    if (currentUniverse) {
      setCurrentUniverse({
        ...currentUniverse,
        classicMeme: remixed
      });
    }

    setSelectedRemixConcept(null);
    loadConceptIntoStudio(remixed);
  };

  // Fast, understandable transformations on the EXISTING remix engine — same idea, new take
  const remixOptions: { type: RemixType; label: string; emoji: string }[] = [
    { type: 'more_relatable', label: 'More Relatable', emoji: '😊' },
    { type: 'more_savage', label: 'More Savage', emoji: '🔥' },
    { type: 'more_absurd', label: 'More Chaotic', emoji: '💀' },
    { type: 'more_desi', label: 'More Desi', emoji: '🇮🇳' },
    { type: 'shorter', label: 'Shorter', emoji: '⚡' },
    { type: 'more_unhinged', label: 'More Unhinged', emoji: '🤪' },
    { type: 'corporate', label: 'Corporate', emoji: '💼' },
    { type: 'different_punchline', label: 'Different Punchline', emoji: '🎲' }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Remix"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={() => setSelectedRemixConcept(null)}
    >
      {/* Mobile: bottom sheet. Desktop: compact centered drawer/panel. */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-[#0d0a20] border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-scaleUp max-h-[85vh]"
      >
        {/* Drag handle (mobile) */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-brand-orange/15 text-brand-orange">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black font-anton uppercase tracking-wide text-slate-100">
                Remix
              </h2>
              <p className="text-[11px] text-slate-400">Same idea, new take</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedRemixConcept(null)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
            aria-label="Close remix panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Concept Preview */}
        <div className="px-5 py-3 bg-black/20 border-b border-white/10 flex items-center gap-3">
          <img
            src={selectedRemixConcept.templatePreviewUrl}
            alt="Current meme"
            className="w-12 h-12 rounded-lg object-contain bg-black/30 border border-white/10 p-1 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[9px] font-black uppercase text-slate-400 block">Original idea</span>
            <p className="text-xs font-bold text-slate-200 truncate">{selectedRemixConcept.topText}</p>
          </div>
        </div>

        {/* Remix Options — thumb-friendly grid, scrollable if needed */}
        <div className="p-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {remixOptions.map((opt) => (
              <button
                key={opt.type}
                onClick={() => handleApplyRemix(opt.type)}
                className="min-h-[52px] px-3 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-[0.97] border border-white/10 hover:border-pink-500/50 transition-all text-left flex items-center gap-2"
              >
                <span className="text-lg shrink-0">{opt.emoji}</span>
                <span className="font-bold text-xs text-slate-100 leading-tight">{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Secondary: swap the visual template, keep the joke */}
          <div className="pt-4">
            <span className="text-[10px] font-black uppercase text-slate-400 block mb-2">Or swap the template</span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {MEME_TEMPLATES.slice(0, 6).map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => handleApplyRemix('swap_template', tpl.id)}
                  className="w-16 shrink-0 p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition flex flex-col items-center gap-1"
                >
                  <img src={tpl.previewUrl} alt={tpl.title} className="w-10 h-10 object-contain rounded" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
