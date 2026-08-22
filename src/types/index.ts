export type ToolMode = 
  | 'meme' 
  | 'cartoon' 
  | 'bubble' 
  | 'roast' 
  | 'ai' 
  | 'stickers' 
  | 'filters' 
  | 'draw' 
  | 'templates';

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
  tailX: number; // relative tail tip coordinate
  tailY: number;
  padding: number;
}

export interface StickerElement extends BaseElement {
  type: 'sticker';
  stickerId: string;
  src: string; // SVG or image URL / data URL
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
  brightness: number; // -100 to 100 (0 default)
  contrast: number;   // -100 to 100 (0 default)
  saturation: number; // -100 to 100 (0 default)
  blur: number;       // 0 to 20 (0 default)
  noise: number;      // 0 to 100 (0 default)
  hueRotate: number;  // 0 to 360 (0 default)
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
  category: 'Reaction' | 'Work' | 'School' | 'Relationships' | 'Money' | 'Gaming' | 'Everyday Life' | 'Classic';
  previewUrl: string;
  aspectRatio: AspectRatioType;
  defaultTopText?: string;
  defaultBottomText?: string;
  defaultElements?: Partial<CanvasElement>[];
  tags: string[];
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
