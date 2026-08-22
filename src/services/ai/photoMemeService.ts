import { callGeminiApi } from './aiProvider';

export interface PhotoMemeSuggestion {
  id: string;
  scenario: string;
  topText: string;
  bottomText: string;
  vibe: string;
}

/**
 * Analyze uploaded photo to suggest viral meme POVs & captions
 */
export async function analyzePhotoForMemes(imageDataUrl: string, userHint?: string): Promise<{ suggestions: PhotoMemeSuggestion[]; isLiveApi: boolean }> {
  const fallback = (): PhotoMemeSuggestion[] => [
    {
      id: `photo-sugg-${Date.now()}-1`,
      scenario: 'Workplace / Tech',
      topText: 'POV: YOU OPENED THE PRODUCTION LOGS ON FRIDAY AT 4:59 PM',
      bottomText: 'AND THE ENTIRE SERVER IS ON FIRE 😭',
      vibe: '🔥 Pure Panic'
    },
    {
      id: `photo-sugg-${Date.now()}-2`,
      scenario: 'Relatable Self-Aware',
      topText: 'ME TRYING TO EXPLAIN WHY I SPENT $60 ON FOOD DELIVERY',
      bottomText: 'WHEN I HAVE RICE AND WATER AT HOME FOR FREE',
      vibe: '😂 Broke Relatable'
    },
    {
      id: `photo-sugg-${Date.now()}-3`,
      scenario: 'Existential Chaos',
      topText: 'MY LAST 2 BRAIN CELLS MAKING LIFE DECISIONS',
      bottomText: '"YES, BUYING THIS 3D PRINTER WILL DEFINITELY FIX MY SLEEP SCHEDULE"',
      vibe: '💀 Unhinged'
    },
    {
      id: `photo-sugg-${Date.now()}-4`,
      scenario: 'Savage Reaction',
      topText: 'THE FACE YOU MAKE WHEN THEY SAY:',
      bottomText: '"THIS WILL ONLY TAKE A FEW MINUTES" 💀',
      vibe: '🥶 Certified Savage'
    }
  ];

  const prompt = `You are MemeForge Vision AI.
Analyze this user photo / image context (Hint: "${userHint || 'reaction face/photo'}").
Generate 4 hilarious meme concepts as a JSON array of objects with keys "scenario", "topText", "bottomText", "vibe".`;

  const res = await callGeminiApi(prompt, fallback);
  return { suggestions: res.data, isLiveApi: res.isLiveApi };
}
