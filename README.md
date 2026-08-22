# 🔥 MemeForge — AI Meme & Cartoon Studio

> **"Turn ordinary moments into legendary memes."**

MemeForge is a modern, high-energy browser & phone-ready meme and cartoon creation studio engineered with 2026 web standards. It runs 100% free of cost with zero server latency, client-side privacy, GPU shaders, interactive speech bubbles, rich sticker libraries, AI-powered caption generators, and savage photo roasting.

---

## ✨ Features

- 🎭 **Classic & Freeform Meme Editor**: Top/Bottom impact text, freeform draggable/rotatable text boxes with 10+ iconic fonts (*Impact, Anton, Bangers, Comic Neue, Fredoka, Permanent Marker, Orbitron, Poppins, Pacifico, Creepster*).
- 🎨 **Real-time Cartoonify Studio**: 6 instant GPU shader pipelines:
  - 🧸 *Cute Cartoon* (Pastel glow)
  - 📰 *Comic Book* (Halftone dots & ink outlines)
  - 🎬 *Pixar-like 3D* (Specular bloom & depth)
  - ✏️ *Pencil Sketch* (Graphite cross-hatching)
  - 🤪 *Crazy Meme / Deep Fry* (Hyper-saturated crunch)
  - 🎌 *Anime-inspired* (Cel-shaded contours)
- 🗯️ **Dynamic Speech Bubbles**: 6 styles (*Comic dialogue, Thought cloud with trailing dots, Spiky Scream/Yell, Whisper, Modern Chat Pill, Action Burst*) with draggable tail pointers.
- 🔥 **Roast My Photo**: Playful, savage, and brutal burn generator tailored to selfies, outfits, pets, gaming setups, and food with 1-click photo stamping.
- ✨ **AI Caption Generator**: "Generate 3 Captions" with situational prompts, multi-vibe presets, smart offline humor heuristics, and optional Google Gemini API connection.
- 😎 **Extensive Sticker Library**: Classic Memes (*Pepe, Doge, Gigachad, Wojak, Stonks, Distracted Guy, Trollface*), Thug Life (*Pixel glasses, Gold dollar chain, Joint*), Viral Badges (*Certified Dank, Emotional Damage, No Cap, 100, W, L*), SFX (*BOOM, POW, SHEESH*), and **Custom Sticker Uploads**.
- ✏️ **Freehand Neon Glow Brush**: Neon graffiti pen, marker, eraser, and stroke size controls.
- 📐 **Aspect Ratio Presets**: 1:1 Square, 9:16 TikTok/Reels/Story, 16:9 Landscape, 4:5 Instagram, 4:3 Classic.
- 💾 **Offline-First & Auto-Save**: LocalStorage persistence, undo/redo history stack, project JSON export & import.
- 🚀 **Multi-Format HD Export**: Lossless PNG, high-quality JPEG, WebP, 1-click Copy to Clipboard (with confetti!), and native Web Share API.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 18 + TypeScript + Vite 6
- **Styling**: Tailwind CSS + Lucide Icons + Custom Google Typography
- **Engine**: High-performance multi-layer HTML5 Canvas rendering & pixel shaders
- **Effects**: Canvas Confetti celebration engine
- **AI Service Adapter**: Dual-engine architecture (Offline Smart Heuristics + Optional Google Gemini 2.0 / 1.5 Flash API)

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run local development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📦 Push to GitHub (`messyuc`)

To push this project to your GitHub account:

```bash
git init
git add .
git commit -m "Initial commit: MemeForge AI Meme & Cartoon Studio"
git branch -M main
git remote add origin https://github.com/messyuc/memeforge.git
git push -u origin main
```

---

## 🔒 Privacy & API Configuration

- **Default Mode (100% Free, Zero Setup)**: All meme editing, cartoon shaders, roasts, and caption generators run locally in your browser with zero API keys required.
- **Optional Cloud AI Key**: Open the Settings modal (`⚙️`) to input a Google Gemini API key for live multimodal cloud generation.
