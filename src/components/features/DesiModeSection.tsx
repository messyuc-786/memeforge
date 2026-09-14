import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { DESI_PRESETS } from '../../services/ai/desiService';
import { useMeme } from '../../context/MemeContext';
import { MEME_TEMPLATES } from '../../data/templatesData';
import { soundService } from '../../services/soundService';

export const DesiModeSection: React.FC = () => {
  const {
    loadTemplate,
    setTopText,
    setBottomText,
    setCurrentView,
    setToolMode,
    activeIdea,
    setActiveIdea,
    generateUniverse,
    isGeneratingUniverse
  } = useMeme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Corporate', 'Family/Shaadi', 'College/Exams', 'Street Food', 'Cricket'];

  // Real path from a typed idea straight into the existing Forge pipeline, Desi-toned
  const handleForgeDesiIdea = () => {
    if (!activeIdea.trim() || isGeneratingUniverse) return;
    soundService.playVineBoom();
    generateUniverse(activeIdea, 'desi');
    setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById('meme-universe-results');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const filtered = selectedCategory === 'All'
    ? DESI_PRESETS
    : DESI_PRESETS.filter((p) => p.category === selectedCategory);

  const handleLaunchDesiMeme = (preset: typeof DESI_PRESETS[0]) => {
    soundService.playAirhorn();
    const template = MEME_TEMPLATES.find((t) => t.id === preset.templateId) || MEME_TEMPLATES[0];
    loadTemplate(template);
    setTopText(preset.topText);
    setBottomText(preset.bottomText);
    setToolMode('meme');
    setCurrentView('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">🇮🇳</span>
            <h2 className="text-3xl font-black font-anton uppercase tracking-wide text-slate-100">
              DESI / INDIA MEME STUDIO
            </h2>
          </div>
          <p className="text-xs text-slate-300 font-semibold">
            Pure Indian relatability: Bollywood, Chai-Sutta breaks, Shaadi rishtas &amp; Sharma Ji Ka Beta.
          </p>
        </div>

      </div>

      {/* Type your own idea, Forge it Desi-style — real path into the existing generation pipeline */}
      <div className="flex flex-col sm:flex-row items-stretch gap-2 p-2 rounded-2xl bg-dark-900/80 border border-dark-700">
        <input
          type="text"
          value={activeIdea}
          onChange={(e) => setActiveIdea(e.target.value)}
          placeholder="Type any moment — office, ghar, rishtedaar, cricket..."
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-700 focus:border-brand-yellow text-white text-sm outline-none transition placeholder:text-slate-500"
        />
        <button
          onClick={handleForgeDesiIdea}
          disabled={!activeIdea.trim() || isGeneratingUniverse}
          className="shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-yellow to-brand-orange text-slate-950 font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
        >
          <Zap className="w-4 h-4" />
          <span>{isGeneratingUniverse ? 'Forging…' : 'Forge Desi-Style'}</span>
        </button>
      </div>

      {/* Category browsing */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Category Pills */}
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
                  ? 'bg-gradient-to-r from-brand-yellow to-brand-orange text-slate-950 shadow-md'
                  : 'bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-white border border-dark-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Desi Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((preset, idx) => {
          const tpl = MEME_TEMPLATES.find((t) => t.id === preset.templateId) || MEME_TEMPLATES[0];

          return (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-brand-yellow/30 hover:border-brand-yellow transition-all duration-300 flex flex-col justify-between gap-4 shadow-lg group hover:-translate-y-1"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-brand-yellow">
                    {preset.category}
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/40">
                    {preset.slang}
                  </span>
                </div>

                <div className="w-full aspect-square rounded-2xl bg-dark-950 border border-dark-800 p-2 flex items-center justify-center overflow-hidden">
                  <img
                    src={tpl.previewUrl}
                    alt={preset.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex flex-col gap-1 text-xs">
                  <span className="font-impact text-brand-yellow uppercase line-clamp-2">
                    {preset.topText}
                  </span>
                  <span className="font-impact text-white uppercase line-clamp-2">
                    {preset.bottomText}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleLaunchDesiMeme(preset)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand-yellow to-brand-orange text-slate-950 font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-md active:scale-95"
              >
                <Zap className="w-4 h-4" />
                <span>Customize in Studio →</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
