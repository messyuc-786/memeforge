import React from 'react';
import { Type, MessageSquare, Sticker, Eye, EyeOff, Trash2, ArrowUp, ArrowDown, Layers as LayersIcon } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { CanvasElement } from '../../types';

const LAYER_ICONS: Record<CanvasElement['type'], React.ReactNode> = {
  text: <Type className="w-4 h-4" />,
  bubble: <MessageSquare className="w-4 h-4" />,
  sticker: <Sticker className="w-4 h-4" />
};

const LAYER_LABELS: Record<CanvasElement['type'], string> = {
  text: 'Text',
  bubble: 'Speech Bubble',
  sticker: 'Sticker'
};

function describeElement(el: CanvasElement): string {
  if (el.type === 'text') return el.text?.trim() || 'Empty text';
  if (el.type === 'bubble') return el.text?.trim() || 'Empty bubble';
  if (el.type === 'sticker') return el.name || 'Sticker';
  return 'Layer';
}

export const LayersPanel: React.FC = () => {
  const {
    project,
    selectedElementId,
    setSelectedElementId,
    updateElement,
    removeElement,
    bringForward,
    sendBackward
  } = useMeme();

  // Topmost layer first — matches what canvasEngine actually draws last (on top)
  const layers = [...project.elements].sort((a, b) => b.zIndex - a.zIndex);

  const toggleVisibility = (el: CanvasElement) => {
    updateElement(el.id, { opacity: el.opacity > 0 ? 0 : 1 });
  };

  if (layers.length === 0) {
    return (
      <div className="p-5 flex flex-col items-center text-center gap-2 text-slate-400">
        <LayersIcon className="w-8 h-8 text-slate-600" />
        <p className="text-sm font-bold text-slate-300">No layers yet</p>
        <p className="text-xs text-slate-500">
          Add text, a speech bubble, or a sticker from the tools above — they'll show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between px-1 mb-1">
        <span className="text-xs font-black uppercase tracking-wider text-slate-400">
          Layers ({layers.length})
        </span>
        <span className="text-[10px] text-slate-500">Top = front</span>
      </div>

      {layers.map((el, idx) => {
        const isSelected = el.id === selectedElementId;
        const isVisible = el.opacity > 0;
        const isTop = idx === 0;
        const isBottom = idx === layers.length - 1;

        return (
          <div
            key={el.id}
            onClick={() => setSelectedElementId(el.id)}
            role="button"
            tabIndex={0}
            className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
              isSelected
                ? 'bg-brand-orange/15 border-brand-orange/60 shadow-[0_0_0_1px_rgba(255,87,34,0.3)]'
                : 'bg-dark-850 border-dark-700 hover:bg-dark-800'
            }`}
          >
            <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-brand-orange/20 text-brand-orange' : 'bg-dark-800 text-slate-400'}`}>
              {LAYER_ICONS[el.type]}
            </div>

            <div className="flex-1 min-w-0">
              <p className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                {describeElement(el)}
              </p>
              <p className="text-[10px] text-slate-500">{LAYER_LABELS[el.type]}</p>
            </div>

            <div className="flex items-center gap-0.5 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  bringForward(el.id);
                }}
                disabled={isTop}
                title="Move up"
                className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-dark-800 hover:bg-dark-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sendBackward(el.id);
                }}
                disabled={isBottom}
                title="Move down"
                className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-dark-800 hover:bg-dark-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVisibility(el);
                }}
                title={isVisible ? 'Hide layer' : 'Show layer'}
                className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-300 transition"
              >
                {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeElement(el.id);
                }}
                title="Delete layer"
                className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500 text-red-300 hover:text-white transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
