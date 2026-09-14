import { GeneratedMemeConcept } from '../../types';
import { MEME_TEMPLATES } from '../../data/templatesData';
import { generateCreativeScore, generateMemeDNA } from './dnaService';

export interface DesiMemeTemplateData {
  title: string;
  category: 'Bollywood' | 'Corporate' | 'Cricket' | 'Family/Shaadi' | 'College/Exams' | 'Street Food';
  topText: string;
  bottomText: string;
  fullCaption: string;
  slang: string;
  templateId: string;
}

export const DESI_PRESETS: DesiMemeTemplateData[] = [
  {
    title: '5 Minute Meeting Trap',
    category: 'Corporate',
    topText: 'MANAGER: "SIRF 5 MINUTE KA QUICK SYNC HAI"',
    bottomText: 'ME AT 1 HOUR 45 MINUTES: "YEH TOH SHURU HOTE HI KHATAM NAHI HUA 😭"',
    fullCaption: 'When manager says 5 min quick sync and it becomes a 2 hour townhall',
    slang: 'Pakka Scam',
    templateId: 'this-is-fine-fire'
  },
  {
    title: 'Salary Day vs 3 Days Later',
    category: 'Corporate',
    topText: '1ST OF THE MONTH: "AAJ TERA BHAI PARTY DEGA"',
    bottomText: '4TH OF THE MONTH: "BHAI 20 RUPEE GOOGLE PAY KARNA CHAI KE LIYE"',
    fullCaption: 'Salary credited at 9 AM vs Bank balance on 4th of the month',
    slang: 'Paisa Khatam',
    templateId: 'bank-account-check'
  },
  {
    title: 'Relatives at Weddings',
    category: 'Family/Shaadi',
    topText: 'RELATIVES AT EVERY SHAADI: "AUR BETA SHADI KAB KAR RAHE HO?"',
    bottomText: 'ME: "PUNJABI MEIN BOLO YA HINDI MEIN... PEHLE AAP APNA CHAI SAMBHALO ☕"',
    fullCaption: 'When relatives ask when you are getting married at every family function',
    slang: 'Rishta Pressure',
    templateId: 'woman-yelling-at-cat'
  },
  {
    title: 'Sharma Ji Ka Beta',
    category: 'College/Exams',
    topText: 'PARENTS: "SHARMA JI KA BETA GOT 99.8% IN ENTRANCE EXAM"',
    bottomText: 'ME WHO GUESSED ON 80% OF MULTIPLE CHOICE QUESTIONS: "PASS TOH MAIN BHI HO GAYA 😎"',
    fullCaption: 'The eternal comparison with Sharma ji ka beta',
    slang: 'Peak Indian Trauma',
    templateId: 'buff-doge-vs-cheems'
  },
  {
    title: 'Biryani vs Diet Plan',
    category: 'Street Food',
    topText: 'MY DIET PLAN: OATS, SALAD, AND GREEN TEA',
    bottomText: 'MOM: "AAJ GHAR PE HYDERABADI DUM BIRYANI BANI HAI"',
    fullCaption: 'When your fitness diet immediately surrenders to mom homemade biryani',
    slang: 'Diet Gaya Tel Lene',
    templateId: 'distracted-boyfriend'
  },
  {
    title: 'Cricket Match Final Over',
    category: 'Cricket',
    topText: 'OPPOSITION NEEDS 12 RUNS IN THE FINAL OVER',
    bottomText: 'ENTIRE NATION HOLDING BREATH NOT BLINKING FOR 6 BALLS 🇮🇳',
    fullCaption: 'Indian cricket match final over heart rate spike',
    slang: 'Heart Attack Match',
    templateId: 'two-buttons-choice'
  }
];

/**
 * Generate Desi Concept for any user idea
 */
export function generateDesiMemeConcept(idea: string): GeneratedMemeConcept {
  const norm = idea.toLowerCase();
  let matched = DESI_PRESETS[0];

  if (/salary|money|broke|paisa|bank/i.test(norm)) matched = DESI_PRESETS[1];
  else if (/shaadi|marriage|relative|family|rishta/i.test(norm)) matched = DESI_PRESETS[2];
  else if (/exam|study|score|marks|college|school|sharma/i.test(norm)) matched = DESI_PRESETS[3];
  else if (/food|diet|eat|biryani|chai/i.test(norm)) matched = DESI_PRESETS[4];
  else if (/cricket|match|ipl|team/i.test(norm)) matched = DESI_PRESETS[5];
  else {
    matched = DESI_PRESETS[Math.floor(Math.random() * DESI_PRESETS.length)];
  }

  const template = MEME_TEMPLATES.find((t) => t.id === matched.templateId) || MEME_TEMPLATES[0];

  // If user provided custom idea, customize top text with some structural variety
  let top = matched.topText;
  let bottom = matched.bottomText;
  if (idea && idea.trim().length > 3) {
    const frames = [
      `WHEN ${idea.trim().toUpperCase()}`,
      `${idea.trim().toUpperCase()}`,
      `US EVERY TIME: ${idea.trim().toUpperCase()}`
    ];
    top = frames[Math.floor(Math.random() * frames.length)];
    bottom = `${matched.bottomText}`;
  }

  return {
    id: `desi-concept-${Date.now()}`,
    originalIdea: idea,
    tone: 'desi',
    toneLabel: 'Desi / Hinglish',
    toneEmoji: '🇮🇳',
    topText: top,
    bottomText: bottom,
    fullCaption: matched.fullCaption,
    templateId: template.id,
    templateTitle: template.title,
    templatePreviewUrl: template.previewUrl,
    aspectRatio: template.aspectRatio,
    platformTarget: 'WhatsApp',
    isDesi: true,
    dna: generateMemeDNA(idea, 'desi'),
    creativeScore: generateCreativeScore(idea, 'desi')
  };
}
