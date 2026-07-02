import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const Question3Statement: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Question 3: Frame System SFD & BMD"
      leftContent={
        <div className="flex flex-col gap-4 text-left">
          <p className="text-sm font-semibold leading-relaxed text-foreground font-sans">
            Draw the shear and bending moment diagrams for the horizontal beam member <span className="font-bold">ACD</span> of the frame shown below. Also, draw the qualitative elastic deflection diagram of the beam.
          </p>
          <div className="p-3 bg-amber-500/5 border border-amber-500/20 text-amber-600 dark:text-amber-500 rounded-xl text-xs space-y-1 font-bold font-sans">
            <div>Paper-Based Offline Question:</div>
            <div className="font-normal text-muted-foreground">Solve this problem directly on your answer sheet. There are no online checkpoints for this frame system.</div>
          </div>
        </div>
      }
      rightContent={
        <div className="w-full h-[300px] flex items-center justify-center bg-card/40 border border-border/30 rounded-xl p-2">
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[260px] text-foreground" style={{ background: 'transparent' }}>
            {/* Draw grid lines or axis lines if needed (skipped for neatness) */}
            
            {/* Main horizontal beam member ACD */}
            <line x1="80" y1="150" x2="320" y2="150" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            
            {/* Vertical column member E-C-F */}
            <line x1="200" y1="50" x2="200" y2="250" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            
            {/* Supports A (roller) and D (roller) */}
            {/* Support A */}
            <polygon points="70,165 90,165 80,150" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="74" cy="170" r="3" fill="currentColor" />
            <circle cx="86" cy="170" r="3" fill="currentColor" />
            <line x1="65" y1="174" x2="95" y2="174" stroke="currentColor" strokeWidth="2.5" />

            {/* Support D */}
            <polygon points="310,165 330,165 320,150" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="314" cy="170" r="3" fill="currentColor" />
            <circle cx="326" cy="170" r="3" fill="currentColor" />
            <line x1="305" y1="174" x2="335" y2="174" stroke="currentColor" strokeWidth="2.5" />
            
            {/* Loads */}
            {/* 10 kN at F (top) */}
            <g>
              <line x1="140" y1="50" x2="190" y2="50" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
              <path d="M190,50 L180,45 L180,55 Z" fill="#ef4444" />
              <text x="120" y="45" fill="#ef4444" className="text-xs font-black font-sans">10 kN</text>
            </g>

            {/* 14 kN at E (bottom) */}
            <g>
              <line x1="140" y1="250" x2="190" y2="250" stroke="#ef4444" strokeWidth="3" />
              <path d="M190,250 L180,245 L180,255 Z" fill="#ef4444" />
              <text x="120" y="245" fill="#ef4444" className="text-xs font-black font-sans">14 kN</text>
            </g>

            {/* Support E (hinge) at the bottom? Wait, E has no support, it's just a free end with load. */}

            {/* Node labels */}
            <text x="80" y="140" className="text-xs font-black font-sans" fill="currentColor">A</text>
            <text x="210" y="140" className="text-xs font-black font-sans" fill="currentColor">C</text>
            <text x="320" y="140" className="text-xs font-black font-sans" fill="currentColor">D</text>
            <text x="210" y="45" className="text-xs font-black font-sans" fill="currentColor">F</text>
            <text x="210" y="262" className="text-xs font-black font-sans" fill="currentColor">E</text>

            {/* Dimension Lines */}
            {/* Horizontals */}
            <g stroke="currentColor" strokeWidth="1" opacity="0.6">
              {/* Span A-C */}
              <line x1="80" y1="195" x2="200" y2="195" />
              <line x1="80" y1="185" x2="80" y2="205" />
              <text x="135" y="190" className="text-[10px] font-bold font-sans" fill="currentColor" stroke="none">2 m</text>
              
              {/* Span C-D */}
              <line x1="200" y1="195" x2="320" y2="195" />
              <line x1="320" y1="185" x2="320" y2="205" />
              <text x="255" y="190" className="text-[10px] font-bold font-sans" fill="currentColor" stroke="none">2 m</text>

              {/* Verticals */}
              <line x1="240" y1="50" x2="240" y2="150" />
              <line x1="230" y1="50" x2="250" y2="50" />
              <text x="245" y="105" className="text-[10px] font-bold font-sans" fill="currentColor" stroke="none">2 m</text>

              <line x1="240" y1="150" x2="240" y2="250" />
              <line x1="230" y1="250" x2="250" y2="250" />
              <text x="245" y="205" className="text-[10px] font-bold font-sans" fill="currentColor" stroke="none">2 m</text>

              <line x1="200" y1="185" x2="200" y2="205" />
              <line x1="230" y1="150" x2="250" y2="150" />
            </g>
          </svg>
        </div>
      }
    />
  );
};

export default Question3Statement;
