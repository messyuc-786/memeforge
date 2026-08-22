import { AICaptionResult, RoastLevelType, RoastResult } from '../types';

export const CAPTION_CATEGORIES = [
  'Relatable & Everyday',
  'Broke & Money',
  'Work & Corporate',
  'Dating & Single',
  'Tech & Coding',
  'Gym & Fitness',
  'Overthinking & Sleep',
  'Pets & Animals',
  'Food & Snacking'
] as const;

export interface CategoryCaptions {
  category: string;
  captions: {
    top: string;
    bottom: string;
    full: string;
  }[];
}

export const HUMOR_PRESETS: CategoryCaptions[] = [
  {
    category: 'Broke & Money',
    captions: [
      {
        top: 'ME LOOKING AT MY BANK BALANCE',
        bottom: 'AFTER SAYING "TREAT YOURSELF" 14 TIMES TODAY',
        full: 'Me looking at my bank balance after saying "treat yourself" 14 times today'
      },
      {
        top: 'CHECKING MY ACCOUNT BEFORE ORDERING FOOD',
        bottom: 'AND DECIDING THAT HAPPINESS COSTS $34.80 WITH DELIVERY',
        full: 'Checking my account before ordering food and deciding that happiness costs $34.80'
      },
      {
        top: 'MY WALLET WATCHING ME BUY ANOTHER COFFEE',
        bottom: 'WHEN I HAVE WATER AND SLEEP DEPRIVATION AT HOME FOR FREE',
        full: 'My wallet watching me buy another coffee when I have water at home for free'
      },
      {
        top: 'MY FINANCIAL ADVISOR (MY OWN CONSCIENCE)',
        bottom: 'WATCHING ME ENTER MY CARD DETAILS AT 2:30 AM',
        full: 'My financial advisor watching me enter my card details at 2:30 AM'
      },
      {
        top: 'PAYDAY ARRIVES AT 9:00 AM',
        bottom: 'BILLS, SUBSCRIPTIONS & RENT BY 9:07 AM: "ALLOW US TO INTRODUCE OURSELVES"',
        full: 'Payday arrives at 9:00 AM... Bills by 9:07 AM: "Allow us to introduce ourselves"'
      }
    ]
  },
  {
    category: 'Work & Corporate',
    captions: [
      {
        top: 'ME DURING A 60-MINUTE MEETING',
        bottom: 'THAT COULD HAVE BEEN A 4-WORD SLACK MESSAGE',
        full: 'Me during a 60-minute meeting that could have been a 4-word Slack message'
      },
      {
        top: 'MY BOSS: "DO YOU HAVE A MINUTE TO SYNC?"',
        bottom: 'MY SOUL LEAVING MY BODY INSTANTLY',
        full: 'My boss: "Do you have a minute to sync?" My soul leaving my body instantly'
      },
      {
        top: 'TYPING "PER MY LAST EMAIL"',
        bottom: 'BECAUSE "CAN YOU EVEN READ?" IS APPARENTLY NOT HR COMPLIANT',
        full: 'Typing "Per my last email" because "Can you even read?" is not HR compliant'
      },
      {
        top: 'ME LOGGING OFF AT 5:00:01 PM',
        bottom: 'SLIDING OUT OF TEAMS LIKE A SMOKE GRENADE',
        full: 'Me logging off at 5:00:01 PM sliding out of Teams like a smoke grenade'
      },
      {
        top: 'PRETENDING TO BE DEEPLY ENGAGED ON THE ZOOM CALL',
        bottom: 'WHILE AGGRESSIVELY SHOPPING FOR AIR FRYERS ON TAB #42',
        full: 'Pretending to be deeply engaged on Zoom while shopping for air fryers on tab 42'
      }
    ]
  },
  {
    category: 'Tech & Coding',
    captions: [
      {
        top: 'SPENDING 6 HOURS WRITING CODE',
        bottom: 'TO AUTOMATE A TASK THAT TAKES 30 SECONDS MANUALLY',
        full: 'Spending 6 hours writing code to automate a task that takes 30 seconds manually'
      },
      {
        top: 'CODE DOES NOT WORK: "WHY???"',
        bottom: 'CODE SUDDENLY WORKS: "WHY??? WHO TOUCHED IT???"',
        full: 'Code does not work: "WHY?" Code suddenly works: "WHY??? WHO TOUCHED IT?"'
      },
      {
        top: 'ME PASTING 47 LINES OF RANDOM CODE FROM STACKOVERFLOW',
        bottom: 'AND WHISPERING A PRAYER BEFORE RUNNING BUILD',
        full: 'Pasting 47 lines of code from StackOverflow and whispering a prayer before running build'
      },
      {
        top: 'PUSHING STRAIGHT TO PRODUCTION ON FRIDAY AT 4:58 PM',
        bottom: 'WITH A COMMIT MESSAGE "TINY CLEANUP LOL"',
        full: 'Pushing straight to production on Friday at 4:58 PM with commit "tiny cleanup lol"'
      },
      {
        top: 'AI PROMISED TO TAKE MY JOB',
        bottom: 'BUT SO FAR IT JUST EXPLAINS MY OWN SYNTAX ERRORS WITH SUSPICIOUS ENTHUSIASM',
        full: 'AI promised to take my job, but so far it just explains my own syntax errors'
      }
    ]
  },
  {
    category: 'Gym & Fitness',
    captions: [
      {
        top: 'ME DRINKING ONE PROTEIN SHAKE',
        bottom: 'AND ASKING MY FRIENDS IF MY SHOULDERS LOOK WIDER YET',
        full: 'Me drinking one protein shake and asking my friends if my shoulders look wider yet'
      },
      {
        top: 'TAKING 14 MINUTES OF REST BETWEEN A 5-REP SET',
        bottom: 'BECAUSE CHANGING THE SPOTIFY PLAYLIST IS CARDIO',
        full: 'Taking 14 minutes of rest between sets because changing Spotify is cardio'
      },
      {
        top: 'MY LEGS 48 HOURS AFTER LEG DAY',
        bottom: 'TURNING INTO TWO WET NOODLES UPON SEEING STAIRS',
        full: 'My legs 48 hours after leg day turning into wet noodles upon seeing stairs'
      }
    ]
  },
  {
    category: 'Overthinking & Sleep',
    captions: [
      {
        top: 'MY BRAIN AT 11 PM: "TIME FOR A HEALTHY 8 HOURS OF REST"',
        bottom: 'MY BRAIN AT 3:14 AM: "REMEMBER THAT WEIRD THING YOU SAID IN 2017?"',
        full: 'My brain at 3:14 AM: "Remember that weird thing you said in 2017?"'
      },
      {
        top: '"I WILL JUST TAKE A QUICK 20-MINUTE RECHARGE NAP"',
        bottom: 'WAKING UP IN ANOTHER DIMENSION NOT KNOWING WHAT YEAR IT IS',
        full: 'Waking up from a "quick 20-minute nap" in another dimension'
      },
      {
        top: 'DECIDING NOT TO GO OUT SO I CAN GET TO BED EARLY',
        bottom: 'ME AT 2:45 AM WATCHING A DOCUMENTARY ON DEEP SEA CRABS',
        full: 'Deciding to sleep early vs me at 2:45 AM watching crab documentaries'
      }
    ]
  },
  {
    category: 'Relatable & Everyday',
    captions: [
      {
        top: 'ME AGREEING TO SOCIAL PLANS 3 WEEKS IN ADVANCE',
        bottom: 'VS ME WHEN THE ACTUAL DAY ARRIVES',
        full: 'Me agreeing to plans 3 weeks in advance vs me when the actual day arrives'
      },
      {
        top: 'THAT MOMENT YOU HEAR YOUR OWN VOICE ON A RECORDING',
        bottom: 'AND APOLOGIZE TO EVERYONE WHO HAS EVER SPOKEN TO YOU',
        full: 'Hearing your voice on a recording and apologizing to everyone you ever met'
      },
      {
        top: 'HOLDING MY PHONE OVER MY FACE IN BED',
        bottom: 'KNOWING FULL WELL WHAT GRAVITY IS ABOUT TO DO TO MY NOSE',
        full: 'Holding my phone over my face in bed knowing what gravity is about to do'
      },
      {
        top: 'WALKING PAST A MIRROR IN PUBLIC',
        bottom: 'AND REALIZING I HAVE BEEN WALKING AROUND LOOKING LIKE AN UNLOCKED NPC',
        full: 'Walking past a mirror and realizing I look like an unlocked NPC'
      }
    ]
  }
];

