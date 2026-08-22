import React from 'react';
import { Plus, Type, AlignLeft, AlignCenter, AlignRight, Sparkles } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { TextElement } from '../../types';

const FONTS = [
  { name: 'Impact (Classic Meme)', family: 'Impact' },
  { name: 'Anton (Bold Poster)', family: 'Anton' },
  { name: 'Bangers (Comic Hero)', family: 'Bangers' },
  { name: 'Comic Neue (Meme Comic)', family: '"Comic Neue"' },
  { name: 'Permanent Marker (Graffiti)', family: '"Permanent Marker"' },
  { name: 'Fredoka (Cute Rounded)', family: 'Fredoka' },
  { name: 'Orbitron (Cyber Tech)', family: 'Orbitron' },
  { name: 'Poppins (Modern Clean)', family: 'Poppins' },
  { name: 'Pacifico (Retro Script)', family: 'Pacifico' },
  { name: 'Creepster (Spooky Horror)', family: 'Creepster' }
];

const COLOR_PRESETS = [
  '#FFFFFF',
  '#000000',
  '#FFDD00',
  '#FF5722',
  '#EF4444',
  '#10B981',
  '#06B6D4',
  '#9333EA',
  '#EC4899'
];

const QUICK_TEXT_STARTERS = [
  'ME:',
  'NOBODY: ... ABSOLUTELY NOBODY:',
  'WAIT A SECOND...',
  'HOW IT STARTED vs HOW IT IS GOING',
  'MY REMAINING 2 BRAIN CELLS:',
  'SEND HELP 😭',
  'TOP 10 ANIME BETRAYALS'
];

