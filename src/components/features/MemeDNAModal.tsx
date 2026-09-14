import React from 'react';
import { X, Dna, Lightbulb } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { useEscapeToClose } from '../../hooks/useEscapeToClose';

export const MemeDNAModal: React.FC = () => {
  const { selectedDNAConcept, setSelectedDNAConcept } = useMeme();
  useEscapeToClose(() => setSelectedDNAConcept(null), !!selectedDNAConcept);

  if (!selectedDNAConcept) return null;

  const { dna, creativeScore } = selectedDNAConcept;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="meme-check-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-fadeIn"
    >
      <div className="w-full max-w-lg rounded-3xl bg-dark-900 border border-brand-purple/50 shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-800 bg-gradient-to-r from-brand-purple/20 via-transparent to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-purple/20 text-brand-pink border border-brand-purple/40">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <h2 id="meme-check-title" className="text-lg font-black font-anton uppercase tracking-wide text-slate-100">
                MEME CHECK
              </h2>
              <p className="text-xs text-slate-400">What this meme is, and how to sharpen it</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedDNAConcept(null)}
            aria-label="Close Meme Check"
            className="p-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[75vh]">
          {/* DNA Trait Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-dark-850 border border-dark-700/80">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase block">EMOTION</span>
              <span className="text-xs font-black text-slate-100">{dna.emotion}</span>
            </div>
            <div className="p-3 rounded-xl bg-dark-850 border border-dark-700/80">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase block">TONE</span>
              <span className="text-xs font-black text-brand-pink">{dna.tone}</span>
            </div>
            <div className="p-3 rounded-xl bg-dark-850 border border-dark-700/80">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase block">AUDIENCE</span>
              <span className="text-xs font-black text-brand-cyan">{dna.audience}</span>
            </div>
            <div className="p-3 rounded-xl bg-dark-850 border border-dark-700/80">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase block">ENERGY LEVEL</span>
              <span className="text-xs font-black text-brand-yellow">{dna.energyLevel}</span>
            </div>
          </div>

          {/* Actionable editing suggestions — no invented scores */}
          <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-brand-purple/10 border border-brand-purple/30">
            <span className="text-xs font-black uppercase text-brand-yellow flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-brand-yellow" /> Ways to sharpen this
            </span>
            <ul className="flex flex-col gap-1.5">
              {creativeScore.suggestions.map((sug, i) => (
                <li key={i} className="text-xs text-slate-200 flex items-start gap-2 leading-relaxed">
                  <span className="text-brand-pink font-bold">•</span>
                  <span>{sug}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
