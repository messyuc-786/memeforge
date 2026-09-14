import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  Edit3,
  Dna,
  Share2,
  Bookmark,
  Download,
  Film,
  MessageSquare,
  Copy,
  Check,
  Zap,
  ArrowRight,
  TrendingUp,
  MoreVertical,
  Wand2
} from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { GeneratedMemeConcept } from '../../types';
import { soundService } from '../../services/soundService';

export const ContentUniverseSection: React.FC = () => {
  const {
    currentUniverse,
    loadConceptIntoStudio,
    setSelectedDNAConcept,
    setSelectedRemixConcept,
    saveMemeToLibrary,
    setIsExportModalOpen,
    setIsPlatformModalOpen,
    setCurrentView,
    setIsTemplatesModalOpen
  } = useMeme();

  const [activeTab, setActiveTab] = useState<string>('all');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  if (!currentUniverse) return null;

  const allConcepts: GeneratedMemeConcept[] = [
    currentUniverse.classicMeme,
    currentUniverse.relatableMeme,
    currentUniverse.savageMeme,
    currentUniverse.desiMeme,
    currentUniverse.corporateMeme,
    currentUniverse.absurdMeme
  ];

  // The first forged concept gets top billing — the meme is the hero, not the UI chrome
  const heroConcept = allConcepts[0];
  const alternates = allConcepts.slice(1);

  const filteredAlternates = activeTab === 'all'
    ? alternates
    : alternates.filter((c) => c.tone === activeTab || (activeTab === 'chaos' && c.tone === 'absurd'));

  const handleShareDirect = (concept: GeneratedMemeConcept) => {
    soundService.playPop();
    loadConceptIntoStudio(concept);
    setIsExportModalOpen(true);
  };

  const handleSave = (concept: GeneratedMemeConcept) => {
    soundService.playVictoryChime();
    saveMemeToLibrary(concept);
    setSavedIds((prev) => new Set(prev).add(concept.id));
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* 2-Column Responsive Layout: Left 7 cols (Meme Cards) + Right 5 cols (AI Studio) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: 👑 YOUR MEME UNIVERSE (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl text-amber-400">👑</span>
                <h2 className="text-xl sm:text-2xl font-black font-anton uppercase tracking-wide text-white">
                  YOUR MEME UNIVERSE
                </h2>
              </div>
              <p className="text-xs text-slate-400 font-semibold">
                Multiple memes. Multiple vibes. All forged from your idea.
              </p>
            </div>

            <button
              onClick={() => {
                soundService.playPop();
                setIsTemplatesModalOpen(true);
              }}
              className="text-xs font-black text-pink-400 hover:text-cyan-300 flex items-center gap-1 transition"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* HERO CONCEPT — the strongest/first forged meme gets visual priority */}
          <div className="group relative rounded-2xl overflow-hidden bg-[#0c0922] border border-pink-500/40 shadow-lg mb-4">
            <div
              onClick={() => loadConceptIntoStudio(heroConcept)}
              className="relative w-full aspect-[4/3] sm:aspect-video overflow-hidden bg-slate-950 cursor-pointer"
            >
              <img
                src={heroConcept.templatePreviewUrl}
                alt={heroConcept.templateTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 p-4 flex flex-col justify-between text-center select-none pointer-events-none">
                <span className="font-impact text-lg sm:text-xl uppercase tracking-wide text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)] line-clamp-2">
                  {heroConcept.topText}
                </span>
                <span className="font-impact text-lg sm:text-xl uppercase tracking-wide text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)] line-clamp-2">
                  {heroConcept.bottomText}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundService.playSparkle();
                  setSelectedDNAConcept(heroConcept);
                }}
                title="Meme details"
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 text-white/80 hover:text-white transition"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Hero actions: Remix / Edit / Share / Save — the obvious next steps */}
            <div className="grid grid-cols-4 gap-1.5 p-2.5 bg-black/30">
              <button
                onClick={() => {
                  soundService.playSparkle();
                  setSelectedRemixConcept(heroConcept);
                }}
                className="py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-[11px] uppercase transition flex flex-col items-center justify-center gap-0.5 border border-white/10"
              >
                <RefreshCw className="w-3.5 h-3.5 text-pink-400" />
                <span>Remix</span>
              </button>
              <button
                onClick={() => loadConceptIntoStudio(heroConcept)}
                className="py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-[11px] uppercase transition flex flex-col items-center justify-center gap-0.5 border border-white/10"
              >
                <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleShareDirect(heroConcept)}
                className="py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-[11px] uppercase transition flex flex-col items-center justify-center gap-0.5 border border-white/10"
              >
                <Share2 className="w-3.5 h-3.5 text-purple-300" />
                <span>Share</span>
              </button>
              <button
                onClick={() => handleSave(heroConcept)}
                className="py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-[11px] uppercase transition flex flex-col items-center justify-center gap-0.5 border border-white/10"
              >
                <Bookmark className={`w-3.5 h-3.5 ${savedIds.has(heroConcept.id) ? 'text-amber-400 fill-amber-400' : 'text-amber-400'}`} />
                <span>{savedIds.has(heroConcept.id) ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>

          {/* Vibe Filter Tabs — browse the alternatives */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar mb-3">
            {[
              { id: 'all', label: 'All', emoji: '✨' },
              { id: 'relatable', label: 'Relatable', emoji: '😊' },
              { id: 'savage', label: 'Savage', emoji: '🔥' },
              { id: 'chaos', label: 'Chaos', emoji: '💀' },
              { id: 'desi', label: 'Desi', emoji: '🇮🇳' },
              { id: 'clever', label: 'Clever', emoji: '🧠' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  soundService.playPop();
                }}
                className={`px-3 py-1 rounded-full text-xs font-black transition flex items-center gap-1 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border border-pink-400'
                    : 'bg-[#120e2e]/80 text-slate-300 border border-white/10 hover:bg-[#1a1442]'
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Alternate concepts — easy to browse, smaller than the hero */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {filteredAlternates.map((concept) => (
              <div
                key={concept.id}
                className="group relative rounded-xl overflow-hidden bg-[#0c0922] border border-white/10 hover:border-pink-500/70 transition-all duration-300 flex flex-col justify-between p-1.5 text-white"
              >
                <div
                  onClick={() => loadConceptIntoStudio(concept)}
                  className="relative w-full aspect-square rounded-lg overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center cursor-pointer"
                >
                  <img
                    src={concept.templatePreviewUrl}
                    alt={concept.templateTitle}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/85 p-1.5 flex flex-col justify-between text-center select-none pointer-events-none">
                    <span className="font-impact text-[11px] uppercase tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] line-clamp-2 leading-tight">
                      {concept.topText}
                    </span>
                    <span className="font-impact text-[11px] uppercase tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] line-clamp-2 leading-tight">
                      {concept.bottomText}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 pt-1.5">
                  <button
                    onClick={() => {
                      soundService.playSparkle();
                      setSelectedRemixConcept(concept);
                    }}
                    title="Remix"
                    className="flex-1 py-1.5 rounded-lg bg-[#18133b] hover:bg-purple-900/80 text-white transition flex items-center justify-center border border-white/10"
                  >
                    <RefreshCw className="w-3 h-3 text-pink-400" />
                  </button>
                  <button
                    onClick={() => loadConceptIntoStudio(concept)}
                    title="Edit"
                    className="flex-1 py-1.5 rounded-lg bg-[#18133b] hover:bg-[#251d5c] text-white transition flex items-center justify-center border border-white/10"
                  >
                    <Edit3 className="w-3 h-3 text-cyan-400" />
                  </button>
                  <button
                    onClick={() => handleShareDirect(concept)}
                    title="Share"
                    className="flex-1 py-1.5 rounded-lg bg-[#18133b] hover:bg-purple-900/60 text-white transition flex items-center justify-center border border-white/10"
                  >
                    <Share2 className="w-3 h-3 text-purple-300" />
                  </button>
                  <button
                    onClick={() => handleSave(concept)}
                    title={savedIds.has(concept.id) ? 'Saved' : 'Save'}
                    className="flex-1 py-1.5 rounded-lg bg-[#18133b] hover:bg-amber-900/40 text-white transition flex items-center justify-center border border-white/10"
                  >
                    <Bookmark className={`w-3 h-3 ${savedIds.has(concept.id) ? 'text-amber-400 fill-amber-400' : 'text-amber-400'}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: AI MEME STUDIO Card with 3D Phone Mockup (5 Columns) */}
        <div className="lg:col-span-5 rounded-3xl bg-[#0c0922] border border-white/10 p-6 shadow-xl flex flex-col justify-between text-white relative overflow-hidden">
          {/* Single restrained glow — mood, not noise */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-4">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black font-anton uppercase tracking-wide text-white">
                  AI MEME STUDIO
                </h3>
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-pink-500 text-white">
                  NEW
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-1">
                Turn one idea into memes, reels, GIFs &amp; multi-platform assets.
              </p>
            </div>

            {/* Feature Icons Row */}
            <div className="grid grid-cols-5 gap-1.5 text-center pt-1">
              {[
                { icon: <Sparkles className="w-4 h-4 mx-auto text-amber-400" />, label: 'AI Generate' },
                { icon: <MessageSquare className="w-4 h-4 mx-auto text-pink-400" />, label: 'Auto Captions' },
                { icon: <Film className="w-4 h-4 mx-auto text-purple-400" />, label: 'Video Reels' },
                { icon: <Zap className="w-4 h-4 mx-auto text-cyan-400" />, label: 'GIF Maker' },
                { icon: <Share2 className="w-4 h-4 mx-auto text-emerald-400" />, label: 'Platform Optimize' }
              ].map((feat, i) => (
                <div key={i} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition">
                  {feat.icon}
                  <span className="text-[9px] font-bold text-slate-300 leading-tight">{feat.label}</span>
                </div>
              ))}
            </div>

            {/* Visual 3D Phone Preview Mockup */}
            <div className="relative mt-2 p-4 rounded-2xl bg-gradient-to-br from-[#0c0922] to-[#1c1242] border border-white/10 flex items-center justify-between gap-4 overflow-hidden shadow-inner">
              <div className="flex flex-col gap-1 z-10">
                <span className="text-[10px] font-black uppercase text-amber-400">VIRAL REEL PREVIEW</span>
                <span className="font-impact text-sm sm:text-base uppercase tracking-wide text-white leading-tight">
                  WHEN SALARY ARRIVES AND DISAPPEARS IN 2 DAYS
                </span>
                <span className="text-[10px] text-slate-400 font-medium">9:16 Shorts • Instagram • Facebook</span>
              </div>

              <div className="w-20 h-28 rounded-xl bg-slate-950 border-2 border-pink-500/50 overflow-hidden shrink-0 relative shadow-2xl rotate-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  alt="Reel Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 p-1 flex flex-col justify-between text-center">
                  <span className="text-[8px] font-impact text-white uppercase">SALARY DAY</span>
                  <span className="text-[8px] font-impact text-amber-300 uppercase">BROKE AF 😭</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="relative z-10 pt-4">
            <button
              onClick={() => {
                soundService.playVictoryChime();
                setCurrentView('studio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3.5 rounded-2xl bg-brand-orange hover:brightness-110 text-white font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/25 active:scale-98"
            >
              <Wand2 className="w-4 h-4 text-yellow-300" />
              <span>Try AI Studio →</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
