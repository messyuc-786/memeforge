import React from 'react';
import {
  Flame,
  Sparkles,
  Smile,
  Palette,
  MessageSquare,
  Wand2,
  ArrowRight,
  Zap,
  ShieldCheck,
  Download,
  Layers,
  Sliders,
  Cpu,
  Share2
} from 'lucide-react';
import { ToolMode } from '../types';
import { MEME_TEMPLATES } from '../data/templatesData';
import { useMeme } from '../context/MemeContext';

interface LandingPageProps {
  onStart: (mode?: ToolMode) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const { loadTemplate } = useMeme();

  const handleLaunchDemo = (templateId: string) => {
    const template = MEME_TEMPLATES.find((t) => t.id === templateId) || MEME_TEMPLATES[0];
    loadTemplate(template);
    onStart('meme');
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-dark-950 text-slate-100 overflow-hidden">
      {/* Background Decorative Glow Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-brand-orange/20 via-brand-purple/15 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -left-40 w-[450px] h-[450px] bg-brand-cyan/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 -right-40 w-[500px] h-[500px] bg-brand-pink/15 blur-3xl pointer-events-none rounded-full" />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 pt-10 pb-16 text-center z-10 flex flex-col items-center">
        {/* Release / Year Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-800/90 border border-brand-orange/40 text-brand-yellow text-xs font-bold mb-6 shadow-lg shadow-brand-orange/10 animate-bounce-subtle">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
          </span>
          <span>MEMEFORGE STUDIO 2026</span>
          <span className="text-slate-400">•</span>
          <span className="text-brand-pink">FREE &amp; PRIVACY-FIRST</span>
        </div>

        {/* Massive Brand Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-anton tracking-tight uppercase leading-[0.95] mb-4">
          <span className="block text-white drop-shadow-md">TURN ORDINARY MOMENTS</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-pink">
            INTO LEGENDARY MEMES.
          </span>
        </h1>

        {/* Tagline & Subheading */}
        <p className="max-w-2xl text-base sm:text-xl text-slate-300 font-medium mb-8 leading-relaxed">
          The browser &amp; mobile studio for next-gen meme creation, AI roasts, 
          real-time cartoonification, speech bubbles, custom stickers, and deep-fried comedy.
        </p>

        {/* Primary Hero Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10 w-full max-w-xl">
          <button
            onClick={() => onStart('meme')}
            className="flex-1 min-w-[200px] px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-orange via-brand-pink to-brand-purple hover:brightness-110 text-white font-extrabold text-base shadow-xl shadow-brand-orange/25 active:scale-95 transition-all flex items-center justify-center gap-2.5 group"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Launch Studio Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => handleLaunchDemo('this-is-fine-fire')}
            className="px-6 py-4 rounded-2xl bg-dark-800/90 hover:bg-dark-700 text-slate-200 border border-dark-700 hover:border-brand-purple/50 font-bold text-base transition-all flex items-center gap-2 active:scale-95"
          >
            <span>🎲 Try Demo</span>
          </button>
        </div>

        {/* Quick Launch Action Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full max-w-4xl mb-14">
          <button
            onClick={() => onStart('meme')}
            className="p-4 rounded-2xl bg-dark-900/80 hover:bg-dark-850 border border-dark-700/80 hover:border-brand-yellow/50 transition-all text-left flex flex-col gap-2 group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-yellow/15 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              😂
            </div>
            <span className="font-extrabold text-sm text-slate-100">Make a Meme</span>
            <span className="text-[11px] text-slate-400">Classic Top/Bottom &amp; Freeform text</span>
          </button>

          <button
            onClick={() => onStart('cartoon')}
            className="p-4 rounded-2xl bg-dark-900/80 hover:bg-dark-850 border border-dark-700/80 hover:border-brand-pink/50 transition-all text-left flex flex-col gap-2 group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-pink/15 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              🎨
            </div>
            <span className="font-extrabold text-sm text-slate-100">Cartoonify</span>
            <span className="text-[11px] text-slate-400">6 Comic, Anime &amp; 3D styles</span>
          </button>

          <button
            onClick={() => onStart('bubble')}
            className="p-4 rounded-2xl bg-dark-900/80 hover:bg-dark-850 border border-dark-700/80 hover:border-brand-cyan/50 transition-all text-left flex flex-col gap-2 group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              🗯️
            </div>
            <span className="font-extrabold text-sm text-slate-100">Speech Bubbles</span>
            <span className="text-[11px] text-slate-400">Thought, scream, comic dialogs</span>
          </button>

          <button
            onClick={() => onStart('roast')}
            className="p-4 rounded-2xl bg-dark-900/80 hover:bg-dark-850 border border-dark-700/80 hover:border-brand-fire/50 transition-all text-left flex flex-col gap-2 group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-fire/15 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              🔥
            </div>
            <span className="font-extrabold text-sm text-slate-100">Roast My Photo</span>
            <span className="text-[11px] text-slate-400">Friendly, Savage &amp; Brutal burns</span>
          </button>

          <button
            onClick={() => onStart('ai')}
            className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-dark-900/80 hover:bg-dark-850 border border-dark-700/80 hover:border-brand-purple/50 transition-all text-left flex flex-col gap-2 group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-purple/15 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              ✨
            </div>
            <span className="font-extrabold text-sm text-slate-100">AI Captions</span>
            <span className="text-[11px] text-slate-400">Instant context-aware viral punchlines</span>
          </button>
        </div>

        {/* Interactive Example Meme Cards Showcase */}
        <div className="w-full max-w-6xl text-left">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold font-anton uppercase tracking-wide text-slate-100 flex items-center gap-2">
                <span>🔥</span> FEATURED MEME TEMPLATES
              </h2>
              <p className="text-xs text-slate-400">Click any card to immediately edit in the studio</p>
            </div>
            <button
              onClick={() => onStart('meme')}
              className="text-xs font-bold text-brand-orange hover:text-brand-yellow flex items-center gap-1 transition"
            >
              <span>View All Templates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MEME_TEMPLATES.slice(0, 4).map((template) => (
              <div
                key={template.id}
                onClick={() => handleLaunchDemo(template.id)}
                className="group relative rounded-2xl bg-dark-900 border border-dark-700/90 hover:border-brand-orange/60 p-3 flex flex-col gap-2.5 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-orange/10"
              >
                <div className="relative w-full aspect-square rounded-xl bg-dark-950 overflow-hidden border border-dark-800 flex items-center justify-center">
                  <img
                    src={template.previewUrl}
                    alt={template.title}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                    <span className="px-3 py-1.5 rounded-lg bg-brand-orange text-white text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-lg">
                      <Zap className="w-3.5 h-3.5" /> Edit Template
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-slate-100 truncate group-hover:text-brand-yellow transition-colors">
                      {template.title}
                    </span>
                    <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-dark-800 text-slate-400">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 italic">
                    "{template.defaultTopText || template.defaultBottomText}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="border-t border-dark-800 bg-dark-900/60 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black font-anton uppercase tracking-wide text-slate-100 mb-2">
              WHY CREATORS LOVE MEMEFORGE
            </h2>
            <p className="text-sm text-slate-400">
              Engineered with 2026 browser technology for maximum speed, privacy, and unlimited meme creativity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700/80 flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-yellow/15 flex items-center justify-center text-brand-yellow text-2xl">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-slate-100">100% Free &amp; Client-Side</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero server lag. All image processing, canvas operations, filters, and rendering run on your device's GPU for instant 60fps responsiveness.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700/80 flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-pink/15 flex items-center justify-center text-brand-pink text-2xl">
                🎨
              </div>
              <h3 className="text-lg font-bold text-slate-100">6 Cartoon &amp; Shader Pipelines</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transform any photo into a Comic Book with halftone dots, Pixar 3D glow, Pencil Sketch, Anime cel-shade, or Deep-Fried meme madness.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700/80 flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-purple/15 flex items-center justify-center text-brand-purple text-2xl">
                🧠
              </div>
              <h3 className="text-lg font-bold text-slate-100">Intelligent Humor Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generate 3 viral captions in seconds or unleash savage roasts across Friendly, Savage, and Brutal levels with 1-click meme stamping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="border-t border-dark-800 py-8 px-4 text-center text-xs text-slate-500">
        <p>© 2026 MemeForge — AI Meme &amp; Cartoon Studio. Turn ordinary moments into legendary memes.</p>
      </footer>
    </div>
  );
};
