export interface MemeCategoryItem {
  id: string;
  title: string;
  emoji: string;
  imageUrl: string;
  tag: string;
  gradientFallback: string;
}

const createSvgDataUrl = (svgContent: string): string => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;
};

export const MEME_CATEGORIES: MemeCategoryItem[] = [
  {
    id: 'trending',
    title: 'Trending',
    emoji: '🔥',
    imageUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="tBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3b0764"/>
            <stop offset="50%" stop-color="#1e1b4b"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
          <linearGradient id="neonPink" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stop-color="#f43f5e"/>
            <stop offset="50%" stop-color="#ec4899"/>
            <stop offset="100%" stop-color="#fbbf24"/>
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#tBg)"/>
        <line x1="40" y1="320" x2="360" y2="320" stroke="#334155" stroke-width="3"/>
        <line x1="40" y1="240" x2="360" y2="240" stroke="#334155" stroke-width="1" stroke-dasharray="6,6"/>
        <line x1="40" y1="160" x2="360" y2="160" stroke="#334155" stroke-width="1" stroke-dasharray="6,6"/>
        <path d="M40 300 L120 220 L190 260 L290 110 L360 70" fill="none" stroke="url(#neonPink)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
        <polygon points="360,70 310,75 345,115" fill="#fbbf24"/>
        <circle cx="120" cy="220" r="12" fill="#ec4899"/>
        <circle cx="190" cy="260" r="12" fill="#f43f5e"/>
        <circle cx="290" cy="110" r="14" fill="#fbbf24"/>
        <text x="290" y="70" font-size="34">🚀</text>
        <text x="70" y="120" font-size="42">📈</text>
        <text x="80" y="370" font-family="Arial, sans-serif" font-weight="900" font-size="22" fill="#38bdf8">+420% VIRAL</text>
      </svg>
    `),
    tag: 'Hot Now',
    gradientFallback: 'from-pink-900 to-indigo-950'
  },
  {
    id: 'ai-memes',
    title: 'AI Memes',
    emoji: '🤖',
    imageUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="aiBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#082f49"/>
            <stop offset="100%" stop-color="#020617"/>
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#aiBg)"/>
        <circle cx="200" cy="180" r="120" fill="#0284c7" opacity="0.25"/>
        <rect x="110" y="100" width="180" height="150" rx="30" fill="#0ea5e9" stroke="#38bdf8" stroke-width="8"/>
        <rect x="130" y="140" width="140" height="35" rx="8" fill="#0f172a"/>
        <line x1="140" y1="157" x2="260" y2="157" stroke="#f43f5e" stroke-width="10" stroke-linecap="round"/>
        <line x1="200" y1="100" x2="200" y2="45" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>
        <circle cx="200" cy="35" r="18" fill="#fbbf24"/>
        <circle cx="200" cy="35" r="8" fill="#ffffff"/>
        <rect x="150" y="200" width="100" height="20" rx="6" fill="#0f172a"/>
        <rect x="160" y="205" width="12" height="10" fill="#38bdf8"/>
        <rect x="180" y="205" width="12" height="10" fill="#38bdf8"/>
        <rect x="200" y="205" width="12" height="10" fill="#38bdf8"/>
        <rect x="220" y="205" width="12" height="10" fill="#38bdf8"/>
        <text x="50" y="100" font-size="40">🧠</text>
        <text x="310" y="120" font-size="40">⚡</text>
        <text x="200" y="340" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="#38bdf8" text-anchor="middle">GPT-2026</text>
      </svg>
    `),
    tag: 'Future',
    gradientFallback: 'from-cyan-900 to-blue-950'
  },
  {
    id: 'movies-tv',
    title: 'Movies & TV',
    emoji: '🎬',
    imageUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="movBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#451a03"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#movBg)"/>
        <rect x="100" y="220" width="200" height="180" rx="30" fill="#1e293b"/>
        <polygon points="200,220 160,330 240,330" fill="#ffffff"/>
        <polygon points="175,235 225,235 200,250" fill="#be123c"/>
        <polygon points="175,265 225,265 200,250" fill="#be123c"/>
        <circle cx="200" cy="250" r="6" fill="#fbbf24"/>
        <circle cx="200" cy="140" r="65" fill="#fed7aa"/>
        <path d="M135 130 Q200 60 265 110 Q250 80 180 85 Q140 100 135 130 Z" fill="#b45309"/>
        <path d="M165 135 Q175 125 185 135" stroke="#78350f" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M215 135 Q225 125 235 135" stroke="#78350f" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M175 165 Q200 190 225 165" stroke="#be123c" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M280 200 L320 130 L360 200 Z" fill="#fef08a" opacity="0.9" stroke="#f59e0b" stroke-width="4"/>
        <line x1="320" y1="200" x2="320" y2="280" stroke="#f59e0b" stroke-width="8"/>
        <ellipse cx="320" cy="280" rx="30" ry="10" fill="#f59e0b"/>
        <text x="330" y="110" font-size="34">✨</text>
        <text x="40" y="120" font-size="40">🥂</text>
      </svg>
    `),
    tag: 'Cinema',
    gradientFallback: 'from-amber-950 to-slate-950'
  },
  {
    id: 'cricket',
    title: 'Cricket',
    emoji: '🏏',
    imageUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="cricBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1e3a8a"/>
            <stop offset="100%" stop-color="#020617"/>
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#cricBg)"/>
        <circle cx="60" cy="60" r="30" fill="#fef08a" opacity="0.3"/>
        <circle cx="340" cy="60" r="30" fill="#fef08a" opacity="0.3"/>
        <rect x="120" y="210" width="160" height="190" rx="30" fill="#2563eb"/>
        <text x="200" y="280" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#ffffff" text-anchor="middle">INDIA</text>
        <circle cx="200" cy="140" r="60" fill="#fed7aa"/>
        <path d="M140 130 Q200 80 260 130" fill="#1e3a8a"/>
        <rect x="130" y="120" width="140" height="20" rx="8" fill="#1d4ed8"/>
        <rect x="155" y="130" width="35" height="20" rx="4" fill="#0f172a"/>
        <rect x="210" y="130" width="35" height="20" rx="4" fill="#0f172a"/>
        <path d="M165 175 Q200 195 235 175" stroke="#18181b" stroke-width="6" fill="none" stroke-linecap="round"/>
        <polygon points="310,120 370,120 355,220 325,220" fill="#fbbf24" stroke="#d97706" stroke-width="4"/>
        <circle cx="340" cy="100" r="25" fill="#fde047"/>
        <text x="50" y="180" font-size="44">🏏</text>
        <text x="40" y="320" font-size="34">🏆</text>
      </svg>
    `),
    tag: 'Match Day',
    gradientFallback: 'from-blue-900 to-indigo-950'
  },
  {
    id: 'bollywood',
    title: 'Bollywood',
    emoji: '🎥',
    imageUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="bollyBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#831843"/>
            <stop offset="100%" stop-color="#1e1b4b"/>
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#bollyBg)"/>
        <rect x="110" y="210" width="180" height="190" rx="25" fill="#18181b"/>
        <polygon points="200,210 160,320 240,320" fill="#dc2626"/>
        <circle cx="200" cy="135" r="60" fill="#fed7aa"/>
        <path d="M135 125 Q200 50 265 125 Q245 70 170 75 Z" fill="#0f172a"/>
        <ellipse cx="170" cy="135" rx="22" ry="16" fill="#0f172a" stroke="#fbbf24" stroke-width="3"/>
        <ellipse cx="230" cy="135" rx="22" ry="16" fill="#0f172a" stroke="#fbbf24" stroke-width="3"/>
        <line x1="192" y1="130" x2="208" y2="130" stroke="#fbbf24" stroke-width="3"/>
        <path d="M175 165 Q200 185 225 165" stroke="#991b1b" stroke-width="5" fill="none" stroke-linecap="round"/>
        <text x="40" y="100" font-size="44">🌹</text>
        <text x="320" y="110" font-size="44">🕶️</text>
        <text x="200" y="340" font-family="Arial, sans-serif" font-weight="900" font-size="20" fill="#fbbf24" text-anchor="middle">BLOCKBUSTER</text>
      </svg>
    `),
    tag: 'Iconic',
    gradientFallback: 'from-pink-950 to-purple-950'
  },
  {
    id: 'gaming',
    title: 'Gaming',
    emoji: '🎮',
    imageUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="gameBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#581c87"/>
            <stop offset="100%" stop-color="#020617"/>
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#gameBg)"/>
        <rect x="70" y="130" width="260" height="150" rx="60" fill="#1e1b4b" stroke="#a855f7" stroke-width="8"/>
        <rect x="120" y="170" width="40" height="70" rx="8" fill="#3b0764"/>
        <rect x="105" y="185" width="70" height="40" rx="8" fill="#3b0764"/>
        <circle cx="260" cy="180" r="14" fill="#f43f5e"/>
        <circle cx="285" cy="205" r="14" fill="#38bdf8"/>
        <circle cx="235" cy="205" r="14" fill="#eab308"/>
        <circle cx="260" cy="230" r="14" fill="#22c55e"/>
        <circle cx="200" cy="205" r="22" fill="#a855f7"/>
        <text x="200" y="214" font-size="20" text-anchor="middle">⚡</text>
        <text x="40" y="90" font-size="44">🕹️</text>
        <text x="320" y="90" font-size="44">🔥</text>
        <text x="200" y="340" font-family="Arial, sans-serif" font-weight="900" font-size="22" fill="#c084fc" text-anchor="middle">GG NO RE</text>
      </svg>
    `),
    tag: 'Esports',
    gradientFallback: 'from-purple-950 to-slate-950'
  },
  {
    id: 'office',
    title: 'Office',
    emoji: '💼',
    imageUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="offBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1e293b"/>
            <stop offset="100%" stop-color="#090d16"/>
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#offBg)"/>
        <rect x="110" y="210" width="180" height="190" rx="25" fill="#334155"/>
        <polygon points="200,210 170,330 230,330" fill="#ffffff"/>
        <polygon points="200,225 190,320 210,320" fill="#2563eb"/>
        <circle cx="200" cy="135" r="60" fill="#fed7aa"/>
        <path d="M140 120 Q200 65 260 120 Q240 75 160 80 Z" fill="#1e293b"/>
        <ellipse cx="175" cy="130" rx="8" ry="12" fill="#0f172a"/>
        <ellipse cx="225" cy="130" rx="8" ry="12" fill="#0f172a"/>
        <path d="M175 170 Q200 170 225 170" stroke="#78350f" stroke-width="5" fill="none" stroke-linecap="round"/>
        <rect x="290" y="220" width="80" height="70" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="4"/>
        <path d="M370 235 Q395 255 370 275" fill="none" stroke="#cbd5e1" stroke-width="6"/>
        <text x="330" y="250" font-family="Arial, sans-serif" font-size="10" font-weight="900" fill="#0f172a" text-anchor="middle">WORLDS</text>
        <text x="330" y="265" font-family="Arial, sans-serif" font-size="10" font-weight="900" fill="#0f172a" text-anchor="middle">BEST</text>
        <text x="330" y="280" font-family="Arial, sans-serif" font-size="10" font-weight="900" fill="#0f172a" text-anchor="middle">BOSS</text>
        <text x="40" y="100" font-size="44">☕</text>
      </svg>
    `),
    tag: 'Corporate',
    gradientFallback: 'from-slate-800 to-slate-950'
  },
  {
    id: 'relationships',
    title: 'Relationships',
    emoji: '❤️',
    imageUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="relBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#881337"/>
            <stop offset="100%" stop-color="#1e1b4b"/>
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#relBg)"/>
        <circle cx="150" cy="170" r="50" fill="#fed7aa"/>
        <circle cx="270" cy="160" r="45" fill="#fed7aa"/>
        <path d="M200 70 C170 30 110 50 140 100 L200 150 L260 100 C290 50 230 30 200 70 Z" fill="#f43f5e"/>
        <ellipse cx="160" cy="165" rx="7" ry="10" fill="#0f172a"/>
        <ellipse cx="260" cy="155" rx="7" ry="10" fill="#0f172a"/>
        <text x="40" y="100" font-size="44">👀</text>
        <text x="320" y="100" font-size="44">💅</text>
        <text x="200" y="340" font-family="Arial, sans-serif" font-weight="900" font-size="20" fill="#fda4af" text-anchor="middle">ME VS TEMPTATION</text>
      </svg>
    `),
    tag: 'Dating',
    gradientFallback: 'from-rose-950 to-pink-950'
  },
  {
    id: 'animals',
    title: 'Animals',
    emoji: '🐱',
    imageUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="animBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#7c2d12"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#animBg)"/>
        <circle cx="200" cy="200" r="100" fill="#f97316"/>
        <polygon points="120,130 100,50 170,100" fill="#ea580c"/>
        <polygon points="280,130 300,50 230,100" fill="#ea580c"/>
        <polygon points="125,120 115,70 160,100" fill="#fbcfe8"/>
        <polygon points="275,120 285,70 240,100" fill="#fbcfe8"/>
        <path d="M140 170 Q165 145 190 170" stroke="#0f172a" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M210 170 Q235 145 260 170" stroke="#0f172a" stroke-width="8" fill="none" stroke-linecap="round"/>
        <ellipse cx="200" cy="230" rx="50" ry="40" fill="#881337"/>
        <path d="M170 250 Q200 220 230 250" fill="#f43f5e"/>
        <line x1="80" y1="200" x2="130" y2="210" stroke="#ffffff" stroke-width="4"/>
        <line x1="80" y1="225" x2="130" y2="225" stroke="#ffffff" stroke-width="4"/>
        <line x1="320" y1="200" x2="270" y2="210" stroke="#ffffff" stroke-width="4"/>
        <line x1="320" y1="225" x2="270" y2="225" stroke="#ffffff" stroke-width="4"/>
        <text x="310" y="80" font-size="44">😂</text>
      </svg>
    `),
    tag: 'Cute & Chaos',
    gradientFallback: 'from-orange-950 to-amber-950'
  },
  {
    id: 'desi-memes',
    title: 'Desi Memes',
    emoji: '🇮🇳',
    imageUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="desiBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#b45309"/>
            <stop offset="100%" stop-color="#1e1b4b"/>
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#desiBg)"/>
        <rect x="110" y="210" width="180" height="190" rx="25" fill="#f59e0b"/>
        <circle cx="200" cy="135" r="60" fill="#fed7aa"/>
        <path d="M145 165 Q175 140 200 170 Q225 140 255 165 Q230 190 200 175 Q170 190 145 165 Z" fill="#18181b"/>
        <circle cx="165" cy="125" r="25" fill="#ffffff" stroke="#18181b" stroke-width="6"/>
        <circle cx="235" cy="125" r="25" fill="#ffffff" stroke="#18181b" stroke-width="6"/>
        <line x1="190" y1="125" x2="210" y2="125" stroke="#18181b" stroke-width="6"/>
        <circle cx="165" cy="125" r="8" fill="#0f172a"/>
        <circle cx="235" cy="125" r="8" fill="#0f172a"/>
        <rect x="195" y="85" width="10" height="20" rx="4" fill="#dc2626"/>
        <text x="40" y="100" font-size="44">🇮🇳</text>
        <text x="320" y="100" font-size="44">🔥</text>
        <text x="200" y="340" font-family="Arial, sans-serif" font-weight="900" font-size="20" fill="#fde68a" text-anchor="middle">KOPDI TOD SAALE KA</text>
      </svg>
    `),
    tag: 'Peak Relatable',
    gradientFallback: 'from-yellow-950 to-orange-950'
  }
];
