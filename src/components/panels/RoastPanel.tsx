import React, { useState } from 'react';
import { Flame, Sparkles, Copy, Check, Plus, MessageSquare, Zap } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { RoastLevelType, RoastResult, TextElement } from '../../types';
import { generateAIRoasts } from '../../services/aiService';

const ROAST_LEVELS: { level: RoastLevelType; name: string; emoji: string; desc: string; color: string }[] = [
  {
    level: 'friendly',
    name: 'Friendly',
    emoji: '😇',
    desc: 'Light wholesome teasing & playful burns',
    color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10'
  },
  {
    level: 'savage',
    name: 'Savage',
    emoji: '😂',
    desc: 'Sharp, hilarious internet comedic roasts',
    color: 'text-brand-orange border-brand-orange/40 bg-brand-orange/10'
  },
  {
    level: 'brutal',
    name: 'Absolutely Brutal',
    emoji: '💀',
    desc: 'Emotional damage tier hilarious fatality',
    color: 'text-brand-fire border-red-500/40 bg-red-500/10'
  }
];

const TOPICS = [
  'Selfie & Face',
  'Outfit & Style',
  'Setup & Desk',
  'Pet & Animal',
  'Food & Cooking'
];

export const RoastPanel: React.FC = () => {
  const { project, addElement, setBottomText } = useMeme();
  const [selectedLevel, setSelectedLevel] = useState<RoastLevelType>('savage');
  const [selectedTopic, setSelectedTopic] = useState<string>(TOPICS[0]);
  const [roasts, setRoasts] = useState<RoastResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isFromAPI, setIsFromAPI] = useState<boolean>(false);

  const handleGenerateRoasts = async () => {
    setIsLoading(true);
    try {
      const { roasts: generated, isFromLiveAPI } = await generateAIRoasts(selectedLevel, selectedTopic);
      setRoasts(generated);
      setIsFromAPI(isFromLiveAPI);
    } catch (err) {
      console.error('Roast generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStampToCanvas = (roast: RoastResult) => {
    // Add as a styled high-impact floating text badge or speech bubble
    const newText: TextElement = {
      id: `roast-elem-${Date.now()}`,
      type: 'text',
      text: roast.roast.toUpperCase(),
      x: 50,
      y: 75,
      width: 320,
      height: 70,
      rotation: 0,
      scale: 1,
      opacity: 1,
      zIndex: project.elements.length + 1,
      fontFamily: 'Anton',
      fontSize: 32,
      fillColor: selectedLevel === 'brutal' ? '#FF5722' : selectedLevel === 'savage' ? '#FFDD00' : '#FFFFFF',
      strokeColor: '#000000',
      strokeWidth: 6,
      backgroundColor: 'rgba(8, 9, 13, 0.85)',
      backgroundPadding: 14,
      backgroundBorderRadius: 12,
      isUppercase: true,
      align: 'center'
    };
    addElement(newText);
  };

  const handleCopy = (roast: RoastResult) => {
    navigator.clipboard.writeText(roast.roast);
    setCopiedId(roast.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-5 p-4 text-slate-200">
      {/* Title & Badge */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-fire flex items-center gap-1.5">
            <span>🔥</span> Roast My Photo
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-dark-800 text-slate-400">
            {isFromAPI ? '✨ Live AI Response' : '🧠 Smart Built-in Engine'}
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Upload any photo and generate hilarious, viral burns tailored to your image subject.
        </p>
      </div>

      {/* Select Roast Level */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          1. CHOOSE ROAST INTENSITY
        </label>
        <div className="grid grid-cols-3 gap-2">
          {ROAST_LEVELS.map((tier) => (
            <button
              key={tier.level}
              onClick={() => setSelectedLevel(tier.level)}
              className={`p-2.5 rounded-2xl border text-center flex flex-col items-center gap-1 transition ${
                selectedLevel === tier.level
                  ? `${tier.color} shadow-lg ring-1 ring-white/20 scale-[1.02]`
                  : 'bg-dark-900 border-dark-700/80 text-slate-400 hover:text-white'
              }`}
            >
              <span className="text-2xl">{tier.emoji}</span>
              <span className="font-extrabold text-[11px] text-slate-100">{tier.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Select Photo Topic */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          2. PHOTO SUBJECT / TOPIC
        </label>
        <div className="flex flex-wrap gap-1.5">
          {TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                selectedTopic === topic
                  ? 'bg-brand-fire text-white shadow-md shadow-brand-fire/20'
                  : 'bg-dark-900 hover:bg-dark-800 text-slate-300'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Action Button: Generate Roasts */}
      <button
        onClick={handleGenerateRoasts}
        disabled={isLoading}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-orange via-brand-fire to-brand-pink text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-brand-fire/25 active:scale-98 transition flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Cooking Up Roasts...</span>
          </>
        ) : (
          <>
            <Flame className="w-4 h-4 animate-pulse-slow text-brand-yellow" />
            <span>Generate 3 Roasts 🔥</span>
          </>
        )}
      </button>

      {/* Generated Roasts Result Cards */}
      {roasts.length > 0 && (
        <div className="flex flex-col gap-3">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>🔥 GENERATED ROASTS</span>
            <span className="text-[10px] text-brand-orange font-bold">1-Click to apply</span>
          </label>

          {roasts.map((r) => (
            <div
              key={r.id}
              className="p-3.5 rounded-2xl bg-dark-900 border border-dark-700/90 hover:border-brand-fire/50 transition flex flex-col gap-2 group shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-brand-fire/15 text-brand-fire border border-brand-fire/30">
                  {r.punchline}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(r)}
                    title="Copy Roast"
                    className="p-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-300 transition"
                  >
                    {copiedId === r.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-100 font-medium leading-relaxed italic">
                "{r.roast}"
              </p>

              <button
                onClick={() => handleStampToCanvas(r)}
                className="w-full py-2 rounded-xl bg-dark-800 hover:bg-brand-fire hover:text-white text-slate-200 border border-dark-700 font-bold text-xs transition flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Stamp onto Photo</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
