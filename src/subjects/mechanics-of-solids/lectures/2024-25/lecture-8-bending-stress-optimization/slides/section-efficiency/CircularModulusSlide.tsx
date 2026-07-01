import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { Settings } from 'lucide-react';

export const CircularModulusSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Circular Modulus Expression"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Settings className="h-4.5 w-4.5" />
              <span>Radial Properties</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Evaluate the Section Modulus (Z) for a solid circular cross-section."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Area Moment of Inertia: I = π · d⁴ / 64" />
            <SlideBullet text="Distance to extreme fiber: y_max = d / 2" />
          </div>
          <div className="space-y-1 my-1">
            <SlideEquation math="Z = \frac{I}{y_{\max}}" />
            <SlideEquation math="Z = \frac{\pi \cdot d^4 / 64}{d / 2} = \frac{\pi \cdot d^3}{32}" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <svg viewBox="0 0 160 160" className="w-[140px] h-[140px] overflow-visible">
            <circle cx={80} cy={80} r={50} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.5} />
            <line x1={80} y1={80} x2={130} y2={80} stroke="var(--primary)" strokeWidth={1.2} />
            <circle cx={80} cy={80} r={2} fill="var(--destructive)" />
            <line x1={20} y1={80} x2={140} y2={80} stroke="var(--destructive)" strokeWidth={1} strokeDasharray="3,1" opacity={0.6} />
            <text x={145} y={83} className="fill-destructive text-[8px] font-bold">N.A.</text>
            <text x={105} y={75} className="fill-primary text-[8px] font-bold">d/2</text>
          </svg>
        </div>
      }
    />
  );
};

export default CircularModulusSlide;
