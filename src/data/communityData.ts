import { CommunityMemePost } from '../types';
import { MEME_TEMPLATES } from './templatesData';

export const COMMUNITY_POSTS: CommunityMemePost[] = [
  {
    id: 'community-1',
    title: 'When the meeting could have been an email',
    creatorName: 'DankMaster99',
    creatorAvatar: '😎',
    likes: 1420,
    remixesCount: 88,
    templateId: 'this-is-fine-fire',
    previewUrl: MEME_TEMPLATES[7].previewUrl,
    topText: 'MY 47 UNREAD EMAILS AND 6 CONSECUTIVE CALLS',
    bottomText: 'THIS IS FINE ☕',
    tags: ['Work', 'Relatable', 'Corporate'],
    isFeatured: true,
    timestamp: Date.now() - 3600000 * 4
  },
  {
    id: 'community-2',
    title: 'Salary Day vs Day 4 Reality',
    creatorName: 'PaisaVasool',
    creatorAvatar: '💸',
    likes: 2890,
    remixesCount: 142,
    templateId: 'bank-account-check',
    previewUrl: MEME_TEMPLATES[10].previewUrl,
    topText: 'ME OPENING BANKING APP ON 4TH OF THE MONTH',
    bottomText: 'TOTAL AVAILABLE: $1.43 😭',
    tags: ['Broke', 'Money', 'Desi'],
    isFeatured: true,
    timestamp: Date.now() - 3600000 * 8
  },
  {
    id: 'community-3',
    title: 'Sharma Ji Ka Beta Comparison',
    creatorName: 'DesiMemer',
    creatorAvatar: '🇮🇳',
    likes: 980,
    remixesCount: 54,
    templateId: 'buff-doge-vs-cheems',
    previewUrl: MEME_TEMPLATES[2].previewUrl,
    topText: 'SHARMA JI KA BETA SCORING 99.9%',
    bottomText: 'ME WHO GUESSED EVERY OPTION: "PASS TOH HO GAYA"',
    tags: ['Indian', 'College', 'Exams'],
    isFeatured: false,
    timestamp: Date.now() - 3600000 * 12
  },
  {
    id: 'community-4',
    title: 'Debugging code at 3 AM',
    creatorName: 'BugHunter',
    creatorAvatar: '👾',
    likes: 3120,
    remixesCount: 210,
    templateId: 'coding-at-3am',
    previewUrl: MEME_TEMPLATES[11].previewUrl,
    topText: 'CODE DOES NOT WORK: WHY?',
    bottomText: 'CODE SUDDENLY WORKS: WHY??? 😭',
    tags: ['Tech', 'Coding', 'Developer'],
    isFeatured: true,
    timestamp: Date.now() - 3600000 * 16
  }
];
