import React, { useRef, useState, useEffect } from 'react';
import { VideoOff, Move } from 'lucide-react';

interface CameraOverlayProps {
  isOpen: boolean;
}

interface CameraLayout {
  x: number;
  y: number;
  w: number;
  h: number;
}

const STORAGE_KEY = 'cee_camera_overlay_layout';
const DEFAULT_LAYOUT: CameraLayout = { x: 24, y: 80, w: 200, h: 150 };

export const CameraOverlay: React.FC<CameraOverlayProps> = ({ isOpen }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permissionError, setPermissionError] = useState<boolean>(false);

  // Drag and resize states
  const [layout, setLayout] = useState<CameraLayout>(DEFAULT_LAYOUT);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  
  const dragStartRef = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const resizeStartRef = useRef({ x: 0, y: 0, ow: 0, oh: 0 });

  // Load layout from cache on mount
  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        setLayout(JSON.parse(cached) as CameraLayout);
      } catch {
        setLayout(DEFAULT_LAYOUT);
      }
    }
  }, []);

  // Sync webcam stream capture with open state
  useEffect(() => {
    if (!isOpen) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      return;
    }

    setPermissionError(false);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 320, height: 240 }, audio: false })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      })
      .catch((err) => {
        console.warn('Webcam permission denied:', err);
        setPermissionError(true);
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  // Sync video source object when stream is established
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!isOpen) return null;

  // Drag listeners
  const handleDragStart = (e: React.PointerEvent) => {
    if (isResizing) return;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      ox: layout.x,
      oy: layout.y,
    };
  };

  const handleDragMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    
    // Bounds limit checking (optional, keep it free-form and smooth)
    const newLayout = {
      ...layout,
      x: Math.max(10, dragStartRef.current.ox + dx),
      y: Math.max(10, dragStartRef.current.oy + dy),
    };
    setLayout(newLayout);
  };

  const handleDragEnd = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  };

  // Resize listeners
  const handleResizeStart = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      ow: layout.w,
      oh: layout.h,
    };
  };

  const handleResizeMove = (e: React.PointerEvent) => {
    if (!isResizing) return;
    const dx = e.clientX - resizeStartRef.current.x;
    const dy = e.clientY - resizeStartRef.current.y;

    const newLayout = {
      ...layout,
      w: Math.max(120, Math.min(600, resizeStartRef.current.ow + dx)),
      h: Math.max(90, Math.min(450, resizeStartRef.current.oh + dy)),
    };
    setLayout(newLayout);
  };

  const handleResizeEnd = (e: React.PointerEvent) => {
    setIsResizing(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        left: `${layout.x}px`,
        top: `${layout.y}px`,
        width: `${layout.w}px`,
        height: `${layout.h}px`,
        zIndex: 50,
      }}
      className="group rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl overflow-hidden backdrop-blur-md select-none transition-shadow duration-300 hover:shadow-primary/10 hover:border-primary/20"
      data-camera-overlay
    >
      {/* Title bar drag handle */}
      <div
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        className="absolute top-2 left-2 z-10 hidden group-hover:flex items-center justify-center h-6 w-6 rounded-full bg-slate-900/80 border border-white/5 cursor-move text-slate-300 hover:text-foreground"
        title="Drag overlay"
      >
        <Move className="h-3 w-3" />
      </div>

      {/* Video stream container */}
      <div className="relative w-full h-full">
        {permissionError ? (
          <div className="flex flex-col h-full items-center justify-center p-3 text-center text-[10px] text-destructive">
            <VideoOff className="h-5 w-5 mb-1 text-destructive animate-bounce" />
            <span>Camera permission blocked. Check browser privacy settings.</span>
          </div>
        ) : !stream ? (
          <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground animate-pulse">
            Connecting webcam...
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover rounded-2xl"
          />
        )}
      </div>

      {/* Bottom right resize handle corner */}
      <div
        onPointerDown={handleResizeStart}
        onPointerMove={handleResizeMove}
        onPointerUp={handleResizeEnd}
        className="absolute bottom-1 right-1 h-3.5 w-3.5 cursor-se-resize flex items-end justify-end"
        title="Resize camera box"
      >
        <div className="w-2.5 h-2.5 border-r border-b border-muted-foreground group-hover:border-foreground mr-0.5 mb-0.5 rounded-br-sm" />
      </div>
    </div>
  );
};

export default CameraOverlay;
