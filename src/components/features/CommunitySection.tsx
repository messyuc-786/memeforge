import React, { useState } from 'react';
import { Users, Heart, RefreshCw, Sparkles, Edit3, MessageCircle } from 'lucide-react';
import { COMMUNITY_POSTS } from '../../data/communityData';
import { useMeme } from '../../context/MemeContext';
import { soundService } from '../../services/soundService';

export const CommunitySection: React.FC = () => {
  const { loadTemplate, setTopText, setBottomText, setCurrentView, setToolMode } = useMeme();
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});

  const handleLike = (id: string, initialLikes: number) => {
    soundService.playPop();
    const current = likesMap[id] ?? initialLikes;
    const isLiked = userLiked[id] ?? false;

    if (isLiked) {
      setLikesMap((prev) => ({ ...prev, [id]: current - 1 }));
      setUserLiked((prev) => ({ ...prev, [id]: false }));
    } else {
      setLikesMap((prev) => ({ ...prev, [id]: current + 1 }));
      setUserLiked((prev) => ({ ...prev, [id]: true }));
    }
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
              MEMEFORGE COMMUNITY FEED
            </h2>
          </div>
          <p className="text-xs text-slate-300 font-semibold">
            Trending creations from global memers. Like, remix, and forge your own version!
          </p>
        </div>

        {/* Status Badge */}
        <span className="px-3 py-1 rounded-full bg-brand-pink/20 text-brand-pink border border-brand-pink/40 text-xs font-black uppercase tracking-wider">
          ⭐ 14.8K Memes Forged Today
        </span>
      </div>

      {/* Community Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COMMUNITY_POSTS.map((post) => {
          const likesCount = likesMap[post.id] ?? post.likes;
          const isLiked = userLiked[post.id] ?? false;

          return (
            <div
              key={post.id}
              className="p-4 rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border-2 border-dark-700/80 hover:border-brand-pink/70 transition-all duration-300 flex flex-col justify-between gap-3 shadow-lg group"
            >
              {/* Creator Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{post.creatorAvatar}</span>
                  <span className="text-xs font-black text-slate-200">@{post.creatorName}</span>
                </div>
                {post.isFeatured && (
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-brand-yellow text-slate-950">
                    Featured
                  </span>
                )}
              </div>

              {/* Meme Viewport */}
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

              {/* Engagement Row */}
              <div className="flex items-center justify-between pt-2 border-t border-dark-800">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLike(post.id, post.likes)}
                    className={`flex items-center gap-1 text-xs font-bold transition ${
                      isLiked ? 'text-brand-pink fill-brand-pink' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-brand-pink' : ''}`} />
                    <span>{likesCount}</span>
                  </button>

                  <span className="flex items-center gap-1 text-xs text-slate-400 font-bold">
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{post.remixesCount}</span>
                  </span>
                </div>

                <button
                  onClick={() => handleRemixPost(post)}
                  className="px-2.5 py-1 rounded-xl bg-dark-800 hover:bg-brand-pink hover:text-white text-slate-200 text-[11px] font-black uppercase transition flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
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
