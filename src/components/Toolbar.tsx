import React from 'react';
import {
  Smile,
  Palette,
  MessageSquare,
  Flame,
  Wand2,
  Sparkles,
  Sliders,
  Edit3,
  LayoutTemplate
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

const TOOL_TABS: { mode: ToolMode; label: string; icon: string; highlight?: boolean }[] = [
  { mode: 'meme', label: 'Meme Text', icon: '😂' },
  { mode: 'cartoon', label: 'Cartoonify', icon: '🎨' },
  { mode: 'bubble', label: 'Bubbles', icon: '🗯️' },
  { mode: 'roast', label: 'Roast Photo', icon: '🔥', highlight: true },
  { mode: 'ai', label: 'AI Captions', icon: '✨', highlight: true },
  { mode: 'stickers', label: 'Stickers', icon: '😎' },
  { mode: 'filters', label: 'Filters', icon: '🪄' },
  { mode: 'draw', label: 'Draw', icon: '✏️' }
];

export const Toolbar: React.FC = () => {
  const { toolMode, setToolMode, setIsTemplatesModalOpen } = useMeme();

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
      default:
        return <MemeTextPanel />;
    }
  };

  return (
    <aside className="w-full lg:w-96 bg-dark-900/90 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-dark-700/80 flex flex-col h-auto lg:h-[calc(100vh-65px)] overflow-hidden shadow-2xl z-20">
      {/* Studio Modes Tab Bar */}
      <div className="flex items-center gap-1.5 p-2.5 overflow-x-auto no-scrollbar border-b border-dark-800 bg-dark-950/60">
        {TOOL_TABS.map((tab) => {
          const isActive = toolMode === tab.mode;
          return (
            <button
              key={tab.mode}
              onClick={() => setToolMode(tab.mode)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-brand-orange via-brand-pink to-brand-purple text-white shadow-lg shadow-brand-orange/20 scale-[1.02]'
                  : 'bg-dark-800/80 hover:bg-dark-700 text-slate-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}

        <button
          onClick={() => setIsTemplatesModalOpen(true)}
          className="px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap bg-dark-800/80 hover:bg-dark-700 text-brand-yellow hover:text-white transition flex items-center gap-1.5 shrink-0 border border-brand-yellow/30"
        >
          <span>📚</span>
          <span>Templates</span>
        </button>
      </div>

      {/* Active Panel Body Container */}
      <div className="flex-1 overflow-y-auto max-h-[500px] lg:max-h-full">
        {renderActivePanel()}
      </div>
    </aside>
  );
};
