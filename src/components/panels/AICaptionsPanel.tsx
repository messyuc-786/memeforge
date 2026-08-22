import React, { useState } from 'react';
import { Sparkles, Wand2, Plus, Copy, Check, ArrowRight, Layers } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { AICaptionResult, TextElement } from '../../types';
import { CAPTION_CATEGORIES } from '../../data/humorDatabase';
import { generateAICaptions, hasApiKeyConfigured } from '../../services/aiService';

export const AICaptionsPanel: React.FC = () => {
  const { project, setTopText, setBottomText, addElement } = useMeme();
  const [selectedCategory, setSelectedCategory] = useState<string>(CAPTION_CATEGORIES[0]);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [captions, setCaptions] = useState<AICaptionResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerateCaptions = async () => {
    setIsLoading(true);
    try {
      const { captions: generated } = await generateAICaptions(userPrompt, selectedCategory);
      setCaptions(generated);
    } catch (err) {
      console.error('Caption generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyTopBottom = (caption: AICaptionResult) => {
    setTopText(caption.topText);
    setBottomText(caption.bottomText);
  };

  const handleAddAsFloating = (caption: AICaptionResult) => {
    const newText: TextElement = {
      id: `ai-text-${Date.now()}`,
      type: 'text',
      text: `${caption.topText}\n${caption.bottomText}`,
      x: 50,
      y: 50,
      width: 320,
      height: 90,
      rotation: 0,
      scale: 1,
      opacity: 1,
      zIndex: project.elements.length + 1,
      fontFamily: 'Anton',
      fontSize: 36,
      fillColor: '#FFFFFF',
      strokeColor: '#000000',
      strokeWidth: 8,
      isUppercase: true,
      align: 'center'
    };
    addElement(newText);
  };

  const handleCopy = (caption: AICaptionResult) => {
    navigator.clipboard.writeText(`${caption.topText} — ${caption.bottomText}`);
    setCopiedId(caption.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-5 p-4 text-slate-200">
      {/* Title */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-purple flex items-center gap-1.5">
            <span>✨</span> AI Meme Caption Generator
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-dark-800 text-slate-400">
            {hasApiKeyConfigured() ? '✨ Live Gemini API' : '🧠 Smart Humor Engine'}
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Enter a situation or pick a vibe to automatically craft 3 viral punchlines.
        </p>
      </div>

      {/* Optional Context Prompt Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          DESCRIBE YOUR SITUATION (OPTIONAL)
        </label>
        <input
          type="text"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="e.g. Me checking my bank account after ordering takeout..."
          className="w-full px-3 py-2.5 rounded-xl bg-dark-900 border border-dark-700 focus:border-brand-purple text-white text-xs outline-none transition"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          CHOOSE VIBE &amp; CATEGORY
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CAPTION_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/20'
                  : 'bg-dark-900 hover:bg-dark-800 text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Action: Generate 3 Captions */}
      <button
        onClick={handleGenerateCaptions}
        disabled={isLoading}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-purple via-brand-pink to-brand-orange text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-brand-purple/25 active:scale-98 transition flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Generating 3 Viral Captions...</span>
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4" />
            <span>Generate 3 Captions ✨</span>
          </>
        )}
      </button>

      {/* Results */}
      {captions.length > 0 && (
        <div className="flex flex-col gap-3">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            🎉 GENERATED OPTIONS
          </label>

          {captions.map((c) => (
            <div
              key={c.id}
              className="p-3.5 rounded-2xl bg-dark-900 border border-dark-700/90 hover:border-brand-purple/50 transition flex flex-col gap-2.5 shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-brand-purple">
                  {c.category}
                </span>
                <button
                  onClick={() => handleCopy(c)}
                  title="Copy caption text"
                  className="p-1 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-300 transition"
                >
                  {copiedId === c.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex flex-col gap-1 text-xs">
                <div className="text-brand-yellow font-impact uppercase tracking-wide">
                  TOP: {c.topText}
                </div>
                <div className="text-white font-impact uppercase tracking-wide">
                  BOTTOM: {c.bottomText}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleApplyTopBottom(c)}
                  className="py-1.5 px-2 rounded-xl bg-brand-purple/20 hover:bg-brand-purple hover:text-white text-brand-purple border border-brand-purple/40 text-[11px] font-bold transition flex items-center justify-center gap-1"
                >
                  <span>Apply Top/Bottom</span>
                </button>
                <button
                  onClick={() => handleAddAsFloating(c)}
                  className="py-1.5 px-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-200 text-[11px] font-bold transition flex items-center justify-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Floating Text</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
