import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  AspectRatioType,
  CanvasElement,
  DrawPath,
  FilterSettings,
  MemeProject,
  MemeTemplate,
  SpeechBubbleElement,
  StickerElement,
  TextElement,
  ToolMode
} from '../types';
import { getDimensionsForAspectRatio } from '../engine/canvasEngine';
import { loadProjectFromStorage, saveProjectToStorage } from '../services/storageService';

interface MemeContextType {
  project: MemeProject;
  setProject: React.Dispatch<React.SetStateAction<MemeProject>>;
  toolMode: ToolMode;
  setToolMode: (mode: ToolMode) => void;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  selectedElement: CanvasElement | null;
  
  // History
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  
  // Elements Operations
  addElement: (element: CanvasElement) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  removeElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  
  // Top/Bottom Classic Text
  setTopText: (text: string) => void;
  setBottomText: (text: string) => void;

  // Background & Framing
  setBackgroundImage: (dataUrl: string | null) => void;
  setAspectRatio: (ratio: AspectRatioType) => void;
  setBackgroundColor: (color: string) => void;
  setWatermark: (enabled: boolean) => void;
  setFilters: (filters: Partial<FilterSettings>) => void;
  resetFilters: () => void;

  // Drawing
  addDrawPath: (path: DrawPath) => void;
  clearDrawings: () => void;
  drawColor: string;
  setDrawColor: (color: string) => void;
  drawWidth: number;
  setDrawWidth: (width: number) => void;
  isDrawGlow: boolean;
  setIsDrawGlow: (glow: boolean) => void;
  isDrawEraser: boolean;
  setIsDrawEraser: (eraser: boolean) => void;

  // Project Level
  clearProject: () => void;
  loadTemplate: (template: MemeTemplate) => void;
  
  // Modals
  isExportModalOpen: boolean;
  setIsExportModalOpen: (open: boolean) => void;
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (open: boolean) => void;
  isTemplatesModalOpen: boolean;
  setIsTemplatesModalOpen: (open: boolean) => void;
}

const DEFAULT_FILTERS: FilterSettings = {
  filterPreset: 'none',
  brightness: 0,
  contrast: 0,
  saturation: 0,
  blur: 0,
  noise: 0,
  hueRotate: 0,
  invert: false
};

const createDefaultProject = (): MemeProject => {
  const dims = getDimensionsForAspectRatio('1:1');
  return {
    id: `project-${Date.now()}`,
    name: 'Legendary Meme',
    timestamp: Date.now(),
    canvasWidth: dims.width,
    canvasHeight: dims.height,
    aspectRatio: '1:1',
    backgroundImageUrl: null,
    backgroundColor: '#0F1117',
    topText: 'WHEN YOU DISCOVER',
    bottomText: 'MEMEFORGE STUDIO 🔥',
    elements: [],
    drawPaths: [],
    filters: { ...DEFAULT_FILTERS },
    watermark: true
  };
};

const MemeContext = createContext<MemeContextType | undefined>(undefined);

