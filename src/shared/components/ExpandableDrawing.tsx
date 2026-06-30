import React, { useState, useRef, useEffect, useContext } from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { Maximize2, Download, Copy, X } from 'lucide-react';
import { goeyToast } from 'goey-toast';
import html2canvas from 'html2canvas';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ExpandableDrawingProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  downloadFileName?: string;
  className?: string;
}

export const ExpandableDrawing: React.FC<ExpandableDrawingProps> = ({
  children,
  title,
  description,
  downloadFileName,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSvg, setHasSvg] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalId = React.useId().replace(/:/g, '');

  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';

  const fileName = downloadFileName || title.toLowerCase().replace(/\s+/g, '-');

  // Detect if children contain an SVG to toggle SVG download option
  useEffect(() => {
    if (containerRef.current) {
      setHasSvg(!!containerRef.current.querySelector('svg'));
    }
  }, [children]);

  // Copy high-resolution PNG to clipboard
  const handleCopyPng = async () => {
    const element = document.getElementById(`modal-content-${modalId}`) || containerRef.current;
    if (!element) {
      goeyToast('Copy Error', { description: 'No element found to copy.', duration: 3000 });
      return;
    }

    const toastId = goeyToast('Capturing drawing...', {
      description: 'Generating image layout...',
      duration: 0,
    });

    try {
      const target = element.querySelector('svg') || element;
      const canvas = await html2canvas(target as HTMLElement, {
        scale: 3, // High DPI for clean vectors
        useCORS: true,
        backgroundColor: null, // Transparent background
        logging: false,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          goeyToast.update(toastId, {
            title: 'Capture Error',
            description: 'Failed to generate image blob.',
            type: 'error',
          });
          setTimeout(() => goeyToast.dismiss(toastId), 3000);
          return;
        }
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          goeyToast.update(toastId, {
            title: 'Copied',
            description: 'Copied drawing to clipboard as PNG!',
            type: 'success',
          });
          setTimeout(() => goeyToast.dismiss(toastId), 3000);
        } catch (err) {
          console.error(err);
          goeyToast.update(toastId, {
            title: 'Clipboard Error',
            description: 'Copy blocked. Try downloading instead.',
            type: 'error',
          });
          setTimeout(() => goeyToast.dismiss(toastId), 4000);
        }
      }, 'image/png');
    } catch (err) {
      console.error(err);
      goeyToast.update(toastId, {
        title: 'Capture Error',
        description: 'Failed to capture drawing layout.',
        type: 'error',
      });
      setTimeout(() => goeyToast.dismiss(toastId), 3000);
    }
  };

  // Download high-resolution PNG
  const handleDownloadPng = async () => {
    const element = document.getElementById(`modal-content-${modalId}`) || containerRef.current;
    if (!element) {
      goeyToast('Download Error', { description: 'No element found to download.', duration: 3000 });
      return;
    }

    const toastId = goeyToast('Generating PNG...', {
      description: 'Rendering high-resolution canvas...',
      duration: 0,
    });

    try {
      const target = element.querySelector('svg') || element;
      const canvas = await html2canvas(target as HTMLElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });

      canvas.toBlob((blob) => {
        if (!blob) {
          goeyToast.update(toastId, {
            title: 'Rendering Error',
            description: 'Failed to generate PNG blob.',
            type: 'error',
          });
          setTimeout(() => goeyToast.dismiss(toastId), 3000);
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.png`;
        a.click();
        URL.revokeObjectURL(url);

        goeyToast.update(toastId, {
          title: 'Success',
          description: 'PNG downloaded successfully!',
          type: 'success',
        });
        setTimeout(() => goeyToast.dismiss(toastId), 3000);
      }, 'image/png');
    } catch (err) {
      console.error(err);
      goeyToast.update(toastId, {
        title: 'Download Error',
        description: 'Failed to download PNG.',
        type: 'error',
      });
      setTimeout(() => goeyToast.dismiss(toastId), 3000);
    }
  };

  // Download raw SVG file
  const handleDownloadSvg = () => {
    const element = document.getElementById(`modal-content-${modalId}`) || containerRef.current;
    if (!element) return;

    const svgEl = element.querySelector('svg');
    if (!svgEl) {
      goeyToast('Error', { description: 'No SVG found to download.', duration: 3000 });
      return;
    }

    try {
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(svgEl);

      // Ensure xmlns namespaces are added
      if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      if (!source.match(/^<svg[^>]+xmlns:xlink="http:\/\/www\.w3\.org\/1999\/xlink"/)) {
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
      }

      const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.svg`;
      a.click();
      URL.revokeObjectURL(url);

      goeyToast('Success', { description: 'SVG downloaded successfully!', duration: 3000 });
    } catch (err) {
      console.error(err);
      goeyToast('Error', { description: 'Failed to download SVG.', duration: 3000 });
    }
  };

  const wrapperClasses = isBlog
    ? `w-full ${className}`
    : `group relative rounded-xl overflow-hidden border border-border/60 bg-background/50 dark:bg-slate-900/5 ${className}`;

  return (
    <div ref={containerRef} className={wrapperClasses}>
      {/* Target Content */}
      <div className={isBlog ? 'w-full' : 'w-full h-full p-2'}>{children}</div>

      {/* Small hover-reveal button in the top-right corner with tooltip */}
      {!isBlog && (
        <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto md:opacity-0 md:group-hover:opacity-100 max-md:opacity-100">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsOpen(true)}
                  className="flex items-center justify-center w-7 h-7 bg-background/85 hover:bg-background dark:bg-slate-900/85 dark:hover:bg-slate-800 text-muted-foreground hover:text-foreground rounded-lg shadow-sm border border-border/80 transition-all duration-200 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-amber-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="z-[60]">
                <span>Fullscreen & Export</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      {/* Full-Screen Modal */}
      <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <DialogPrimitive.Portal>
          {/* Overlay */}
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-all duration-300 animate-in fade-in-0" />
          
          {/* Main Modal Container */}
          <DialogPrimitive.Content className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in-0 scale-95 duration-200 focus:outline-none">
            
            {/* 1. Floating Glassmorphic Header */}
            <div className="w-full max-w-5xl flex items-center justify-between px-4 py-3 bg-background/75 dark:bg-slate-950/75 border border-border/40 backdrop-blur-md rounded-xl mb-4 shadow-lg select-none">
              <div>
                <DialogPrimitive.Title className="text-sm font-semibold text-foreground">
                  {title}
                </DialogPrimitive.Title>
                {description && (
                  <DialogPrimitive.Description className="text-[11px] text-muted-foreground mt-0.5">
                    {description}
                  </DialogPrimitive.Description>
                )}
              </div>
              
              {/* Toolbar Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyPng}
                  className="flex items-center space-x-1 px-2.5 py-1.5 hover:bg-accent text-accent-foreground text-xs font-medium rounded-lg transition-colors border border-border/40 cursor-pointer"
                  title="Copy drawing to clipboard as PNG image"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy PNG</span>
                </button>
                <button
                  onClick={handleDownloadPng}
                  className="flex items-center space-x-1 px-2.5 py-1.5 hover:bg-accent text-accent-foreground text-xs font-medium rounded-lg transition-colors border border-border/40 cursor-pointer"
                  title="Download drawing as high-res PNG image"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PNG</span>
                </button>
                {hasSvg && (
                  <button
                    onClick={handleDownloadSvg}
                    className="flex items-center space-x-1 px-2.5 py-1.5 hover:bg-accent text-accent-foreground text-xs font-medium rounded-lg transition-colors border border-border/40 cursor-pointer"
                    title="Download vector SVG file"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-500" />
                    <span>Download SVG</span>
                  </button>
                )}
                <DialogPrimitive.Close className="p-1.5 hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors border border-border/40 cursor-pointer">
                  <X className="w-4 h-4" />
                </DialogPrimitive.Close>
              </div>
            </div>

            {/* 2. Expanded Drawing Display Container */}
            <div 
              id={`modal-content-${modalId}`}
              className="flex-1 w-full max-w-5xl max-h-[75vh] flex items-center justify-center p-6 bg-muted/10 dark:bg-slate-900/40 rounded-2xl border border-border/40 backdrop-blur-xs select-none overflow-hidden relative expandable-modal-graphic-wrapper"
            >
              {children}
            </div>

            {/* Modal Global CSS Override to scale nested SVGs inside fullscreen */}
            <style>{`
              .expandable-modal-graphic-wrapper svg {
                max-height: 70vh !important;
                width: 100% !important;
                height: 100% !important;
                max-width: 100% !important;
              }
            `}</style>

          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
};

export default ExpandableDrawing;
