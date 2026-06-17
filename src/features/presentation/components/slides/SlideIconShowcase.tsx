import React from 'react';
import SlideIcon from '../SlideIcon';

export const SlideIconShowcase: React.FC = () => {
  return (
    <div className="relative w-full h-full flex flex-col justify-start text-left px-8 py-8 overflow-y-auto">
      <div className="flex flex-col gap-1 mb-6 select-none">
        <h3 className="text-xl font-bold text-foreground">
          Slide 8: Styled Icon Libraries
        </h3>
        <p className="text-xs text-muted-foreground">
          Render dynamic vector SVGs directly on slides from 100,000+ open-source iconsets on-the-fly.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full items-start">
        {/* Core sets container */}
        <div className="flex flex-col gap-4 p-4 border border-white/10 bg-slate-900/40 rounded-2xl">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider font-mono select-none">
            Slidev Icon Conventions
          </span>
          <div className="flex flex-col gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <SlideIcon icon="mdi:account-circle" className="h-6 w-6 text-blue-400" />
              <span>Material Design: <code>mdi:account-circle</code></span>
            </div>
            <div className="flex items-center gap-3">
              <SlideIcon icon="carbon:badge" className="h-6 w-6 text-purple-400" />
              <span>Carbon Design: <code>carbon:badge</code></span>
            </div>
            <div className="flex items-center gap-3">
              <SlideIcon icon="uim:rocket" className="h-6 w-6 text-emerald-400" />
              <span>Unicons Monochrome: <code>uim:rocket</code></span>
            </div>
            <div className="flex items-center gap-3">
              <SlideIcon icon="logos:react" className="h-6 w-6" />
              <span>SVG Logos: <code>logos:react</code></span>
            </div>
          </div>
        </div>

        {/* Custom styling container */}
        <div className="flex flex-col gap-4 p-4 border border-white/10 bg-slate-900/40 rounded-2xl">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider font-mono select-none">
            Tailwind Animations & Styles
          </span>
          <div className="flex items-center gap-6 justify-center py-4">
            <div className="flex flex-col items-center gap-1.5">
              <SlideIcon icon="uim:rocket" className="h-10 w-10 text-red-500 animate-bounce" />
              <span className="text-[9px] text-muted-foreground font-mono">Bounce</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <SlideIcon icon="mdi:loading" className="h-10 w-10 text-blue-500 animate-spin" />
              <span className="text-[9px] text-muted-foreground font-mono">Spin</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <SlideIcon icon="carbon:warning" className="h-10 w-10 text-amber-500 animate-pulse" />
              <span className="text-[9px] text-muted-foreground font-mono">Pulse</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <SlideIcon icon="twemoji:cat-with-tears-of-joy" className="h-10 w-10 hover:scale-125 transition-transform" />
              <span className="text-[9px] text-muted-foreground font-mono">Hover Scale</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideIconShowcase;
