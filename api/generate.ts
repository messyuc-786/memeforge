// Vercel Serverless Function — the ONLY place the Gemini provider key is read.
// It is a server-side environment variable and is never sent to, or readable by, the browser.
//
// REQUIRED DEPLOYMENT STEP (cannot be done from inside this repo):
// In the Vercel project dashboard → Settings → Environment Variables, add:
//   GEMINI_API_KEY = <your Google Gemini API key>
// Without it, this endpoint responds 503 and the client automatically falls back
// to the existing built-in local generation (no crash, no exposed secret).
//
// Minimal Node-style handler — no @vercel/node dependency needed; Vercel invokes
// this as a standard (req, res) function for a plain .ts file under /api.
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Not configured — tell the client to use its local fallback. No secret, no crash.
    res.status(503).json({ error: 'AI generation is not configured on this deployment.' });
    return;
  }

  const { prompt, temperature } = (req.body || {}) as { prompt?: string; temperature?: number };
  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'Missing "prompt" string in request body.' });
    return;
  }

  try {
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: typeof temperature === 'number' ? temperature : 0.9,
            responseMimeType: 'application/json'
          }
        })
      }
    );

    if (!upstream.ok) {
      res.status(502).json({ error: 'Upstream AI provider error.' });
      return;
    }

    const json = await upstream.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      res.status(502).json({ error: 'No content returned by provider.' });
      return;
    }

    res.status(200).json({ text });
  } catch (err) {
    console.error('AI proxy error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
}
