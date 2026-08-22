import React from 'react';
import { MessageSquare, Cloud, Zap, Plus, Sparkles } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { BubbleStyleType, SpeechBubbleElement } from '../../types';

const BUBBLE_PRESETS: { style: BubbleStyleType; name: string; icon: string; desc: string; defaultText: string }[] = [
  {
    style: 'comic',
    name: 'Comic Speech',
    icon: '💬',
    desc: 'Classic comic book character dialogue',
    defaultText: 'WHAT ARE YOU LOOKING AT?!'
  },
  {
    style: 'thought',
    name: 'Thought Cloud',
    icon: '💭',
    desc: 'Inner thoughts & daydreaming with dots',
    defaultText: 'I wonder if they know...'
  },
  {
    style: 'shout',
    name: 'Shout / Yell',
    icon: '💥',
    desc: 'Spiky starburst screaming dialog',
    defaultText: 'NOOOOO WAY!!'
  },
  {
    style: 'chat',
    name: 'Chat Pill',
    icon: '📱',
    desc: 'Modern iMessage / WhatsApp style pill',
    defaultText: 'Bro, you seeing this?'
  },
  {
    style: 'whisper',
    name: 'Whisper Secret',
    icon: '🤫',
    desc: 'Dashed quiet secret bubble',
    defaultText: 'psst... don\'t look now'
  },
  {
    style: 'boom',
    name: 'Action Burst',
    icon: '⚡',
    desc: 'High energy manga action pop',
    defaultText: 'NANI?!?!'
  }
];

export const SpeechBubblePanel: React.FC = () => {
  const { project, addElement, selectedElement, updateElement } = useMeme();

  const isSelectedBubble = selectedElement && selectedElement.type === 'bubble';
  const currentBubble = isSelectedBubble ? (selectedElement as SpeechBubbleElement) : null;

  const handleAddBubble = (style: BubbleStyleType, defaultText: string) => {
    const newBubble: SpeechBubbleElement = {
      id: `bubble-${Date.now()}`,
      type: 'bubble',
      bubbleStyle: style,
      text: defaultText,
      x: 50,
      y: 40,
      width: 260,
      height: 120,
      rotation: 0,
      scale: 1,
      opacity: 1,
      zIndex: project.elements.length + 1,
      fontFamily: '"Comic Neue"',
      fontSize: 22,
      textColor: '#000000',
      bubbleColor: style === 'shout' || style === 'boom' ? '#FFDD00' : '#FFFFFF',
      borderColor: '#000000',
      borderWidth: 4,
      tailX: 10,
      tailY: 140,
      padding: 16
    };
    addElement(newBubble);
  };

  return (
    <div className="flex flex-col gap-5 p-4 text-slate-200">
      {/* 1. Header description */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-cyan flex items-center gap-1.5">
          <span>🗯️</span> Add Speech &amp; Thought Bubbles
        </span>
        <p className="text-xs text-slate-400">
          Pick a bubble style to stamp onto your meme. Drag to reposition tail and text.
        </p>
      </div>

      {/* 2. Bubble Presets Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {BUBBLE_PRESETS.map((preset) => (
          <button
            key={preset.style}
            onClick={() => handleAddBubble(preset.style, preset.defaultText)}
            className="p-3 rounded-2xl bg-dark-900 hover:bg-dark-850 border border-dark-700/80 hover:border-brand-cyan/60 transition text-left flex flex-col gap-1 group shadow-md hover:-translate-y-0.5 active:scale-98"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl group-hover:scale-110 transition-transform">{preset.icon}</span>
              <span className="p-1 rounded-lg bg-dark-800 text-brand-cyan group-hover:bg-brand-cyan group-hover:text-slate-950 transition">
                <Plus className="w-3 h-3 stroke-[3]" />
              </span>
            </div>
            <span className="font-extrabold text-xs text-slate-100 mt-1">{preset.name}</span>
            <span className="text-[10px] text-slate-400 line-clamp-1">{preset.desc}</span>
          </button>
        ))}
      </div>

      {/* 3. Selected Bubble Inspector */}
      {currentBubble ? (
        <div className="flex flex-col gap-3.5 p-3.5 rounded-2xl bg-dark-900 border border-brand-cyan/40">
          <span className="text-xs font-extrabold text-brand-cyan uppercase tracking-wider flex items-center gap-1.5">
            <span>💬</span> Customize Selected Bubble
          </span>

          {/* Bubble Text Content */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-slate-400">BUBBLE TEXT</label>
            <textarea
              value={currentBubble.text}
              onChange={(e) => updateElement(currentBubble.id, { text: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 rounded-xl bg-dark-800 border border-dark-700 focus:border-brand-cyan text-white text-sm outline-none transition resize-none font-comic"
            />
          </div>

          {/* Font Size */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-400">
              <span>TEXT SIZE</span>
              <span className="text-brand-cyan">{currentBubble.fontSize}px</span>
            </div>
            <input
              type="range"
              min={14}
              max={60}
              value={currentBubble.fontSize}
              onChange={(e) => updateElement(currentBubble.id, { fontSize: Number(e.target.value) })}
              className="accent-brand-cyan cursor-pointer"
            />
          </div>

          {/* Bubble Fill Color */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400">BUBBLE FILL COLOR</label>
            <div className="flex items-center gap-2">
              {['#FFFFFF', '#FFDD00', '#FF5722', '#EC4899', '#06B6D4', '#10B981', '#1E293B'].map((color) => (
                <button
                  key={color}
                  onClick={() => updateElement(currentBubble.id, { bubbleColor: color })}
                  style={{ backgroundColor: color }}
                  className={`w-6 h-6 rounded-full border-2 transition ${
                    currentBubble.bubbleColor === color ? 'border-brand-cyan scale-110 shadow-md' : 'border-dark-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bubble Border Width */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-400">
              <span>BORDER THICKNESS</span>
              <span>{currentBubble.borderWidth}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={12}
              value={currentBubble.borderWidth}
              onChange={(e) => updateElement(currentBubble.id, { borderWidth: Number(e.target.value) })}
              className="accent-brand-cyan cursor-pointer"
            />
          </div>

          {/* Tail Direction Quick Presets */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400">POINTER TAIL DIRECTION</label>
            <div className="grid grid-cols-4 gap-1.5">
              <button
                onClick={() => updateElement(currentBubble.id, { tailX: -60, tailY: 100 })}
                className="py-1 rounded bg-dark-800 hover:bg-dark-700 text-xs font-bold"
              >
                ↙ Left
              </button>
              <button
                onClick={() => updateElement(currentBubble.id, { tailX: 0, tailY: 110 })}
                className="py-1 rounded bg-dark-800 hover:bg-dark-700 text-xs font-bold"
              >
                ↓ Down
              </button>
              <button
                onClick={() => updateElement(currentBubble.id, { tailX: 60, tailY: 100 })}
                className="py-1 rounded bg-dark-800 hover:bg-dark-700 text-xs font-bold"
              >
                ↘ Right
              </button>
              <button
                onClick={() => updateElement(currentBubble.id, { tailX: 0, tailY: -100 })}
                className="py-1 rounded bg-dark-800 hover:bg-dark-700 text-xs font-bold"
              >
                ↑ Top
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
