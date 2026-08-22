import React, { useRef, useState, useEffect } from 'react';
import { X, Download, Copy, Share2, FileCode, Check, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMeme } from '../../context/MemeContext';
import { renderMemeCanvas } from '../../engine/canvasEngine';
import { exportProjectJson } from '../../services/storageService';
import { soundService } from '../../services/soundService';

export const ExportModal: React.FC = () => {
  const { project, isExportModalOpen, setIsExportModalOpen } = useMeme();
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  useEffect(() => {
    if (!isExportModalOpen || !previewCanvasRef.current) return;
    // Render clean export version without transform handles
    renderMemeCanvas(previewCanvasRef.current, project, null, true, null);
  }, [isExportModalOpen, project]);

  if (!isExportModalOpen) return null;

  const triggerCelebration = () => {
    soundService.playVictoryChime();
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });
  };

  const handleDownloadImage = (format: 'png' | 'jpeg' | 'webp') => {
    if (!previewCanvasRef.current) return;
    setIsExporting(true);

    const canvas = previewCanvasRef.current;
    const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
    const dataUrl = canvas.toDataURL(mimeType, 0.95);

    const anchor = document.createElement('a');
    anchor.href = dataUrl;
    anchor.download = `memeforge-${project.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.${format}`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    triggerCelebration();
    setIsExporting(false);
  };

  const handleCopyToClipboard = async () => {
    if (!previewCanvasRef.current) return;

    try {
      previewCanvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        try {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          setCopied(true);
          triggerCelebration();
          setTimeout(() => setCopied(false), 2500);
        } catch {
          alert('Copied link or image not supported on this browser context.');
        }
      }, 'image/png');
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
  };

  const handleWebShare = async () => {
    if (!previewCanvasRef.current) return;

    if (navigator.share) {
      previewCanvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        try {
          const file = new File([blob], 'memeforge-creation.png', { type: 'image/png' });
          await navigator.share({
            title: 'Forged with MemeForge',
            text: 'Check out this meme I made on MemeForge!',
            files: [file]
          });
        } catch (err) {
          console.warn('Share cancelled or not supported:', err);
        }
      });
    } else {
      alert('Native Web Share is not supported on this device/browser.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl rounded-3xl bg-dark-900 border border-dark-700 shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-orange/15 text-brand-orange">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black font-anton uppercase tracking-wide text-slate-100">
                Export Your Meme
              </h2>
              <p className="text-xs text-slate-400">Download high-res HD image or copy to clipboard</p>
            </div>
          </div>

          <button
            onClick={() => setIsExportModalOpen(false)}
            className="p-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col sm:flex-row items-center gap-6 overflow-y-auto max-h-[75vh]">
          {/* Canvas Preview */}
          <div className="w-full sm:w-1/2 flex items-center justify-center rounded-2xl bg-dark-950 border border-dark-800 p-2 shadow-inner">
            <canvas
              ref={previewCanvasRef}
              className="max-w-full max-h-64 object-contain rounded-xl shadow-lg"
            />
          </div>

          {/* Export Actions */}
          <div className="w-full sm:w-1/2 flex flex-col gap-3">
            <button
              onClick={() => handleDownloadImage('png')}
              disabled={isExporting}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-brand-orange via-brand-pink to-brand-purple hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/25 active:scale-98 transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download HD PNG</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleDownloadImage('jpeg')}
                className="py-2.5 px-3 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-200 border border-dark-700 font-bold text-xs transition"
              >
                Download JPEG
              </button>
              <button
                onClick={() => handleDownloadImage('webp')}
                className="py-2.5 px-3 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-200 border border-dark-700 font-bold text-xs transition"
              >
                Download WebP
              </button>
            </div>

            <button
              onClick={handleCopyToClipboard}
              className="w-full py-3 px-4 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-200 border border-dark-700 hover:border-brand-cyan font-bold text-xs transition flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-brand-cyan" />
                  <span>Copy Image to Clipboard</span>
                </>
              )}
            </button>

            {typeof navigator !== 'undefined' && !!navigator.share && (
              <button
                onClick={handleWebShare}
                className="w-full py-2.5 px-4 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-300 border border-dark-700 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4 text-brand-pink" />
                <span>Share via Phone / Apps</span>
              </button>
            )}

            <button
              onClick={() => exportProjectJson(project)}
              className="w-full py-2.5 px-4 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-slate-200 border border-dark-700/80 text-[11px] font-semibold transition flex items-center justify-center gap-2"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Save Project File (.memeforge)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
