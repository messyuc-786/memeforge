import { CreativeScore, MemeDNA, MemeTone } from '../../types';

/**
 * Generate Meme DNA analysis based on topic, tone, and text
 */
export function generateMemeDNA(idea: string, tone: MemeTone): MemeDNA {
  const isWork = /meeting|manager|boss|work|office|salary|code|developer|bug|job/i.test(idea);
  const isMoney = /bank|money|broke|buy|salary|food|spend|price|card/i.test(idea);
  const isSchool = /exam|study|class|math|teacher|school|college|homework/i.test(idea);
  const isDating = /date|girlfriend|boyfriend|crush|relationship|text|read|single/i.test(idea);

  let topic = 'Everyday Life';
  if (isWork) topic = 'Work & Career';
  else if (isMoney) topic = 'Finance & Broke Life';
  else if (isSchool) topic = 'Academics & College';
  else if (isDating) topic = 'Dating & Relationships';

  const emotions: Record<MemeTone, string> = {
    relatable: 'Self-Aware Empathy',
    savage: 'Cold-Blooded Mockery',
    unhinged: 'Pure Unfiltered Chaos',
    clever: 'Intellectual Irony',
    wholesome: 'Warm Heartfelt Joy',
    desi: 'Peak Indian Relatability',
    absurd: 'Surrealist Nonsense',
    corporate: 'Passive-Aggressive Fatigue',
    genz: 'Existential Irony'
  };

  const audiences: Record<MemeTone, string> = {
    relatable: 'Mainstream / Everyone',
    savage: 'Twitter / Reddit Memers',
    unhinged: 'YouTube Shorts / Discord Meme Servers',
    clever: 'Tech / Tech Twitter & LinkedIn',
    wholesome: 'Instagram & Facebook / Family & Friends',
    desi: 'Desi Twitter / Indian WhatsApp & Facebook',
    absurd: 'Dank Meme Communities',
    corporate: 'Corporate LinkedIn / Slack',
    genz: 'Gen-Z / YouTube Shorts & Reels'
  };

  return {
    emotion: emotions[tone] || 'Witty Sarcasm',
    tone: tone.toUpperCase(),
    audience: audiences[tone] || 'Gen Z & Millennial',
    topic,
    format: 'Two-Panel Reaction',
    energyLevel: tone === 'savage' || tone === 'unhinged' ? '🔥🔥🔥🔥 High Voltage' : '🔥🔥🔥 Solid Buzz',
    shareability: tone === 'relatable' || tone === 'savage' ? 'Very High' : 'High'
  };
}

/**
 * Meme Check: actionable, idea-aware editing suggestions.
 *
 * NOTE: `totalScore`/`ratingLabel`/`breakdown` are kept only for backward type-compatibility
 * with existing GeneratedMemeConcept consumers — the UI no longer displays them as a fake
 * precision "viral score", since that's exactly the kind of unsupported claim to avoid.
 * The real output here is `suggestions`: concrete, actionable next steps.
 */
export function generateCreativeScore(idea: string, tone: MemeTone): CreativeScore {
  const wordCount = idea.trim().split(/\s+/).filter(Boolean).length;

  const suggestions: string[] = [];

  if (wordCount > 14) {
    suggestions.push('Shorten this — trim the idea to its sharpest few words for a punchier read.');
  }
  if (tone !== 'savage' && tone !== 'unhinged') {
    suggestions.push('Sharpen the punchline — cut extra words from the bottom text so the joke lands faster.');
  }
  if (tone !== 'unhinged' && tone !== 'absurd') {
    suggestions.push('Make it more chaotic — try an Unhinged or Absurd remix for a bigger contrast.');
  }
  if (tone !== 'desi') {
    suggestions.push('Make it more Desi — remix with Hinglish phrasing for a culturally sharper angle.');
  }
  suggestions.push('Increase contrast — make the top and bottom text say two clearly different things.');

  // Keep exactly 3 varied, relevant suggestions rather than a fixed generic list
  const finalSuggestions = suggestions.slice(0, 3);

  // Legacy numeric fields — not shown to users, kept only so the existing type/data shape holds.
  return {
    totalScore: 0,
    ratingLabel: 'Solid Meme',
    breakdown: {
      hook: 0,
      relatability: 0,
      timing: 0,
      caption: 0,
      visual: 0,
      shareability: 0
    },
    suggestions: finalSuggestions
  };
}
