import React from 'react';
import { Sparkles, Sliders, CheckCircle2, RotateCcw, Wand2, Info } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { CARTOON_STYLES } from '../../services/aiService';
import { CartoonStyleType } from '../../types';

export const CartoonifyPanel: React.FC = () => {
  const { project, setFilters, resetFilters } = useMeme();

  const activeStyle = project.filters.filterPreset;

  const handleApplyStyle = (styleId: CartoonStyleType) => {
    const matched = CARTOON_STYLES.find((s) => s.id === styleId);
    if (!matched) return;

    switch (styleId) {
      case 'cute':
        setFilters({
          filterPreset: 'pixar',
          saturation: 40,
          brightness: 10,
          contrast: 15,
          blur: 0
        });
        break;
      case 'comic':
        setFilters({
          filterPreset: 'comic',
          saturation: 50,
          contrast: 70,
          brightness: 5
        });
        break;
      case 'pixar':
        setFilters({
          filterPreset: 'pixar',
          saturation: 45,
          contrast: 30,
          brightness: 8
        });
        break;
      case 'sketch':
        setFilters({
          filterPreset: 'sketch',
          contrast: 90,
          brightness: 5,
          noise: 20
        });
        break;
      case 'crazy':
        setFilters({
          filterPreset: 'deepfry',
          saturation: 100,
          contrast: 100,
          brightness: 15,
          noise: 45
        });
        break;
      case 'anime':
        setFilters({
          filterPreset: 'anime',
          saturation: 60,
          contrast: 35,
          brightness: 10
        });
        break;
    }
  };

  return (
    <div className="flex flex-col gap-5 p-4 text-slate-200">
      {/* Description */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-pink flex items-center gap-1.5">
            <span>🎨</span> Real-time Cartoonify Studio
          </span>
          {activeStyle !== 'none' && (
            <button
              onClick={resetFilters}
              className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 font-bold transition"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>
        <p className="text-xs text-slate-400">
          Instantly transform your uploaded photo into rich comic, 3D animated, or sketch styles using GPU shaders.
        </p>
      </div>

      {!project.backgroundImageUrl && (
        <div className="p-3 rounded-2xl bg-brand-pink/10 border border-brand-pink/30 text-xs text-slate-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
          <p>Upload a photo or choose a template first to preview cartoon transformations in real time!</p>
        </div>
      )}

      {/* Style Presets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CARTOON_STYLES.map((style) => {
          const isSelected = activeStyle === style.filterPreset;
          return (
            <button
              key={style.id}
              onClick={() => handleApplyStyle(style.id)}
              className={`p-3.5 rounded-2xl border transition text-left flex flex-col gap-2 group relative overflow-hidden ${
                isSelected
                  ? 'bg-dark-850 border-brand-pink shadow-lg shadow-brand-pink/15 ring-1 ring-brand-pink'
                  : 'bg-dark-900 hover:bg-dark-850 border-dark-700/80 hover:border-brand-pink/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{style.emoji}</span>
                  <span className="font-extrabold text-xs text-slate-100">{style.name}</span>
                </div>
                <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded bg-dark-800 text-brand-pink border border-brand-pink/30">
                  {style.tag}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                {style.description}
              </p>

              {isSelected && (
                <div className="flex items-center gap-1 text-[10px] font-bold text-brand-pink mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active Live Shader
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Fine-tune Shader Sliders */}
      <div className="flex flex-col gap-3 p-3.5 rounded-2xl bg-dark-900 border border-dark-700/80">
        <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-brand-pink" /> Shader Fine-Tuning
        </span>

        {/* Saturation */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px] font-bold text-slate-400">
            <span>COLOR SATURATION</span>
            <span>{project.filters.saturation > 0 ? `+${project.filters.saturation}%` : `${project.filters.saturation}%`}</span>
          </div>
          <input
            type="range"
            min={-100}
            max={200}
            value={project.filters.saturation}
            onChange={(e) => setFilters({ saturation: Number(e.target.value) })}
            className="accent-brand-pink cursor-pointer"
          />
        </div>

        {/* Contrast */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px] font-bold text-slate-400">
            <span>CONTRAST &amp; INK</span>
            <span>{project.filters.contrast > 0 ? `+${project.filters.contrast}%` : `${project.filters.contrast}%`}</span>
          </div>
          <input
            type="range"
            min={-100}
            max={150}
            value={project.filters.contrast}
            onChange={(e) => setFilters({ contrast: Number(e.target.value) })}
            className="accent-brand-pink cursor-pointer"
          />
        </div>

        {/* Noise / Grain */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px] font-bold text-slate-400">
            <span>GRAIN / NOISE</span>
            <span>{project.filters.noise}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={project.filters.noise}
            onChange={(e) => setFilters({ noise: Number(e.target.value) })}
            className="accent-brand-pink cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
