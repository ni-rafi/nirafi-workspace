import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { Sparkles, Hand } from 'lucide-react';

export const HandBendingSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Hand Bending Demonstration"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Sparkles className="h-4.5 w-4.5" />
              <span>Tactile Intuition</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              Think about bending a dry wooden stick or raw spaghetti in your hands. As you force the ends together, what physically happens?
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="The top face compresses, forcing material cells closer together." />
            <SlideBullet text="The bottom face stretches, pulling fibers apart until a crack snaps open." />
            <SlideBullet text="Bending creates a dual stress profile: Compression on one side, Tension on the other." />
          </div>
          <div className="p-3 bg-indigo-500/[0.03] border border-indigo-500/20 rounded-xl text-[10px] text-indigo-600 dark:text-indigo-400 leading-normal flex items-start gap-2">
            <Hand className="h-4.5 w-4.5 shrink-0 mt-0.5" />
            <span><strong>Try it:</strong> The sensation of resistance increases as bending curvature increases, showing stress magnitude correlates with bending depth.</span>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          {/* Hands bending illustration */}
          <svg viewBox="0 0 300 150" className="w-full max-w-[240px] h-auto overflow-visible">
            {/* Bent element */}
            <path d="M 50 100 Q 150 40 250 100" fill="none" stroke="var(--foreground)" strokeWidth={4} strokeLinecap="round" />

            {/* Rotational Arrows representing Hands Moment */}
            <path d="M 55 105 A 15 15 0 0 1 35 90" fill="none" stroke="var(--primary)" strokeWidth={2} markerEnd="url(#arrow)" />
            <path d="M 245 105 A 15 15 0 0 0 265 90" fill="none" stroke="var(--primary)" strokeWidth={2} markerEnd="url(#arrow)" />

            {/* Markers */}
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--primary)" />
              </marker>
            </defs>

            <text x={150} y={45} textAnchor="middle" className="fill-red-500 text-[10px] font-bold">Compression (Top Face)</text>
            <text x={150} y={120} textAnchor="middle" className="fill-emerald-500 text-[10px] font-bold">Tension (Bottom Face)</text>
            <text x={50} y={135} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold font-mono">Moment (M)</text>
            <text x={250} y={135} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold font-mono">Moment (M)</text>
          </svg>
        </div>
      }
    />
  );
};

export default HandBendingSlide;
