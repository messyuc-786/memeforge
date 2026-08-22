import React, { useRef, useState } from 'react';
import {
  Sparkles,
  Zap,
  Flame,
  Upload,
  Video,
  FileText,
  Camera,
  Film,
  Crown,
  ArrowRight,
  TrendingUp,
  Smile,
  ShieldCheck,
  CheckCircle2
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
    'My bank balance watching me order food for the 3rd time today',
    'Me pretending to understand the math problem on the whiteboard',
    'Saying "I am going to sleep early tonight" at 3:15 AM'
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
    <div className="w-full flex flex-col bg-slate-900 text-slate-100 overflow-x-hidden">
      {/* 1. DYNAMIC COLORFUL HERO (Animated Aurora Mesh + Meme Doodles) */}
      <section className="relative w-full pt-8 sm:pt-14 pb-14 px-3 sm:px-6 overflow-hidden bg-gradient-to-b from-[#1e1b4b] via-[#2e1065] via-[#4a044e] to-[#0f172a] bg-doodle-pattern">
        {/* Colorful Animated Ambient Aurora Light Blobs */}
        <div className="absolute -top-10 left-1/4 -translate-x-1/2 w-[35rem] h-[35rem] bg-gradient-to-tr from-pink-500/35 to-rose-600/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute top-10 right-1/4 translate-x-1/2 w-[35rem] h-[35rem] bg-gradient-to-br from-cyan-400/35 to-blue-600/30 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[30rem] bg-gradient-to-r from-purple-500/25 via-amber-400/20 to-pink-500/25 rounded-full blur-3xl pointer-events-none" />

        {/* --- FLOATING MEME STICKERS & DOODLES (Desktop & Tablet) --- */}
        {/* Left Floating Sticker: Doge with Pixel Shades */}
        <div className="hidden lg:flex absolute left-4 xl:left-12 top-20 flex-col items-center gap-2 pointer-events-none select-none animate-float z-10">
          <div className="relative w-28 h-28 rounded-3xl bg-slate-900/90 backdrop-blur-md p-2 shadow-2xl border-2 border-amber-400/60 rotate-[-6deg]">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <circle cx="60" cy="60" r="50" fill="#f59e0b" />
              <polygon points="30,30 40,5 55,25" fill="#d97706" />
              <polygon points="90,30 80,5 65,25" fill="#d97706" />
              <rect x="25" y="45" width="70" height="18" rx="3" fill="#0f172a" />
              <rect x="35" y="48" width="6" height="4" fill="#ffffff" />
              <rect x="75" y="48" width="6" height="4" fill="#ffffff" />
              <path d="M45 75 Q60 90 75 75" stroke="#0f172a" strokeWidth="4" fill="none" />
            </svg>
            <div className="absolute -bottom-3 -right-3 px-2.5 py-1 rounded-xl bg-rose-500 text-white font-black text-[10px] uppercase shadow-xl rotate-12 border border-rose-300">
              SAVAGE! 🔥
            </div>
          </div>
          <span className="text-[11px] font-black text-amber-300 bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-amber-400/40 shadow-lg">
            doge.exe
          </span>
        </div>

        {/* Right Floating Sticker: Polaroid Cat with Sunglasses */}
        <div className="hidden lg:flex absolute right-4 xl:right-12 top-16 flex-col items-center gap-2 pointer-events-none select-none animate-float-reverse z-10">
          <div className="relative w-32 h-36 rounded-2xl bg-white p-2 pb-6 shadow-2xl border-4 border-purple-300/80 rotate-[6deg] flex flex-col items-center">
            <div className="w-full h-24 rounded-xl bg-gradient-to-br from-purple-900 to-indigo-950 overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-20 h-20">
                <circle cx="50" cy="50" r="38" fill="#f97316" />
                <polygon points="25,30 20,5 40,22" fill="#ea580c" />
                <polygon points="75,30 80,5 60,22" fill="#ea580c" />
                <circle cx="38" cy="48" r="12" fill="#0f172a" />
                <circle cx="62" cy="48" r="12" fill="#0f172a" />
                <line x1="48" y1="48" x2="52" y2="48" stroke="#0f172a" strokeWidth="3" />
                <path d="M42 66 Q50 74 58 66" stroke="#0f172a" strokeWidth="3" fill="none" />
              </svg>
            </div>
            <span className="text-[10px] font-black text-slate-900 mt-1.5 uppercase tracking-wider">
              LEGENDARY! 👑
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-base">✨</span>
            <span className="text-xs font-black text-cyan-300 bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-cyan-400/40">
              #Viral2026
            </span>
          </div>
        </div>

        {/* --- MAIN HERO CONTENT CONTAINER --- */}
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
          {/* Top Energetic Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-purple-400/40 shadow-xl mb-4 text-xs font-black uppercase tracking-wider text-slate-200">
            <span className="text-base animate-bounce-subtle">🔥</span>
            <span>MEMEFORGE STUDIO 2026</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-pink text-white shadow-sm font-black">
              PRO CREATOR SUITE
            </span>
          </div>

          {/* Dominant Headline: Idea In, MEME OUT! */}
          <div className="flex flex-col items-center leading-none mb-3">
            <span className="font-caveat text-4xl sm:text-5xl md:text-6xl text-amber-300 -rotate-2 transform mb-1 font-bold drop-shadow-[0_2px_10px_rgba(251,191,36,0.5)]">
              Idea In,
            </span>
            <h1 className="font-anton text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight bg-gradient-to-r from-amber-400 via-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(236,72,153,0.35)]">
              MEME OUT!
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200 font-semibold max-w-xl mb-6 sm:mb-8 leading-relaxed">
            Your idea.{' '}
            <span className="text-white font-extrabold underline decoration-pink-500 decoration-3">
              Legendary memes in seconds.
            </span>
          </p>

          {/* --- FROSTED GENERATOR CONSOLE CARD --- */}
          <div className="w-full rounded-3xl bg-white/95 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.5)] border-2 border-purple-200/90 p-4 sm:p-7 flex flex-col gap-4 text-left transition-all text-slate-900">
            {/* Input Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-pink-500" />
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

            {/* Large Textarea */}
            <div className="relative">
              <textarea
                value={activeIdea}
                onChange={(e) => setActiveIdea(e.target.value)}
                maxLength={200}
                rows={3}
                placeholder="e.g. When your manager says the meeting will only take 5 minutes..."
                className="w-full p-3.5 sm:p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-pink-500 focus:bg-white text-slate-900 text-sm sm:text-base font-medium outline-none transition resize-none placeholder:text-slate-400 shadow-inner"
              />

              {/* Interactive Quick Prompts */}
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
                      className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-purple-100 hover:text-purple-900 text-slate-600 text-xs font-semibold whitespace-nowrap transition border border-slate-200"
                    >
                      "{hint.slice(0, 32)}..."
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
                          ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/30 scale-105'
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

            {/* Main Action CTA Button */}
            <button
              onClick={handleGenerate}
              disabled={isGeneratingUniverse}
              className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 via-purple-600 to-blue-600 hover:brightness-110 text-white font-black text-sm sm:text-base uppercase tracking-wider transition-all duration-300 shadow-xl shadow-pink-500/30 active:scale-98 flex items-center justify-center gap-2.5 disabled:opacity-75"
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
        <div id="meme-universe-results" className="bg-[#faf8fc] text-slate-900 border-t border-slate-200">
          <ContentUniverseSection />
        </div>
      )}

      {/* 3. ✨ EXPLORE BY CATEGORY (Image Cards) */}
      <div className="bg-[#faf8fc] text-slate-900 border-t border-slate-200">
        <CategoryExplorer />
      </div>

      {/* 4. POPULAR TEMPLATES + AI MEME STUDIO SIDE-BY-SIDE */}
      <div className="bg-[#f4f2f8] text-slate-900 border-t border-slate-200">
        <PopularAndStudioRow />
      </div>

      {/* 5. TRENDING NOW (Clean Light Cards) */}
      <div className="bg-[#faf8fc] text-slate-900 border-t border-slate-200">
        <TrendsSection />
      </div>

      {/* 6. DESI / INDIA MEME STUDIO (Warm Indian Presets) */}
      <div className="bg-[#fffbeb] text-slate-900 border-t border-amber-200">
        <DesiModeSection />
      </div>

      {/* 7. COMMUNITY & INSPIRATION (Dark Premium Section) */}
      <div className="bg-slate-950 text-white border-t border-slate-800">
        <CommunitySection />
      </div>

      {/* 8. FOOTER */}
      <Footer />
    </div>
  );
};
