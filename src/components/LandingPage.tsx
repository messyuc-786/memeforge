import React, { useRef, useState } from 'react';
import {
  Sparkles,
  Flame,
  Video,
  FileText,
  Image as ImageIcon,
  UserCheck
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
import { LayoutTemplate, ImagePlus, Clapperboard, ChevronRight } from 'lucide-react';

// Ordered to lead with the approved mockup's chip set (Relatable, Savage, Wholesome,
// Corporate, Desi), then the remaining real tones the product already supports.
const TONES: { id: MemeTone; label: string; emoji: string }[] = [
  { id: 'relatable', label: 'Relatable', emoji: '😊' },
  { id: 'savage', label: 'Savage', emoji: '🔥' },
  { id: 'wholesome', label: 'Wholesome', emoji: '❤️' },
  { id: 'corporate', label: 'Corporate', emoji: '💼' },
  { id: 'desi', label: 'Desi', emoji: '🇮🇳' },
  { id: 'unhinged', label: 'Unhinged', emoji: '💀' },
  { id: 'clever', label: 'Clever', emoji: '🧠' },
  { id: 'absurd', label: 'Absurd', emoji: '🤪' }
];

export const LandingPage: React.FC = () => {
  const {
    activeIdea,
    setActiveIdea,
    generateUniverse,
    isGeneratingUniverse,
    generationError,
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

  const handleGenerate = async (ideaOverride?: string, toneOverride?: MemeTone) => {
    if (isGeneratingUniverse) return; // prevent duplicate/overlapping submissions
    const ideaToUse = ideaOverride ?? (activeIdea.trim() || sampleIdeas[0]);
    const toneToUse = toneOverride ?? selectedTone;
    setActiveIdea(ideaToUse);
    if (toneOverride) setSelectedTone(toneOverride);
    soundService.playVineBoom();
    const ok = await generateUniverse(ideaToUse, toneToUse);
    // Only auto-scroll to results on success — keep focus on the error/retry state otherwise
    if (ok) {
      setTimeout(() => {
        const el = document.getElementById('meme-universe-results');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  // Starter demo memes — unnamed MemeForge mascot art, click to instantly forge that idea
  const STARTER_MEMES: { id: string; name: string; img: string; caption: string; idea: string; tone: MemeTone }[] = [
    {
      id: 'overthinking',
      name: 'Me in a Monday meeting',
      img: '/characters/ash-hero.png',
      caption: 'ME AT 2AM: "WHAT IF I REPLIED WEIRD 3 YEARS AGO"',
      idea: 'Me lying awake overthinking a text I sent three years ago',
      tone: 'relatable'
    },
    {
      id: 'meeting',
      name: 'Study plan vs reality',
      img: '/characters/ash-hero.png',
      caption: '"LET\'S CIRCLE BACK" — ME, AVOIDING THE ACTUAL ANSWER',
      idea: 'My brain during the Monday morning meeting',
      tone: 'savage'
    },
    {
      id: 'food',
      name: 'Good food = good mood',
      img: '/characters/ashi-hero.png',
      caption: 'SEEING FOOD ARRIVE: NEW PERSONALITY UNLOCKED',
      idea: 'My entire personality changing the second food arrives',
      tone: 'wholesome'
    },
    {
      id: 'reacting',
      name: 'When coffee is a personality trait',
      img: '/characters/ashi-hero.png',
      caption: '"I\'M FINE." ALSO ME: *visibly not fine*',
      idea: 'When someone asks if I\'m okay and I clearly am not',
      tone: 'unhinged'
    }
  ];

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
      {/* 1. HERO / GENERATOR SECTION */}
      <section className="relative w-full pt-5 sm:pt-10 pb-8 sm:pb-10 px-3 sm:px-6 overflow-hidden">
        {/* Single restrained glow — sets mood without drowning the UI */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[46rem] h-[26rem] bg-gradient-to-b from-purple-600/18 via-pink-500/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

        {/* MemeForge mascots framing the generator — visual support, not the focus */}
        <div className="hidden xl:block absolute left-0 2xl:left-4 bottom-0 pointer-events-none select-none">
          <span className="absolute -top-2 left-2 font-caveat text-xl 2xl:text-2xl text-amber-300 font-bold -rotate-6 whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            Good ideas make great memes ✏️
          </span>
          <img
            src="/characters/ash-hero.png"
            alt=""
            aria-hidden="true"
            className="w-60 2xl:w-64 opacity-95 drop-shadow-[0_15px_30px_rgba(0,0,0,0.55)]"
          />
        </div>
        <div className="hidden xl:block absolute right-0 2xl:right-4 bottom-0 pointer-events-none select-none">
          <span className="absolute -top-2 right-2 font-caveat text-xl 2xl:text-2xl text-pink-300 font-bold rotate-6 whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            Same chaos, new memes 💜
          </span>
          <img
            src="/characters/ashi-hero.png"
            alt=""
            aria-hidden="true"
            className="w-60 2xl:w-64 opacity-95 drop-shadow-[0_15px_30px_rgba(0,0,0,0.55)]"
          />
        </div>

        {/* --- MAIN HERO CONTENT CONTAINER --- */}
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-20">
          {/* Brand Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 text-slate-300 text-[11px] font-bold uppercase tracking-wider mb-3 sm:mb-5 border border-white/10">
            <span className="text-amber-400">⚡</span>
            <span>AI underneath. You on the surface.</span>
          </div>

          {/* Dominant Editorial Headline */}
          <div className="flex flex-col items-center leading-none mb-2 sm:mb-3">
            <span className="font-caveat text-2xl sm:text-4xl md:text-5xl text-amber-300 font-bold -rotate-2 transform mb-0.5 sm:mb-1">
              Idea in,
            </span>
            <h1 className="font-anton text-4xl sm:text-7xl md:text-8xl uppercase tracking-tight text-white drop-shadow-[0_2px_0_rgba(236,72,153,0.9)]">
              MEME OUT.
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-400 font-semibold max-w-xl mb-4 sm:mb-7 leading-relaxed">
            Turn your thoughts, moments and chaos into share-worthy memes with AI.
          </p>

          {/* --- GENERATOR CONSOLE --- */}
          <div className="w-full rounded-3xl bg-[#0d0a20]/95 p-4 sm:p-6 flex flex-col gap-4 text-left border border-white/10 shadow-2xl">
            {/* Input Header & Character Counter */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>What happened?</span>
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
                placeholder="POV: salary just hit and rent is due tomorrow"
                className="w-full p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/10 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-white text-base font-medium outline-none transition resize-none placeholder:text-slate-400"
              />
            </div>

            {/* Quick idea chips — meme-native examples, tap to use */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1">
              {sampleIdeas.slice(0, 3).map((idea) => (
                <button
                  key={idea}
                  onClick={() => {
                    setActiveIdea(idea);
                    soundService.playPop();
                  }}
                  className="shrink-0 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 text-[11px] font-semibold whitespace-nowrap transition border border-white/10"
                >
                  {idea.length > 42 ? `${idea.slice(0, 42)}…` : idea}
                </button>
              ))}
            </div>

            {/* Tone / Vibe Selector Row */}
            <div>
              <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Pick your vibe
              </span>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
                {TONES.map((tone) => {
                  const isSelected = selectedTone === tone.id;
                  return (
                    <button
                      key={tone.id}
                      onClick={() => {
                        setSelectedTone(tone.id);
                        soundService.playPop();
                      }}
                      aria-pressed={isSelected}
                      className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-pink-500 text-white border-pink-400 shadow-[0_0_0_2px_rgba(236,72,153,0.25)]'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                      }`}
                    >
                      <span>{tone.emoji}</span>
                      <span>{tone.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Action CTA Button: FORGE */}
            <button
              onClick={() => handleGenerate()}
              disabled={isGeneratingUniverse}
              className="w-full py-4 rounded-2xl bg-brand-orange text-white font-black text-base uppercase tracking-wider transition-all duration-150 shadow-lg shadow-brand-orange/30 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] active:brightness-95 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:brightness-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGeneratingUniverse ? (
                <>
                  <div className="w-5 h-5 border-[3px] border-white border-t-transparent rounded-full animate-spin" />
                  <span>FORGING YOUR MEMES…</span>
                </>
              ) : (
                <>
                  <Flame className="w-5 h-5 text-yellow-200 fill-yellow-200" />
                  <span>FORGE MY MEMES</span>
                </>
              )}
            </button>

            {/* Generation error / retry — no silent failures */}
            {generationError && !isGeneratingUniverse && (
              <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                <span>{generationError}</span>
                <button
                  onClick={() => handleGenerate()}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-black uppercase text-[10px] tracking-wide transition"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Multimodal Creation Row (OR CREATE FROM) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-3 border-t border-white/10">
              <span className="uppercase text-[10px] font-black tracking-wider text-slate-400 shrink-0">
                Or start from
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1 sm:flex-wrap sm:overflow-visible">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="shrink-0 min-h-[36px] px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition flex items-center gap-1.5 border border-white/10"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs font-bold">Photo</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playPop();
                    setCurrentView('video');
                  }}
                  className="shrink-0 min-h-[36px] px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition flex items-center gap-1.5 border border-white/10"
                >
                  <Video className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-xs font-bold">Video</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playPop();
                    setIsTemplatesModalOpen(true);
                  }}
                  className="shrink-0 min-h-[36px] px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition flex items-center gap-1.5 border border-white/10"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs font-bold">Templates</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playSparkle();
                    setIsPutMeInMemeModalOpen(true);
                  }}
                  className="shrink-0 min-h-[36px] px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition flex items-center gap-1.5 border border-white/10"
                >
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold">Put Me In</span>
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

      {/* 2. STARTER MEME CAROUSEL — click any card to instantly forge that idea */}
      <section className="w-full px-3 sm:px-6 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center sm:text-left mb-3">
            <h2 className="text-base sm:text-lg font-black font-anton uppercase tracking-wide text-white">
              Need inspiration?
            </h2>
            <p className="text-xs text-slate-400 font-semibold">
              Try a few popular ideas, or explore what's trending.
            </p>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-3 px-3 sm:mx-0 sm:px-0">
            {STARTER_MEMES.map((meme) => (
              <button
                key={meme.id}
                onClick={() => {
                  soundService.playPop();
                  handleGenerate(meme.idea, meme.tone);
                }}
                className="group shrink-0 snap-start w-40 sm:w-44 rounded-2xl bg-[#0d0a20] border border-white/10 hover:border-pink-500/50 overflow-hidden text-left transition-all duration-150 active:scale-[0.97]"
              >
                <div className="relative h-40 sm:h-44 overflow-hidden bg-gradient-to-b from-[#1a1442] to-[#0d0a20]">
                  <img
                    src={meme.img}
                    alt={meme.name}
                    className="absolute inset-x-0 bottom-0 w-full h-[115%] object-cover object-top transition-transform duration-200 group-hover:scale-105"
                  />
                  <p className="absolute inset-x-0 bottom-0 p-2 text-white text-[11px] font-black uppercase leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
                    {meme.caption}
                  </p>
                </div>
                <div className="px-2.5 py-2 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">{meme.name}</span>
                  <span className="text-[10px] font-black uppercase text-pink-400 opacity-0 group-hover:opacity-100 transition">
                    Remix →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MORE WAYS TO CREATE — three real, working entry points. Kept intentionally small; this
             is the "clear visual transition" out of the hero, not another feature catalogue. */}
      <section className="border-t border-white/10 bg-black/20 py-10 px-3 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg sm:text-xl font-black font-anton uppercase tracking-wide text-white mb-5 text-center">
            More ways to create
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => {
                soundService.playPop();
                setIsTemplatesModalOpen(true);
              }}
              className="group flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/40 transition-all text-left"
            >
              <div className="shrink-0 w-11 h-11 rounded-xl bg-pink-500/15 text-pink-400 flex items-center justify-center">
                <LayoutTemplate className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-white">Start from a template</p>
                <p className="text-xs text-slate-400">Classic, trending, desi &amp; more</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-pink-400 group-hover:translate-x-0.5 transition shrink-0" />
            </button>

            <button
              onClick={() => {
                soundService.playPop();
                fileInputRef.current?.click();
              }}
              className="group flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 transition-all text-left"
            >
              <div className="shrink-0 w-11 h-11 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <ImagePlus className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-white">Turn an image into a meme</p>
                <p className="text-xs text-slate-400">Upload and get creative</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-0.5 transition shrink-0" />
            </button>

            <button
              onClick={() => {
                soundService.playPop();
                setCurrentView('video');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-500/40 transition-all text-left"
            >
              <div className="shrink-0 w-11 h-11 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center">
                <Clapperboard className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-white">Create a video meme</p>
                <p className="text-xs text-slate-400">Shorts, reels, big laughs</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-rose-400 group-hover:translate-x-0.5 transition shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Existing Home content continues naturally further down */}
      <div className="border-t border-purple-500/20 py-4">
        <CategoryExplorer />
      </div>

      {/* 👑 YOUR MEME UNIVERSE (6 Real Generated Memes + AI Studio Command Center) */}
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
