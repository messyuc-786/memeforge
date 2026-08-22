/**
 * MemeForge AI Provider Abstraction
 * Supports Google Gemini 2.0 / 1.5 Flash when API key is provided,
 * otherwise seamlessly runs high-speed, intelligent deterministic local heuristics.
 */

const STORAGE_KEY_GEMINI = 'memeforge_gemini_api_key';

export function getStoredApiKey(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(STORAGE_KEY_GEMINI) || '';
}

export function saveStoredApiKey(apiKey: string): void {
  if (typeof window === 'undefined') return;
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
 * Generic Gemini API Caller with JSON response parsing
 */
export async function callGeminiApi<T>(prompt: string, fallbackGenerator: () => T): Promise<{ data: T; isLiveApi: boolean }> {
  const apiKey = getStoredApiKey();

  if (apiKey) {
    try {
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
        const json = await response.json();
        const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText) as T;
          return { data: parsed, isLiveApi: true };
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, using intelligent built-in fallback:', err);
    }
  }

  // Built-in intelligent fallback with brief realistic processing delay
  await new Promise((r) => setTimeout(r, 400));
  return { data: fallbackGenerator(), isLiveApi: false };
}
