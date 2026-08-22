import { VideoMemeProject } from '../../types';

export function createDefaultVideoProject(): VideoMemeProject {
  return {
    id: `video-project-${Date.now()}`,
    videoUrl: null,
    videoFileName: '',
    duration: 0,
    trimStart: 0,
    trimEnd: 15,
    playbackRate: 1,
    aspectRatio: '9:16',
    isMuted: false,
    isLooping: true,
    topBannerText: 'POV: YOU SAID "JUST ONE MORE MATCH"',
    bottomBannerText: 'CURRENT TIME: 4:30 AM 😭',
    textColor: '#FFFFFF',
    bannerBgColor: 'rgba(8, 9, 13, 0.85)',
    fontSize: 26
  };
}

export function generateVideoHooks(topic: string): { hooks: string[]; audioSuggestions: string[] } {
  return {
    hooks: [
      `POV: ${topic.toUpperCase()}`,
      `WAIT UNTIL THE END... 💀`,
      `HOW DID THIS EVEN HAPPEN?! 😂`,
      `TELL ME THIS IS NOT 100% ACCURATE 😭`,
      `NOBODY TALKS ABOUT THIS PART:`
    ],
    audioSuggestions: [
      'Vine Boom Heavy 808 Bass Drop',
      'Dramatic Anime Orchestral OST',
      'Comedic Looney Tunes Slip Sound',
      'Phonk Drift Beat',
      'Ultra Lo-Fi Chill Synth'
    ]
  };
}