export const MemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [project, setProject] = useState<MemeProject>(() => {
    const saved = loadProjectFromStorage();
    return saved || createDefaultProject();
  });

  const [toolMode, setToolMode] = useState<ToolMode>('meme');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  // History stack for Undo / Redo
  const [history, setHistory] = useState<MemeProject[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const isHistoryAction = useRef(false);

  // Drawing state
  const [drawColor, setDrawColor] = useState<string>('#FF5722');
  const [drawWidth, setDrawWidth] = useState<number>(8);
  const [isDrawGlow, setIsDrawGlow] = useState<boolean>(true);
  const [isDrawEraser, setIsDrawEraser] = useState<boolean>(false);

  // Modals state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);

  // Push to history when project state changes
  useEffect(() => {
    if (isHistoryAction.current) {
      isHistoryAction.current = false;
      return;
    }

    setHistory((prev) => {
      const upToCurrent = prev.slice(0, historyIndex + 1);
      return [...upToCurrent, project];
    });
    setHistoryIndex((prev) => prev + 1);

    // Auto-save to LocalStorage
    saveProjectToStorage(project);
  }, [project]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const undo = () => {
    if (!canUndo) return;
    isHistoryAction.current = true;
    const targetIdx = historyIndex - 1;
    const targetState = history[targetIdx];
    setHistoryIndex(targetIdx);
    setProject(targetState);
    saveProjectToStorage(targetState);
  };

  const redo = () => {
    if (!canRedo) return;
    isHistoryAction.current = true;
    const targetIdx = historyIndex + 1;
    const targetState = history[targetIdx];
    setHistoryIndex(targetIdx);
    setProject(targetState);
    saveProjectToStorage(targetState);
  };

  const selectedElement = project.elements.find((e) => e.id === selectedElementId) || null;

  const addElement = (element: CanvasElement) => {
    setProject((prev) => ({
      ...prev,
      elements: [...prev.elements, element]
    }));
    setSelectedElementId(element.id);
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setProject((prev) => ({
      ...prev,
      elements: prev.elements.map((el) => (el.id === id ? ({ ...el, ...updates } as CanvasElement) : el))
    }));
  };

  const removeElement = (id: string) => {
    setProject((prev) => ({
      ...prev,
      elements: prev.elements.filter((el) => el.id !== id)
    }));
    if (selectedElementId === id) {
      setSelectedElementId(null);
    }
  };

  const duplicateElement = (id: string) => {
    const target = project.elements.find((el) => el.id === id);
    if (!target) return;

    const cloned: CanvasElement = {
      ...target,
      id: `elem-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      x: Math.min(90, target.x + 5),
      y: Math.min(90, target.y + 5),
      zIndex: project.elements.length + 1
    };

    addElement(cloned);
  };

  const bringForward = (id: string) => {
    setProject((prev) => {
      const el = prev.elements.find((e) => e.id === id);
      if (!el) return prev;
      return {
        ...prev,
        elements: prev.elements.map((e) => (e.id === id ? { ...e, zIndex: e.zIndex + 1 } : e))
      };
    });
  };

  const sendBackward = (id: string) => {
    setProject((prev) => {
      const el = prev.elements.find((e) => e.id === id);
      if (!el) return prev;
      return {
        ...prev,
        elements: prev.elements.map((e) => (e.id === id ? { ...e, zIndex: Math.max(0, e.zIndex - 1) } : e))
      };
    });
  };

  const setTopText = (text: string) => {
    setProject((prev) => ({ ...prev, topText: text }));
  };

  const setBottomText = (text: string) => {
    setProject((prev) => ({ ...prev, bottomText: text }));
  };

  const setBackgroundImage = (dataUrl: string | null) => {
    setProject((prev) => ({
      ...prev,
      backgroundImageUrl: dataUrl
    }));
  };

  const setAspectRatio = (ratio: AspectRatioType) => {
    const dims = getDimensionsForAspectRatio(ratio);
    setProject((prev) => ({
      ...prev,
      aspectRatio: ratio,
      canvasWidth: dims.width,
      canvasHeight: dims.height
    }));
  };

  const setBackgroundColor = (color: string) => {
    setProject((prev) => ({ ...prev, backgroundColor: color }));
  };

  const setWatermark = (enabled: boolean) => {
    setProject((prev) => ({ ...prev, watermark: enabled }));
  };

  const setFilters = (filters: Partial<FilterSettings>) => {
    setProject((prev) => ({
      ...prev,
      filters: { ...prev.filters, ...filters }
    }));
  };

  const resetFilters = () => {
    setProject((prev) => ({
      ...prev,
      filters: { ...DEFAULT_FILTERS }
    }));
  };

  const addDrawPath = (path: DrawPath) => {
    setProject((prev) => ({
      ...prev,
      drawPaths: [...prev.drawPaths, path]
    }));
  };

  const clearDrawings = () => {
    setProject((prev) => ({
      ...prev,
      drawPaths: []
    }));
  };

  const clearProject = () => {
    setSelectedElementId(null);
    setProject(createDefaultProject());
  };

  const loadTemplate = (template: MemeTemplate) => {
    const dims = getDimensionsForAspectRatio(template.aspectRatio);
    setSelectedElementId(null);
    setProject({
      id: `project-${Date.now()}`,
      name: template.title,
      timestamp: Date.now(),
      canvasWidth: dims.width,
      canvasHeight: dims.height,
      aspectRatio: template.aspectRatio,
      backgroundImageUrl: template.previewUrl,
      backgroundColor: '#0F1117',
      topText: template.defaultTopText || '',
      bottomText: template.defaultBottomText || '',
      elements: [],
      drawPaths: [],
      filters: { ...DEFAULT_FILTERS },
      watermark: true
    });
  };

  return (
    <MemeContext.Provider
      value={{
        project,
        setProject,
        toolMode,
        setToolMode,
        selectedElementId,
        setSelectedElementId,
        selectedElement,
        undo,
        redo,
        canUndo,
        canRedo,
        addElement,
        updateElement,
        removeElement,
        duplicateElement,
        bringForward,
        sendBackward,
        setTopText,
        setBottomText,
        setBackgroundImage,
        setAspectRatio,
        setBackgroundColor,
        setWatermark,
        setFilters,
        resetFilters,
        addDrawPath,
        clearDrawings,
        drawColor,
        setDrawColor,
        drawWidth,
        setDrawWidth,
        isDrawGlow,
        setIsDrawGlow,
        isDrawEraser,
        setIsDrawEraser,
        clearProject,
        loadTemplate,
        isExportModalOpen,
        setIsExportModalOpen,
        isSettingsModalOpen,
        setIsSettingsModalOpen,
        isTemplatesModalOpen,
        setIsTemplatesModalOpen
      }}
    >
      {children}
    </MemeContext.Provider>
  );
};

export const useMeme = () => {
  const ctx = useContext(MemeContext);
  if (!ctx) {
    throw new Error('useMeme must be used within a MemeProvider');
  }
  return ctx;
};
