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
  CheckCircle2,
  Lightbulb,
  Image as ImageIcon,
  Mic,
  Link,
  UserCheck,
  Dna,
  Globe,
  Radio
} from 'lucide-react';
import { useMeme } from '../context/MemeContext';
import { MemeTone } from '../types';
import { soundService } from '../services/soundService';
import { ContentUniverseSection } from './features/ContentUniverseSection';
import { CategoryExplorer } from './features/CategoryExplorer';
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
    setTimeout(() => {
      const el = document.getElementById('meme-universe-results');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
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
    <div className="w-full flex flex-col cosmic-nebula-bg text-slate-100 overflow-x-hidden min-h-screen">
      {/* 1. GALAXY MEME UNIVERSE HERO SECTION */}
      <section className="relative w-full pt-10 sm:pt-14 pb-20 px-3 sm:px-6 overflow-hidden">
        {/* Dynamic Cosmic Nebula & Aurora Glow Waves */}
        <div className="absolute -top-24 left-1/4 -translate-x-1/2 w-[42rem] h-[42rem] bg-gradient-to-tr from-purple-600/25 via-pink-500/20 to-cyan-400/15 rounded-full blur-[100px] pointer-events-none animate-aurora" />
        <div className="absolute top-1/3 right-10 w-[38rem] h-[38rem] bg-gradient-to-br from-indigo-600/25 via-fuchsia-500/20 to-rose-500/15 rounded-full blur-[110px] pointer-events-none animate-nebula" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] bg-gradient-to-t from-purple-900/30 via-pink-600/15 to-transparent rounded-full blur-[90px] pointer-events-none" />

        {/* Distant Saturn/Moon Ring Graphic */}
        <div className="absolute top-8 left-8 opacity-40 pointer-events-none select-none hidden lg:block animate-float">
          <svg width="70" height="70" viewBox="0 0 100 100" className="drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
            <circle cx="50" cy="50" r="22" fill="#8b5cf6" />
            <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke="#f472b6" strokeWidth="3" transform="rotate(-25 50 50)" />
          </svg>
        </div>

        {/* --- LEFT FLOATING DECORATIONS: COSMIC SUNGLASSES DOGE + SAVAGE STICKER --- */}
        <div className="hidden xl:flex absolute left-4 2xl:left-14 top-20 flex-col items-center gap-3 pointer-events-none select-none animate-float z-10">
          <div className="relative w-36 h-36 rounded-3xl bg-[#140e2e]/90 p-2.5 shadow-[0_0_40px_rgba(245,158,11,0.3)] border-2 border-amber-400/80 rotate-[-8deg] flex items-center justify-center backdrop-blur-xl">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <circle cx="60" cy="60" r="50" fill="#f59e0b" />
              <polygon points="25,35 35,8 55,25" fill="#d97706" />
              <polygon points="95,35 85,8 65,25" fill="#d97706" />
              <rect x="20" y="44" width="80" height="20" rx="4" fill="#0f172a" />
              <rect x="30" y="48" width="8" height="5" fill="#38bdf8" />
              <rect x="78" y="48" width="8" height="5" fill="#38bdf8" />
              <ellipse cx="60" cy="72" rx="14" ry="10" fill="#ffffff" />
              <ellipse cx="60" cy="69" rx="7" ry="5" fill="#0f172a" />
              <path d="M52 82 Q60 92 68 82" stroke="#0f172a" strokeWidth="3" fill="none" />
            </svg>
            <div className="absolute -bottom-4 -right-4 px-3 py-1 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-xs uppercase shadow-xl rotate-12 border-2 border-white neon-glow-pink">
              SAVAGE! 🔥
            </div>
          </div>
        </div>

        {/* --- RIGHT FLOATING DECORATIONS: POLAROID CAT + GREEK STATUE + MEME DNA SCANNER --- */}
        <div className="hidden xl:flex absolute right-4 2xl:right-14 top-14 flex-col items-end gap-3.5 pointer-events-none select-none z-10">
          <div className="flex items-start gap-3">
            {/* Cosmic Polaroid Cat */}
            <div className="relative w-28 h-32 rounded-2xl bg-[#171233]/90 p-2 pb-4 shadow-[0_0_35px_rgba(168,85,247,0.35)] border-2 border-purple-400/80 rotate-[8deg] flex flex-col items-center animate-float-reverse backdrop-blur-xl">
              <div className="w-full h-20 rounded-xl bg-gradient-to-br from-purple-950 to-indigo-950 overflow-hidden flex items-center justify-center border border-purple-500/30">
                <svg viewBox="0 0 100 100" className="w-16 h-16">
                  <circle cx="50" cy="50" r="38" fill="#f97316" />
                  <polygon points="25,30 20,5 40,22" fill="#ea580c" />
                  <polygon points="75,30 80,5 60,22" fill="#ea580c" />
                  <circle cx="38" cy="48" r="12" fill="#05040e" />
                  <circle cx="62" cy="48" r="12" fill="#05040e" />
                  <line x1="48" y1="48" x2="52" y2="48" stroke="#05040e" strokeWidth="3" />
                  <path d="M42 66 Q50 74 58 66" stroke="#05040e" strokeWidth="3" fill="none" />
                </svg>
              </div>
              <span className="text-[9px] font-black text-pink-300 mt-1 uppercase tracking-wider">
                LEGENDARY! 👑
              </span>
            </div>

            {/* Greek Statue with Sunglasses & Neon Pink Bubblegum */}
            <div className="relative w-28 h-36 rounded-3xl bg-gradient-to-b from-[#211648] to-[#120d2c] p-2 shadow-[0_0_35px_rgba(236,72,153,0.35)] border-2 border-pink-400/80 rotate-[-6deg] flex items-center justify-center overflow-hidden animate-float backdrop-blur-xl">
              <svg viewBox="0 0 100 120" className="w-full h-full">
                <path d="M30 30 Q50 10 70 30 Q80 60 70 90 Q50 110 30 90 Q20 60 30 30 Z" fill="#cbd5e1" />
                <circle cx="35" cy="25" r="12" fill="#94a3b8" />
                <circle cx="50" cy="18" r="14" fill="#94a3b8" />
                <circle cx="65" cy="25" r="12" fill="#94a3b8" />
                <rect x="25" y="45" width="50" height="12" fill="#05040e" rx="2" />
                <rect x="30" y="47" width="5" height="3" fill="#38bdf8" />
                <rect x="60" y="47" width="5" height="3" fill="#38bdf8" />
                <line x1="50" y1="55" x2="48" y2="72" stroke="#94a3b8" strokeWidth="3" />
                <circle cx="50" cy="82" r="16" fill="#ec4899" className="drop-shadow-[0_0_10px_#ec4899]" />
                <circle cx="45" cy="77" r="4" fill="#fbcfe8" />
              </svg>
            </div>
          </div>

          {/* Futuristic Cosmic MEME DNA Scanner Panel */}
          <div className="w-64 rounded-2xl cosmic-glass text-white p-3.5 shadow-2xl border-2 border-purple-500/50 backdrop-blur-2xl animate-float-reverse">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Dna className="w-3.5 h-3.5 text-pink-400" />
                <span className="text-xs font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
                  MEME DNA SCANNER
                </span>
              </div>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-purple-500/80 text-white border border-purple-400/50">
                AI SCAN
              </span>
            </div>

            <div className="flex flex-col gap-1.5 text-[11px] font-bold text-slate-300">
              <div className="flex items-center justify-between">
                <span>😂 Humor</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-20 h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-700">
                    <div className="w-[92%] h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" />
                  </div>
                  <span className="text-[10px] text-pink-400 font-mono">92%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>🎯 Relatability</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-20 h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-700">
                    <div className="w-[88%] h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full" />
                  </div>
                  <span className="text-[10px] text-purple-300 font-mono">88%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>😈 Sarcasm</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-20 h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-700">
                    <div className="w-[91%] h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full" />
                  </div>
                  <span className="text-[10px] text-rose-400 font-mono">91%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>🧠 Cleverness</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-20 h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-700">
                    <div className="w-[81%] h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                  </div>
                  <span className="text-[10px] text-cyan-300 font-mono">81%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>🇮🇳 Desi Factor</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-20 h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-700">
                    <div className="w-[72%] h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
                  </div>
                  <span className="text-[10px] text-amber-400 font-mono">72%</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <span>📱 Reel Ready</span>
                <span className="text-[10px] font-black text-emerald-300 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-500/50">
                  YES 🚀
                </span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-purple-500/30 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-400">AI SCORE</span>
              <span className="text-sm font-black font-anton text-amber-400 flex items-center gap-1">
                🔥 87<span className="text-[10px] font-normal text-slate-400">/100</span>
              </span>
            </div>
          </div>
        </div>

        {/* --- SCATTERED FLOATING EMOJIS IN THE COSMIC UNIVERSE --- */}
        <div className="absolute left-[10%] top-12 text-2xl opacity-75 animate-float pointer-events-none select-none">😂</div>
        <div className="absolute right-[16%] top-10 text-2xl opacity-75 animate-float-reverse pointer-events-none select-none">🔥</div>
        <div className="absolute left-[6%] bottom-16 text-2xl opacity-70 animate-float-wide pointer-events-none select-none">💀</div>
        <div className="absolute right-[10%] bottom-14 text-2xl opacity-75 animate-float pointer-events-none select-none">✨</div>
        <div className="absolute left-[18%] top-6 text-xl opacity-65 animate-pulse-glow pointer-events-none select-none">👑</div>
        <div className="absolute right-[25%] top-8 text-xl opacity-65 animate-pulse-glow pointer-events-none select-none">🚀</div>
        <div className="absolute left-[28%] bottom-10 text-xl opacity-60 animate-twinkle pointer-events-none select-none">⭐</div>

        {/* --- MAIN HERO CONTENT CONTAINER --- */}
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-20">
          {/* Brand Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass text-slate-200 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-500/40 shadow-lg animate-pulse-glow">
            <span className="text-amber-400">⚡</span>
            <span>Bhasad.org brings you the best Meme generator ever</span>
            <span className="text-pink-400">🔥</span>
          </div>

          {/* Dominant 3D Neon Headline */}
          <div className="flex flex-col items-center leading-none mb-3">
            <span className="font-caveat text-4xl sm:text-5xl md:text-6xl text-amber-300 font-bold -rotate-2 transform mb-1 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">
              Idea In,
            </span>
            <h1 className="font-anton text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight bg-gradient-to-r from-amber-400 via-rose-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(236,72,153,0.45)]">
              MEME OUT!
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-semibold max-w-xl mb-6 leading-relaxed">
            Your idea. AI magic.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-300 font-extrabold">
              Legendary memes in seconds.
            </span>
          </p>

          {/* --- FLOATING COSMIC GLASS GENERATOR CONSOLE --- */}
          <div className="w-full rounded-3xl cosmic-glass p-5 sm:p-7 flex flex-col gap-4 text-left transition-all border-2 border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
            {/* Input Header & Character Counter */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Describe what happened...</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 font-mono">
                  {activeIdea.length}/200
                </span>
                {activeIdea && (
                  <button
                    onClick={() => setActiveIdea('')}
                    className="text-xs font-bold text-slate-400 hover:text-rose-400 transition"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Textarea Input */}
            <div className="relative">
              <textarea
                value={activeIdea}
                onChange={(e) => setActiveIdea(e.target.value)}
                maxLength={200}
                rows={2}
                placeholder="Example: When your manager says the meeting will only take 5 minutes"
                className="w-full p-3.5 sm:p-4 rounded-2xl bg-[#09071c]/90 border border-purple-500/40 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-white text-sm sm:text-base font-medium outline-none transition resize-none placeholder:text-slate-500 shadow-inner"
              />
            </div>

            {/* Futuristic Mood / Vibe Selector Row */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              {TONES.map((tone) => {
                const isSelected = selectedTone === tone.id;
                return (
                  <button
                    key={tone.id}
                    onClick={() => {
                      setSelectedTone(tone.id);
                      soundService.playPop();
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.6)] scale-105 border border-pink-300'
                        : 'bg-[#120e2e]/80 hover:bg-[#1a1442] text-slate-300 border border-purple-500/30'
                    }`}
                  >
                    <span>{tone.emoji}</span>
                    <span>{tone.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Action CTA Button: FORGE MY MEMES */}
            <button
              onClick={handleGenerate}
              disabled={isGeneratingUniverse}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 via-purple-600 to-cyan-500 hover:brightness-110 text-white font-black text-sm sm:text-base uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(236,72,153,0.4)] active:scale-98 flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isGeneratingUniverse ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>FORGE IS COOKING 10 MEMES...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                  <span>✨ FORGE MY MEMES →</span>
                </>
              )}
            </button>

            {/* Multimodal Creation Row (OR CREATE FROM) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-purple-500/20 text-xs font-bold text-slate-400">
              <span className="uppercase text-[10px] font-black tracking-wider text-slate-400">
                OR CREATE FROM
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-full bg-[#151035]/80 hover:bg-purple-900/60 text-slate-200 transition flex items-center gap-1 border border-purple-500/30 shadow-sm"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>Photo</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playPop();
                    setCurrentView('video');
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#151035]/80 hover:bg-purple-900/60 text-slate-200 transition flex items-center gap-1 border border-purple-500/30 shadow-sm"
                >
                  <Video className="w-3.5 h-3.5 text-rose-400" />
                  <span>Video</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playPop();
                    setIsTemplatesModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#151035]/80 hover:bg-purple-900/60 text-slate-200 transition flex items-center gap-1 border border-purple-500/30 shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <span>Screenshot</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playPop();
                    setActiveIdea('Voice note: When you wake up 2 minutes before the alarm goes off');
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#151035]/80 hover:bg-purple-900/60 text-slate-200 transition flex items-center gap-1 border border-purple-500/30 shadow-sm"
                >
                  <Mic className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Voice</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playPop();
                    setIsTemplatesModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#151035]/80 hover:bg-purple-900/60 text-slate-200 transition flex items-center gap-1 border border-purple-500/30 shadow-sm"
                >
                  <Link className="w-3.5 h-3.5 text-cyan-400" />
                  <span>URL</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playSparkle();
                    setIsPutMeInMemeModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#151035]/80 hover:bg-purple-900/60 text-slate-200 transition flex items-center gap-1 border border-purple-500/30 shadow-sm"
                >
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Put Me In</span>
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

      {/* 2. ✨ EXPLORE THE MEME UNIVERSE (Cosmic Category Cards) */}
      <div className="border-t border-purple-500/20 py-4">
        <CategoryExplorer />
      </div>

      {/* 3. 👑 YOUR MEME UNIVERSE (6 Real Generated Memes + AI Studio Command Center) */}
      <div id="meme-universe-results" className="border-t border-purple-500/20 py-8">
        <ContentUniverseSection />
      </div>

      {/* 4. 🔥 TRENDING NOW (Cosmic Signals Section) */}
      <div className="border-t border-purple-500/20 py-8">
        <TrendsSection />
      </div>

      {/* 5. 🇮🇳 DESI / INDIA MEME STUDIO */}
      <div className="border-t border-amber-500/20 py-8">
        <DesiModeSection />
      </div>

      {/* 6. 👥 THE FORGE COMMUNITY */}
      <div className="border-t border-purple-500/20 py-8">
        <CommunitySection />
      </div>

      {/* 7. FOOTER */}
      <Footer />
    </div>
  );
};
