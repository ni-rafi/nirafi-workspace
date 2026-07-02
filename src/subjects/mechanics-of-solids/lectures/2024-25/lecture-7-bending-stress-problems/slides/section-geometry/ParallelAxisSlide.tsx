import { SlideParagraph, SlideBullet, SlideEquation, LatexFormula } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';
import { Settings } from 'lucide-react';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const ParallelAxisSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="The Parallel Axis Theorem"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Settings className="h-4.5 w-4.5" />
              <span>Built-up Sections Tool</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"When an area does not align with the target bending axis, we must project its centroidal inertia across a distance "}
              <LatexFormula math="d" />.
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text={<span><LatexFormula math="I_{xx}" /> represents the moment of inertia about the shape's own centroidal axis.</span>} revealAt={1} />
            <SlideBullet text={<span><LatexFormula math="d" /> is the perpendicular distance from the centroidal axis to the new parallel reference axis <LatexFormula math="x'" />.</span>} revealAt={2} />
            <SlideBullet text={<span><LatexFormula math="A \cdot d^2" /> represents the transfer term, reinforcing that resistance scales quadratically with distance.</span>} revealAt={3} />
          </div>
          <div className="my-2 text-left">
            <SlideEquation math="I_{x'x'} = I_{xx} + A \cdot d^2" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <ExpandableDrawing title="Parallel Axis Theorem Diagram" description="Illustrates projection of area moment of inertia across perpendicular distance d from centroidal axis x to a parallel reference axis x'.">
            <svg viewBox="0 0 160 160" className="w-[125px] h-[125px] overflow-visible">
              {/* Centroidal shape */}
              <rect x={40} y={20} width={80} height={50} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.5} />

              {/* Shape centroidal axis (x-x) */}
              <line x1={20} y1={45} x2={140} y2={45} stroke="var(--primary)" strokeWidth={1} strokeDasharray="3,1" />
              <text x={145} y={48} className="fill-primary text-[8px] font-bold">Centroidal Axis (x)</text>
              <circle cx={80} cy={45} r={2.5} fill="var(--primary)" />

              {/* Parallel Reference Axis (x'-x') */}
              <line x1={20} y1={115} x2={140} y2={115} stroke="var(--destructive)" strokeWidth={1.5} strokeDasharray="3,1" />
              <text x={145} y={118} className="fill-destructive text-[8px] font-bold">Parallel Axis (x')</text>

              {/* Transfer distance (d) */}
              <line x1={80} y1={45} x2={80} y2={115} stroke="var(--foreground)" strokeWidth={0.8} />
              <text x={85} y={83} className="fill-foreground text-[8px] font-bold">d</text>
            </svg>
          </ExpandableDrawing>
        </div>
      }
    />
  );
};

export default ParallelAxisSlide;