export interface RoastDataset {
  topic: string;
  friendly: string[];
  savage: string[];
  brutal: string[];
}

export const ROAST_DATABASE: RoastDataset[] = [
  {
    topic: 'Selfie & Expression',
    friendly: [
      "Bro is posing like the front camera opened on accident and he just rolled with it.",
      "That smile says 'I passed the exam' but those eyes say 'I guessed on every question'.",
      "You look like the default avatar on an app that hasn't finished loading yet.",
      "Giving major 'I practiced this exact pose in the rearview mirror for 10 minutes' energy.",
      "The confidence of a main character with the lighting of a side quest NPC."
    ],
    savage: [
      "Bro looks like he was generated by an AI that was running out of GPU credits.",
      "You look like someone who argues with people in YouTube comments using full punctuation.",
      "This photo has the exact emotional temperature of room-temperature lukewarm tap water.",
      "You look like the 'before' photo in a commercial that never got an 'after'.",
      "Giving off strong 'I remind the teacher they forgot to collect yesterday\\'s homework' vibes.",
      "Your aura screams: 'I reply within 0.4 seconds to every group chat text'."
    ],
    brutal: [
      "Bro looks like the human embodiment of a skipped Spotify ad.",
      "Even your shadow looks like it's trying to maintain a 6-foot social distance from you.",
      "You look like you ask for the WiFi password at a funeral.",
      "If beige had a personality and was given a smartphone, this would be its selfie.",
      "Bro is radiating 100% pure, unadulterated 'unread email marked as spam' energy.",
      "Your facial expression looks like a CAPTCHA puzzle that failed 3 verification attempts."
    ]
  },
  {
    topic: 'Outfit & Style',
    friendly: [
      "The outfit says 'runway model', but the shoes say 'I have to run after the bus in 4 minutes'.",
      "You dressed like you asked a magic 8-ball what to wear and it said 'Try again later'.",
      "Matching your socks to your existential dread is honestly next-level fashion.",
      "A bold fit! Not necessarily good or bad, just very boldly present in the room."
    ],
    savage: [
      "You dressed like you robbed a mannequin in a store that went bankrupt in 2012.",
      "Bro is dressed like an undercover cop trying to blend in at a middle school skatepark.",
      "That outfit looks like it was selected entirely with your eyes closed and Spotify on shuffle.",
      "You look like a randomized Sim character when the player hits 'Surprise Me'."
    ],
    brutal: [
      "The clothes are wearing YOU, and they look deeply disappointed with the partnership.",
      "Bro spent $300 to look like a background pedestrian in GTA San Andreas.",
      "Your outfit looks like a fashion statement, and that statement is a desperate cry for help.",
      "Even the goodwill donation box would spit this combination right back out."
    ]
  },
  {
    topic: 'Setup & Desk',
    friendly: [
      "The setup looks like NASA Mission Control, but the open tabs are 100% Wikipedia rabbit holes.",
      "Cable management looks like a family of angry snakes decided to move in together.",
      "More RGB lights than a Las Vegas casino, used primarily to watch cooking shorts."
    ],
    savage: [
      "Bro bought a $2,000 graphics card just to play 8-bit indie games and complain about frame drops.",
      "That desk setup has more empty coffee cups than active brain cells currently running.",
      "One accidental elbow nudge away from setting the whole electrical grid of your block on fire."
    ],
    brutal: [
      "The dust on that keyboard is an endangered ecosystem protected by federal law.",
      "Bro built a battlestation to wage war against his own unresolved life responsibilities.",
      "NASA wants their power bill back, and your posture wants a formal written apology."
    ]
  },
  {
    topic: 'Pet & Animal',
    friendly: [
      "This pet is plotting world domination, but is currently distracted by a speck of dust.",
      "10/10 good boy/girl, zero thoughts behind those eyes, just pure unconditional chaos.",
      "Sitting there judging your life choices like a furry landlord demanding rent."
    ],
    savage: [
      "That animal is looking at you like you are the biggest disappointment in its 9 lives.",
      "Zero survival instincts detected. Would trade you for half a chicken nugget without blinking.",
      "This pet has the exact facial expression of someone whose DoorDash order was stolen."
    ],
    brutal: [
      "The pet is actively regretting not running out the front door when the mailman came.",
      "Looking at you like 'I was reincarnated into this household for my sins in a past life'.",
      "That creature looks like it knows your browser history and is deeply traumatized."
    ]
  }
];

