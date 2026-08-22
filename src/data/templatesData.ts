import { MemeTemplate } from '../types';

// Helper to generate rich visual SVGs for templates so they work 100% offline with zero external network image dependencies
const createTemplateSvg = (svgContent: string): string => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;
};

export const MEME_TEMPLATES: MemeTemplate[] = [
  // 🔥 REACTION
  {
    id: 'drake-choice',
    title: 'Drake Hotline Approval',
    category: 'Reaction',
    aspectRatio: '1:1',
    tags: ['drake', 'choice', 'reject', 'approve', 'classic'],
    defaultTopText: 'WAKING UP AT 6 AM TO BE PRODUCTIVE',
    defaultBottomText: 'STAYING IN BED SCROLLING MEMES UNTIL NOON',
    previewUrl: createTemplateSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
        <!-- Top Half: Orange jacket Drake Disgusted / Rejecting -->
        <rect x="0" y="0" width="300" height="300" fill="#E08328"/>
        <rect x="300" y="0" width="300" height="300" fill="#FFFFFF"/>
        <circle cx="150" cy="120" r="50" fill="#8D5B4C"/>
        <path d="M120,170 Q150,220 180,170" fill="#D97706"/>
        <!-- Hand up pushing away -->
        <path d="M80,140 L40,110 L50,80 L90,110 Z" fill="#8D5B4C"/>
        <text x="150" y="270" font-family="Impact, sans-serif" font-size="28" fill="#1E293B" text-anchor="middle">❌ NAH</text>
        
        <!-- Bottom Half: Orange jacket Drake Pointing & Smiling -->
        <line x1="0" y1="300" x2="600" y2="300" stroke="#0F172A" stroke-width="4"/>
        <line x1="300" y1="0" x2="300" y2="600" stroke="#0F172A" stroke-width="4"/>
        <rect x="0" y="300" width="300" height="300" fill="#F59E0B"/>
        <rect x="300" y="300" width="300" height="300" fill="#FFFFFF"/>
        <circle cx="150" cy="420" r="50" fill="#8D5B4C"/>
        <!-- Pointing finger -->
        <path d="M160,450 L250,420 L240,400 L160,430 Z" fill="#8D5B4C"/>
        <text x="150" y="570" font-family="Impact, sans-serif" font-size="28" fill="#1E293B" text-anchor="middle">👉 THATS IT</text>
      </svg>
    `)
  },
  {
    id: 'distracted-boyfriend',
    title: 'Distracted Boyfriend',
    category: 'Reaction',
    aspectRatio: '16:9',
    tags: ['distracted', 'jealous', 'choice', 'funny'],
    defaultTopText: 'ME TRYING TO SAVE MONEY FOR ADULT RESPONSIBILITIES',
    defaultBottomText: 'ANOTHER USELESS $40 GADGET WITH 2-DAY SHIPPING',
    previewUrl: createTemplateSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
        <defs>
          <linearGradient id="streetBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#334155"/>
            <stop offset="100%" stop-color="#0F172A"/>
          </linearGradient>
        </defs>
        <rect width="800" height="450" fill="url(#streetBg)"/>
        <!-- Walking Woman in Red (Distraction) -->
        <circle cx="200" cy="180" r="45" fill="#F87171"/>
        <rect x="175" y="230" width="50" height="150" rx="10" fill="#DC2626"/>
        <text x="200" y="420" font-family="Impact" font-size="22" fill="#FCA5A5" text-anchor="middle">NEW SHINY THING</text>
        <!-- Boyfriend turning head -->
        <circle cx="450" cy="170" r="48" fill="#60A5FA"/>
        <rect x="420" y="225" width="60" height="160" rx="10" fill="#2563EB"/>
        <path d="M410,180 L280,180" stroke="#38BDF8" stroke-width="4" stroke-dasharray="6,4"/>
        <text x="450" y="420" font-family="Impact" font-size="22" fill="#93C5FD" text-anchor="middle">ME</text>
        <!-- Girlfriend in blue disgusted -->
        <circle cx="650" cy="185" r="45" fill="#34D399"/>
        <rect x="625" y="235" width="50" height="150" rx="10" fill="#059669"/>
        <text x="650" y="420" font-family="Impact" font-size="22" fill="#6EE7B7" text-anchor="middle">RESPONSIBILITIES</text>
      </svg>
    `)
  },
  {
    id: 'this-is-fine-fire',
    title: 'This Is Fine (Everything on Fire)',
    category: 'Everyday Life',
    aspectRatio: '1:1',
    tags: ['dog', 'fire', 'coffee', 'fine', 'crisis', 'work'],
    defaultTopText: 'MY 47 UNREAD EMAILS, 3 DUE ASSIGNMENTS, AND $12 IN MY ACCOUNT',
    defaultBottomText: 'THIS IS FINE. ☕',
    previewUrl: createTemplateSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
        <!-- Room in flames -->
        <rect width="600" height="600" fill="#7C2D12"/>
        <path d="M0,600 L60,420 L130,550 L200,380 L300,580 L400,350 L480,520 L550,390 L600,600 Z" fill="#EA580C"/>
        <path d="M40,600 L100,480 L180,590 L270,440 L380,600 L460,430 L540,560 L600,600 Z" fill="#FBBF24"/>
        <!-- Table and Coffee Mug -->
        <rect x="180" y="380" width="240" height="40" fill="#78350F" rx="4"/>
        <rect x="220" y="420" width="30" height="160" fill="#451A03"/>
        <rect x="350" y="420" width="30" height="160" fill="#451A03"/>
        <rect x="340" y="340" width="40" height="40" rx="4" fill="#FFFFFF"/>
        <text x="360" y="368" font-size="24" text-anchor="middle">☕</text>
        <!-- Smiling Dog in Hat -->
        <circle cx="270" cy="300" r="60" fill="#D97706"/>
        <ellipse cx="295" cy="315" rx="35" ry="25" fill="#FDE68A"/>
        <circle cx="315" cy="305" r="8" fill="#000000"/>
        <!-- Smiley mouth -->
        <path d="M280,325 Q305,345 325,325" fill="none" stroke="#000000" stroke-width="4"/>
        <ellipse cx="270" cy="240" rx="45" ry="15" fill="#1E293B"/>
        <rect x="250" y="190" width="40" height="50" fill="#1E293B" rx="4"/>
      </svg>
    `)
  },
  {
    id: 'woman-yelling-at-cat',
    title: 'Woman Yelling at Dinner Cat',
    category: 'Reaction',
    aspectRatio: '16:9',
    tags: ['cat', 'yelling', 'dinner', 'smudge', 'argument'],
    defaultTopText: 'YOU CANNOT SOLVE ALL YOUR PROBLEMS WITH MEMES AND COFFEE',
    defaultBottomText: 'ME:',
    previewUrl: createTemplateSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
        <rect width="400" height="450" fill="#1E293B"/>
        <rect x="400" width="400" height="450" fill="#334155"/>
        <line x1="400" y1="0" x2="400" y2="450" stroke="#0F172A" stroke-width="6"/>
        <!-- Left: Crying blonde woman pointing -->
        <circle cx="180" cy="180" r="60" fill="#FDE047"/>
        <path d="M120,250 L320,180" stroke="#FDE047" stroke-width="14" stroke-linecap="round"/>
        <text x="200" y="380" font-family="Impact" font-size="28" fill="#F87171" text-anchor="middle">😡 SCREAMING</text>
        <!-- Right: Confused white cat sitting at table with salad -->
        <circle cx="600" cy="190" r="55" fill="#FFFFFF"/>
        <polygon points="560,150 580,110 600,150" fill="#FCA5A5"/>
        <polygon points="600,150 620,110 640,150" fill="#FCA5A5"/>
        <circle cx="585" cy="185" r="6" fill="#000"/>
        <circle cx="615" cy="185" r="6" fill="#000"/>
        <rect x="520" y="270" width="160" height="20" rx="6" fill="#10B981"/>
        <text x="600" y="380" font-family="Impact" font-size="28" fill="#38BDF8" text-anchor="middle">🐱 CONFUSED SALAD CAT</text>
      </svg>
    `)
  },
  {
    id: 'expanding-galaxy-brain',
    title: 'Expanding Galaxy Brain',
    category: 'School',
    aspectRatio: '1:1',
    tags: ['brain', 'galaxy', 'iq', 'intellectual', 'levels'],
    defaultTopText: 'LEVEL 1: READING THE ASSIGNMENT',
    defaultBottomText: 'LEVEL 4: ASKING AI TO WRITE A 2000-WORD ESSAY IN 4 SECONDS',
    previewUrl: createTemplateSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
        <defs>
          <linearGradient id="cosmicGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6"/>
            <stop offset="50%" stop-color="#8B5CF6"/>
            <stop offset="100%" stop-color="#EC4899"/>
          </linearGradient>
        </defs>
        <!-- 4 Grid rows -->
        <rect x="0" y="0" width="300" height="150" fill="#1E293B"/>
        <circle cx="450" cy="75" r="30" fill="#64748B"/>
        
        <rect x="0" y="150" width="300" height="150" fill="#0F172A"/>
        <circle cx="450" cy="225" r="36" fill="#38BDF8"/>
        
        <rect x="0" y="300" width="300" height="150" fill="#1E293B"/>
        <circle cx="450" cy="375" r="44" fill="#A855F7"/>
        
        <rect x="0" y="450" width="300" height="150" fill="#0F172A"/>
        <circle cx="450" cy="525" r="54" fill="url(#cosmicGrad)"/>
        <!-- Light beams -->
        <line x1="390" y1="525" x2="510" y2="525" stroke="#FFF" stroke-width="4"/>
        <line x1="450" y1="465" x2="450" y2="585" stroke="#FFF" stroke-width="4"/>
      </svg>
    `)
  },
  {
    id: 'bank-account-check',
    title: 'Checking Bank Account',
    category: 'Money',
    aspectRatio: '1:1',
    tags: ['money', 'broke', 'bank', 'food', 'relatable'],
    defaultTopText: 'ME OPENING MY BANKING APP',
    defaultBottomText: 'AFTER ORDERING FOOD DELIVERY 6 NIGHTS IN A ROW',
    previewUrl: createTemplateSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
        <rect width="600" height="600" fill="#090D16"/>
        <!-- Smartphone showing balance $1.43 -->
        <rect x="180" y="100" width="240" height="400" rx="30" fill="#1E293B" stroke="#334155" stroke-width="6"/>
        <rect x="200" y="160" width="200" height="100" rx="12" fill="#0F172A"/>
        <text x="300" y="195" font-family="sans-serif" font-size="14" fill="#94A3B8" text-anchor="middle">TOTAL AVAILABLE</text>
        <text x="300" y="238" font-family="Impact, sans-serif" font-size="36" fill="#EF4444" text-anchor="middle">$1.43</text>
        <!-- Crying Eyes -->
        <circle cx="300" cy="360" r="45" fill="#FEF08A"/>
        <circle cx="285" cy="355" r="7" fill="#000"/>
        <circle cx="315" cy="355" r="7" fill="#000"/>
        <path d="M280,380 Q300,360 320,380" stroke="#000" stroke-width="3" fill="none"/>
        <text x="300" y="440" font-size="30" text-anchor="middle">💸 💀</text>
      </svg>
    `)
  },
  {
    id: 'coding-at-3am',
    title: 'Developer At 3 AM',
    category: 'Work',
    aspectRatio: '16:9',
    tags: ['coding', 'programmer', 'bug', 'developer', 'work'],
    defaultTopText: 'IT DOESNT WORK: WHY?!',
    defaultBottomText: 'IT SUDDENLY WORKS: WHY??! 😭',
    previewUrl: createTemplateSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
        <rect width="800" height="450" fill="#020617"/>
        <!-- Glowing IDE Monitor -->
        <rect x="160" y="60" width="480" height="280" rx="14" fill="#0F172A" stroke="#38BDF8" stroke-width="4"/>
        <text x="180" y="100" font-family="monospace" font-size="18" fill="#10B981">// TODO: fix this later</text>
        <text x="180" y="130" font-family="monospace" font-size="18" fill="#EF4444">Error: undefined is not a function</text>
        <text x="180" y="160" font-family="monospace" font-size="18" fill="#F59E0B">const fixBug = () =&gt; magic();</text>
        <!-- Staring Tired Face -->
        <circle cx="400" cy="390" r="40" fill="#FDE047"/>
        <ellipse cx="385" cy="380" rx="10" ry="12" fill="#FFF"/>
        <ellipse cx="415" cy="380" rx="10" ry="12" fill="#FFF"/>
        <circle cx="385" cy="380" r="4" fill="#DC2626"/>
        <circle cx="415" cy="380" r="4" fill="#DC2626"/>
      </svg>
    `)
  },
  {
    id: 'gym-day-one',
    title: 'Day 1 at the Gym',
    category: 'Everyday Life',
    aspectRatio: '1:1',
    tags: ['gym', 'fitness', 'workout', 'pain', 'gains'],
    defaultTopText: 'ME DRINKING ONE PROTEIN SHAKE',
    defaultBottomText: 'WAITING FOR MY MUSCLES TO GROW IN 10 MINUTES',
    previewUrl: createTemplateSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
        <rect width="600" height="600" fill="#18181B"/>
        <!-- Dumbbell -->
        <rect x="140" y="280" width="320" height="20" rx="6" fill="#71717A"/>
        <rect x="100" y="240" width="40" height="100" rx="8" fill="#3F3F46"/>
        <rect x="460" y="240" width="40" height="100" rx="8" fill="#3F3F46"/>
        <!-- Flexing Stick Guy -->
        <circle cx="300" cy="180" r="45" fill="#FDE047"/>
        <text x="300" y="195" font-size="32" text-anchor="middle">💪</text>
        <text x="300" y="420" font-family="Impact" font-size="34" fill="#22C55E" text-anchor="middle">FITNESS IS MY PASSION</text>
      </svg>
    `)
  },
  {
    id: 'gaming-one-more-match',
    title: 'Just One More Game',
    category: 'Gaming',
    aspectRatio: '16:9',
    tags: ['gaming', 'sleep', 'late', 'match', 'loss'],
    defaultTopText: '"ONE MORE MATCH BEFORE BED AT 11 PM"',
    defaultBottomText: 'CURRENT TIME: 4:47 AM ON A 7-GAME LOSS STREAK',
    previewUrl: createTemplateSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
        <rect width="800" height="450" fill="#090514"/>
        <rect x="220" y="80" width="360" height="220" rx="16" fill="#1E1B4B" stroke="#A855F7" stroke-width="4"/>
        <text x="400" y="170" font-family="Impact" font-size="48" fill="#EF4444" text-anchor="middle">DEFEAT</text>
        <text x="400" y="220" font-family="sans-serif" font-size="20" fill="#C084FC" text-anchor="middle">RANK DEMOTED</text>
        <text x="400" y="370" font-size="44" text-anchor="middle">🎮 💀 ☕</text>
      </svg>
    `)
  },
  {
    id: 'relationship-overthinking',
    title: 'He is Thinking About Other Women',
    category: 'Relationships',
    aspectRatio: '1:1',
    tags: ['relationship', 'overthinking', 'bed', 'funny'],
    defaultTopText: 'HER: "HE IS PROBABLY THINKING ABOUT OTHER GIRLS"',
    defaultBottomText: 'HIM: "IF A TOMATO IS A FRUIT, IS KETCHUP A SMOOTHIE?"',
    previewUrl: createTemplateSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
        <rect width="600" height="600" fill="#1E1B4B"/>
        <!-- Bed with 2 people -->
        <rect x="80" y="220" width="440" height="260" rx="20" fill="#312E81"/>
        <circle cx="200" cy="270" r="40" fill="#F472B6"/>
        <circle cx="400" cy="270" r="40" fill="#60A5FA"/>
        <!-- Thought bubbles -->
        <ellipse cx="180" cy="140" rx="90" ry="50" fill="#FFFFFF"/>
        <text x="180" y="145" font-family="sans-serif" font-size="14" fill="#000" text-anchor="middle">😡 Who is she?</text>
        
        <ellipse cx="420" cy="140" rx="100" ry="50" fill="#FFFFFF"/>
        <text x="420" y="145" font-family="sans-serif" font-size="13" fill="#000" text-anchor="middle">🤔 Dinosaur physics...</text>
      </svg>
    `)
  },
  {
    id: 'school-math-exam',
    title: 'The Math Example vs The Exam',
    category: 'School',
    aspectRatio: '16:9',
    tags: ['school', 'exam', 'math', 'study', 'stress'],
    defaultTopText: 'THE EXAMPLE IN CLASS: 2 + 2 = 4',
    defaultBottomText: 'QUESTION 1 ON THE EXAM: CALCULATE THE MASS OF THE SUN USING A BANANA',
    previewUrl: createTemplateSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
        <rect width="400" height="450" fill="#064E3B"/>
        <rect x="400" width="400" height="450" fill="#7F1D1D"/>
        <line x1="400" y1="0" x2="400" y2="450" stroke="#FFF" stroke-width="4"/>
        <text x="200" y="120" font-family="Impact" font-size="28" fill="#A7F3D0" text-anchor="middle">CLASS EXAMPLE</text>
        <text x="200" y="240" font-family="monospace" font-size="36" fill="#FFF" text-anchor="middle">2 + 2 = 4 😊</text>
        
        <text x="600" y="120" font-family="Impact" font-size="28" fill="#FECACA" text-anchor="middle">EXAM PAPER</text>
        <text x="600" y="240" font-family="monospace" font-size="24" fill="#FFF" text-anchor="middle">∫ e^(x²) dx + 🚀 = ? 💀</text>
      </svg>
    `)
  },
  {
    id: 'monday-vs-friday',
    title: 'Monday Morning vs Friday 5PM',
    category: 'Work',
    aspectRatio: '1:1',
    tags: ['work', 'monday', 'friday', 'weekend', 'job'],
    defaultTopText: 'MONDAY 8:59 AM: READY TO RESIGN FROM LIFE',
    defaultBottomText: 'FRIDAY 5:01 PM: IMMORTAL GOD OF WEEKEND VIBES',
    previewUrl: createTemplateSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
        <rect x="0" y="0" width="300" height="600" fill="#334155"/>
        <rect x="300" y="0" width="300" height="600" fill="#F59E0B"/>
        <line x1="300" y1="0" x2="300" y2="600" stroke="#0F172A" stroke-width="4"/>
        <text x="150" y="200" font-size="60" text-anchor="middle">🧟</text>
        <text x="150" y="320" font-family="Impact" font-size="24" fill="#CBD5E1" text-anchor="middle">MONDAY</text>
        <text x="450" y="200" font-size="60" text-anchor="middle">🕺</text>
        <text x="450" y="320" font-family="Impact" font-size="24" fill="#1E293B" text-anchor="middle">FRIDAY 5PM</text>
      </svg>
    `)
  }
];
