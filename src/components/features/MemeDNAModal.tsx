import React from 'react';
import { X, Dna, Sparkles, CheckCircle2, TrendingUp, Zap, Lightbulb } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';

export const MemeDNAModal: React.FC = () => {
  const { selectedDNAConcept, setSelectedDNAConcept } = useMeme();

  if (!selectedDNAConcept) return null;

  const { dna, creativeScore } = selectedDNAConcept;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg rounded-3xl bg-dark-900 border border-brand-purple/50 shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-800 bg-gradient-to-r from-brand-purple/20 via-transparent to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-purple/20 text-brand-pink border border-brand-purple/40">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black font-anton uppercase tracking-wide text-slate-100">
                  MEME DNA ANALYSIS
                </h2>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-brand-pink/20 text-brand-pink border border-brand-pink/40">
                  VIRAL QUALITY SCORE
                </span>
              </div>
              <p className="text-xs text-slate-400">Deep structural breakdown &amp; engagement score</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedDNAConcept(null)}
            className="p-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[75vh]">
          {/* Creative Score Hero Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-dark-850 to-dark-800 border border-brand-yellow/40 flex items-center justify-between shadow-lg">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                MEMEFORGE CREATIVE SCORE
              </span>
              <span className="text-3xl font-black font-anton text-brand-yellow flex items-center gap-1.5">
                <span>{creativeScore.totalScore}</span>
                <span className="text-sm font-sans font-bold text-slate-400">/ 100</span>
              </span>
              <span className="text-xs font-black text-brand-orange uppercase">
                🔥 {creativeScore.ratingLabel}
              </span>
            </div>

            {/* Score Ring / Badge */}
            <div className="w-16 h-16 rounded-full bg-dark-950 border-4 border-brand-yellow flex items-center justify-center shadow-inner">
              <Sparkles className="w-7 h-7 text-brand-yellow animate-pulse" />
            </div>
          </div>

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

          {/* Breakdown Sliders */}
          <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-dark-850 border border-dark-700/80">
            <span className="text-xs font-black uppercase text-slate-300">Detailed Metric Breakdown</span>

            {Object.entries(creativeScore.breakdown).map(([key, val]) => (
              <div key={key} className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[11px] font-bold text-slate-400 capitalize">
                  <span>{key}</span>
                  <span className="text-slate-200">{val}%</span>
                </div>
                <div className="w-full h-1.5 bg-dark-950 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${val}%` }}
                    className="h-full bg-gradient-to-r from-brand-orange to-brand-pink rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pro Creative Guidance / Suggestions */}
          <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-brand-purple/10 border border-brand-purple/30">
            <span className="text-xs font-black uppercase text-brand-yellow flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-brand-yellow" /> Creator Pro Tips &amp; Suggestions
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
