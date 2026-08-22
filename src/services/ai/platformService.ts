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
    name: 'Instagram Reels / TikTok',
    icon: '📱',
    recommendedRatio: '9:16',
    dimensions: { width: 1080, height: 1920 },
    safeZoneNote: 'Keep meme text within central 80% to avoid being blocked by profile icons and caption buttons.',
    captionLengthTip: '1-2 snappy lines + 3 targeted niche hashtags.',
    maxFileSize: '50 MB',
    popularHashtags: ['#reels', '#viralmemes', '#relatable', '#fyp', '#comedy']
  },
  {
    name: 'Instagram Feed Post',
    icon: '📸',
    recommendedRatio: '1:1',
    dimensions: { width: 1080, height: 1080 },
    safeZoneNote: 'Classic square format with maximum thumbnail feed visibility.',
    captionLengthTip: 'Ask an interactive question to drive comment section debates.',
    maxFileSize: '15 MB',
    popularHashtags: ['#memesdaily', '#dankmemes', '#memestagram', '#funnyposts']
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
