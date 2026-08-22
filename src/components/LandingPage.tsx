import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Flame,
  Wand2,
  ArrowRight,
  Upload,
  Film,
  Camera,
  Layers,
  Zap,
  Globe,
  Share2,
  Bookmark,
  Smile,
  RefreshCw,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';
import { MemeTone, ToolMode } from '../types';
import { useMeme } from '../context/MemeContext';
import { soundService } from '../services/soundService';
import { ContentUniverseSection } from './features/ContentUniverseSection';
import { TrendsSection } from './features/TrendsSection';
import { CommunitySection } from './features/CommunitySection';
import { DesiModeSection } from './features/DesiModeSection';
import { MEME_TEMPLATES } from '../data/templatesData';
import { Footer } from './Footer';

interface LandingPageProps {
  onStart: (mode?: ToolMode) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const {
    activeIdea,
    setActiveIdea,
    generateUniverse,
    isGeneratingUniverse,
    currentUniverse,
    loadTemplate,
    setCurrentView,
    setIsPutMeInMemeModalOpen,
    setBackgroundImage,
    setToolMode
  } = useMeme();

  const [selectedTone, setSelectedTone] = useState<MemeTone>('relatable');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const quickPromptChips = [
    'When your manager says this will only take 5 minutes...',
    'Salary credited at 9 AM vs Bank balance on 4th of month',
    'Trying to fix a bug at 3 AM and breaking the entire database',
    'Relatives at weddings asking when you are getting married',
    'Diet plan says salad but mom made fresh hot biryani'
  ];

