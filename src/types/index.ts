export type ToolMode =
  | 'meme'
  | 'cartoon'
  | 'bubble'
  | 'roast'
  | 'ai'
  | 'stickers'
  | 'filters'
  | 'draw'
  | 'templates'
  | 'layers';

export type AppView = 
  | 'home' 
  | 'studio' 
  | 'video' 
  | 'trends' 
  | 'templates' 
  | 'community' 
  | 'personalize' 
  | 'desi';

export type AspectRatioType = '1:1' | '9:16' | '16:9' | '4:5' | '4:3' | 'custom';

export type CartoonStyleType = 
  | 'cute' 
  | 'comic' 
  | 'pixar' 
  | 'sketch' 
  | 'crazy' 
  | 'anime';

export type RoastLevelType = 'friendly' | 'savage' | 'brutal';

export type BubbleStyleType = 
  | 'comic' 
  | 'thought' 
  | 'shout' 
  | 'whisper' 
  | 'chat' 
  | 'boom';

export type MemeTone = 
  | 'relatable' 
  | 'savage' 
  | 'unhinged' 
  | 'clever' 
  | 'wholesome' 
  | 'desi' 
  | 'absurd'
  | 'corporate'
  | 'genz';

export interface BaseElement {
  id: string;
  x: number; // center x in percentage or absolute px relative to canvas
  y: number; // center y
  width: number;
  height: number;
  rotation: number; // in degrees
  scale: number;
  opacity: number;
  zIndex: number;
  isLocked?: boolean;
}

export interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  fontFamily: string;
  fontSize: number;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  shadowColor?: string;
  shadowBlur?: number;
  backgroundColor?: string;
  backgroundPadding?: number;
  backgroundBorderRadius?: number;
  isUppercase: boolean;
  align: 'left' | 'center' | 'right';
  letterSpacing?: number;
  isCurved?: boolean;
  curveRadius?: number;
}

export interface SpeechBubbleElement extends BaseElement {
  type: 'bubble';
  text: string;
  bubbleStyle: BubbleStyleType;
  fontFamily: string;
  fontSize: number;
  textColor: string;
  bubbleColor: string;
  borderColor: string;
  borderWidth: number;
  tailX: number;
  tailY: number;
  padding: number;
}

export interface StickerElement extends BaseElement {
  type: 'sticker';
  stickerId: string;
  src: string;
  name: string;
  category: string;
  fontSize?: number;
}

export interface DrawPoint {
  x: number;
  y: number;
}

export interface DrawPath {
  id: string;
  points: DrawPoint[];
  color: string;
  width: number;
  neonGlow: boolean;
  isEraser?: boolean;
}

export type CanvasElement = TextElement | SpeechBubbleElement | StickerElement;

export interface FilterSettings {
  filterPreset: 'none' | 'vintage' | 'deepfry' | 'comic' | 'pixar' | 'sketch' | 'anime' | 'glitch' | 'noir' | 'sepia' | 'cyberpunk' | 'crazy';
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  noise: number;
  hueRotate: number;
  invert: boolean;
}

export interface MemeProject {
  id: string;
  name: string;
  timestamp: number;
  canvasWidth: number;
  canvasHeight: number;
  aspectRatio: AspectRatioType;
  backgroundImageUrl: string | null;
  backgroundColor: string;
  elements: CanvasElement[];
  drawPaths: DrawPath[];
  filters: FilterSettings;
  cartoonStyle?: CartoonStyleType | null;
  watermark: boolean;
  topText?: string;
  bottomText?: string;
}

export interface MemeTemplate {
  id: string;
  title: string;
  category: 'Reaction' | 'Work' | 'School' | 'Relationships' | 'Money' | 'Gaming' | 'Everyday Life' | 'Classic' | 'Desi' | 'Gen Z';
  previewUrl: string;
  aspectRatio: AspectRatioType;
  defaultTopText?: string;
  defaultBottomText?: string;
  defaultElements?: Partial<CanvasElement>[];
  tags: string[];
}

export interface MemeDNA {
  emotion: string;
  tone: string;
  audience: string;
  topic: string;
  format: string;
  energyLevel: string; // e.g. '🔥🔥🔥🔥 High Energy'
  shareability: 'Very High' | 'High' | 'Medium';
}

export interface CreativeScoreBreakdown {
  hook: number; // 0-100
  relatability: number;
  timing: number;
  caption: number;
  visual: number;
  shareability: number;
}

export interface CreativeScore {
  totalScore: number; // 0-100
  ratingLabel: 'Legendary Dank' | 'Viral Tier' | 'High Impact' | 'Solid Meme';
  breakdown: CreativeScoreBreakdown;
  suggestions: string[];
}

export interface GeneratedMemeConcept {
  id: string;
  originalIdea: string;
  tone: MemeTone;
  toneLabel: string;
  toneEmoji: string;
  topText: string;
  bottomText: string;
  fullCaption: string;
  templateId: string;
  templateTitle: string;
  templatePreviewUrl: string;
  aspectRatio: AspectRatioType;
  platformTarget: 'Instagram' | 'YouTube Shorts' | 'Facebook' | 'X / Twitter' | 'WhatsApp' | 'Reddit' | 'Universal';
  dna: MemeDNA;
  creativeScore: CreativeScore;
  isDesi?: boolean;
}

export interface ContentUniversePack {
  idea: string;
  timestamp: number;
  classicMeme: GeneratedMemeConcept;
  relatableMeme: GeneratedMemeConcept;
  savageMeme: GeneratedMemeConcept;
  desiMeme: GeneratedMemeConcept;
  corporateMeme: GeneratedMemeConcept;
  absurdMeme: GeneratedMemeConcept;
  videoReelPrompt: {
    hook: string;
    caption: string;
    suggestedAudio: string;
    format: '9:16';
  };
  socialPosts: {
    instagramCaption: string;
    xTweetText: string;
    whatsappOneLiner: string;
    hashtags: string[];
  };
}

export interface TrendTopic {
  id: string;
  title: string;
  category: 'Trending' | 'AI' | 'Gaming' | 'Sports' | 'Movies' | 'Work' | 'Tech' | 'India' | 'Gen Z';
  sampleIdea: string;
  volume: string;
  badgeEmoji: string;
  isHot: boolean;
}

export interface CommunityMemePost {
  id: string;
  title: string;
  creatorName: string;
  creatorAvatar: string;
  likes: number;
  remixesCount: number;
  templateId: string;
  previewUrl: string;
  topText: string;
  bottomText: string;
  tags: string[];
  isFeatured?: boolean;
  timestamp: number;
}

export interface VideoMemeProject {
  id: string;
  videoUrl: string | null;
  videoFileName: string;
  duration: number;
  trimStart: number;
  trimEnd: number;
  playbackRate: number;
  aspectRatio: '9:16' | '1:1' | '16:9';
  isMuted: boolean;
  isLooping: boolean;
  topBannerText: string;
  bottomBannerText: string;
  textColor: string;
  bannerBgColor: string;
  fontSize: number;
}

export interface RoastResult {
  id: string;
  roast: string;
  level: RoastLevelType;
  punchline: string;
}

export interface AICaptionResult {
  id: string;
  topText: string;
  bottomText: string;
  fullCaption: string;
  category: string;
}
