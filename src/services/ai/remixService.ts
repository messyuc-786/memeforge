import { GeneratedMemeConcept, MemeTemplate } from '../../types';
import { MEME_TEMPLATES } from '../../data/templatesData';
import { generateCreativeScore, generateMemeDNA } from './dnaService';

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export type RemixType =
  | 'swap_template'
  | 'more_savage'
  | 'more_wholesome'
  | 'more_absurd'
  | 'more_genz'
  | 'more_desi'
  | 'shorter'
  | 'longer_story'
  | 'turn_video'
  | 'more_relatable'
  | 'more_unhinged'
  | 'corporate'
  | 'different_punchline';

/**
 * 10-Way Remix Engine
 */
export function remixMemeConcept(
  concept: GeneratedMemeConcept,
  remixType: RemixType,
  targetTemplate?: MemeTemplate
): GeneratedMemeConcept {
  let newTop = concept.topText;
  let newBottom = concept.bottomText;
  let newTone = concept.tone;
  let newTemplate = MEME_TEMPLATES.find((t) => t.id === concept.templateId) || MEME_TEMPLATES[0];

  switch (remixType) {
    case 'swap_template': {
      if (targetTemplate) {
        newTemplate = targetTemplate;
      } else {
        const otherTemplates = MEME_TEMPLATES.filter((t) => t.id !== concept.templateId);
        newTemplate = otherTemplates[Math.floor(Math.random() * otherTemplates.length)] || MEME_TEMPLATES[0];
      }
      break;
    }
    case 'more_savage': {
      newTone = 'savage';
      newBottom = pick(['COULDN\'T BE ME 💀', 'THIS AGED LIKE MILK', 'READ THAT AGAIN AND SIT WITH IT']);
      break;
    }
    case 'more_wholesome': {
      newTone = 'wholesome';
      newBottom = `BUT YOU REALIZE EVERYTHING IS GOING TO BE WONDERFUL ❤️✨`;
      break;
    }
    case 'more_absurd': {
      newTone = 'absurd';
      newTop = `WHAT IF ${concept.originalIdea.toUpperCase()} IN 4D SPACE?`;
      newBottom = `ME COMMUNICATING WITH INTERSTELLAR LASER CRABS 🦀🚀`;
      break;
    }
    case 'more_genz': {
      newTone = 'genz';
      newTop = `POV: NO CAP, FR FR`;
      newBottom = `LITERALLY ME DYING OF EMBARRASSMENT ON MAIN 😭💅`;
      break;
    }
    case 'more_desi': {
      newTone = 'desi';
      newBottom = `BHAI YEH TOH PEAK SCENE HO GAYA 😂🔥`;
      break;
    }
    case 'shorter': {
      // Condense into ultra-punchy 4-word line
      newBottom = `ME: 💀`;
      break;
    }
    case 'longer_story': {
      newTop = `STAGE 1: ME CONFIDENTLY SAYING YES TO THIS`;
      newBottom = `STAGE 4: ACTIVELY REGRETTING EVERY LIFE CHOICE SINCE 2018 😭`;
      break;
    }
    case 'turn_video': {
      newTop = `POV: ${concept.originalIdea.toUpperCase()}`;
      newBottom = `(WAIT FOR THE DROP... 🔊)`;
      break;
    }
    case 'more_relatable': {
      newTone = 'relatable';
      newBottom = `LITERALLY EVERYONE, NO EXCEPTIONS 😩`;
      break;
    }
    case 'more_unhinged': {
      newTone = 'unhinged';
      newTop = `NOBODY: / ABSOLUTELY NOBODY:`;
      newBottom = `ME, UNPROMPTED: ${concept.originalIdea.toUpperCase()} 💀🔊`;
      break;
    }
    case 'corporate': {
      newTone = 'corporate';
      newTop = `PER MY LAST EMAIL:`;
      newBottom = `${concept.originalIdea.toUpperCase()} (TRANSLATION: CAN WE PLEASE BE SERIOUS?)`;
      break;
    }
    case 'different_punchline': {
      const altPunchlines = [
        `AND THAT'S HOW THE CHAOS BEGAN 🎬`,
        `PLOT TWIST NOBODY SAW COMING 😳`,
        `NARRATOR: IT WAS NOT, IN FACT, FINE.`,
        `SEASON FINALE ENERGY, HONESTLY`
      ];
      newBottom = altPunchlines[Math.floor(Math.random() * altPunchlines.length)];
      break;
    }
  }

  return {
    ...concept,
    id: `remix-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    tone: newTone,
    topText: newTop,
    bottomText: newBottom,
    templateId: newTemplate.id,
    templateTitle: newTemplate.title,
    templatePreviewUrl: newTemplate.previewUrl,
    aspectRatio: newTemplate.aspectRatio,
    dna: generateMemeDNA(concept.originalIdea, newTone),
    creativeScore: generateCreativeScore(concept.originalIdea, newTone)
  };
}
