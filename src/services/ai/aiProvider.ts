/**
 * MemeForge AI Provider Abstraction
 *
 * Production-safe by design: this module holds no provider secret and makes no direct
 * cross-origin call to Google's API from the browser. It calls our own same-origin
 * /api/generate endpoint (see api/generate.ts), which holds the Gemini key server-side.
 * If that endpoint isn't configured on this deployment, generation transparently falls
 * back to the existing fast local heuristic engine — no crash, no exposed key.
 */
import { requestAIGeneration } from './aiGateway';

/**
 * Generic AI caller with JSON response parsing. Same signature as before, so every
 * existing call site (contentUniverseService, etc.) needed no changes beyond the import.
 */
export async function callGeminiApi<T>(prompt: string, fallbackGenerator: () => T): Promise<{ data: T; isLiveApi: boolean }> {
  const rawText = await requestAIGeneration(prompt);

  if (rawText) {
    try {
      const parsed = JSON.parse(rawText) as T;
      return { data: parsed, isLiveApi: true };
    } catch (err) {
      console.warn('AI response was not valid JSON, using local fallback:', err);
    }
  }

  // Built-in intelligent fallback with brief realistic processing delay
  await new Promise((r) => setTimeout(r, 400));
  return { data: fallbackGenerator(), isLiveApi: false };
}
