import React from 'react';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';
import { MEME_CATEGORIES, MemeCategoryItem } from '../../data/categoriesData';
import { useMeme } from '../../context/MemeContext';
import { soundService } from '../../services/soundService';

export const CategoryExplorer: React.FC = () => {
  const { setActiveIdea, generateUniverse, setIsTemplatesModalOpen } = useMeme();

  const handleCategoryClick = (cat: MemeCategoryItem) => {
    soundService.playPop();
    const defaultPrompts: Record<string, string> = {
      trending: 'When something goes viral overnight and nobody knows why',
      'ai-memes': 'AI replacing my job vs me asking AI how to exit vim',
      'movies-tv': 'Watching a 3-hour movie vs 3 hours of short videos',
      cricket: 'When India needs 4 runs off the last ball in the final',
      bollywood: 'Entering the office on Monday with slow-motion background music',
      gaming: 'Saying "last match before bed" at 4:30 AM',
      office: 'When the meeting could have easily been an email',
      relationships: 'When they say "I am not hungry" and eat all your fries',
      animals: 'My cat watching me drop a glass on the floor in 4K',
      'desi-memes': 'Sharma Ji Ka Beta getting 99.9% while I get scolded'
    };

    const prompt = defaultPrompts[cat.id] || `Funny meme about ${cat.title}`;
    setActiveIdea(prompt);
    generateUniverse(prompt, 'relatable');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h2 className="text-xl sm:text-2xl font-black font-anton uppercase tracking-wide text-slate-900">
              EXPLORE BY CATEGORY
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">
            Find your meme universe across internet culture
          </p>
        </div>

        <button
          onClick={() => {
            soundService.playPop();
            setIsTemplatesModalOpen(true);
          }}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider transition shadow-sm"
        >
          <span>View All 100+</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Categories Grid (with horizontal scroll on mobile) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {MEME_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-brand-pink transition-all duration-300 cursor-pointer flex flex-col justify-end p-3 hover:-translate-y-1"
          >
            {/* Background Visual Image */}
            <img
              src={cat.imageUrl}
              alt={cat.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Dark Gradient Overlay for Crisp Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

            {/* Content Info */}
            <div className="relative z-10 flex flex-col">
              <span className="text-[10px] font-black uppercase text-brand-yellow/90 tracking-wider">
                {cat.tag}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-white group-hover:text-brand-pink transition-colors">
                  {cat.emoji} {cat.title}
                </span>
                <span className="text-xs text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* View All Pill Card */}
        <div
          onClick={() => {
            soundService.playPop();
            setIsTemplatesModalOpen(true);
          }}
          className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-purple-900 to-slate-900 border border-purple-500/40 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-3 text-center hover:-translate-y-1"
        >
          <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🎨</span>
          <span className="text-xs font-black text-white uppercase tracking-wider">
            All Templates
          </span>
          <span className="text-[10px] text-purple-300 font-bold mt-0.5">
            100+ Formats →
          </span>
        </div>
      </div>
    </section>
  );
};
