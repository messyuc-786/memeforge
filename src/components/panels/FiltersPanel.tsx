import React from 'react';
import { Sliders, RotateCcw, Sparkles } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';

const FILTER_PRESETS: { id: string; name: string; icon: string; preset: any }[] = [
  { id: 'none', name: 'Normal', icon: '✨', preset: 'none' },
  { id: 'deepfry', name: 'Deep Fry 🔥', icon: '🍟', preset: 'deepfry' },
  { id: 'vintage', name: 'Vintage 70s', icon: '🎞️', preset: 'vintage' },
  { id: 'comic', name: 'Comic Halftone', icon: '📰', preset: 'comic' },
  { id: 'pixar', name: 'Pixar 3D Glow', icon: '🎬', preset: 'pixar' },
  { id: 'sketch', name: 'Pencil Sketch', icon: '✏️', preset: 'sketch' },
  { id: 'glitch', name: 'VHS Glitch', icon: '📺', preset: 'glitch' },
  { id: 'noir', name: 'Noir B&W', icon: '🖤', preset: 'noir' },
  { id: 'cyberpunk', name: 'Cyberpunk', icon: '🌆', preset: 'cyberpunk' },
  { id: 'sepia', name: 'Sepia Film', icon: '📜', preset: 'sepia' }
];

export const FiltersPanel: React.FC = () => {
  const { project, setFilters, resetFilters } = useMeme();

  return (
    <div className="flex flex-col gap-5 p-4 text-slate-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-cyan flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-brand-cyan" /> Filters &amp; Shaders
        </span>
        <button
          onClick={resetFilters}
          className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 font-bold transition"
        >
          <RotateCcw className="w-3 h-3" /> Reset All
        </button>
      </div>

      {/* Preset Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {FILTER_PRESETS.map((p) => {
          const isSelected = project.filters.filterPreset === p.preset;
          return (
            <button
              key={p.id}
              onClick={() => setFilters({ filterPreset: p.preset })}
              className={`p-2.5 rounded-2xl border text-center flex flex-col items-center gap-1 transition ${
                isSelected
                  ? 'bg-brand-cyan/20 border-brand-cyan text-white shadow-md shadow-brand-cyan/20'
                  : 'bg-dark-900 hover:bg-dark-850 border-dark-700/80 text-slate-300'
              }`}
            >
              <span className="text-xl">{p.icon}</span>
              <span className="font-extrabold text-[11px]">{p.name}</span>
            </button>
          );
        })}
      </div>

      {/* Manual Sliders */}
      <div className="flex flex-col gap-3.5 p-3.5 rounded-2xl bg-dark-900 border border-dark-700/80">
        <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
          Manual Adjustments
        </span>

        {/* Brightness */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px] font-bold text-slate-400">
            <span>BRIGHTNESS</span>
            <span>{project.filters.brightness > 0 ? `+${project.filters.brightness}` : project.filters.brightness}</span>
          </div>
          <input
            type="range"
            min={-80}
            max={80}
            value={project.filters.brightness}
            onChange={(e) => setFilters({ brightness: Number(e.target.value) })}
            className="accent-brand-cyan cursor-pointer"
          />
        </div>

        {/* Contrast */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px] font-bold text-slate-400">
            <span>CONTRAST</span>
            <span>{project.filters.contrast > 0 ? `+${project.filters.contrast}` : project.filters.contrast}</span>
          </div>
          <input
            type="range"
            min={-80}
            max={100}
            value={project.filters.contrast}
            onChange={(e) => setFilters({ contrast: Number(e.target.value) })}
            className="accent-brand-cyan cursor-pointer"
          />
        </div>

        {/* Saturation */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px] font-bold text-slate-400">
            <span>SATURATION</span>
            <span>{project.filters.saturation > 0 ? `+${project.filters.saturation}` : project.filters.saturation}</span>
          </div>
          <input
            type="range"
            min={-100}
            max={150}
            value={project.filters.saturation}
            onChange={(e) => setFilters({ saturation: Number(e.target.value) })}
            className="accent-brand-cyan cursor-pointer"
          />
        </div>

        {/* Noise / Grain */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px] font-bold text-slate-400">
            <span>NOISE / DEEP FRY GRAIN</span>
            <span>{project.filters.noise}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={project.filters.noise}
            onChange={(e) => setFilters({ noise: Number(e.target.value) })}
            className="accent-brand-cyan cursor-pointer"
          />
        </div>

        {/* Blur */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px] font-bold text-slate-400">
            <span>BLUR</span>
            <span>{project.filters.blur}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={15}
            value={project.filters.blur}
            onChange={(e) => setFilters({ blur: Number(e.target.value) })}
            className="accent-brand-cyan cursor-pointer"
          />
        </div>

        {/* Hue Rotate */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[11px] font-bold text-slate-400">
            <span>HUE SHIFT</span>
            <span>{project.filters.hueRotate}°</span>
          </div>
          <input
            type="range"
            min={0}
            max={360}
            value={project.filters.hueRotate}
            onChange={(e) => setFilters({ hueRotate: Number(e.target.value) })}
            className="accent-brand-cyan cursor-pointer"
          />
        </div>

        {/* Invert */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] font-bold text-slate-400">INVERT COLORS (CURSED)</span>
          <input
            type="checkbox"
            checked={project.filters.invert}
            onChange={(e) => setFilters({ invert: e.target.checked })}
            className="accent-brand-cyan w-4 h-4 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
