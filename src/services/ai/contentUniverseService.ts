import { ContentUniversePack, GeneratedMemeConcept, MemeTone } from '../../types';
import { MEME_TEMPLATES } from '../../data/templatesData';
import { generateCreativeScore, generateMemeDNA } from './dnaService';
import { generateDesiMemeConcept } from './desiService';
import { matchTemplatesForIdea } from './templateService';
import { callGeminiApi } from './aiProvider';

export async function generateContentUniverse(idea: string, userTone: MemeTone = 'relatable'): Promise<{ universe: ContentUniversePack; isLiveApi: boolean }> {
  const cleanIdea = idea.trim() || 'When your manager says the meeting will only take five minutes';
  const matched = matchTemplatesForIdea(cleanIdea);

  const fallbackBuilder = (): ContentUniversePack => {
    const tpl1 = matched[0]?.template || MEME_TEMPLATES[0];
    const tpl2 = matched[1]?.template || MEME_TEMPLATES[1];
    const tpl3 = matched[2]?.template || MEME_TEMPLATES[2];
    const tpl4 = matched[3]?.template || MEME_TEMPLATES[3];
    const tpl5 = matched[4]?.template || MEME_TEMPLATES[4];

    // 1. Classic Main Meme
    const classicMeme: GeneratedMemeConcept = {
      id: `concept-classic-${Date.now()}`,
      originalIdea: cleanIdea,
      tone: 'relatable',
      toneLabel: 'Classic Meme',
      toneEmoji: '🔥',
      topText: `WHEN ${cleanIdea.toUpperCase()}`,
      bottomText: 'ME TRYING TO ACT NORMAL AND FAILING SPECTACULARLY 😭',
      fullCaption: `When ${cleanIdea} and you have to pretend everything is fine.`,
      templateId: tpl1.id,
      templateTitle: tpl1.title,
      templatePreviewUrl: tpl1.previewUrl,
      aspectRatio: tpl1.aspectRatio,
      platformTarget: 'Universal',
      dna: generateMemeDNA(cleanIdea, 'relatable'),
      creativeScore: generateCreativeScore(cleanIdea, 'relatable')
    };

    // 2. Relatable Alternative
    const relatableMeme: GeneratedMemeConcept = {
      id: `concept-relatable-${Date.now()}`,
      originalIdea: cleanIdea,
      tone: 'relatable',
      toneLabel: 'Everyday Relatable',
      toneEmoji: '😂',
      topText: 'THAT EXACT MOMENT WHEN:',
      bottomText: `${cleanIdea.toUpperCase()} AND EVERYONE IN THE ROOM JUST FREEZES`,
      fullCaption: `Relatable moment: ${cleanIdea}`,
      templateId: tpl2.id,
      templateTitle: tpl2.title,
      templatePreviewUrl: tpl2.previewUrl,
      aspectRatio: tpl2.aspectRatio,
      platformTarget: 'Instagram',
      dna: generateMemeDNA(cleanIdea, 'relatable'),
      creativeScore: generateCreativeScore(cleanIdea, 'relatable')
    };

    // 3. Savage Burn Meme
    const savageMeme: GeneratedMemeConcept = {
      id: `concept-savage-${Date.now()}`,
      originalIdea: cleanIdea,
      tone: 'savage',
      toneLabel: 'Savage Burn',
      toneEmoji: '💀',
      topText: `BRO REALLY SAID: "${cleanIdea.toUpperCase()}"`,
      bottomText: 'EMOTIONAL DAMAGE LEVEL 9000 • NO RECOVERY POSSIBLE',
      fullCaption: `Savage reaction to "${cleanIdea}"`,
      templateId: tpl3.id,
      templateTitle: tpl3.title,
      templatePreviewUrl: tpl3.previewUrl,
      aspectRatio: tpl3.aspectRatio,
      platformTarget: 'X / Twitter',
      dna: generateMemeDNA(cleanIdea, 'savage'),
      creativeScore: generateCreativeScore(cleanIdea, 'savage')
    };

    // 4. Desi / Indian Cultural Meme
    const desiMeme = generateDesiMemeConcept(cleanIdea);

    // 5. Corporate / Workplace Meme
    const corporateMeme: GeneratedMemeConcept = {
      id: `concept-corporate-${Date.now()}`,
      originalIdea: cleanIdea,
      tone: 'corporate',
      toneLabel: 'Corporate / Office',
      toneEmoji: '💼',
      topText: 'PER MY LAST EMAIL:',
      bottomText: `${cleanIdea.toUpperCase()} (TRANSLATION: CAN YOU PLEASE BE SERIOUS?)`,
      fullCaption: `Corporate translation for: ${cleanIdea}`,
      templateId: tpl4.id,
      templateTitle: tpl4.title,
      templatePreviewUrl: tpl4.previewUrl,
      aspectRatio: tpl4.aspectRatio,
      platformTarget: 'Reddit',
      dna: generateMemeDNA(cleanIdea, 'corporate'),
      creativeScore: generateCreativeScore(cleanIdea, 'corporate')
    };

    // 6. Absurd Meme
    const absurdMeme: GeneratedMemeConcept = {
      id: `concept-absurd-${Date.now()}`,
      originalIdea: cleanIdea,
      tone: 'absurd',
      toneLabel: 'Absurd / Unhinged',
      toneEmoji: '🤪',
      topText: 'MY LAST 2 BRAIN CELLS AT 3:45 AM:',
      bottomText: `WHAT IF ${cleanIdea.toUpperCase()} BUT WITH GALAXY LASERS? 🚀`,
      fullCaption: `Unhinged absurdity: ${cleanIdea}`,
      templateId: tpl5.id,
      templateTitle: tpl5.title,
      templatePreviewUrl: tpl5.previewUrl,
      aspectRatio: tpl5.aspectRatio,
      platformTarget: 'YouTube Shorts',
      dna: generateMemeDNA(cleanIdea, 'absurd'),
      creativeScore: generateCreativeScore(cleanIdea, 'absurd')
    };

    return {
      idea: cleanIdea,
      timestamp: Date.now(),
      classicMeme,
      relatableMeme,
      savageMeme,
      desiMeme,
      corporateMeme,
      absurdMeme,
      videoReelPrompt: {
        hook: `POV: ${cleanIdea}`,
        caption: `Wait until the end... 💀 #${cleanIdea.replace(/[^a-zA-Z0-9]/g, '').slice(0, 15)} #memeforge #funny`,
        suggestedAudio: 'Vine Boom Bass Drop / Dramatic Anime OST',
        format: '9:16'
      },
      socialPosts: {
        instagramCaption: `Literally me every single time. 😂 Tag someone who does this! 👇\n.\n#memeforge #funnymemes #dankmemes #relatable #viralreels`,
        xTweetText: `Can we all agree that ${cleanIdea.toLowerCase()} is the most universally humbling experience known to humanity?\n\nImage attached: 💀`,
        whatsappOneLiner: `Bhai this is 100% accurate: ${cleanIdea} 😂🔥`,
        hashtags: ['#MemeForge', '#DankMemes', '#Relatable', '#Viral', '#GenZ', '#Humor']
      }
    };
  };

  const prompt = `You are MemeForge AI, the 2026 Content Universe engine.
Given the user's idea: "${cleanIdea}"
Generate a complete multi-format Content Pack as JSON with keys:
- "classicTopText": string (ALL CAPS)
- "classicBottomText": string (ALL CAPS)
- "savageBottomText": string (ALL CAPS)
- "desiBottomText": string (Hindi/Hinglish comedic punchline)
- "corporateBottomText": string (Office/LinkedIn satire)
- "absurdBottomText": string (Surreal Gen-Z chaos)
- "videoHook": string
- "tweetText": string

Return ONLY valid JSON matching this schema.`;

  const { data, isLiveApi } = await callGeminiApi(prompt, fallbackBuilder);
  
  // If returned from API, merge with template structure
  if (isLiveApi && data && typeof data === 'object') {
    const raw = data as unknown as Record<string, string>;
    const base = fallbackBuilder();
    if (raw.classicTopText) base.classicMeme.topText = raw.classicTopText.toUpperCase();
    if (raw.classicBottomText) base.classicMeme.bottomText = raw.classicBottomText.toUpperCase();
    if (raw.savageBottomText) base.savageMeme.bottomText = raw.savageBottomText.toUpperCase();
    if (raw.desiBottomText) base.desiMeme.bottomText = raw.desiBottomText;
    if (raw.corporateBottomText) base.corporateMeme.bottomText = raw.corporateBottomText.toUpperCase();
    if (raw.absurdBottomText) base.absurdMeme.bottomText = raw.absurdBottomText.toUpperCase();
    if (raw.videoHook) base.videoReelPrompt.hook = raw.videoHook;
    if (raw.tweetText) base.socialPosts.xTweetText = raw.tweetText;
    return { universe: base, isLiveApi: true };
  }

  return { universe: fallbackBuilder(), isLiveApi: false };
}
