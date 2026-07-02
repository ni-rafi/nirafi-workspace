import React from 'react';
import { SlideList, SlideEquation, LatexFormula, ClickReveal } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const RectangularAxisSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Standard Rectangular Axis Inertia"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col gap-4 text-left select-text">
          <SlideList
            title="Symmetric Section Properties"
            description={
              <span>
                For a solid rectangular cross-section of width <LatexFormula math="b" /> and depth <LatexFormula math="h" />, the area moment of inertia depends strongly on which axis the section bends about.
              </span>
            }
            revealMode="each-click"
            items={[
              { text: <span>Horizontal Centroidal Axis (<LatexFormula math="x-x" />): Base is <LatexFormula math="b" />, height is <LatexFormula math="h" />. Cubing <LatexFormula math="h" /> makes depth the dominant factor in bending stiffness.</span>, revealAt: 1 },
              { text: <span>Vertical Centroidal Axis (<LatexFormula math="y-y" />): Base is <LatexFormula math="h" />, height is <LatexFormula math="b" />. Cubing <LatexFormula math="b" /> makes width the dominant factor.</span>, revealAt: 2 },
            ]}
          />
          <div className="space-y-2.5 text-left">
            <ClickReveal at={3} preset="fade">
              <SlideEquation math="I_{xx} = \frac{b \cdot h^3}{12}" />
            </ClickReveal>
            <ClickReveal at={4} preset="fade">
              <SlideEquation math="I_{yy} = \frac{h \cdot b^3}{12}" />
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <ExpandableDrawing title="Symmetric Rectangular Inertia" description="A solid rectangular cross-section of width b and depth h displaying centroidal axes x-x and y-y.">
            <svg viewBox="0 0 160 160" className="w-[120px] h-[120px] overflow-visible">
              <rect x={40} y={30} width={80} height={100} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.5} />
              {/* x-x axis */}
              <line x1={20} y1={80} x2={140} y2={80} stroke="var(--primary)" strokeWidth={1.2} strokeDasharray="3,1" />
              <text x={144} y={83} className="fill-primary text-[11px] font-bold">x</text>
              {/* y-y axis */}
              <line x1={80} y1={10} x2={80} y2={150} stroke="var(--primary)" strokeWidth={1.2} strokeDasharray="3,1" />
              <text x={78} y={158} className="fill-primary text-[11px] font-bold">y</text>
              <circle cx={80} cy={80} r={2} fill="var(--destructive)" />
              {/* Dimension labels */}
              <text x={80} y={145} textAnchor="middle" className="fill-muted-foreground text-[11px] font-bold">b</text>
              <text x={125} y={83} textAnchor="start" className="fill-muted-foreground text-[11px] font-bold">h</text>
            </svg>
          </ExpandableDrawing>
        </div>
      }
    />
  );
};

export default RectangularAxisSlide;
