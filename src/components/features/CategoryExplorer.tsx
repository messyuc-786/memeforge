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
    setTimeout(() => {
      const el = document.getElementById('meme-universe-results');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const categoryCounts: Record<string, string> = {
    trending: '28.4K memes',
    'ai-memes': '12.8K memes',
    'movies-tv': '18.7K memes',
    cricket: '15.3K memes',
    bollywood: '14.2K memes',
    gaming: '16.1K memes',
    office: '21.9K memes',
    relationships: '11.6K memes',
    animals: '17.4K memes',
    'desi-memes': '22.7K memes'
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Section Header matching Reference */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl text-amber-500">✨</span>
            <h2 className="text-xl sm:text-2xl font-black font-anton uppercase tracking-wide text-slate-900">
              EXPLORE THE MEME UNIVERSE
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">
            Multiple memes. Multiple vibes.
          </p>
        </div>

        <button
          onClick={() => {
            soundService.playPop();
            setIsTemplatesModalOpen(true);
          }}
          className="text-xs font-black text-slate-700 hover:text-pink-600 flex items-center gap-1 transition"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Categories Row matching Reference Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-11 gap-2.5">
        {MEME_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-950 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-pink-500 transition-all duration-300 cursor-pointer flex flex-col justify-end p-2 text-white hover:-translate-y-1"
          >
            {/* Background Visual Image */}
            <img
              src={cat.imageUrl}
              alt={cat.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Dark Gradient Overlay for Crisp Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

            {/* Content Info */}
            <div className="relative z-10 flex flex-col">
              <span className="text-xs font-black text-white group-hover:text-pink-400 transition-colors truncate">
                {cat.emoji} {cat.title}
              </span>
              <span className="text-[9px] font-bold text-slate-300/80">
                {categoryCounts[cat.id] || '10K+ memes'}
              </span>
            </div>
          </div>
        ))}

        {/* View All Card */}
        <div
          onClick={() => {
            soundService.playPop();
            setIsTemplatesModalOpen(true);
          }}
          className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-2 text-center hover:-translate-y-1"
        >
          <div className="w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <span className="text-xs">:::</span>
          </div>
          <span className="text-[11px] font-black text-slate-900 uppercase tracking-wider leading-tight">
            View All
          </span>
          <span className="text-xs text-purple-600 font-bold">→</span>
        </div>
      </div>
    </section>
  );
};
