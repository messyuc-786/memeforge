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
  Dna
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
    setIsTemplatesModalOpen,
    setSelectedDNAConcept
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
    <div className="w-full flex flex-col bg-[#fdfcff] text-slate-900 overflow-x-hidden">
      {/* 1. HERO SECTION (Light, Colorful, Playful 2026 Reference Target) */}
      <section className="relative w-full pt-8 sm:pt-12 pb-16 px-3 sm:px-6 overflow-hidden bg-gradient-to-b from-[#f3e8ff] via-[#ffffff] via-[#fce7f3] to-[#e0f2fe]">
        {/* Subtle Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-doodle-pattern opacity-60 pointer-events-none" />

        {/* Ambient Color Blobs */}
        <div className="absolute -top-10 left-1/4 -translate-x-1/2 w-[35rem] h-[35rem] bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute top-10 right-1/4 translate-x-1/2 w-[35rem] h-[35rem] bg-gradient-to-br from-cyan-300/20 to-blue-400/20 rounded-full blur-3xl pointer-events-none animate-float" />

        {/* --- LEFT FLOATING DECORATIONS: DOGE WITH SUNGLASSES & SAVAGE STICKER --- */}
        <div className="hidden xl:flex absolute left-4 2xl:left-12 top-16 flex-col items-center gap-2 pointer-events-none select-none animate-float z-10">
          <div className="relative w-36 h-36 rounded-3xl bg-white p-2 shadow-2xl border-4 border-amber-300 rotate-[-8deg] flex items-center justify-center">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <circle cx="60" cy="60" r="50" fill="#f59e0b" />
              <polygon points="25,35 35,8 55,25" fill="#d97706" />
              <polygon points="95,35 85,8 65,25" fill="#d97706" />
              <rect x="20" y="44" width="80" height="20" rx="4" fill="#0f172a" />
              <rect x="30" y="48" width="8" height="5" fill="#ffffff" />
              <rect x="78" y="48" width="8" height="5" fill="#ffffff" />
              <ellipse cx="60" cy="72" rx="14" ry="10" fill="#ffffff" />
              <ellipse cx="60" cy="69" rx="7" ry="5" fill="#0f172a" />
              <path d="M52 82 Q60 92 68 82" stroke="#0f172a" strokeWidth="3" fill="none" />
            </svg>
            <div className="absolute -bottom-4 -right-4 px-3 py-1 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-xs uppercase shadow-xl rotate-12 border-2 border-white">
              SAVAGE! 🔥
            </div>
          </div>
        </div>

        {/* --- RIGHT FLOATING DECORATIONS: POLAROID CAT + GREEK STATUE + FLOATING MEME DNA SCORE --- */}
        <div className="hidden xl:flex absolute right-4 2xl:right-12 top-12 flex-col items-end gap-3 pointer-events-none select-none z-10">
          <div className="flex items-start gap-3">
            {/* Polaroid Cat */}
            <div className="relative w-28 h-32 rounded-2xl bg-white p-2 pb-5 shadow-2xl border-2 border-purple-200 rotate-[8deg] flex flex-col items-center animate-float-reverse">
              <div className="w-full h-20 rounded-xl bg-gradient-to-br from-purple-900 to-indigo-950 overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-16 h-16">
                  <circle cx="50" cy="50" r="38" fill="#f97316" />
                  <polygon points="25,30 20,5 40,22" fill="#ea580c" />
                  <polygon points="75,30 80,5 60,22" fill="#ea580c" />
                  <circle cx="38" cy="48" r="12" fill="#0f172a" />
                  <circle cx="62" cy="48" r="12" fill="#0f172a" />
                  <line x1="48" y1="48" x2="52" y2="48" stroke="#0f172a" strokeWidth="3" />
                  <path d="M42 66 Q50 74 58 66" stroke="#0f172a" strokeWidth="3" fill="none" />
                </svg>
              </div>
              <span className="text-[9px] font-black text-slate-800 mt-1 uppercase tracking-wider">
                LEGENDARY! 👑
              </span>
            </div>

            {/* Greek Statue with Sunglasses & Bubblegum */}
            <div className="relative w-28 h-36 rounded-3xl bg-gradient-to-b from-purple-100 to-pink-100 p-2 shadow-2xl border-2 border-pink-300 rotate-[-6deg] flex items-center justify-center overflow-hidden animate-float">
              <svg viewBox="0 0 100 120" className="w-full h-full">
                {/* Statue head shape */}
                <path d="M30 30 Q50 10 70 30 Q80 60 70 90 Q50 110 30 90 Q20 60 30 30 Z" fill="#cbd5e1" />
                {/* Curly hair */}
                <circle cx="35" cy="25" r="12" fill="#94a3b8" />
                <circle cx="50" cy="18" r="14" fill="#94a3b8" />
                <circle cx="65" cy="25" r="12" fill="#94a3b8" />
                {/* Pixel Sunglasses */}
                <rect x="25" y="45" width="50" height="12" fill="#0f172a" rx="2" />
                <rect x="30" y="47" width="5" height="3" fill="#ffffff" />
                <rect x="60" y="47" width="5" height="3" fill="#ffffff" />
                {/* Nose */}
                <line x1="50" y1="55" x2="48" y2="72" stroke="#94a3b8" strokeWidth="3" />
                {/* Pink Bubblegum sphere */}
                <circle cx="50" cy="82" r="16" fill="#ec4899" />
                <circle cx="45" cy="77" r="4" fill="#fbcfe8" />
              </svg>
            </div>
          </div>

          {/* Floating Reference MEME DNA Card */}
          <div className="w-64 rounded-2xl bg-slate-950/95 text-white p-3.5 shadow-2xl border-2 border-purple-500/40 backdrop-blur-md animate-float-reverse">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Dna className="w-3.5 h-3.5 text-pink-400" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-100">MEME DNA</span>
              </div>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-purple-500 text-white">
                AI
              </span>
            </div>

            <div className="flex flex-col gap-1.5 text-[11px] font-bold text-slate-300">
              <div className="flex items-center justify-between">
                <span>😂 Humor</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="w-[92%] h-full bg-pink-500 rounded-full" />
                  </div>
                  <span className="text-[10px] text-slate-200">92%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>🎯 Relatability</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="w-[88%] h-full bg-purple-400 rounded-full" />
                  </div>
                  <span className="text-[10px] text-slate-200">88%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>😈 Sarcasm</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="w-[91%] h-full bg-rose-500 rounded-full" />
                  </div>
                  <span className="text-[10px] text-slate-200">91%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>🧠 Cleverness</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="w-[81%] h-full bg-cyan-400 rounded-full" />
                  </div>
                  <span className="text-[10px] text-slate-200">81%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>🇮🇳 Desi Factor</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="w-[72%] h-full bg-amber-400 rounded-full" />
                  </div>
                  <span className="text-[10px] text-slate-200">72%</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <span>📱 Reel Ready</span>
                <span className="text-[10px] font-black text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-500/40">
                  YES
                </span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-400">AI SCORE</span>
              <span className="text-sm font-black font-anton text-amber-400 flex items-center gap-1">
                🔥 87<span className="text-[10px] font-normal text-slate-400">/100</span>
              </span>
            </div>
          </div>
        </div>

        {/* --- SCATTERED DECORATIVE FLOATING EMOJIS AROUND HERO --- */}
        <div className="absolute left-[12%] top-12 text-2xl opacity-70 animate-float pointer-events-none select-none">😂</div>
        <div className="absolute right-[18%] top-10 text-2xl opacity-70 animate-float-reverse pointer-events-none select-none">🔥</div>
        <div className="absolute left-[6%] bottom-16 text-2xl opacity-70 animate-float-wide pointer-events-none select-none">💀</div>
        <div className="absolute right-[12%] bottom-14 text-2xl opacity-70 animate-float pointer-events-none select-none">✨</div>
        <div className="absolute left-[20%] top-6 text-xl opacity-60 animate-pulse-glow pointer-events-none select-none">👑</div>
        <div className="absolute right-[28%] top-8 text-xl opacity-60 animate-pulse-glow pointer-events-none select-none">💯</div>

        {/* --- MAIN HERO CONTENT CONTAINER --- */}
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-20">
          {/* Dominant Headline: Idea In, MEME OUT! */}
          <div className="flex flex-col items-center leading-none mb-2">
            <span className="font-caveat text-4xl sm:text-5xl md:text-6xl text-slate-900 font-bold -rotate-2 transform mb-1">
              Idea In,
            </span>
            <h1 className="font-anton text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight bg-gradient-to-r from-orange-500 via-rose-500 via-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
              MEME OUT!
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-700 font-bold max-w-xl mb-1 leading-relaxed">
            Your idea. AI magic.{' '}
            <span className="text-pink-600 font-extrabold">
              Legendary memes in seconds.
            </span>
          </p>

          {/* Bhasad.org Endorsement Statement */}
          <p className="text-xs sm:text-sm font-extrabold text-slate-600 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 font-black">
              Bhasad.org
            </span>{' '}
            brings you the <strong>best meme generator</strong>.
          </p>

          {/* --- CRISP WHITE GENERATOR CONSOLE CARD (Primary Focus) --- */}
          <div className="w-full rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-purple-100 p-5 sm:p-7 flex flex-col gap-4 text-left transition-all text-slate-900">
            {/* Input Header & Character Counter */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                Describe what happened...
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  {activeIdea.length}/200
                </span>
                {activeIdea && (
                  <button
                    onClick={() => setActiveIdea('')}
                    className="text-xs font-bold text-slate-600 hover:text-rose-500 transition"
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
                className="w-full p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-pink-500 focus:bg-white text-slate-900 text-sm sm:text-base font-medium outline-none transition resize-none placeholder:text-slate-400"
              />
            </div>

            {/* Tone / Vibe Selector Row */}
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
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md scale-105'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
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
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 via-purple-600 to-indigo-600 hover:brightness-110 text-white font-black text-sm sm:text-base uppercase tracking-wider transition-all duration-300 shadow-xl shadow-pink-500/25 active:scale-98 flex items-center justify-center gap-2 disabled:opacity-75"
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs font-bold text-slate-500">
              <span className="uppercase text-[10px] font-black tracking-wider text-slate-400">
                OR CREATE FROM
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1 shadow-sm"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
                  <span>Photo</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playPop();
                    setCurrentView('video');
                  }}
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1 shadow-sm"
                >
                  <Video className="w-3.5 h-3.5 text-rose-500" />
                  <span>Video</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playPop();
                    setIsTemplatesModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1 shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-500" />
                  <span>Screenshot</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playPop();
                    setActiveIdea('Voice note: When you wake up 2 minutes before the alarm goes off');
                  }}
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1 shadow-sm"
                >
                  <Mic className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Voice</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playPop();
                    setIsTemplatesModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1 shadow-sm"
                >
                  <Link className="w-3.5 h-3.5 text-cyan-500" />
                  <span>URL</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playSparkle();
                    setIsPutMeInMemeModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1 shadow-sm"
                >
                  <UserCheck className="w-3.5 h-3.5 text-amber-500" />
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

      {/* 2. ✨ EXPLORE THE MEME UNIVERSE (Category Cards matching Reference) */}
      <div className="bg-[#fbfafd] border-t border-slate-200">
        <CategoryExplorer />
      </div>

      {/* 3. 👑 YOUR MEME UNIVERSE (6 Real Generated Memes + AI Studio Mockup) */}
      <div id="meme-universe-results" className="bg-[#f6f4fa] border-t border-slate-200 py-8">
        <ContentUniverseSection />
      </div>

      {/* 4. 🔥 TRENDING NOW (Bottom Section matching Reference) */}
      <div className="bg-[#fbfafd] border-t border-slate-200 py-8">
        <TrendsSection />
      </div>

      {/* 5. 🇮🇳 DESI / INDIA MEME STUDIO */}
      <div className="bg-[#fffdf7] border-t border-amber-200 py-8">
        <DesiModeSection />
      </div>

      {/* 6. COMMUNITY / THE FORGE */}
      <div className="bg-slate-950 text-white border-t border-slate-800 py-8">
        <CommunitySection />
      </div>

      {/* 7. FOOTER */}
      <Footer />
    </div>
  );
};
