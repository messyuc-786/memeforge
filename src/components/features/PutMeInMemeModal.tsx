import React, { useState, useRef } from 'react';
import { X, Upload, Camera, Sparkles, Wand2, Check, ArrowRight } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { MEME_TEMPLATES } from '../../data/templatesData';
import { createHeadCutout, createPersonalizedFaceSticker } from '../../services/ai/personalizationService';
import { soundService } from '../../services/soundService';
import { useEscapeToClose } from '../../hooks/useEscapeToClose';

export const PutMeInMemeModal: React.FC = () => {
  const {
    isPutMeInMemeModalOpen,
    setIsPutMeInMemeModalOpen,
    loadTemplate,
    addElement,
    setCurrentView,
    setToolMode
  } = useMeme();

  const [selfieSrc, setSelfieSrc] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(MEME_TEMPLATES[0].id);
  const [cutoutSrc, setCutoutSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  useEscapeToClose(() => setIsPutMeInMemeModalOpen(false), isPutMeInMemeModalOpen);

  if (!isPutMeInMemeModalOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setSelfieSrc(dataUrl);
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          const processed = createHeadCutout(img);
          setCutoutSrc(processed);
          soundService.playSparkle();
        };
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLaunchPersonalizedMeme = () => {
    soundService.playAirhorn();
    const template = MEME_TEMPLATES.find((t) => t.id === selectedTemplateId) || MEME_TEMPLATES[0];
    loadTemplate(template);

    if (cutoutSrc) {
      const faceSticker = createPersonalizedFaceSticker(cutoutSrc, template);
      addElement(faceSticker);
    }

    setIsPutMeInMemeModalOpen(false);
    setToolMode('meme');
    setCurrentView('studio');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Put Me In The Meme"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-fadeIn"
    >
      <div className="w-full max-w-2xl rounded-3xl bg-dark-900 border border-brand-pink/50 shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-800 bg-gradient-to-r from-brand-pink/20 via-transparent to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-pink/20 text-brand-pink border border-brand-pink/40">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black font-anton uppercase tracking-wide text-slate-100">
                PUT ME IN THE MEME 🤳
              </h2>
              <p className="text-xs text-slate-400">Upload your selfie to become the star of iconic memes</p>
            </div>
          </div>

          <button
            onClick={() => setIsPutMeInMemeModalOpen(false)}
            aria-label="Close Put Me In The Meme"
            className="p-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto max-h-[75vh]">
          {/* Step 1: Upload Selfie */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-300">
              1. UPLOAD OR TAKE A SELFIE
            </span>

            <div className="flex items-center gap-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-32 h-32 rounded-3xl bg-dark-850 border-2 border-dashed border-dark-600 hover:border-brand-pink transition flex flex-col items-center justify-center gap-2 cursor-pointer group shrink-0 overflow-hidden relative"
              >
                {cutoutSrc ? (
                  <img src={cutoutSrc} alt="Face Cutout" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-brand-pink group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-slate-400">Upload Face</span>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-1 text-xs text-slate-300">
                <span className="font-bold text-white">AI Face Cutout Ready</span>
                <p className="text-slate-400 leading-relaxed">
                  Upload a photo of you, a friend, or your pet. We'll automatically create a clean head cutout sticker with soft lighting!
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Choose Meme Template */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-300">
              2. CHOOSE MEME TEMPLATE
            </span>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-48 overflow-y-auto pr-1">
              {MEME_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  className={`p-2 rounded-2xl border transition flex flex-col items-center gap-1 group relative ${
                    selectedTemplateId === tpl.id
                      ? 'bg-brand-pink/20 border-brand-pink shadow-md'
                      : 'bg-dark-850 border-dark-700 hover:border-dark-600'
                  }`}
                >
                  <img src={tpl.previewUrl} alt={tpl.title} className="w-16 h-16 object-contain rounded" />
                  <span className="text-[10px] font-bold text-slate-300 truncate max-w-full group-hover:text-white">
                    {tpl.title}
                  </span>
                  {selectedTemplateId === tpl.id && (
                    <span className="absolute top-1 right-1 p-0.5 rounded-full bg-brand-pink text-white">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Final Action CTA */}
          <button
            onClick={handleLaunchPersonalizedMeme}
            className="w-full py-4 rounded-3xl bg-gradient-to-r from-brand-pink via-brand-orange to-brand-yellow text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-brand-pink/25 hover:scale-[1.02] active:scale-98 transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 stroke-[3]" />
            <span>Forge My Personalized Meme →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
