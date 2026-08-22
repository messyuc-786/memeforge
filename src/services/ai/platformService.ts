import { AspectRatioType } from '../../types';

export interface PlatformPresetInfo {
  name: string;
  icon: string;
  recommendedRatio: AspectRatioType;
  dimensions: { width: number; height: number };
  safeZoneNote: string;
  captionLengthTip: string;
  maxFileSize: string;
  popularHashtags: string[];
}

export const PLATFORM_PRESETS: PlatformPresetInfo[] = [
  {
    name: 'YouTube Shorts',
    icon: '▶️',
    recommendedRatio: '9:16',
    dimensions: { width: 1080, height: 1920 },
    safeZoneNote: 'Keep meme text in upper 75% so YouTube title and like buttons do not obscure the punchline.',
    captionLengthTip: 'High-contrast hook title that stops the infinite scroll.',
    maxFileSize: '50 MB',
    popularHashtags: ['#Shorts', '#MemeShorts', '#Viral', '#YouTubeMemes', '#Funny']
  },
  {
    name: 'Instagram Reels & Posts',
    icon: '📸',
    recommendedRatio: '9:16',
    dimensions: { width: 1080, height: 1920 },
    safeZoneNote: 'Keep meme text within central 80% to avoid bottom caption buttons.',
    captionLengthTip: '1-2 snappy lines + 3 targeted viral hashtags.',
    maxFileSize: '50 MB',
    popularHashtags: ['#reels', '#viralmemes', '#relatable', '#memestagram', '#comedy']
  },
  {
    name: 'Facebook Feed & Groups',
    icon: '👥',
    recommendedRatio: '1:1',
    dimensions: { width: 1080, height: 1080 },
    safeZoneNote: 'Square format maximizes organic reach in group shares and newsfeeds.',
    captionLengthTip: 'Relatable question that triggers comments and shares with friends.',
    maxFileSize: '25 MB',
    popularHashtags: ['#FacebookMemes', '#TrendingMemes', '#RelatablePost', '#Humor']
  },
  {
    name: 'X / Twitter',
    icon: '💬',
    recommendedRatio: '16:9',
    dimensions: { width: 1920, height: 1080 },
    safeZoneNote: 'Horizontal landscape cards display without cropping on timeline feeds.',
    captionLengthTip: 'Keep tweet under 120 characters with high punchline contrast.',
    maxFileSize: '5 MB',
    popularHashtags: ['#MemeTwitter', '#Trending', '#DankMemes']
  },
  {
    name: 'WhatsApp Status / Chat',
    icon: '🟢',
    recommendedRatio: '1:1',
    dimensions: { width: 1080, height: 1080 },
    safeZoneNote: 'Compact size for instant tap-to-view in group chats without data lag.',
    captionLengthTip: 'One-liner joke that triggers instant laughing emojis.',
    maxFileSize: '2 MB',
    popularHashtags: ['#WhatsAppMemes', '#DesiHumor', '#BhaiScene']
  },
  {
    name: 'Reddit',
    icon: '👽',
    recommendedRatio: '1:1',
    dimensions: { width: 1080, height: 1080 },
    safeZoneNote: 'High resolution images rank highest on r/memes and r/dankmemes.',
    captionLengthTip: 'Clever title that acts as the setup for the meme punchline.',
    maxFileSize: '20 MB',
    popularHashtags: ['r/memes', 'r/dankmemes', 'r/me_irl']
  }
];
