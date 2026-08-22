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
    unhinged: 'TikTok / Discord Shitposters',
    clever: 'Tech / Tech Twitter & LinkedIn',
    wholesome: 'Instagram / Friends & Family',
    desi: 'Desi Twitter / Indian WhatsApp',
    absurd: 'Dank Meme Communities',
    corporate: 'Corporate LinkedIn / Slack',
    genz: 'Gen-Z / Reels & TikTok'
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
 * Generate AI Creative Score Breakdown (0-100) + Actionable Suggestions
 */
export function generateCreativeScore(idea: string, tone: MemeTone): CreativeScore {
  // Deterministic realistic high scores (85 - 96)
  const hook = Math.min(98, Math.max(82, 86 + (idea.length % 11)));
  const relatability = tone === 'relatable' || tone === 'desi' ? 96 : 88;
  const timing = 92;
  const caption = 90 + (idea.length % 7);
  const visual = 94;
  const shareability = tone === 'savage' || tone === 'relatable' ? 95 : 89;

  const totalScore = Math.round((hook + relatability + timing + caption + visual + shareability) / 6);

  let ratingLabel: 'Legendary Dank' | 'Viral Tier' | 'High Impact' | 'Solid Meme' = 'Viral Tier';
  if (totalScore >= 93) ratingLabel = 'Legendary Dank';
  else if (totalScore >= 88) ratingLabel = 'Viral Tier';
  else if (totalScore >= 80) ratingLabel = 'High Impact';
  else ratingLabel = 'Solid Meme';

  const suggestions: string[] = [
    'Try the 9:16 vertical crop format for 3x engagement on Instagram Reels and TikTok.',
    'Keep the bottom punchline under 8 words to sharpen the comedic comedic delivery.',
    tone !== 'savage' 
      ? 'Remix in Savage Mode to increase comment section debate and repost velocity.'
      : 'Pair with a Vine Boom sound effect for maximum short-form video impact.'
  ];

  return {
    totalScore,
    ratingLabel,
    breakdown: {
      hook,
      relatability,
      timing,
      caption,
      visual,
      shareability
    },
    suggestions
  };
}