  const toneButtons: { tone: MemeTone; label: string; emoji: string }[] = [
    { tone: 'relatable', label: 'Relatable', emoji: '😂' },
    { tone: 'savage', label: 'Savage', emoji: '🔥' },
    { tone: 'unhinged', label: 'Unhinged', emoji: '💀' },
    { tone: 'clever', label: 'Clever', emoji: '🧠' },
    { tone: 'wholesome', label: 'Wholesome', emoji: '❤️' },
    { tone: 'desi', label: 'Desi Mode', emoji: '🇮🇳' },
    { tone: 'absurd', label: 'Absurd', emoji: '🤪' }
  ];

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeIdea.trim()) return;

    soundService.playSparkle();
    await generateUniverse(activeIdea, selectedTone);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        soundService.playAirhorn();
        setBackgroundImage(dataUrl);
        setToolMode('meme');
        setCurrentView('studio');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLaunchTemplate = (templateId: string) => {
    soundService.playVineBoom();
    const template = MEME_TEMPLATES.find((t) => t.id === templateId) || MEME_TEMPLATES[0];
    loadTemplate(template);
    setToolMode('meme');
    setCurrentView('studio');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950 text-slate-100 overflow-x-hidden flex flex-col justify-between">
      {/* 🌈 Funky Ambient Glow Backdrops */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[800px] h-[550px] bg-gradient-to-tr from-brand-orange/30 via-brand-pink/25 to-brand-purple/20 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-40 right-10 w-[650px] h-[600px] bg-gradient-to-bl from-brand-cyan/20 via-brand-purple/25 to-brand-pink/20 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-60 left-10 w-[550px] h-[550px] bg-brand-yellow/15 blur-[130px] pointer-events-none rounded-full" />

      {/* Cyber Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* ========================================================================= */}
      {/* 🚀 HERO SECTION — AI-FIRST CREATION BOX (ABOVE THE FOLD) */}
      {/* ========================================================================= */}
      <section className="relative max-w-5xl mx-auto px-4 pt-10 pb-8 text-center z-10 flex flex-col items-center">
        {/* Floating Soundboard Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 animate-bounce-subtle select-none">
          <span
            onClick={() => soundService.playAirhorn()}
            className="px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/50 text-brand-yellow text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-lg hover:scale-110 active:scale-95 transition cursor-pointer"
          >
            🔥 IDEA → AI → 10 MEMES
          </span>
          <span
            onClick={() => soundService.playVineBoom()}
            className="px-3 py-1 rounded-full bg-brand-purple/25 border border-brand-purple/50 text-brand-pink text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-lg hover:scale-110 active:scale-95 transition cursor-pointer"
          >
            💀 100% FREE AI STUDIO
          </span>
          <span
            onClick={() => soundService.playSparkle()}
            className="px-3 py-1 rounded-full bg-brand-cyan/20 border border-brand-cyan/50 text-brand-cyan text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-lg hover:scale-110 active:scale-95 transition cursor-pointer"
          >
            ✨ 2026 AI ENGINE
          </span>
        </div>

        {/* Flagship Brand Headline */}
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-black font-anton tracking-tight uppercase leading-[0.9] mb-3 select-none">
          <span className="block text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            IDEA IN.
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-brand-orange via-brand-pink to-brand-cyan animate-pulse-slow drop-shadow-2xl">
            MEME OUT. 🔥
          </span>
        </h1>

        {/* Subtitle & Product Promise */}
        <p className="max-w-2xl text-base sm:text-2xl text-slate-200 font-extrabold mb-8 leading-snug drop-shadow">
          Describe what happened. MemeForge turns your single idea into 10 multi-tone memes, 9:16 video reels &amp; viral posts!
        </p>

        {/* 🌟 Flagship Interactive AI Creation Box */}
        <form
          onSubmit={handleGenerate}
          className="w-full max-w-4xl p-3 sm:p-5 rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-brand-orange/60 shadow-2xl shadow-brand-orange/20 flex flex-col gap-4 mb-4 backdrop-blur-xl"
        >
          {/* Main Input Textarea */}
          <div className="relative w-full">
            <textarea
              rows={3}
              value={activeIdea}
              onChange={(e) => setActiveIdea(e.target.value)}
              placeholder="What's the situation, thought, reaction or joke? (e.g. When your manager says this will only take 5 minutes...)"
              className="w-full p-4 rounded-2xl bg-dark-950/90 border border-dark-700 text-white font-bold text-base sm:text-lg outline-none focus:border-brand-orange transition resize-none placeholder:text-slate-500 shadow-inner"
            />

            {/* Quick Clear */}
            {activeIdea && (
              <button
                type="button"
                onClick={() => setActiveIdea('')}
                className="absolute top-3 right-3 text-xs text-slate-400 hover:text-white bg-dark-800 px-2 py-1 rounded-lg"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Prompt Suggestion Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-left">
            <span className="text-[11px] font-black uppercase text-brand-yellow shrink-0 flex items-center gap-1">
              <span>💡</span> Try:
            </span>
            {quickPromptChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  soundService.playPop();
                  setActiveIdea(chip);
                }}
                className="px-3 py-1 rounded-xl bg-dark-800 hover:bg-dark-750 text-[11px] text-slate-300 hover:text-white whitespace-nowrap border border-dark-700 hover:border-brand-yellow/50 transition shrink-0"
              >
                "{chip.slice(0, 32)}..."
              </button>
            ))}
          </div>

          {/* Quick Tone Selectors */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[11px] font-black uppercase text-slate-400 shrink-0">Tone:</span>
            {toneButtons.map((tb) => {
              const isSelected = selectedTone === tb.tone;
              return (
                <button
                  key={tb.tone}
                  type="button"
                  onClick={() => {
                    soundService.playPop();
                    setSelectedTone(tb.tone);
                  }}
                  className={`px-3 py-1.5 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-brand-orange to-brand-pink text-white shadow-lg shadow-brand-orange/30 scale-105 border border-white/30'
                      : 'bg-dark-800 hover:bg-dark-750 text-slate-300 border border-dark-700'
                  }`}
                >
                  <span className="text-base">{tb.emoji}</span>
                  <span>{tb.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Action Generate CTA Button */}
          <button
            type="submit"
            disabled={isGeneratingUniverse}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-pink text-slate-950 font-black text-lg uppercase tracking-wider shadow-2xl shadow-brand-orange/40 hover:scale-[1.01] active:scale-98 transition flex items-center justify-center gap-3 border-2 border-white/30 disabled:opacity-50"
          >
            {isGeneratingUniverse ? (
              <>
                <RefreshCw className="w-6 h-6 animate-spin text-slate-950" />
                <span>Cooking Your Content Universe... 🔥</span>
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 stroke-[3] text-slate-950 animate-pulse" />
                <span>FORGE CONTENT UNIVERSE ✨</span>
                <ArrowRight className="w-6 h-6 stroke-[3] text-slate-950" />
              </>
            )}
          </button>
        </form>

        {/* Secondary Upload Launchers */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs font-bold text-slate-400">
          <span>Or create from:</span>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-200 border border-dark-700 flex items-center gap-1.5 transition hover:scale-105"
          >
            <ImageIcon className="w-3.5 h-3.5 text-brand-yellow" />
            <span>Upload Photo</span>
          </button>

          <button
            onClick={() => {
              soundService.playPop();
              setCurrentView('video');
            }}
            className="px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-200 border border-dark-700 flex items-center gap-1.5 transition hover:scale-105"
          >
            <Film className="w-3.5 h-3.5 text-brand-pink" />
            <span>Upload Video / 9:16 Reel</span>
          </button>

          <button
            onClick={() => setIsPutMeInMemeModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-200 border border-dark-700 flex items-center gap-1.5 transition hover:scale-105"
          >
            <Camera className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Put Me In The Meme 🤳</span>
          </button>

          <button
            onClick={() => {
              soundService.playPop();
              setCurrentView('desi');
            }}
            className="px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-200 border border-dark-700 flex items-center gap-1.5 transition hover:scale-105"
          >
            <span>🇮🇳</span>
            <span>Desi / Bollywood Mode</span>
          </button>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
      </section>

      {/* ========================================================================= */}
      {/* 🌟 LIVE GENERATED CONTENT UNIVERSE SECTION (DISPLAYS MULTI-TONE ASSETS) */}
      {/* ========================================================================= */}
      {currentUniverse ? (
        <ContentUniverseSection />
      ) : (
        /* Default Showcase if user has not hit generate yet */
        <section className="max-w-7xl mx-auto px-4 py-8 w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black font-anton uppercase tracking-wide text-slate-100 flex items-center gap-2">
              <span>🔥</span> POPULAR STARTER TEMPLATES
            </h2>
            <span className="text-xs text-slate-400 font-semibold">Click to customize in Studio</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {MEME_TEMPLATES.slice(0, 6).map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => handleLaunchTemplate(tpl.id)}
                className="group p-3 rounded-2xl bg-gradient-to-b from-dark-850 to-dark-900 border border-dark-700 hover:border-brand-orange transition cursor-pointer flex flex-col gap-2 hover:-translate-y-1 shadow-md"
              >
                <div className="w-full aspect-square rounded-xl bg-dark-950 border border-dark-800 p-1 flex items-center justify-center overflow-hidden">
                  <img
                    src={tpl.previewUrl}
                    alt={tpl.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-xs font-black text-slate-100 truncate group-hover:text-brand-yellow">
                  {tpl.title}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 🔥 2026 TREND ENGINE SECTION */}
      {/* ========================================================================= */}
      <TrendsSection />

      {/* ========================================================================= */}
      {/* 🇮🇳 DESI / INDIA MODE SHOWCASE */}
      {/* ========================================================================= */}
      <DesiModeSection />

      {/* ========================================================================= */}
      {/* 🌐 COMMUNITY FEED & REMIX SHOWCASE */}
      {/* ========================================================================= */}
      <CommunitySection />

      {/* ========================================================================= */}
      {/* 🏷️ OFFICIAL FOOTER */}
      {/* ========================================================================= */}
      <Footer />
    </div>
  );
};
