import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { HelpCircle } from 'lucide-react';

export const Problem02StatementSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 02: Design Sizing Statement"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <HelpCircle className="h-4.5 w-4.5" />
              <span>Design Optimization Problem</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-foreground font-semibold leading-relaxed">
              {"A rectangular beam 60 mm wide is simply supported over a span of 5 metres. If the beam is subjected to a uniformly distributed load of 4 kN/m, find the required depth of the beam if the maximum stress is not to exceed 35 MPa in compression and 45 MPa in tension."}
            </SlideParagraph>
          </div>
          <div className="space-y-1 my-1">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Design Inputs</span>
            <SlideBullet text="Width (b) = 60 mm" />
            <SlideBullet text="Span (L) = 5 m" />
            <SlideBullet text="UDL (w) = 4 kN/m" />
            <SlideBullet text="Stress limits: Compression ≤ 35 MPa, Tension ≤ 45 MPa" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] text-muted-foreground leading-relaxed">
          <div className="p-4 bg-slate-900 border border-border/40 rounded-xl w-full text-left space-y-2 font-mono">
            <h4 className="text-indigo-400 font-bold uppercase text-[9px]">Unknown parameters</h4>
            <p className="text-amber-400 font-bold">• Depth h = ?</p>
            <p>We must express cross-section properties in terms of h, and solve using the governing boundary condition.</p>
          </div>
        </div>
      }
    />
  );
};

export default Problem02StatementSlide;
