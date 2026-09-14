import React, { useState } from 'react';
import { Flame, Sparkles, ArrowRight } from 'lucide-react';
import { TRENDS_DATA } from '../../data/trendsData';
import { useMeme } from '../../context/MemeContext';
import { soundService } from '../../services/soundService';

// Filter groups mapped onto the existing category data — no new data model needed.
const FILTERS: { id: string; label: string; match: (cat: string, isHot: boolean) => boolean }[] = [
  { id: 'rising', label: 'Rising', match: (_c, hot) => hot },
  { id: 'india', label: 'India', match: (c) => c === 'India' },
  { id: 'culture', label: 'Culture', match: (c) => c === 'Movies' || c === 'Gen Z' || c === 'Gaming' },
  { id: 'relatable', label: 'Relatable', match: (c) => c === 'Work' || c === 'AI' || c === 'Sports' || c === 'Tech' }
];

export const TrendsSection: React.FC = () => {
  const { setActiveIdea, generateUniverse, setCurrentView } = useMeme();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filtered =
    activeFilter === 'all'
      ? TRENDS_DATA
      : TRENDS_DATA.filter((t) => FILTERS.find((f) => f.id === activeFilter)?.match(t.category, t.isHot));

  const handleForgeThis = (sampleIdea: string) => {
    soundService.playVineBoom();
    setActiveIdea(sampleIdea);
    generateUniverse(sampleIdea, 'relatable');
    setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById('meme-universe-results');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-pink-400" />
            <h2 className="text-xl sm:text-2xl font-black font-anton uppercase tracking-wide text-white">
              MEME ANGLES
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            Curated by the MemeForge team — a running start, not a live feed
          </p>
        </div>

        {/* Filter Pills — horizontal, thumb-friendly on mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1">
          <button
            onClick={() => {
              setActiveFilter('all');
              soundService.playPop();
            }}
            className={`shrink-0 min-h-[32px] px-3 py-1 rounded-full text-xs font-bold transition ${
              activeFilter === 'all'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border border-pink-400'
                : 'bg-[#120e2e]/80 text-slate-300 border border-purple-500/30 hover:bg-[#1a1442]'
            }`}
          >
            All
          </button>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setActiveFilter(f.id);
                soundService.playPop();
              }}
              className={`shrink-0 min-h-[32px] px-3 py-1 rounded-full text-xs font-bold transition ${
                activeFilter === f.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border border-pink-400'
                  : 'bg-[#120e2e]/80 text-slate-300 border border-purple-500/30 hover:bg-[#1a1442]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trend / Angle Cards — readable, useful, honestly labeled */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((trend) => (
          <div
            key={trend.id}
            className="group rounded-2xl bg-[#0c0922] border border-white/10 hover:border-pink-500/50 p-3.5 shadow-sm transition-all duration-200 flex flex-col gap-2.5"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xl shrink-0">{trend.badgeEmoji}</span>
                <span className="font-extrabold text-sm text-slate-100 truncate">{trend.title}</span>
              </div>
              {trend.isHot && (
                <span className="shrink-0 flex items-center gap-1 text-[10px] font-black uppercase px-1.5 py-0.5 rounded-full bg-pink-500/15 text-pink-400 border border-pink-500/30">
                  <Sparkles className="w-2.5 h-2.5" /> Rising
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">{trend.category}</span>
              <span>•</span>
              <span>Curated pick</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
              {trend.sampleIdea}
            </p>

            <button
              onClick={() => handleForgeThis(trend.sampleIdea)}
              className="mt-1 w-full min-h-[38px] py-2 rounded-xl bg-white/5 group-hover:bg-brand-orange text-slate-200 group-hover:text-white font-black text-xs uppercase tracking-wide transition-all flex items-center justify-center gap-1.5"
            >
              <span>Forge This</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
