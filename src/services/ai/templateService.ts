import { MEME_TEMPLATES } from '../../data/templatesData';
import { MemeTemplate } from '../../types';

export interface TemplateMatchResult {
  template: MemeTemplate;
  matchScore: number; // e.g. 96%
  reason: string;
}

/**
 * Semantic keyword and context matcher for meme templates
 */
export function matchTemplatesForIdea(idea: string): TemplateMatchResult[] {
  const normalized = idea.toLowerCase();
  const results: { template: MemeTemplate; matchScore: number; reason: string }[] = [];

  MEME_TEMPLATES.forEach((tpl) => {
    let score = 70; // baseline score
    let reason = 'Great visual framing for this concept';

    // Keyword & Tag matching
    const matchingTags = tpl.tags.filter((t) => normalized.includes(t));
    score += matchingTags.length * 8;

    if (/manager|meeting|boss|work|office|job|corporate|monday|friday/i.test(normalized)) {
      if (tpl.id === 'this-is-fine-fire' || tpl.id === 'monday-vs-friday' || tpl.id === 'coding-at-3am') {
        score += 20;
        reason = 'Perfect for workplace chaos and relatable corporate pain';
      }
    } else if (/salary|money|bank|broke|buy|spend|food|order/i.test(normalized)) {
      if (tpl.id === 'bank-account-check' || tpl.id === 'distracted-boyfriend' || tpl.id === 'trade-offer') {
        score += 22;
        reason = 'Iconic format for financial decisions and sudden regret';
      }
    } else if (/girlfriend|boyfriend|date|relationship|women|him|her/i.test(normalized)) {
      if (tpl.id === 'relationship-overthinking' || tpl.id === 'distracted-boyfriend' || tpl.id === 'woman-yelling-at-cat') {
        score += 24;
        reason = 'Ideal structure for couple & relationship dynamics';
      }
    } else if (/choice|choose|pick|or|instead/i.test(normalized)) {
      if (tpl.id === 'drake-choice' || tpl.id === 'two-buttons-choice' || tpl.id === 'uno-draw-25') {
        score += 22;
        reason = 'High-contrast decision comparison format';
      }
    } else if (/exam|study|class|math|school|smart|dumb|brain/i.test(normalized)) {
      if (tpl.id === 'expanding-galaxy-brain' || tpl.id === 'school-math-exam' || tpl.id === 'panik-kalm-panik') {
        score += 23;
        reason = 'Highlights progressive levels of intelligence or exam panic';
      }
    } else if (/compare|before|after|past|now|then/i.test(normalized)) {
      if (tpl.id === 'buff-doge-vs-cheems' || tpl.id === 'monday-vs-friday') {
        score += 20;
        reason = 'Classic comparison between past strength and modern chaos';
      }
    }

    const finalScore = Math.min(98, Math.max(75, score));
    results.push({
      template: tpl,
      matchScore: finalScore,
      reason
    });
  });

  // Sort descending by match score
  return results.sort((a, b) => b.matchScore - a.matchScore);
}
