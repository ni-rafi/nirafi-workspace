import React from 'react';
import { ClickReveal, LatexFormula, SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';

interface GeneralStepContentsProps {
  stepIndex: number;
  clickIdx: number;
  diagram: React.ReactNode;
}

export const renderGeneralStep = ({ stepIndex, diagram }: GeneralStepContentsProps): React.ReactNode => {
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
        <TwoColumnLayout
          title="Problem 03 - Support Reactions"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2 justify-center h-full overflow-y-auto max-h-[360px] pr-1 font-medium text-left">
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Step 2: External Equilibrium</span>
              <h4 className="text-sm font-extrabold text-foreground font-sans">Calculating Support Reactions</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans">
                <div>
                  <span className="font-bold text-indigo-500 block mb-0.5 font-mono">Moment Equation about A:</span>
                  <LatexFormula math="\sum M_A = 0 \implies R_{By} \cdot 20 - 178.5 - 255 = 0" />
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">Solve Reaction at B:</span>
                    <LatexFormula math="R_{By} = 21.675\text{ kN}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">Vertical Equilibrium:</span>
                    <LatexFormula math="\sum F_y = 0 \implies R_{Ay} + R_{By} - 36 = 0" />
                  </div>
                </ClickReveal>
                <ClickReveal at={3}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">Solve Reaction at A:</span>
                    <LatexFormula math="R_{Ay} = 14.325\text{ kN}" />
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 2: // Discontinuity Reference Grid
      return (
        <TwoColumnLayout
          title="Problem 03 - Discontinuity Reference Grid"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-3 justify-center h-full font-medium text-left">
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Step 3: Reference Boundaries</span>
              <h4 className="text-sm font-extrabold text-foreground font-sans">Defining Key Nodes & Intervals</h4>
              <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
                Establish vertical grid lines corresponding to loading discontinuities. These points define segment boundaries for graphical integration:
              </SlideParagraph>
              <div className="grid grid-cols-1 gap-1.5 text-[10px] font-mono text-muted-foreground max-h-[180px] overflow-y-auto pr-1">
                <ClickReveal at={0}>
                  <div className="p-1.5 bg-muted/20 rounded border border-indigo-500/25">
                    <span className="font-bold text-indigo-500">Node A (x = 0m)</span>: Left support boundary
                  </div>
                </ClickReveal>
                <ClickReveal at={1}>
                  <div className="p-1.5 bg-muted/20 rounded border border-indigo-500/25">
                    <span className="font-bold text-indigo-500">Node C (x = 5m)</span>: Start of UDL
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="p-1.5 bg-muted/20 rounded border border-indigo-500/25">
                    <span className="font-bold text-indigo-500">Node D (x = 12m)</span>: End of UDL
                  </div>
                </ClickReveal>
                <ClickReveal at={3}>
                  <div className="p-1.5 bg-muted/20 rounded border border-indigo-500/25">
                    <span className="font-bold text-indigo-500">Node E (x = 17m)</span>: Point load P location
                  </div>
                </ClickReveal>
                <ClickReveal at={4}>
                  <div className="p-1.5 bg-muted/20 rounded border border-indigo-500/25">
                    <span className="font-bold text-indigo-500">Node B (x = 20m)</span>: Right support boundary
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 12: // Zero-shear point intro
      return (
        <TwoColumnLayout
          title="Zero-Shear Crossing Point"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-3 justify-center h-full text-left">
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono animate-in fade-in">Zero-Shear Location Boundary</span>
              <h4 className="text-sm font-extrabold text-foreground font-sans">Why Zero-Shear Matters</h4>
              <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed font-sans animate-in fade-in">
                Bending moment reaches its extreme (peak) where the shear force crosses zero, since:
              </SlideParagraph>
              <div className="pl-3.5 py-1 text-xs font-semibold text-foreground font-mono animate-in fade-in">
                <LatexFormula math="\frac{dM}{dx} = V(x) = 0" />
              </div>
              <div className="p-3 bg-muted/20 border border-border/40 rounded-xl text-xs text-muted-foreground space-y-1 font-sans animate-in fade-in text-left">
                <p>• The shear line slopes downward across UDL zone C-D and crosses x-axis.</p>
                <p>• We define distance <LatexFormula math="x_0" /> as distance from Node C (5m) to this crossing point.</p>
              </div>
            </div>
          }
        />
      );

    case 13: // Similar triangles proof
      return (
        <FullWidthLayout title="Solving Zero-Crossing Position">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto mt-4 font-medium text-left">
            <div className="bg-card border border-border/40 rounded-2xl p-5 flex flex-col justify-center items-center shadow-lg relative min-h-[220px]">
              <span className="absolute top-2 left-4 text-[9px] font-bold text-rose-500 uppercase tracking-widest font-mono">Geometry Setup</span>
              <svg className="w-full max-w-[340px] h-[170px] overflow-visible" viewBox="0 0 340 170">
                <line x1="20" y1="90" x2="320" y2="90" className="stroke-muted-foreground/30" strokeWidth="1" />
                <polygon points="40,30 220,90 40,90" className="fill-emerald-500/10 stroke-emerald-500" strokeWidth="1.2" />
                <polygon points="300,120 220,90 300,90" className="fill-rose-500/10 stroke-rose-500" strokeWidth="1.2" />
                <text x="32" y="60" textAnchor="end" className="text-[10px] font-black fill-emerald-600 dark:fill-emerald-400">14.325</text>
                <text x="308" y="110" className="text-[10px] font-black fill-rose-600 dark:fill-rose-455">6.675</text>
                <text x="130" y="105" textAnchor="middle" className="text-[9px] font-bold fill-indigo-500 font-mono">x_0</text>
                <text x="260" y="105" textAnchor="middle" className="text-[9px] font-bold fill-indigo-500 font-mono">7 - x_0</text>
              </svg>
            </div>
            <div className="space-y-2 text-left font-sans text-xs">
              <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest block font-mono">Similar Triangles</span>
              <h4 className="text-sm font-extrabold text-foreground font-sans">Solving for x_0</h4>
              <ClickReveal at={1}>
                <div className="pl-3.5 py-1">
                  <span className="font-bold text-indigo-500 block mb-0.5 font-mono">Ratio Setup:</span>
                  <LatexFormula math="\frac{14.325}{x_0} = \frac{6.675}{7 - x_0}" />
                </div>
              </ClickReveal>
              <ClickReveal at={2}>
                <div className="pl-3.5 py-1">
                  <span className="font-bold text-indigo-500 block mb-0.5 font-mono">Cross Multiplication:</span>
                  <LatexFormula math="14.325(7 - x_0) = 6.675 \cdot x_0" />
                </div>
              </ClickReveal>
              <ClickReveal at={3}>
                <div className="pl-3.5 py-1">
                  <span className="font-bold text-indigo-500 block mb-0.5 font-mono">Simplify & Group:</span>
                  <LatexFormula math="100.275 = 21.0 \cdot x_0" />
                </div>
              </ClickReveal>
              <ClickReveal at={4}>
                <div className="text-center text-xs font-bold text-emerald-500 py-1 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                  <LatexFormula math="x_0 = 4.775\text{ m} \implies \text{Total } x = 9.775\text{ m}" />
                </div>
              </ClickReveal>
            </div>
          </div>
        </FullWidthLayout>
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
