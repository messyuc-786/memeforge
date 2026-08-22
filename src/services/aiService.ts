import { AICaptionResult, CartoonStyleType, RoastLevelType, RoastResult } from '../types';
import { generateCaptionsEngine, generateRoastEngine } from '../data/humorDatabase';

const STORAGE_KEY_GEMINI = 'memeforge_gemini_api_key';

export function getStoredApiKey(): string {
  return localStorage.getItem(STORAGE_KEY_GEMINI) || '';
}

export function saveStoredApiKey(apiKey: string): void {
  if (!apiKey || apiKey.trim() === '') {
    localStorage.removeItem(STORAGE_KEY_GEMINI);
  } else {
    localStorage.setItem(STORAGE_KEY_GEMINI, apiKey.trim());
  }
}

export function hasApiKeyConfigured(): boolean {
  return !!getStoredApiKey();
}

/**
 * AI Service for MemeForge
 * Seamlessly leverages Gemini API if a key is provided by the user,
 * otherwise runs the instant built-in intelligent contextual humor engine.
 */
export async function generateAICaptions(
  userContext: string,
  category: string,
  imageDescription?: string
): Promise<{ captions: AICaptionResult[]; isFromLiveAPI: boolean }> {
  const apiKey = getStoredApiKey();

  if (apiKey) {
    try {
      // Call Gemini 2.0 / 1.5 Flash via REST endpoint
      const prompt = `You are MemeForge AI, an expert meme creator and comedic viral writer.
Context / Topic: "${userContext || 'Everyday relatable life'}"
Category: "${category}"
${imageDescription ? `Image Context: "${imageDescription}"` : ''}

Generate exactly 3 hilarious, viral meme captions formatted as JSON.
Each caption must have:
- "topText": Catchy setup (in ALL CAPS, maximum 8-10 words)
- "bottomText": Hilarious punchline (in ALL CAPS, maximum 8-12 words)
- "fullCaption": Full sentence version

Return ONLY a valid JSON array of 3 objects with keys "topText", "bottomText", "fullCaption". No markdown formatting or extra text.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.9,
              responseMimeType: 'application/json'
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawJson) {
          const parsed = JSON.parse(rawJson);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const apiCaptions: AICaptionResult[] = parsed.slice(0, 3).map((item, idx) => ({
              id: `api-caption-${Date.now()}-${idx}`,
              topText: String(item.topText || '').toUpperCase(),
              bottomText: String(item.bottomText || '').toUpperCase(),
              fullCaption: String(item.fullCaption || ''),
              category: category || 'AI Generated'
            }));
            return { captions: apiCaptions, isFromLiveAPI: true };
          }
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to built-in humor engine:', err);
    }
  }

  // Built-in intelligent fallback
  // Add artificial slight latency (400ms) to feel like real AI processing
  await new Promise(r => setTimeout(r, 450));
  const captions = generateCaptionsEngine(userContext, category);
  return { captions, isFromLiveAPI: false };
}

/**
 * Generate photo roasts with selectable intensity
 */
export async function generateAIRoasts(
  level: RoastLevelType,
  topic: string
): Promise<{ roasts: RoastResult[]; isFromLiveAPI: boolean }> {
  const apiKey = getStoredApiKey();

  if (apiKey) {
    try {
      const prompt = `You are a legendary comedy roast master. Roast this photo subject playfully with intensity level: ${level.toUpperCase()}.
Subject topic: "${topic}".
Generate exactly 3 hilarious, punchy, meme-worthy burns. Keep it funny, self-deprecating or comedic, avoiding hate speech.
Return ONLY a valid JSON array of 3 strings. Example: ["roast 1", "roast 2", "roast 3"]`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.95,
              responseMimeType: 'application/json'
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawJson) {
          const parsed = JSON.parse(rawJson);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const roasts: RoastResult[] = parsed.slice(0, 3).map((text, idx) => ({
              id: `api-roast-${Date.now()}-${idx}`,
              roast: String(text),
              level,
              punchline: level === 'brutal' ? '💀 FATALITY LEVEL ROAST' : level === 'savage' ? '🔥 CERTIFIED SAVAGE' : '😇 PLAYFUL BURN'
            }));
            return { roasts, isFromLiveAPI: true };
          }
        }
      }
    } catch (err) {
      console.warn('Gemini API roast call failed, falling back to built-in database:', err);
    }
  }

  await new Promise(r => setTimeout(r, 400));
  const roasts = generateRoastEngine(level, topic);
  return { roasts, isFromLiveAPI: false };
}

/**
 * Cartoonify descriptor metadata for styles
 */
export const CARTOON_STYLES: {
  id: CartoonStyleType;
  name: string;
  emoji: string;
  description: string;
  filterPreset: 'comic' | 'pixar' | 'sketch' | 'crazy' | 'anime' | 'vintage';
  tag: string;
}[] = [
  {
    id: 'cute',
    name: 'Cute Cartoon',
    emoji: '🧸',
    description: 'Soft vibrant pastel tones, smooth contours & warm sunny glow',
    filterPreset: 'pixar',
    tag: 'PASTEL GLOW'
  },
  {
    id: 'comic',
    name: 'Comic Book',
    emoji: '📰',
    description: 'Bold ink outlines, halftone dot texture & pop-art colors',
    filterPreset: 'comic',
    tag: 'INK & DOTS'
  },
  {
    id: 'pixar',
    name: 'Pixar-like 3D',
    emoji: '🎬',
    description: 'Cinematic animated depth, rich specular highlights & studio lighting',
    filterPreset: 'pixar',
    tag: '3D CINEMATIC'
  },
  {
    id: 'sketch',
    name: 'Pencil Sketch',
    emoji: '✏️',
    description: 'Detailed graphite shading, cross-hatch strokes & hand-drawn edges',
    filterPreset: 'sketch',
    tag: 'GRAPHITE ART'
  },
  {
    id: 'crazy',
    name: 'Crazy Meme / Deep Fry',
    emoji: '🤪',
    description: 'Hyper-saturated pixel sizzle, high contrast & authentic dank meme fry',
    filterPreset: 'crazy',
    tag: 'DEEP FRIED'
  },
  {
    id: 'anime',
    name: 'Anime-inspired',
    emoji: '🎌',
    description: 'Cel-shaded vibrant lines, dramatic rim lights & expressive palette',
    filterPreset: 'anime',
    tag: 'NEO CEL-SHADE'
  }
];
