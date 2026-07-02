import React from 'react';
import { SlideList, SlideEquation, LatexFormula } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const ParallelAxisSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="The Parallel Axis Theorem"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col gap-4 text-left select-text">
          <SlideList
            title="Built-up Sections Tool"
            description={
              <span>
                When an area does not align with the target bending axis, we must project its centroidal inertia across a distance <LatexFormula math="d" />.
              </span>
            }
            revealMode="each-click"
            items={[
              { text: <span><LatexFormula math="I_{xx}" /> represents the moment of inertia about the shape's own centroidal axis.</span>, revealAt: 1 },
              { text: <span><LatexFormula math="d" /> is the perpendicular distance from the centroidal axis to the new parallel reference axis <LatexFormula math="x'" />.</span>, revealAt: 2 },
              { text: <span><LatexFormula math="A \cdot d^2" /> represents the transfer term, reinforcing that resistance scales quadratically with distance.</span>, revealAt: 3 },
            ]}
          />
          <div className="my-2 text-left">
            <SlideEquation math="I_{x'x'} = I_{xx} + A \cdot d^2" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <ExpandableDrawing title="Parallel Axis Theorem Diagram" description="Illustrates projection of area moment of inertia across perpendicular distance d from centroidal axis x to a parallel reference axis x'.">
            <svg viewBox="0 0 160 160" className="w-[120px] h-[120px] overflow-visible">
              <path d="M40,50 Q60,30 90,40 Q130,50 120,95 Q100,130 50,110 Q20,90 40,50 Z" fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.5} />
              <line x1={20} y1={70} x2={140} y2={70} stroke="var(--primary)" strokeWidth={1.2} />
              <circle cx={80} cy={70} r={2} fill="var(--primary)" />
              <text x={84} y={67} className="fill-primary text-[11px] font-bold">Centroid</text>
              <line x1={80} y1={70} x2={80} y2={120} stroke="var(--destructive)" strokeWidth={1} strokeDasharray="3,1" />
              <text x={84} y={100} className="fill-destructive text-[11px] font-bold">d</text>
              <line x1={20} y1={120} x2={140} y2={120} stroke="var(--destructive)" strokeWidth={1.2} />
              <text x={144} y={73} className="fill-primary text-[11px] font-bold">x</text>
              <text x={144} y={123} className="fill-destructive text-[11px] font-bold">x'</text>
            </svg>
          </ExpandableDrawing>
        </div>
      }
    />
  );
};

export default ParallelAxisSlide;
