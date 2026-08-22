import React from 'react';
import {
  Flame,
  Sparkles,
  ArrowRight,
  Zap,
  Layers,
  Wand2,
  TrendingUp,
  Heart,
  Smile,
  MessageSquare,
  Palette,
  Volume2
} from 'lucide-react';
import { ToolMode } from '../types';
import { MEME_TEMPLATES } from '../data/templatesData';
import { useMeme } from '../context/MemeContext';
import { soundService } from '../services/soundService';
import { Footer } from './Footer';

interface LandingPageProps {
  onStart: (mode?: ToolMode) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const { loadTemplate } = useMeme();

  const handleLaunchDemo = (templateId: string) => {
    soundService.playVineBoom();
    const template = MEME_TEMPLATES.find((t) => t.id === templateId) || MEME_TEMPLATES[0];
    loadTemplate(template);
    onStart('meme');
  };

  const handleStartMode = (mode: ToolMode, soundType: 'airhorn' | 'vineboom' | 'sparkle' | 'pop' = 'pop') => {
    if (soundType === 'airhorn') soundService.playAirhorn();
    else if (soundType === 'vineboom') soundService.playVineBoom();
    else if (soundType === 'sparkle') soundService.playSparkle();
    else soundService.playPop();

    onStart(mode);
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950 text-slate-100 overflow-hidden flex flex-col justify-between">
      {/* 🌈 Funky Ambient Gradient Mesh Backdrop */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-brand-orange/30 via-brand-pink/30 to-brand-purple/20 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-[600px] h-[550px] bg-gradient-to-bl from-brand-cyan/25 via-brand-purple/30 to-brand-pink/20 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-40 left-10 w-[500px] h-[500px] bg-brand-yellow/20 blur-[120px] pointer-events-none rounded-full" />

      {/* Grid Overlay Texture for Tech/Funky Cyber Vibe */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 pt-8 pb-14 text-center z-10 flex flex-col items-center">
        {/* Floating Interactive Emoji Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 animate-bounce-subtle select-none">
          <span
            onClick={() => soundService.playAirhorn()}
            className="px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/50 text-brand-yellow text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-lg hover:scale-110 active:scale-95 transition cursor-pointer"
          >
            🔥 CERTIFIED DANK
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
            ✨ GEN-Z APPROVED
          </span>
          <span
            onClick={() => soundService.playPop()}
            className="px-3 py-1 rounded-full bg-brand-yellow/20 border border-brand-yellow/50 text-brand-yellow text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-lg hover:scale-110 active:scale-95 transition cursor-pointer"
          >
            🧢 NO CAP
          </span>
        </div>

        {/* Massive Funky Brand Title */}
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-black font-anton tracking-tight uppercase leading-[0.92] mb-3 select-none">
          <span className="block text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            TURN ORDINARY
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-brand-orange via-brand-pink to-brand-cyan animate-pulse-slow drop-shadow-2xl">
            LEGENDARY MEMES.
          </span>
        </h1>

        {/* Tagline */}
        <p className="max-w-2xl text-base sm:text-2xl text-slate-200 font-extrabold mb-8 leading-snug drop-shadow">
          The all-in-one meme studio, savage photo roaster, 3D cartoonifier, comic bubbles &amp; viral caption generator!
        </p>

        {/* Funky Primary CTA Launchers */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10 w-full max-w-2xl">
          <button
            onClick={() => handleStartMode('meme', 'airhorn')}
            className="flex-1 min-w-[220px] px-8 py-4 rounded-3xl bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-pink text-slate-950 font-black text-lg uppercase tracking-wider shadow-2xl shadow-brand-orange/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group border-2 border-white/40"
          >
            <span className="text-2xl group-hover:rotate-12 transition-transform">🚀</span>
            <span>Launch Studio Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[3]" />
          </button>
          
          <button
            onClick={() => handleLaunchDemo('this-is-fine-fire')}
            className="px-7 py-4 rounded-3xl bg-dark-800/90 hover:bg-dark-700 text-slate-100 border-2 border-brand-purple/50 font-black text-lg uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>🎲</span>
            <span>Try Demo</span>
          </button>
        </div>

        {/* 🌟 Funky Emoji-Shaped Action Buttons (Gen-Z Viral Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 w-full max-w-5xl mb-14">
          {/* Make a Meme Button */}
          <button
            onClick={() => handleStartMode('meme', 'pop')}
            className="p-4 rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-brand-yellow/50 hover:border-brand-yellow hover:bg-brand-yellow/10 transition-all text-left flex flex-col gap-2 group shadow-xl hover:-translate-y-2 active:scale-95"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-yellow/20 border border-brand-yellow/40 flex items-center justify-center text-3xl group-hover:scale-125 transition-transform shadow-md">
              😂
            </div>
            <div>
              <span className="font-black text-base text-slate-100 block group-hover:text-brand-yellow transition-colors">
                Make a Meme
              </span>
              <span className="text-xs text-slate-400 font-semibold">Top &amp; Bottom text + fonts</span>
            </div>
          </button>

          {/* Cartoonify Button */}
          <button
            onClick={() => handleStartMode('cartoon', 'sparkle')}
            className="p-4 rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-brand-pink/50 hover:border-brand-pink hover:bg-brand-pink/10 transition-all text-left flex flex-col gap-2 group shadow-xl hover:-translate-y-2 active:scale-95"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-pink/20 border border-brand-pink/40 flex items-center justify-center text-3xl group-hover:scale-125 transition-transform shadow-md">
              🎨
            </div>
            <div>
              <span className="font-black text-base text-slate-100 block group-hover:text-brand-pink transition-colors">
                Cartoonify
              </span>
              <span className="text-xs text-slate-400 font-semibold">Comic, Anime &amp; 3D glow</span>
            </div>
          </button>

          {/* Speech Bubbles Button */}
          <button
            onClick={() => handleStartMode('bubble', 'pop')}
            className="p-4 rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-brand-cyan/50 hover:border-brand-cyan hover:bg-brand-cyan/10 transition-all text-left flex flex-col gap-2 group shadow-xl hover:-translate-y-2 active:scale-95"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-3xl group-hover:scale-125 transition-transform shadow-md">
              🗯️
            </div>
            <div>
              <span className="font-black text-base text-slate-100 block group-hover:text-brand-cyan transition-colors">
                Speech Bubble
              </span>
              <span className="text-xs text-slate-400 font-semibold">Comic &amp; thought dialogs</span>
            </div>
          </button>

          {/* Roast My Photo Button */}
          <button
            onClick={() => handleStartMode('roast', 'vineboom')}
            className="p-4 rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-brand-fire/50 hover:border-brand-fire hover:bg-brand-fire/10 transition-all text-left flex flex-col gap-2 group shadow-xl hover:-translate-y-2 active:scale-95"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-fire/20 border border-brand-fire/40 flex items-center justify-center text-3xl group-hover:scale-125 transition-transform shadow-md animate-pulse">
              🔥
            </div>
            <div>
              <span className="font-black text-base text-slate-100 block group-hover:text-brand-fire transition-colors">
                Roast Photo
              </span>
              <span className="text-xs text-slate-400 font-semibold">Savage AI burns &amp; stamps</span>
            </div>
          </button>

          {/* AI Captions Button */}
          <button
            onClick={() => handleStartMode('ai', 'sparkle')}
            className="col-span-2 sm:col-span-1 p-4 rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-brand-purple/50 hover:border-brand-purple hover:bg-brand-purple/10 transition-all text-left flex flex-col gap-2 group shadow-xl hover:-translate-y-2 active:scale-95"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-3xl group-hover:scale-125 transition-transform shadow-md">
              ✨
            </div>
            <div>
              <span className="font-black text-base text-slate-100 block group-hover:text-brand-purple transition-colors">
                AI Captions
              </span>
              <span className="text-xs text-slate-400 font-semibold">Generate 3 viral punchlines</span>
            </div>
          </button>
        </div>

        {/* 🎭 Interactive Example Meme Cards Gallery */}
        <div className="w-full max-w-6xl text-left">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <div>
                <h2 className="text-2xl font-black font-anton uppercase tracking-wide text-slate-100">
                  ICONIC MEME TEMPLATES
                </h2>
                <p className="text-xs text-slate-300 font-semibold">Click any card to instantly customize in MemeForge!</p>
              </div>
            </div>
            <button
              onClick={() => handleStartMode('meme', 'pop')}
              className="text-xs font-black uppercase tracking-wider text-brand-yellow hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-800 border border-dark-700 hover:border-brand-yellow transition"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MEME_TEMPLATES.slice(0, 4).map((template) => (
              <div
                key={template.id}
                onClick={() => handleLaunchDemo(template.id)}
                className="group relative rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-dark-700/90 hover:border-brand-orange p-3.5 flex flex-col gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-orange/20"
              >
                <div className="relative w-full aspect-square rounded-2xl bg-dark-950 overflow-hidden border border-dark-800 flex items-center justify-center p-2">
                  <img
                    src={template.previewUrl}
                    alt={template.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-dark-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3">
                    <span className="px-4 py-2 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-pink text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xl scale-95 group-hover:scale-100 transition-transform">
                      <Zap className="w-4 h-4 fill-white" /> Forge Meme
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-sm font-black text-slate-100 truncate group-hover:text-brand-yellow transition-colors">
                      {template.title}
                    </span>
                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-dark-800 text-brand-pink border border-brand-pink/30">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-1 italic font-semibold">
                    "{template.defaultTopText || template.defaultBottomText}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 Feature Highlights Banner */}
      <section className="border-t border-white/10 bg-dark-900/80 backdrop-blur-md py-12 px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-3xl bg-dark-850/90 border border-brand-yellow/30 flex flex-col gap-2.5 shadow-lg">
            <div className="text-3xl">⚡</div>
            <h3 className="text-lg font-black text-slate-100">Zero Cost &amp; Zero Lag</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Runs 100% inside your browser GPU with zero server queues. Privacy-first, instant HD export, works completely offline!
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-dark-850/90 border border-brand-pink/30 flex flex-col gap-2.5 shadow-lg">
            <div className="text-3xl">🎨</div>
            <h3 className="text-lg font-black text-slate-100">6 Real-Time GPU Shaders</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Transform any portrait or photo into Cute Cartoon, Comic Book with Halftone ink, Pixar 3D glow, Pencil Sketch, or Deep-Fried meme madness.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-dark-850/90 border border-brand-purple/30 flex flex-col gap-2.5 shadow-lg">
            <div className="text-3xl">🧠</div>
            <h3 className="text-lg font-black text-slate-100">Intelligent Humor &amp; Roaster</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Generate 3 viral captions in seconds, create custom speech bubbles, or unleash Friendly, Savage, and Brutal photo burns!
            </p>
          </div>
        </div>
      </section>

      {/* Prominent Footer */}
      <Footer />
    </div>
  );
};
