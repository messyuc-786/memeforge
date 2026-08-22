import React, { useRef, useState } from 'react';
import {
  Sparkles,
  Zap,
  Flame,
  Upload,
  Video,
  FileText,
  Link,
  Camera,
  Layers,
  ArrowRight,
  TrendingUp,
  Smile,
  Film,
  Crown
} from 'lucide-react';
import { useMeme } from '../context/MemeContext';
import { MemeTone } from '../types';
import { soundService } from '../services/soundService';
import { ContentUniverseSection } from './features/ContentUniverseSection';
import { CategoryExplorer } from './features/CategoryExplorer';
import { PopularAndStudioRow } from './features/PopularAndStudioRow';
import { TrendsSection } from './features/TrendsSection';
import { DesiModeSection } from './features/DesiModeSection';
import { CommunitySection } from './features/CommunitySection';
import { Footer } from './Footer';

const TONES: { id: MemeTone; label: string; emoji: string }[] = [
  { id: 'relatable', label: 'Relatable', emoji: '😊' },
  { id: 'savage', label: 'Savage', emoji: '🔥' },
  { id: 'unhinged', label: 'Unhinged', emoji: '💀' },
  { id: 'clever', label: 'Clever', emoji: '🧠' },
  { id: 'wholesome', label: 'Wholesome', emoji: '❤️' },
  { id: 'desi', label: 'Desi', emoji: '🇮🇳' },
  { id: 'absurd', label: 'Absurd', emoji: '🤪' }
];

