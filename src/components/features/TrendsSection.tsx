import React, { useState } from 'react';
import { Flame, TrendingUp, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { TRENDS_DATA } from '../../data/trendsData';
import { useMeme } from '../../context/MemeContext';
import { soundService } from '../../services/soundService';

export const TrendsSection: React.FC = () => {
  const { setActiveIdea, generateUniverse, setCurrentView } = useMeme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI', 'Work', 'India', 'Gaming', 'Gen Z', 'Sports'];

  const filteredTrends = selectedCategory === 'All'
    ? TRENDS_DATA
    : TRENDS_DATA.filter((t) => t.category === selectedCategory);

  const handleCreateFromTrend = (sampleIdea: string) => {
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
    <section className="w-full max-w-7xl mx-auto px-4 py-12 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-bounce">🔥</span>
            <h2 className="text-3xl font-black font-anton uppercase tracking-wide text-slate-100">
              WHAT'S HOT: 2026 TREND ENGINE
            </h2>
          </div>
          <p className="text-xs text-slate-300 font-semibold">
            Trending topics across internet culture. Click "Make Meme" to forge instantly.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                soundService.playPop();
              }}
              className={`px-3 py-1.5 rounded-2xl text-xs font-black transition ${
                selectedCategory === cat
                  ? 'bg-brand-orange text-white shadow-md'
                  : 'bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-white border border-dark-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Trend Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTrends.map((trend) => (
          <div
            key={trend.id}
            className="p-5 rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-dark-700/80 hover:border-brand-orange/70 transition-all duration-300 flex flex-col justify-between gap-4 shadow-lg group hover:-translate-y-1"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{trend.badgeEmoji}</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-brand-orange/20 text-brand-yellow border border-brand-orange/40">
                  {trend.volume}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-100 group-hover:text-brand-orange transition-colors">
                {trend.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-medium italic">
                "{trend.sampleIdea}"
              </p>
            </div>

            <button
              onClick={() => handleCreateFromTrend(trend.sampleIdea)}
              className="w-full py-2.5 rounded-2xl bg-dark-800 hover:bg-gradient-to-r hover:from-brand-orange hover:to-brand-pink text-slate-200 hover:text-white font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-md active:scale-95"
            >
              <Zap className="w-4 h-4 text-brand-yellow" />
              <span>Forge This Trend →</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
