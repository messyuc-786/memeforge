import React, { useState, useRef } from 'react';
import { Search, Upload, Plus, Smile, Sparkles } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { STICKER_CATEGORIES, STICKERS_DATA, StickerItem } from '../../data/stickersData';
import { StickerElement } from '../../types';

export const StickersPanel: React.FC = () => {
  const { project, addElement } = useMeme();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const customUploadRef = useRef<HTMLInputElement | null>(null);

  const filteredStickers = STICKERS_DATA.filter((s) => {
    const matchesCat = activeCategory === 'All' || s.category === activeCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddSticker = (item: StickerItem) => {
    const newSticker: StickerElement = {
      id: `sticker-${Date.now()}`,
      type: 'sticker',
      stickerId: item.id,
      src: item.src,
      name: item.name,
      category: item.category,
      x: 50,
      y: 50,
      width: item.isEmoji ? 80 : 140,
      height: item.isEmoji ? 80 : 90,
      rotation: 0,
      scale: 1,
      opacity: 1,
      zIndex: project.elements.length + 1
    };
    addElement(newSticker);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const customSticker: StickerElement = {
          id: `custom-sticker-${Date.now()}`,
          type: 'sticker',
          stickerId: 'custom',
          src: dataUrl,
          name: file.name,
          category: 'Custom Upload',
          x: 50,
          y: 50,
          width: 150,
          height: 150,
          rotation: 0,
          scale: 1,
          opacity: 1,
          zIndex: project.elements.length + 1
        };
        addElement(customSticker);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="flex flex-col gap-4 p-4 text-slate-200">
      {/* Search & Custom Upload */}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stickers, badges, emojis..."
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-dark-900 border border-dark-700 focus:border-brand-pink text-white text-xs outline-none transition"
          />
        </div>

        <button
          onClick={() => customUploadRef.current?.click()}
          title="Upload custom sticker image"
          className="p-2 rounded-xl bg-dark-800 hover:bg-brand-pink hover:text-white border border-dark-700 text-slate-300 transition flex items-center gap-1.5 text-xs font-bold whitespace-nowrap"
        >
          <Upload className="w-4 h-4 text-brand-pink" />
          <span className="hidden sm:inline">Upload</span>
        </button>
        <input
          ref={customUploadRef}
          type="file"
          accept="image/*"
          onChange={handleCustomUpload}
          className="hidden"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {STICKER_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-brand-pink text-white shadow-md shadow-brand-pink/20'
                : 'bg-dark-900 hover:bg-dark-800 text-slate-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stickers Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-[440px] overflow-y-auto pr-1">
        {filteredStickers.map((item) => (
          <button
            key={item.id}
            onClick={() => handleAddSticker(item)}
            className="aspect-square p-2 rounded-2xl bg-dark-900 hover:bg-dark-850 border border-dark-700/80 hover:border-brand-pink/60 transition flex flex-col items-center justify-center gap-1 group shadow-sm hover:scale-105 active:scale-95 relative overflow-hidden"
          >
            {item.isEmoji ? (
              <span className="text-3xl group-hover:scale-125 transition-transform">{item.src}</span>
            ) : (
              <img
                src={item.src}
                alt={item.name}
                className="max-w-[85%] max-h-[85%] object-contain group-hover:scale-110 transition-transform"
              />
            )}
            <span className="text-[10px] text-slate-400 font-bold truncate max-w-full text-center group-hover:text-white transition-colors">
              {item.name}
            </span>
          </button>
        ))}
      </div>

      {filteredStickers.length === 0 && (
        <div className="py-10 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
          <span>🔍</span>
          <p>No stickers match your search query.</p>
        </div>
      )}
    </div>
  );
};
