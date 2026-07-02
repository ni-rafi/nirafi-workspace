import React from 'react';
import { SlideList, SlideEquation, LatexFormula, ClickReveal, ClickHighlight } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const CircularModulusSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Circular Modulus Expression"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col gap-4 text-left select-text">
          <SlideList
            title="Radial Properties"
            description={
              <span>
                Evaluate the Section Modulus (<LatexFormula math="Z" />) for a solid circular cross-section.
              </span>
            }
            revealMode="each-click"
            items={[
              { text: <span>Area Moment of Inertia: <LatexFormula math="I = \frac{\pi \cdot d^4}{64}" /></span>, revealAt: 1 },
              { text: <span>Distance to extreme fiber: <LatexFormula math="y_{\max} = d / 2" /></span>, revealAt: 2 },
            ]}
          />
          <div className="space-y-1.5 my-1 text-left">
            <ClickReveal at={3} preset="fade">
              <SlideEquation math="Z = \frac{I}{y_{\max}}" />
            </ClickReveal>
            <ClickReveal at={4} preset="fade">
              <ClickHighlight at={4} variant="rect" className="block">
                <SlideEquation math="Z = \frac{\pi \cdot d^4 / 64}{d / 2} = \frac{\pi \cdot d^3}{32}" />
              </ClickHighlight>
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <ExpandableDrawing title="Circular Cross-Section Profile" description="Solid circular profile of diameter d displaying the centroid, radius d/2, and neutral axis.">
            <svg viewBox="0 0 160 160" className="w-[120px] h-[120px] overflow-visible">
              <circle cx={80} cy={80} r={50} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.5} />
              <line x1={80} y1={80} x2={130} y2={80} stroke="var(--primary)" strokeWidth={1.2} />
              <circle cx={80} cy={80} r={2.5} fill="var(--destructive)" />
              <line x1={20} y1={80} x2={140} y2={80} stroke="var(--destructive)" strokeWidth={1} strokeDasharray="3,1" opacity={0.6} />
              <text x={145} y={84} className="fill-destructive text-[11px] font-bold">N.A.</text>
              <text x={102} y={73} className="fill-primary text-[11px] font-bold">d/2</text>
            </svg>
          </ExpandableDrawing>
        </div>
      }
    />
  );
};

export default CircularModulusSlide;
