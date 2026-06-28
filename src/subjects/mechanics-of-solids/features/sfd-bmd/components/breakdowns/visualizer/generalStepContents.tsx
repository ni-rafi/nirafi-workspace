import React from 'react';
import { LatexFormula, SlideParagraph, SlideBullet, CalculationStepCard } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { TwoColumnToastLayout } from '@/shared/layouts/TwoColumnToastLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';

interface GeneralStepContentsProps {
  stepIndex: number;
  clickIdx: number;
  diagram: React.ReactNode;
}
export const renderGeneralStep = ({ stepIndex, clickIdx, diagram }: GeneralStepContentsProps): React.ReactNode => {
  switch (stepIndex) {
    case 0: // Setup
      return (
        <TwoColumnLayout
          title="Problem 03 - Load Diagram Setup"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-3 justify-center h-full text-left">
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Step 1: Identify System & Loads</span>
              <h4 className="text-sm font-extrabold text-foreground">Geometry and Loading Configuration</h4>
              <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
                We begin with a 20-meter simply supported beam, pinned at support A (<LatexFormula math="x = 0\text{ m}" />) and resting on a roller at support B (<LatexFormula math="x = 20\text{ m}" />). The beam carries:
              </SlideParagraph>
              <div className="space-y-1.5 pl-1.5 text-left">
                <SlideBullet>
                  <span>
                    {"A UDL of "}
                    <LatexFormula math="3\text{ kN/m}" />
                    {" acting over a "}
                    <LatexFormula math="7\text{m}" />
                    {" span from "}
                    <LatexFormula math="x = 5\text{ m}" />
                    {" to "}
                    <LatexFormula math="x = 12\text{ m}" />
                    {"."}
                  </span>
                </SlideBullet>
                <SlideBullet>
                  <span>
                    {"A concentrated point load of "}
                    <LatexFormula math="15\text{ kN}" />
                    {" acting downward at "}
                    <LatexFormula math="x = 17\text{ m}" />
                    {"."}
                  </span>
                </SlideBullet>
              </div>
            </div>
          }
        />
      );

    case 1: // Reactions
      return (
        <TwoColumnToastLayout
          title="Problem 03 - Support Reactions"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-3 justify-center h-full text-left">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Step 2: External Equilibrium</span>
                <h4 className="text-sm font-extrabold text-foreground font-sans">Calculating Support Reactions</h4>
              </div>

              <div className="space-y-2 select-text font-sans">
                <CalculationStepCard
                  title="Moment Equation about A"
                  revealAt={0}
                  formula="\sum M_A = 0 \implies R_{By} \cdot 20 - 178.5 - 255 = 0"
                />
                <CalculationStepCard
                  title="Solve Reaction at B"
                  revealAt={1}
                  formula="R_{By} = 21.675\text{ kN}"
                />
                <CalculationStepCard
                  title="Vertical Equilibrium"
                  revealAt={2}
                  formula="\sum F_y = 0 \implies R_{Ay} + R_{By} - 36 = 0"
                />
                <CalculationStepCard
                  title="Solve Reaction at A"
                  revealAt={3}
                  formula="R_{Ay} = 14.325\text{ kN}"
                />
              </div>
            </div>
          }
        />
      );

    case 2: // Discontinuity Reference Grid
      return (
        <TwoColumnToastLayout
          title="Problem 03 - Discontinuity Reference Grid"
          leftWidth="55%"
          leftContent={diagram}
          toastPosition="right"
          rightContent={
            <div className="flex flex-col gap-3 justify-center h-full text-left">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Step 3: Reference Boundaries</span>
                <h4 className="text-sm font-extrabold text-foreground font-sans">Defining Key Nodes & Intervals</h4>
              </div>

              <div className="space-y-1.5 select-text font-sans">
                <CalculationStepCard
                  title="Node A (x = 0m)"
                  revealAt={0}
                  description="Left support boundary"
                />
                <CalculationStepCard
                  title="Node C (x = 5m)"
                  revealAt={1}
                  description="Start of UDL"
                />
                <CalculationStepCard
                  title="Node D (x = 12m)"
                  revealAt={2}
                  description="End of UDL"
                />
                <CalculationStepCard
                  title="Node E (x = 17m)"
                  revealAt={3}
                  description="Point load P location"
                />
                <CalculationStepCard
                  title="Node B (x = 20m)"
                  revealAt={4}
                  description="Right support boundary"
                />
              </div>
            </div>
          }
        />
      );

    case 12: // Zero-shear point intro
      return (
        <TwoColumnToastLayout
          title="Zero-Shear Crossing Point"
          leftWidth="55%"
          leftContent={diagram}
          toastPosition="right"
          rightContent={
            <div className="flex flex-col gap-3 justify-center h-full text-left">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Zero-Shear Location Boundary</span>
                <h4 className="text-sm font-extrabold text-foreground font-sans">Why Zero-Shear Matters</h4>
              </div>

              <div className="space-y-2 select-text font-sans">
                <CalculationStepCard
                  title="Zero-Shear Condition"
                  revealAt={0}
                  description="Bending moment reaches its extreme (peak) where the shear force crosses zero, since:"
                  formula="\frac{dM}{dx} = V(x) = 0"
                />
                <CalculationStepCard
                  title="Shear Crossing Location"
                  revealAt={1}
                  description={
                    <span>
                      The shear line slopes downward across UDL zone C-D and crosses the x-axis. We define distance <LatexFormula math="x_0" /> as distance from Node C (5m) to this crossing point.
                    </span>
                  }
                />
              </div>
            </div>
          }
        />
      );

    case 13: // Similar triangles proof
      return (
        <TwoColumnToastLayout
          title="Solving Zero-Crossing Position"
          leftWidth="55%"
          toastPosition="left"
          leftContent={
            <div className="flex h-full w-full items-center justify-center p-8 select-none">
              <svg className="w-full max-w-2xl h-[300px] overflow-visible" viewBox="0 0 340 170">
                <line x1="20" y1="90" x2="320" y2="90" className="stroke-slate-400/40 dark:stroke-slate-600" strokeWidth="1.2" />
                
                {/* Green Triangle (representing V1) - Always visible */}
                <g className="transition-all duration-500 opacity-100">
                  <polygon points="40,30 220,90 40,90" className="fill-emerald-500/10 stroke-emerald-500" strokeWidth="1.5" />
                  <foreignObject x="5" y="48" width="32" height="24">
                    <div className="flex items-center justify-end text-[10.5px] font-black text-emerald-600 dark:text-emerald-400 font-sans">
                      <LatexFormula math="14.325" />
                    </div>
                  </foreignObject>
                </g>

                {/* Red Triangle (representing V2) - Revealed at step 1 (Ratio Setup) */}
                <g className={`transition-all duration-500 ${clickIdx >= 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <polygon points="300,120 220,90 300,90" className="fill-rose-500/10 stroke-rose-500" strokeWidth="1.5" />
                  <foreignObject x="305" y="98" width="30" height="24">
                    <div className="flex items-center justify-start text-[10.5px] font-black text-rose-600 dark:text-rose-455 font-sans">
                      <LatexFormula math="6.675" />
                    </div>
                  </foreignObject>
                </g>

                {/* Horizontal distance annotations (x0 and 7 - x0) - Revealed at step 2 */}
                <g className={`transition-all duration-500 ${clickIdx >= 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <foreignObject x="100" y="94" width="60" height="24">
                    <div className="flex items-center justify-center text-[10.5px] font-bold text-indigo-500 font-mono">
                      <LatexFormula math="x_0" />
                    </div>
                  </foreignObject>
                  <foreignObject x="230" y="94" width="60" height="24">
                    <div className="flex items-center justify-center text-[10.5px] font-bold text-indigo-500 font-mono">
                      <LatexFormula math="7 - x_0" />
                    </div>
                  </foreignObject>
                </g>
              </svg>
            </div>
          }
          rightContent={
            <div className="flex flex-col gap-3 justify-center h-full text-left">
              <div className="space-y-1">
                <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest block font-mono">Similar Triangles</span>
                <h4 className="text-sm font-extrabold text-foreground font-sans">Solving for x_0</h4>
              </div>

              <div className="space-y-2 select-text font-sans">
                <CalculationStepCard
                  title="Ratio Setup"
                  revealAt={1}
                  formula="\frac{14.325}{x_0} = \frac{6.675}{7 - x_0}"
                />
                <CalculationStepCard
                  title="Cross Multiplication"
                  revealAt={2}
                  formula="14.325(7 - x_0) = 6.675 \cdot x_0"
                />
                <CalculationStepCard
                  title="Simplify & Group"
                  revealAt={3}
                  formula="100.275 = 21.0 \cdot x_0"
                />
                <CalculationStepCard
                  title="Solve Position"
                  revealAt={4}
                  formula="x_0 = 4.775\text{ m} \implies \text{Total } x = 9.775\text{ m}"
                  highlight
                />
              </div>
            </div>
          }
        />
      );

    case 25: // Solved Diagrams
      return (
        <FullWidthLayout title="Problem 03: Final Solved Diagrams">
          <div className="max-w-4xl mx-auto flex flex-col gap-3">
            {diagram}
            <div className="text-center mt-2 bg-muted/10 border border-border/30 rounded-xl p-3 animate-in fade-in">
              <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
                By utilizing the graphical relationships between loads, shear, and moments, we successfully sketched the complete structural diagrams without writing continuous section-cut equations.
              </SlideParagraph>
            </div>
          </div>
        </FullWidthLayout>
      );

    default:
      return null;
  }
};
