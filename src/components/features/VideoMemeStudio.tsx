import React, { useRef, useState, useEffect } from 'react';
import {
  Film,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Upload,
  Sparkles,
  Download,
  Scissors,
  Sliders,
  Crop,
  Layers,
  Wand2
} from 'lucide-react';
import { useMeme } from '../../context/MemeContext';
import { generateVideoHooks } from '../../services/ai/videoMemeService';
import { soundService } from '../../services/soundService';

export const VideoMemeStudio: React.FC = () => {
  const { videoProject, setVideoProject } = useMeme();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // Tracks the in-flight export so we can tear it down cleanly if this view unmounts mid-recording
  const activeExportRef = useRef<{ recorder: MediaRecorder; progressTimer: number } | null>(null);
  const isMountedRef = useRef(true);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [exportedVideoUrl, setExportedVideoUrl] = useState<string | null>(null);
  const [exportUnsupported, setExportUnsupported] = useState<boolean>(false);
  const [aiHooks, setAiHooks] = useState<string[]>([]);

  // Real export support check — MediaRecorder + canvas.captureStream, both native browser APIs
  const exportSupported =
    typeof window !== 'undefined' &&
    typeof MediaRecorder !== 'undefined' &&
    typeof HTMLCanvasElement !== 'undefined' &&
    typeof (HTMLCanvasElement.prototype as any).captureStream === 'function';

  // Sample demo video if none uploaded
  const demoVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

  const activeVideoUrl = videoProject.videoUrl || demoVideoUrl;

  const CANVAS_DIMS: Record<'9:16' | '1:1' | '16:9', { w: number; h: number }> = {
    '9:16': { w: 720, h: 1280 },
    '1:1': { w: 720, h: 720 },
    '16:9': { w: 1280, h: 720 }
  };

  // Keep the export canvas sized to the chosen aspect ratio (it defaulted to 300x150 before, breaking export)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dims = CANVAS_DIMS[videoProject.aspectRatio];
    canvas.width = dims.w;
    canvas.height = dims.h;
  }, [videoProject.aspectRatio]);

  // Render video canvas frame loop
  useEffect(() => {
    let animationFrameId: number;

    const drawFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas && !video.paused && !video.ended) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const w = canvas.width;
          const h = canvas.height;

          ctx.clearRect(0, 0, w, h);
          ctx.drawImage(video, 0, 0, w, h);

          // Draw Top Banner Text
          if (videoProject.topBannerText) {
            ctx.fillStyle = videoProject.bannerBgColor;
            ctx.fillRect(0, 0, w, 80);
            ctx.font = `900 ${videoProject.fontSize}px Impact, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = videoProject.textColor;
            ctx.fillText(videoProject.topBannerText.toUpperCase(), w / 2, 40);
          }

          // Draw Bottom Banner Text
          if (videoProject.bottomBannerText) {
            ctx.fillStyle = videoProject.bannerBgColor;
            ctx.fillRect(0, h - 80, w, 80);
            ctx.font = `900 ${videoProject.fontSize}px Impact, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = videoProject.textColor;
            ctx.fillText(videoProject.bottomBannerText.toUpperCase(), w / 2, h - 40);
          }
        }
        setCurrentTime(video.currentTime);
      }
      animationFrameId = requestAnimationFrame(drawFrame);
    };

    animationFrameId = requestAnimationFrame(drawFrame);
    return () => cancelAnimationFrame(animationFrameId);
  }, [videoProject]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      soundService.playPop();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revoke the previous upload's object URL before replacing it — otherwise each
    // re-upload leaks the prior blob for the life of the tab.
    if (videoProject.videoUrl) {
      URL.revokeObjectURL(videoProject.videoUrl);
    }

    const url = URL.createObjectURL(file);
    setVideoProject((prev) => ({
      ...prev,
      videoUrl: url,
      videoFileName: file.name
    }));
    soundService.playSparkle();
  };

  // Revoke the uploaded video's and any exported video's object URLs when this view unmounts
  useEffect(() => {
    return () => {
      if (videoProject.videoUrl) URL.revokeObjectURL(videoProject.videoUrl);
      if (exportedVideoUrl) URL.revokeObjectURL(exportedVideoUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerateHooks = () => {
    soundService.playSparkle();
    const { hooks } = generateVideoHooks('work meeting');
    setAiHooks(hooks);
  };

  // Real export: records the canvas (video frames + burned-in banner text, drawn by the loop above)
  // via canvas.captureStream() + MediaRecorder — no server, no new dependency. Produces a real
  // downloadable .webm file. If the browser lacks these native APIs, we say so — we do not fake success.
  const handleExportVideo = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    if (!exportSupported) {
      setExportUnsupported(true);
      return;
    }

    const mimeType = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'].find((t) =>
      MediaRecorder.isTypeSupported(t)
    );
    if (!mimeType) {
      setExportUnsupported(true);
      return;
    }

    soundService.playPop();
    setExportUnsupported(false);
    // Revoke any previous export's blob URL before starting a new one
    setExportedVideoUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setExportProgress(0);
    setIsExporting(true);

    const dims = CANVAS_DIMS[videoProject.aspectRatio];
    canvas.width = dims.w;
    canvas.height = dims.h;

    const wasLooping = video.loop;
    video.loop = false;
    video.currentTime = 0;
    video.playbackRate = 1;

    // Capture the canvas (visuals + captions). Add the source video's audio track too, unless muted.
    const canvasStream = (canvas as any).captureStream(30) as MediaStream;
    let outputStream = canvasStream;
    if (!video.muted && typeof (video as any).captureStream === 'function') {
      try {
        const audioTracks = ((video as any).captureStream() as MediaStream).getAudioTracks();
        if (audioTracks.length) {
          outputStream = new MediaStream([...canvasStream.getVideoTracks(), ...audioTracks]);
        }
      } catch (err) {
        console.warn('Audio capture unavailable, exporting video-only:', err);
      }
    }

    const recorder = new MediaRecorder(outputStream, { mimeType });
    const chunks: BlobPart[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    const teardown = () => {
      if (activeExportRef.current?.progressTimer) window.clearInterval(activeExportRef.current.progressTimer);
      activeExportRef.current = null;
      video.loop = wasLooping;
      video.onended = null;
    };

    const cleanupAndFinish = () => {
      teardown();
      if (!isMountedRef.current) return; // view was unmounted mid-export — don't update unmounted state
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setExportedVideoUrl(url);
      setExportProgress(100);
      setIsExporting(false);
      soundService.playVictoryChime();
    };

    recorder.onstop = cleanupAndFinish;
    recorder.onerror = (e) => {
      console.error('Video export failed:', e);
      teardown();
      if (!isMountedRef.current) return;
      setIsExporting(false);
      setExportUnsupported(true);
    };

    video.onended = () => {
      if (recorder.state !== 'inactive') recorder.stop();
    };

    const progressTimer = window.setInterval(() => {
      if (video.duration && isMountedRef.current) {
        setExportProgress(Math.min(99, Math.round((video.currentTime / video.duration) * 100)));
      }
    }, 200);

    activeExportRef.current = { recorder, progressTimer };

    recorder.start();
    try {
      await video.play();
      if (isMountedRef.current) setIsPlaying(true);
    } catch (err) {
      console.error('Could not play source video for export:', err);
      recorder.stop();
    }
  };

  // Stop any active recording/stream/timer if this view unmounts mid-export — prevents a
  // dangling MediaRecorder, an open media stream, and stale setState calls on an unmounted component.
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      const active = activeExportRef.current;
      if (active) {
        window.clearInterval(active.progressTimer);
        if (active.recorder.state !== 'inactive') {
          active.recorder.ondataavailable = null;
          active.recorder.onstop = null;
          active.recorder.onerror = null;
          try {
            active.recorder.stream.getTracks().forEach((track) => track.stop());
            active.recorder.stop();
          } catch {
            // recorder may already be stopping — safe to ignore
          }
        }
        activeExportRef.current = null;
      }
    };
  }, []);

  const handleDownloadExportedVideo = () => {
    if (!exportedVideoUrl) return;
    const anchor = document.createElement('a');
    anchor.href = exportedVideoUrl;
    anchor.download = `memeforge-video-${Date.now()}.webm`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 max-w-7xl mx-auto w-full gap-6">
      {/* Header */}
      <div className="w-full flex items-center justify-between border-b border-dark-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-brand-orange/20 text-brand-orange border border-brand-orange/40">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black font-anton uppercase tracking-wide text-slate-100 flex flex-wrap items-center gap-2">
              <span>VIDEO MEME STUDIO</span>
              <span className="text-[10px] uppercase font-black px-2 py-1 rounded-lg bg-brand-orange text-white leading-tight whitespace-normal">
                9:16 · Shorts &amp; Reels
              </span>
            </h1>
            <p className="text-xs text-slate-400">Trim, caption, hook, and forge viral short-form video memes</p>
          </div>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 rounded-2xl bg-brand-orange hover:bg-brand-orange/90 text-white font-black text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-lg active:scale-95"
        >
          <Upload className="w-4 h-4" />
          <span>Upload MP4 / WebM</span>
        </button>
        <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
      </div>

      {/* Main Workspace */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center Video Stage */}
        <div className="lg:col-span-7 flex flex-col items-center gap-4 bg-dark-900/90 border border-dark-700/80 p-5 rounded-3xl shadow-2xl">
          {/* Aspect Ratio Switcher */}
          <div className="flex items-center gap-2 bg-dark-850 p-1 rounded-2xl border border-dark-700">
            {(['9:16', '1:1', '16:9'] as const).map((ratio) => (
              <button
                key={ratio}
                onClick={() => setVideoProject((p) => ({ ...p, aspectRatio: ratio }))}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                  videoProject.aspectRatio === ratio
                    ? 'bg-brand-orange text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {ratio === '9:16' ? '📱 9:16 Reel' : ratio === '1:1' ? '◻️ 1:1 Square' : '🖥️ 16:9 Wide'}
              </button>
            ))}
          </div>

          {/* Video / Canvas Viewport */}
          <div
            className="relative rounded-2xl bg-dark-950 overflow-hidden border-2 border-dark-700 shadow-2xl flex items-center justify-center"
            style={{
              width: videoProject.aspectRatio === '9:16' ? '320px' : videoProject.aspectRatio === '1:1' ? '420px' : '540px',
              height: videoProject.aspectRatio === '9:16' ? '540px' : '420px'
            }}
          >
            <video
              ref={videoRef}
              src={activeVideoUrl}
              crossOrigin="anonymous"
              loop={videoProject.isLooping}
              muted={videoProject.isMuted}
              className="w-full h-full object-cover"
              playsInline
            />

            {/* Off-screen export canvas: the drawFrame loop paints video + burned-in captions here.
                It must be mounted (even invisibly) for captureStream() to have real frames to record. */}
            <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

            {/* Overlay Meme Banners */}
            <div className="absolute top-0 inset-x-0 bg-dark-950/85 p-3 text-center pointer-events-none border-b border-white/10">
              <span className="font-black font-impact text-lg text-white uppercase tracking-wide drop-shadow">
                {videoProject.topBannerText}
              </span>
            </div>

            <div className="absolute bottom-0 inset-x-0 bg-dark-950/85 p-3 text-center pointer-events-none border-t border-white/10">
              <span className="font-black font-impact text-base text-brand-yellow uppercase tracking-wide drop-shadow">
                {videoProject.bottomBannerText}
              </span>
            </div>

            {/* Play/Pause Center Trigger */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-dark-900/80 hover:bg-brand-orange text-white flex items-center justify-center transition-all opacity-0 hover:opacity-100 backdrop-blur-sm scale-90 hover:scale-100"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </button>
          </div>

          {/* Video Playback Controls */}
          <div className="w-full max-w-lg flex items-center justify-between gap-3 pt-2">
            <button
              onClick={togglePlay}
              className="p-3 rounded-2xl bg-brand-orange text-white font-black hover:scale-105 transition shadow-lg"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            {/* Speed Selector */}
            <div className="flex items-center gap-1 bg-dark-850 p-1 rounded-xl border border-dark-700">
              {[0.5, 1, 1.5, 2].map((spd) => (
                <button
                  key={spd}
                  onClick={() => {
                    if (videoRef.current) videoRef.current.playbackRate = spd;
                    setVideoProject((p) => ({ ...p, playbackRate: spd }));
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                    videoProject.playbackRate === spd ? 'bg-brand-orange text-white' : 'text-slate-400'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            <button
              onClick={() => setVideoProject((p) => ({ ...p, isMuted: !p.isMuted }))}
              className="p-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 transition"
            >
              {videoProject.isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-brand-cyan" />}
            </button>
          </div>
        </div>

        {/* Right Tools Inspector */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Banner Text Customization */}
          <div className="p-5 rounded-3xl bg-dark-900 border border-dark-700/80 flex flex-col gap-3.5 shadow-xl">
            <span className="text-xs font-black uppercase text-brand-orange tracking-wider flex items-center gap-1.5">
              <span>✍️</span> Video Meme Text Overlays
            </span>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400">TOP BANNER TEXT</label>
              <input
                type="text"
                value={videoProject.topBannerText}
                onChange={(e) => setVideoProject((p) => ({ ...p, topBannerText: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-dark-800 border border-dark-700 text-white font-impact text-sm uppercase outline-none focus:border-brand-orange"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400">BOTTOM BANNER TEXT</label>
              <input
                type="text"
                value={videoProject.bottomBannerText}
                onChange={(e) => setVideoProject((p) => ({ ...p, bottomBannerText: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-dark-800 border border-dark-700 text-white font-impact text-sm uppercase outline-none focus:border-brand-orange"
              />
            </div>

            {/* AI Hook Generator */}
            <button
              onClick={handleGenerateHooks}
              className="w-full py-2.5 rounded-xl bg-brand-purple/20 hover:bg-brand-purple hover:text-white text-brand-pink border border-brand-purple/40 text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              <span>Generate AI Video Hooks ✨</span>
            </button>

            {aiHooks.length > 0 && (
              <div className="flex flex-col gap-1.5 pt-1">
                {aiHooks.map((h, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setVideoProject((p) => ({ ...p, topBannerText: h }));
                      soundService.playPop();
                    }}
                    className="p-2 rounded-xl bg-dark-800 hover:bg-dark-750 text-left text-xs text-slate-200 truncate transition"
                  >
                    + "{h}"
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export Action — real recording via canvas.captureStream + MediaRecorder */}
          {!exportSupported || exportUnsupported ? (
            <div className="w-full py-3.5 px-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold text-center">
              Video export isn't supported in this browser. Try a recent Chrome or Edge on desktop.
            </div>
          ) : exportedVideoUrl ? (
            <button
              onClick={handleDownloadExportedVideo}
              className="w-full py-4 rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-black text-sm uppercase tracking-wider shadow-xl hover:scale-[1.02] active:scale-98 transition flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5 stroke-[3]" />
              <span>Download Video (.webm) →</span>
            </button>
          ) : (
            <button
              onClick={handleExportVideo}
              disabled={isExporting}
              className="w-full py-4 rounded-3xl bg-gradient-to-r from-brand-orange via-brand-pink to-brand-purple text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-brand-orange/25 hover:scale-[1.02] active:scale-98 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
            >
              {isExporting ? (
                <>
                  <div className="w-5 h-5 border-[3px] border-white border-t-transparent rounded-full animate-spin" />
                  <span>Recording… {exportProgress}%</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 stroke-[3]" />
                  <span>Export 9:16 Video Reel →</span>
                </>
              )}
            </button>
          )}
          {exportedVideoUrl && (
            <button
              onClick={() => {
                if (exportedVideoUrl) URL.revokeObjectURL(exportedVideoUrl);
                setExportedVideoUrl(null);
              }}
              className="w-full py-2 text-[11px] font-semibold text-slate-500 hover:text-slate-300 transition"
            >
              Export again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
