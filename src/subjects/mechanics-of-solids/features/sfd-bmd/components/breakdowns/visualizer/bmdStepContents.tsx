import React from 'react';
import { ClickReveal, LatexFormula } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

interface BmdStepContentsProps {
  stepIndex: number;
  clickIdx: number;
  diagram: React.ReactNode;
}

export const renderBmdStep = ({ stepIndex, diagram }: BmdStepContentsProps): React.ReactNode => {
  switch (stepIndex) {
    case 14: // BMD Node A Start check
      return (
        <TwoColumnLayout
          title="BMD Node Checks: Node A"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2.5 justify-center h-full">
              <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block font-mono">Node A Moment Step</span>
              <h4 className="text-sm font-extrabold text-foreground font-sans">Moment Boundary at Support A</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans font-medium">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check boundary support:</span>
                  Node A is a pinned end support with no concentrated external moments.
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Moment value check:</span>
                    <LatexFormula math="M_A = 0\text{ kNm}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Plot Point:</span>
                    Confirm start coordinate point at <LatexFormula math="M=0" /> on Node A.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 15: // BMD Segment A-C Integration
      return (
        <TwoColumnLayout
          title="BMD Integration: Segment A to C"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2 justify-center h-full font-medium">
              <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block font-mono animate-in fade-in">Segment A-C Integration Step</span>
              <h4 className="text-sm font-extrabold text-foreground font-sans">Integrating Shear Rectangle</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check SFD area:</span>
                  Identify positive shear rectangle of height <LatexFormula math="+14.325\text{ kN}" /> and length <LatexFormula math="5\text{m}" />.
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Area Calculation (Change):</span>
                    <LatexFormula math="\Delta M = V \cdot L = 14.325 \cdot 5 = 71.625\text{ kNm}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Reference line & arrow:</span>
                    Draw horizontal reference line from Node A at <LatexFormula math="M=0" />, show upward difference arrow of <LatexFormula math="+71.625\text{ kNm}" />.
                  </div>
                </ClickReveal>
                <ClickReveal at={3}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">4. Draw Segment:</span>
                    Constant shear &rarr; animate linear sloped moment line (Degree 1) to Node C.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 16: // BMD Node C check
      return (
        <TwoColumnLayout
          title="BMD Node Checks: Node C"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2.5 justify-center h-full">
              <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block font-mono">Node C check Step</span>
              <h4 className="text-sm font-extrabold text-foreground font-sans">Moment Continuity check at C</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans font-medium">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check point moment:</span>
                  External concentrated moment at Node C is zero.
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Continuity Calculation:</span>
                    <LatexFormula math="M(C^+) = M(C^-) = 71.625\text{ kNm}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Plot Point:</span>
                    Confirm node point on diagram at <LatexFormula math="71.625\text{ kNm}" />.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 17: // BMD Segment C-to-Peak Integration
      return (
        <TwoColumnLayout
          title="BMD Integration: C to Zero-Crossing"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2 justify-center h-full font-medium">
              <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block font-mono">Segment C-to-Peak Step</span>
              <h4 className="text-sm font-extrabold text-foreground font-sans">Integrating Positive Shear Triangle</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check SFD area:</span>
                  Identify positive shear triangle of height <LatexFormula math="14.325\text{ kN}" /> and length <LatexFormula math="4.775\text{ m}" />.
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2 space-y-1.5">
                    <span className="font-bold text-indigo-500 block font-mono">2. Area Calculation (Change):</span>
                    <LatexFormula math="\Delta M = \frac{1}{2} \cdot b \cdot h = \frac{1}{2} \cdot 4.775 \cdot 14.325 = 34.200\text{ kNm}" />
                    Resulting Maximum Moment:
                    <LatexFormula math="M_{\max} = 71.625 + 34.2 = 105.825\text{ kNm}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Reference line & arrow:</span>
                    Draw horizontal reference line at <LatexFormula math="71.625\text{ kNm}" />, draw vertical upward difference arrow of <LatexFormula math="+34.200\text{ kNm}" /> at peak.
                  </div>
                </ClickReveal>
                <ClickReveal at={3}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">4. Draw Curve:</span>
                    Linear shear &rarr; animate parabolic curve (Degree 2) rising to peak.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 18: // BMD Peak Moment check
      return (
        <TwoColumnLayout
          title="BMD Node Checks: Peak moment"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2.5 justify-center h-full">
              <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block font-mono">Peak Moment Check</span>
              <h4 className="text-sm font-extrabold text-foreground">Zero-Slope Moment Peak</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans font-medium">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check condition:</span>
                  Shear is zero at maximum moment location (<LatexFormula math="x = 9.775\text{ m}" />).
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Max Value check:</span>
                    <LatexFormula math="M_{\max} = 105.825\text{ kNm}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Plot Point:</span>
                    Confirm peak point coordinate on diagram.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 19: // BMD Segment Peak-to-D Integration
      return (
        <TwoColumnLayout
          title="BMD Integration: Zero-Crossing to D"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2 justify-center h-full font-medium">
              <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block font-mono">Segment Peak-to-D Step</span>
              <h4 className="text-sm font-extrabold text-foreground font-sans">Integrating Negative Shear Triangle</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check SFD area:</span>
                  Identify negative shear triangle of height <LatexFormula math="-6.675\text{ kN}" /> and length <LatexFormula math="2.225\text{ m}" />.
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2 space-y-1.5">
                    <span className="font-bold text-indigo-500 block font-mono">2. Area Calculation (Change):</span>
                    <LatexFormula math="\Delta M = \frac{1}{2} \cdot b \cdot h = \frac{1}{2} \cdot 2.225 \cdot (-6.675) \approx -7.426\text{ kNm}" />
                    Resulting Moment at Node D:
                    <LatexFormula math="M_D = 105.825 - 7.426 = 98.400\text{ kNm}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Reference line & arrow:</span>
                    Draw horizontal reference line at <LatexFormula math="105.825\text{ kNm}" />, draw downward difference arrow of <LatexFormula math="-7.426\text{ kNm}" />.
                  </div>
                </ClickReveal>
                <ClickReveal at={3}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">4. Draw Curve:</span>
                    Animate parabolic curve (Degree 2) falling to 98.400 kNm at Node D.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 20: // BMD Node D check
      return (
        <TwoColumnLayout
          title="BMD Node Checks: Node D"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2.5 justify-center h-full">
              <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block font-mono animate-in fade-in">Node D check Step</span>
              <h4 className="text-sm font-extrabold text-foreground font-sans animate-in fade-in">Moment Continuity check at D</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans font-medium">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check point moment:</span>
                  External point moment load at Node D is zero.
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Continuity Calculation:</span>
                    <LatexFormula math="M(D^+) = M(D^-) = 98.400\text{ kNm}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Plot Point:</span>
                    Plot point at Node D on diagram.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 21: // BMD Segment D-E Integration
      return (
        <TwoColumnLayout
          title="BMD Integration: Segment D to E"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2 justify-center h-full font-medium">
              <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block font-mono">Segment D-E Integration Step</span>
              <h4 className="text-sm font-extrabold text-foreground font-sans">Integrating Constant Negative Shear</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check SFD area:</span>
                  Identify negative shear block of height <LatexFormula math="-6.675\text{ kN}" /> and length <LatexFormula math="5\text{m}" />.
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2 space-y-1.5">
                    <span className="font-bold text-indigo-500 block font-mono">2. Area Calculation (Change):</span>
                    <LatexFormula math="\Delta M = V \cdot L = -6.675 \cdot 5 = -33.375\text{ kNm}" />
                    Resulting Moment at Node E:
                    <LatexFormula math="M_E = 98.400 - 33.375 = 65.025\text{ kNm}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Reference line & arrow:</span>
                    Draw horizontal reference line at <LatexFormula math="98.400\text{ kNm}" />, draw downward difference arrow of <LatexFormula math="-33.375\text{ kNm}" />.
                  </div>
                </ClickReveal>
                <ClickReveal at={3}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">4. Draw Segment:</span>
                    Animate sloped straight line (Degree 1) down to 65.025 kNm.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 22: // BMD Node E check
      return (
        <TwoColumnLayout
          title="BMD Node Checks: Node E"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2.5 justify-center h-full">
              <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block font-mono">Node E check Step</span>
              <h4 className="text-sm font-extrabold text-foreground font-sans">Moment Continuity check at E</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans font-medium">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check point moment:</span>
                  External point moment load at Node E is zero.
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Continuity Calculation:</span>
                    <LatexFormula math="M(E^+) = M(E^-) = 65.025\text{ kNm}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Plot Point:</span>
                    Plot point at Node E on diagram.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 23: // BMD Segment E-B Integration
      return (
        <TwoColumnLayout
          title="BMD Integration: Segment E to B"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2 justify-center h-full font-medium">
              <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block font-mono">Segment E-B Integration Step</span>
              <h4 className="text-sm font-extrabold text-foreground font-sans">Closing Bending Moment Diagram</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check SFD area:</span>
                  Identify negative constant shear block of height <LatexFormula math="-21.675\text{ kN}" /> and length <LatexFormula math="3\text{m}" />.
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2 space-y-1.5">
                    <span className="font-bold text-indigo-500 block font-mono">2. Area Calculation (Change):</span>
                    <LatexFormula math="\Delta M = V \cdot L = -21.675 \cdot 3 = -65.025\text{ kNm}" />
                    Resulting Moment at Node B:
                    <LatexFormula math="M_B = 65.025 - 65.025 = 0\text{ kNm}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Reference line & arrow:</span>
                    Draw horizontal reference line at <LatexFormula math="65.025\text{ kNm}" />, draw vertical difference arrow downward.
                  </div>
                </ClickReveal>
                <ClickReveal at={3}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">4. Draw Segment:</span>
                    Constant negative shear &rarr; animate linear moment line (Degree 1) down to close at 0.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 24: // BMD Node B check
      return (
        <TwoColumnLayout
          title="BMD Node Checks: Node B"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2.5 justify-center h-full animate-in fade-in">
              <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block font-mono">Node B Moment Step</span>
              <h4 className="text-sm font-extrabold text-foreground font-sans">Moment Boundary at Support B</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans font-medium">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check support boundary:</span>
                  Node B is simple roller boundary with zero concentrated external moments.
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Moment value check:</span>
                    <LatexFormula math="M_B = 0\text{ kNm}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Plot Point:</span>
                    Confirm final point coordinate at <LatexFormula math="M=0" /> closing the BMD.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    default:
      return null;
  }
};
