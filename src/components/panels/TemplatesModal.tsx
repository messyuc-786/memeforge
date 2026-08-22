import React, { useState } from 'react';
import { X, Search, LayoutTemplate, Zap } from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { MEME_TEMPLATES } from '../../data/templatesData';
import { MemeTemplate } from '../../types';

export const TemplatesModal: React.FC = () => {
  const { isTemplatesModalOpen, setIsTemplatesModalOpen, loadTemplate, setToolMode } = useMeme();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  if (!isTemplatesModalOpen) return null;

  const categories = [
    'All',
    'Reaction',
    'Work',
    'School',
    'Relationships',
    'Money',
    'Gaming',
    'Everyday Life'
  ];

  const filtered = MEME_TEMPLATES.filter((t) => {
    const matchesCat = activeCategory === 'All' || t.category === activeCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleSelectTemplate = (template: MemeTemplate) => {
    loadTemplate(template);
    setIsTemplatesModalOpen(false);
    setToolMode('meme');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl max-h-[88vh] rounded-3xl bg-dark-900 border border-dark-700 shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-purple/15 text-brand-purple">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black font-anton uppercase tracking-wide text-slate-100">
                Meme Templates Library
              </h2>
              <p className="text-xs text-slate-400">Choose an iconic starter template to remix</p>
            </div>
          </div>

          <button
            onClick={() => setIsTemplatesModalOpen(false)}
            className="p-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 border-b border-dark-800 flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full sm:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates (e.g. drake, doge)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-dark-800 border border-dark-700 focus:border-brand-purple text-white text-xs outline-none transition"
            />
          </div>

          <div className="w-full flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  activeCategory === c
                    ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/20'
                    : 'bg-dark-800 hover:bg-dark-700 text-slate-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectTemplate(item)}
              className="p-3 rounded-2xl bg-dark-850 border border-dark-700/80 hover:border-brand-purple/60 transition group cursor-pointer flex flex-col gap-2.5 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-purple/10"
            >
              <div className="w-full aspect-square rounded-xl bg-dark-950 overflow-hidden border border-dark-800 flex items-center justify-center p-2 relative">
                <img
                  src={item.previewUrl}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-brand-purple/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-xl bg-brand-purple text-white text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-lg">
                    <Zap className="w-3.5 h-3.5" /> Use Template
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-extrabold text-xs text-slate-100 truncate group-hover:text-brand-purple transition-colors">
                    {item.title}
                  </span>
                  <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-dark-800 text-slate-400">
                    {item.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 italic line-clamp-1">
                  "{item.defaultTopText || item.defaultBottomText}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
