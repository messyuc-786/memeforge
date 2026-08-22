import React from 'react';
import { X, RefreshCw, Sparkles, Flame, Heart, Zap, Film, ArrowRight } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { remixMemeConcept, RemixType } from '../../services/ai/remixService';
import { MEME_TEMPLATES } from '../../data/templatesData';
import { soundService } from '../../services/soundService';

export const RemixDrawer: React.FC = () => {
  const {
    selectedRemixConcept,
    setSelectedRemixConcept,
    loadConceptIntoStudio,
    setCurrentUniverse,
    currentUniverse
  } = useMeme();

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

  const remixOptions: { type: RemixType; label: string; icon: string; desc: string; color: string }[] = [
    {
      type: 'swap_template',
      label: 'Random Template Swap',
      icon: '🎲',
      desc: 'Keep same joke, switch to a fresh visual template',
      color: 'border-brand-purple/40 hover:border-brand-purple'
    },
    {
      type: 'more_savage',
      label: 'More Savage Burn',
      icon: '💀',
      desc: 'Dial up the emotional damage & spicy punchline',
      color: 'border-brand-fire/40 hover:border-brand-fire'
    },
    {
      type: 'more_wholesome',
      label: 'More Wholesome',
      icon: '❤️',
      desc: 'Turn the punchline into a sweet, feel-good moment',
      color: 'border-brand-pink/40 hover:border-brand-pink'
    },
    {
      type: 'more_desi',
      label: 'Desi / Hinglish Vibe',
      icon: '🇮🇳',
      desc: 'Inject Bollywood & Indian relatable humor',
      color: 'border-brand-yellow/40 hover:border-brand-yellow'
    },
    {
      type: 'more_genz',
      label: 'More Gen-Z Slang',
      icon: '💅',
      desc: 'Slay, no cap, fr fr existential chaos',
      color: 'border-brand-cyan/40 hover:border-brand-cyan'
    },
    {
      type: 'shorter',
      label: 'Ultra Short Punchline',
      icon: '⚡',
      desc: 'Condense caption to under 4 words for maximum impact',
      color: 'border-emerald-500/40 hover:border-emerald-500'
    },
    {
      type: 'turn_video',
      label: 'Convert to Video Reel Format',
      icon: '🎬',
      desc: 'Format for 9:16 short-form video with audio hooks',
      color: 'border-brand-orange/40 hover:border-brand-orange'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl rounded-3xl bg-dark-900 border border-brand-orange/50 shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-800 bg-gradient-to-r from-brand-orange/20 via-transparent to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-orange/20 text-brand-yellow border border-brand-orange/40">
              <RefreshCw className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-lg font-black font-anton uppercase tracking-wide text-slate-100">
                10-WAY REMIX ENGINE
              </h2>
              <p className="text-xs text-slate-400">Preserve the idea, transform the presentation</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedRemixConcept(null)}
            className="p-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Concept Preview */}
        <div className="p-4 bg-dark-950/60 border-b border-dark-800 flex items-center gap-3">
          <img
            src={selectedRemixConcept.templatePreviewUrl}
            alt="Current meme"
            className="w-16 h-16 rounded-xl object-contain bg-dark-900 border border-dark-700 p-1 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-black uppercase text-brand-orange block">ORIGINAL CONCEPT</span>
            <p className="text-xs font-bold text-slate-200 truncate">{selectedRemixConcept.topText}</p>
            <p className="text-xs text-slate-400 truncate italic">{selectedRemixConcept.bottomText}</p>
          </div>
        </div>

        {/* Remix Options Grid */}
        <div className="p-5 flex flex-col gap-2.5 overflow-y-auto max-h-[60vh]">
          <span className="text-xs font-black uppercase text-slate-300">Choose Remix Transformation</span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {remixOptions.map((opt) => (
              <button
                key={opt.type}
                onClick={() => handleApplyRemix(opt.type)}
                className={`p-3 rounded-2xl bg-dark-850 border hover:bg-dark-800 transition text-left flex flex-col gap-1 group shadow-md hover:-translate-y-0.5 active:scale-98 ${opt.color}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{opt.icon}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition" />
                </div>
                <span className="font-black text-xs text-slate-100">{opt.label}</span>
                <span className="text-[10px] text-slate-400 leading-tight">{opt.desc}</span>
              </button>
            ))}
          </div>

          {/* Direct Template Picker for Swap */}
          <div className="pt-2">
            <span className="text-xs font-black uppercase text-slate-400 block mb-2">Or Swap to Specific Template:</span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {MEME_TEMPLATES.slice(0, 6).map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => handleApplyRemix('swap_template', tpl.id)}
                  className="w-20 shrink-0 p-1.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-dark-700 hover:border-brand-purple transition flex flex-col items-center gap-1 group"
                >
                  <img src={tpl.previewUrl} alt={tpl.title} className="w-12 h-12 object-contain rounded" />
                  <span className="text-[9px] font-bold text-slate-300 truncate max-w-full group-hover:text-white">
                    {tpl.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
