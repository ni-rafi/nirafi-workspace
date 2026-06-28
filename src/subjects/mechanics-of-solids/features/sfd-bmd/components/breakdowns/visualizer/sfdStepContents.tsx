import React from 'react';
import { ClickReveal, LatexFormula } from '@/features/presentation/components/elements';
import { TwoColumnToastLayout } from '@/shared/layouts/TwoColumnToastLayout';

interface SfdStepContentsProps {
  stepIndex: number;
  clickIdx: number;
  diagram: React.ReactNode;
}

export const renderSfdStep = ({ stepIndex, diagram }: SfdStepContentsProps): React.ReactNode => {
  switch (stepIndex) {
    case 3: // SFD Node A Jump
      return (
        <TwoColumnToastLayout toastPosition="right"
          title="SFD Jumps: Node A"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2.5 justify-center h-full">
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Node A Jump Step</span>
              <h4 className="text-sm font-extrabold text-foreground">Support Reaction at A</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans font-medium">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check Node Loads:</span>
                  Concentrated reaction force <LatexFormula math="R_{Ay} = 14.325\text{ kN}" /> acts upward.
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Jump Calculation:</span>
                    <LatexFormula math="V(0^+) = R_{Ay} = 14.325\text{ kN}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Helper Reference line & Arrow:</span>
                    Draw horizontal reference line at <LatexFormula math="V=0" />. Show upward difference arrow to <LatexFormula math="+14.325\text{ kN}" />.
                  </div>
                </ClickReveal>
                <ClickReveal at={3}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">4. Draw Jump Line:</span>
                    Animate vertical line representing the shear jump at Node A.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 4: // SFD Segment A-C Integration
      return (
        <TwoColumnToastLayout toastPosition="right"
          title="SFD Integration: Segment A to C"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2.5 justify-center h-full font-medium">
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Segment A-C Integration Step</span>
              <h4 className="text-sm font-extrabold text-foreground">Shear over Unloaded Span</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check Segment Load:</span>
                  Between A and C, there is zero external load (<LatexFormula math="w = 0" />).
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Area Calculation (Change):</span>
                    <LatexFormula math="\Delta V = \int 0 \, dx = 0\text{ kN}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Reference line & arrow:</span>
                    Horizontal reference line from Node A at <LatexFormula math="14.325\text{ kN}" />. Difference arrow length is 0.
                  </div>
                </ClickReveal>
                <ClickReveal at={3}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">4. Draw Segment:</span>
                    Animate constant horizontal line (Degree 0) up to Node C.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 5: // SFD Node C Check
      return (
        <TwoColumnToastLayout toastPosition="right"
          title="SFD Jumps: Node C"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2.5 justify-center h-full font-medium">
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Node C check Step</span>
              <h4 className="text-sm font-extrabold text-foreground">Continuous Shear check</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check Node Loads:</span>
                  External concentrated point load at Node C is zero.
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Continuity Calculation:</span>
                    <LatexFormula math="V(5^+) = V(5^-) = 14.325\text{ kN}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Plot Point:</span>
                    Plot point at Node C on diagram representing continuous shear.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 6: // SFD Segment C-D Integration
      return (
        <TwoColumnToastLayout toastPosition="left"
          title="SFD Integration: Segment C to D"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2 justify-center h-full">
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Segment C-D Integration Step</span>
              <h4 className="text-sm font-extrabold text-foreground font-sans">Shear Force under UDL</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans font-medium">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check Segment Load:</span>
                  Identify UDL load block of height <LatexFormula math="3\text{ kN/m}" /> and length <LatexFormula math="7\text{m}" />.
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2 space-y-1.5">
                    <span className="font-bold text-indigo-500 block font-mono">2. Area Calculation (Change):</span>
                    <LatexFormula math="\Delta V = -w \cdot L = -3 \cdot 7 = -21\text{ kN}" />
                    Resulting Shear at Node D:
                    <LatexFormula math="V_D = 14.325 - 21 = -6.675\text{ kN}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Reference line & arrow:</span>
                    Draw horizontal reference line at <LatexFormula math="14.325\text{ kN}" />, show downward difference arrow of <LatexFormula math="-21\text{ kN}" />.
                  </div>
                </ClickReveal>
                <ClickReveal at={3}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">4. Draw Segment:</span>
                    Animate sloped straight line (Degree 1) from C to D.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 7: // SFD Node D Check
      return (
        <TwoColumnToastLayout toastPosition="left"
          title="SFD Jumps: Node D"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2.5 justify-center h-full font-medium">
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Node D check Step</span>
              <h4 className="text-sm font-extrabold text-foreground">Continuous Shear check</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check Node Loads:</span>
                  External concentrated point load at Node D is zero.
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Continuity Calculation:</span>
                    <LatexFormula math="V(12^+) = V(12^-) = -6.675\text{ kN}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Plot Point:</span>
                    Confirm node point on diagram at <LatexFormula math="-6.675\text{ kN}" />.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 8: // SFD Segment D-E Integration
      return (
        <TwoColumnToastLayout toastPosition="left"
          title="SFD Integration: Segment D to E"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2.5 justify-center h-full font-medium">
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Segment D-E Integration Step</span>
              <h4 className="text-sm font-extrabold text-foreground">Shear over Unloaded Span</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check Segment Load:</span>
                  Between D and E, there is zero external load (<LatexFormula math="w = 0" />).
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Area Calculation (Change):</span>
                    <LatexFormula math="\Delta V = \int w \, dx = 0\text{ kN}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Reference line & arrow:</span>
                    Horizontal reference line from Node D at <LatexFormula math="-6.675\text{ kN}" />. Difference arrow length is 0.
                  </div>
                </ClickReveal>
                <ClickReveal at={3}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">4. Draw Segment:</span>
                    Animate constant horizontal line (Degree 0) from D to E.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 9: // SFD Node E Jump
      return (
        <TwoColumnToastLayout toastPosition="left"
          title="SFD Jumps: Node E"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2.5 justify-center h-full font-medium">
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Node E Jump Step</span>
              <h4 className="text-sm font-extrabold text-foreground">Concentrated Point Load Drop</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check Node Loads:</span>
                  Concentrated downward load <LatexFormula math="P = 15\text{ kN}" /> acts at Node E.
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Jump Calculation:</span>
                    <LatexFormula math="V(17^+) = -6.675 - 15 = -21.675\text{ kN}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Reference line and difference:</span>
                    Draw horizontal reference line at <LatexFormula math="-6.675\text{ kN}" />, show downward difference arrow of <LatexFormula math="-15\text{ kN}" />.
                  </div>
                </ClickReveal>
                <ClickReveal at={3}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">4. Draw Jump:</span>
                    Animate vertical jump line representing concentrated point load drop.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 10: // SFD Segment E-B Integration
      return (
        <TwoColumnToastLayout toastPosition="left"
          title="SFD Integration: Segment E to B"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2.5 justify-center h-full font-medium">
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Segment E-B Integration Step</span>
              <h4 className="text-sm font-extrabold text-foreground font-sans animate-in fade-in">Shear over Unloaded Span</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check Segment Load:</span>
                  Between E and B, there is zero external load (<LatexFormula math="w = 0" />).
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Area Calculation (Change):</span>
                    <LatexFormula math="\Delta V = \int w \, dx = 0\text{ kN}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Reference line & arrow:</span>
                    Horizontal reference line from Node E at <LatexFormula math="-21.675\text{ kN}" />, plot Node B end point.
                  </div>
                </ClickReveal>
                <ClickReveal at={3}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">4. Draw Segment:</span>
                    Animate constant horizontal line (Degree 0) from E to B.
                  </div>
                </ClickReveal>
              </div>
            </div>
          }
        />
      );

    case 11: // SFD Node B Jump
      return (
        <TwoColumnToastLayout toastPosition="left"
          title="SFD Jumps: Node B"
          leftWidth="55%"
          leftContent={diagram}
          rightContent={
            <div className="flex flex-col gap-2.5 justify-center h-full font-medium">
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Node B Jump Step</span>
              <h4 className="text-sm font-extrabold text-foreground">Support Reaction closing SFD</h4>

              <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 font-sans">
                <div>
                  <span className="font-bold text-foreground block mb-0.5">1. Check Node Loads:</span>
                  Reaction force <LatexFormula math="R_{By} = 21.675\text{ kN}" /> acts upward.
                </div>
                <ClickReveal at={1}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Jump Calculation:</span>
                    Shear jump closes to zero at support boundary B:
                    <LatexFormula math="V(20^+) = -21.675 + 21.675 = 0\text{ kN}" />
                  </div>
                </ClickReveal>
                <ClickReveal at={2}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">3. Reference line and difference:</span>
                    Draw reference baseline at <LatexFormula math="-21.675\text{ kN}" />, and show vertical difference arrow pointing up.
                  </div>
                </ClickReveal>
                <ClickReveal at={3}>
                  <div className="border-t border-border/25 pt-2">
                    <span className="font-bold text-foreground block mb-0.5">4. Draw Jump Line:</span>
                    Animate vertical line jump closing the shear diagram to zero.
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
