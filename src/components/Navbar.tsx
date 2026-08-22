import React from 'react';
import {
  Sparkles,
  Flame,
  LayoutTemplate,
  Wand2,
  TrendingUp,
  Globe,
  Film,
  Users,
  Search,
  Zap,
  Crown
} from 'lucide-react';
import { useMeme } from '../context/MemeContext';
import { AppView } from '../types';
import { soundService } from '../services/soundService';

interface NavItemConfig {
  id: string;
  view?: AppView;
  label: string;
  icon: React.ReactNode;
  isNew?: boolean;
  isPro?: boolean;
}

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    setIsTemplatesModalOpen,
    setIsSavedMemesModalOpen,
    setIsSettingsModalOpen
  } = useMeme();

  const navItems: NavItemConfig[] = [
    { id: 'home', view: 'home', label: 'Create', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'templates', label: 'Templates', icon: <LayoutTemplate className="w-3.5 h-3.5" /> },
    { id: 'studio', view: 'studio', label: 'AI Studio', icon: <Wand2 className="w-3.5 h-3.5" />, isNew: true },
    { id: 'video', view: 'video', label: 'Video Meme', icon: <Film className="w-3.5 h-3.5 text-rose-400" /> },
    { id: 'trends', view: 'trends', label: 'Trends 🔥', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: 'desi', view: 'desi', label: 'Desi Mode', icon: <span className="text-xs">🇮🇳</span> },
    { id: 'community', view: 'community', label: 'Community', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'saved', label: 'Pro', icon: <Crown className="w-3.5 h-3.5 text-amber-400" />, isPro: true }
  ];

  const handleNavClick = (item: NavItemConfig) => {
    soundService.playPop();
    if (item.id === 'templates') {
      setIsTemplatesModalOpen(true);
    } else if (item.id === 'saved') {
      setIsSavedMemesModalOpen(true);
    } else if (item.view) {
      setCurrentView(item.view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/90 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div
          onClick={() => {
            soundService.playPop();
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-orange to-brand-pink flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-anton text-xl tracking-wider text-white uppercase group-hover:text-brand-orange transition-colors leading-none">
                MEMEFORGE
              </span>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-brand-pink/20 text-brand-pink border border-brand-pink/30">
                2026
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold tracking-widest hidden sm:inline">
              IDEA IN. MEME OUT.
            </span>
          </div>
        </div>

        {/* Navigation Items (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = item.view === currentView;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.isNew && (
                  <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-pink-500 text-white leading-tight">
                    NEW
                  </span>
                )}
                {item.isPro && (
                  <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 leading-tight">
                    PRO
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Search & Action */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search */}
          <div
            onClick={() => setIsTemplatesModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs cursor-pointer hover:border-slate-700 transition"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search memes...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-mono">⌘K</kbd>
          </div>

          <button
            onClick={() => {
              soundService.playSparkle();
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-orange via-brand-pink to-brand-purple hover:brightness-110 text-white font-black text-xs uppercase tracking-wider transition shadow-lg shadow-brand-orange/20 active:scale-95 flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Create Meme</span>
          </button>
        </div>
      </div>
    </header>
  );
};
