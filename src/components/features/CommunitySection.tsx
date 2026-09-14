import React, { useState } from 'react';
import { Heart, RefreshCw } from 'lucide-react';
import { COMMUNITY_POSTS } from '../../data/communityData';
import { useMeme } from '../../context/MemeContext';
import { soundService } from '../../services/soundService';

export const CommunitySection: React.FC = () => {
  const { setTopText, setBottomText, setCurrentView, setToolMode } = useMeme();
  // Local-only "like" toggle — not a shared/real engagement count, just a lightweight reaction.
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    soundService.playPop();
    setUserLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRemixPost = (post: typeof COMMUNITY_POSTS[0]) => {
    soundService.playSparkle();
    setTopText(post.topText);
    setBottomText(post.bottomText);
    setToolMode('meme');
    setCurrentView('studio');
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌐</span>
            <h2 className="text-3xl font-black font-anton uppercase tracking-wide text-slate-100">
              THE FORGE
            </h2>
          </div>
          <p className="text-xs text-slate-300 font-semibold">
            Discover meme starters, remix them, and share your own version.
          </p>
        </div>

        {/* Honest content label — no fabricated live activity numbers */}
        <span className="px-3 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10 text-[11px] font-bold uppercase tracking-wide">
          Curated demo posts
        </span>
      </div>

      {/* Community Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COMMUNITY_POSTS.map((post) => {
          const isLiked = userLiked[post.id] ?? false;

          return (
            <div
              key={post.id}
              className="p-4 rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-dark-700/80 hover:border-brand-pink/70 transition-all duration-300 flex flex-col justify-between gap-3 shadow-lg group"
            >
              {/* Meme Viewport — the meme is the focus, not a creator profile */}
              <div className="w-full aspect-square rounded-2xl bg-dark-950 border border-dark-800 p-2 flex items-center justify-center overflow-hidden">
                <img
                  src={post.previewUrl}
                  alt={post.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Captions */}
              <div className="flex flex-col gap-0.5">
                <p className="text-xs font-black text-slate-100 line-clamp-1">{post.topText}</p>
                <p className="text-[11px] text-slate-400 line-clamp-1 italic">{post.bottomText}</p>
              </div>

              {/* Actions — react locally, remix for real */}
              <div className="flex items-center justify-between pt-2 border-t border-dark-800">
                <button
                  onClick={() => handleLike(post.id)}
                  title="React (just for you — not a shared count)"
                  className={`min-h-[36px] flex items-center gap-1.5 px-2 text-xs font-bold transition rounded-lg ${
                    isLiked ? 'text-brand-pink' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-brand-pink' : ''}`} />
                </button>

                <button
                  onClick={() => handleRemixPost(post)}
                  className="min-h-[36px] px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-brand-pink hover:text-white text-slate-200 text-[11px] font-black uppercase transition flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Remix</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
