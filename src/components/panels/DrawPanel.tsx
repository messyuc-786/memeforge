import React from 'react';
import { Edit3, Eraser, Trash2, Sparkles, Check } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';

const DRAW_COLORS = [
  '#FF5722',
  '#FFDD00',
  '#EF4444',
  '#10B981',
  '#06B6D4',
  '#9333EA',
  '#EC4899',
  '#FFFFFF',
  '#000000'
];

export const DrawPanel: React.FC = () => {
  const {
    project,
    drawColor,
    setDrawColor,
    drawWidth,
    setDrawWidth,
    isDrawGlow,
    setIsDrawGlow,
    isDrawEraser,
    setIsDrawEraser,
    clearDrawings
  } = useMeme();

  return (
    <div className="flex flex-col gap-5 p-4 text-slate-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange flex items-center gap-1.5">
          <Edit3 className="w-3.5 h-3.5 text-brand-orange" /> Freehand Neon Brush
        </span>
        {project.drawPaths.length > 0 && (
          <button
            onClick={clearDrawings}
            className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 font-bold transition"
          >
            <Trash2 className="w-3 h-3" /> Clear Doodles ({project.drawPaths.length})
          </button>
        )}
      </div>

      <p className="text-xs text-slate-400">
        Click and drag directly on the canvas to draw memes, arrows, glasses, and neon graffiti!
      </p>

      {/* Tool Selector: Brush vs Eraser */}
      <div className="grid grid-cols-2 gap-2 bg-dark-900 p-1 rounded-2xl border border-dark-700">
        <button
          onClick={() => setIsDrawEraser(false)}
          className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            !isDrawEraser
              ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Neon Pen</span>
        </button>
        <button
          onClick={() => setIsDrawEraser(true)}
          className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            isDrawEraser
              ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Eraser className="w-3.5 h-3.5" />
          <span>Eraser</span>
        </button>
      </div>

      {/* Color Palette */}
      {!isDrawEraser && (
        <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-dark-900 border border-dark-700/80">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            BRUSH COLOR
          </label>
          <div className="flex flex-wrap gap-2">
            {DRAW_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setDrawColor(c)}
                style={{ backgroundColor: c }}
                className={`w-7 h-7 rounded-full border-2 transition flex items-center justify-center ${
                  drawColor === c ? 'border-white scale-110 shadow-lg' : 'border-transparent'
                }`}
              >
                {drawColor === c && (
                  <Check className={`w-3.5 h-3.5 ${c === '#FFFFFF' || c === '#FFDD00' ? 'text-black' : 'text-white'}`} />
                )}
              </button>
            ))}
            <input
              type="color"
              value={drawColor}
              onChange={(e) => setDrawColor(e.target.value)}
              className="w-7 h-7 rounded-full bg-transparent border-0 cursor-pointer"
            />
          </div>

          {/* Neon Glow Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-dark-800">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-yellow" /> Neon Glow Light
            </span>
            <input
              type="checkbox"
              checked={isDrawGlow}
              onChange={(e) => setIsDrawGlow(e.target.checked)}
              className="accent-brand-orange w-4 h-4 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Brush Thickness Slider */}
      <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-dark-900 border border-dark-700/80">
        <div className="flex justify-between text-[11px] font-bold text-slate-400">
          <span>BRUSH THICKNESS</span>
          <span className="text-brand-orange">{drawWidth}px</span>
        </div>
        <input
          type="range"
          min={2}
          max={40}
          value={drawWidth}
          onChange={(e) => setDrawWidth(Number(e.target.value))}
          className="accent-brand-orange cursor-pointer"
        />
        <div className="flex items-center justify-center pt-2">
          <div
            style={{
              width: `${drawWidth}px`,
              height: `${drawWidth}px`,
              backgroundColor: isDrawEraser ? '#FFF' : drawColor,
              boxShadow: !isDrawEraser && isDrawGlow ? `0 0 12px ${drawColor}` : 'none'
            }}
            className="rounded-full transition-all"
          />
        </div>
      </div>
    </div>
  );
};
