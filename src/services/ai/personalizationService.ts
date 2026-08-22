import { MemeTemplate, StickerElement } from '../../types';

export interface FaceCutoutResult {
  cutoutDataUrl: string;
  detectedFaceX: number; // percentage
  detectedFaceY: number;
  width: number;
  height: number;
}

/**
 * "Put Me In The Meme" Face Processor
 * Performs client-side circular / oval head cutout with soft alpha feathering.
 */
export function createHeadCutout(imageElement: HTMLImageElement): string {
  const canvas = document.createElement('canvas');
  const size = Math.min(imageElement.naturalWidth, imageElement.naturalHeight);
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return imageElement.src;

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.45;

  // Clip circular / oval head mask
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  const srcX = (imageElement.naturalWidth - size) / 2;
  const srcY = (imageElement.naturalHeight - size) / 2;
  ctx.drawImage(imageElement, srcX, srcY, size, size, 0, 0, size, size);

  // Soft border glow
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#FFFFFF';
  ctx.stroke();

  return canvas.toDataURL('image/png');
}

/**
 * Inject User's Face into any Meme Template as a high-layer sticker
 */
export function createPersonalizedFaceSticker(cutoutDataUrl: string, template: MemeTemplate): StickerElement {
  return {
    id: `personalized-face-${Date.now()}`,
    type: 'sticker',
    stickerId: 'user-face-cutout',
    src: cutoutDataUrl,
    name: 'My Face in Meme',
    category: 'Personalized Face',
    x: 50,
    y: 45,
    width: 180,
    height: 180,
    rotation: 0,
    scale: 1,
    opacity: 1,
    zIndex: 10
  };
}
