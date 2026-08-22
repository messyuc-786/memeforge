import React from 'react';
import { Flame, Heart, Sparkles, Code2 } from 'lucide-react';
import { soundService } from '../services/soundService';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-gradient-to-b from-dark-900/90 via-dark-950 to-dark-950 py-10 px-4 text-center relative overflow-hidden z-20">
      {/* Funky Background Accent Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-20 bg-gradient-to-r from-brand-orange via-brand-pink to-brand-purple blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 relative z-10">
        {/* Playful Floating Emojis Marquee */}
        <div className="flex items-center justify-center gap-3 text-xl opacity-90 animate-bounce-subtle select-none">
          <span className="hover:scale-150 transition-transform cursor-pointer" onClick={() => soundService.playAirhorn()}>🔥</span>
          <span className="hover:scale-150 transition-transform cursor-pointer" onClick={() => soundService.playPop()}>🚀</span>
          <span className="hover:scale-150 transition-transform cursor-pointer" onClick={() => soundService.playVineBoom()}>💀</span>
          <span className="hover:scale-150 transition-transform cursor-pointer" onClick={() => soundService.playPop()}>🗿</span>
          <span className="hover:scale-150 transition-transform cursor-pointer" onClick={() => soundService.playSparkle()}>✨</span>
          <span className="hover:scale-150 transition-transform cursor-pointer" onClick={() => soundService.playPop()}>🐸</span>
          <span className="hover:scale-150 transition-transform cursor-pointer" onClick={() => soundService.playAirhorn()}>👑</span>
          <span className="hover:scale-150 transition-transform cursor-pointer" onClick={() => soundService.playPop()}>💅</span>
          <span className="hover:scale-150 transition-transform cursor-pointer" onClick={() => soundService.playVineBoom()}>🧢</span>
        </div>

        {/* Brand Tagline */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black font-anton tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-pink">
              MEMEFORGE
            </span>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-brand-pink/20 text-brand-pink border border-brand-pink/40 shadow-sm">
              v1.0 2026
            </span>
          </div>
          <p className="text-sm font-bold text-slate-300">
            © 2026 MemeForge by <strong>Bhasad.org</strong> — Meme &amp; Cartoon Studio. Turn ordinary moments into legendary memes.
          </p>
        </div>

        {/* Created By Urvashi Chandan Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-dark-800/80 border border-brand-purple/40 shadow-lg shadow-brand-purple/10">
          <Sparkles className="w-4 h-4 text-brand-yellow animate-pulse" />
          <span className="text-xs font-extrabold text-slate-200">
            Created by <strong className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-pink">Urvashi Chandan</strong>
          </span>
          <Sparkles className="w-4 h-4 text-brand-pink animate-pulse" />
        </div>

        {/* GitHub Repository Reference */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
          <span>GitHub Repository:</span>
          <a
            href="https://github.com/messyuc-786/memeforge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-brand-cyan hover:text-brand-yellow transition underline underline-offset-4"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>messyuc-786/memeforge</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
