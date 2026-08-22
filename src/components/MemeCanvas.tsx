import React, { useEffect, useRef, useState } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Copy,
  Layers,
  Trash2,
  Move,
  Maximize2,
  RotateCw,
  Sparkles,
  Crop,
  CheckCircle2,
  X
} from 'lucide-react';
import { useMeme } from '../context/MemeContext';
import { AspectRatioType, CanvasElement, DrawPath } from '../types';
import { hitTestElement, renderMemeCanvas } from '../engine/canvasEngine';

export const MemeCanvas: React.FC = () => {
  const {
    project,
    selectedElementId,
    setSelectedElementId,
    selectedElement,
    updateElement,
    removeElement,
    duplicateElement,
    bringForward,
    sendBackward,
    toolMode,
    addDrawPath,
    drawColor,
    drawWidth,
    isDrawGlow,
    isDrawEraser,
    setBackgroundImage,
    setAspectRatio,
    setWatermark
  } = useMeme();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Active interaction drag state
  const isInteracting = useRef(false);
  const activeHandle = useRef<'move' | 'resize' | 'rotate' | 'delete' | 'tail' | null>(null);
  const dragStartPos = useRef<{ x: number; y: number; elemX: number; elemY: number; elemScale: number; elemRot: number }>({
    x: 0,
    y: 0,
    elemX: 0,
    elemY: 0,
    elemScale: 1,
    elemRot: 0
  });

  // Freehand drawing in-progress path
  const [activeDrawPath, setActiveDrawPath] = useState<DrawPath | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Render canvas whenever state changes
  useEffect(() => {
    if (!canvasRef.current) return;
    renderMemeCanvas(canvasRef.current, project, selectedElementId, false, activeDrawPath);
  }, [project, selectedElementId, activeDrawPath]);

  // Support clipboard paste (Ctrl+V) for images anywhere on page
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const dataUrl = event.target?.result as string;
              if (dataUrl) {
                setBackgroundImage(dataUrl);
              }
            };
            reader.readAsDataURL(blob);
          }
          break;
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [setBackgroundImage]);

  // Handle uploaded file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setBackgroundImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Convert mouse/touch event into canvas coordinate space
  const getCanvasCoordinates = (e: React.PointerEvent<HTMLCanvasElement>): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = e.clientX;
    const clientY = e.clientY;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  // Pointer Down (Mouse or Touch)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { x, y } = getCanvasCoordinates(e);

    // Freehand Drawing Mode
    if (toolMode === 'draw') {
      isInteracting.current = true;
      const newPath: DrawPath = {
        id: `draw-${Date.now()}`,
        points: [{ x, y }],
        color: drawColor,
        width: drawWidth,
        neonGlow: isDrawGlow,
        isEraser: isDrawEraser
      };
      setActiveDrawPath(newPath);
      canvas.setPointerCapture(e.pointerId);
      return;
    }

    // Element selection & transformation hit test
    const hit = hitTestElement(x, y, project.elements, project.canvasWidth, project.canvasHeight);

    if (hit.handle === 'delete' && hit.elementId) {
      removeElement(hit.elementId);
      return;
    }

    if (hit.elementId) {
      setSelectedElementId(hit.elementId);
      const elem = project.elements.find((el) => el.id === hit.elementId);
      if (elem) {
        isInteracting.current = true;
        activeHandle.current = hit.handle;
        dragStartPos.current = {
          x,
          y,
          elemX: elem.x,
          elemY: elem.y,
          elemScale: elem.scale,
          elemRot: elem.rotation
        };
        canvas.setPointerCapture(e.pointerId);
      }
    } else {
      setSelectedElementId(null);
    }
  };

  // Pointer Move (Mouse drag or Touch drag)
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isInteracting.current) return;
    const { x, y } = getCanvasCoordinates(e);

    // Drawing in progress
    if (toolMode === 'draw') {
      if (activeDrawPath) {
        setActiveDrawPath((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            points: [...prev.points, { x, y }]
          };
        });
      }
      return;
    }

    // Element transformation
    if (!selectedElementId || !activeHandle.current) return;

    const elem = project.elements.find((el) => el.id === selectedElementId);
    if (!elem) return;

    const dx = x - dragStartPos.current.x;
    const dy = y - dragStartPos.current.y;

    if (activeHandle.current === 'move') {
      // Percentage conversion for responsive canvas scaling
      const deltaXPercent = (dx / project.canvasWidth) * 100;
      const deltaYPercent = (dy / project.canvasHeight) * 100;

      updateElement(selectedElementId, {
        x: Math.max(5, Math.min(95, dragStartPos.current.elemX + deltaXPercent)),
        y: Math.max(5, Math.min(95, dragStartPos.current.elemY + deltaYPercent))
      });
    } else if (activeHandle.current === 'resize') {
      const distance = Math.hypot(dx, dy);
      const sign = dx + dy > 0 ? 1 : -1;
      const scaleDelta = (sign * distance) / 250;
      const newScale = Math.max(0.3, Math.min(4.0, dragStartPos.current.elemScale + scaleDelta));

      updateElement(selectedElementId, {
        scale: Number(newScale.toFixed(2))
      });
    } else if (activeHandle.current === 'rotate') {
      const elemCenterCanvasX = (elem.x / 100) * project.canvasWidth;
      const elemCenterCanvasY = (elem.y / 100) * project.canvasHeight;
      const angleRad = Math.atan2(y - elemCenterCanvasY, x - elemCenterCanvasX);
      let angleDeg = Math.round((angleRad * 180) / Math.PI) + 90;
      if (angleDeg < 0) angleDeg += 360;

      updateElement(selectedElementId, {
        rotation: angleDeg
      });
    }
  };

  // Pointer Up
  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isInteracting.current = false;
    activeHandle.current = null;

    if (toolMode === 'draw' && activeDrawPath) {
      if (activeDrawPath.points.length > 1) {
        addDrawPath(activeDrawPath);
      }
      setActiveDrawPath(null);
    }

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Drag and Drop File Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          setBackgroundImage(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Aspect ratio presets
  const ratios: { label: string; value: AspectRatioType; icon: string }[] = [
    { label: '1:1 Square', value: '1:1', icon: '◻️' },
    { label: '9:16 Story', value: '9:16', icon: '📱' },
    { label: '16:9 Wide', value: '16:9', icon: '🖥️' },
    { label: '4:5 Portrait', value: '4:5', icon: '📸' },
    { label: '4:3 Classic', value: '4:3', icon: '🖼️' }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-3 sm:p-5 relative select-none overflow-hidden min-h-[500px]">
      {/* Top Aspect Ratio Controls & Watermark Toggle Bar */}
      <div className="w-full max-w-2xl flex items-center justify-between gap-2 mb-3 bg-dark-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-dark-700/80 shadow-md">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {ratios.map((r) => (
            <button
              key={r.value}
              onClick={() => setAspectRatio(r.value)}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                project.aspectRatio === r.value
                  ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20'
                  : 'bg-dark-800 hover:bg-dark-700 text-slate-300'
              }`}
            >
              <span>{r.icon}</span>
              <span className="hidden sm:inline">{r.label}</span>
              <span className="sm:hidden">{r.value}</span>
            </button>
          ))}
        </div>

        {/* Watermark checkbox */}
        <label className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold cursor-pointer px-2 py-1 rounded-xl hover:bg-dark-800 transition">
          <input
            type="checkbox"
            checked={project.watermark}
            onChange={(e) => setWatermark(e.target.checked)}
            className="accent-brand-orange rounded w-3.5 h-3.5 cursor-pointer"
          />
          <span className="hidden md:inline">Watermark</span>
          <span>🔥</span>
        </label>
      </div>

      {/* Canvas Viewport Stage */}
      <div
        ref={containerRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full max-w-2xl flex-1 flex items-center justify-center rounded-2xl bg-dark-950/70 border-2 transition-all duration-200 overflow-hidden shadow-2xl p-2 ${
          isDragOver
            ? 'border-brand-orange bg-brand-orange/10 scale-[1.01]'
            : 'border-dark-700/80 hover:border-dark-600'
        }`}
        style={{ minHeight: '380px', maxHeight: 'calc(100vh - 240px)' }}
      >
        {/* HTML5 Canvas Render Surface */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="max-w-full max-h-full object-contain rounded-xl shadow-2xl touch-none cursor-crosshair transition-transform"
          style={{
            aspectRatio:
              project.aspectRatio === '1:1'
                ? '1/1'
                : project.aspectRatio === '9:16'
                ? '9/16'
                : project.aspectRatio === '16:9'
                ? '16/9'
                : project.aspectRatio === '4:5'
                ? '4/5'
                : '4/3'
          }}
        />

        {/* Empty State Upload Overlay Prompt if no image */}
        {!project.backgroundImageUrl && (
          <div className="absolute inset-0 m-auto w-fit h-fit max-w-sm p-6 rounded-2xl bg-dark-900/90 backdrop-blur-md border border-dark-700 shadow-2xl flex flex-col items-center text-center gap-3 pointer-events-none animate-float">
            <div className="w-14 h-14 rounded-2xl bg-brand-orange/15 flex items-center justify-center text-brand-orange text-2xl">
              <Upload className="w-7 h-7 animate-bounce-subtle" />
            </div>
            <div>
              <p className="font-extrabold text-sm text-slate-100">Drop an image here</p>
              <p className="text-xs text-slate-400 mt-0.5">or press <kbd className="px-1.5 py-0.5 rounded bg-dark-800 border border-dark-600 font-mono text-[10px]">Ctrl+V</kbd> to paste</p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="pointer-events-auto px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-xs shadow-lg active:scale-95 transition"
            >
              Upload Photo
            </button>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Floating Inspector Action Dock for Selected Element */}
      {selectedElement && (
        <div className="w-full max-w-md mt-3 bg-dark-900/95 backdrop-blur-md px-3 py-2 rounded-2xl border border-brand-cyan/40 shadow-xl flex items-center justify-between gap-2 animate-bounce-subtle">
          <div className="flex items-center gap-1.5 text-xs text-brand-cyan font-extrabold truncate">
            <span className="capitalize">{selectedElement.type} Selected</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => duplicateElement(selectedElement.id)}
              title="Duplicate"
              className="p-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-300 hover:text-white transition"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => bringForward(selectedElement.id)}
              title="Bring Forward"
              className="p-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-300 hover:text-white transition"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                updateElement(selectedElement.id, { x: 50, y: 50 });
              }}
              title="Center on Canvas"
              className="p-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-300 hover:text-white transition"
            >
              <Move className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => removeElement(selectedElement.id)}
              title="Delete Element"
              className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setSelectedElementId(null)}
              title="Deselect"
              className="p-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Image change / upload shortcut pill below canvas if image exists */}
      {project.backgroundImageUrl && !selectedElement && (
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-xl bg-dark-900/80 hover:bg-dark-800 text-slate-300 border border-dark-700 hover:border-slate-500 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Upload className="w-3.5 h-3.5 text-brand-orange" />
            <span>Replace Photo</span>
          </button>
          <button
            onClick={() => setBackgroundImage(null)}
            className="px-3 py-1.5 rounded-xl bg-dark-900/80 hover:bg-red-500/20 text-slate-400 hover:text-red-300 border border-dark-700 text-xs font-semibold transition"
          >
            Remove Photo
          </button>
        </div>
      )}
    </div>
  );
};