/**
 * Generate 3 diverse, hilarious captions based on prompt/category/context
 */
export function generateCaptionsEngine(contextText?: string, categoryFilter?: string): AICaptionResult[] {
  let pool = HUMOR_PRESETS;
  if (categoryFilter && categoryFilter !== 'All') {
    const matched = HUMOR_PRESETS.filter(p => p.category.toLowerCase().includes(categoryFilter.toLowerCase()));
    if (matched.length > 0) {
      pool = matched;
    }
  }

  // Flatten available captions
  const allCaptions = pool.flatMap(p => p.captions.map(c => ({ ...c, category: p.category })));
  
  // Shuffle randomly
  const shuffled = [...allCaptions].sort(() => 0.5 - Math.random());
  
  // If user provided a specific context, customize the top text with their prompt
  const results: AICaptionResult[] = [];
  
  for (let i = 0; i < Math.min(3, shuffled.length); i++) {
    const item = shuffled[i];
    let top = item.top;
    let bottom = item.bottom;
    let full = item.full;

    if (contextText && contextText.trim().length > 2 && i === 0) {
      const cleanPrompt = contextText.trim().toUpperCase();
      top = cleanPrompt.startsWith('WHEN') || cleanPrompt.startsWith('ME') ? cleanPrompt : `WHEN ${cleanPrompt}`;
      bottom = item.bottom;
      full = `${contextText.trim()} — ${item.bottom}`;
    }

    results.push({
      id: `caption-${Date.now()}-${i}`,
      topText: top,
      bottomText: bottom,
      fullCaption: full,
      category: item.category
    });
  }

  return results;
}

/**
 * Generate 3 hilarious roasts at specified intensity
 */
export function generateRoastEngine(level: RoastLevelType, topicHint?: string): RoastResult[] {
  let targetTopic = ROAST_DATABASE[0]; // default selfie
  if (topicHint) {
    const found = ROAST_DATABASE.find(t => t.topic.toLowerCase().includes(topicHint.toLowerCase()));
    if (found) targetTopic = found;
  } else {
    // Pick random topic
    targetTopic = ROAST_DATABASE[Math.floor(Math.random() * ROAST_DATABASE.length)];
  }

  const lines = targetTopic[level] || targetTopic.savage;
  const shuffled = [...lines].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, 3).map((roast, index) => {
    let punchline = '💀 EMOTIONAL DAMAGE';
    if (level === 'friendly') punchline = '😇 PLAYFUL BURN';
    if (level === 'savage') punchline = '🔥 CERTIFIED SAVAGE';
    if (level === 'brutal') punchline = '💀 FATALITY LEVEL ROAST';

    return {
      id: `roast-${Date.now()}-${index}`,
      roast,
      level,
      punchline
    };
  });
}
