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
    <section className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl text-pink-400">✨</span>
            <h2 className="text-xl sm:text-2xl font-black font-anton uppercase tracking-wide text-white flex items-center gap-2">
              <span>EXPLORE THE MEME UNIVERSE</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            Discover hilarious meme destinations across cosmic internet culture
          </p>
        </div>

        <button
          onClick={() => {
            soundService.playPop();
            setIsTemplatesModalOpen(true);
          }}
          className="text-xs font-black text-pink-400 hover:text-cyan-300 flex items-center gap-1 transition"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Cosmic Categories Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-11 gap-2.5">
        {MEME_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-[#0c0922] border border-purple-500/30 shadow-md hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:border-pink-500 transition-all duration-300 cursor-pointer flex flex-col justify-end p-2.5 text-white hover:-translate-y-1"
          >
            {/* Background Visual Image */}
            <img
              src={cat.imageUrl}
              alt={cat.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05040e] via-[#05040e]/60 to-transparent" />

            {/* Content Info */}
            <div className="relative z-10 flex flex-col">
              <span className="text-xs font-black text-white group-hover:text-pink-400 transition-colors truncate">
                {cat.emoji} {cat.title}
              </span>
              <span className="text-[9px] font-bold text-slate-300/80 font-mono">
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
          className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-purple-900/60 to-indigo-950/80 border border-purple-500/40 shadow-md hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:border-purple-400 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-2 text-center hover:-translate-y-1 backdrop-blur-md"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-lg">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-black text-white uppercase tracking-wider leading-tight">
            View All
          </span>
          <span className="text-xs text-pink-400 font-bold">100+ →</span>
        </div>
      </div>
    </section>
  );
};
