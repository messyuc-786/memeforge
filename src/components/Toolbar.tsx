import React, { useState } from 'react';
import {
  Smile,
  Palette,
  MessageSquare,
  Flame,
  Wand2,
  Sparkles,
  Sliders,
  Edit3,
  LayoutTemplate,
  Heart,
  ChevronDown
} from 'lucide-react';
import { useMeme } from '../context/MemeContext';
import { ToolMode } from '../types';
import { MemeTextPanel } from './panels/MemeTextPanel';
import { SpeechBubblePanel } from './panels/SpeechBubblePanel';
import { StickersPanel } from './panels/StickersPanel';
import { CartoonifyPanel } from './panels/CartoonifyPanel';
import { RoastPanel } from './panels/RoastPanel';
import { AICaptionsPanel } from './panels/AICaptionsPanel';
import { FiltersPanel } from './panels/FiltersPanel';
import { DrawPanel } from './panels/DrawPanel';
import { LayersPanel } from './panels/LayersPanel';

const TOOL_TABS: { mode: ToolMode; label: string; icon: string; highlight?: boolean }[] = [
  { mode: 'meme', label: 'Meme Text', icon: '😂' },
  { mode: 'cartoon', label: 'Cartoonify', icon: '🎨' },
  { mode: 'bubble', label: 'Bubbles', icon: '🗯️' },
  { mode: 'roast', label: 'Roast Photo', icon: '🔥', highlight: true },
  { mode: 'ai', label: 'AI Captions', icon: '✨', highlight: true },
  { mode: 'stickers', label: 'Stickers', icon: '😎' },
  { mode: 'filters', label: 'Filters', icon: '🪄' },
  { mode: 'draw', label: 'Draw', icon: '✏️' },
  { mode: 'layers', label: 'Layers', icon: '🗂️' }
];

export const Toolbar: React.FC = () => {
  const { toolMode, setToolMode, setIsTemplatesModalOpen } = useMeme();
  // Mobile: tool panel behaves like a bottom sheet — collapsed by default, opens when a tool is tapped
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const renderActivePanel = () => {
    switch (toolMode) {
      case 'meme':
        return <MemeTextPanel />;
      case 'cartoon':
        return <CartoonifyPanel />;
      case 'bubble':
        return <SpeechBubblePanel />;
      case 'roast':
        return <RoastPanel />;
      case 'ai':
        return <AICaptionsPanel />;
      case 'stickers':
        return <StickersPanel />;
      case 'filters':
        return <FiltersPanel />;
      case 'draw':
        return <DrawPanel />;
      case 'layers':
        return <LayersPanel />;
      default:
        return <MemeTextPanel />;
    }
  };

  return (
    <aside className="w-full lg:w-96 bg-dark-900/90 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-dark-700/80 flex flex-col h-auto lg:h-[calc(100vh-65px)] overflow-hidden shadow-2xl z-20 justify-between">
      {/* Studio Modes Tab Bar — on mobile this is the always-visible strip; tapping a tool opens the sheet below */}
      <div className="flex items-center gap-1.5 p-2.5 overflow-x-auto no-scrollbar border-b border-dark-800 bg-dark-950/60">
        {TOOL_TABS.map((tab) => {
          const isActive = toolMode === tab.mode;
          return (
            <button
              key={tab.mode}
              onClick={() => {
                setToolMode(tab.mode);
                setIsSheetOpen(true);
              }}
              className={`min-h-[40px] px-3 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-brand-orange via-brand-pink to-brand-purple text-white shadow-lg shadow-brand-orange/20 scale-[1.03] border border-white/20'
                  : 'bg-dark-800/80 hover:bg-dark-700 text-slate-300'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}

        <button
          onClick={() => setIsTemplatesModalOpen(true)}
          className="min-h-[40px] px-3 py-2 rounded-2xl text-xs font-black whitespace-nowrap bg-dark-800/80 hover:bg-dark-700 text-brand-yellow hover:text-white transition flex items-center gap-1.5 shrink-0 border border-brand-yellow/30"
        >
          <span className="text-base">📚</span>
          <span>Templates</span>
        </button>
      </div>

      {/* Desktop: static side panel */}
      <div className="hidden lg:block flex-1 overflow-y-auto">
        {renderActivePanel()}
      </div>

      {/* Mobile: bottom-sheet tool panel — collapsed to a peek handle, opens over the canvas when a tool is tapped */}
      <div className="lg:hidden">
        {isSheetOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-fadeIn"
            onClick={() => setIsSheetOpen(false)}
          />
        )}
        <div
          className={`fixed inset-x-0 bottom-16 z-40 bg-dark-900 border-t border-dark-700 rounded-t-3xl shadow-2xl transition-transform duration-200 ${
            isSheetOpen ? 'translate-y-0' : 'translate-y-[calc(100%-0px)] pointer-events-none opacity-0'
          }`}
          style={{ maxHeight: '55vh' }}
        >
          <button
            onClick={() => setIsSheetOpen(false)}
            className="w-full flex flex-col items-center pt-2.5 pb-2 gap-1 touch-manipulation"
          >
            <div className="w-10 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
              <ChevronDown className="w-3 h-3" /> Close
            </span>
          </button>
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(55vh - 40px)' }}>
            {renderActivePanel()}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Credit Badge — desktop only, mobile has the sheet + bottom nav instead */}
      <div className="hidden lg:flex p-2 text-center border-t border-dark-800 bg-dark-950/90 text-[10px] text-slate-400 font-bold items-center justify-center gap-1">
        <span>© 2026 MemeForge • Created by </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-pink font-extrabold">Urvashi Chandan</span>
      </div>
    </aside>
  );
};
