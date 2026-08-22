export interface StickerItem {
  id: string;
  name: string;
  category: 'Classic Memes' | 'Thug Life & Drip' | 'Viral Badges' | 'Reactions & Emojis' | 'Comic SFX';
  src: string; // SVG data URL or emoji string
  isEmoji?: boolean;
}

// Generate crisp SVG data URLs for high-impact meme stickers
const createSvgDataUrl = (svgContent: string): string => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;
};

export const STICKER_CATEGORIES = [
  'All',
  'Classic Memes',
  'Thug Life & Drip',
  'Viral Badges',
  'Reactions & Emojis',
  'Comic SFX'
] as const;

export const STICKERS_DATA: StickerItem[] = [
  // 🕶️ THUG LIFE & DRIP
  {
    id: 'thug-pixel-glasses',
    name: 'Pixel Sunnies (Deal With It)',
    category: 'Thug Life & Drip',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40">
        <!-- Pixel 8-bit thug glasses -->
        <rect x="10" y="8" width="55" height="24" fill="#000000" rx="2" />
        <rect x="95" y="8" width="55" height="24" fill="#000000" rx="2" />
        <rect x="65" y="16" width="30" height="8" fill="#000000" />
        <!-- White pixel glints -->
        <rect x="15" y="12" width="6" height="6" fill="#FFFFFF" />
        <rect x="23" y="12" width="6" height="6" fill="#FFFFFF" />
        <rect x="23" y="20" width="6" height="6" fill="#FFFFFF" />
        <rect x="100" y="12" width="6" height="6" fill="#FFFFFF" />
        <rect x="108" y="12" width="6" height="6" fill="#FFFFFF" />
        <rect x="108" y="20" width="6" height="6" fill="#FFFFFF" />
      </svg>
    `)
  },
  {
    id: 'gold-dollar-chain',
    name: 'Gold Dollar Medallion',
    category: 'Thug Life & Drip',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFE259"/>
            <stop offset="50%" stop-color="#FFA751"/>
            <stop offset="100%" stop-color="#FFD700"/>
          </linearGradient>
        </defs>
        <!-- Chain links -->
        <path d="M20,10 Q50,45 80,10" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round"/>
        <path d="M25,18 Q50,50 75,18" fill="none" stroke="#FFA751" stroke-width="4" stroke-dasharray="6,4"/>
        <!-- Big Gold Coin with Dollar Sign -->
        <circle cx="50" cy="65" r="26" fill="url(#goldGrad)" stroke="#B8860B" stroke-width="3" />
        <circle cx="50" cy="65" r="22" fill="#D4AF37" stroke="#FFE259" stroke-width="2" />
        <!-- Dollar Symbol -->
        <text x="50" y="76" font-family="Impact, sans-serif" font-size="34" font-weight="bold" fill="#3D2B00" text-anchor="middle">$</text>
      </svg>
    `)
  },
  {
    id: 'thug-cigar',
    name: 'Pixel Smoke / Joint',
    category: 'Thug Life & Drip',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40">
        <rect x="10" y="16" width="60" height="8" fill="#FFFFFF" rx="1"/>
        <rect x="70" y="16" width="10" height="8" fill="#D97706" />
        <rect x="80" y="16" width="8" height="8" fill="#EF4444" />
        <!-- Smoke puffs -->
        <circle cx="90" cy="12" r="4" fill="#E2E8F0" opacity="0.8"/>
        <circle cx="94" cy="6" r="6" fill="#CBD5E1" opacity="0.6"/>
      </svg>
    `)
  },
  {
    id: 'crown-gold',
    name: 'King Crown',
    category: 'Thug Life & Drip',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80">
        <defs>
          <linearGradient id="crownGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#FFDF00"/>
            <stop offset="100%" stop-color="#D4AF37"/>
          </linearGradient>
        </defs>
        <path d="M10,65 L15,25 L35,45 L50,15 L65,45 L85,25 L90,65 Z" fill="url(#crownGrad)" stroke="#B8860B" stroke-width="3" stroke-linejoin="round"/>
        <!-- Jewels -->
        <circle cx="50" cy="15" r="4" fill="#EF4444"/>
        <circle cx="15" cy="25" r="4" fill="#3B82F6"/>
        <circle cx="85" cy="25" r="4" fill="#10B981"/>
        <circle cx="50" cy="55" r="5" fill="#EF4444"/>
        <circle cx="30" cy="58" r="4" fill="#3B82F6"/>
        <circle cx="70" cy="58" r="4" fill="#10B981"/>
      </svg>
    `)
  },

  // 👑 CLASSIC MEMES
  {
    id: 'pepe-smirk',
    name: 'Pepe Feels Good',
    category: 'Classic Memes',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="#689F38" stroke="#33691E" stroke-width="4"/>
        <!-- Pepe Big Eyes -->
        <ellipse cx="36" cy="38" rx="14" ry="10" fill="#FFFFFF" stroke="#1B5E20" stroke-width="2"/>
        <circle cx="36" cy="38" r="6" fill="#4E342E"/>
        <ellipse cx="64" cy="38" rx="14" ry="10" fill="#FFFFFF" stroke="#1B5E20" stroke-width="2"/>
        <circle cx="64" cy="38" r="6" fill="#4E342E"/>
        <!-- Pepe Big Thick Lips Smile -->
        <path d="M22,60 Q50,85 78,60 Q65,68 50,68 Q35,68 22,60 Z" fill="#8D6E63" stroke="#4E342E" stroke-width="3"/>
        <path d="M22,60 Q50,75 78,60" fill="none" stroke="#3E2723" stroke-width="3"/>
      </svg>
    `)
  },
  {
    id: 'doge-face',
    name: 'Doge Wow',
    category: 'Classic Memes',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="#E6C280" stroke="#C49A45" stroke-width="3"/>
        <!-- Doge Ears -->
        <path d="M16,28 L30,8 L40,24 Z" fill="#C49A45"/>
        <path d="M84,28 L70,8 L60,24 Z" fill="#C49A45"/>
        <!-- Eyes with iconic sideways glance -->
        <ellipse cx="36" cy="42" rx="7" ry="9" fill="#FFFFFF" stroke="#333" stroke-width="1.5"/>
        <circle cx="39" cy="42" r="4" fill="#1E293B"/>
        <ellipse cx="64" cy="42" rx="7" ry="9" fill="#FFFFFF" stroke="#333" stroke-width="1.5"/>
        <circle cx="67" cy="42" r="4" fill="#1E293B"/>
        <!-- Snout -->
        <ellipse cx="50" cy="62" rx="16" ry="12" fill="#FBF0D9"/>
        <polygon points="46,55 54,55 50,61" fill="#1E293B"/>
        <path d="M44,65 Q50,72 56,65" fill="none" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `)
  },
  {
    id: 'gigachad-chin',
    name: 'Gigachad Jawline',
    category: 'Classic Memes',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <polygon points="50,10 85,25 80,75 50,95 20,75 15,25" fill="#1E293B" stroke="#94A3B8" stroke-width="3"/>
        <!-- Sharp sculpted jaw contours -->
        <path d="M25,45 L50,55 L75,45" fill="none" stroke="#38BDF8" stroke-width="3"/>
        <path d="M35,68 L50,82 L65,68" fill="none" stroke="#F43F5E" stroke-width="4"/>
        <line x1="50" y1="20" x2="50" y2="50" stroke="#94A3B8" stroke-width="3"/>
      </svg>
    `)
  },
  {
    id: 'stonks-arrow',
    name: 'STONKS Up Arrow',
    category: 'Classic Memes',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80">
        <defs>
          <linearGradient id="stonksGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FF8A00"/>
            <stop offset="100%" stop-color="#E52E71"/>
          </linearGradient>
        </defs>
        <!-- Zigzagging Orange-Red Arrow going UP -->
        <path d="M10,70 L45,45 L65,58 L105,15" fill="none" stroke="url(#stonksGrad)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
        <polygon points="115,10 90,12 110,32" fill="#E52E71"/>
      </svg>
    `)
  },
  {
    id: 'not-stonks-arrow',
    name: 'NOT STONKS Down',
    category: 'Classic Memes',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80">
        <path d="M10,15 L45,35 L65,22 L105,68" fill="none" stroke="#3B82F6" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
        <polygon points="115,75 90,70 108,50" fill="#3B82F6"/>
      </svg>
    `)
  },
  {
    id: 'amogus-sus',
    name: 'SUS Crewmate ඞ',
    category: 'Classic Memes',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <!-- Backpack -->
        <rect x="18" y="32" width="16" height="38" rx="6" fill="#B91C1C" stroke="#000000" stroke-width="4"/>
        <!-- Body -->
        <path d="M30,82 L30,30 Q30,12 55,12 Q80,12 80,30 L80,82 L68,82 L68,70 L42,70 L42,82 Z" fill="#DC2626" stroke="#000000" stroke-width="4" stroke-linejoin="round"/>
        <!-- Visor -->
        <rect x="52" y="24" width="34" height="20" rx="9" fill="#67E8F9" stroke="#000000" stroke-width="4"/>
        <rect x="58" y="27" width="22" height="7" rx="3" fill="#FFFFFF" opacity="0.8"/>
      </svg>
    `)
  },

  // 💥 VIRAL BADGES
  {
    id: 'badge-certified-dank',
    name: 'CERTIFIED DANK',
    category: 'Viral Badges',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 60">
        <rect x="4" y="4" width="152" height="52" rx="10" fill="#FF5722" stroke="#FFFFFF" stroke-width="4"/>
        <rect x="8" y="8" width="144" height="44" rx="8" fill="none" stroke="#FFDD00" stroke-width="2" stroke-dasharray="6,3"/>
        <text x="80" y="38" font-family="Impact, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">CERTIFIED DANK</text>
      </svg>
    `)
  },
  {
    id: 'badge-emotional-damage',
    name: 'EMOTIONAL DAMAGE',
    category: 'Viral Badges',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 50">
        <rect x="3" y="3" width="174" height="44" rx="8" fill="#9333EA" stroke="#F43F5E" stroke-width="3"/>
        <text x="90" y="32" font-family="Anton, Impact, sans-serif" font-size="18" font-weight="bold" fill="#FDE047" text-anchor="middle">💀 EMOTIONAL DAMAGE</text>
      </svg>
    `)
  },
  {
    id: 'badge-no-cap',
    name: 'NO CAP 🧢',
    category: 'Viral Badges',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 50">
        <rect x="3" y="3" width="124" height="44" rx="22" fill="#06B6D4" stroke="#FFFFFF" stroke-width="3"/>
        <text x="65" y="32" font-family="Impact, sans-serif" font-size="20" fill="#FFFFFF" text-anchor="middle">NO CAP 🧢</text>
      </svg>
    `)
  },
  {
    id: 'badge-huge-w',
    name: 'MASSIVE W',
    category: 'Viral Badges',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="#10B981" stroke="#FFFFFF" stroke-width="5"/>
        <text x="50" y="70" font-family="Impact, sans-serif" font-size="60" font-weight="bold" fill="#FFFFFF" text-anchor="middle">W</text>
      </svg>
    `)
  },
  {
    id: 'badge-common-l',
    name: 'COMMON L',
    category: 'Viral Badges',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="#EF4444" stroke="#FFFFFF" stroke-width="5"/>
        <text x="50" y="70" font-family="Impact, sans-serif" font-size="60" font-weight="bold" fill="#FFFFFF" text-anchor="middle">L</text>
      </svg>
    `)
  },
  {
    id: 'badge-fire-100',
    name: '100 PERCENT',
    category: 'Viral Badges',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 70">
        <text x="60" y="50" font-family="Impact, sans-serif" font-size="52" font-weight="bold" fill="#DC2626" text-anchor="middle">100</text>
        <line x1="15" y1="58" x2="105" y2="58" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/>
        <line x1="20" y1="65" x2="100" y2="65" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/>
      </svg>
    `)
  },
  {
    id: 'badge-warning-dank',
    name: 'DANGER: HIGH CRINGE',
    category: 'Viral Badges',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 50">
        <polygon points="10,40 25,10 40,40" fill="#EAB308" stroke="#000" stroke-width="2"/>
        <text x="25" y="36" font-family="Impact" font-size="20" text-anchor="middle" fill="#000">!</text>
        <rect x="48" y="8" width="126" height="34" rx="6" fill="#18181B" stroke="#EAB308" stroke-width="2"/>
        <text x="111" y="31" font-family="Impact" font-size="14" fill="#FACC15" text-anchor="middle">HIGH CRINGE ALERT</text>
      </svg>
    `)
  },

  // 💥 COMIC SFX
  {
    id: 'sfx-boom',
    name: 'BOOM! Burst',
    category: 'Comic SFX',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100">
        <polygon points="70,5 88,32 120,15 110,48 138,65 106,75 112,100 80,85 65,100 55,80 20,95 32,68 2,52 35,38 18,12 52,28" fill="#FFCC00" stroke="#E60000" stroke-width="5" stroke-linejoin="round"/>
        <text x="70" y="62" font-family="Bangers, Impact, sans-serif" font-size="34" font-weight="bold" fill="#E60000" stroke="#FFFFFF" stroke-width="2" text-anchor="middle">BOOM!</text>
      </svg>
    `)
  },
  {
    id: 'sfx-pow',
    name: 'POW! Comic Hit',
    category: 'Comic SFX',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 90">
        <polygon points="65,5 80,28 115,15 102,45 125,65 95,72 98,90 70,78 50,90 42,72 10,80 25,52 2,35 32,30 20,8 50,22" fill="#EC4899" stroke="#3B82F6" stroke-width="4"/>
        <text x="65" y="55" font-family="Bangers, Impact, sans-serif" font-size="32" font-weight="bold" fill="#FFFFFF" text-anchor="middle">POW!</text>
      </svg>
    `)
  },
  {
    id: 'sfx-sheesh',
    name: 'SHEEEESH',
    category: 'Comic SFX',
    src: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50">
        <rect x="4" y="4" width="152" height="42" rx="21" fill="#F43F5E" stroke="#FFDD00" stroke-width="3"/>
        <text x="80" y="32" font-family="Permanent Marker, cursive" font-size="22" fill="#FFFFFF" text-anchor="middle">SHEEEESH!</text>
      </svg>
    `)
  },

  // 😂 REACTIONS & EMOJIS (High Impact rendered as SVG or unicode)
  {
    id: 'emoji-skull',
    name: 'Skull 💀',
    category: 'Reactions & Emojis',
    isEmoji: true,
    src: '💀'
  },
  {
    id: 'emoji-laughing-crying',
    name: 'Joy 😂',
    category: 'Reactions & Emojis',
    isEmoji: true,
    src: '😂'
  },
  {
    id: 'emoji-crying-loud',
    name: 'Loud Cry 😭',
    category: 'Reactions & Emojis',
    isEmoji: true,
    src: '😭'
  },
  {
    id: 'emoji-moai',
    name: 'Moai / Gigachad 🗿',
    category: 'Reactions & Emojis',
    isEmoji: true,
    src: '🗿'
  },
  {
    id: 'emoji-clown',
    name: 'Clown 🤡',
    category: 'Reactions & Emojis',
    isEmoji: true,
    src: '🤡'
  },
  {
    id: 'emoji-fire',
    name: 'Fire 🔥',
    category: 'Reactions & Emojis',
    isEmoji: true,
    src: '🔥'
  },
  {
    id: 'emoji-mindblown',
    name: 'Mind Blown 🤯',
    category: 'Reactions & Emojis',
    isEmoji: true,
    src: '🤯'
  },
  {
    id: 'emoji-eyes',
    name: 'Side Eye 👀',
    category: 'Reactions & Emojis',
    isEmoji: true,
    src: '👀'
  },
  {
    id: 'emoji-salute',
    name: 'Salute 🫡',
    category: 'Reactions & Emojis',
    isEmoji: true,
    src: '🫡'
  },
  {
    id: 'emoji-pleading',
    name: 'Pleading / Puppy 🥺',
    category: 'Reactions & Emojis',
    isEmoji: true,
    src: '🥺'
  },
  {
    id: 'emoji-melting',
    name: 'Melting 🫠',
    category: 'Reactions & Emojis',
    isEmoji: true,
    src: '🫠'
  },
  {
    id: 'emoji-popcorn',
    name: 'Popcorn 🍿',
    category: 'Reactions & Emojis',
    isEmoji: true,
    src: '🍿'
  },
  {
    id: 'emoji-rocket',
    name: 'Rocket To The Moon 🚀',
    category: 'Reactions & Emojis',
    isEmoji: true,
    src: '🚀'
  }
];
