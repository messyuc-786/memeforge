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
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!currentUniverse) return null;

  const allConcepts: GeneratedMemeConcept[] = [
    currentUniverse.classicMeme,
    currentUniverse.relatableMeme,
    currentUniverse.savageMeme,
    currentUniverse.desiMeme,
    currentUniverse.corporateMeme,
    currentUniverse.absurdMeme
  ];

  const filteredConcepts = activeTab === 'all'
    ? allConcepts
    : allConcepts.filter((c) => c.tone === activeTab || (activeTab === 'chaos' && c.tone === 'absurd'));

  const handleDownloadDirect = (concept: GeneratedMemeConcept) => {
    soundService.playVictoryChime();
    loadConceptIntoStudio(concept);
    setIsExportModalOpen(true);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* 2-Column Responsive Layout: Left 7 cols (Meme Cards) + Right 5 cols (AI Studio) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: 👑 YOUR MEME UNIVERSE (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">👑</span>
                <h2 className="text-xl sm:text-2xl font-black font-anton uppercase tracking-wide text-slate-900">
                  YOUR MEME UNIVERSE
                </h2>
              </div>
              <p className="text-xs text-slate-500 font-semibold">
                Multiple memes. Multiple vibes. All from your idea.
              </p>
            </div>

            <button
              onClick={() => {
                soundService.playPop();
                setIsTemplatesModalOpen(true);
              }}
              className="text-xs font-black text-slate-700 hover:text-pink-600 flex items-center gap-1 transition"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Vibe Filter Tabs matching Reference */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar mb-4">
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
                    ? 'bg-pink-500 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* 6 Real Generated Meme Cards Grid (3 cols x 2 rows) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredConcepts.map((concept) => (
              <div
                key={concept.id}
                className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between p-2.5 text-white hover:-translate-y-1"
              >
                {/* Template Image Viewport with Dark Gradient Overlay */}
                <div
                  onClick={() => loadConceptIntoStudio(concept)}
                  className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center cursor-pointer"
                >
                  <img
                    src={concept.templatePreviewUrl}
                    alt={concept.templateTitle}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Dark Overlays with Meme Impact Typography */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 p-2 flex flex-col justify-between text-center select-none pointer-events-none">
                    <span className="font-impact text-xs sm:text-[13px] uppercase tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] line-clamp-2 leading-tight">
                      {concept.topText}
                    </span>
                    <span className="font-impact text-xs sm:text-[13px] uppercase tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] line-clamp-2 leading-tight">
                      {concept.bottomText}
                    </span>
                  </div>

                  {/* Top Right Dots Action */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundService.playSparkle();
                      setSelectedDNAConcept(concept);
                    }}
                    className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-black/60 text-white/80 hover:text-white transition"
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card Action Buttons Row: Edit, Remix, Download */}
                <div className="flex items-center gap-1.5 pt-2">
                  <button
                    onClick={() => loadConceptIntoStudio(concept)}
                    className="flex-1 py-1.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] uppercase transition flex items-center justify-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      soundService.playSparkle();
                      setSelectedRemixConcept(concept);
                    }}
                    className="flex-1 py-1.5 px-2 rounded-xl bg-slate-800 hover:bg-purple-900 text-white font-bold text-[11px] uppercase transition flex items-center justify-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3 text-pink-400" />
                    <span>Remix</span>
                  </button>

                  <button
                    onClick={() => handleDownloadDirect(concept)}
                    title="Download Meme"
                    className="p-1.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white transition flex items-center justify-center shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: AI MEME STUDIO Card with 3D Phone Mockup (5 Columns) */}
        <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#0b0f19] via-[#1a103c] to-[#2e1065] border-2 border-purple-500/40 p-6 shadow-2xl flex flex-col justify-between text-white relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-pink-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-500/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-4">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black font-anton uppercase tracking-wide text-white">
                  AI MEME STUDIO
                </h3>
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-pink-500 text-white shadow-sm">
                  NEW
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-1">
                Turn one idea into memes, reels, GIFs &amp; more.
              </p>
            </div>

            {/* Feature Icons Row */}
            <div className="grid grid-cols-5 gap-1 text-center pt-1">
              {[
                { icon: <Sparkles className="w-4 h-4 mx-auto text-amber-400" />, label: 'AI Generate' },
                { icon: <MessageSquare className="w-4 h-4 mx-auto text-pink-400" />, label: 'Auto Captions' },
                { icon: <Film className="w-4 h-4 mx-auto text-purple-400" />, label: 'Video Reels' },
                { icon: <Zap className="w-4 h-4 mx-auto text-cyan-400" />, label: 'GIF Maker' },
                { icon: <Share2 className="w-4 h-4 mx-auto text-emerald-400" />, label: 'Platform Optimize' }
              ].map((feat, i) => (
                <div key={i} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5 border border-white/10">
                  {feat.icon}
                  <span className="text-[9px] font-bold text-slate-300 leading-tight">{feat.label}</span>
                </div>
              ))}
            </div>

            {/* Visual 3D Phone Preview Mockup */}
            <div className="relative mt-2 p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-purple-950 border border-purple-500/30 flex items-center justify-between gap-4 overflow-hidden shadow-inner">
              <div className="flex flex-col gap-1 z-10">
                <span className="text-[10px] font-black uppercase text-amber-400">VIRAL REEL PREVIEW</span>
                <span className="font-impact text-sm sm:text-base uppercase tracking-wide text-white leading-tight">
                  WHEN SALARY ARRIVES AND DISAPPEARS IN 2 DAYS
                </span>
                <span className="text-[10px] text-slate-400 font-medium">9:16 Shorts • Instagram • Facebook</span>
              </div>

              <div className="w-20 h-28 rounded-xl bg-slate-950 border-2 border-pink-500/50 overflow-hidden shrink-0 relative shadow-xl rotate-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  alt="Reel Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 p-1 flex flex-col justify-between text-center">
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
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-xl shadow-pink-500/25 active:scale-98"
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
