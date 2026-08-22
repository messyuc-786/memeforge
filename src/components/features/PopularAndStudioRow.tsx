import React from 'react';
import { Sparkles, ArrowRight, Zap, Play, Film, MessageSquare, Flame } from 'lucide-react';
import { MEME_TEMPLATES } from '../../data/templatesData';
import { useMeme } from '../../context/MemeContext';
import { soundService } from '../../services/soundService';

export const PopularAndStudioRow: React.FC = () => {
  const { loadTemplate, setCurrentView, setToolMode, setIsTemplatesModalOpen } = useMeme();

  const popularTemplates = MEME_TEMPLATES.slice(0, 6);

  const handleSelectTemplate = (template: typeof MEME_TEMPLATES[0]) => {
    soundService.playPop();
    loadTemplate(template);
    setToolMode('meme');
    setCurrentView('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Popular Templates (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <h2 className="text-xl sm:text-2xl font-black font-anton uppercase tracking-wide text-white">
                  POPULAR TEMPLATES
                </h2>
              </div>
              <p className="text-xs text-slate-400 font-semibold">
                Click any template to customize in Studio
              </p>
            </div>

            <button
              onClick={() => {
                soundService.playPop();
                setIsTemplatesModalOpen(true);
              }}
              className="text-xs font-black text-brand-orange hover:text-brand-pink flex items-center gap-1 transition"
            >
              <span>View all templates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {popularTemplates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleSelectTemplate(template)}
                className="group relative rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-orange transition-all duration-300 p-2.5 flex flex-col gap-2 cursor-pointer hover:-translate-y-1"
              >
                <div className="w-full aspect-square rounded-xl bg-slate-950 overflow-hidden border border-slate-800 flex items-center justify-center p-1.5 relative">
                  <img
                    src={template.previewUrl}
                    alt={template.title}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg">
                      <Zap className="w-3 h-3 text-yellow-400" /> Use
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="font-extrabold text-xs text-slate-200 truncate group-hover:text-brand-orange transition-colors">
                    {template.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    {template.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: AI Meme Studio Card (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 border-2 border-purple-500/30 p-6 sm:p-7 shadow-2xl flex flex-col justify-between text-white relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md">
                ⚡ ALL-IN-ONE SUITE
              </span>
              <span className="text-2xl">🤖</span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black font-anton uppercase tracking-wide text-white leading-none">
                AI MEME STUDIO
              </h3>
              <p className="text-xs text-slate-300 font-medium mt-2 leading-relaxed">
                Turn one idea into memes, vertical video reels, GIFs, and multi-tone punchlines in seconds.
              </p>
            </div>

            {/* Feature Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['AI Generate', 'Auto Captions', '9:16 Reels', 'GIF Maker', 'Meme DNA', '10x Remix'].map((chip) => (
                <span
                  key={chip}
                  className="px-2.5 py-1 rounded-xl bg-white/10 border border-white/15 text-[11px] font-bold text-slate-200"
                >
                  ✓ {chip}
                </span>
              ))}
            </div>

            {/* Visual 3D Preview Box */}
            <div className="mt-2 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">✨</span>
                <div className="text-xs">
                  <strong className="text-white block font-bold">1 Idea → 10 Formats</strong>
                  <span className="text-slate-400 text-[11px]">Classic, Savage, Desi &amp; Reels</span>
                </div>
              </div>
              <span className="text-xs font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-lg border border-amber-400/30">
                PRO 2026
              </span>
            </div>
          </div>

          {/* Action CTA */}
          <div className="relative z-10 pt-5">
            <button
              onClick={() => {
                soundService.playVictoryChime();
                setCurrentView('studio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-orange via-brand-pink to-brand-purple hover:brightness-110 text-white font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-xl shadow-brand-orange/20 active:scale-98"
            >
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>Launch AI Studio →</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
