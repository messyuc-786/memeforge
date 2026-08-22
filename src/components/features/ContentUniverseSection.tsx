import React from 'react';
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
  TrendingUp
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
    setCurrentView
  } = useMeme();

  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!currentUniverse) return null;

  const concepts: GeneratedMemeConcept[] = [
    currentUniverse.classicMeme,
    currentUniverse.relatableMeme,
    currentUniverse.savageMeme,
    currentUniverse.desiMeme,
    currentUniverse.corporateMeme,
    currentUniverse.absurdMeme
  ];

  const handleCopyText = (concept: GeneratedMemeConcept) => {
    navigator.clipboard.writeText(`${concept.topText} — ${concept.bottomText}`);
    setCopiedId(concept.id);
    soundService.playPop();
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 flex flex-col gap-10 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-dark-850 via-dark-900 to-dark-850 border-2 border-brand-orange/40 shadow-2xl">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-orange to-brand-pink flex items-center justify-center text-3xl shadow-lg shrink-0">
            🔥
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black font-anton uppercase tracking-wide text-slate-100">
                CONTENT MULTI-VERSE UNLOCKED
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/40">
                1 IDEA → 10 ASSETS
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Concept Prompt: <strong className="text-brand-orange">"{currentUniverse.idea}"</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundService.playPop();
            setIsPlatformModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-2xl bg-dark-800 hover:bg-brand-cyan hover:text-slate-950 text-slate-200 font-extrabold text-xs transition flex items-center gap-2 border border-dark-700 shadow-md"
        >
          <Share2 className="w-4 h-4 text-brand-cyan" />
          <span>Platform Optimizer</span>
        </button>
      </div>

      {/* 6 Core Generated Meme Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black font-anton uppercase tracking-wide text-slate-100 flex items-center gap-2">
            <span>🎭</span> 6 MULTI-TONE MEME CONCEPTS
          </h2>
          <span className="text-xs text-slate-400 font-semibold">Click Edit, Remix, or Meme DNA</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((concept) => (
            <div
              key={concept.id}
              className="group rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-dark-700/90 hover:border-brand-orange/80 p-4 flex flex-col justify-between gap-4 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-orange/15"
            >
              {/* Card Header Tag */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl">{concept.toneEmoji}</span>
                  <span className="text-xs font-black uppercase text-slate-100">{concept.toneLabel}</span>
                </div>

                {/* Score Pill */}
                <button
                  onClick={() => {
                    soundService.playSparkle();
                    setSelectedDNAConcept(concept);
                  }}
                  className="px-2 py-0.5 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow text-[10px] font-black uppercase flex items-center gap-1 hover:bg-brand-yellow hover:text-slate-950 transition"
                >
                  <span>🧬 DNA: {concept.creativeScore.totalScore}/100</span>
                </button>
              </div>

              {/* Template Image Viewport */}
              <div
                onClick={() => loadConceptIntoStudio(concept)}
                className="relative w-full aspect-square rounded-2xl bg-dark-950 overflow-hidden border border-dark-800 p-2 flex items-center justify-center cursor-pointer group-hover:border-brand-orange/50 transition"
              >
                <img
                  src={concept.templatePreviewUrl}
                  alt={concept.templateTitle}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />

                {/* Hover Edit Overlay */}
                <div className="absolute inset-0 bg-dark-950/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-pink text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xl">
                    <Edit3 className="w-4 h-4" /> Open in Studio
                  </span>
                </div>
              </div>

              {/* Caption Lines */}
              <div className="flex flex-col gap-1 text-xs">
                <div className="font-impact text-brand-yellow uppercase tracking-wide line-clamp-2">
                  TOP: {concept.topText}
                </div>
                <div className="font-impact text-white uppercase tracking-wide line-clamp-2">
                  BOTTOM: {concept.bottomText}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-1.5 pt-2 border-t border-dark-800">
                <button
                  onClick={() => loadConceptIntoStudio(concept)}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-pink text-white font-black text-xs uppercase transition flex items-center justify-center gap-1 shadow-md hover:brightness-110 active:scale-95"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playSparkle();
                    setSelectedRemixConcept(concept);
                  }}
                  title="10-Way Remix"
                  className="p-2 rounded-xl bg-dark-800 hover:bg-brand-purple hover:text-white text-slate-300 transition"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    soundService.playPop();
                    saveMemeToLibrary(concept);
                  }}
                  title="Save to Library"
                  className="p-2 rounded-xl bg-dark-800 hover:bg-brand-yellow hover:text-slate-950 text-slate-300 transition"
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleCopyText(concept)}
                  title="Copy Text"
                  className="p-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-300 transition"
                >
                  {copiedId === concept.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Reel Preview & Social Multi-Pack Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 9:16 Video Reel Prompt Card */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-brand-pink/40 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎥</span>
              <div>
                <span className="text-sm font-black uppercase text-slate-100 block">Short-Form Video Script</span>
                <span className="text-[10px] text-brand-pink font-bold">9:16 Reels, TikTok &amp; Shorts</span>
              </div>
            </div>
            <button
              onClick={() => {
                soundService.playPop();
                setCurrentView('video');
              }}
              className="text-xs font-black text-brand-pink hover:text-white flex items-center gap-1 transition"
            >
              <span>Open Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-dark-950/80 border border-dark-800 flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase text-slate-400">HOOK OVERLAY</span>
            <p className="text-sm font-black text-brand-yellow italic">"{currentUniverse.videoReelPrompt.hook}"</p>
            <span className="text-[10px] font-black uppercase text-slate-400 mt-1">RECOMMENDED AUDIO</span>
            <p className="text-xs text-slate-300 font-semibold">🔊 {currentUniverse.videoReelPrompt.suggestedAudio}</p>
          </div>

          <button
            onClick={() => {
              soundService.playSparkle();
              setCurrentView('video');
            }}
            className="w-full py-3 rounded-2xl bg-dark-800 hover:bg-brand-pink hover:text-white text-slate-200 font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md"
          >
            <Film className="w-4 h-4 text-brand-pink" />
            <span>Launch Video Meme Studio →</span>
          </button>
        </div>

        {/* Social Posts Multi-Pack Card */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-brand-cyan/40 shadow-xl flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📱</span>
            <div>
              <span className="text-sm font-black uppercase text-slate-100 block">Social Multi-Pack Captions</span>
              <span className="text-[10px] text-brand-cyan font-bold">Ready-to-post on X, Instagram &amp; WhatsApp</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-dark-950/80 border border-dark-800 flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase text-brand-cyan">💬 X / Twitter Viral Post</span>
              <p className="text-xs text-slate-300 font-medium leading-relaxed italic line-clamp-3">
                "{currentUniverse.socialPosts.xTweetText}"
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-dark-950/80 border border-dark-800 flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase text-emerald-400">🟢 WhatsApp 1-Liner</span>
              <p className="text-xs text-slate-300 font-medium leading-relaxed italic line-clamp-3">
                "{currentUniverse.socialPosts.whatsappOneLiner}"
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {currentUniverse.socialPosts.hashtags.map((tag) => (
              <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-dark-800 text-brand-cyan border border-brand-cyan/30">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