export const LandingPage: React.FC = () => {
  const {
    activeIdea,
    setActiveIdea,
    generateUniverse,
    isGeneratingUniverse,
    currentUniverse,
    setCurrentView,
    setBackgroundImage,
    setToolMode,
    setIsPutMeInMemeModalOpen,
    setIsTemplatesModalOpen
  } = useMeme();

  const [selectedTone, setSelectedTone] = useState<MemeTone>('relatable');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const sampleIdeas = [
    'When your manager says the meeting will only take 5 minutes',
    'My bank balance watching me add another iced coffee to cart',
    'Me trying to look busy when someone walks past my desk',
    'Saying "I am going to sleep early tonight" at 2:45 AM'
  ];

  const handleGenerate = async () => {
    const ideaToUse = activeIdea.trim() || sampleIdeas[0];
    if (!activeIdea.trim()) {
      setActiveIdea(ideaToUse);
    }
    soundService.playVineBoom();
    await generateUniverse(ideaToUse, selectedTone);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundService.playPop();
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          setBackgroundImage(dataUrl);
          setToolMode('meme');
          setCurrentView('studio');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#faf8fc] text-slate-900 overflow-x-hidden">
      {/* 1. HERO SECTION (Light Pastel Atmosphere matching reference) */}
      <section className="relative w-full pt-10 sm:pt-16 pb-14 px-4 overflow-hidden bg-gradient-to-b from-[#e8ecfa] via-[#f4f0fb] to-[#faf8fc]">
        {/* Soft Ambient Radial Lights */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-16 right-1/4 translate-x-1/2 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

        {/* --- DECORATIVE MEME STICKERS AROUND HERO EDGES --- */}
        {/* Left Sticker: Doge with Pixel Shades & "SAVAGE!" badge */}
        <div className="hidden xl:flex absolute left-8 lg:left-14 top-24 flex-col items-center gap-2 pointer-events-none select-none -rotate-6 transition-transform hover:rotate-0 duration-300">
          <div className="relative w-28 h-28 rounded-3xl bg-white p-2 shadow-2xl border-4 border-white">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <circle cx="60" cy="60" r="50" fill="#f59e0b" />
              <polygon points="30,30 40,5 55,25" fill="#d97706" />
              <polygon points="90,30 80,5 65,25" fill="#d97706" />
              {/* Pixel Sunglasses */}
              <rect x="25" y="45" width="70" height="18" rx="3" fill="#0f172a" />
              <rect x="35" y="48" width="6" height="4" fill="#ffffff" />
              <rect x="75" y="48" width="6" height="4" fill="#ffffff" />
              <path d="M45 75 Q60 90 75 75" stroke="#0f172a" stroke-width="4" fill="none" />
            </svg>
            <div className="absolute -bottom-3 -right-3 px-2.5 py-1 rounded-xl bg-rose-500 text-white font-black text-[10px] uppercase shadow-lg rotate-12">
              SAVAGE! 🔥
            </div>
          </div>
          <span className="text-xs font-black text-slate-700 bg-white/80 px-2 py-0.5 rounded-full shadow-sm">
            doge.exe
          </span>
        </div>

        {/* Right Sticker: Cat with Sunglasses + David Bust + "LEGENDARY!" badge */}
        <div className="hidden xl:flex absolute right-8 lg:right-14 top-20 flex-col items-center gap-2 pointer-events-none select-none rotate-6 transition-transform hover:rotate-0 duration-300">
          <div className="relative w-32 h-36 rounded-2xl bg-white p-2 pb-6 shadow-2xl border-4 border-white flex flex-col items-center">
            <div className="w-full h-24 rounded-xl bg-purple-100 overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-20 h-20">
                <circle cx="50" cy="50" r="38" fill="#f97316" />
                <polygon points="25,30 20,5 40,22" fill="#ea580c" />
                <polygon points="75,30 80,5 60,22" fill="#ea580c" />
                {/* Round Sunglasses */}
                <circle cx="38" cy="48" r="12" fill="#0f172a" />
                <circle cx="62" cy="48" r="12" fill="#0f172a" />
                <line x1="48" y1="48" x2="52" y2="48" stroke="#0f172a" stroke-width="3" />
                <path d="M42 66 Q50 74 58 66" stroke="#0f172a" stroke-width="3" fill="none" />
              </svg>
            </div>
            <span className="text-[10px] font-black text-slate-800 mt-1 uppercase tracking-wider">
              LEGENDARY! 👑
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xl">✨</span>
            <span className="text-xs font-black text-purple-700 bg-purple-100/90 px-2.5 py-0.5 rounded-full">
              #Viral2026
            </span>
          </div>
        </div>

        {/* --- MAIN HERO CONTENT --- */}
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
          {/* Top Brand / Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-sm mb-4">
            <span className="text-base">🔥</span>
            <span className="text-xs font-black uppercase tracking-wider text-slate-800">
              MemeForge 2026 Studio
            </span>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-pink text-white">
              AI ENGINE v4
            </span>
          </div>

          {/* Dominant Headline: Idea In, MEME OUT! */}
          <div className="flex flex-col items-center leading-none mb-3">
            <span className="font-caveat text-4xl sm:text-5xl md:text-6xl text-slate-800 -rotate-2 transform mb-1 font-bold">
              Idea In,
            </span>
            <h1 className="font-anton text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight bg-gradient-to-r from-orange-500 via-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
              MEME OUT!
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 font-semibold max-w-xl mb-7">
            Your idea. AI magic.{' '}
            <span className="text-slate-900 font-extrabold underline decoration-pink-500 decoration-2">
              Legendary memes in seconds.
            </span>
          </p>

          {/* --- HERO GENERATOR CONSOLE PANEL (White / Translucent) --- */}
          <div className="w-full rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl border border-slate-200/90 p-6 sm:p-7 flex flex-col gap-4 text-left transition-all">
            {/* Input Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-orange" />
                <span>DESCRIBE WHAT HAPPENED</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400">
                  {activeIdea.length}/200
                </span>
                {activeIdea && (
                  <button
                    onClick={() => setActiveIdea('')}
                    className="text-[11px] font-bold text-rose-500 hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Large Text Area */}
            <div className="relative">
              <textarea
                value={activeIdea}
                onChange={(e) => setActiveIdea(e.target.value)}
                maxLength={200}
                rows={3}
                placeholder="e.g. When your manager says the meeting will only take 5 minutes..."
                className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-brand-pink focus:bg-white text-slate-900 text-sm sm:text-base font-medium outline-none transition resize-none placeholder:text-slate-400"
              />

              {/* Quick Prompt Suggestions */}
              {!activeIdea && (
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2">
                  <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap">
                    💡 Try:
                  </span>
                  {sampleIdeas.slice(0, 2).map((hint, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        soundService.playPop();
                        setActiveIdea(hint);
                      }}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold whitespace-nowrap transition"
                    >
                      "{hint.slice(0, 35)}..."
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tone Selector Row */}
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                CHOOSE TONE
              </span>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {TONES.map((tone) => {
                  const isSelected = selectedTone === tone.id;
                  return (
                    <button
                      key={tone.id}
                      onClick={() => {
                        setSelectedTone(tone.id);
                        soundService.playPop();
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20 scale-105'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <span>{tone.emoji}</span>
                      <span>{tone.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Action Button (Vibrant Multi-Color Gradient) */}
            <button
              onClick={handleGenerate}
              disabled={isGeneratingUniverse}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 via-purple-600 to-blue-600 hover:brightness-110 text-white font-black text-sm sm:text-base uppercase tracking-wider transition-all duration-300 shadow-xl shadow-pink-500/25 active:scale-98 flex items-center justify-center gap-2.5 disabled:opacity-75"
            >
              {isGeneratingUniverse ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>FORGING 10 MEME FORMATS...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                  <span>✨ FORGE MEME UNIVERSE →</span>
                </>
              )}
            </button>

            {/* Secondary Creation Methods Row */}
            <div className="flex flex-col items-center gap-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                OR CREATE FROM
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Upload Photo</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playPop();
                    setCurrentView('video');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Video className="w-3.5 h-3.5 text-rose-500" />
                  <span>Upload Video</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playPop();
                    setCurrentView('video');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Film className="w-3.5 h-3.5 text-purple-500" />
                  <span>Video to Meme</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playPop();
                    setIsTemplatesModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Text to Meme</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playSparkle();
                    setIsPutMeInMemeModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Camera className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Put Me in Meme</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handlePhotoUpload}
          accept="image/*"
          className="hidden"
        />
      </section>

      {/* 2. GENERATED MULTI-VERSE OUTPUT (If idea generated) */}
      {currentUniverse && (
        <div id="meme-universe-results">
          <ContentUniverseSection />
        </div>
      )}

      {/* 3. ✨ EXPLORE BY CATEGORY (Image Cards) */}
      <CategoryExplorer />

      {/* 4. POPULAR TEMPLATES + AI MEME STUDIO SIDE-BY-SIDE */}
      <PopularAndStudioRow />

      {/* 5. TRENDING NOW (Clean Light Cards) */}
      <TrendsSection />

      {/* 6. DESI / INDIA MEME STUDIO (Warm Indian Presets) */}
      <DesiModeSection />

      {/* 7. COMMUNITY & INSPIRATION (Dark Premium Section) */}
      <CommunitySection />

      {/* 8. FOOTER */}
      <Footer />
    </div>
  );
};
