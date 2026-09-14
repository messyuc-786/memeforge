/**
 * Client-side AI gateway.
 *
 * IMPORTANT: this file contains NO provider secret and never will. It only ever talks to our
 * own same-origin /api/generate endpoint, which holds the Gemini key server-side (see api/generate.ts).
 * If that endpoint is unavailable or not configured (no key set on the deployment), this resolves
 * to `null` and callers fall back to the existing local generation — never a crash, never a leaked key.
 */
export async function requestAIGeneration(prompt: string, temperature = 0.9): Promise<string | null> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, temperature })
    });

    if (!response.ok) return null;

    const data = await response.json();
    return typeof data?.text === 'string' ? data.text : null;
  } catch (err) {
    console.warn('AI gateway request failed, using local fallback:', err);
    return null;
  }
}
