import React from 'react';
import { X, Share2, Sparkles, Check, Download, Smartphone } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { PLATFORM_PRESETS, PlatformPresetInfo } from '../../services/ai/platformService';
import { soundService } from '../../services/soundService';

export const PlatformOptimizerModal: React.FC = () => {
  const { isPlatformModalOpen, setIsPlatformModalOpen, setAspectRatio, setIsExportModalOpen } = useMeme();

  if (!isPlatformModalOpen) return null;

  const handleApplyPlatform = (preset: PlatformPresetInfo) => {
    soundService.playPop();
    setAspectRatio(preset.recommendedRatio);
    setIsPlatformModalOpen(false);
    setIsExportModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl rounded-3xl bg-dark-900 border border-brand-cyan/50 shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-800 bg-gradient-to-r from-brand-cyan/20 via-transparent to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black font-anton uppercase tracking-wide text-slate-100">
                PLATFORM OPTIMIZER
              </h2>
              <p className="text-xs text-slate-400">Where are you posting? Auto-format dimensions &amp; safe zones</p>
            </div>
          </div>

          <button
            onClick={() => setIsPlatformModalOpen(false)}
            className="p-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Cards Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 overflow-y-auto max-h-[70vh]">
          {PLATFORM_PRESETS.map((preset) => (
            <div
              key={preset.name}
              className="p-4 rounded-2xl bg-dark-850 border border-dark-700/80 hover:border-brand-cyan/60 transition flex flex-col justify-between gap-3 group shadow-md"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{preset.icon}</span>
                    <span className="font-black text-sm text-slate-100">{preset.name}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40">
                    {preset.recommendedRatio}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {preset.safeZoneNote}
                </p>

                <div className="p-2 rounded-xl bg-dark-900 border border-dark-700 text-[11px] text-slate-400">
                  <span className="font-bold text-slate-300">💡 Tip: </span>
                  {preset.captionLengthTip}
                </div>
              </div>

              <button
                onClick={() => handleApplyPlatform(preset)}
                className="w-full py-2.5 rounded-xl bg-dark-800 hover:bg-brand-cyan hover:text-slate-950 text-slate-200 font-extrabold text-xs transition flex items-center justify-center gap-1.5 active:scale-98 shadow-sm"
              >
                <span>Format for {preset.name.split(' ')[0]}</span>
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
