import React, { useState } from 'react';
import { Flame, TrendingUp, Sparkles, Zap, ArrowRight, ChevronLeft, ChevronRight, Radio } from 'lucide-react';
import { TRENDS_DATA } from '../../data/trendsData';
import { useMeme } from '../../context/MemeContext';
import { soundService } from '../../services/soundService';

export const TrendsSection: React.FC = () => {
  const { setActiveIdea, generateUniverse, setCurrentView } = useMeme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'India', 'Global', 'Gaming', 'Movies', 'Sports', 'Tech'];

  const trendingPills = [
    {
      id: 'ipl',
      title: 'IPL 2024 Final',
      volume: '12.8K memes',
      sampleIdea: 'RCB fans calculating the exact mathematical scenario for qualification',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=150&q=80',
      category: 'Sports'
    },
    {
      id: 'ai-taking-over',
      title: 'AI Taking Over',
      volume: '9.4K memes',
      sampleIdea: 'AI generating complex quantum physics vs AI generating a hands with 12 fingers',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
      category: 'Tech'
    },
    {
      id: 'monday-blues',
      title: 'Monday Blues',
      volume: '18.2K memes',
      sampleIdea: 'Me opening my laptop on Monday morning pretending I remember what my job is',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      category: 'Global'
    },
    {
      id: 'ott-weekend',
      title: 'OTT Weekend',
      volume: '7.9K memes',
      sampleIdea: 'Spending 45 minutes looking for a movie on Netflix to end up falling asleep',
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
      category: 'Movies'
    },
    {
      id: 'wfh',
      title: 'Work From Home',
      volume: '14.6K memes',
      sampleIdea: 'Wearing a formal shirt on Zoom call with pajama bottoms on',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      category: 'India'
    },
    {
      id: 'fuel-prices',
      title: 'Fuel Prices',
      volume: '8.1K memes',
      sampleIdea: 'My car running on 0.001% fuel as I pray to reach the petrol pump',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      category: 'India'
    },
    {
      id: 'shaadi-season',
      title: 'Relatives & Shaadi',
      volume: '11.3K memes',
      sampleIdea: 'Relatives asking beta aage ka kya plan hai during wedding dinner',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      category: 'India'
    },
    {
      id: 'college-exams',
      title: 'College Exams',
      volume: '9.7K memes',
      sampleIdea: 'Finishing the entire syllabus the night before the final exam at 4 AM',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
      category: 'Global'
    }
  ];

  const filtered = selectedCategory === 'All'
    ? trendingPills
    : trendingPills.filter((p) => p.category === selectedCategory || selectedCategory === 'India');

  const handleCreateFromTrend = (sampleIdea: string) => {
    soundService.playVineBoom();
    setActiveIdea(sampleIdea);
    generateUniverse(sampleIdea, 'relatable');
    setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById('meme-universe-results');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-pink-400 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-black font-anton uppercase tracking-wide text-white">
              TRENDING NOW
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            Live cultural signals travelling through the Meme Universe
          </p>
        </div>

        {/* Filter Pills + Left/Right arrows */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                soundService.playPop();
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] border border-pink-300'
                  : 'bg-[#120e2e]/80 text-slate-300 border border-purple-500/30 hover:bg-[#1a1442]'
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="hidden sm:flex items-center gap-1 ml-2">
            <button className="p-1 rounded-full bg-[#151035] border border-purple-500/30 text-slate-300 hover:bg-purple-900/60 transition">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 rounded-full bg-[#151035] border border-purple-500/30 text-slate-300 hover:bg-purple-900/60 transition">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Cosmic Signal Trend Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {filtered.map((trend) => (
          <div
            key={trend.id}
            onClick={() => handleCreateFromTrend(trend.sampleIdea)}
            className="group relative rounded-2xl bg-[#0c0922] border border-purple-500/30 p-2 shadow-sm hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:border-pink-500/80 transition-all duration-200 cursor-pointer flex flex-col gap-2 hover:-translate-y-0.5"
          >
            <div className="w-full aspect-video rounded-xl bg-slate-950 overflow-hidden relative border border-purple-500/20">
              <img
                src={trend.image}
                alt={trend.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-extrabold text-slate-200 truncate group-hover:text-pink-400 transition-colors">
                {trend.title}
              </span>
              <span className="text-[10px] text-slate-400 font-bold font-mono">
                {trend.volume}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
