import {
  AspectRatioType,
  CanvasElement,
  DrawPath,
  FilterSettings,
  MemeProject,
  SpeechBubbleElement,
  StickerElement,
  TextElement
} from '../types';

// Cache for loaded HTMLImageElements to prevent re-decoding every frame
const imageCache = new Map<string, HTMLImageElement>();

export function getCachedImage(src: string): HTMLImageElement | null {
  if (!src) return null;
  if (imageCache.has(src)) {
    const img = imageCache.get(src)!;
    if (img.complete && img.naturalWidth > 0) return img;
    return null;
  }

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = src;
  img.onload = () => {
    // cached and ready
  };
  imageCache.set(src, img);
  return img.complete ? img : null;
}

export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (imageCache.has(src)) {
      const existing = imageCache.get(src)!;
      if (existing.complete && existing.naturalWidth > 0) {
        return resolve(existing);
      }
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

/**
 * Aspect Ratio Dimensions Helper
 */
export function getDimensionsForAspectRatio(ratio: AspectRatioType): { width: number; height: number } {
  switch (ratio) {
    case '1:1':
      return { width: 1080, height: 1080 };
    case '9:16':
      return { width: 1080, height: 1920 };
    case '16:9':
      return { width: 1920, height: 1080 };
    case '4:5':
      return { width: 1080, height: 1350 };
    case '4:3':
      return { width: 1440, height: 1080 };
    case 'custom':
    default:
      return { width: 1080, height: 1080 };
  }
}

/**
 * Apply real-time pixel shaders to image data
 */
export function applyFilterShaders(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  filters: FilterSettings
) {
  if (filters.filterPreset === 'none' && 
      filters.brightness === 0 && 
      filters.contrast === 0 && 
      filters.saturation === 0 && 
      filters.blur === 0 && 
      filters.noise === 0 && 
      filters.hueRotate === 0 && 
      !filters.invert) {
    return;
  }

  // Use CSS filter where possible for ultra-smooth performance
  const filterParts: string[] = [];
  if (filters.brightness !== 0) filterParts.push(`brightness(${100 + filters.brightness}%)`);
  if (filters.contrast !== 0) filterParts.push(`contrast(${100 + filters.contrast}%)`);
  if (filters.saturation !== 0) filterParts.push(`saturate(${100 + filters.saturation}%)`);
  if (filters.hueRotate !== 0) filterParts.push(`hue-rotate(${filters.hueRotate}deg)`);
  if (filters.invert) filterParts.push(`invert(100%)`);
  if (filters.blur > 0) filterParts.push(`blur(${filters.blur}px)`);

  // Presets
  switch (filters.filterPreset) {
    case 'vintage':
      filterParts.push('sepia(45%) contrast(110%) brightness(95%)');
      break;
    case 'noir':
      filterParts.push('grayscale(100%) contrast(140%) brightness(90%)');
      break;
    case 'sepia':
      filterParts.push('sepia(90%) contrast(105%)');
      break;
    case 'cyberpunk':
      filterParts.push('saturate(180%) hue-rotate(290deg) contrast(120%)');
      break;
    case 'deepfry':
    case 'crazy':
      filterParts.push('saturate(350%) contrast(220%) brightness(110%)');
      break;
    case 'pixar':
      filterParts.push('saturate(135%) contrast(115%) brightness(105%)');
      break;
    case 'comic':
      filterParts.push('contrast(160%) saturate(140%)');
      break;
    case 'anime':
      filterParts.push('saturate(150%) brightness(108%) contrast(115%)');
      break;
    case 'sketch':
      filterParts.push('grayscale(100%) contrast(200%)');
      break;
  }

  if (filterParts.length > 0) {
    ctx.filter = filterParts.join(' ');
  }

  // For deep fry or noise: draw pixel grain noise overlay
  if (filters.noise > 0 || filters.filterPreset === 'deepfry' || filters.filterPreset === 'crazy') {
    const noiseAmount = filters.filterPreset === 'deepfry' || filters.filterPreset === 'crazy' ? 45 : filters.noise;
    drawNoiseOverlay(ctx, width, height, noiseAmount);
  }

  // For glitch effect: RGB split
  if (filters.filterPreset === 'glitch') {
    applyGlitchShift(ctx, width, height);
  }
}

function drawNoiseOverlay(ctx: CanvasRenderingContext2D, width: number, height: number, amount: number) {
  const noiseCanvas = document.createElement('canvas');
  noiseCanvas.width = 250;
  noiseCanvas.height = 250;
  const nCtx = noiseCanvas.getContext('2d');
  if (!nCtx) return;

  const imgData = nCtx.createImageData(250, 250);
  const buffer = new Uint32Array(imgData.data.buffer);
  const len = buffer.length;
  const intensity = (amount / 100) * 0.4;

  for (let i = 0; i < len; i++) {
    if (Math.random() < intensity) {
      const val = Math.floor(Math.random() * 255);
      buffer[i] = (255 << 24) | (val << 16) | (val << 8) | val;
    }
  }
  nCtx.putImageData(imgData, 0, 0);

  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.globalCompositeOperation = 'screen';
  ctx.fillStyle = ctx.createPattern(noiseCanvas, 'repeat') || '#fff';
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function applyGlitchShift(ctx: CanvasRenderingContext2D, width: number, height: number) {
  try {
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    const shift = 12;

    for (let y = 0; y < height; y++) {
      if (Math.random() > 0.3) continue; // scanline glitch bands
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const shiftedI = (y * width + Math.min(width - 1, x + shift)) * 4;
        // Shift red channel
        data[i] = data[shiftedI];
      }
    }
    ctx.putImageData(imgData, 0, 0);
  } catch {
    // Ignore cross-origin image canvas read errors gracefully
  }
}

/**
 * Text Auto-wrapping and Measuring
 */
export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

/**
 * Draw Speech Bubbles with customizable styles and tails
 */
function drawSpeechBubbleShape(
  ctx: CanvasRenderingContext2D,
  elem: SpeechBubbleElement,
  w: number,
  h: number
) {
  const x = -w / 2;
  const y = -h / 2;
  const r = 24; // corner radius

  ctx.beginPath();

  if (elem.bubbleStyle === 'comic') {
    // Rounded bubble with directional pointer tail
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);

    // Tail on bottom
    const tailBaseX = x + w * 0.4;
    const tailWidth = 30;
    ctx.lineTo(tailBaseX + tailWidth, y + h);
    ctx.lineTo(elem.tailX, elem.tailY);
    ctx.lineTo(tailBaseX, y + h);

    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  } else if (elem.bubbleStyle === 'thought') {
    // Cloud thought bubble shape
    ctx.arc(x + w * 0.25, y + h * 0.3, h * 0.3, 0, Math.PI * 2);
    ctx.arc(x + w * 0.5, y + h * 0.2, h * 0.35, 0, Math.PI * 2);
    ctx.arc(x + w * 0.75, y + h * 0.3, h * 0.3, 0, Math.PI * 2);
    ctx.arc(x + w * 0.8, y + h * 0.65, h * 0.3, 0, Math.PI * 2);
    ctx.arc(x + w * 0.5, y + h * 0.8, h * 0.35, 0, Math.PI * 2);
    ctx.arc(x + w * 0.2, y + h * 0.65, h * 0.3, 0, Math.PI * 2);
    ctx.closePath();
  } else if (elem.bubbleStyle === 'shout' || elem.bubbleStyle === 'boom') {
    // Spiky jagged starburst
    const numPoints = 16;
    const outerR = Math.max(w, h) * 0.58;
    const innerR = Math.max(w, h) * 0.42;
    for (let i = 0; i < numPoints * 2; i++) {
      const radius = i % 2 === 0 ? outerR : innerR;
      const angle = (i * Math.PI) / numPoints;
      const px = Math.cos(angle) * (radius * (w / Math.max(w, h)));
      const py = Math.sin(angle) * (radius * (h / Math.max(w, h)));
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  } else {
    // Chat message pill / Whisper
    ctx.roundRect(x, y, w, h, 20);
  }

  // Fill bubble
  ctx.fillStyle = elem.bubbleColor || '#FFFFFF';
  ctx.fill();

  // Border stroke
  if (elem.borderWidth > 0) {
    ctx.lineWidth = elem.borderWidth;
    ctx.strokeStyle = elem.borderColor || '#000000';
    if (elem.bubbleStyle === 'whisper') {
      ctx.setLineDash([8, 6]);
    } else {
      ctx.setLineDash([]);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // If thought bubble: draw trailing thought circles towards tail target
  if (elem.bubbleStyle === 'thought') {
    const tX = elem.tailX;
    const tY = elem.tailY;
    const startX = 0;
    const startY = h * 0.5;

    ctx.fillStyle = elem.bubbleColor || '#FFFFFF';
    ctx.strokeStyle = elem.borderColor || '#000000';
    ctx.lineWidth = elem.borderWidth || 3;

    // 3 thought dots
    [0.35, 0.65, 0.95].forEach((pct, idx) => {
      const dotX = startX + (tX - startX) * pct;
      const dotY = startY + (tY - startY) * pct;
      const dotR = 14 - idx * 3;
      ctx.beginPath();
      ctx.arc(dotX, dotY, dotR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
  }
}

/**
 * Main Master Canvas Rendering Function
 */
export function renderMemeCanvas(
  canvas: HTMLCanvasElement,
  project: MemeProject,
  selectedElementId: string | null,
  isExporting: boolean = false,
  activeDrawPath: DrawPath | null = null
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = project.canvasWidth;
  const height = project.canvasHeight;

  // Set physical canvas internal resolution
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  ctx.clearRect(0, 0, width, height);

  // 1. Render Background
  ctx.save();
  ctx.fillStyle = project.backgroundColor || '#0F1117';
  ctx.fillRect(0, 0, width, height);

  // Draw background image with real-time filters
  if (project.backgroundImageUrl) {
    const bgImg = getCachedImage(project.backgroundImageUrl);
    if (bgImg) {
      ctx.save();
      applyFilterShaders(ctx, width, height, project.filters);

      // Cover image fitting
      const imgRatio = bgImg.naturalWidth / bgImg.naturalHeight;
      const canvasRatio = width / height;
      let drawW = width;
      let drawH = height;
      let drawX = 0;
      let drawY = 0;

      if (imgRatio > canvasRatio) {
        drawH = height;
        drawW = height * imgRatio;
        drawX = (width - drawW) / 2;
      } else {
        drawW = width;
        drawH = width / imgRatio;
        drawY = (height - drawH) / 2;
      }

      ctx.drawImage(bgImg, drawX, drawY, drawW, drawH);
      ctx.restore();
    }
  }
  ctx.restore();

  // 2. Render Freehand Drawings
  const allPaths = [...project.drawPaths, ...(activeDrawPath ? [activeDrawPath] : [])];
  allPaths.forEach((path) => {
    if (path.points.length < 2) return;
    ctx.save();
    if (path.isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.strokeStyle = path.color;
      if (path.neonGlow) {
        ctx.shadowColor = path.color;
        ctx.shadowBlur = path.width * 2.5;
      }
    }
    ctx.lineWidth = path.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(path.points[0].x, path.points[0].y);
    for (let i = 1; i < path.points.length; i++) {
      const p = path.points[i];
      ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.restore();
  });

  // 3. Render Top and Bottom Classic Meme Text (if present)
  renderClassicTopBottomText(ctx, project, width, height);

  // 4. Render All Multi-layer Canvas Elements
  const sortedElements = [...project.elements].sort((a, b) => a.zIndex - b.zIndex);

  sortedElements.forEach((elem) => {
    ctx.save();
    const elemX = (elem.x / 100) * width;
    const elemY = (elem.y / 100) * height;

    ctx.translate(elemX, elemY);
    ctx.rotate((elem.rotation * Math.PI) / 180);
    ctx.scale(elem.scale, elem.scale);
    ctx.globalAlpha = elem.opacity;

    if (elem.type === 'text') {
      renderTextElement(ctx, elem);
    } else if (elem.type === 'bubble') {
      renderBubbleElement(ctx, elem);
    } else if (elem.type === 'sticker') {
      renderStickerElement(ctx, elem);
    }

    ctx.restore();

    // Render interactive selection border and handles if selected and not exporting
    if (!isExporting && selectedElementId === elem.id) {
      renderElementTransformHandles(ctx, elem, width, height);
    }
  });

  // 5. Render Optional Watermark
  if (project.watermark) {
    ctx.save();
    ctx.font = 'bold 22px Anton, Impact, sans-serif';
    const watermarkText = 'FORGED WITH MEMEFORGE 🔥';
    const textWidth = ctx.measureText(watermarkText).width;
    const padX = 16;
    const padY = 8;
    const pillW = textWidth + padX * 2;
    const pillH = 36;
    const pillX = width - pillW - 20;
    const pillY = height - pillH - 20;

    // Pill background
    ctx.fillStyle = 'rgba(8, 9, 13, 0.75)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.roundRect(pillX, pillY, pillW, pillH, 18);
    ctx.fill();
    ctx.stroke();

    // Pill text with glowing fire accent
    ctx.fillStyle = '#FFDD00';
    ctx.shadowColor = '#FF5722';
    ctx.shadowBlur = 8;
    ctx.fillText(watermarkText, pillX + padX, pillY + 25);
    ctx.restore();
  }
}

/**
 * Render Classic Top & Bottom Meme Text
 */
function renderClassicTopBottomText(
  ctx: CanvasRenderingContext2D,
  project: MemeProject,
  width: number,
  height: number
) {
  const drawMemeLine = (text: string, isTop: boolean) => {
    if (!text || text.trim() === '') return;
    ctx.save();

    const maxW = width * 0.92;
    let fontSize = Math.floor(width * 0.082); // Dynamic responsive font size
    ctx.font = `900 ${fontSize}px Impact, "Arial Black", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = isTop ? 'top' : 'bottom';

    // Auto reduce font size if text is very long
    let lines = wrapText(ctx, text.toUpperCase(), maxW);
    while (lines.length > 3 && fontSize > 28) {
      fontSize -= 6;
      ctx.font = `900 ${fontSize}px Impact, "Arial Black", sans-serif`;
      lines = wrapText(ctx, text.toUpperCase(), maxW);
    }

    const lineHeight = fontSize * 1.12;
    const startY = isTop ? height * 0.04 : height * 0.96 - (lines.length - 1) * lineHeight;

    lines.forEach((line, index) => {
      const y = isTop ? startY + index * lineHeight : startY + index * lineHeight;

      // Heavy black stroke outline for high-impact meme readability
      ctx.lineWidth = Math.max(8, fontSize * 0.16);
      ctx.strokeStyle = '#000000';
      ctx.lineJoin = 'miter';
      ctx.miterLimit = 2;
      ctx.strokeText(line, width / 2, y);

      // Deep drop shadow
      ctx.shadowColor = 'rgba(0,0,0,0.85)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 4;

      // Crisp pure white fill
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(line, width / 2, y);
    });

    ctx.restore();
  };

  if (project.topText) drawMemeLine(project.topText, true);
  if (project.bottomText) drawMemeLine(project.bottomText, false);
}

/**
 * Render Freeform Text Element
 */
function renderTextElement(ctx: CanvasRenderingContext2D, elem: TextElement) {
  const text = elem.isUppercase ? elem.text.toUpperCase() : elem.text;
  ctx.font = `bold ${elem.fontSize}px ${elem.fontFamily || 'Impact'}, sans-serif`;
  ctx.textAlign = elem.align || 'center';
  ctx.textBaseline = 'middle';

  const lines = text.split('\n');
  const lineHeight = elem.fontSize * 1.2;
  const totalH = lines.length * lineHeight;
  const maxLineW = Math.max(...lines.map((l) => ctx.measureText(l).width), elem.width || 100);

  // Optional background badge box
  if (elem.backgroundColor && elem.backgroundColor !== 'transparent') {
    const pad = elem.backgroundPadding || 14;
    const bgW = maxLineW + pad * 2;
    const bgH = totalH + pad * 2;
    const bgX = -bgW / 2;
    const bgY = -bgH / 2;

    ctx.save();
    ctx.fillStyle = elem.backgroundColor;
    ctx.roundRect(bgX, bgY, bgW, bgH, elem.backgroundBorderRadius || 8);
    ctx.fill();
    ctx.restore();
  }

  // Draw each text line
  lines.forEach((line, idx) => {
    const lineY = (idx - (lines.length - 1) / 2) * lineHeight;

    // Stroke outline
    if (elem.strokeWidth > 0) {
      ctx.lineWidth = elem.strokeWidth;
      ctx.strokeStyle = elem.strokeColor || '#000000';
      ctx.strokeText(line, 0, lineY);
    }

    // Shadow
    if (elem.shadowBlur && elem.shadowBlur > 0) {
      ctx.shadowColor = elem.shadowColor || 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = elem.shadowBlur;
    }

    // Fill
    ctx.fillStyle = elem.fillColor || '#FFFFFF';
    ctx.fillText(line, 0, lineY);
  });
}

/**
 * Render Speech Bubble Element
 */
function renderBubbleElement(ctx: CanvasRenderingContext2D, elem: SpeechBubbleElement) {
  const w = elem.width;
  const h = elem.height;

  // Draw the bubble background & tail
  drawSpeechBubbleShape(ctx, elem, w, h);

  // Draw text inside bubble
  ctx.save();
  ctx.font = `bold ${elem.fontSize}px ${elem.fontFamily || '"Comic Neue"'}, cursive, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = elem.textColor || '#000000';

  const maxTextW = w - (elem.padding || 20) * 2;
  const lines = wrapText(ctx, elem.text, maxTextW);
  const lineHeight = elem.fontSize * 1.25;

  lines.forEach((line, idx) => {
    const lineY = (idx - (lines.length - 1) / 2) * lineHeight;
    ctx.fillText(line, 0, lineY);
  });
  ctx.restore();
}

/**
 * Render Sticker Element
 */
function renderStickerElement(ctx: CanvasRenderingContext2D, elem: StickerElement) {
  if (elem.category === 'Reactions & Emojis' && !elem.src.startsWith('data:image')) {
    // Unicode Emoji sticker
    ctx.font = `${elem.fontSize || 72}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 10;
    ctx.fillText(elem.src, 0, 0);
  } else {
    // SVG or Image sticker
    const img = getCachedImage(elem.src);
    if (img) {
      const drawW = elem.width;
      const drawH = elem.height;
      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    }
  }
}

/**
 * Render Interactive Transform Handles around selected element
 */
function renderElementTransformHandles(
  ctx: CanvasRenderingContext2D,
  elem: CanvasElement,
  canvasW: number,
  canvasH: number
) {
  const cx = (elem.x / 100) * canvasW;
  const cy = (elem.y / 100) * canvasH;
  const w = (elem.width * elem.scale);
  const h = (elem.height * elem.scale);
  const halfW = w / 2;
  const halfH = h / 2;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((elem.rotation * Math.PI) / 180);

  // Selection Bounding Box with animated glowing neon dashed border
  ctx.strokeStyle = '#06B6D4';
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 5]);
  ctx.strokeRect(-halfW - 8, -halfH - 8, w + 16, h + 16);
  ctx.setLineDash([]);

  // Corner Resize Handles (Square pills)
  const corners = [
    { x: -halfW - 8, y: -halfH - 8 },
    { x: halfW + 8, y: -halfH - 8 },
    { x: -halfW - 8, y: halfH + 8 },
    { x: halfW + 8, y: halfH + 8 }
  ];

  ctx.fillStyle = '#06B6D4';
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  corners.forEach((c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  // Rotation Handle at Top
  const rotStemY = -halfH - 36;
  ctx.beginPath();
  ctx.moveTo(0, -halfH - 8);
  ctx.lineTo(0, rotStemY);
  ctx.strokeStyle = '#06B6D4';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Rotation circle icon
  ctx.beginPath();
  ctx.arc(0, rotStemY, 11, 0, Math.PI * 2);
  ctx.fillStyle = '#FF5722';
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.stroke();

  // Draw small 🔄 rotate symbol inside
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('↻', 0, rotStemY);

  // Delete (X) button at top-right
  const delX = halfW + 18;
  const delY = -halfH - 18;
  ctx.beginPath();
  ctx.arc(delX, delY, 12, 0, Math.PI * 2);
  ctx.fillStyle = '#EF4444';
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✕', delX, delY);

  ctx.restore();
}

/**
 * Hit-testing for element selection and handles
 */
export function hitTestElement(
  clickX: number,
  clickY: number,
  elements: CanvasElement[],
  canvasW: number,
  canvasH: number
): { elementId: string | null; handle: 'move' | 'resize' | 'rotate' | 'delete' | 'tail' | null } {
  // Check from topmost zIndex downwards
  const sorted = [...elements].sort((a, b) => b.zIndex - a.zIndex);

  for (const elem of sorted) {
    const cx = (elem.x / 100) * canvasW;
    const cy = (elem.y / 100) * canvasH;
    const rad = (-elem.rotation * Math.PI) / 180;

    // Transform click point into element local space
    const dx = clickX - cx;
    const dy = clickY - cy;
    const localX = dx * Math.cos(rad) - dy * Math.sin(rad);
    const localY = dx * Math.sin(rad) + dy * Math.cos(rad);

    const halfW = (elem.width * elem.scale) / 2 + 8;
    const halfH = (elem.height * elem.scale) / 2 + 8;

    // Check Delete handle (top right)
    const delX = halfW + 10;
    const delY = -halfH - 10;
    if (Math.hypot(localX - delX, localY - delY) <= 20) {
      return { elementId: elem.id, handle: 'delete' };
    }

    // Check Rotation handle (top center)
    const rotY = -halfH - 28;
    if (Math.hypot(localX, localY - rotY) <= 20) {
      return { elementId: elem.id, handle: 'rotate' };
    }

    // Check Resize handle (bottom right corner)
    if (Math.hypot(localX - halfW, localY - halfH) <= 22) {
      return { elementId: elem.id, handle: 'resize' };
    }

    // Check inside element bounding box
    if (localX >= -halfW && localX <= halfW && localY >= -halfH && localY <= halfH) {
      return { elementId: elem.id, handle: 'move' };
    }
  }

  return { elementId: null, handle: null };
}