export const MemeTextPanel: React.FC = () => {
  const {
    project,
    setTopText,
    setBottomText,
    addElement,
    selectedElement,
    updateElement
  } = useMeme();

  const isSelectedText = selectedElement && selectedElement.type === 'text';
  const currentTextElem = isSelectedText ? (selectedElement as TextElement) : null;

  const handleAddFloatingText = (defaultContent = 'DOUBLE CLICK TO EDIT') => {
    const newText: TextElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      text: defaultContent,
      x: 50,
      y: 50,
      width: 280,
      height: 60,
      rotation: 0,
      scale: 1,
      opacity: 1,
      zIndex: project.elements.length + 1,
      fontFamily: 'Impact',
      fontSize: 48,
      fillColor: '#FFFFFF',
      strokeColor: '#000000',
      strokeWidth: 8,
      isUppercase: true,
      align: 'center'
    };
    addElement(newText);
  };

  return (
    <div className="flex flex-col gap-5 p-4 text-slate-200">
      {/* 1. Classic Top & Bottom Meme Inputs */}
      <div className="flex flex-col gap-3 p-3.5 rounded-2xl bg-dark-900 border border-dark-700/80">
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-yellow flex items-center gap-1.5">
          <span>👑</span> Classic Top &amp; Bottom Text
        </span>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-slate-400">TOP TEXT</label>
          <input
            type="text"
            value={project.topText || ''}
            onChange={(e) => setTopText(e.target.value)}
            placeholder="TOP CAPTION (ALL CAPS)"
            className="w-full px-3 py-2 rounded-xl bg-dark-800 border border-dark-700 focus:border-brand-orange text-white font-impact uppercase tracking-wide text-sm outline-none transition"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-slate-400">BOTTOM TEXT</label>
          <input
            type="text"
            value={project.bottomText || ''}
            onChange={(e) => setBottomText(e.target.value)}
            placeholder="BOTTOM CAPTION"
            className="w-full px-3 py-2 rounded-xl bg-dark-800 border border-dark-700 focus:border-brand-orange text-white font-impact uppercase tracking-wide text-sm outline-none transition"
          />
        </div>
      </div>

      {/* 2. Add Custom Floating Text Box Button */}
      <button
        onClick={() => handleAddFloatingText()}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-pink text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/20 active:scale-98 transition flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4 stroke-[3]" />
        <span>Add Floating Text Box</span>
      </button>

      {/* 3. Selected Text Properties Inspector */}
      {currentTextElem ? (
        <div className="flex flex-col gap-3.5 p-3.5 rounded-2xl bg-dark-900 border border-brand-cyan/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-brand-cyan uppercase tracking-wider flex items-center gap-1.5">
              <span>✍️</span> Edit Selected Text
            </span>
            <button
              onClick={() => updateElement(currentTextElem.id, { isUppercase: !currentTextElem.isUppercase })}
              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                currentTextElem.isUppercase ? 'bg-brand-cyan text-slate-950' : 'bg-dark-800 text-slate-400'
              }`}
            >
              UPPERCASE
            </button>
          </div>

          {/* Text Content Area */}
          <textarea
            value={currentTextElem.text}
            onChange={(e) => updateElement(currentTextElem.id, { text: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 rounded-xl bg-dark-800 border border-dark-700 focus:border-brand-cyan text-white text-sm outline-none transition resize-none"
          />

          {/* Font Family Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400">FONT FAMILY</label>
            <select
              value={currentTextElem.fontFamily}
              onChange={(e) => updateElement(currentTextElem.id, { fontFamily: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-dark-800 border border-dark-700 text-white text-xs outline-none cursor-pointer"
            >
              {FONTS.map((f) => (
                <option key={f.family} value={f.family}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[11px] font-bold text-slate-400">
              <span>FONT SIZE</span>
              <span className="text-brand-cyan">{currentTextElem.fontSize}px</span>
            </div>
            <input
              type="range"
              min={20}
              max={120}
              value={currentTextElem.fontSize}
              onChange={(e) => updateElement(currentTextElem.id, { fontSize: Number(e.target.value) })}
              className="accent-brand-cyan cursor-pointer"
            />
          </div>

          {/* Text Alignment */}
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-bold text-slate-400 flex-1">ALIGN</label>
            <div className="flex bg-dark-800 rounded-xl p-0.5 border border-dark-700">
              <button
                onClick={() => updateElement(currentTextElem.id, { align: 'left' })}
                className={`p-1.5 rounded-lg ${currentTextElem.align === 'left' ? 'bg-brand-cyan text-slate-950' : 'text-slate-400'}`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => updateElement(currentTextElem.id, { align: 'center' })}
                className={`p-1.5 rounded-lg ${currentTextElem.align === 'center' ? 'bg-brand-cyan text-slate-950' : 'text-slate-400'}`}
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => updateElement(currentTextElem.id, { align: 'right' })}
                className={`p-1.5 rounded-lg ${currentTextElem.align === 'right' ? 'bg-brand-cyan text-slate-950' : 'text-slate-400'}`}
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Text Fill Color */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400">TEXT COLOR</label>
            <div className="flex flex-wrap items-center gap-1.5">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color}
                  onClick={() => updateElement(currentTextElem.id, { fillColor: color })}
                  style={{ backgroundColor: color }}
                  className={`w-6 h-6 rounded-full border-2 transition ${
                    currentTextElem.fillColor === color ? 'border-white scale-110 shadow-md' : 'border-transparent'
                  }`}
                />
              ))}
              <input
                type="color"
                value={currentTextElem.fillColor}
                onChange={(e) => updateElement(currentTextElem.id, { fillColor: e.target.value })}
                className="w-6 h-6 rounded-full bg-transparent border-0 cursor-pointer"
                title="Custom color"
              />
            </div>
          </div>

          {/* Text Outline Stroke Width */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[11px] font-bold text-slate-400">
              <span>OUTLINE STROKE</span>
              <span>{currentTextElem.strokeWidth}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={24}
              value={currentTextElem.strokeWidth}
              onChange={(e) => updateElement(currentTextElem.id, { strokeWidth: Number(e.target.value) })}
              className="accent-brand-cyan cursor-pointer"
            />
          </div>

          {/* Outline Color */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400">OUTLINE COLOR</label>
            <div className="flex items-center gap-1.5">
              {['#000000', '#FFFFFF', '#FFDD00', '#FF5722', '#9333EA'].map((color) => (
                <button
                  key={color}
                  onClick={() => updateElement(currentTextElem.id, { strokeColor: color })}
                  style={{ backgroundColor: color }}
                  className={`w-5 h-5 rounded-full border transition ${
                    currentTextElem.strokeColor === color ? 'border-brand-cyan scale-110' : 'border-dark-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* 4. Quick Starter Templates */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          💡 Quick Meme Text Starters
        </label>
        <div className="flex flex-col gap-1.5">
          {QUICK_TEXT_STARTERS.map((starter) => (
            <button
              key={starter}
              onClick={() => handleAddFloatingText(starter)}
              className="px-3 py-2 rounded-xl bg-dark-900/80 hover:bg-dark-800 text-slate-300 hover:text-white border border-dark-700/80 text-left text-xs font-semibold transition truncate"
            >
              + "{starter}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
